import React from 'react'
import { TrendingUp, Activity, Shield, Clock } from 'react-feather'
import Lottie from 'lottie-react'
import { useTheme } from '../contexts/ThemeContext'
import successAnimation from '../assets/animations/success-checkmark.json'

interface MaliScore {
  bodyCondition: number
  physicalHealth: number
  conformation: number
  ageEstimation: number
  totalScore: number
}

interface AIImageAnalysis {
  analysis: string
  confidence: number
  recommendations: string[]
}

interface MaliScoreDisplayProps {
  maliScore: MaliScore
  analysis?: AIImageAnalysis | null
}

const MaliScoreDisplay: React.FC<MaliScoreDisplayProps> = ({ maliScore, analysis }) => {
  const { isDarkMode } = useTheme()
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
    <div className={`card transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: 60, height: 60 }}
          />
        </div>
        <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-100' : 'text-mali-dark'
        }`}>Mali-Score Generated</h2>
        <p className={`transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-mali-gray'
        }`}>AI-powered livestock health assessment complete</p>
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
          <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center">
              <Activity className="mr-3 text-mali-green" size={20} />
              <span className={`font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>Body Condition</span>
            </div>
            <div className="text-right">
              <div className={`font-bold text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{maliScore.bodyCondition}</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-mali-gray'
              }`}>40% weight</div>
            </div>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center">
              <Shield className="mr-3 text-mali-blue" size={20} />
              <span className={`font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>Physical Health</span>
            </div>
            <div className="text-right">
              <div className={`font-bold text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{maliScore.physicalHealth}</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-mali-gray'
              }`}>25% weight</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center">
              <TrendingUp className="mr-3 text-mali-orange" size={20} />
              <span className={`font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>Conformation</span>
            </div>
            <div className="text-right">
              <div className={`font-bold text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{maliScore.conformation}</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-mali-gray'
              }`}>20% weight</div>
            </div>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center">
              <Clock className="mr-3 text-mali-red" size={20} />
              <span className={`font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>Age Estimation</span>
            </div>
            <div className="text-right">
              <div className={`font-bold text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{maliScore.ageEstimation}</div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-mali-gray'
              }`}>15% weight</div>
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
