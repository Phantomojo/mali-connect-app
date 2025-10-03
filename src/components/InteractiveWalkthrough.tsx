import React, { useState, useEffect, Suspense } from 'react'
import { Play, Smartphone, MessageSquare, CheckCircle, Loader, Camera, Zap, Database, Cpu, Eye, ArrowLeft } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'
import CattleViewer3D from './CattleViewer3D'

interface InteractiveWalkthroughProps {
  onSelectSmartphone: () => void
  onSelectSms: () => void
  onBackToApp?: () => void
}

type AnalysisState = 'idle' | 'analyzing' | 'complete'

const InteractiveWalkthrough: React.FC<InteractiveWalkthroughProps> = ({
  onSelectSmartphone,
  onSelectSms,
  onBackToApp
}) => {
  const { isDarkMode } = useTheme()
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle')
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const analysisSteps = [
    {
      icon: Camera,
      text: "Capturing high-resolution imagery...",
      description: "Processing Abdi's bull photos with precision"
    },
    {
      icon: Zap,
      text: "Generating 3D digital twin...",
      description: "Creating holographic representation of the animal"
    },
    {
      icon: Eye,
      text: "AI analyzing anatomical structure & health indicators...",
      description: "Detecting ribs, muscle definition, and overall condition"
    },
    {
      icon: Database,
      text: "Cross-referencing with market data & breed specifics...",
      description: "Matching against 50+ cattle breed profiles and market values"
    },
    {
      icon: Cpu,
      text: "Calculating verifiable Mali-Score...",
      description: "Generating trusted health and value assessment"
    }
  ]

  const handleBeginAnalysis = () => {
    setAnalysisState('analyzing')
    setCurrentStep(0)
    setProgress(0)
  }

  const handleReset = () => {
    setAnalysisState('idle')
    setCurrentStep(0)
    setProgress(0)
  }

  // Handle analysis sequence
  useEffect(() => {
    if (analysisState === 'analyzing') {
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < analysisSteps.length - 1) {
            setProgress(((prev + 1) / analysisSteps.length) * 100)
            return prev + 1
          } else {
            setProgress(100)
            setTimeout(() => setAnalysisState('complete'), 1500)
            clearInterval(stepInterval)
            return prev
          }
        })
      }, 2000)

      return () => clearInterval(stepInterval)
    }
  }, [analysisState])

  const renderIdleState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      {/* Back Button */}
      {onBackToApp && (
        <div className="absolute top-8 left-8">
          <button
            onClick={onBackToApp}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to App</span>
          </button>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="mb-16 mx-4">
        <div className="relative mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent mb-6 tracking-tight">
            Invisible Wealth
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-8">
            The Pastoralist's Dilemma
          </h2>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Meet Abdi, a dedicated pastoralist whose wealth is tied to his prize bull. Yet, without a verifiable way to prove its value, Abdi struggles to access loans, fair market prices, or even insurance. His most valuable asset remains invisible to the modern financial world.
        </p>
      </div>

      {/* 3D Model Demo */}
      <div className="mb-16 relative mx-4">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl h-64 md:h-80">
          <Suspense fallback={
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin text-mali-green mx-auto mb-2" />
                <p className="text-sm text-gray-600">Loading 3D Model...</p>
              </div>
            </div>
          }>
            <CattleViewer3D 
              maliScore={85}
              viewMode="herder"
              selectedAnimal={null}
              onAnimalSelect={() => {}}
            />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-6 left-6 text-white pointer-events-none">
            <p className="text-sm font-medium mb-1">AI-Powered Livestock Assessment</p>
            <p className="text-xs opacity-90">3D Holographic Analysis</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mx-4">
        <button
          onClick={handleBeginAnalysis}
          className="group relative px-12 py-6 bg-gradient-to-r from-mali-green to-emerald-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-4"
        >
          <Play className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
          <span>Begin Livestock Analysis</span>
          <div className="absolute inset-0 bg-gradient-to-r from-mali-green to-emerald-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  )

  const renderAnalyzingState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      {/* Analysis Header */}
      <div className="mb-16 mx-4">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          AI Analysis in Progress
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Our advanced algorithms are processing your livestock data...
        </p>
      </div>

      {/* Demo Image with Overlay */}
      <div className="mb-16 relative mx-4">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src="/images/real-cattle/cattle-1.jpeg" 
            alt="Analysis in Progress"
            className="w-full max-w-2xl h-64 md:h-80 object-cover"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDE1MFYyMDBIMTUwVjEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE1MCAxMDBIMjUwVjIwMEgxNTBWMTEwWiIgZmlsbD0iIzZCNzI4MCIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BbmFseXNpcyBpbiBQcm9ncmVzczwvdGV4dD4KPC9zdmc+'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Analysis Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl max-w-sm mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Loader className="w-6 h-6 animate-spin text-mali-green" />
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {analysisSteps[currentStep]?.text || "Processing..."}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {analysisSteps[currentStep]?.description || "Analyzing data..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-12 mx-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>Analysis Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-mali-green to-emerald-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Analysis Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-4">
        {analysisSteps.map((step, index) => {
          const IconComponent = step.icon
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          
          return (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-mali-green text-white shadow-lg scale-105'
                  : isCompleted
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  isActive
                    ? 'bg-white/20'
                    : isCompleted
                      ? 'bg-green-200 dark:bg-green-800'
                      : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    isActive
                      ? 'text-white'
                      : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${
                    isActive
                      ? 'text-white'
                      : isCompleted
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderCompleteState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      {/* Success Header */}
      <div className="mb-16 mx-4">
        <div className="mb-12">
          <CheckCircle className="w-24 h-24 text-mali-green mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            Analysis Complete! Abdi's Bull Now Has a Verifiable Mali-Score.
          </h2>
          <div className="bg-gradient-to-r from-mali-green to-emerald-600 text-white px-8 py-6 rounded-2xl inline-block shadow-lg">
            <p className="text-2xl font-bold mb-2">Mali-Score: 85/100</p>
            <p className="text-lg">Digital Twin Created</p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
          With its unique digital twin and a trusted Mali-Score of 85/100, Abdi's bull is no longer invisible. It's a bankable asset, ready for market, insurance, or collateral. Now, how will Abdi manage his newly empowered herd?
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mx-4">
        {/* Smartphone Option */}
        <button
          onClick={onSelectSmartphone}
          className="group relative p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="relative z-10">
            <Smartphone className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="text-2xl font-bold mb-4">Manage with Smartphone App</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Interactive 3D visualization with touch controls, real-time analysis, and comprehensive herd management
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-200">
              <span className="text-sm font-medium">Tap to explore</span>
              <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </button>

        {/* SMS Option */}
        <button
          onClick={onSelectSms}
          className="group relative p-8 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="relative z-10">
            <MessageSquare className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="text-2xl font-bold mb-4">Manage with SMS (for Low Connectivity)</h3>
            <p className="text-teal-100 mb-6 leading-relaxed">
              Simple text-based interaction perfect for basic phones and areas with limited internet connectivity
            </p>
            <div className="flex items-center justify-center space-x-2 text-teal-200">
              <span className="text-sm font-medium">Text to interact</span>
              <div className="w-2 h-2 bg-teal-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-16 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl max-w-3xl mx-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          <strong>Note:</strong> Both interfaces provide access to the same AI-powered analysis and herd data. 
          Choose the option that best fits your device and connectivity needs.
        </p>
        <button
          onClick={handleReset}
          className="text-sm text-mali-green hover:text-green-600 font-medium transition-colors"
        >
          ← Restart Analysis
        </button>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'
    }`}>
      {analysisState === 'idle' && renderIdleState()}
      {analysisState === 'analyzing' && renderAnalyzingState()}
      {analysisState === 'complete' && renderCompleteState()}
    </div>
  )
}

export default InteractiveWalkthrough
