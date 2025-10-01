import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface CattleViewer3DProps {
  activeSection?: string
  maliScore?: any
  isAnalyzing?: boolean
}

// Helper function for model color
const getModelColor = (maliScore?: any, isAnalyzing?: boolean) => {
  if (isAnalyzing) return '#8B5CF6' // Purple during analysis
  if (!maliScore) return '#059669' // Darker green - Default
  
  // Color based on Mali-Score with more vibrant colors
  if (maliScore.totalScore >= 80) return '#059669' // Dark Green - Excellent
  if (maliScore.totalScore >= 60) return '#2563EB' // Dark Blue - Good
  if (maliScore.totalScore >= 40) return '#D97706' // Dark Orange - Fair
  return '#DC2626' // Dark Red - Poor
}

// Direct GLB loading component with color override
const CowModel: React.FC<any> = (props) => {
  const gltf = useGLTF('/models/low-poly_cow_-_neutral_pose.glb')
  
  // Clone the scene to avoid modifying the original
  const clonedScene = gltf.scene.clone()
  
  // Apply color to all meshes in the scene and handle material conversion
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      try {
        // Clone material to avoid modifying original
        child.material = child.material.clone()
        
        // Convert to MeshStandardMaterial if needed (handles KHR_materials_pbrSpecularGlossiness)
        if (child.material.type !== 'MeshStandardMaterial') {
          const standardMaterial = new THREE.MeshStandardMaterial()
          standardMaterial.copy(child.material)
          child.material = standardMaterial
        }
      } catch (error) {
        console.warn('Material conversion failed, using fallback:', error)
        // Fallback to basic material
        child.material = new THREE.MeshStandardMaterial({
          color: getModelColor(maliScore, isAnalyzing),
          roughness: 0.3,
          metalness: 0.1
        })
      }
      
      // Apply custom properties
      child.material.color.set(props.color || getModelColor(maliScore, isAnalyzing))
      child.material.roughness = 0.4
      child.material.metalness = 0.1
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  
  return (
    <group {...props} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  )
}

const CattleScene: React.FC<CattleViewer3DProps> = ({ 
  maliScore, 
  isAnalyzing 
}: any) => {

  return (
    <>
      {/* Enhanced Colorful Lighting */}
      <ambientLight intensity={0.8} color="#f0f9ff" />
      <directionalLight 
        position={[5, 8, 3]} 
        intensity={1.4} 
        color="#fef3c7"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight 
        position={[-3, 4, 2]} 
        intensity={0.6} 
        color="#ddd6fe"
      />
      <directionalLight 
        position={[0, 6, -5]} 
        intensity={0.5} 
        color="#bbf7d0"
      />
      <hemisphereLight 
        intensity={0.6} 
        color="#e0f2fe" 
        groundColor="#f0fdf4" 
      />

      {/* Real 3D Cow Model */}
      <Suspense fallback={
        <group position={[0, -0.8, 0]} rotation={[0, Math.PI / 4, 0]}>
          {/* Body */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial 
              color={getModelColor(maliScore, isAnalyzing)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          {/* Head */}
          <mesh position={[1.2, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial 
              color={getModelColor(maliScore, isAnalyzing)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          {/* Legs */}
          <mesh position={[0.5, -0.8, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial 
              color={getModelColor(maliScore, isAnalyzing)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0.5, -0.8, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial 
              color={getModelColor(maliScore, isAnalyzing)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[-0.5, -0.8, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial 
              color={getModelColor(maliScore, isAnalyzing)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[-0.5, -0.8, -0.3]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial 
              color={getModelColor(maliScore, isAnalyzing)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        </group>
      }>
        <CowModel 
          position={[0, -0.8, 0]} 
          scale={[1.5, 1.5, 1.5]} 
          rotation={[0, Math.PI / 4, 0]}
          color={getModelColor(maliScore, isAnalyzing)}
          castShadow 
          receiveShadow
        />
      </Suspense>

      {/* Natural Ground plane */}
      <mesh 
        position={[0, -1, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#e8f5e8" 
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      
      {/* Grass patches for more natural look */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            -0.95,
            (Math.random() - 0.5) * 15
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? "#a7f3d0" : i % 3 === 1 ? "#86efac" : "#6ee7b7"}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Environment */}
      <Environment preset="studio" />
    </>
  )
}

const CattleViewer3D: React.FC<CattleViewer3DProps> = (props: any) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-lg overflow-hidden relative shadow-xl border border-gray-200">
      <Canvas
        camera={{ 
          position: [8, 5, 8], 
          fov: 50,
          near: 0.1,
          far: 100
        }}
        shadows
        style={{ width: '100%', height: '100%' }}
            gl={{ 
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
              premultipliedAlpha: true,
              preserveDrawingBuffer: false,
              depth: true,
              stencil: false
            }}
            onCreated={({ gl }) => {
              // Configure WebGL for better stability
              gl.setClearColor(0x000000, 0)
              gl.shadowMap.enabled = true
              gl.shadowMap.type = THREE.PCFSoftShadowMap
              
              // Handle WebGL context loss more gracefully
              const handleContextLost = (event: Event) => {
                console.warn('WebGL context lost, attempting recovery...')
                event.preventDefault()
                // Don't force immediate recovery, let the browser handle it
              }
              
              const handleContextRestored = () => {
                console.log('WebGL context restored')
                // Re-initialize WebGL settings
                gl.setClearColor(0x000000, 0)
                gl.shadowMap.enabled = true
                gl.shadowMap.type = THREE.PCFSoftShadowMap
              }
              
              gl.domElement.addEventListener('webglcontextlost', handleContextLost)
              gl.domElement.addEventListener('webglcontextrestored', handleContextRestored)
              
              // Cleanup listeners on unmount
              return () => {
                gl.domElement.removeEventListener('webglcontextlost', handleContextLost)
                gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored)
              }
            }}
      >
        <CattleScene {...props} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 12}
          maxPolarAngle={Math.PI - Math.PI / 12}
          minDistance={5}
          maxDistance={20}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Enhanced Diagnostic Markers Overlay */}
      {maliScore && props.activeSection === 'score' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Body Condition Marker */}
          <div 
            className="absolute w-5 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
            title={`Body Condition: ${maliScore.bodyCondition}`}
          />
          
          {/* Physical Health Marker */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '35%', left: '65%', transform: 'translate(-50%, -50%)' }}
            title={`Physical Health: ${maliScore.physicalHealth}`}
          />
          
          {/* Conformation Marker */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '35%', left: '35%', transform: 'translate(-50%, -50%)' }}
            title={`Conformation: ${maliScore.conformation}`}
          />
          
          {/* Age Estimation Marker */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }}
            title={`Age Estimation: ${maliScore.ageEstimation}`}
          />
        </div>
      )}

      {/* Enhanced Analysis Animation Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!maliScore && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mali-green mx-auto mb-4"></div>
            <p className="text-mali-gray">Loading 3D Model...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CattleViewer3D
