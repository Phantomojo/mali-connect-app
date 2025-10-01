import { useState, Suspense, lazy, useEffect } from 'react'
import { 
  Folder, 
  Search, 
  BarChart, 
  Cpu, 
  Globe, 
  Camera, 
  MessageCircle,
  Grid,
  Activity,
  Shield,
  TrendingUp,
  Users
} from 'react-feather'
import './App.css'
import useAI from './hooks/useAI'

// Lazy load heavy components
const AdaptiveCattleViewer = lazy(() => import('./components/AdaptiveCattleViewer'))
const CaseSelection = lazy(() => import('./components/CaseSelection'))
const AIAnalysis = lazy(() => import('./components/AIAnalysis'))
const MaliScoreDisplay = lazy(() => import('./components/MaliScoreDisplay'))
const EcosystemPanel = lazy(() => import('./components/EcosystemPanel'))
const ImageSelector = lazy(() => import('./components/ImageSelector'))
const MarketValueCalc = lazy(() => import('./components/MarketValueCalc'))
const MaliAI = lazy(() => import('./components/MaliAI'))
const MaliChat = lazy(() => import('./components/MaliChat'))

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
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [marketValue, setMarketValue] = useState(0)
  const [apiStatus, setApiStatus] = useState<{ groq: boolean; huggingFace: boolean } | null>(null)
  const [showChat, setShowChat] = useState(false)

  // AI Service Hook
  const { 
    analysis: aiAnalysis, 
    marketAnalysis, 
    error: aiError, 
    analyzeImage, 
    getMarketAnalysis, 
    testConnectivity 
  } = useAI()

  // Test API connectivity on component mount
  useEffect(() => {
    const testAPIs = async () => {
      const status = await testConnectivity()
      setApiStatus(status)
    }
    testAPIs()
  }, [testConnectivity])

  // Use AI analysis if available, otherwise fallback to mock
  const currentMaliScore: MaliScore = aiAnalysis ? {
    bodyCondition: aiAnalysis.bodyCondition,
    physicalHealth: aiAnalysis.physicalHealth,
    conformation: aiAnalysis.conformation,
    ageEstimation: aiAnalysis.ageEstimation,
    totalScore: aiAnalysis.totalScore
  } : {
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

  const handleImageSelect = async (image: any) => {
    setSelectedImage(image)
    setShowImageSelector(false)
    
    // Start real AI analysis if API is available
    if (apiStatus?.groq) {
      setIsAnalyzing(true)
      setActiveSection('analysis')
      
      try {
        await analyzeImage(image.src, image.description)
        setIsAnalyzing(false)
        setActiveSection('score')
        setShowScore(true)
        
        // Get market analysis
        if (aiAnalysis) {
          await getMarketAnalysis(aiAnalysis.totalScore)
        }
      } catch (error) {
        console.error('AI analysis failed:', error)
        setIsAnalyzing(false)
        // Fallback to mock analysis
        setTimeout(() => {
          setActiveSection('score')
          setShowScore(true)
        }, 2000)
      }
    } else {
      // Fallback to mock analysis
      setTimeout(() => {
        setActiveSection('score')
        setShowScore(true)
      }, 2000)
    }
  }

  const handleAnalysisComplete = (results: any) => {
    console.log('Analysis completed:', results)
    // Handle analysis completion
  }

  const handleMarketValueCalculated = (value: number) => {
    setMarketValue(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:ml-20 pb-20 md:pb-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Mali-Connect</h1>
          <p className="text-xl text-gray-600 mb-8">AI-Powered Livestock Assessment</p>
        </div>

        {/* Selected Image Display */}
        {selectedImage && (
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl px-6 py-4 shadow-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Selected: {selectedImage.alt}</p>
                  <p className="text-xs text-gray-600">Expected Score: {selectedImage.expectedScore}/100</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
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

        {/* Unified Assessment Section - Analysis, Score, and AI combined */}
        {(activeSection === 'analysis' || activeSection === 'score' || activeSection === 'mali-ai') && (
          <Suspense fallback={
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading analysis...</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center h-96 md:h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading 3D viewer...</p>
              </div>
            </div>
          }>
            <div className="space-y-6">
              {/* Mobile-First Layout - Portrait Optimized */}
              <div className="block md:hidden space-y-6">
                {/* 3D Model - Full Width, Taller on Mobile */}
                <div className="w-full">
                  <div className="card h-80">
                    <AdaptiveCattleViewer 
                      activeSection={activeSection}
                      maliScore={currentMaliScore}
                      isAnalyzing={isAnalyzing}
                    />
                  </div>
                </div>
                
                {/* Assessment Components - Stacked on Mobile */}
                <div className="space-y-4">
                  {/* AI Analysis (only show if analyzing) */}
                  {isAnalyzing && (
                    <AIAnalysis 
                      isAnalyzing={isAnalyzing} 
                      onAnalysisComplete={handleAnalysisComplete}
                    />
                  )}
                  
                  {/* Mali Score Display */}
                  <MaliScoreDisplay maliScore={currentMaliScore} />
                  
                  {/* Market Value Calculator */}
                  <MarketValueCalc 
                    maliScore={currentMaliScore.totalScore}
                    selectedImage={selectedImage}
                    onValueCalculated={handleMarketValueCalculated}
                    marketAnalysis={marketAnalysis}
                  />
                  
                  {/* Mali AI Assistant */}
                  <Suspense fallback={
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading Mali AI...</p>
                    </div>
                  }>
                    <MaliAI 
                      maliScore={currentMaliScore}
                      selectedImage={selectedImage}
                      onAIAction={(action, data) => {
                        console.log('Mali AI Action:', action, data)
                      }}
                    />
                  </Suspense>
                  
                  {/* Selected Case/Image Info */}
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
                  
                  {selectedImage && (
                    <div className="card">
                      <h3 className="text-xl font-bold text-mali-dark mb-4">Selected Image</h3>
                      <div className="space-y-2">
                        <p className="font-medium">{selectedImage.alt}</p>
                        <p className="text-sm text-mali-gray">{selectedImage.description}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-mali-green">Expected Score: {selectedImage.expectedScore}</span>
                          <span className="text-mali-blue">{selectedImage.category}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Layout - Optimized for Large Screens */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {/* Left Column - Assessment Components */}
                <div className="space-y-6">
                  {/* AI Analysis (only show if analyzing) */}
                  {isAnalyzing && (
                    <AIAnalysis 
                      isAnalyzing={isAnalyzing} 
                      onAnalysisComplete={handleAnalysisComplete}
                    />
                  )}
                  
                  {/* Mali Score Display */}
                  <MaliScoreDisplay maliScore={currentMaliScore} />
                  
                  {/* Market Value Calculator */}
                  <MarketValueCalc 
                    maliScore={currentMaliScore.totalScore}
                    selectedImage={selectedImage}
                    onValueCalculated={handleMarketValueCalculated}
                    marketAnalysis={marketAnalysis}
                  />
                  
                  {/* Selected Case/Image Info */}
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
                  
                  {selectedImage && (
                    <div className="card">
                      <h3 className="text-xl font-bold text-mali-dark mb-4">Selected Image</h3>
                      <div className="space-y-2">
                        <p className="font-medium">{selectedImage.alt}</p>
                        <p className="text-sm text-mali-gray">{selectedImage.description}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-mali-green">Expected Score: {selectedImage.expectedScore}</span>
                          <span className="text-mali-blue">{selectedImage.category}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Center Column - Large 3D Viewer */}
                <div className="col-span-2">
                  <div className="card h-[600px]">
                    <AdaptiveCattleViewer 
                      activeSection={activeSection}
                      maliScore={currentMaliScore}
                      isAnalyzing={isAnalyzing}
                    />
                  </div>
                </div>
              </div>

              {/* Mali AI Assistant - Full Width on Desktop */}
              <div className="hidden md:block">
                <Suspense fallback={
                  <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Mali AI...</p>
                  </div>
                }>
                  <MaliAI 
                    maliScore={currentMaliScore}
                    selectedImage={selectedImage}
                    onAIAction={(action, data) => {
                      console.log('Mali AI Action:', action, data)
                    }}
                  />
                </Suspense>
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
            <EcosystemPanel maliScore={currentMaliScore} />
          </Suspense>
        )}

        {/* Side Navigation Bar */}
        <div className="fixed left-0 top-0 h-full w-20 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 z-50 hidden md:block">
          <div className="flex flex-col h-full">
            {/* Logo/Brand */}
            <div className="p-4 border-b border-gray-200/50">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-4 space-y-2">
              {[
                { id: 'case-selection', icon: Folder, label: 'Cases', color: 'from-green-400 to-emerald-500' },
                { id: 'analysis', icon: BarChart, label: 'Assessment', color: 'from-blue-400 to-cyan-500' },
                { id: 'ecosystem', icon: Globe, label: 'Ecosystem', color: 'from-teal-400 to-blue-500' },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (item.id === 'score') setShowScore(true);
                    }}
                    className={`w-full p-3 rounded-xl transition-all duration-300 group relative ${
                      activeSection === item.id
                        ? 'bg-gradient-to-br ' + item.color + ' text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
                    }`}
                    title={item.label}
                  >
                    <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                    
                    {/* Tooltip */}
                    <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200/50 space-y-2">
              {/* Image Selector */}
              <button
                onClick={() => setShowImageSelector(true)}
                className="w-full p-3 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relative"
                title="Select Image"
              >
                <Camera className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Select Image
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200/50 z-50 md:hidden">
          <div className="flex justify-around py-2">
            {[
              { id: 'case-selection', icon: Folder, label: 'Cases' },
              { id: 'analysis', icon: BarChart, label: 'Assessment' },
              { id: 'ecosystem', icon: Globe, label: 'Ecosystem' },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (item.id === 'score') setShowScore(true);
                  }}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mb-1" />
                  <div className="text-xs font-medium">{item.label}</div>
                </button>
              );
            })}
            
            {/* Mobile Image Selector Button */}
            <button
              onClick={() => setShowImageSelector(true)}
              className="flex flex-col items-center p-2 rounded-lg transition-all duration-300 text-gray-600 hover:bg-gray-100"
            >
              <Camera className="w-5 h-5 mb-1" />
              <div className="text-xs font-medium">Images</div>
            </button>
          </div>
        </div>

        {/* Floating Chat Button */}
        <div className="fixed right-6 bottom-24 md:bottom-6 z-50">
          <button
            onClick={() => setShowChat(true)}
            className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative"
          >
            <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
            
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20"></div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Chat with Mali AI
            </div>
          </button>
        </div>

        {/* Subtle API Status Indicator */}
        {apiStatus && (
          <div className="fixed top-4 right-4 z-40">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200/50">
              <div className="flex items-center space-x-3 text-xs">
                <div className={`flex items-center space-x-1 ${apiStatus.groq ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${apiStatus.groq ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-medium">Groq</span>
                </div>
                <div className={`flex items-center space-x-1 ${apiStatus.huggingFace ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${apiStatus.huggingFace ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-medium">HF</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Selector Modal */}
      {showImageSelector && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading image selector...</p>
              </div>
            </div>
          </div>
        }>
          <ImageSelector
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onClose={() => setShowImageSelector(false)}
          />
        </Suspense>
      )}

      {/* Mali AI Chat Modal */}
      <Suspense fallback={null}>
        <MaliChat
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          maliScore={currentMaliScore}
          selectedImage={selectedImage}
        />
      </Suspense>
    </div>
  )
}

export default App
