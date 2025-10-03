import React, { useState, useEffect, useRef } from 'react'
import { Send, ArrowLeft, MessageSquare, Phone, User } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface Message {
  id: string
  text: string
  sender: 'user' | 'system'
  timestamp: Date
}

interface HerdData {
  id: string
  name: string
  breed: string
  age: number
  weight: number
  health: string
  location: string
  owner: string
  lastCheckup: string
  notes: string
}

const SmsSimulator: React.FC = () => {
  const { isDarkMode } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [herdData, setHerdData] = useState<HerdData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load herd data on component mount
  useEffect(() => {
    const loadHerdData = async () => {
      try {
        const response = await fetch('/herders_herd.csv')
        const csvText = await response.text()
        const lines = csvText.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
        
        const data = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
          return {
            id: values[0] || `herd-${index}`,
            name: values[1] || `Animal ${index + 1}`,
            breed: values[2] || 'Unknown',
            age: parseInt(values[3]) || 0,
            weight: parseFloat(values[4]) || 0,
            health: values[5] || 'Unknown',
            location: values[6] || 'Unknown',
            owner: values[7] || 'Unknown',
            lastCheckup: values[8] || 'Unknown',
            notes: values[9] || ''
          }
        })
        
        setHerdData(data)
        setIsLoading(false)
        
        // Add welcome message
        setMessages([{
          id: 'welcome',
          text: 'Welcome to Mali Connect SMS Simulator! You can ask about your herd, request health checks, or get market information. Try: "Show me my cattle" or "What\'s the health status of my herd?"',
          sender: 'system',
          timestamp: new Date()
        }])
      } catch (error) {
        console.error('Error loading herd data:', error)
        setIsLoading(false)
        setMessages([{
          id: 'error',
          text: 'Error loading herd data. Please check if the CSV file is available.',
          sender: 'system',
          timestamp: new Date()
        }])
      }
    }

    loadHerdData()
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Simulate system response
    setTimeout(() => {
      const response = generateSystemResponse(inputText.toLowerCase())
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'system',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, systemMessage])
    }, 1000)
  }

  const generateSystemResponse = (input: string): string => {
    if (input.includes('show') && (input.includes('cattle') || input.includes('herd'))) {
      return `Here's your herd summary:\n\n${herdData.slice(0, 5).map(animal => 
        `🐄 ${animal.name} (${animal.breed})\n   Age: ${animal.age} years, Weight: ${animal.weight}kg\n   Health: ${animal.health}\n   Location: ${animal.location}`
      ).join('\n\n')}\n\nYou have ${herdData.length} animals total.`
    }
    
    if (input.includes('health') || input.includes('sick')) {
      const healthyCount = herdData.filter(a => a.health.toLowerCase().includes('healthy')).length
      const sickCount = herdData.filter(a => a.health.toLowerCase().includes('sick')).length
      const unhealthyCount = herdData.filter(a => a.health.toLowerCase().includes('unhealthy')).length
      
      let healthReport = `Health Status Report:\n\n✅ Healthy: ${healthyCount} animals\n`
      
      if (sickCount > 0) {
        healthReport += `⚠️ Sick: ${sickCount} animals\n`
      }
      
      if (unhealthyCount > 0) {
        healthReport += `❌ Unhealthy: ${unhealthyCount} animals\n`
      }
      
      if (sickCount > 0 || unhealthyCount > 0) {
        healthReport += `\n🚨 Action needed: ${sickCount + unhealthyCount} animals require immediate attention.\nConsider scheduling veterinary checkups and improving nutrition.`
      } else {
        healthReport += `\n🎉 All animals appear to be in good health!`
      }
      
      return healthReport
    }
    
    if (input.includes('market') || input.includes('price') || input.includes('sell')) {
      const healthyAnimals = herdData.filter(a => a.health.toLowerCase().includes('healthy'))
      const unhealthyAnimals = herdData.filter(a => a.health.toLowerCase().includes('unhealthy') || a.health.toLowerCase().includes('sick'))
      
      const avgWeight = herdData.reduce((sum, a) => sum + a.weight, 0) / herdData.length
      const healthyValue = healthyAnimals.length > 0 ? healthyAnimals.reduce((sum, a) => sum + a.weight, 0) / healthyAnimals.length * 2.5 : 0
      const unhealthyValue = unhealthyAnimals.length > 0 ? unhealthyAnimals.reduce((sum, a) => sum + a.weight, 0) / unhealthyAnimals.length * 1.2 : 0
      
      let marketReport = `Market Information:\n\n📊 Average weight: ${avgWeight.toFixed(1)}kg\n`
      
      if (healthyAnimals.length > 0) {
        marketReport += `💰 Healthy animals: $${healthyValue.toFixed(0)} each (${healthyAnimals.length} animals)\n`
      }
      
      if (unhealthyAnimals.length > 0) {
        marketReport += `⚠️ Unhealthy animals: $${unhealthyValue.toFixed(0)} each (${unhealthyAnimals.length} animals)\n`
        marketReport += `\n🚨 Note: Unhealthy animals have significantly reduced market value. Consider veterinary care and improved nutrition before selling.`
      }
      
      marketReport += `\n\nMarket prices are currently stable. Focus on improving animal health for better returns!`
      
      return marketReport
    }
    
    if (input.includes('location') || input.includes('where')) {
      const locations = [...new Set(herdData.map(a => a.location))]
      return `Location Report:\n\n📍 Your animals are in: ${locations.join(', ')}\n\nTotal locations: ${locations.length}\n\nAll animals are properly tracked and accounted for.`
    }
    
    if (input.includes('fees') || input.includes('cost') || input.includes('price')) {
      return `Mali-Connect Fee Structure:\n\n💰 Assessment: FREE\n💳 Marketplace: 2% on successful sales\n📱 SMS Service: FREE\n\nAll fees are transparently communicated before any transaction. Valuation and health assessment are completely free!`
    }
    
    if (input.includes('help') || input.includes('dispute') || input.includes('complaint')) {
      return `Support & Dispute Resolution:\n\n🆘 For assistance or to dispute a valuation, text your query to our agent network.\n\n⏰ An agent will contact you within 24 hours.\n\n📍 You can also visit your nearest Mali-Connect agent point.\n\nAvailable Commands:\n• "Show me my cattle" - View herd summary\n• "Health status" - Check animal health\n• "Market prices" - Get market information\n• "Location report" - See where animals are\n• "Fees" - View fee structure\n• "Help" - Show this menu`
    }
    
    // Default response
    return `I understand you're asking about "${input}". I can help you with:\n\n• Herd information and status\n• Health reports and veterinary needs\n• Market prices and selling advice\n• Location tracking\n\nTry asking "Show me my cattle" or "What's the health status?"`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isLoading) {
    return (
      <div className={`w-full h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-mali-dark' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mali-green mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            Loading SMS Simulator...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full h-screen flex flex-col ${
      isDarkMode ? 'bg-mali-dark' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-mali-green rounded-full">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              SMS Simulator
            </h1>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Interactive livestock management via SMS
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            +254 700 000 000
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-mali-green text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user'
                  ? 'text-green-100'
                  : isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (e.g., 'Show me my cattle')"
              className={`w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-mali-green transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-mali-green'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-mali-green'
              }`}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-3 rounded-2xl transition-all duration-200 ${
              inputText.trim()
                ? 'bg-mali-green hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Commands */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'Show me my cattle',
            'Health status',
            'Market prices',
            'Location report',
            'Fees',
            'Help'
          ].map((command) => (
            <button
              key={command}
              onClick={() => setInputText(command)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SmsSimulator
