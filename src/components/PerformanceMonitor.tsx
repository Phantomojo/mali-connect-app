import React, { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

interface PerformanceMonitorProps {
  onPerformanceIssue?: () => void
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onPerformanceIssue }) => {
  const { gl } = useThree()
  const [frameCount, setFrameCount] = useState(0)
  const [lastTime, setLastTime] = useState(performance.now())
  const [fps, setFps] = useState(60)

  useFrame(() => {
    const now = performance.now()
    const newFrameCount = frameCount + 1
    setFrameCount(newFrameCount)

    // Calculate FPS every 60 frames
    if (newFrameCount % 60 === 0) {
      const currentFps = 60000 / (now - lastTime)
      setFps(currentFps)
      setLastTime(now)

      // If FPS drops below 20, trigger performance issue callback
      if (currentFps < 20 && onPerformanceIssue) {
        onPerformanceIssue()
      }
    }
  })

  useEffect(() => {
    // Monitor WebGL context
    const handleContextLost = () => {
      console.warn('WebGL context lost detected by PerformanceMonitor')
      if (onPerformanceIssue) {
        onPerformanceIssue()
      }
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored')
    }

    gl.domElement.addEventListener('webglcontextlost', handleContextLost)
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost)
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [gl, onPerformanceIssue])

  // This component doesn't render anything visible
  return null
}

export default PerformanceMonitor
