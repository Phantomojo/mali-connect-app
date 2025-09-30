import React from 'react'
import { useMobile } from '../hooks/useMobile'
import CattleViewer3D from './CattleViewer3D'
import MobileCattleViewer3D from './CattleViewer3D-mobile'

interface AdaptiveCattleViewerProps {
  activeSection?: string
  maliScore?: any
  isAnalyzing?: boolean
}

const AdaptiveCattleViewer: React.FC<AdaptiveCattleViewerProps> = (props) => {
  const { isMobile, isLowEnd } = useMobile()

  // Use mobile-optimized version for mobile devices or low-end devices
  if (isMobile || isLowEnd) {
    return <MobileCattleViewer3D {...props} />
  }

  // Use full version for desktop
  return <CattleViewer3D {...props} />
}

export default AdaptiveCattleViewer
