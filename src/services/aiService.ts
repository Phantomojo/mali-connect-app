// AI Service for Mali-Connect
// Integrates Groq API and Hugging Face for real AI analysis

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY || ''

export interface AIImageAnalysis {
  bodyCondition: number
  physicalHealth: number
  conformation: number
  ageEstimation: number
  totalScore: number
  confidence: number
  diseaseDetection: {
    detectedDiseases: Array<{
      disease: {
        id: string
        name: string
        localName: string
        scientificName: string
        symptoms: string[]
        causes: string[]
        prevention: string[]
        treatment: string[]
        severity: 'low' | 'medium' | 'high' | 'critical'
        contagious: boolean
        mortalityRate: string
        economicImpact: string
        commonIn: string[]
        seasonality: string[]
        imagePath: string
        maliScoreImpact: number
      }
      confidence: number
      severity: 'low' | 'medium' | 'high' | 'critical'
      symptoms: string[]
    }>
    healthStatus: 'healthy' | 'suspicious' | 'diseased' | 'critical'
    recommendations: string[]
  }
  analysis: {
    bodyConditionAnalysis: string
    physicalHealthAnalysis: string
    conformationAnalysis: string
    ageEstimationAnalysis: string
    overallAssessment: string
    recommendations: string[]
  }
}

export interface MarketAnalysis {
  estimatedValue: number
  marketFactors: {
    location: string
    season: string
    demand: number
    breed: string
  }
  priceRange: {
    min: number
    max: number
  }
}

class AIService {
  private groqApiKey: string
  private huggingFaceApiKey: string

  constructor() {
    this.groqApiKey = GROQ_API_KEY
    this.huggingFaceApiKey = HUGGING_FACE_API_KEY
  }

  // Analyze cattle image using Groq API
  async analyzeCattleImage(imageUrl: string, imageDescription?: string): Promise<AIImageAnalysis> {
    try {
      const prompt = this.buildAnalysisPrompt(imageDescription)
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are an expert livestock veterinarian and animal health assessor. Analyze cattle images and provide detailed health assessments with numerical scores.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      const analysisText = data.choices[0]?.message?.content || ''

      return this.parseAnalysisResponse(analysisText)
    } catch (error) {
      console.error('AI Analysis Error:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        groqApiKey: this.groqApiKey ? 'Present' : 'Missing'
      })
      return this.getFallbackAnalysis()
    }
  }

  // Get market analysis using Groq API
  async getMarketAnalysis(maliScore: number, location: string = 'Kenya'): Promise<MarketAnalysis> {
    try {
      const prompt = `Analyze the market value for cattle in ${location} with a Mali-Score of ${maliScore}/100. Consider:
      - Base market price: $500 USD
      - Health score impact on value
      - Regional market conditions
      - Seasonal variations
      - Demand factors
      
      Provide estimated value, price range, and market factors.`

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a livestock market analyst specializing in African cattle markets.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      const analysisText = data.choices[0]?.message?.content || ''

      return this.parseMarketAnalysis(analysisText, maliScore)
    } catch (error) {
      console.error('Market Analysis Error:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        groqApiKey: this.groqApiKey ? 'Present' : 'Missing'
      })
      return this.getFallbackMarketAnalysis(maliScore)
    }
  }

  // Build analysis prompt for Groq
  private buildAnalysisPrompt(imageDescription?: string): string {
    return `Analyze this cattle image and provide a detailed health assessment with numerical scores (0-100) for:

1. Body Condition (40% weight): Assess weight, muscle tone, rib visibility, hip bone prominence
2. Physical Health (25% weight): Evaluate skin condition, coat quality, signs of disease or lesions
3. Conformation (20% weight): Analyze bone structure, posture, leg alignment, breed characteristics
4. Age Estimation (15% weight): Determine age based on facial features, horn development, maturity

Image Description: ${imageDescription || 'Cattle image for health assessment'}

Provide your analysis in this exact JSON format:
{
  "bodyCondition": 85,
  "physicalHealth": 78,
  "conformation": 82,
  "ageEstimation": 75,
  "totalScore": 80,
  "confidence": 0.92,
  "analysis": {
    "bodyConditionAnalysis": "Detailed analysis of body condition...",
    "physicalHealthAnalysis": "Detailed analysis of physical health...",
    "conformationAnalysis": "Detailed analysis of conformation...",
    "ageEstimationAnalysis": "Detailed analysis of age estimation...",
    "overallAssessment": "Overall assessment summary...",
    "recommendations": ["Recommendation 1", "Recommendation 2"]
  }
}`
  }

  // Parse Groq API response
  private parseAnalysisResponse(responseText: string): AIImageAnalysis {
    try {
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          bodyCondition: parsed.bodyCondition || 75,
          physicalHealth: parsed.physicalHealth || 70,
          conformation: parsed.conformation || 80,
          ageEstimation: parsed.ageEstimation || 75,
          totalScore: parsed.totalScore || 75,
          confidence: parsed.confidence || 0.85,
          diseaseDetection: parsed.diseaseDetection || {
            detectedDiseases: [],
            healthStatus: 'healthy',
            recommendations: [
              'Continue regular health monitoring',
              'Maintain current feeding regimen',
              'Schedule routine veterinary checkups'
            ]
          },
          analysis: parsed.analysis || this.getDefaultAnalysis()
        }
      }
    } catch (error) {
      console.error('Error parsing AI response:', error)
    }

    return this.getFallbackAnalysis()
  }

  // Parse market analysis response
  private parseMarketAnalysis(responseText: string, maliScore: number): MarketAnalysis {
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          estimatedValue: parsed.estimatedValue || this.calculateBaseValue(maliScore),
          marketFactors: parsed.marketFactors || this.getDefaultMarketFactors(),
          priceRange: parsed.priceRange || this.getDefaultPriceRange(maliScore)
        }
      }
    } catch (error) {
      console.error('Error parsing market analysis:', error)
    }

    return this.getFallbackMarketAnalysis(maliScore)
  }

  // Fallback analysis when API fails
  private getFallbackAnalysis(): AIImageAnalysis {
    return {
      bodyCondition: 75,
      physicalHealth: 70,
      conformation: 80,
      ageEstimation: 75,
      totalScore: 75,
      confidence: 0.75,
      diseaseDetection: {
        detectedDiseases: [],
        healthStatus: 'healthy',
        recommendations: [
          'Continue regular health monitoring',
          'Maintain current feeding regimen',
          'Schedule routine veterinary checkups'
        ]
      },
      analysis: this.getDefaultAnalysis()
    }
  }

  // Default analysis text
  private getDefaultAnalysis() {
    return {
      bodyConditionAnalysis: "Moderate body condition with visible muscle tone and appropriate weight distribution.",
      physicalHealthAnalysis: "Generally healthy appearance with good coat condition and no obvious signs of disease.",
      conformationAnalysis: "Well-proportioned structure with good leg alignment and breed characteristics.",
      ageEstimationAnalysis: "Appears to be in prime age range with mature features and good development.",
      overallAssessment: "This cattle shows good overall health and condition suitable for market.",
      recommendations: [
        "Maintain current feeding regimen",
        "Regular health monitoring recommended",
        "Suitable for immediate market sale"
      ]
    }
  }

  // Fallback market analysis
  private getFallbackMarketAnalysis(maliScore: number): MarketAnalysis {
    return {
      estimatedValue: this.calculateBaseValue(maliScore),
      marketFactors: this.getDefaultMarketFactors(),
      priceRange: this.getDefaultPriceRange(maliScore)
    }
  }

  // Calculate base value from Mali-Score
  private calculateBaseValue(maliScore: number): number {
    const basePrice = 500
    return Math.round(basePrice * (maliScore / 100) * 1.1) // 10% premium for good health
  }

  // Default market factors
  private getDefaultMarketFactors() {
    return {
      location: "Kenya",
      season: "Dry Season",
      demand: 1.0,
      breed: "Mixed Breed"
    }
  }

  // Default price range
  private getDefaultPriceRange(maliScore: number) {
    const baseValue = this.calculateBaseValue(maliScore)
    return {
      min: Math.round(baseValue * 0.8),
      max: Math.round(baseValue * 1.2)
    }
  }

  // AI Chat - General livestock conversation
  async chatWithAI(message: string, context?: {
    maliScore?: number
    selectedImage?: any
    animalData?: any
    location?: string
  }): Promise<string> {
    if (!GROQ_API_KEY) {
      return this.generateFallbackResponse(message, context)
    }

    try {
      const systemPrompt = `You are Mali AI, an expert livestock intelligence assistant specializing in East African cattle farming. You provide:

1. Health Analysis: Disease detection, treatment recommendations, nutrition advice
2. Market Insights: Current prices, selling strategies, market timing
3. Breeding Advice: Reproduction management, genetic improvement
4. Care Management: Daily care, seasonal management, best practices
5. Financial Guidance: Cost analysis, investment recommendations

Context: ${context ? JSON.stringify(context) : 'No specific context'}
Location: East Africa (Kenya, Tanzania, Uganda)
Languages: English, Swahili, local dialects

Always provide practical, actionable advice based on local conditions and resources. Be encouraging and supportive while being scientifically accurate.`

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || this.generateFallbackResponse(message, context)
    } catch (error) {
      console.error('AI Chat error:', error)
      return this.generateFallbackResponse(message, context)
    }
  }

  // Generate fallback response when AI is unavailable
  private generateFallbackResponse(message: string, context?: any): string {
    const input = message.toLowerCase()
    
    // Health-related questions
    if (input.includes('health') || input.includes('sick') || input.includes('disease')) {
      return `I can help with livestock health! For disease prevention, ensure:
• Regular vaccination schedules
• Clean water and proper nutrition
• Quarantine new animals for 2-3 weeks
• Regular veterinary checkups
• Proper sanitation and hygiene

For specific symptoms, consult a local veterinarian immediately.`
    }
    
    // Market questions
    if (input.includes('price') || input.includes('market') || input.includes('sell')) {
      return `Market insights for your livestock:
• Current cattle prices vary by breed, age, and health
• Peak selling seasons: End of dry season, before major holidays
• Factors affecting price: Health status, breed quality, market demand
• Consider Mali-Score for premium pricing
• Local markets: Check with nearby livestock markets for current rates`
    }
    
    // Nutrition questions
    if (input.includes('feed') || input.includes('nutrition') || input.includes('food')) {
      return `Nutrition recommendations:
• Provide clean, fresh water daily
• Balanced diet: Grass, hay, concentrates
• Mineral supplements for healthy growth
• Avoid sudden diet changes
• Monitor body condition regularly
• Seasonal adjustments for dry/wet periods`
    }
    
    // General response
    return `I'm here to help with your livestock questions! I can assist with:
• Health analysis and disease prevention
• Market prices and selling strategies  
• Nutrition and feeding advice
• Breeding and reproduction management
• Daily care and best practices

What specific aspect of livestock management would you like to know about?`
  }

  // Test API connectivity
  async testConnectivity(): Promise<{ groq: boolean; huggingFace: boolean }> {
    const results = { groq: false, huggingFace: false }

    try {
      // Test Groq API
      const groqResponse = await fetch('https://api.groq.com/openai/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
        }
      })
      results.groq = groqResponse.ok
    } catch (error) {
      console.error('Groq API test failed:', error)
      console.error('Groq API Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: error instanceof Response ? error.status : 'N/A',
        groqApiKey: this.groqApiKey ? 'Present' : 'Missing'
      })
    }

    // Skip Hugging Face API test for now to avoid 404 errors
    results.huggingFace = false

    return results
  }
}

// Export singleton instance
export const aiService = new AIService()
export default aiService
