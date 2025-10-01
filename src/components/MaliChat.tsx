import React, { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, User, X } from 'react-feather'
import useAI from '../hooks/useAI'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  message: string
  timestamp: Date
  isTyping?: boolean
}

interface MaliChatProps {
  maliScore: any
  selectedImage?: any
  isOpen: boolean
  onClose: () => void
}

const MaliChat: React.FC<MaliChatProps> = ({ maliScore, selectedImage, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { analyzeImage, getMarketAnalysis } = useAI()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize with contextual welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const score = maliScore?.totalScore || 0
      const hasImage = selectedImage ? true : false
      
      let welcomeMessage = `Hello! I'm Mali AI, your livestock intelligence assistant. `
      
      if (hasImage && score > 0) {
        welcomeMessage += `I can see you've selected "${selectedImage.alt}" with a Mali-Score of ${score}/100. `
        if (score >= 80) {
          welcomeMessage += `Excellent health! Your cattle is in premium condition. `
        } else if (score >= 60) {
          welcomeMessage += `Good health with room for improvement. `
        } else {
          welcomeMessage += `I notice some health concerns that we can address. `
        }
        welcomeMessage += `I can help you with specific recommendations, market analysis, or answer any questions about your livestock. What would you like to know?`
      } else if (hasImage) {
        welcomeMessage += `I can see you've selected "${selectedImage.alt}". I can help analyze this cattle's health, provide market insights, or answer any livestock questions. What would you like to know?`
      } else {
        welcomeMessage += `I can help you understand cattle health, market value, nutrition, breeding, and provide recommendations. Select an image or ask me anything about livestock management!`
      }

      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        message: welcomeMessage,
        timestamp: new Date()
      }
      setMessages([welcomeMsg])
    }
  }, [isOpen, messages.length, maliScore, selectedImage])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Generate AI response
    const aiResponse = await generateAIResponse(inputMessage)
    
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      message: aiResponse,
      timestamp: new Date()
    }

    setTimeout(() => {
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Simulate typing delay
  }

  const generateAIResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase()
    
    // Health-related questions
    if (input.includes('health') || input.includes('sick') || input.includes('disease') || input.includes('illness')) {
      return generateHealthResponse()
    }
    
    // Market-related questions
    if (input.includes('price') || input.includes('value') || input.includes('market') || input.includes('sell') || input.includes('worth') || input.includes('cost')) {
      return generateMarketResponse()
    }
    
    // Nutrition questions
    if (input.includes('feed') || input.includes('nutrition') || input.includes('food') || input.includes('diet') || input.includes('eating')) {
      return generateNutritionResponse()
    }
    
    // Breeding questions
    if (input.includes('breed') || input.includes('breeding') || input.includes('reproduction') || input.includes('mating')) {
      return generateBreedingResponse()
    }
    
    // General livestock questions
    if (input.includes('care') || input.includes('maintenance') || input.includes('management') || input.includes('look after')) {
      return generateCareResponse()
    }
    
    // Score-related questions
    if (input.includes('score') || input.includes('mali') || input.includes('assessment') || input.includes('rating')) {
      return generateScoreResponse()
    }
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return `Hello! I'm here to help with your livestock questions. I can analyze your cattle's health, provide market insights, nutrition advice, and much more. What would you like to know?`
    }
    
    // Help requests
    if (input.includes('help') || input.includes('what can you do') || input.includes('capabilities')) {
      return `I can help you with:\n\n🏥 **Health Analysis** - Assess your cattle's condition and provide health recommendations\n💰 **Market Intelligence** - Calculate market value and suggest optimal selling strategies\n🌾 **Nutrition Guidance** - Recommend feeding programs and dietary improvements\n🐄 **Breeding Advice** - Evaluate breeding potential and reproductive health\n🔧 **Care Management** - Provide daily care and maintenance recommendations\n📊 **Score Breakdown** - Explain your Mali-Score and how to improve it\n\nWhat specific area interests you most?`
    }
    
    // Default response with more context
    return generateDefaultResponse()
  }

  const generateHealthResponse = () => {
    const score = maliScore?.totalScore || 75
    if (score >= 80) {
      return `Your cattle shows excellent health indicators! With a Mali-Score of ${score}/100, I recommend maintaining your current health protocols. Continue regular monitoring and consider premium market placement. Would you like specific health recommendations?`
    } else if (score >= 60) {
      return `Your cattle has good health with room for improvement (Score: ${score}/100). I suggest focusing on nutrition optimization and regular health monitoring. Consider a veterinary check-up for specific recommendations. What aspect of health would you like to focus on?`
    } else {
      return `Your cattle needs health attention (Score: ${score}/100). I recommend immediate veterinary consultation and implementing a targeted health improvement program. Focus on nutrition, disease prevention, and regular monitoring. Would you like me to suggest specific health interventions?`
    }
  }

  const generateMarketResponse = () => {
    const score = maliScore?.totalScore || 75
    const estimatedValue = Math.round(500 * (score / 100) * 1.1)
    
    if (score >= 80) {
      return `Excellent market potential! Your cattle could fetch $${estimatedValue}-$${Math.round(estimatedValue * 1.2)} in premium markets. The high Mali-Score makes it ideal for export markets or premium local buyers. Consider listing on marketplace platforms for maximum value.`
    } else if (score >= 60) {
      return `Good market value potential around $${estimatedValue}. Focus on health improvements to increase value. Consider local markets or processing facilities. Timing your sale with peak demand seasons could increase returns by 10-15%.`
    } else {
      return `Current market value estimated at $${estimatedValue}. I recommend improving health condition before selling to maximize returns. Consider immediate sale if urgent, or invest in health improvement program for better long-term value.`
    }
  }

  const generateNutritionResponse = () => {
    const score = maliScore?.bodyCondition || 75
    
    if (score >= 80) {
      return `Your cattle's nutrition is excellent! Maintain current feeding regimen with high-quality forage and balanced supplements. Consider seasonal adjustments and ensure access to clean water. Monitor body condition regularly.`
    } else if (score >= 60) {
      return `Good nutrition base with room for improvement. Increase feed quality, add protein supplements, and ensure adequate minerals. Consider consulting a nutritionist for a customized feeding plan. Monitor weight gain weekly.`
    } else {
      return `Nutrition needs immediate attention. Implement high-quality feed program with protein supplements and minerals. Consider veterinary consultation for nutritional assessment. Focus on gradual weight gain and health improvement.`
    }
  }

  const generateBreedingResponse = () => {
    const score = maliScore?.totalScore || 75
    const age = maliScore?.ageEstimation || 75
    
    if (score >= 80 && age >= 70) {
      return `Your cattle is excellent for breeding programs! High health score and appropriate age make it ideal for reproduction. Consider genetic testing and breeding management protocols. Focus on maintaining health during breeding season.`
    } else if (score >= 60) {
      return `Good breeding potential with some improvements needed. Focus on health optimization before breeding season. Consider genetic assessment and breeding management planning. Monitor health closely during breeding.`
    } else {
      return `Breeding not recommended at current health level. Focus on health improvement first. Consider veterinary assessment for breeding suitability. Health and nutrition must be optimal before breeding.`
    }
  }

  const generateCareResponse = () => {
    return `For optimal livestock care, I recommend: 1) Regular health monitoring and veterinary check-ups, 2) Proper nutrition with quality feed and clean water, 3) Clean, comfortable housing with good ventilation, 4) Disease prevention through vaccination and hygiene, 5) Regular exercise and movement. What specific care aspect would you like to know more about?`
  }

  const generateScoreResponse = () => {
    const score = maliScore?.totalScore || 75
    const bodyCondition = maliScore?.bodyCondition || 75
    const physicalHealth = maliScore?.physicalHealth || 75
    const conformation = maliScore?.conformation || 75
    const ageEstimation = maliScore?.ageEstimation || 75
    
    return `Your Mali-Score breakdown: Overall: ${score}/100, Body Condition: ${bodyCondition}/100, Physical Health: ${physicalHealth}/100, Conformation: ${conformation}/100, Age Estimation: ${ageEstimation}/100. This score indicates ${score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'needs improvement'} health status. Would you like detailed recommendations for any specific area?`
  }

  const generateDefaultResponse = () => {
    const score = maliScore?.totalScore || 0
    const hasImage = selectedImage ? true : false
    
    if (hasImage && score > 0) {
      return `Based on your selected cattle "${selectedImage.alt}" with a Mali-Score of ${score}/100, I can provide specific insights. Here are some quick actions I can help with:\n\n• **Health Analysis** - Detailed health assessment and recommendations\n• **Market Value** - Current market price and selling strategies\n• **Nutrition Plan** - Feeding recommendations for optimal health\n• **Breeding Potential** - Reproductive health evaluation\n• **Care Schedule** - Daily management recommendations\n\nWhat would you like to explore first?`
    } else if (hasImage) {
      return `I can see you've selected "${selectedImage.alt}". I can help analyze this cattle's health, provide market insights, nutrition advice, and care recommendations. What specific aspect would you like to know about?`
    } else {
      return `I'm here to help with your livestock questions! I can assist with health analysis, market value, nutrition, breeding, and general care. Here are some topics I can help with:\n\n🏥 Health Assessment\n💰 Market Analysis\n🌾 Nutrition Planning\n🐄 Breeding Advice\n🔧 Care Management\n\nWhat would you like to know about?`
    }
  }

  const quickActions = [
    { label: "Health Analysis", action: "Analyze my cattle's health", icon: "🏥" },
    { label: "Market Value", action: "What's my cattle worth?", icon: "💰" },
    { label: "Nutrition", action: "Nutrition recommendations", icon: "🌾" },
    { label: "Breeding", action: "Breeding potential", icon: "🐄" },
    { label: "Care Tips", action: "Daily care advice", icon: "🔧" },
    { label: "Score Help", action: "Explain my Mali-Score", icon: "📊" }
  ]

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Mali AI Chat</h3>
              <p className="text-sm text-gray-600">Your livestock intelligence assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-500 ml-2' 
                    : 'bg-purple-500 mr-2'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <MessageCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-sm whitespace-pre-wrap">
                    {message.message.split('\n').map((line, index) => {
                      if (line.startsWith('• ')) {
                        return (
                          <div key={index} className="flex items-start mt-1">
                            <span className="mr-2">•</span>
                            <span>{line.substring(2)}</span>
                          </div>
                        )
                      } else if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <div key={index} className="font-semibold mt-2">
                            {line.substring(2, line.length - 2)}
                          </div>
                        )
                      } else if (line.trim() === '') {
                        return <br key={index} />
                      } else {
                        return <div key={index}>{line}</div>
                      }
                    })}
                  </div>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-purple-500 mr-2 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center p-2 text-sm bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors text-left"
                  disabled={isTyping}
                >
                  <span className="mr-2">{action.icon}</span>
                  <span className="text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your livestock..."
              className="flex-1 p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaliChat
