import React, { useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import Map, { Source, Layer, Popup } from 'react-map-gl/maplibre'
import { MapPin, Droplet, Activity, ShoppingCart, Heart } from 'react-feather'
import { pastureQualityData, waterSourcesData, livestockMarketsData, veterinaryServicesData } from '../data/mapData'

interface EcosystemMapProps {
  // Props can be added later for customization
}

const EcosystemMap: React.FC<EcosystemMapProps> = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const [popupInfo, setPopupInfo] = useState<{ 
    longitude: number; 
    latitude: number; 
    name: string; 
    properties?: any 
  } | null>(null)

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <Map
        initialViewState={{
          longitude: 36.8219, // Centered on Nairobi, Kenya
          latitude: -1.2921,
          zoom: 6
        }}
        mapStyle={{
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: [
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              ],
              tileSize: 256,
              attribution: '© Esri'
            },
            'openstreetmap': {
              type: 'raster',
              tiles: [
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'satellite',
              type: 'raster',
              source: 'raster-tiles',
              minzoom: 0,
              maxzoom: 22
            },
            {
              id: 'streets',
              type: 'raster',
              source: 'openstreetmap',
              minzoom: 0,
              maxzoom: 18,
              paint: {
                'raster-opacity': 0.08
              }
            }
          ]
        }}
        style={{ width: '100%', height: '100%' }}
        interactiveLayerIds={['water-sources-layer', 'pasture-quality-layer', 'markets-layer', 'veterinary-layer']}
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
        {/* Pasture Quality Layer */}
        <Source
          id="pasture-quality"
          type="geojson"
          data={pastureQualityData}
        >
          <Layer
            id="pasture-quality-layer"
            type="fill"
            paint={{
              'fill-color': [
                'case',
                ['==', ['get', 'quality'], 'Good'], '#10B981',
                ['==', ['get', 'quality'], 'Fair'], '#F59E0B',
                '#EF4444'
              ],
              'fill-opacity': 0.6
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

        {/* Water Sources Layer */}
        <Source
          id="water-sources"
          type="geojson"
          data={waterSourcesData}
        >
          <Layer
            id="water-sources-layer"
            type="circle"
            paint={{
              'circle-radius': [
                'case',
                ['==', ['get', 'capacity'], 'High'], 8,
                ['==', ['get', 'capacity'], 'Medium'], 6,
                5
              ],
              'circle-color': '#3B82F6',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
              'circle-opacity': 0.9
            }}
          />
        </Source>

        {/* Livestock Markets Layer */}
        <Source
          id="livestock-markets"
          type="geojson"
          data={livestockMarketsData}
        >
          <Layer
            id="markets-layer"
            type="circle"
            paint={{
              'circle-radius': [
                'case',
                ['==', ['get', 'size'], 'Large'], 10,
                ['==', ['get', 'size'], 'Medium'], 8,
                6
              ],
              'circle-color': '#8B5CF6',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
              'circle-opacity': 0.9
            }}
          />
        </Source>

        {/* Veterinary Services Layer */}
        <Source
          id="veterinary-services"
          type="geojson"
          data={veterinaryServicesData}
        >
          <Layer
            id="veterinary-layer"
            type="circle"
            paint={{
              'circle-radius': 7,
              'circle-color': '#EF4444',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
              'circle-opacity': 0.9
            }}
          />
        </Source>

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
      
      {/* Subtle overlay for professional look */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Map Legend - Inside map container */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md rounded-xl p-4 shadow-2xl max-w-xs border border-gray-600">
        <h3 className="font-semibold text-white mb-3 text-lg">Ecosystem Map Legend</h3>
        <div className="space-y-3">
          {/* Pasture Quality */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Pasture Quality</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded" style={{ opacity: 0.6 }}></div>
                <span className="text-sm text-gray-200">Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded" style={{ opacity: 0.6 }}></div>
                <span className="text-sm text-gray-200">Fair</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded" style={{ opacity: 0.6 }}></div>
                <span className="text-sm text-gray-200">Poor</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Services</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                <span className="text-sm text-gray-200">Water Sources</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white"></div>
                <span className="text-sm text-gray-200">Livestock Markets</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                <span className="text-sm text-gray-200">Veterinary Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcosystemMap
