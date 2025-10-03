import React, { Suspense, lazy } from 'react'
import { ArrowLeft, Camera, MapPin, Calendar, User, Activity, Heart, Cpu } from 'react-feather'
import type { Animal } from '../data/herdData'
import EnhancedMaliScoreDisplay from './EnhancedMaliScoreDisplay'
import AdaptiveCattleViewer from './AdaptiveCattleViewer'
import { useTheme } from '../contexts/ThemeContext'

// Lazy load AI components
const AIAnalysis = lazy(() => import('./AIAnalysis'))

interface AnimalDetailViewProps {
  animal: Animal
  onBack: () => void
  viewMode: 'herder' | 'processor'
}

const AnimalDetailView: React.FC<AnimalDetailViewProps> = ({ 
  animal, 
  onBack, 
  viewMode 
}) => {
  const { isDarkMode } = useTheme()
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    if (isDarkMode) {
      switch (status) {
        case 'Approved':
          return 'bg-green-900/30 text-green-300 border-green-700'
        case 'Pending':
          return 'bg-yellow-900/30 text-yellow-300 border-yellow-700'
        case 'Under Review':
          return 'bg-blue-900/30 text-blue-300 border-blue-700'
        case 'Rejected':
          return 'bg-red-900/30 text-red-300 border-red-700'
        default:
          return 'bg-gray-700 text-gray-300 border-gray-600'
      }
    } else {
      switch (status) {
        case 'Approved':
          return 'bg-green-100 text-green-800 border-green-200'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'Under Review':
          return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'Rejected':
          return 'bg-red-100 text-red-800 border-red-200'
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to {viewMode === 'herder' ? 'Herd' : 'Intake'}</span>
          </button>
          
          <div className="text-right">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{animal.id}</h1>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{animal.breed} • {animal.age} years old</p>
          </div>
        </div>

        {/* Animal Image and Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="relative">
              <img
                src={animal.photoUrl}
                alt={animal.id}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="absolute top-4 right-4">
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(animal.submissionStatus)}`}>
                  <span>{animal.submissionStatus}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className={`w-5 h-5 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Herder</div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{animal.herderName}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className={`w-5 h-5 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Location</div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{animal.location}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className={`w-5 h-5 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Submitted</div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{formatDate(animal.submissionTime)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Activity className={`w-5 h-5 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Weight</div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{animal.weight} kg</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Heart className={`w-5 h-5 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Age</div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>{animal.age} years</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Camera className={`w-5 h-5 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Market Value</div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}>${animal.marketValue?.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Notes */}
            {animal.healthNotes && (
              <div className={`mt-6 p-4 rounded-lg transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>Health Notes</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{animal.healthNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Model and Enhanced Score Display */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 3D Model Viewer */}
        <div className={`xl:col-span-2 rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>3D Health Visualization</h3>
          <div className="h-[500px] lg:h-[600px]">
            <AdaptiveCattleViewer 
              activeSection="score"
              maliScore={animal.maliScore}
              isAnalyzing={false}
            />
          </div>
        </div>

        {/* Enhanced Mali Score Display */}
        <div className="xl:col-span-1">
          <EnhancedMaliScoreDisplay 
            maliScore={animal.maliScore}
            animalId={animal.id}
            animalName={animal.id}
          />
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center mb-4">
          <Cpu className="w-6 h-6 text-blue-500 mr-3" />
          <h3 className={`text-2xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>AI Analysis Report</h3>
        </div>
        
        <Suspense fallback={
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className={`ml-3 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Loading AI Analysis...</span>
          </div>
        }>
          <AIAnalysis 
            analysis={null}
            isLoading={false}
            selectedImage={animal.photoUrl}
            apiStatus={{ groq: false, huggingFace: false }}
          />
        </Suspense>
      </div>

      {/* Action Buttons for Processor View */}
      {viewMode === 'processor' && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Review Actions</h3>
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              <span className="font-medium">Approve Assessment</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
              <span className="font-medium">Reject Assessment</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <span className="font-medium">Request More Info</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnimalDetailView
