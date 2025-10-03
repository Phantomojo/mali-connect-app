import React from 'react'
import { BarChart, Map, ShoppingCart, CreditCard, Activity, Menu, X, MessageSquare, Bot } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface MainNavbarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
  onToggle: () => void
}

const MainNavbar: React.FC<MainNavbarProps> = ({ activeSection, onSectionChange, isOpen, onToggle }) => {
  const { isDarkMode } = useTheme()
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'assessment',
      label: 'Assessment',
      icon: Activity,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'ecosystem-map',
      label: 'Ecosystem Map',
      icon: Map,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: ShoppingCart,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'financial-services',
      label: 'Financial Services',
      icon: CreditCard,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'ai-chat',
      label: 'AI Assistant',
      icon: Bot,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'sms-simulator',
      label: 'SMS Simulator',
      icon: MessageSquare,
      color: 'from-teal-400 to-cyan-500'
    }
  ]

  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    onToggle() // Close drawer after selection
  }

  return (
    <>
      {/* Menu Toggle Button - Fixed position */}
      <button
        onClick={onToggle}
        className={`fixed top-6 left-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } ${isOpen ? 'rotate-180' : ''}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Slide-out Navigation Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50' 
          : 'bg-white/95 backdrop-blur-xl border-r border-gray-200/50'
      } shadow-2xl`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200/20">
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Navigation
          </h2>
          <p className={`text-sm mt-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore Mali Connect
          </p>
        </div>

        {/* Navigation Items */}
        <div className="p-6 space-y-3">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                    : isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-800/50 hover:scale-105' 
                      : 'text-gray-600 hover:bg-gray-100/50 hover:scale-105'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeSection === item.id
                    ? 'bg-white/20'
                    : isDarkMode
                      ? 'bg-gray-700/50'
                      : 'bg-gray-200/50'
                }`}>
                  <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-semibold text-base block">{item.label}</span>
                  <span className={`text-xs ${
                    activeSection === item.id
                      ? 'text-white/80'
                      : isDarkMode
                        ? 'text-gray-500'
                        : 'text-gray-500'
                  }`}>
                    {item.id === 'dashboard' && 'View your livestock data'}
                    {item.id === 'assessment' && 'AI-powered analysis'}
                    {item.id === 'ecosystem-map' && 'Explore the network'}
                    {item.id === 'marketplace' && 'Buy and sell livestock'}
                    {item.id === 'financial-services' && 'Banking and loans'}
                    {item.id === 'sms-simulator' && 'Interactive SMS simulation'}
                  </span>
                </div>
                {activeSection === item.id && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/20">
          <div className={`text-center text-xs ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Mali Connect v1.0
            <br />
            Next-Gen Livestock Intelligence
          </div>
        </div>
      </div>
    </>
  )
}

export default MainNavbar
