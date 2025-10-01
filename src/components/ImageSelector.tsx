import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, Info } from 'react-feather'

interface CattleImage {
  id: string
  src: string
  alt: string
  category: 'healthy' | 'disease' | 'underweight' | 'age'
  description: string
  healthIndicators: string[]
  expectedScore: number
}

interface ImageSelectorProps {
  isOpen: boolean
  onImageSelect: (image: CattleImage) => void
  selectedImage: CattleImage | null
  onClose: () => void
}

const cattleImages: CattleImage[] = [
  // Healthy Cases
  {
    id: 'healthy-1',
    src: '/webscrape/public/images/case-healthy/african-cattle-1.jpg',
    alt: 'Healthy African Cattle',
    category: 'healthy',
    description: 'Prime African cattle in excellent condition',
    healthIndicators: ['Good body condition', 'Healthy coat', 'Alert posture'],
    expectedScore: 88
  },
  {
    id: 'healthy-2',
    src: '/webscrape/public/images/case-healthy/ankole-cattle.jpg',
    alt: 'Ankole Cattle',
    category: 'healthy',
    description: 'Ankole cattle with distinctive long horns',
    healthIndicators: ['Excellent conformation', 'Strong build', 'Healthy skin'],
    expectedScore: 92
  },
  {
    id: 'healthy-3',
    src: '/webscrape/public/images/case-healthy/bcs-healthy-1.jpg',
    alt: 'BCS Healthy Cattle',
    category: 'healthy',
    description: 'Cattle with optimal body condition score',
    healthIndicators: ['Ideal weight', 'Good muscle tone', 'Healthy appearance'],
    expectedScore: 85
  },
  {
    id: 'healthy-4',
    src: '/webscrape/public/images/case-healthy/bcs-healthy-2.jpg',
    alt: 'BCS Healthy Cattle 2',
    category: 'healthy',
    description: 'Another example of healthy body condition',
    healthIndicators: ['Well-fed', 'Good posture', 'Clean coat'],
    expectedScore: 87
  },
  {
    id: 'healthy-5',
    src: '/webscrape/public/images/case-healthy/boran-cattle.jpg',
    alt: 'Boran Cattle',
    category: 'healthy',
    description: 'Boran breed cattle in good health',
    healthIndicators: ['Breed characteristics', 'Good condition', 'Healthy build'],
    expectedScore: 90
  },
  
  // Disease Cases
  {
    id: 'disease-1',
    src: '/webscrape/public/images/case-lsd/lsd-full-body.jpg',
    alt: 'LSD Full Body',
    category: 'disease',
    description: 'Cattle with Lumpy Skin Disease - full body view',
    healthIndicators: ['Skin nodules', 'Reduced mobility', 'Poor condition'],
    expectedScore: 35
  },
  {
    id: 'disease-2',
    src: '/webscrape/public/images/case-lsd/lsd-nodules-closeup.jpg',
    alt: 'LSD Nodules Closeup',
    category: 'disease',
    description: 'Close-up of LSD nodules on skin',
    healthIndicators: ['Severe skin lesions', 'Infection signs', 'Poor health'],
    expectedScore: 25
  },
  {
    id: 'disease-3',
    src: '/webscrape/public/images/case-ringworm/ringworm-head-lesions.jpg',
    alt: 'Ringworm Head Lesions',
    category: 'disease',
    description: 'Ringworm infection on head and face',
    healthIndicators: ['Fungal lesions', 'Hair loss', 'Skin irritation'],
    expectedScore: 40
  },
  {
    id: 'disease-4',
    src: '/webscrape/public/images/case-ringworm/ringworm-lesions.jpg',
    alt: 'Ringworm Lesions',
    category: 'disease',
    description: 'Ringworm lesions on body',
    healthIndicators: ['Circular lesions', 'Skin damage', 'Poor coat condition'],
    expectedScore: 38
  },
  
  // Underweight Cases
  {
    id: 'underweight-1',
    src: '/webscrape/public/images/case-underweight/bcs-underweight-1.jpg',
    alt: 'BCS Underweight 1',
    category: 'underweight',
    description: 'Cattle with poor body condition score',
    healthIndicators: ['Visible ribs', 'Poor muscle tone', 'Underfed'],
    expectedScore: 45
  },
  {
    id: 'underweight-2',
    src: '/webscrape/public/images/case-underweight/bcs-underweight-2.jpg',
    alt: 'BCS Underweight 2',
    category: 'underweight',
    description: 'Another example of underweight cattle',
    healthIndicators: ['Thin appearance', 'Poor condition', 'Malnourished'],
    expectedScore: 42
  },

  // Real Cattle Photos from WhatsApp (Only Image 1)
  {
    id: 'real-unhealthy-1',
    src: '/images/real-cattle/unhealthy-cattle-1.jpeg',
    alt: 'Real Unhealthy Cattle 1',
    category: 'disease',
    description: 'Real cattle photo showing health issues - WhatsApp source',
    healthIndicators: ['Real-world case', 'Field conditions', 'Actual health assessment needed'],
    expectedScore: 30
  }
]

const ImageSelector: React.FC<ImageSelectorProps> = ({ isOpen, onImageSelect, selectedImage, onClose }) => {
  if (!isOpen) return null
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [filter, setFilter] = useState<'all' | 'healthy' | 'disease' | 'underweight' | 'real'>('all')

  const filteredImages = cattleImages.filter(img => {
    if (filter === 'all') return true
    if (filter === 'real') return img.id.startsWith('real-')
    return img.category === filter
  })

  const currentImage = filteredImages[currentIndex]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const handleImageSelect = () => {
    if (currentImage) {
      onImageSelect(currentImage)
    }
  }

  const getCategoryColor = (category: string, id: string) => {
    if (id.startsWith('real-')) return 'bg-purple-100 text-purple-800 border-purple-200'
    switch (category) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200'
      case 'disease': return 'bg-red-100 text-red-800 border-red-200'
      case 'underweight': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Select Cattle Image</h2>
            <p className="text-gray-600">Choose an image for AI analysis</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Cases', count: cattleImages.length },
              { key: 'healthy', label: 'Healthy', count: cattleImages.filter(img => img.category === 'healthy').length },
              { key: 'disease', label: 'Disease', count: cattleImages.filter(img => img.category === 'disease').length },
              { key: 'underweight', label: 'Underweight', count: cattleImages.filter(img => img.category === 'underweight').length },
              { key: 'real', label: 'Real Cases', count: cattleImages.filter(img => img.id.startsWith('real-')).length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === key
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Image Display */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Viewer */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                {currentImage ? (
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.src = '/images/placeholder-cattle.jpg'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentIndex + 1} of {filteredImages.length}
                </div>
              </div>

              {/* Image Navigation Dots */}
              <div className="flex justify-center space-x-2">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Image Details */}
            <div className="space-y-4">
              {currentImage && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{currentImage.alt}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(currentImage.category, currentImage.id)}`}>
                        {currentImage.id.startsWith('real-') ? 'Real Case' : currentImage.category.charAt(0).toUpperCase() + currentImage.category.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{currentImage.description}</p>
                  </div>

                  {/* Expected Score */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Expected Mali-Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(currentImage.expectedScore)}`}>
                        {currentImage.expectedScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          currentImage.expectedScore >= 80 ? 'bg-green-500' :
                          currentImage.expectedScore >= 60 ? 'bg-blue-500' :
                          currentImage.expectedScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${currentImage.expectedScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Health Indicators */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Health Indicators</h4>
                    <div className="space-y-1">
                      {currentImage.healthIndicators.map((indicator, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                          {indicator}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleImageSelect}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Select This Image
                    </button>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSelector
