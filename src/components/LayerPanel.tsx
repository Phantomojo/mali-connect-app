import React from 'react'
import { 
  Layers, Eye, EyeOff, Droplet, ShoppingCart, Heart, Activity, Cloud, 
  Package, Truck, Settings, CloudRain, Thermometer, Wind, Sun, 
  MapPin, Zap, AlertTriangle, X
} from 'react-feather'

interface LayerPanelProps {
  isVisible: boolean
  onClose: () => void
  layerVisibility: Record<string, boolean>
  onToggleLayer: (layerName: string) => void
}

const LayerPanel: React.FC<LayerPanelProps> = ({ 
  isVisible, 
  onClose, 
  layerVisibility, 
  onToggleLayer 
}) => {
  if (!isVisible) return null

  const serviceLayers = [
    { id: 'waterSources', label: 'Water Sources', icon: Droplet, color: 'blue' },
    { id: 'markets', label: 'Livestock Markets', icon: ShoppingCart, color: 'purple' },
    { id: 'veterinary', label: 'Veterinary Services', icon: Heart, color: 'red' },
    { id: 'weather', label: 'Weather Stations', icon: Cloud, color: 'cyan' },
    { id: 'feedSuppliers', label: 'Feed Suppliers', icon: Package, color: 'orange' },
    { id: 'transport', label: 'Transport Hubs', icon: Truck, color: 'indigo' },
    { id: 'processing', label: 'Processing Facilities', icon: Settings, color: 'gray' }
  ]

  const environmentalLayers = [
    { id: 'pasture', label: 'Pasture Quality', icon: Activity, color: 'green' },
    { id: 'rainfall', label: 'Rainfall Map', icon: CloudRain, color: 'blue' },
    { id: 'humidity', label: 'Humidity Map', icon: Droplet, color: 'cyan' },
    { id: 'temperature', label: 'Temperature Map', icon: Thermometer, color: 'red' },
    { id: 'wind', label: 'Wind Map', icon: Wind, color: 'gray' },
    { id: 'soil', label: 'Soil Quality', icon: MapPin, color: 'brown' },
    { id: 'vegetation', label: 'Vegetation Index', icon: Sun, color: 'green' },
    { id: 'elevation', label: 'Elevation', icon: Zap, color: 'yellow' },
    { id: 'drought', label: 'Drought Risk', icon: AlertTriangle, color: 'orange' }
  ]

  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap: Record<string, string> = {
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300',
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300',
      red: isActive ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300',
      cyan: isActive ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300',
      indigo: isActive ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300',
      gray: isActive ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300',
      green: isActive ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300',
      brown: isActive ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300',
      yellow: isActive ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'
    }
    return colorMap[color] || 'bg-gray-700 text-gray-300'
  }

  return (
    <div className="fixed top-20 right-4 z-30 bg-white rounded-lg shadow-xl border border-gray-300 max-w-xs w-full max-h-[70vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-gray-700" />
          <h3 className="font-semibold text-gray-900 text-sm">Map Layers</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Service Layers */}
      <div className="p-3">
        <h4 className="text-xs font-medium text-gray-600 mb-2 flex items-center">
          <Settings className="w-3 h-3 mr-1" />
          Services
        </h4>
        <div className="space-y-1">
          {serviceLayers.map((layer) => {
            const IconComponent = layer.icon
            const isActive = layerVisibility[layer.id]
            return (
              <button
                key={layer.id}
                onClick={() => onToggleLayer(layer.id)}
                className={`flex items-center space-x-2 w-full px-2 py-1.5 rounded text-xs transition-colors duration-200 ${getColorClasses(layer.color, isActive)}`}
              >
                {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <IconComponent className="w-3 h-3" />
                <span className="font-medium">{layer.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Environmental Layers */}
      <div className="p-3 border-t border-gray-200">
        <h4 className="text-xs font-medium text-gray-600 mb-2 flex items-center">
          <Cloud className="w-3 h-3 mr-1" />
          Environmental
        </h4>
        <div className="space-y-1">
          {environmentalLayers.map((layer) => {
            const IconComponent = layer.icon
            const isActive = layerVisibility[layer.id]
            return (
              <button
                key={layer.id}
                onClick={() => onToggleLayer(layer.id)}
                className={`flex items-center space-x-2 w-full px-2 py-1.5 rounded text-xs transition-colors duration-200 ${getColorClasses(layer.color, isActive)}`}
              >
                {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <IconComponent className="w-3 h-3" />
                <span className="font-medium">{layer.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex space-x-1">
          <button
            onClick={() => {
              // Turn on all service layers
              serviceLayers.forEach(layer => {
                if (!layerVisibility[layer.id]) {
                  onToggleLayer(layer.id)
                }
              })
            }}
            className="flex-1 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors duration-200"
          >
            All Services
          </button>
          <button
            onClick={() => {
              // Turn off all layers
              Object.keys(layerVisibility).forEach(layerId => {
                if (layerVisibility[layerId]) {
                  onToggleLayer(layerId)
                }
              })
            }}
            className="flex-1 px-2 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium rounded transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}

export default LayerPanel
