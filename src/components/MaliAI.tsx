import React, { useState, useEffect } from 'react'
import { Cpu, Zap, Target, TrendingUp, Shield, Users } from 'react-feather'
import useAI from '../hooks/useAI'

interface MaliAIProps {
  maliScore: any
  selectedImage?: any
  onAIAction?: (action: string, data: any) => void
}

const MaliAI: React.FC<MaliAIProps> = ({ maliScore, selectedImage, onAIAction }) => {
  const { analysis: aiAnalysis, marketAnalysis, isAnalyzing, error } = useAI()
  const [aiInsights, setAiInsights] = useState<any>(null)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)

  // Generate AI insights based on Mali-Score
  useEffect(() => {
    if (maliScore && !isAnalyzing) {
      generateAIInsights()
    }
  }, [maliScore, isAnalyzing])

  const generateAIInsights = async () => {
    setIsGeneratingInsights(true)
    
    // Simulate AI insight generation
    setTimeout(() => {
      const insights = {
        healthRecommendations: generateHealthRecommendations(maliScore),
        marketInsights: generateMarketInsights(maliScore),
        riskAssessment: generateRiskAssessment(maliScore),
        improvementSuggestions: generateImprovementSuggestions(maliScore),
        aiConfidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        nextSteps: generateNextSteps(maliScore)
      }
      setAiInsights(insights)
      setIsGeneratingInsights(false)
    }, 2000)
  }

  const generateHealthRecommendations = (score: any) => {
    if (score.totalScore >= 80) {
      return [
        "Excellent health condition - maintain current care routine",
        "Consider premium market placement for maximum value",
        "Ideal for breeding programs"
      ]
    } else if (score.totalScore >= 60) {
      return [
        "Good health with room for improvement",
        "Focus on nutrition and regular health monitoring",
        "Consider veterinary check-up for optimization"
      ]
    } else {
      return [
        "Health improvement needed - consult veterinarian",
        "Implement targeted nutrition program",
        "Monitor closely for any health changes"
      ]
    }
  }

  const generateMarketInsights = (score: any) => {
    const baseValue = 500 * (score.totalScore / 100)
    return {
      estimatedValue: Math.round(baseValue),
      marketTiming: score.totalScore >= 70 ? "Sell now for premium price" : "Wait for health improvement",
      targetMarkets: score.totalScore >= 80 ? ["Premium markets", "Export markets"] : ["Local markets", "Processing markets"],
      priceRange: {
        min: Math.round(baseValue * 0.8),
        max: Math.round(baseValue * 1.2)
      }
    }
  }

  const generateRiskAssessment = (score: any) => {
    const risks = []
    if (score.bodyCondition < 60) risks.push("Underweight risk")
    if (score.physicalHealth < 60) risks.push("Health vulnerability")
    if (score.conformation < 60) risks.push("Structural concerns")
    if (score.ageEstimation > 80) risks.push("Age-related decline")
    
    return {
      riskLevel: risks.length === 0 ? "Low" : risks.length <= 2 ? "Medium" : "High",
      risks: risks,
      mitigation: generateMitigationStrategies(risks)
    }
  }

  const generateMitigationStrategies = (risks: string[]) => {
    const strategies = []
    if (risks.includes("Underweight risk")) strategies.push("Increase feed quality and quantity")
    if (risks.includes("Health vulnerability")) strategies.push("Implement health monitoring protocol")
    if (risks.includes("Structural concerns")) strategies.push("Consult with veterinarian for assessment")
    if (risks.includes("Age-related decline")) strategies.push("Consider immediate market placement")
    return strategies
  }

  const generateImprovementSuggestions = (score: any) => {
    const suggestions = []
    if (score.bodyCondition < 70) suggestions.push("Nutrition optimization program")
    if (score.physicalHealth < 70) suggestions.push("Health treatment plan")
    if (score.conformation < 70) suggestions.push("Exercise and movement program")
    if (score.ageEstimation < 70) suggestions.push("Growth monitoring system")
    return suggestions
  }

  const generateNextSteps = (score: any) => {
    if (score.totalScore >= 80) {
      return [
        "List on premium marketplace",
        "Apply for insurance coverage",
        "Consider breeding program"
      ]
    } else if (score.totalScore >= 60) {
      return [
        "Implement improvement plan",
        "Monitor progress weekly",
        "Reassess in 30 days"
      ]
    } else {
      return [
        "Immediate veterinary consultation",
        "Start health improvement program",
        "Consider immediate sale if urgent"
      ]
    }
  }

  const handleAIAction = (action: string, data: any) => {
    if (onAIAction) {
      onAIAction(action, data)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Mali AI Assistant</h3>
          <p className="text-gray-600">AI-powered livestock intelligence</p>
        </div>
      </div>

      {/* AI Status */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isGeneratingInsights ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="font-medium text-gray-700">
              {isGeneratingInsights ? 'Generating AI insights...' : 'AI Ready'}
            </span>
          </div>
          {aiInsights && (
            <span className="text-sm text-gray-600">
              Confidence: {Math.round(aiInsights.aiConfidence * 100)}%
            </span>
          )}
        </div>
      </div>

      {isGeneratingInsights ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Mali AI is analyzing your livestock data...</p>
        </div>
      ) : aiInsights ? (
        <div className="space-y-6">
          {/* Health Recommendations */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-green-800">Health Recommendations</h4>
            </div>
            <ul className="space-y-2">
              {aiInsights.healthRecommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm text-green-700 flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Market Insights */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-blue-800">Market Intelligence</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">Estimated Value:</span>
                <p className="text-blue-800 font-bold">${aiInsights.marketInsights.estimatedValue}</p>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Market Timing:</span>
                <p className="text-blue-800">{aiInsights.marketInsights.marketTiming}</p>
              </div>
              <div className="col-span-2">
                <span className="text-blue-600 font-medium">Target Markets:</span>
                <p className="text-blue-800">{aiInsights.marketInsights.targetMarkets.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Target className="w-5 h-5 text-orange-600 mr-2" />
              <h4 className="font-semibold text-orange-800">Risk Assessment</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-600 font-medium">Risk Level:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                aiInsights.riskAssessment.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                aiInsights.riskAssessment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {aiInsights.riskAssessment.riskLevel}
              </span>
            </div>
            {aiInsights.riskAssessment.risks.length > 0 && (
              <div className="mb-2">
                <span className="text-orange-600 font-medium text-sm">Identified Risks:</span>
                <p className="text-orange-800 text-sm">{aiInsights.riskAssessment.risks.join(", ")}</p>
              </div>
            )}
            {aiInsights.riskAssessment.mitigation.length > 0 && (
              <div>
                <span className="text-orange-600 font-medium text-sm">Mitigation Strategies:</span>
                <ul className="mt-1">
                  {aiInsights.riskAssessment.mitigation.map((strategy: string, index: number) => (
                    <li key={index} className="text-orange-800 text-sm">• {strategy}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Improvement Suggestions */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Zap className="w-5 h-5 text-purple-600 mr-2" />
              <h4 className="font-semibold text-purple-800">Improvement Suggestions</h4>
            </div>
            <ul className="space-y-1">
              {aiInsights.improvementSuggestions.map((suggestion: string, index: number) => (
                <li key={index} className="text-sm text-purple-700 flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Users className="w-5 h-5 text-gray-600 mr-2" />
              <h4 className="font-semibold text-gray-800">Recommended Next Steps</h4>
            </div>
            <div className="space-y-2">
              {aiInsights.nextSteps.map((step: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAIAction('next-step', { step, index })}
                  className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{step}</span>
                    <span className="text-purple-500 text-sm">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Cpu className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Mali AI is ready to analyze your livestock data</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-800 text-sm">AI Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-red-600 text-sm underline hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}

export default MaliAI
