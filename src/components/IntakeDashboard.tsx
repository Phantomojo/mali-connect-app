import React, { useState } from 'react'
import { CheckCircle, XCircle, Eye, Clock, User, MapPin, Calendar, AlertTriangle } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'
import { Animal, mockHerd } from '../data/herdData'

interface IntakeDashboardProps {
  onAnimalSelect?: (animal: Animal) => void
  selectedAnimal?: Animal | null
  onApprove?: (animalId: string) => void
  onReject?: (animalId: string) => void
}

const IntakeDashboard: React.FC<IntakeDashboardProps> = ({ 
  onAnimalSelect, 
  selectedAnimal, 
  onApprove, 
  onReject 
}) => {
  const { isDarkMode } = useTheme()
  // Filter for pending animals from all herders
  const pendingAnimals = mockHerd.filter(animal => animal.submissionStatus === 'Pending')

  const [processingAnimals, setProcessingAnimals] = useState<Set<string>>(new Set())

  const getScoreColor = (score: number) => {
    if (score >= 85) return isDarkMode ? 'text-green-300 bg-green-900/30' : 'text-green-600 bg-green-50'
    if (score >= 70) return isDarkMode ? 'text-blue-300 bg-blue-900/30' : 'text-blue-600 bg-blue-50'
    if (score >= 55) return isDarkMode ? 'text-yellow-300 bg-yellow-900/30' : 'text-yellow-600 bg-yellow-50'
    return isDarkMode ? 'text-red-300 bg-red-900/30' : 'text-red-600 bg-red-50'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 55) return 'Fair'
    return 'Poor'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const submissionTime = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - submissionTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleApprove = async (animalId: string) => {
    setProcessingAnimals(prev => new Set(prev).add(animalId))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onApprove?.(animalId)
    setProcessingAnimals(prev => {
      const newSet = new Set(prev)
      newSet.delete(animalId)
      return newSet
    })
  }

  const handleReject = async (animalId: string) => {
    setProcessingAnimals(prev => new Set(prev).add(animalId))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onReject?.(animalId)
    setProcessingAnimals(prev => {
      const newSet = new Set(prev)
      newSet.delete(animalId)
      return newSet
    })
  }

  const isProcessing = (animalId: string) => processingAnimals.has(animalId)

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
            }`}>Animal Intake Dashboard</h2>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Review and process pending livestock submissions</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-600">{pendingAnimals.length}</div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Pending Reviews</div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'
          }`}>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
                }`}>{pendingAnimals.length}</div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>Pending</div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
          }`}>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-green-300' : 'text-green-800'
                }`}>
                  {pendingAnimals.filter(a => a.maliScore.totalScore >= 80).length}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>High Quality</div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
          }`}>
            <div className="flex items-center">
              <User className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-800'
                }`}>
                  {new Set(pendingAnimals.map(a => a.herderId)).size}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>Active Herders</div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
          }`}>
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <div className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-800'
                }`}>
                  {pendingAnimals.filter(a => a.maliScore.totalScore < 70).length}
                </div>
                <div className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>Need Attention</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Animals Table */}
      <div className={`rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>Pending Submissions</h3>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Click on any row to view detailed assessment</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Animal
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Herder
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Mali-Score
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Submitted
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
            }`}>
              {pendingAnimals.map((animal) => (
                <tr
                  key={animal.id}
                  onClick={() => onAnimalSelect?.(animal)}
                  className={`cursor-pointer transition-colors duration-200 ${
                    isDarkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  } ${
                    selectedAnimal?.id === animal.id 
                      ? isDarkMode 
                        ? 'bg-green-900/30' 
                        : 'bg-green-50' 
                      : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={animal.photoUrl}
                          alt={animal.id}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>{animal.id}</div>
                        <div className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{animal.breed} • {animal.age}y • {animal.weight}kg</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className={`w-4 h-4 mr-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className={`text-sm font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>{animal.herderName}</div>
                        <div className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>ID: {animal.herderId}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(animal.maliScore.totalScore)}`}>
                      <span className="font-bold">{animal.maliScore.totalScore}</span>
                      <span className="ml-1">({getScoreLabel(animal.maliScore.totalScore)})</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      <Calendar className={`w-4 h-4 mr-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <div>
                        <div>{formatDate(animal.submissionTime)}</div>
                        <div className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{getTimeAgo(animal.submissionTime)}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <MapPin className="w-4 h-4 mr-1" />
                      {animal.location}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleApprove(animal.id)
                        }}
                        disabled={isProcessing(animal.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing(animal.id) ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                        ) : (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        Approve
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReject(animal.id)
                        }}
                        disabled={isProcessing(animal.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing(animal.id) ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        Reject
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onAnimalSelect?.(animal)
                        }}
                        className={`inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600' 
                            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {pendingAnimals.length === 0 && (
        <div className={`rounded-2xl shadow-xl p-12 text-center transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <CheckCircle className={`w-8 h-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>No Pending Submissions</h3>
          <p className={`mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>All animal submissions have been processed. Great work!</p>
          <div className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            New submissions will appear here as herders submit their animals for assessment.
          </div>
        </div>
      )}
    </div>
  )
}

export default IntakeDashboard
