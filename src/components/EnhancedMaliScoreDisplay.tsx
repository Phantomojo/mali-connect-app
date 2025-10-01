import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { TrendingUp, Activity, Shield, Clock, Star, Award } from 'react-feather'
import Lottie from 'lottie-react'
import successAnimation from '../assets/animations/success-checkmark.json'

interface MaliScore {
  bodyCondition: number
  physicalHealth: number
  conformation: number
  ageEstimation: number
  totalScore: number
}

interface EnhancedMaliScoreDisplayProps {
  maliScore: MaliScore
  animalId?: string
  animalName?: string
}

const EnhancedMaliScoreDisplay: React.FC<EnhancedMaliScoreDisplayProps> = ({ 
  maliScore, 
  animalId,
  animalName 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500'
    if (score >= 60) return 'from-blue-400 to-cyan-500'
    if (score >= 40) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-pink-500'
  }

  const calculateMarketValue = (score: number) => {
    const basePrice = 500
    const multiplier = score / 100
    return Math.round(basePrice * multiplier * 1.1) // 10% market premium
  }

  // Prepare data for radar chart
  const radarData = [
    {
      metric: 'Body Condition',
      score: maliScore.bodyCondition,
      fullMark: 100,
      icon: <Activity className="w-4 h-4" />
    },
    {
      metric: 'Physical Health',
      score: maliScore.physicalHealth,
      fullMark: 100,
      icon: <Shield className="w-4 h-4" />
    },
    {
      metric: 'Conformation',
      score: maliScore.conformation,
      fullMark: 100,
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      metric: 'Age Estimation',
      score: maliScore.ageEstimation,
      fullMark: 100,
      icon: <Clock className="w-4 h-4" />
    }
  ]

  const valueStatus = getScoreLabel(maliScore.totalScore)
  const valueColor = getScoreColor(maliScore.totalScore)
  const valueGradient = getScoreGradient(maliScore.totalScore)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ width: 60, height: 60 }}
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Mali-Score Assessment</h2>
        {animalId && (
          <p className="text-lg text-gray-600 mb-2">
            {animalName || `Animal ${animalId}`}
          </p>
        )}
        <p className="text-gray-500">AI-powered livestock health assessment complete</p>
      </div>

      {/* Overall Score Display */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center">
          {/* Outer Ring */}
          <div className="relative w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center">
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - maliScore.totalScore / 100)}`}
                className={`text-${valueColor.split('-')[1]}-500`}
                style={{
                  transition: 'stroke-dashoffset 1s ease-in-out',
                  strokeLinecap: 'round'
                }}
              />
            </svg>
            
            {/* Score Display */}
            <div className="text-center">
              <div className={`text-4xl font-bold ${valueColor}`}>
                {maliScore.totalScore}
              </div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${valueGradient} text-white shadow-lg`}>
            <Award className="w-4 h-4 mr-2" />
            {valueStatus} Health
          </span>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Health Metrics Breakdown</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <PolarGrid 
                gridType="polygon" 
                radialLines={false}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
              />
              <PolarRadiusAxis 
                angle={0} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke={`var(--color-${valueColor.split('-')[1]}-500)`}
                fill={`var(--color-${valueColor.split('-')[1]}-500)`}
                fillOpacity={0.2}
                strokeWidth={3}
                dot={{ fill: `var(--color-${valueColor.split('-')[1]}-500)`, strokeWidth: 2, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {radarData.map((metric, index) => (
          <div key={metric.metric} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-${valueColor.split('-')[1]}-100 mr-3`}>
                  {metric.icon}
                </div>
                <span className="font-medium text-gray-800">{metric.metric}</span>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${valueColor}`}>
                  {metric.score}
                </div>
                <div className="text-sm text-gray-500">/ 100</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${valueGradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${metric.score}%` }}
              ></div>
            </div>
            
            {/* Weight Indicator */}
            <div className="mt-2 text-xs text-gray-500">
              Weight: {index === 0 ? '40%' : index === 1 ? '25%' : index === 2 ? '20%' : '15%'}
            </div>
          </div>
        ))}
      </div>

      {/* Market Value Display */}
      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
        <div className="flex items-center justify-center mb-2">
          <Star className="w-6 h-6 text-green-500 mr-2" />
          <span className="text-lg font-semibold text-gray-800">Estimated Market Value</span>
        </div>
        <div className="text-4xl font-bold text-green-600 mb-2">
          ${calculateMarketValue(maliScore.totalScore).toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">
          Based on Mali-Score assessment and current market conditions
        </div>
      </div>

      {/* Health Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          Health Insights
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          {maliScore.totalScore >= 85 && (
            <>
              <p>• Exceptional health condition - ideal for premium markets</p>
              <p>• Excellent breeding potential and genetic value</p>
              <p>• Recommended for high-value trading opportunities</p>
            </>
          )}
          {maliScore.totalScore >= 70 && maliScore.totalScore < 85 && (
            <>
              <p>• Good overall health with minor areas for improvement</p>
              <p>• Suitable for most market conditions</p>
              <p>• Consider targeted nutrition or care improvements</p>
            </>
          )}
          {maliScore.totalScore >= 55 && maliScore.totalScore < 70 && (
            <>
              <p>• Fair health condition requiring attention</p>
              <p>• May benefit from veterinary consultation</p>
              <p>• Consider local markets or health improvement before sale</p>
            </>
          )}
          {maliScore.totalScore < 55 && (
            <>
              <p>• Health concerns identified - immediate attention needed</p>
              <p>• Veterinary consultation strongly recommended</p>
              <p>• Focus on health improvement before market consideration</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnhancedMaliScoreDisplay
