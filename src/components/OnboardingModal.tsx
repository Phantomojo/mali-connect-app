import React, { useState, useContext } from 'react'
import { X, ChevronRight, ChevronLeft, CheckCircle, Zap, Users, Map, Star } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme()
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleFinish()
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('hasVisitedMaliConnect', 'true')
    onClose()
  }

  const handleFinish = () => {
    localStorage.setItem('hasVisitedMaliConnect', 'true')
    onClose()
  }

  if (!isOpen) return null

  const slides = [
    {
      id: 1,
      title: "Welcome to Mali-Connect",
      subtitle: "Next-Gen Livestock Intelligence",
      icon: <Star className="w-16 h-16 text-yellow-500" />,
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-500 via-cyan-500 to-violet-500 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl font-black text-white">M</span>
          </div>
          <p className={`text-lg leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience the future of livestock management with AI-powered assessment, 
            3D visualization, and real-time market intelligence. Transform your 
            cattle operations with cutting-edge technology.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>3D Visualization</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Market Intelligence</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "3D Assessment Technology",
      subtitle: "Revolutionary Health Analysis",
      icon: <Zap className="w-16 h-16 text-blue-500" />,
      content: (
        <div className="space-y-6">
          <div className="relative">
            <div className="w-48 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
              <div className="w-24 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">3D</span>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>AI Analysis</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Advanced computer vision analyzes cattle health, body condition, and conformation
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>3D Visualization</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Interactive 3D models with diagnostic markers and health indicators
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Mali-Score</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Comprehensive scoring system for health, conformation, and market value
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Real-time Results</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Instant analysis with detailed recommendations and insights
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Dual-View System",
      subtitle: "Herder & Processor Perspectives",
      icon: <Users className="w-16 h-16 text-green-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border-2 ${
              isDarkMode 
                ? 'bg-gray-800 border-green-500' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">H</span>
                </div>
                <h4 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Herder View</h4>
              </div>
              <ul className={`space-y-2 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Manage your cattle herd
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Track health assessments
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Monitor Mali-Scores
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Access market insights
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl border-2 ${
              isDarkMode 
                ? 'bg-gray-800 border-blue-500' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">P</span>
                </div>
                <h4 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Processor View</h4>
              </div>
              <ul className={`space-y-2 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  Review incoming animals
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  Approve/reject submissions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  Quality assessment
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                  Supply chain management
                </li>
              </ul>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <p className={`text-center text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Switch between views using the toggle at the top of the screen to access 
              different features based on your role in the livestock ecosystem.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Ecosystem Map",
      subtitle: "Interactive Geospatial Intelligence",
      icon: <Map className="w-16 h-16 text-purple-500" />,
      content: (
        <div className="space-y-6">
          <div className="relative">
            <div className="w-64 h-40 mx-auto bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 rounded-xl flex items-center justify-center mb-6">
              <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-6 h-6 rounded ${
                    i % 3 === 0 ? 'bg-green-500' : 
                    i % 3 === 1 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                ))}
              </div>
            </div>
            <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">📍</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 flex items-center ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Pasture Quality
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                3D visualization of pasture conditions across Africa
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 flex items-center ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Water Sources
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Locate and analyze water availability
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 flex items-center ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                Market Locations
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Find livestock markets and processing facilities
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h4 className={`font-semibold mb-2 flex items-center ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                Environmental Data
              </h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Weather, soil, and climate information
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  const currentSlide = slides.find(slide => slide.id === step) || slides[0]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`relative max-w-4xl w-full max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center">
            {currentSlide.icon}
            <div className="ml-4">
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {currentSlide.title}
              </h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {currentSlide.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className="transition-all duration-300 ease-in-out">
            {currentSlide.content}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-6 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Progress Indicator */}
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index + 1 <= step
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : isDarkMode
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                }`}
              />
            ))}
            <span className={`text-sm ml-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {step} of {totalSteps}
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3">
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            
            <button
              onClick={handleSkip}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Skip Tour
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              {step === totalSteps ? 'Finish Tour' : 'Next'}
              {step < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingModal
