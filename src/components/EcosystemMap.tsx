import React, { useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import Map, { Source, Layer, Popup, Marker } from 'react-map-gl/maplibre'
import { MapPin, Droplet, Activity, ShoppingCart, Heart, Truck, Home, Package, X, Search, Navigation, Layers, Eye, EyeOff, Cloud, Wind, Sun, CloudRain, Thermometer, Truck as TransportIcon, Settings, Zap, Globe } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'
import { 
  pastureQualityData, 
  waterSourcesData, 
  livestockMarketsData, 
  veterinaryServicesData,
  weatherStationsData,
  feedSuppliersData,
  transportHubsData,
  processingFacilitiesData,
  rainfallData,
  temperatureData,
  humidityData,
  windData,
  vegetationData,
  elevationData,
  droughtData
} from '../data/mapData'
import { 
  africanData,
  getLocationsByType,
  searchLocations,
  type AfricanLocation
} from '../data/africanData'
import MapDataPanel from './MapDataPanel'
import LayerPanel from './LayerPanel'
import MapLegend from './MapLegend'

interface EcosystemMapProps {
  onClose?: () => void
}

const EcosystemMap: React.FC<EcosystemMapProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme()
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const [popupInfo, setPopupInfo] = useState<{ 
    longitude: number; 
    latitude: number; 
    name: string; 
    properties?: any 
  } | null>(null)
  
      // New state for search and location features
      const [searchQuery, setSearchQuery] = useState('')
      const [userLocation, setUserLocation] = useState<{longitude: number, latitude: number} | null>(null)
      const [showUserLocation, setShowUserLocation] = useState(false)
      const [searchSuggestions, setSearchSuggestions] = useState<AfricanLocation[]>([])
      const [showSuggestions, setShowSuggestions] = useState(false)
  
  // Layer visibility toggles - All off by default
  const [layerVisibility, setLayerVisibility] = useState({
    waterSources: false,
    markets: false,
    veterinary: false,
    pasture: false,
    weather: false,
    feedSuppliers: false,
    transport: false,
    processing: false,
    // Environmental layers
    rainfall: false,
    humidity: false,
    temperature: false,
    wind: false,
    soil: false,
    vegetation: false,
    elevation: false,
    drought: false
  })
  
  // Map reference for programmatic control
  const [mapRef, setMapRef] = useState<any>(null)
  
  // Data panel state
  const [showDataPanel, setShowDataPanel] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lon: number} | null>(null)
  
  // Layer panel state
  const [showLayerPanel, setShowLayerPanel] = useState(false)
  const [showLegend, setShowLegend] = useState(false)
  
  // Zoom level state
  const [currentZoom, setCurrentZoom] = useState(2)

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords
          setUserLocation({ longitude, latitude })
          setShowUserLocation(true)
          
          // Fly to user location
          if (mapRef) {
            mapRef.flyTo({
              center: [longitude, latitude],
              zoom: 12,
              duration: 2000
            })
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your location. Please check your browser permissions.')
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  // Convert AfricanLocation to GeoJSON format
  const convertToGeoJSON = (locations: AfricanLocation[]) => {
    return {
      type: 'FeatureCollection' as const,
      features: locations.map(location => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: location.coordinates
        },
        properties: location
      }))
    }
  }

  // Get all features for search
  const getAllFeatures = () => africanData

  // Handle search input changes
  const handleSearchInputChange = (query: string) => {
    setSearchQuery(query)
    
    if (query.trim().length < 2) {
      setSearchSuggestions([])
      setShowSuggestions(false)
      return
    }
    
    const suggestions = searchLocations(query).slice(0, 5) // Limit to 5 suggestions
    
    setSearchSuggestions(suggestions)
    setShowSuggestions(suggestions.length > 0)
  }

  // Handle search selection
  const handleSearchSelect = (location: any) => {
    setSearchQuery(location.name || 'Unknown')
    setShowSuggestions(false)
    
    if (mapRef) {
      const [longitude, latitude] = location.coordinates
      mapRef.flyTo({
        center: [longitude, latitude],
        zoom: 12,
        duration: 2000
      })
      
      setPopupInfo({
        longitude,
        latitude,
        name: location.name || 'Unknown',
        properties: location
      })
    }
  }

  // Search functionality
  const handleSearch = (query: string) => {
    if (!query.trim()) return
    
    const matchingLocation = searchLocations(query)[0]
    
    if (matchingLocation && mapRef) {
      handleSearchSelect(matchingLocation)
    }
  }

  // Toggle layer visibility
  const toggleLayer = (layerName: keyof typeof layerVisibility) => {
    setLayerVisibility(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }))
  }

  // Close suggestions when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowSuggestions(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden z-10"
      onClick={handleClickOutside}
    >
      {/* Top Search Bar - Google Maps Style */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row gap-2">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search locations, services, countries..."
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-sm transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400' 
                  : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
              }`}
            />
            
            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl border z-50 max-h-60 overflow-y-auto transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}>
                {searchSuggestions.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchSelect(location)}
                    className={`w-full px-4 py-3 text-left border-b last:border-b-0 flex items-center space-x-3 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 border-gray-700' 
                        : 'hover:bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {location.type === 'water' && <Droplet className="w-4 h-4 text-blue-500" />}
                      {location.type === 'market' && <ShoppingCart className="w-4 h-4 text-purple-500" />}
                      {location.type === 'veterinary' && <Heart className="w-4 h-4 text-red-500" />}
                      {location.type === 'weather' && <Cloud className="w-4 h-4 text-cyan-500" />}
                      {location.type === 'feed' && <Package className="w-4 h-4 text-orange-500" />}
                      {location.type === 'transport' && <Truck className="w-4 h-4 text-indigo-500" />}
                      {location.type === 'processing' && <Home className="w-4 h-4 text-green-500" />}
                      {location.type === 'pasture' && <Activity className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium truncate transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>{location.name}</div>
                      <div className={`text-sm truncate transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {location.country} • {location.description} • {location.type}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side Controls - Google Maps Style */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Zoom Controls */}
        <div className={`rounded-lg shadow-lg border overflow-hidden transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-white border-gray-300'
        }`}>
          <button
            onClick={() => {
              if (mapRef) {
                const currentZoom = mapRef.getZoom()
                mapRef.zoomTo(Math.min(currentZoom + 1, 22), { duration: 300 })
              }
            }}
            className={`w-10 h-10 flex items-center justify-center border-b transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
            }`}
            title="Zoom In"
          >
            <span className="text-lg font-medium">+</span>
          </button>
          <button
            onClick={() => {
              if (mapRef) {
                const currentZoom = mapRef.getZoom()
                mapRef.zoomTo(Math.max(currentZoom - 1, 1), { duration: 300 })
              }
            }}
            className={`w-10 h-10 flex items-center justify-center border-b transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
            }`}
            title="Zoom Out"
          >
            <span className="text-lg font-medium">−</span>
          </button>
          <button
            onClick={() => {
              if (mapRef) {
                mapRef.flyTo({
                  center: [20.0, 0.0], // Center of Africa
                  zoom: 2,
                  duration: 2000
                })
              }
            }}
            className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
            title="Fit to Africa"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
        {/* My Location Button */}
        <button
          onClick={getUserLocation}
          className={`w-10 h-10 rounded-lg shadow-lg border flex items-center justify-center transition-colors duration-200 group ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          }`}
          title="My Location"
        >
          <Navigation className="w-4 h-4" />
        </button>

        {/* Data Panel Button */}
        <button
          onClick={() => {
            setSelectedLocation({ lat: -1.2921, lon: 36.8219 })
            setShowDataPanel(true)
          }}
          className={`w-10 h-10 rounded-lg shadow-lg border flex items-center justify-center transition-colors duration-200 group ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          }`}
          title="Data Panel"
        >
          <Activity className="w-4 h-4" />
        </button>

        {/* Layers Button */}
        <button
          onClick={() => setShowLayerPanel(true)}
          className={`w-10 h-10 rounded-lg shadow-lg border flex items-center justify-center transition-colors duration-200 group ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          }`}
          title="Layers"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Legend Button */}
        <button
          onClick={() => setShowLegend(true)}
          className={`w-10 h-10 rounded-lg shadow-lg border flex items-center justify-center transition-colors duration-200 group ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          }`}
          title="Legend"
        >
          <MapPin className="w-4 h-4" />
        </button>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className={`w-10 h-10 rounded-lg shadow-lg border flex items-center justify-center transition-colors duration-200 group ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
            }`}
            title="Close Map"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Map
        ref={setMapRef}
        initialViewState={{
          longitude: 20.0, // Centered on Africa
          latitude: 0.0,
          zoom: 2 // Start with a wider view
        }}
        mapStyle="https://api.maptiler.com/maps/hybrid/style.json?key=bWaceUezT910NMn5AGhj"
        style={{ width: '100%', height: '100%' }}
        terrain={{
          source: 'terrain-dem',
          exaggeration: 1.5
        }}
        maxZoom={22}
        minZoom={1} // Allow zooming out much further
        pixelRatio={Math.min(window.devicePixelRatio || 1, 3)} // Higher pixel ratio for better quality
        renderWorldCopies={false}
        interactiveLayerIds={['pasture-quality-layer']}
        // preserveDrawingBuffer={true} // Better rendering quality - removed as not supported
        onMouseEnter={(e) => {
          if (e.features && e.features.length > 0) {
            e.target.getCanvas().style.cursor = 'pointer'
          }
        }}
        onMouseLeave={() => {
          // Reset cursor when not hovering over features
          const canvas = document.querySelector('.maplibregl-canvas') as HTMLCanvasElement
          if (canvas) {
            canvas.style.cursor = ''
          }
        }}
        onLoad={() => {
          // Enhance map quality after load
          if (mapRef) {
            const canvas = mapRef.getCanvas()
            if (canvas) {
              canvas.style.imageRendering = 'high-quality'
              canvas.style.imageRendering = '-webkit-optimize-contrast'
            }
          }
        }}
        onMove={() => {
          // Update zoom level
          if (mapRef) {
            setCurrentZoom(Math.round(mapRef.getZoom() * 10) / 10)
          }
        }}
        onClick={(e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0]
            if (feature.properties) {
              setPopupInfo({
                longitude: e.lngLat.lng,
                latitude: e.lngLat.lat,
                name: feature.properties.name || 'Unknown Location',
                properties: feature.properties
              })
            }
          }
        }}
      >
            {/* Terrain Data Source */}
            <Source
              id="terrain-dem"
              type="raster-dem"
              url="https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.png?key=bWaceUezT910NMn5AGhj"
              tileSize={256}
              maxzoom={14}
            />

            {/* Base Satellite Layer - Global Coverage */}
            <Source
              id="base-satellite"
              type="raster"
              url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=bWaceUezT910NMn5AGhj"
              tileSize={256}
              minzoom={0}
              maxzoom={22}
            >
              <Layer
                id="base-satellite-layer"
                type="raster"
                paint={{
                  'raster-opacity': 0.8,
                  'raster-hue-rotate': 0,
                  'raster-saturation': 1.0,
                  'raster-contrast': 1.0
                }}
                minzoom={0}
                maxzoom={10}
              />
            </Source>

            {/* High-Resolution Satellite Layer */}
            <Source
              id="high-res-satellite"
              type="raster"
              url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=bWaceUezT910NMn5AGhj"
              tileSize={512}
              minzoom={8}
              maxzoom={22}
            >
              <Layer
                id="high-res-satellite-layer"
                type="raster"
                paint={{
                  'raster-opacity': 0.9,
                  'raster-hue-rotate': 0,
                  'raster-saturation': 1.0,
                  'raster-contrast': 1.0,
                  'raster-brightness-min': 0.1,
                  'raster-brightness-max': 0.9
                }}
                minzoom={10}
                maxzoom={16}
              />
            </Source>

            {/* Ultra High-Resolution Satellite Layer for Close Zoom */}
            <Source
              id="ultra-high-res-satellite"
              type="raster"
              url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=bWaceUezT910NMn5AGhj"
              tileSize={512}
              minzoom={14}
              maxzoom={22}
            >
              <Layer
                id="ultra-high-res-satellite-layer"
                type="raster"
                paint={{
                  'raster-opacity': 1.0,
                  'raster-hue-rotate': 0,
                  'raster-saturation': 1.0,
                  'raster-contrast': 1.0,
                  'raster-brightness-min': 0.05,
                  'raster-brightness-max': 0.95
                }}
                minzoom={16}
                maxzoom={22}
              />
            </Source>

            {/* Maximum Detail Layer for Extreme Zoom */}
            <Source
              id="max-detail-satellite"
              type="raster"
              url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=bWaceUezT910NMn5AGhj"
              tileSize={512}
              minzoom={18}
              maxzoom={22}
            >
              <Layer
                id="max-detail-satellite-layer"
                type="raster"
                paint={{
                  'raster-opacity': 1.0,
                  'raster-hue-rotate': 0,
                  'raster-saturation': 1.0,
                  'raster-contrast': 1.0,
                  'raster-brightness-min': 0.0,
                  'raster-brightness-max': 1.0
                }}
                minzoom={20}
                maxzoom={22}
              />
            </Source>

            {/* Pasture Quality Layer */}
            {layerVisibility.pasture && (
              <Source
                id="pasture-quality"
                type="geojson"
                data={convertToGeoJSON(getLocationsByType('pasture'))}
              >
            <Layer
              id="pasture-quality-layer"
              type="fill-extrusion"
              paint={{
                'fill-extrusion-color': [
                  'case',
                  ['==', ['get', 'quality'], 'Good'], '#10B981',
                  ['==', ['get', 'quality'], 'Fair'], '#F59E0B',
                  '#EF4444'
                ],
                'fill-extrusion-height': [
                  'case',
                  ['==', ['get', 'quality'], 'Good'], 500,
                  ['==', ['get', 'quality'], 'Fair'], 200,
                  50
                ],
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': 0.8
              }}
            />
            <Layer
              id="pasture-quality-outline"
              type="line"
              paint={{
                'line-color': [
                  'case',
                  ['==', ['get', 'quality'], 'Good'], '#059669',
                  ['==', ['get', 'quality'], 'Fair'], '#D97706',
                  '#DC2626'
                ],
                'line-width': 3,
                'line-opacity': 0.8
              }}
            />
          </Source>
        )}

        {/* User Location Marker */}
        {showUserLocation && userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full shadow-lg border-4 border-white animate-pulse">
              <Navigation className="w-6 h-6 text-white" />
            </div>
          </Marker>
        )}

            {/* Water Sources Markers */}
            {layerVisibility.waterSources && getLocationsByType('water').map((location, index) => (
          <Marker
            key={`water-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                name: location.name,
                properties: location
              })
            }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Droplet className="w-5 h-5 text-white" />
            </div>
          </Marker>
        ))}

            {/* Livestock Markets Markers */}
            {layerVisibility.markets && getLocationsByType('market').map((location, index) => (
          <Marker
            key={`market-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                name: location.name,
                properties: location
              })
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </Marker>
        ))}

            {/* Veterinary Services Markers */}
            {layerVisibility.veterinary && getLocationsByType('veterinary').map((location, index) => (
          <Marker
            key={`vet-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                name: location.name,
                properties: location
              })
            }}
          >
            <div className="flex items-center justify-center w-9 h-9 bg-red-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </Marker>
        ))}

            {/* Weather Stations Markers */}
            {layerVisibility.weather && getLocationsByType('weather').map((location, index) => (
          <Marker
            key={`weather-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                name: location.name,
                properties: location
              })
            }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Cloud className="w-4 h-4 text-white" />
            </div>
          </Marker>
        ))}

            {/* Feed Suppliers Markers */}
            {layerVisibility.feedSuppliers && getLocationsByType('feed').map((location, index) => (
          <Marker
            key={`feed-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                name: location.name,
                properties: location
              })
            }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Package className="w-4 h-4 text-white" />
            </div>
          </Marker>
        ))}

            {/* Transport Hubs Markers */}
            {layerVisibility.transport && getLocationsByType('transport').map((location, index) => (
          <Marker
            key={`transport-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                name: location.name,
                properties: location
              })
            }}
          >
            <div className="flex items-center justify-center w-9 h-9 bg-indigo-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <TransportIcon className="w-5 h-5 text-white" />
            </div>
          </Marker>
        ))}

            {/* Processing Facilities Markers */}
            {layerVisibility.processing && getLocationsByType('processing').map((location, index) => (
          <Marker
            key={`processing-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: location.coordinates[0],
                latitude: location.coordinates[1],
                name: location.name,
                properties: location
              })
            }}
          >
            <div className="flex items-center justify-center w-9 h-9 bg-gray-600 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Settings className="w-5 h-5 text-white" />
            </div>
          </Marker>
        ))}

        {/* Environmental Data Layers */}
        
        {/* Rainfall Layer */}
        {layerVisibility.rainfall && (
          <Source
            id="rainfall-data"
            type="geojson"
            data={rainfallData}
          >
            <Layer
              id="rainfall-layer"
              type="fill"
              paint={{
                'fill-color': [
                  'case',
                  ['==', ['get', 'rainfall'], 'High'], '#3B82F6',
                  ['==', ['get', 'rainfall'], 'Medium'], '#60A5FA',
                  '#93C5FD'
                ],
                'fill-opacity': 0.4
              }}
            />
          </Source>
        )}

        {/* Temperature Layer */}
        {layerVisibility.temperature && (
          <Source
            id="temperature-data"
            type="geojson"
            data={temperatureData}
          >
            <Layer
              id="temperature-layer"
              type="fill"
              paint={{
                'fill-color': [
                  'case',
                  ['==', ['get', 'temperature'], 'Cool'], '#3B82F6',
                  ['==', ['get', 'temperature'], 'Warm'], '#EF4444',
                  '#F59E0B'
                ],
                'fill-opacity': 0.4
              }}
            />
          </Source>
        )}

        {/* Humidity Layer */}
        {layerVisibility.humidity && (
          <Source
            id="humidity-data"
            type="geojson"
            data={humidityData}
          >
            <Layer
              id="humidity-layer"
              type="fill"
              paint={{
                'fill-color': [
                  'case',
                  ['==', ['get', 'humidity'], 'High'], '#06B6D4',
                  ['==', ['get', 'humidity'], 'Low'], '#F59E0B',
                  '#84CC16'
                ],
                'fill-opacity': 0.4
              }}
            />
          </Source>
        )}

        {/* Wind Layer */}
        {layerVisibility.wind && windData.features.map((feature, index) => (
          <Marker
            key={`wind-${index}`}
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopupInfo({
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                name: `Wind Station ${index + 1}`,
                properties: feature.properties
              })
            }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Wind className="w-4 h-4 text-white" />
            </div>
          </Marker>
        ))}

        {/* Vegetation Layer */}
        {layerVisibility.vegetation && (
          <Source
            id="vegetation-data"
            type="geojson"
            data={vegetationData}
          >
            <Layer
              id="vegetation-layer"
              type="fill"
              paint={{
                'fill-color': [
                  'case',
                  ['==', ['get', 'index'], 'High'], '#10B981',
                  ['==', ['get', 'index'], 'Medium'], '#84CC16',
                  '#F59E0B'
                ],
                'fill-opacity': 0.4
              }}
            />
          </Source>
        )}

        {/* Elevation Layer */}
        {layerVisibility.elevation && (
          <Source
            id="elevation-data"
            type="geojson"
            data={elevationData}
          >
            <Layer
              id="elevation-layer"
              type="fill"
              paint={{
                'fill-color': [
                  'case',
                  ['==', ['get', 'elevation'], 'High'], '#F59E0B',
                  ['==', ['get', 'elevation'], 'Low'], '#84CC16',
                  '#E5E7EB'
                ],
                'fill-opacity': 0.4
              }}
            />
          </Source>
        )}

        {/* Drought Risk Layer */}
        {layerVisibility.drought && (
          <Source
            id="drought-data"
            type="geojson"
            data={droughtData}
          >
            <Layer
              id="drought-layer"
              type="fill"
              paint={{
                'fill-color': [
                  'case',
                  ['==', ['get', 'risk'], 'High'], '#EF4444',
                  ['==', ['get', 'risk'], 'Low'], '#10B981',
                  '#F59E0B'
                ],
                'fill-opacity': 0.4
              }}
            />
          </Source>
        )}

        {/* Popup for clicked features */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="custom-popup"
          >
                <div className="p-4 min-w-[250px] bg-white rounded-lg shadow-2xl border-2 border-gray-300">
                  <div className="flex items-center space-x-2 mb-3">
                    {popupInfo.properties?.type === 'water' && <Droplet className="w-5 h-5 text-blue-500" />}
                    {popupInfo.properties?.type === 'market' && <ShoppingCart className="w-5 h-5 text-purple-500" />}
                    {popupInfo.properties?.type === 'clinic' && <Heart className="w-5 h-5 text-red-500" />}
                    {popupInfo.properties?.type === 'hospital' && <Heart className="w-5 h-5 text-red-500" />}
                    {popupInfo.properties?.type === 'mobile' && <Heart className="w-5 h-5 text-red-500" />}
                    {popupInfo.properties?.type === 'weather' && <Cloud className="w-5 h-5 text-cyan-500" />}
                    {popupInfo.properties?.type === 'feed' && <Package className="w-5 h-5 text-orange-500" />}
                    {popupInfo.properties?.type === 'transport' && <TransportIcon className="w-5 h-5 text-indigo-500" />}
                    {popupInfo.properties?.type === 'processing' && <Settings className="w-5 h-5 text-gray-600" />}
                    {popupInfo.properties?.quality && <Activity className="w-5 h-5 text-green-500" />}
                    <span className="font-bold text-lg text-gray-900">{popupInfo.name}</span>
                  </div>
              
              {popupInfo.properties && (
                <div className="space-y-2 text-sm">
                  {popupInfo.properties.quality && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-200">
                      <span className="font-semibold text-gray-800">Quality:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        popupInfo.properties.quality === 'Good' ? 'bg-green-100 text-green-800' :
                        popupInfo.properties.quality === 'Fair' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {popupInfo.properties.quality}
                      </span>
                    </div>
                  )}
                  
                  {popupInfo.properties.capacity && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-200">
                      <span className="font-semibold text-gray-800">Capacity:</span>
                      <span className="font-bold text-gray-900 capitalize">{popupInfo.properties.capacity}</span>
                    </div>
                  )}
                  
                  {popupInfo.properties.size && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-200">
                      <span className="font-semibold text-gray-800">Size:</span>
                      <span className="font-bold text-gray-900 capitalize">{popupInfo.properties.size}</span>
                    </div>
                  )}
                  
                  {popupInfo.properties.weeklyVolume && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-200">
                      <span className="font-semibold text-gray-800">Weekly Volume:</span>
                      <span className="font-bold text-gray-900">{popupInfo.properties.weeklyVolume}</span>
                    </div>
                  )}
                  
                  {popupInfo.properties.rating && (
                    <div className="flex justify-between items-center py-1">
                      <span className="font-semibold text-gray-800">Rating:</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-bold text-gray-900">{popupInfo.properties.rating}/5</span>
                      </div>
                    </div>
                  )}
                  
                      {popupInfo.properties.temperature && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Temperature:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.temperature}°C</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.humidity && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Humidity:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.humidity}%</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.rainfall && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Rainfall:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.rainfall}mm</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.products && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Products:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.products.join(', ')}</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.deliveryRadius && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Delivery Radius:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.deliveryRadius}km</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.operatingHours && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Hours:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.operatingHours}</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.certifications && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Certifications:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.certifications.join(', ')}</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.services && (
                        <div className="flex justify-between items-center py-1 border-b border-gray-200">
                          <span className="font-semibold text-gray-800">Services:</span>
                          <span className="font-bold text-gray-900">{popupInfo.properties.services.join(', ')}</span>
                        </div>
                      )}
                      
                      {popupInfo.properties.description && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-gray-600 text-xs">{popupInfo.properties.description}</p>
                        </div>
                      )}
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>
      
      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className={`px-3 py-2 rounded-lg shadow-lg border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600 text-gray-200' 
            : 'bg-white border-gray-300 text-gray-700'
        }`}>
          <div className="text-sm font-medium">Zoom: {currentZoom}</div>
          <div className={`text-xs transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {currentZoom >= 18 ? 'Maximum Detail' : 
             currentZoom >= 14 ? 'High Detail' : 
             currentZoom >= 10 ? 'Medium Detail' : 
             currentZoom >= 6 ? 'Low Detail' : 'Overview'}
          </div>
        </div>
      </div>

      {/* Subtle overlay for professional look */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>


      {/* Data Panel */}
      {selectedLocation && (
        <MapDataPanel
          latitude={selectedLocation.lat}
          longitude={selectedLocation.lon}
          isVisible={showDataPanel}
          onClose={() => setShowDataPanel(false)}
        />
      )}

      {/* Layer Panel */}
      <LayerPanel
        isVisible={showLayerPanel}
        onClose={() => setShowLayerPanel(false)}
        layerVisibility={layerVisibility}
        onToggleLayer={toggleLayer}
      />

      {/* Map Legend */}
      <MapLegend
        isVisible={showLegend}
        onClose={() => setShowLegend(false)}
        layerVisibility={layerVisibility}
      />
    </div>
  )
}

export default EcosystemMap
