import { useState, Suspense, lazy } from 'react'
import './App.css'

// Lazy load heavy components
const AdaptiveCattleViewer = lazy(() => import('./components/AdaptiveCattleViewer'))
const CaseSelection = lazy(() => import('./components/CaseSelection'))
const AIAnalysis = lazy(() => import('./components/AIAnalysis'))
const MaliScoreDisplay = lazy(() => import('./components/MaliScoreDisplay'))
const EcosystemPanel = lazy(() => import('./components/EcosystemPanel'))

interface AssessmentCase {
  id: string
  name: string
  description: string
  images: string[]
  expectedScore: number
  healthIssues: string[]
  marketValue: number
}

interface MaliScore {
  bodyCondition: number
  physicalHealth: number
  conformation: number
  ageEstimation: number
  totalScore: number
}

function App() {
  const [activeSection, setActiveSection] = useState('case-selection')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCase, setSelectedCase] = useState<AssessmentCase | null>(null)
  const [showScore, setShowScore] = useState(false)

  // Mock Mali-Score for testing
  const mockMaliScore: MaliScore = {
    bodyCondition: 85,
    physicalHealth: 78,
    conformation: 92,
    ageEstimation: 88,
    totalScore: 85
  }

  const handleCaseSelect = (caseData: AssessmentCase) => {
    setSelectedCase(caseData)
    setActiveSection('analysis')
    setIsAnalyzing(true)
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setActiveSection('score')
      setShowScore(true)
    }, 3000)
  }

  const handleStartAnalysis = () => {
    if (selectedCase) {
      setIsAnalyzing(true)
      setActiveSection('analysis')
      
      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false)
        setActiveSection('score')
        setShowScore(true)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Mali-Connect</h1>
          <p className="text-mali-gray text-lg">AI-Powered Livestock Assessment</p>
        </div>
        
        {/* Case Selection Section */}
        {activeSection === 'case-selection' && (
          <Suspense fallback={
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading case selection...</p>
            </div>
          }>
            <CaseSelection onCaseSelect={handleCaseSelect} />
          </Suspense>
        )}

        {/* Analysis Section */}
        {activeSection === 'analysis' && (
          <Suspense fallback={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading analysis...</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading 3D viewer...</p>
              </div>
            </div>
          }>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <AIAnalysis isAnalyzing={isAnalyzing} />
                {selectedCase && (
                  <div className="card">
                    <h3 className="text-xl font-bold text-mali-dark mb-4">Selected Case</h3>
                    <div className="space-y-2">
                      <p className="font-medium">{selectedCase.name}</p>
                      <p className="text-sm text-mali-gray">{selectedCase.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-mali-green">Expected Score: {selectedCase.expectedScore}</span>
                        <span className="text-mali-blue">${selectedCase.marketValue}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="card h-96 lg:h-full">
                <AdaptiveCattleViewer 
                  activeSection={activeSection}
                  maliScore={mockMaliScore}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </div>
          </Suspense>
        )}

        {/* Score Display Section */}
        {activeSection === 'score' && showScore && (
          <Suspense fallback={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading score display...</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading 3D viewer...</p>
              </div>
            </div>
          }>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MaliScoreDisplay maliScore={mockMaliScore} />
              <div className="card h-96 lg:h-full">
                <AdaptiveCattleViewer 
                  activeSection={activeSection}
                  maliScore={mockMaliScore}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </div>
          </Suspense>
        )}

        {/* Ecosystem Section */}
        {activeSection === 'ecosystem' && (
          <Suspense fallback={
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading ecosystem panel...</p>
            </div>
          }>
            <EcosystemPanel maliScore={mockMaliScore} />
          </Suspense>
        )}

        {/* Enhanced Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex space-x-2 bg-white/90 backdrop-blur-sm rounded-full shadow-xl p-2 border border-gray-200">
            {['case-selection', 'analysis', 'score', 'ecosystem'].map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section)
                  if (section === 'score') setShowScore(true)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105'
                    : 'text-mali-gray hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-50 hover:text-blue-600'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
