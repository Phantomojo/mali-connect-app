export interface MaliScore {
  bodyCondition: number    // 40% weight - ribs/bones visibility
  physicalHealth: number   // 25% weight - skin/coat condition
  conformation: number     // 20% weight - structural soundness
  ageEstimation: number    // 15% weight - facial/dental features
  totalScore: number       // Weighted composite score
}

export interface AssessmentCase {
  id: string
  name: string
  description: string
  images: string[]
  expectedScore: number
  healthIssues: string[]
  marketValue: number
}

export interface DiagnosticMarker {
  id: string
  position: [number, number, number]
  type: 'body-condition' | 'physical-health' | 'conformation' | 'age'
  severity: 'excellent' | 'good' | 'fair' | 'poor'
  description: string
}

export interface EcosystemFeature {
  id: string
  title: string
  description: string
  icon: string
  action: string
  value: number
  enabled: boolean
}

export type ScrollSection = 'case-selection' | 'analysis' | 'model' | 'score' | 'ecosystem'
