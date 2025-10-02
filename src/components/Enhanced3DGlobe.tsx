import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useTexture, Html, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { Globe, MapPin, TrendingUp, DollarSign, Activity, X } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface MarketHub {
  id: string
  name: string
  country: string
  lat: number
  lng: number
  basePrice: number
  demandMultiplier: number
  volume: number
  type: 'major' | 'regional' | 'local'
  lastUpdated: string
}

interface Enhanced3DGlobeProps {
  isGlobeMode: boolean
  onToggleMode: () => void
  selectedMarket?: MarketHub | null
  onMarketSelect: (market: MarketHub) => void
  onClose?: () => void
}

// Live market data - simulating real-time updates
const LIVE_MARKET_DATA: MarketHub[] = [
  {
    id: 'nairobi-central',
    name: 'Nairobi Central Livestock Market',
    country: 'Kenya',
    lat: -1.2921,
    lng: 36.8219,
    basePrice: 520,
    demandMultiplier: 1.15,
    volume: 2500,
    type: 'major',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'mombasa-port',
    name: 'Mombasa Port Livestock Terminal',
    country: 'Kenya',
    lat: -4.0435,
    lng: 39.6682,
    basePrice: 480,
    demandMultiplier: 1.08,
    volume: 1800,
    type: 'major',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'addis-ababa',
    name: 'Addis Ababa Livestock Market',
    country: 'Ethiopia',
    lat: 9.0320,
    lng: 38.7469,
    basePrice: 450,
    demandMultiplier: 1.12,
    volume: 3200,
    type: 'major',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'kampala-central',
    name: 'Kampala Central Market',
    country: 'Uganda',
    lat: 0.3476,
    lng: 32.5825,
    basePrice: 420,
    demandMultiplier: 1.05,
    volume: 1200,
    type: 'regional',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'dar-es-salaam',
    name: 'Dar es Salaam Livestock Hub',
    country: 'Tanzania',
    lat: -6.7924,
    lng: 39.2083,
    basePrice: 410,
    demandMultiplier: 1.03,
    volume: 900,
    type: 'regional',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'kigali-main',
    name: 'Kigali Main Livestock Market',
    country: 'Rwanda',
    lat: -1.9441,
    lng: 30.0619,
    basePrice: 380,
    demandMultiplier: 0.98,
    volume: 600,
    type: 'regional',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'marsabit-local',
    name: 'Marsabit Local Market',
    country: 'Kenya',
    lat: 2.3284,
    lng: 37.9899,
    basePrice: 350,
    demandMultiplier: 0.92,
    volume: 400,
    type: 'local',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'turkana-west',
    name: 'Turkana West Trading Post',
    country: 'Kenya',
    lat: 3.1190,
    lng: 35.5966,
    basePrice: 320,
    demandMultiplier: 0.88,
    volume: 250,
    type: 'local',
    lastUpdated: new Date().toISOString()
  }
]

// Convert lat/lng to 3D sphere coordinates
const latLngToVector3 = (lat: number, lng: number, radius: number = 5) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Market marker component for 3D globe
const MarketMarker: React.FC<{
  market: MarketHub
  position: THREE.Vector3
  onClick: () => void
  isSelected: boolean
}> = ({ market, position, onClick, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.setScalar(isSelected ? scale * 1.5 : scale)
    }
  })
  
  const markerColor = useMemo(() => {
    switch (market.type) {
      case 'major': return '#ff6b6b'
      case 'regional': return '#4ecdc4'
      case 'local': return '#45b7d1'
      default: return '#95a5a6'
    }
  }, [market.type])
  
  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor}
          emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Market info popup */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 text-white p-2 rounded-lg text-xs whitespace-nowrap pointer-events-none">
            <div className="font-bold">{market.name}</div>
            <div className="text-gray-300">{market.country}</div>
            <div className="text-green-400">${market.basePrice}/head</div>
            <div className="text-blue-400">{market.volume} head/month</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// 3D Earth component
const Earth3D: React.FC<{
  onMarketSelect: (market: MarketHub) => void
  selectedMarket?: MarketHub | null
}> = ({ onMarketSelect, selectedMarket }) => {
  const earthRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  
  // Load earth textures (using public domain textures)
  const earthTexture = useTexture('/world-map-8k.jpg')
  const earthNormalMap = useTexture('/world-map-8k.jpg') // Fallback to same texture
  
  // Auto-rotation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002
    }
  })
  
  // Market positions in 3D space
  const marketPositions = useMemo(() => {
    return LIVE_MARKET_DATA.map(market => ({
      market,
      position: latLngToVector3(market.lat, market.lng)
    }))
  }, [])
  
  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Market markers */}
      {marketPositions.map(({ market, position }) => (
        <MarketMarker
          key={market.id}
          market={market}
          position={position}
          onClick={() => onMarketSelect(market)}
          isSelected={selectedMarket?.id === market.id}
        />
      ))}
      
      {/* Atmosphere effect */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          color="#87CEEB"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// Market details panel
const MarketDetailsPanel: React.FC<{
  market: MarketHub
  onClose: () => void
}> = ({ market, onClose }) => {
  const { isDarkMode } = useTheme()
  
  const priceChange = useMemo(() => {
    // Simulate price change
    return (Math.random() - 0.5) * 20
  }, [market.id])
  
  return (
    <div className={`absolute top-4 right-4 w-80 rounded-xl shadow-2xl z-10 ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{market.name}</h3>
            <p className="text-sm opacity-70">{market.country}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Current Price</span>
            <div className="text-right">
              <div className="text-xl font-bold text-green-500">
                ${market.basePrice}
              </div>
              <div className={`text-xs ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Monthly Volume</span>
            <span className="font-semibold">{market.volume.toLocaleString()} head</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Demand Multiplier</span>
            <span className="font-semibold">{market.demandMultiplier}x</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Market Type</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              market.type === 'major' ? 'bg-red-100 text-red-800' :
              market.type === 'regional' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {market.type.toUpperCase()}
            </span>
          </div>
          
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs opacity-70">
              Last updated: {new Date(market.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Enhanced3DGlobe: React.FC<Enhanced3DGlobeProps> = ({
  isGlobeMode,
  onToggleMode,
  selectedMarket,
  onMarketSelect,
  onClose
}) => {
  const { isDarkMode } = useTheme()
  const [selectedMarketState, setSelectedMarketState] = useState<MarketHub | null>(null)
  
  const handleMarketSelect = (market: MarketHub) => {
    setSelectedMarketState(market)
    onMarketSelect(market)
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className={`w-full h-full relative ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        
        {/* Header */}
        <div className="absolute top-4 left-4 z-10">
          <div className={`rounded-xl p-4 shadow-lg ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}>
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 text-blue-500" />
              <div>
                <h2 className="text-xl font-bold">Global Livestock Markets</h2>
                <p className="text-sm opacity-70">Real-time pricing and volume data</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        {/* 3D Globe */}
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: true,
            premultipliedAlpha: false
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          <Earth3D
            onMarketSelect={handleMarketSelect}
            selectedMarket={selectedMarketState}
          />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={25}
            autoRotate={false}
            dampingFactor={0.05}
            enableDamping={true}
          />
        </Canvas>
        
        {/* Market details panel */}
        {selectedMarketState && (
          <MarketDetailsPanel
            market={selectedMarketState}
            onClose={() => setSelectedMarketState(null)}
          />
        )}
        
        {/* Market summary */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className={`rounded-xl p-4 shadow-lg ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}>
            <h3 className="font-bold mb-2">Market Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-red-500 font-semibold">Major Markets</div>
                <div>{LIVE_MARKET_DATA.filter(m => m.type === 'major').length}</div>
              </div>
              <div>
                <div className="text-blue-500 font-semibold">Regional Markets</div>
                <div>{LIVE_MARKET_DATA.filter(m => m.type === 'regional').length}</div>
              </div>
              <div>
                <div className="text-green-500 font-semibold">Local Markets</div>
                <div>{LIVE_MARKET_DATA.filter(m => m.type === 'local').length}</div>
              </div>
              <div>
                <div className="text-purple-500 font-semibold">Avg Price</div>
                <div>${Math.round(LIVE_MARKET_DATA.reduce((sum, m) => sum + m.basePrice, 0) / LIVE_MARKET_DATA.length)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Enhanced3DGlobe
