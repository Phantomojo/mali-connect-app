import React from 'react'
import { Eye, Calendar, MapPin, TrendingUp, AlertCircle, CheckCircle, Clock, XCircle } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'
import type { Animal } from '../data/herdData'
import { mockHerd } from '../data/herdData'

interface HerdDashboardProps {
  onAnimalSelect?: (animal: Animal) => void
  selectedAnimal?: Animal | null
}

const HerdDashboard: React.FC<HerdDashboardProps> = ({ onAnimalSelect, selectedAnimal }) => {
  const { isDarkMode } = useTheme()
  // Filter for herder01's animals
  const herderAnimals = mockHerd.filter(animal => animal.herderId === 'herder01')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'Under Review':
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
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

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 55) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>My Herd Dashboard</h2>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Manage and monitor your livestock health assessments</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{mockHerd.length}</div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Total Animals</div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
          }`}>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-green-300' : 'text-green-800'
                }`}>
                  {mockHerd.filter(a => a.submissionStatus === 'Approved').length}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>Approved</div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'
          }`}>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
                }`}>
                  {mockHerd.filter(a => a.submissionStatus === 'Pending').length}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>Pending</div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
          }`}>
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-800'
                }`}>
                  {mockHerd.filter(a => a.submissionStatus === 'Under Review').length}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>Under Review</div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
          }`}>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-800'
                }`}>
                  ${mockHerd.reduce((sum, a) => sum + (a.marketValue || 0), 0).toLocaleString()}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>Total Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {herderAnimals.map((animal) => (
          <div
            key={animal.id}
            onClick={() => onAnimalSelect?.(animal)}
            className={`rounded-2xl shadow-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } ${
              selectedAnimal?.id === animal.id
                ? 'border-green-400 ring-2 ring-green-200'
                : isDarkMode 
                  ? 'border-gray-700 hover:border-green-300' 
                  : 'border-gray-200 hover:border-green-300'
            }`}
          >
            {/* Animal Image */}
            <div className="relative">
              <img
                src={animal.photoUrl}
                alt={animal.id}
                className="w-full h-48 object-cover rounded-t-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(animal.submissionStatus)}`}>
                  {getStatusIcon(animal.submissionStatus)}
                  <span>{animal.submissionStatus}</span>
                </div>
              </div>
              
              {/* Mali Score Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold">
                  <span className={getScoreColor(animal.maliScore.totalScore)}>
                    {animal.maliScore.totalScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Animal Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>{animal.id}</h3>
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <MapPin className="w-4 h-4 mr-1" />
                  {animal.location}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Breed:</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{animal.breed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Age:</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{animal.age} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Weight:</span>
                  <span className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>{animal.weight} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Market Value:</span>
                  <span className="font-medium text-green-600">${animal.marketValue?.toLocaleString()}</span>
                </div>
              </div>

              {/* Submission Time */}
              <div className={`flex items-center text-xs mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <Calendar className="w-4 h-4 mr-1" />
                Submitted: {formatDate(animal.submissionTime)}
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAnimalSelect?.(animal)
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium">View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockHerd.length === 0 && (
        <div className={`rounded-2xl shadow-xl p-12 text-center transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <Eye className={`w-8 h-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>No Animals in Your Herd</h3>
          <p className={`mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Start by submitting your first animal for health assessment.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all duration-200">
            Add First Animal
          </button>
        </div>
      )}
    </div>
  )
}

export default HerdDashboard
