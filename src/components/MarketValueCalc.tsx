import React, { useState, useEffect } from 'react'
import { TrendingUp, MapPin, Calendar, DollarSign } from 'react-feather'

interface MarketData {
  basePrice: number
  demandMultiplier: number
  locationMultiplier: number
  seasonalMultiplier: number
  breedMultiplier: number
  healthMultiplier: number
}

interface MarketAnalysis {
  estimatedValue: number
  marketFactors: {
    location: string
    season: string
    demand: number
    breed: string
  }
  priceRange: {
    min: number
    max: number
  }
}

interface MarketValueCalcProps {
  maliScore: number
  selectedImage?: {
    category: string
    description: string
  }
  marketAnalysis?: MarketAnalysis
  onValueCalculated?: (value: number) => void
}

const MarketValueCalc: React.FC<MarketValueCalcProps> = ({ 
  maliScore, 
  selectedImage,
  marketAnalysis,
  onValueCalculated 
}) => {
  const [marketData, setMarketData] = useState<MarketData>({
    basePrice: 500, // Base price in USD
    demandMultiplier: 1.0,
    locationMultiplier: 1.0,
    seasonalMultiplier: 1.0,
    breedMultiplier: 1.0,
    healthMultiplier: 1.0
  })
  
  const [calculatedValue, setCalculatedValue] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)

  // Market locations with different multipliers
  const locations = [
    { name: 'Nairobi Market', multiplier: 1.2, description: 'High demand urban market' },
    { name: 'Mombasa Port', multiplier: 1.1, description: 'Export-focused market' },
    { name: 'Marsabit County', multiplier: 0.8, description: 'Rural pastoralist area' },
    { name: 'Nakuru Market', multiplier: 1.0, description: 'Regional trading center' },
    { name: 'Eldoret Market', multiplier: 0.9, description: 'Agricultural region' }
  ]

  // Seasonal variations
  const seasons = [
    { name: 'Dry Season', multiplier: 0.9, description: 'Lower water availability' },
    { name: 'Rainy Season', multiplier: 1.1, description: 'Better pasture conditions' },
    { name: 'Harvest Season', multiplier: 1.05, description: 'Increased demand' },
    { name: 'Festival Season', multiplier: 1.15, description: 'High demand periods' }
  ]

  // Breed multipliers based on image category
  const breedMultipliers = {
    'healthy': 1.1, // Premium breeds
    'disease': 0.3, // Severely affected
    'underweight': 0.6, // Poor condition
    'age': 0.8 // Older animals
  }

  // Calculate market value
  useEffect(() => {
    const calculateValue = () => {
      setIsCalculating(true)
      
      let finalValue: number
      
      // Use AI market analysis if available
      if (marketAnalysis && marketAnalysis.estimatedValue) {
        finalValue = marketAnalysis.estimatedValue
      } else {
        // Fallback to manual calculation
        const healthMultiplier = maliScore / 100
        const breedMultiplier = selectedImage ? 
          breedMultipliers[selectedImage.category as keyof typeof breedMultipliers] || 1.0 : 1.0
        
        finalValue = Math.round(
          marketData.basePrice * 
          healthMultiplier * 
          marketData.demandMultiplier * 
          marketData.locationMultiplier * 
          marketData.seasonalMultiplier * 
          breedMultiplier
        )
      }
      
      setCalculatedValue(finalValue)
      
      if (onValueCalculated) {
        onValueCalculated(finalValue)
      }
      
      // Simulate calculation delay
      setTimeout(() => {
        setIsCalculating(false)
      }, 1500)
    }

    calculateValue()
  }, [maliScore, marketData, selectedImage, marketAnalysis, onValueCalculated])

  const updateMarketData = (key: keyof MarketData, value: number) => {
    setMarketData(prev => ({ ...prev, [key]: value }))
  }

  const getValueColor = (value: number) => {
    if (value >= 400) return 'text-green-600'
    if (value >= 300) return 'text-blue-600'
    if (value >= 200) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getValueStatus = (value: number) => {
    if (value >= 400) return { status: 'Excellent', color: 'bg-green-100 text-green-800' }
    if (value >= 300) return { status: 'Good', color: 'bg-blue-100 text-blue-800' }
    if (value >= 200) return { status: 'Fair', color: 'bg-yellow-100 text-yellow-800' }
    return { status: 'Poor', color: 'bg-red-100 text-red-800' }
  }

  const valueStatus = getValueStatus(calculatedValue)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Market Value Calculator</h3>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
        >
          {showBreakdown ? 'Hide' : 'Show'} Breakdown
        </button>
      </div>

      {/* Main Value Display */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <DollarSign className="w-8 h-8 text-green-500 mr-2" />
          <span className="text-4xl font-bold text-gray-800">Market Value</span>
        </div>
        
        {isCalculating ? (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="text-gray-500">Calculating market value...</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-6xl font-bold ${getValueColor(calculatedValue)}`}>
              ${calculatedValue.toLocaleString()}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${valueStatus.color}`}>
                {valueStatus.status} Value
              </span>
              <span className="text-gray-500 text-sm">
                Based on Mali-Score: {maliScore}/100
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Market Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Market Location
          </label>
          <select
            value={marketData.locationMultiplier}
            onChange={(e) => updateMarketData('locationMultiplier', parseFloat(e.target.value))}
            className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none market-select"
            style={{ backgroundColor: 'white', color: '#1f2937' }}
          >
            {locations.map((location, index) => (
              <option key={index} value={location.multiplier}>
                {location.name} ({location.multiplier}x)
              </option>
            ))}
          </select>
        </div>

        {/* Season */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Season
          </label>
          <select
            value={marketData.seasonalMultiplier}
            onChange={(e) => updateMarketData('seasonalMultiplier', parseFloat(e.target.value))}
            className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none market-select"
            style={{ backgroundColor: 'white', color: '#1f2937' }}
          >
            {seasons.map((season, index) => (
              <option key={index} value={season.multiplier}>
                {season.name} ({season.multiplier}x)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Demand Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <TrendingUp className="w-4 h-4 inline mr-1" />
          Market Demand: {marketData.demandMultiplier}x
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={marketData.demandMultiplier}
          onChange={(e) => updateMarketData('demandMultiplier', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low Demand (0.5x)</span>
          <span>High Demand (2.0x)</span>
        </div>
      </div>

      {/* Breakdown */}
      {showBreakdown && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-3">Value Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">${marketData.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Health Score ({maliScore}/100):</span>
              <span className="font-medium">{(maliScore / 100).toFixed(2)}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location Multiplier:</span>
              <span className="font-medium">{marketData.locationMultiplier}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seasonal Multiplier:</span>
              <span className="font-medium">{marketData.seasonalMultiplier}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Demand Multiplier:</span>
              <span className="font-medium">{marketData.demandMultiplier}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Breed Multiplier:</span>
              <span className="font-medium">
                {selectedImage ? breedMultipliers[selectedImage.category as keyof typeof breedMultipliers] || 1.0 : 1.0}x
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Final Value:</span>
              <span className={getValueColor(calculatedValue)}>${calculatedValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Market Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Market Insights</h4>
        <div className="text-sm text-blue-700 space-y-1">
          {calculatedValue >= 400 && (
            <p>• This animal would fetch premium prices in urban markets</p>
          )}
          {calculatedValue >= 300 && calculatedValue < 400 && (
            <p>• Good market value for regional trading centers</p>
          )}
          {calculatedValue >= 200 && calculatedValue < 300 && (
            <p>• Consider local markets or improving health before sale</p>
          )}
          {calculatedValue < 200 && (
            <p>• May need veterinary care or better nutrition before sale</p>
          )}
          <p>• Consider timing sale with high-demand seasons for better prices</p>
        </div>
      </div>
    </div>
  )
}

export default MarketValueCalc
