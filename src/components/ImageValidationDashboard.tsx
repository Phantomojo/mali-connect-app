import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Eye, 
  Trash2,
  Upload,
  Image as FileImage
} from 'react-feather'
import imageValidationService from '../services/imageValidation'

interface ValidationResult {
  isValid: boolean
  confidence: number
  detectedObjects: string[]
  isCattle: boolean
  isAppropriate: boolean
  warnings: string[]
  suggestions: string[]
}

interface ImageStatus {
  path: string
  name: string
  status: 'valid' | 'invalid' | 'pending'
  validation?: ValidationResult
  lastChecked?: Date
}

const ImageValidationDashboard: React.FC = () => {
  const [images, setImages] = useState<ImageStatus[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [showDetails, setShowDetails] = useState<string | null>(null)

  useEffect(() => {
    loadImageStatus()
  }, [])

  const loadImageStatus = async () => {
    setIsValidating(true)
    try {
      const { valid, invalid } = await imageValidationService.validateExistingImages()
      
      const imageStatuses: ImageStatus[] = [
        ...valid.map(path => ({
          path,
          name: path.split('/').pop() || 'Unknown',
          status: 'valid' as const,
          lastChecked: new Date()
        })),
        ...invalid.map(path => ({
          path,
          name: path.split('/').pop() || 'Unknown',
          status: 'invalid' as const,
          lastChecked: new Date()
        }))
      ]

      setImages(imageStatuses)
    } catch (error) {
      console.error('Failed to load image status:', error)
    } finally {
      setIsValidating(false)
    }
  }

  const validateSingleImage = async (imagePath: string) => {
    try {
      const response = await fetch(imagePath)
      if (response.ok) {
        const blob = await response.blob()
        const file = new File([blob], imagePath.split('/').pop() || '', { type: blob.type })
        const validation = await imageValidationService.validateImageFile(file)
        
        setImages(prev => prev.map(img => 
          img.path === imagePath 
            ? { 
                ...img, 
                status: validation.isValid ? 'valid' : 'invalid',
                validation,
                lastChecked: new Date()
              }
            : img
        ))
      }
    } catch (error) {
      console.error('Failed to validate image:', error)
    }
  }

  const removeInvalidImage = (imagePath: string) => {
    setImages(prev => prev.filter(img => img.path !== imagePath))
    // In a real app, you'd also remove the file from the server
    console.log('Removing invalid image:', imagePath)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'invalid':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-50 border-green-200'
      case 'invalid':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-yellow-50 border-yellow-200'
    }
  }

  const validCount = images.filter(img => img.status === 'valid').length
  const invalidCount = images.filter(img => img.status === 'invalid').length
  const totalCount = images.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Image Validation Dashboard</h2>
            <p className="text-gray-600">AI-powered content validation for cattle photos</p>
          </div>
        </div>
        
        <button
          onClick={loadImageStatus}
          disabled={isValidating}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{validCount}</p>
              <p className="text-sm text-gray-600">Valid Images</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{invalidCount}</p>
              <p className="text-sm text-gray-600">Invalid Images</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileImage className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
              <p className="text-sm text-gray-600">Total Images</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Image Status</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {images.map((image) => (
            <div key={image.path} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(image.status)}
                  <div>
                    <p className="font-medium text-gray-800">{image.name}</p>
                    <p className="text-sm text-gray-500">{image.path}</p>
                    {image.lastChecked && (
                      <p className="text-xs text-gray-400">
                        Last checked: {image.lastChecked.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => validateSingleImage(image.path)}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Re-validate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setShowDetails(showDetails === image.path ? null : image.path)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {image.status === 'invalid' && (
                    <button
                      onClick={() => removeInvalidImage(image.path)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Details Panel */}
              {showDetails === image.path && image.validation && (
                <div className={`mt-4 p-4 rounded-lg border ${getStatusColor(image.status)}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence:</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        image.validation.confidence > 0.7
                          ? 'bg-green-100 text-green-800'
                          : image.validation.confidence > 0.4
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {(image.validation.confidence * 100).toFixed(0)}%
                      </span>
                    </div>

                    {image.validation.detectedObjects.length > 0 && (
                      <div>
                        <span className="font-medium">Detected Objects:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {image.validation.detectedObjects.map((obj, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {obj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {image.validation.warnings.length > 0 && (
                      <div>
                        <span className="font-medium text-red-600">Warnings:</span>
                        <ul className="list-disc list-inside text-red-600 text-sm mt-1">
                          {image.validation.warnings.map((warning, index) => (
                            <li key={index}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {image.validation.suggestions.length > 0 && (
                      <div>
                        <span className="font-medium text-blue-600">Suggestions:</span>
                        <ul className="list-disc list-inside text-blue-600 text-sm mt-1">
                          {image.validation.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload New Image */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Add New Image</h3>
            <p className="text-gray-600">Upload a new cattle photo for validation</p>
          </div>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageValidationDashboard
