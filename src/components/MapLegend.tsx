import React from 'react'
import { 
  MapPin, Droplet, Activity, ShoppingCart, Heart, Cloud, 
  Package, Truck, Settings, CloudRain, Thermometer, Wind, 
  Sun, Zap, AlertTriangle, X
} from 'react-feather'

interface MapLegendProps {
  isVisible: boolean
  onClose: () => void
  layerVisibility: Record<string, boolean>
}

const MapLegend: React.FC<MapLegendProps> = ({ isVisible, onClose, layerVisibility }) => {
  if (!isVisible) return null

  const serviceItems = [
    { id: 'waterSources', label: 'Water Sources', icon: Droplet, color: 'bg-blue-500' },
    { id: 'markets', label: 'Livestock Markets', icon: ShoppingCart, color: 'bg-purple-500' },
    { id: 'veterinary', label: 'Veterinary Services', icon: Heart, color: 'bg-red-500' },
    { id: 'weather', label: 'Weather Stations', icon: Cloud, color: 'bg-cyan-500' },
    { id: 'feedSuppliers', label: 'Feed Suppliers', icon: Package, color: 'bg-orange-500' },
    { id: 'transport', label: 'Transport Hubs', icon: Truck, color: 'bg-indigo-500' },
    { id: 'processing', label: 'Processing Facilities', icon: Settings, color: 'bg-gray-600' }
  ]

  const environmentalItems = [
    { id: 'pasture', label: 'Pasture Quality', icon: Activity, color: 'bg-green-500', description: '3D extrusions showing pasture quality' },
    { id: 'rainfall', label: 'Rainfall Map', icon: CloudRain, color: 'bg-blue-400', description: 'Precipitation data overlay' },
    { id: 'humidity', label: 'Humidity Map', icon: Droplet, color: 'bg-cyan-400', description: 'Relative humidity levels' },
    { id: 'temperature', label: 'Temperature Map', icon: Thermometer, color: 'bg-red-400', description: 'Temperature distribution' },
    { id: 'wind', label: 'Wind Map', icon: Wind, color: 'bg-gray-400', description: 'Wind speed and direction' },
    { id: 'soil', label: 'Soil Quality', icon: MapPin, color: 'bg-amber-600', description: 'Soil health indicators' },
    { id: 'vegetation', label: 'Vegetation Index', icon: Sun, color: 'bg-green-400', description: 'Vegetation density' },
    { id: 'elevation', label: 'Elevation', icon: Zap, color: 'bg-yellow-500', description: 'Topographic elevation' },
    { id: 'drought', label: 'Drought Risk', icon: AlertTriangle, color: 'bg-orange-500', description: 'Drought risk assessment' }
  ]

  const pastureQualityItems = [
    { quality: 'Excellent', color: 'bg-green-500', height: '800m', description: 'Prime grazing land' },
    { quality: 'Good', color: 'bg-green-400', height: '500m', description: 'Good quality pasture' },
    { quality: 'Fair', color: 'bg-yellow-500', height: '200m', description: 'Moderate quality' },
    { quality: 'Poor', color: 'bg-red-500', height: '50m', description: 'Degraded pasture' }
  ]

  return (
    <div className="fixed bottom-4 left-4 z-30 bg-white rounded-lg shadow-xl border border-gray-300 max-w-xs w-full max-h-[60vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-700" />
          <h3 className="font-semibold text-gray-900 text-sm">Map Legend</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Pasture Quality */}
      {layerVisibility.pasture && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            3D Pasture Quality
          </h4>
          <div className="space-y-2">
            {pastureQualityItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${item.color}`} style={{ opacity: 0.8 }}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200 font-medium">{item.quality}</span>
                    <span className="text-xs text-gray-400">{item.height}</span>
                  </div>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Service Layers */}
      {serviceItems.some(item => layerVisibility[item.id]) && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Active Services
          </h4>
          <div className="space-y-2">
            {serviceItems
              .filter(item => layerVisibility[item.id])
              .map((item) => {
                const IconComponent = item.icon
                return (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 border-white ${item.color}`}></div>
                    <IconComponent className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-200">{item.label}</span>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Active Environmental Layers */}
      {environmentalItems.some(item => layerVisibility[item.id]) && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <Cloud className="w-4 h-4 mr-2" />
            Environmental Data
          </h4>
          <div className="space-y-2">
            {environmentalItems
              .filter(item => layerVisibility[item.id])
              .map((item) => {
                const IconComponent = item.icon
                return (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <IconComponent className="w-4 h-4 text-gray-300" />
                    <div className="flex-1">
                      <span className="text-sm text-gray-200 font-medium">{item.label}</span>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Map Controls Info */}
      <div className="pt-4 border-t border-gray-600">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Map Controls</h4>
        <div className="space-y-1 text-xs text-gray-400">
          <p>• <strong>Scroll:</strong> Zoom in/out</p>
          <p>• <strong>Drag:</strong> Pan around map</p>
          <p>• <strong>Click markers:</strong> View details</p>
          <p>• <strong>Search:</strong> Find locations</p>
        </div>
      </div>
    </div>
  )
}

export default MapLegend
