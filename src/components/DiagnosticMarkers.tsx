import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

interface DiagnosticMarker {
  id: string
  position: [number, number, number]
  type: 'body-condition' | 'physical-health' | 'conformation' | 'age'
  severity: 'excellent' | 'good' | 'fair' | 'poor'
  description: string
  score: number
  isActive: boolean
}

interface DiagnosticMarkersProps {
  maliScore: {
    bodyCondition: number
    physicalHealth: number
    conformation: number
    ageEstimation: number
    totalScore: number
  }
  isAnalyzing: boolean
  onMarkerClick?: (marker: DiagnosticMarker) => void
}

const DiagnosticMarkers: React.FC<DiagnosticMarkersProps> = ({ 
  maliScore, 
  isAnalyzing, 
  onMarkerClick 
}) => {
  const [markers, setMarkers] = useState<DiagnosticMarker[]>([])
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)
  const markerRefs = useRef<{ [key: string]: THREE.Group }>({})

  // Generate markers based on Mali-Score
  useEffect(() => {
    const newMarkers: DiagnosticMarker[] = [
      // Body Condition Markers
      {
        id: 'body-condition-1',
        position: [0.8, 0.2, 0.5] as [number, number, number],
        type: 'body-condition',
        severity: maliScore.bodyCondition >= 80 ? 'excellent' : 
                 maliScore.bodyCondition >= 60 ? 'good' : 
                 maliScore.bodyCondition >= 40 ? 'fair' : 'poor',
        description: 'Rib visibility and muscle tone',
        score: maliScore.bodyCondition,
        isActive: true
      },
      {
        id: 'body-condition-2',
        position: [-0.6, 0.1, 0.3] as [number, number, number],
        type: 'body-condition',
        severity: maliScore.bodyCondition >= 80 ? 'excellent' : 
                 maliScore.bodyCondition >= 60 ? 'good' : 
                 maliScore.bodyCondition >= 40 ? 'fair' : 'poor',
        description: 'Hip bone prominence',
        score: maliScore.bodyCondition,
        isActive: true
      },
      
      // Physical Health Markers
      {
        id: 'physical-health-1',
        position: [1.1, 0.4, 0.2] as [number, number, number],
        type: 'physical-health',
        severity: maliScore.physicalHealth >= 80 ? 'excellent' : 
                 maliScore.physicalHealth >= 60 ? 'good' : 
                 maliScore.physicalHealth >= 40 ? 'fair' : 'poor',
        description: 'Coat quality and shine',
        score: maliScore.physicalHealth,
        isActive: true
      },
      {
        id: 'physical-health-2',
        position: [0.3, 0.6, 0.8] as [number, number, number],
        type: 'physical-health',
        severity: maliScore.physicalHealth >= 80 ? 'excellent' : 
                 maliScore.physicalHealth >= 60 ? 'good' : 
                 maliScore.physicalHealth >= 40 ? 'fair' : 'poor',
        description: 'Skin condition and lesions',
        score: maliScore.physicalHealth,
        isActive: true
      },
      
      // Conformation Markers
      {
        id: 'conformation-1',
        position: [0.2, -0.3, 0.6] as [number, number, number],
        type: 'conformation',
        severity: maliScore.conformation >= 80 ? 'excellent' : 
                 maliScore.conformation >= 60 ? 'good' : 
                 maliScore.conformation >= 40 ? 'fair' : 'poor',
        description: 'Leg structure and stance',
        score: maliScore.conformation,
        isActive: true
      },
      {
        id: 'conformation-2',
        position: [-0.4, 0.1, 0.4] as [number, number, number],
        type: 'conformation',
        severity: maliScore.conformation >= 80 ? 'excellent' : 
                 maliScore.conformation >= 60 ? 'good' : 
                 maliScore.conformation >= 40 ? 'fair' : 'poor',
        description: 'Back straightness and posture',
        score: maliScore.conformation,
        isActive: true
      },
      
      // Age Estimation Markers
      {
        id: 'age-1',
        position: [1.3, 0.1, 0.1] as [number, number, number],
        type: 'age',
        severity: maliScore.ageEstimation >= 80 ? 'excellent' : 
                 maliScore.ageEstimation >= 60 ? 'good' : 
                 maliScore.ageEstimation >= 40 ? 'fair' : 'poor',
        description: 'Facial features and maturity',
        score: maliScore.ageEstimation,
        isActive: true
      },
      {
        id: 'age-2',
        position: [0.9, 0.3, -0.2] as [number, number, number],
        type: 'age',
        severity: maliScore.ageEstimation >= 80 ? 'excellent' : 
                 maliScore.ageEstimation >= 60 ? 'good' : 
                 maliScore.ageEstimation >= 40 ? 'fair' : 'poor',
        description: 'Horn development and size',
        score: maliScore.ageEstimation,
        isActive: true
      }
    ]
    
    setMarkers(newMarkers)
  }, [maliScore])

  // Animate markers during analysis
  useFrame((state) => {
    markers.forEach((marker) => {
      const markerRef = markerRefs.current[marker.id]
      if (markerRef && isAnalyzing) {
        markerRef.position.y = marker.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
        markerRef.rotation.y = state.clock.elapsedTime
      }
    })
  })

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case 'excellent': return '#10B981' // Green
      case 'good': return '#3B82F6' // Blue
      case 'fair': return '#F59E0B' // Orange
      case 'poor': return '#EF4444' // Red
      default: return '#6B7280' // Gray
    }
  }

  const getMarkerSize = (severity: string) => {
    switch (severity) {
      case 'excellent': return 0.15
      case 'good': return 0.12
      case 'fair': return 0.1
      case 'poor': return 0.08
      default: return 0.1
    }
  }

  const handleMarkerClick = (marker: DiagnosticMarker) => {
    if (onMarkerClick) {
      onMarkerClick(marker)
    }
  }

  if (!isAnalyzing && markers.length === 0) return null

  return (
    <group>
      {markers.map((marker) => (
        <group
          key={marker.id}
          ref={(ref) => {
            if (ref) markerRefs.current[marker.id] = ref
          }}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
          onPointerOver={() => setHoveredMarker(marker.id)}
          onPointerOut={() => setHoveredMarker(null)}
        >
          {/* Marker Sphere */}
          <mesh>
            <sphereGeometry args={[getMarkerSize(marker.severity), 16, 16]} />
            <meshStandardMaterial
              color={getMarkerColor(marker.severity)}
              emissive={getMarkerColor(marker.severity)}
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Pulsing Ring */}
          <mesh>
            <ringGeometry args={[getMarkerSize(marker.severity) * 1.5, getMarkerSize(marker.severity) * 2, 16]} />
            <meshBasicMaterial
              color={getMarkerColor(marker.severity)}
              transparent
              opacity={0.3}
            />
          </mesh>
          
          {/* Marker Label */}
          <Text
            position={[0, getMarkerSize(marker.severity) + 0.2, 0]}
            fontSize={0.1}
            color={getMarkerColor(marker.severity)}
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {marker.score}
          </Text>
          
          {/* Hover Info */}
          {hoveredMarker === marker.id && (
            <Html
              position={[0, getMarkerSize(marker.severity) + 0.4, 0]}
              center
              distanceFactor={10}
            >
              <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs border border-gray-200">
                <div className="text-sm font-medium text-gray-800 mb-1">
                  {marker.type.replace('-', ' ').toUpperCase()}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {marker.description}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Score:</span>
                  <span className={`text-sm font-bold ${getMarkerColor(marker.severity)}`}>
                    {marker.score}/100
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">Status:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    marker.severity === 'excellent' ? 'bg-green-100 text-green-800' :
                    marker.severity === 'good' ? 'bg-blue-100 text-blue-800' :
                    marker.severity === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {marker.severity.toUpperCase()}
                  </span>
                </div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}

export default DiagnosticMarkers
