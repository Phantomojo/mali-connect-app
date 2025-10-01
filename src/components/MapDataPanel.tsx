import React, { useState, useEffect } from 'react'
import { Cloud, Droplet, Activity, TrendingUp, AlertTriangle, MapPin, Thermometer, Wind, Sun } from 'react-feather'
import { mapApiService } from '../services/mapApiService'
import type { WeatherData, SoilData, MarketData, ServiceData } from '../services/mapApiService'

interface MapDataPanelProps {
  latitude: number
  longitude: number
  isVisible: boolean
  onClose: () => void
}

const MapDataPanel: React.FC<MapDataPanelProps> = ({ latitude, longitude, isVisible, onClose }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [soilData, setSoilData] = useState<SoilData | null>(null)
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [servicesData, setServicesData] = useState<ServiceData[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'weather' | 'soil' | 'market' | 'services'>('weather')

  useEffect(() => {
    if (isVisible) {
      loadAllData()
    }
  }, [isVisible, latitude, longitude])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [weather, soil, market, services] = await Promise.all([
        mapApiService.fetchWeatherData(latitude, longitude),
        mapApiService.fetchSoilData(latitude, longitude),
        mapApiService.fetchMarketData(latitude, longitude),
        mapApiService.fetchNearbyServices(latitude, longitude, 20)
      ])
      
      setWeatherData(weather)
      setSoilData(soil)
      setMarketData(market)
      setServicesData(services)
    } catch (error) {
      console.error('Error loading map data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-20 left-4 z-30 bg-black/90 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-gray-600 max-w-sm w-full max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-lg">Location Data</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-800 rounded-lg p-1">
        {[
          { id: 'weather', label: 'Weather', icon: Cloud },
          { id: 'soil', label: 'Soil', icon: Activity },
          { id: 'market', label: 'Market', icon: TrendingUp },
          { id: 'services', label: 'Services', icon: MapPin }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 ${
              activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Weather Tab */}
          {activeTab === 'weather' && weatherData && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-3">
                <Cloud className="w-5 h-5 text-cyan-500" />
                <h4 className="font-semibold text-white">Current Weather</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-300">Temperature</span>
                  </div>
                  <p className="text-xl font-bold text-white">{weatherData.temperature.toFixed(1)}°C</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Droplet className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-300">Humidity</span>
                  </div>
                  <p className="text-xl font-bold text-white">{weatherData.humidity.toFixed(0)}%</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Wind Speed</span>
                  </div>
                  <p className="text-xl font-bold text-white">{weatherData.windSpeed.toFixed(1)} km/h</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-300">Condition</span>
                  </div>
                  <p className="text-sm font-bold text-white capitalize">{weatherData.description}</p>
                </div>
              </div>
              
              {weatherData.rainfall && (
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cloud className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-300">Rainfall (24h)</span>
                  </div>
                  <p className="text-lg font-bold text-white">{weatherData.rainfall.toFixed(1)} mm</p>
                </div>
              )}
            </div>
          )}

          {/* Soil Tab */}
          {activeTab === 'soil' && soilData && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-white">Soil Quality</h4>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Overall Quality</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    soilData.quality === 'Excellent' ? 'bg-green-100 text-green-800' :
                    soilData.quality === 'Good' ? 'bg-blue-100 text-blue-800' :
                    soilData.quality === 'Fair' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {soilData.quality}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <span className="text-sm text-gray-300">pH Level</span>
                  <p className="text-lg font-bold text-white">{soilData.ph.toFixed(1)}</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <span className="text-sm text-gray-300">Organic Matter</span>
                  <p className="text-lg font-bold text-white">{soilData.organicMatter.toFixed(1)}%</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <span className="text-sm text-gray-300">Nitrogen</span>
                  <p className="text-lg font-bold text-white">{soilData.nitrogen.toFixed(0)} ppm</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-3">
                  <span className="text-sm text-gray-300">Moisture</span>
                  <p className="text-lg font-bold text-white">{soilData.moisture.toFixed(0)}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Market Tab */}
          {activeTab === 'market' && marketData.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold text-white">Market Prices</h4>
              </div>
              
              {marketData.map((market, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{market.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      market.trend === 'up' ? 'bg-green-100 text-green-800' :
                      market.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {market.trend === 'up' ? '↗' : market.trend === 'down' ? '↘' : '→'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">KES {market.price.toFixed(0)}/kg</span>
                    <span className="text-sm text-gray-400">{market.volume} animals</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && servicesData.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <h4 className="font-semibold text-white">Nearby Services</h4>
              </div>
              
              {servicesData.map((service, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{service.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      service.status === 'open' ? 'bg-green-100 text-green-800' :
                      service.status === 'closed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{service.type}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-white">{service.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {service.distance.toFixed(1)} km away
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MapDataPanel
