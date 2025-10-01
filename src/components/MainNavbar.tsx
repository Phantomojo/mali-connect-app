import React from 'react'
import { BarChart, Map, ShoppingCart, CreditCard } from 'react-feather'

interface MainNavbarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const MainNavbar: React.FC<MainNavbarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart,
      color: 'from-green-400 to-emerald-500'
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
    }
  ]

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200/50">
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                    : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainNavbar
