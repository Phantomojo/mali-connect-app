import React, { useState, useRef } from 'react'
import { Upload, X, AlertTriangle, CheckCircle, Camera, Image as FileImage } from 'react-feather'
import imageValidationService from '../services/imageValidation'

interface ImageUploadProps {
  onImageUpload: (file: File, validation: any) => void
  onClose: () => void
  isOpen: boolean
}

interface UploadState {
  isUploading: boolean
  isDragging: boolean
  validationResult: any | null
  preview: string | null
  error: string | null
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, onClose, isOpen }) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    isDragging: false,
    validationResult: null,
    preview: null,
    error: null
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileSelect = async (file: File) => {
    setUploadState(prev => ({ ...prev, isUploading: true, error: null }))

    try {
      // Create preview
      const preview = URL.createObjectURL(file)
      
      // Validate image
      const validationResult = await imageValidationService.validateImageFile(file)
      
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        validationResult,
        preview
      }))

      // If valid, automatically upload
      if (validationResult.isValid) {
        onImageUpload(file, validationResult)
      }

    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: 'Failed to process image. Please try again.'
      }))
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setUploadState(prev => ({ ...prev, isDragging: false }))

    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setUploadState(prev => ({ ...prev, isDragging: true }))
  }

  const handleDragLeave = () => {
    setUploadState(prev => ({ ...prev, isDragging: false }))
  }

  const handleRetry = () => {
    setUploadState({
      isUploading: false,
      isDragging: false,
      validationResult: null,
      preview: null,
      error: null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadAnyway = () => {
    if (uploadState.validationResult && uploadState.preview) {
      // Create a file from the preview URL
      fetch(uploadState.preview)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'cattle-image.jpg', { type: blob.type })
          onImageUpload(file, uploadState.validationResult)
        })
    }
  }

  const getValidationIcon = () => {
    if (!uploadState.validationResult) return null
    
    if (uploadState.validationResult.isValid) {
      return <CheckCircle className="w-6 h-6 text-green-500" />
    } else {
      return <AlertTriangle className="w-6 h-6 text-red-500" />
    }
  }

  const getValidationColor = () => {
    if (!uploadState.validationResult) return 'border-gray-300'
    
    if (uploadState.validationResult.isValid) {
      return 'border-green-500 bg-green-50'
    } else {
      return 'border-red-500 bg-red-50'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Upload className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Upload Cattle Image</h2>
              <p className="text-gray-600">AI-powered validation ensures quality</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6">
          {!uploadState.preview ? (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                uploadState.isDragging
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {uploadState.isDragging ? 'Drop your image here' : 'Upload cattle photo'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Drag and drop or click to select
                  </p>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                  <p>Supported formats: JPEG, PNG, WebP</p>
                  <p>Maximum size: 10MB</p>
                  <p>Minimum resolution: 200x200px</p>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Choose File
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={uploadState.preview}
                  alt="Upload preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                {uploadState.isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <div className="bg-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                      <span className="text-sm">Analyzing image...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Validation Results */}
              {uploadState.validationResult && (
                <div className={`border rounded-lg p-4 ${getValidationColor()}`}>
                  <div className="flex items-start space-x-3">
                    {getValidationIcon()}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {uploadState.validationResult.isValid ? 'Image Validated' : 'Validation Issues'}
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Confidence: </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            uploadState.validationResult.confidence > 0.7
                              ? 'bg-green-100 text-green-800'
                              : uploadState.validationResult.confidence > 0.4
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {(uploadState.validationResult.confidence * 100).toFixed(0)}%
                          </span>
                        </div>

                        {uploadState.validationResult.detectedObjects.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">Detected: </span>
                            <span className="text-gray-600">
                              {uploadState.validationResult.detectedObjects.join(', ')}
                            </span>
                          </div>
                        )}

                        {uploadState.validationResult.warnings.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium text-red-600">Warnings:</span>
                            <ul className="list-disc list-inside text-red-600 mt-1">
                              {uploadState.validationResult.warnings.map((warning: string, index: number) => (
                                <li key={index}>{warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {uploadState.validationResult.suggestions.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium text-blue-600">Suggestions:</span>
                            <ul className="list-disc list-inside text-blue-600 mt-1">
                              {uploadState.validationResult.suggestions.map((suggestion: string, index: number) => (
                                <li key={index}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {uploadState.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="text-red-800">{uploadState.error}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {uploadState.validationResult?.isValid ? (
                  <button
                    onClick={() => handleUploadAnyway()}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Upload Image
                  </button>
                ) : (
                  <button
                    onClick={() => handleUploadAnyway()}
                    className="flex-1 bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                  >
                    Upload Anyway
                  </button>
                )}
                
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Try Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
