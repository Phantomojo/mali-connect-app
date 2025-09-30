import { useState, useEffect } from 'react'

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTabletDevice = /ipad|android(?!.*mobile)/i.test(userAgent)
      
      // Check for low-end device indicators
      const isLowEndDevice = 
        navigator.hardwareConcurrency <= 2 || // Low CPU cores
        (navigator as any).deviceMemory <= 2 || // Low RAM (if available)
        /android.*chrome\/[0-5][0-9]/.test(userAgent) // Old Android versions
      
      setIsMobile(isMobileDevice)
      setIsTablet(isTabletDevice)
      setIsLowEnd(isLowEndDevice)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return { isMobile, isTablet, isLowEnd }
}
