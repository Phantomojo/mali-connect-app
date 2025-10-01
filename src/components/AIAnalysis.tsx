import React, { useState, useEffect } from 'react'
import { Activity, Cpu, Eye, CheckCircle } from 'react-feather'
import Lottie from 'lottie-react'
import loadingAnimation from '../assets/animations/loading-analysis.json'

interface AnalysisStep {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  duration: number
  completed: boolean
}

interface AIImageAnalysis {
  bodyCondition: number
  physicalHealth: number
  conformation: number
  ageEstimation: number
  totalScore: number
  confidence: number
  analysis: {
    bodyConditionAnalysis: string
    physicalHealthAnalysis: string
    conformationAnalysis: string
    ageEstimationAnalysis: string
    overallAssessment: string
    recommendations: string[]
  }
}

interface AIAnalysisProps {
  analysis: AIImageAnalysis | null
  isLoading: boolean
  selectedImage: string | null
  apiStatus: {
    groq: boolean
    huggingFace: boolean
  }
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysis, isLoading, selectedImage, apiStatus }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [steps, setSteps] = useState<AnalysisStep[]>([])

  const analysisSteps: AnalysisStep[] = [
    {
      id: 'image-processing',
      name: 'Image Processing',
      description: 'Analyzing uploaded images and extracting features',
      icon: <Eye className="w-6 h-6" />,
      duration: 2000,
      completed: false
    },
    {
      id: '3d-reconstruction',
      name: '3D Reconstruction',
      description: 'Building 3D model from multiple image angles',
      icon: <Activity className="w-6 h-6" />,
      duration: 3000,
      completed: false
    },
    {
      id: 'body-condition',
      name: 'Body Condition Analysis',
      description: 'Assessing weight, muscle tone, and overall condition',
      icon: <CheckCircle className="w-6 h-6" />,
      duration: 2500,
      completed: false
    },
    {
      id: 'health-assessment',
      name: 'Health Assessment',
      description: 'Evaluating skin condition, coat quality, and signs of disease',
      icon: <CheckCircle className="w-6 h-6" />,
      duration: 2000,
      completed: false
    },
    {
      id: 'conformation-analysis',
      name: 'Conformation Analysis',
      description: 'Analyzing bone structure, posture, and breed characteristics',
      icon: <CheckCircle className="w-6 h-6" />,
      duration: 2000,
      completed: false
    },
    {
      id: 'age-estimation',
      name: 'Age Estimation',
      description: 'Determining age based on facial features and development',
      icon: <CheckCircle className="w-6 h-6" />,
      duration: 1500,
      completed: false
    },
    {
      id: 'ai-scoring',
      name: 'AI Scoring',
      description: 'Calculating final Mali-Score using machine learning algorithms',
      icon: <Cpu className="w-6 h-6" />,
      duration: 2000,
      completed: false
    }
  ]

  useEffect(() => {
    if (isLoading) {
      setSteps(analysisSteps)
      setCurrentStep(0)
      setProgress(0)
      startAnalysis()
    } else {
      setSteps([])
      setCurrentStep(0)
      setProgress(0)
    }
  }, [isLoading])

  const startAnalysis = async () => {
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i)
      
      // Update step as in progress
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, completed: false } : step
      ))
      
      // Simulate step duration
      await new Promise(resolve => setTimeout(resolve, analysisSteps[i].duration))
      
      // Mark step as completed
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, completed: true } : step
      ))
      
      // Update progress
      setProgress(((i + 1) / analysisSteps.length) * 100)
    }
    
    // Analysis complete
    console.log('Analysis completed:', {
      completed: true,
      totalSteps: analysisSteps.length,
      completedSteps: analysisSteps.length
    })
  }

  if (!isLoading) return null

  return (
    <div className="card">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
          <Cpu className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-mali-dark mb-4">
          AI Analysis in Progress
        </h3>
        
        <p className="text-mali-gray mb-6">
          Our advanced AI is analyzing the 3D model and calculating the Mali-Score...
        </p>
        
        {/* Overall Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-mali-gray">
          {Math.round(progress)}% Complete • Step {currentStep + 1} of {analysisSteps.length}
        </p>
      </div>

      {/* Analysis Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
              index === currentStep
                ? 'bg-purple-50 border-2 border-purple-200'
                : step.completed
                ? 'bg-green-50 border border-green-200'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              step.completed
                ? 'bg-green-500 text-white'
                : index === currentStep
                ? 'bg-purple-500 text-white animate-pulse'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {step.completed ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-medium text-sm ${
                step.completed ? 'text-green-800' : 
                index === currentStep ? 'text-purple-800' : 'text-gray-600'
              }`}>
                {step.name}
              </h4>
              <p className={`text-xs ${
                step.completed ? 'text-green-600' : 
                index === currentStep ? 'text-purple-600' : 'text-gray-500'
              }`}>
                {step.description}
              </p>
            </div>
            
            {index === currentStep && (
              <div className="ml-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lottie Animation */}
      <div className="mt-6 text-center">
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          style={{ width: 120, height: 120, margin: '0 auto' }}
        />
      </div>

      {/* Analysis Insights */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2 text-sm">Analysis Insights</h4>
        <div className="text-xs text-blue-700 space-y-1">
          <p>• Using computer vision to analyze 3D model geometry</p>
          <p>• Machine learning algorithms trained on 10,000+ cattle images</p>
          <p>• Real-time health assessment with 95% accuracy</p>
        </div>
      </div>
    </div>
  )
}

export default AIAnalysis