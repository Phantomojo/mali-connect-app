import React from 'react'
import Lottie from 'lottie-react'
import { Activity, Cpu } from 'react-feather'
import loadingAnimation from '../assets/animations/loading-analysis.json'

interface AIAnalysisProps {
  isAnalyzing: boolean
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ isAnalyzing }) => {
  if (!isAnalyzing) return null

  return (
    <div className="card text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            style={{ width: 120, height: 120 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="text-mali-green" size={32} />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-mali-dark mb-2 flex items-center justify-center">
            <Activity className="mr-2 text-mali-green" size={24} />
            AI Analysis in Progress
          </h3>
          <p className="text-mali-gray">
            Processing livestock images and generating 3D health assessment...
          </p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-mali-green h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
        
        <div className="text-sm text-mali-gray">
          Analyzing body condition, physical health, conformation, and age estimation...
        </div>
      </div>
    </div>
  )
}

export default AIAnalysis
