import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, useTexture, Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

interface CattleViewer3DProps {
  activeSection?: string
  maliScore?: any
  isAnalyzing?: boolean
}

// Enhanced helper function for model appearance
const getModelAppearance = (maliScore?: any, isAnalyzing?: boolean) => {
  if (isAnalyzing) return {
    baseColor: '#8B5CF6',
    spotColor: '#A78BFA',
    emissive: '#4C1D95',
    roughness: 0.3,
    metalness: 0.0,
    glow: true
  }
  
  if (!maliScore) return {
    baseColor: '#8B4513', // Saddle brown - realistic cattle color
    spotColor: '#A0522D', // Sienna spots
    emissive: '#000000',
    roughness: 0.7,
    metalness: 0.0,
    glow: false
  }
  
  // Appearance based on Mali-Score with realistic cattle colors
  if (maliScore.totalScore >= 80) return {
    baseColor: '#8B4513', // Healthy brown
    spotColor: '#F4A460', // Sandy brown spots
    emissive: '#004d00', // Subtle green glow for excellent health
    roughness: 0.6,
    metalness: 0.0,
    glow: true
  }
  if (maliScore.totalScore >= 60) return {
    baseColor: '#A0522D', // Sienna
    spotColor: '#CD853F', // Peru spots
    emissive: '#000080', // Blue glow for good health
    roughness: 0.7,
    metalness: 0.0,
    glow: false
  }
  if (maliScore.totalScore >= 40) return {
    baseColor: '#8B4513', // Darker brown
    spotColor: '#696969', // Dim gray spots
    emissive: '#8B4500', // Orange glow for fair health
    roughness: 0.8,
    metalness: 0.0,
    glow: false
  }
  return {
    baseColor: '#654321', // Dark brown
    spotColor: '#2F4F4F', // Dark slate gray
    emissive: '#8B0000', // Red glow for poor health
    roughness: 0.9,
    metalness: 0.0,
    glow: false
  }
}

// Enhanced animated cow model with realistic materials
const EnhancedCowModel: React.FC<any> = (props) => {
  const gltf = useGLTF('/models/low-poly_cow_-_neutral_pose.glb')
  const groupRef = useRef<THREE.Group>(null)
  
  // Get appearance settings based on health score
  const appearance = useMemo(() => getModelAppearance(props.maliScore, props.isAnalyzing), [props.maliScore, props.isAnalyzing])
  
  // Subtle breathing animation
  useFrame((state) => {
    if (groupRef.current && !props.isAnalyzing) {
      // Gentle breathing motion
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02
      groupRef.current.scale.y = 1.5 * breathingScale
      
      // Very subtle idle sway
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })
  
  // Clone the scene to avoid modifying the original
  const clonedScene = useMemo(() => {
    const scene = gltf.scene.clone()
    
    // Apply enhanced materials to all meshes
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Create enhanced material with realistic cattle appearance
        const enhancedMaterial = new THREE.MeshStandardMaterial({
          color: appearance.baseColor,
          roughness: appearance.roughness,
          metalness: appearance.metalness,
          emissive: appearance.emissive,
          emissiveIntensity: appearance.glow ? 0.1 : 0,
        })
        
        // Add subtle normal mapping effect for texture
        enhancedMaterial.bumpScale = 0.1
        
        child.material = enhancedMaterial
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    
    return scene
  }, [appearance])
  
  return (
    <group ref={groupRef} {...props} dispose={null} scale={[1.5, 1.5, 1.5]} position={[0, -0.5, 0]}>
      <primitive object={clonedScene} />
      
      {/* Health glow effect for excellent health */}
      {appearance.glow && (
        <Sparkles
          count={15}
          scale={3}
          size={2}
          speed={0.3}
          color={appearance.emissive}
          opacity={0.6}
        />
      )}
    </group>
  )
}

const CattleScene: React.FC<CattleViewer3DProps> = ({ 
  maliScore, 
  isAnalyzing 
}: any) => {

  // Get appearance for lighting adjustments
  const appearance = useMemo(() => getModelAppearance(maliScore, isAnalyzing), [maliScore, isAnalyzing])

  return (
    <>
      {/* Enhanced Natural Lighting Setup */}
      <ambientLight intensity={0.4} color="#f0f9ff" />
      
      {/* Main sun light */}
      <directionalLight 
        position={[8, 12, 6]} 
        intensity={1.5} 
        color="#fff8dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light for softer shadows */}
      <directionalLight 
        position={[-4, 6, 8]} 
        intensity={0.6} 
        color="#e6f3ff"
      />
      
      {/* Rim light for better definition */}
      <directionalLight 
        position={[0, 8, -10]} 
        intensity={0.4} 
        color="#fff5ee"
      />
      
      {/* Natural hemisphere lighting */}
      <hemisphereLight 
        intensity={0.6} 
        color="#87ceeb" 
        groundColor="#8fbc8f" 
      />
      
      {/* Analysis mode special lighting */}
      {isAnalyzing && (
        <pointLight
          position={[0, 5, 0]}
          intensity={1.0}
          color="#8B5CF6"
          distance={15}
          decay={2}
        />
      )}

      {/* Enhanced 3D Cow Model with Animation */}
      <Float
        speed={0.5}
        rotationIntensity={0.1}
        floatIntensity={0.1}
        floatingRange={[0, 0.1]}
      >
        <Suspense fallback={
          <group position={[0, -0.8, 0]} rotation={[0, Math.PI / 4, 0]}>
            {/* Enhanced fallback model with better proportions */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <capsuleGeometry args={[0.8, 1.6, 4, 8]} />
              <meshStandardMaterial 
                color={appearance.baseColor}
                roughness={appearance.roughness}
                metalness={appearance.metalness}
                emissive={appearance.emissive}
              />
            </mesh>
            {/* Head */}
            <mesh position={[1.4, 0.4, 0]} castShadow receiveShadow>
              <capsuleGeometry args={[0.4, 0.6, 4, 8]} />
              <meshStandardMaterial 
                color={appearance.baseColor}
                roughness={appearance.roughness}
                metalness={appearance.metalness}
              />
            </mesh>
            {/* Legs with better shape */}
            {[
              [0.4, -0.8, 0.4],
              [0.4, -0.8, -0.4],
              [-0.4, -0.8, 0.4],
              [-0.4, -0.8, -0.4]
            ].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
                <meshStandardMaterial 
                  color={appearance.baseColor}
                  roughness={appearance.roughness}
                  metalness={appearance.metalness}
                />
              </mesh>
            ))}
          </group>
        }>
          <EnhancedCowModel 
            position={[0, -0.8, 0]} 
            rotation={[0, Math.PI / 4, 0]}
            maliScore={maliScore}
            isAnalyzing={isAnalyzing}
            castShadow 
            receiveShadow
          />
        </Suspense>
      </Float>

      {/* Enhanced Natural Ground */}
      <mesh 
        position={[0, -1.01, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <circleGeometry args={[12, 32]} />
        <meshStandardMaterial 
          color="#8fbc8f" 
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
      
      {/* Animated grass patches */}
      {Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * Math.PI * 2
        const radius = 3 + Math.random() * 6
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2
        
        return (
          <Float
            key={i}
            speed={0.2 + Math.random() * 0.3}
            rotationIntensity={0.1}
            floatIntensity={0.05}
          >
            <mesh
              position={[x, -0.98, z]}
              rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
              scale={[0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 1]}
            >
              <planeGeometry args={[0.3, 0.3]} />
              <meshStandardMaterial 
                color={['#90EE90', '#98FB98', '#00FF7F', '#32CD32'][Math.floor(Math.random() * 4)]}
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>
          </Float>
        )
      })}

      {/* Subtle particles for atmosphere */}
      <Sparkles
        count={25}
        scale={15}
        size={1}
        speed={0.1}
        color="#ffffff"
        opacity={0.3}
      />

      {/* Enhanced Environment */}
      <Environment preset="park" background={false} />
    </>
  )
}

const CattleViewer3D: React.FC<CattleViewer3DProps> = (props: any) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-lg overflow-hidden relative shadow-xl border border-gray-200">
      <Canvas
        camera={{ 
          position: [6, 4, 6], 
          fov: 60,
          near: 0.1,
          far: 150
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
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI - Math.PI / 8}
          minDistance={2}
          maxDistance={35}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          autoRotateSpeed={0.5}
          zoomSpeed={1.2}
        />
      </Canvas>

      {/* Enhanced Diagnostic Markers Overlay */}
      {props.maliScore && props.activeSection === 'score' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Body Condition Marker */}
          <div 
            className="absolute w-5 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
            title={`Body Condition: ${props.maliScore.bodyCondition}`}
          />
          
          {/* Physical Health Marker */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '35%', left: '65%', transform: 'translate(-50%, -50%)' }}
            title={`Physical Health: ${props.maliScore.physicalHealth}`}
          />
          
          {/* Conformation Marker */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '35%', left: '35%', transform: 'translate(-50%, -50%)' }}
            title={`Conformation: ${props.maliScore.conformation}`}
          />
          
          {/* Age Estimation Marker */}
          <div 
            className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full border-3 border-white shadow-xl animate-pulse"
            style={{ top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }}
            title={`Age Estimation: ${props.maliScore.ageEstimation}`}
          />
        </div>
      )}

      {/* Enhanced Analysis Animation Overlay */}
      {props.isAnalyzing && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Central analysis indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-60"></div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full animate-spin"></div>
            </div>
          </div>
          
          {/* Scanning lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"
                 style={{ 
                   top: '30%',
                   animation: 'scan-vertical 2s ease-in-out infinite'
                 }}>
            </div>
            <div className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse"
                 style={{ 
                   left: '60%',
                   animation: 'scan-horizontal 2.5s ease-in-out infinite'
                 }}>
            </div>
          </div>
          
          {/* Analysis progress text */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">AI Analysis in Progress...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!props.maliScore && (
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
