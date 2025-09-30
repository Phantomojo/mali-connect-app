import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

interface CattleViewer3DProps {
  activeSection?: string
  maliScore?: any
  isAnalyzing?: boolean
}

// Mobile-optimized cow model with reduced complexity
const MobileCowModel: React.FC<any> = (props) => {
  const gltf = useGLTF('/models/low-poly_cow_-_neutral_pose.glb')
  
  // Clone the scene to avoid modifying the original
  const clonedScene = useMemo(() => {
    const scene = gltf.scene.clone()
    
    // Apply color to all meshes in the scene
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone()
        child.material.color.set(props.color || '#059669')
        child.material.roughness = 0.4
        child.material.metalness = 0.1
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    
    return scene
  }, [gltf.scene, props.color])
  
  return (
    <group {...props} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  )
}

const MobileCattleScene: React.FC<CattleViewer3DProps> = ({ 
  maliScore, 
  isAnalyzing 
}: any) => {
  const getModelColor = useMemo(() => {
    if (isAnalyzing) return '#8B5CF6' // Purple during analysis
    if (!maliScore) return '#059669' // Darker green - Default
    
    // Color based on Mali-Score with more vibrant colors
    if (maliScore.totalScore >= 80) return '#059669' // Dark Green - Excellent
    if (maliScore.totalScore >= 60) return '#2563EB' // Dark Blue - Good
    if (maliScore.totalScore >= 40) return '#D97706' // Dark Orange - Fair
    return '#DC2626' // Dark Red - Poor
  }, [isAnalyzing, maliScore])

  return (
    <>
      {/* Simplified Lighting for Mobile */}
      <ambientLight intensity={0.6} color="#f0f9ff" />
      <directionalLight 
        position={[5, 8, 3]} 
        intensity={1.0} 
        color="#fef3c7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight 
        intensity={0.4} 
        color="#e0f2fe" 
        groundColor="#f0fdf4" 
      />

      {/* Mobile-optimized Cow Model */}
      <Suspense fallback={
        <group position={[0, -0.8, 0]} rotation={[0, Math.PI / 4, 0]}>
          {/* Simplified fallback model */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial 
              color={getModelColor}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[1.2, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial 
              color={getModelColor}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        </group>
      }>
        <MobileCowModel 
          position={[0, -0.8, 0]} 
          scale={[1.2, 1.2, 1.2]} 
          rotation={[0, Math.PI / 4, 0]}
          color={getModelColor}
          castShadow 
          receiveShadow
        />
      </Suspense>

      {/* Simplified Ground */}
      <mesh 
        position={[0, -1, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color="#e8f5e8" 
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Reduced Environment for Mobile */}
      <Environment preset="sunset" />
    </>
  )
}

const MobileCattleViewer3D: React.FC<CattleViewer3DProps> = (props) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-lg overflow-hidden relative shadow-xl border border-gray-200">
      <Canvas
        camera={{ 
          position: [6, 4, 6], 
          fov: 60,
          near: 0.1,
          far: 50
        }}
        shadows
        dpr={[1, 2]} // Limit pixel ratio for mobile
        performance={{ min: 0.5 }} // Reduce quality on low-end devices
        gl={{ 
          antialias: false, // Disable antialiasing for performance
          alpha: false,
          powerPreference: "low-power" // Use integrated GPU on mobile
        }}
      >
        <MobileCattleScene {...props} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
      
      {/* Mobile-optimized Analysis Overlay */}
      {props.isAnalyzing && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-600">Processing 3D model data...</p>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-4 mx-auto">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileCattleViewer3D
