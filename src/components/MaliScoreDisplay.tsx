import React from 'react'
import { TrendingUp, Activity, Shield, Clock } from 'react-feather'
import Lottie from 'lottie-react'
import successAnimation from '../assets/animations/success-checkmark.json'

interface MaliScore {
  bodyCondition: number
  physicalHealth: number
  conformation: number
  ageEstimation: number
  totalScore: number
}

interface MaliScoreDisplayProps {
  maliScore: MaliScore
}

const MaliScoreDisplay: React.FC<MaliScoreDisplayProps> = ({ maliScore }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'score-excellent'
    if (score >= 60) return 'score-good'
    if (score >= 40) return 'score-fair'
    return 'score-poor'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const calculateMarketValue = (score: number) => {
    const basePrice = 500
    const multiplier = score / 100
    return Math.round(basePrice * multiplier * 1.1) // 10% market premium
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: 60, height: 60 }}
          />
        </div>
        <h2 className="text-3xl font-bold text-mali-dark mb-2">Mali-Score Generated</h2>
        <p className="text-mali-gray">AI-powered livestock health assessment complete</p>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-mali-green to-mali-blue text-white text-4xl font-bold shadow-lg">
          {maliScore.totalScore}
        </div>
        <div className="mt-2">
          <span className={`score-badge ${getScoreColor(maliScore.totalScore)}`}>
            {getScoreLabel(maliScore.totalScore)} Health
          </span>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Activity className="mr-3 text-mali-green" size={20} />
              <span className="font-medium">Body Condition</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{maliScore.bodyCondition}</div>
              <div className="text-sm text-mali-gray">40% weight</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield className="mr-3 text-mali-blue" size={20} />
              <span className="font-medium">Physical Health</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{maliScore.physicalHealth}</div>
              <div className="text-sm text-mali-gray">25% weight</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="mr-3 text-mali-orange" size={20} />
              <span className="font-medium">Conformation</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{maliScore.conformation}</div>
              <div className="text-sm text-mali-gray">20% weight</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="mr-3 text-mali-red" size={20} />
              <span className="font-medium">Age Estimation</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{maliScore.ageEstimation}</div>
              <div className="text-sm text-mali-gray">15% weight</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Value */}
      <div className="text-center p-4 bg-gradient-to-r from-mali-green to-mali-blue rounded-lg text-white">
        <div className="text-sm opacity-90 mb-1">Estimated Market Value</div>
        <div className="text-3xl font-bold">${calculateMarketValue(maliScore.totalScore)}</div>
        <div className="text-sm opacity-90 mt-1">Based on Mali-Score assessment</div>
      </div>
    </div>
  )
}

export default MaliScoreDisplay
