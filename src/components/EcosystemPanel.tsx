import React from 'react'
import { ShoppingCart, Shield, CreditCard, MapPin, Users, BarChart } from 'react-feather'

interface MaliScore {
  bodyCondition: number
  physicalHealth: number
  conformation: number
  ageEstimation: number
  totalScore: number
}

interface EcosystemFeature {
  id: string
  title: string
  description: string
  icon: string
  action: string
  value: number
  enabled: boolean
}

interface EcosystemPanelProps {
  maliScore: MaliScore
}

const EcosystemPanel: React.FC<EcosystemPanelProps> = ({ maliScore }) => {
  const ecosystemFeatures: EcosystemFeature[] = [
    {
      id: 'marketplace',
      title: 'Livestock Marketplace',
      description: 'List your cattle on the digital marketplace with verified health certificates',
      icon: 'ShoppingCart',
      action: 'List for Sale',
      value: Math.round(500 * (maliScore.totalScore / 100) * 1.1),
      enabled: maliScore.totalScore >= 60
    },
    {
      id: 'insurance',
      title: 'Health Insurance',
      description: 'Get instant insurance quotes based on your Mali-Score assessment',
      icon: 'Shield',
      action: 'Get Quote',
      value: Math.round(50 * (maliScore.totalScore / 100)),
      enabled: maliScore.totalScore >= 70
    },
    {
      id: 'credit',
      title: 'Micro-Credit',
      description: 'Use your livestock as collateral for instant micro-loans',
      icon: 'CreditCard',
      action: 'Apply Now',
      value: Math.round(300 * (maliScore.totalScore / 100)),
      enabled: maliScore.totalScore >= 50
    },
    {
      id: 'tracking',
      title: 'Health Tracking',
      description: 'Monitor your livestock health over time with regular assessments',
      icon: 'BarChart',
      action: 'Start Tracking',
      value: 0,
      enabled: true
    },
    {
      id: 'community',
      title: 'Farmer Network',
      description: 'Connect with other livestock owners in your region',
      icon: 'Users',
      action: 'Join Network',
      value: 0,
      enabled: true
    },
    {
      id: 'resources',
      title: 'Resource Map',
      description: 'Find nearby veterinary services, feed suppliers, and markets',
      icon: 'MapPin',
      action: 'View Map',
      value: 0,
      enabled: true
    }
  ]

  const getIcon = (iconName: string) => {
    const icons = {
      ShoppingCart,
      Shield,
      CreditCard,
      MapPin,
      Users,
      BarChart
    }
    const IconComponent = icons[iconName as keyof typeof icons] || ShoppingCart
    return <IconComponent size={24} />
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-mali-dark mb-4">
        Ecosystem Features
      </h2>
      <p className="text-mali-gray mb-6">
        Your Mali-Score unlocks access to a comprehensive livestock management ecosystem.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ecosystemFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              feature.enabled
                ? 'border-mali-green bg-green-50 hover:shadow-lg cursor-pointer'
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                feature.enabled ? 'bg-mali-green text-white' : 'bg-gray-300 text-gray-500'
              }`}>
                {getIcon(feature.icon)}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-mali-dark mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-mali-gray mb-3">
                  {feature.description}
                </p>
                
                {feature.value > 0 && (
                  <div className="text-lg font-bold text-mali-green mb-2">
                    ${feature.value}
                  </div>
                )}
                
                <button
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    feature.enabled
                      ? 'bg-mali-green hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!feature.enabled}
                >
                  {feature.enabled ? feature.action : 'Score Required'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Score Requirements */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-mali-blue mb-2">Score Requirements</h3>
        <div className="text-sm text-mali-gray space-y-1">
          <div>• Marketplace: 60+ Mali-Score</div>
          <div>• Insurance: 70+ Mali-Score</div>
          <div>• Micro-Credit: 50+ Mali-Score</div>
          <div>• Other features: Available to all</div>
        </div>
      </div>
    </div>
  )
}

export default EcosystemPanel
