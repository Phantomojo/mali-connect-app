import React, { useState } from 'react'
import { CheckCircle, XCircle, Eye, Clock, User, MapPin, Calendar, AlertTriangle } from 'react-feather'
import type { Animal } from '../data/herdData'

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
  // Mock data - all pending animals from all herders
  const pendingAnimals: Animal[] = [
    {
      id: 'ANI002',
      herderId: 'herder01',
      herderName: 'Jelani',
      photoUrl: '/images/healthy/cattle-healthy-2.jpg',
      maliScore: {
        bodyCondition: 82,
        physicalHealth: 78,
        conformation: 85,
        ageEstimation: 88,
        totalScore: 82
      },
      submissionStatus: 'Pending',
      submissionTime: '2024-01-16T14:20:00Z',
      breed: 'Boran',
      age: 4,
      weight: 420,
      location: 'Nairobi County',
      healthNotes: 'Good health, minor weight concerns',
      marketValue: 620
    },
    {
      id: 'ANI004',
      herderId: 'herder02',
      herderName: 'Asha',
      photoUrl: '/images/healthy/cattle-healthy-4.jpg',
      maliScore: {
        bodyCondition: 75,
        physicalHealth: 80,
        conformation: 78,
        ageEstimation: 82,
        totalScore: 78
      },
      submissionStatus: 'Pending',
      submissionTime: '2024-01-16T16:45:00Z',
      breed: 'Sahiwal',
      age: 5,
      weight: 400,
      location: 'Mombasa County',
      healthNotes: 'Fair condition, needs nutritional improvement',
      marketValue: 580
    },
    {
      id: 'ANI007',
      herderId: 'herder01',
      herderName: 'Jelani',
      photoUrl: '/images/healthy/cattle-healthy-7.jpg',
      maliScore: {
        bodyCondition: 85,
        physicalHealth: 82,
        conformation: 88,
        ageEstimation: 90,
        totalScore: 85
      },
      submissionStatus: 'Pending',
      submissionTime: '2024-01-17T08:00:00Z',
      breed: 'Ankole',
      age: 4,
      weight: 460,
      location: 'Nairobi County',
      healthNotes: 'Good overall health, minor conformation issues',
      marketValue: 640
    }
  ]

  const [processingAnimals, setProcessingAnimals] = useState<Set<string>>(new Set())

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-blue-600 bg-blue-50'
    if (score >= 55) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
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
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Animal Intake Dashboard</h2>
            <p className="text-gray-600">Review and process pending livestock submissions</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-600">{pendingAnimals.length}</div>
            <div className="text-sm text-gray-500">Pending Reviews</div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-500 mr-2" />
              <div>
                <div className="text-lg font-semibold text-yellow-800">{pendingAnimals.length}</div>
                <div className="text-sm text-yellow-600">Pending</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <div className="text-lg font-semibold text-green-800">
                  {pendingAnimals.filter(a => a.maliScore.totalScore >= 80).length}
                </div>
                <div className="text-sm text-green-600">High Quality</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <div className="text-lg font-semibold text-blue-800">
                  {new Set(pendingAnimals.map(a => a.herderId)).size}
                </div>
                <div className="text-sm text-blue-600">Active Herders</div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <div className="text-lg font-semibold text-purple-800">
                  {pendingAnimals.filter(a => a.maliScore.totalScore < 70).length}
                </div>
                <div className="text-sm text-purple-600">Need Attention</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Animals Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Pending Submissions</h3>
          <p className="text-sm text-gray-600">Click on any row to view detailed assessment</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Animal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Herder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mali-Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingAnimals.map((animal) => (
                <tr
                  key={animal.id}
                  onClick={() => onAnimalSelect?.(animal)}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                    selectedAnimal?.id === animal.id ? 'bg-green-50' : ''
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
                        <div className="text-sm font-medium text-gray-900">{animal.id}</div>
                        <div className="text-sm text-gray-500">{animal.breed} • {animal.age}y • {animal.weight}kg</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{animal.herderName}</div>
                        <div className="text-sm text-gray-500">ID: {animal.herderId}</div>
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
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div>{formatDate(animal.submissionTime)}</div>
                        <div className="text-xs text-gray-500">{getTimeAgo(animal.submissionTime)}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
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
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Submissions</h3>
          <p className="text-gray-600 mb-6">All animal submissions have been processed. Great work!</p>
          <div className="text-sm text-gray-500">
            New submissions will appear here as herders submit their animals for assessment.
          </div>
        </div>
      )}
    </div>
  )
}

export default IntakeDashboard
