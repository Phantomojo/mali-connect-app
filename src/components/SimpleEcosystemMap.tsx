import React, { useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import Map, { Source, Layer, Popup, Marker } from 'react-map-gl/maplibre'
import { MapPin, X, Globe } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface SimpleEcosystemMapProps {
  onClose?: () => void
}

// Simplified market data for the map
const MARKET_LOCATIONS = [
  {
    id: 'nairobi',
    name: 'Nairobi Central Livestock Market',
    coordinates: [36.8219, -1.2921] as [number, number],
    price: 520,
    volume: 2500,
    type: 'major'
  },
  {
    id: 'mombasa',
    name: 'Mombasa Port Livestock Terminal',
    coordinates: [39.6682, -4.0435] as [number, number],
    price: 480,
    volume: 1800,
    type: 'major'
  },
  {
    id: 'addis-ababa',
    name: 'Addis Ababa Livestock Market',
    coordinates: [38.7469, 9.0320] as [number, number],
    price: 450,
    volume: 3200,
    type: 'major'
  },
  {
    id: 'kampala',
    name: 'Kampala Central Market',
    coordinates: [32.5825, 0.3476] as [number, number],
    price: 420,
    volume: 1200,
    type: 'regional'
  },
  {
    id: 'dar-es-salaam',
    name: 'Dar es Salaam Livestock Hub',
    coordinates: [39.2083, -6.7924] as [number, number],
    price: 410,
    volume: 900,
    type: 'regional'
  }
]

const SimpleEcosystemMap: React.FC<SimpleEcosystemMapProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme()
  const [selectedMarket, setSelectedMarket] = useState<any>(null)
  const [popupInfo, setPopupInfo] = useState<any>(null)

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'major': return '#ef4444'
      case 'regional': return '#3b82f6'
      default: return '#10b981'
    }
  }

  return (
    <div className={`w-full h-[600px] rounded-xl overflow-hidden shadow-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      
      {/* Header */}
      <div className={`p-4 border-b ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-bold">Livestock Market Network</h3>
              <p className="text-sm opacity-70">East African livestock trading hubs</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="h-[500px] relative">
        <Map
          initialViewState={{
            longitude: 36.8,
            latitude: 0.0,
            zoom: 4
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://api.maptiler.com/maps/hybrid/style.json?key=0EfDvZ6OhNPaaT3X24Cm"
          terrain={{
            source: 'terrain-dem',
            exaggeration: 1.2
          }}
          onLoad={() => console.log('Map loaded successfully')}
        >
          {/* Terrain elevation data */}
          <Source
            id="terrain-dem"
            type="raster-dem"
            url="https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.png?key=0EfDvZ6OhNPaaT3X24Cm"
            tileSize={256}
            maxzoom={14}
          />
          {/* Market markers */}
          {MARKET_LOCATIONS.map((market) => (
            <Marker
              key={market.id}
              longitude={market.coordinates[0]}
              latitude={market.coordinates[1]}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setPopupInfo(market)
              }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform"
                style={{ backgroundColor: getMarkerColor(market.type) }}
              />
            </Marker>
          ))}

          {/* Popup */}
          {popupInfo && (
            <Popup
              longitude={popupInfo.coordinates[0]}
              latitude={popupInfo.coordinates[1]}
              anchor="top"
              onClose={() => setPopupInfo(null)}
              closeButton={true}
              closeOnClick={false}
            >
              <div className="p-3 min-w-[200px]">
                <h4 className="font-bold text-gray-900 mb-2">{popupInfo.name}</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold text-green-600">${popupInfo.price}/head</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span className="font-semibold">{popupInfo.volume.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      popupInfo.type === 'major' ? 'bg-red-100 text-red-800' :
                      popupInfo.type === 'regional' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {popupInfo.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>

      {/* Legend */}
      <div className={`p-4 border-t ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Market Types:</div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Major</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Regional</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Local</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleEcosystemMap
