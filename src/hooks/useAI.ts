import { useState, useCallback } from 'react'
import aiService, { type AIImageAnalysis, type MarketAnalysis } from '../services/aiService'

interface UseAIResult {
  isAnalyzing: boolean
  analysis: AIImageAnalysis | null
  marketAnalysis: MarketAnalysis | null
  error: string | null
  analyzeImage: (imageUrl: string, description?: string) => Promise<void>
  getMarketAnalysis: (maliScore: number, location?: string) => Promise<void>
  testConnectivity: () => Promise<{ groq: boolean; huggingFace: boolean }>
  clearError: () => void
}

export const useAI = (): UseAIResult => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AIImageAnalysis | null>(null)
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeImage = useCallback(async (imageUrl: string, description?: string) => {
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const result = await aiService.analyzeCattleImage(imageUrl, description)
      setAnalysis(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
      console.error('Image analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const getMarketAnalysis = useCallback(async (maliScore: number, location?: string) => {
    setError(null)
    
    try {
      const result = await aiService.getMarketAnalysis(maliScore, location)
      setMarketAnalysis(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Market analysis failed')
      console.error('Market analysis error:', err)
    }
  }, [])

  const testConnectivity = useCallback(async () => {
    try {
      return await aiService.testConnectivity()
    } catch (err) {
      console.error('Connectivity test error:', err)
      return { groq: false, huggingFace: false }
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isAnalyzing,
    analysis,
    marketAnalysis,
    error,
    analyzeImage,
    getMarketAnalysis,
    testConnectivity,
    clearError
  }
}

export default useAI
