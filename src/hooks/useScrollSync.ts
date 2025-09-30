import { useState, useEffect } from 'react'

type ScrollSection = 'case-selection' | 'analysis' | 'model' | 'score' | 'ecosystem'

export const useScrollSync = () => {
  const [activeSection, setActiveSection] = useState<ScrollSection>('case-selection')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calculate which section is currently in view
      const sections: ScrollSection[] = ['case-selection', 'analysis', 'model', 'score', 'ecosystem']
      const sectionHeight = windowHeight * 0.8 // 80% of viewport height per section
      
      const currentSectionIndex = Math.floor(scrollPosition / sectionHeight)
      const clampedIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1))
      
      setActiveSection(sections[clampedIndex])
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  return { activeSection }
}
