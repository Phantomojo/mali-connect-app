import { useState, Suspense, lazy, useEffect } from 'react'
import { 
  Camera, 
  MessageCircle,
  Shield,
  Upload,
  X,
  ArrowLeft,
  Play
} from 'react-feather'
import './App.css'
import useAI from './hooks/useAI'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import ViewToggle from './components/ViewToggle'
import MainNavbar from './components/MainNavbar'
import HerdDashboard from './components/HerdDashboard'
import IntakeDashboard from './components/IntakeDashboard'
import AnimalDetailView from './components/AnimalDetailView'
import Marketplace from './components/Marketplace'
import FunctionalMarketplace from './components/FunctionalMarketplace'
import FinancialServices from './components/FinancialServices'
import EnhancedFinancialServices from './components/EnhancedFinancialServices'
import EcosystemMap from './components/EcosystemMap'
import SimpleEcosystemMap from './components/SimpleEcosystemMap'
import Enhanced3DGlobe from './components/Enhanced3DGlobe'
import OnboardingModal from './components/OnboardingModal'
import DarkModeToggle from './components/DarkModeToggle'
import type { Animal } from './data/herdData'

// Lazy load heavy components
const AdaptiveCattleViewer = lazy(() => import('./components/AdaptiveCattleViewer'))
const CaseSelection = lazy(() => import('./components/CaseSelection'))
const AIAnalysis = lazy(() => import('./components/AIAnalysis'))
const MaliScoreDisplay = lazy(() => import('./components/MaliScoreDisplay'))
const EcosystemPanel = lazy(() => import('./components/EcosystemPanel'))
const ImageSelector = lazy(() => import('./components/ImageSelector'))
const ImageUpload = lazy(() => import('./components/ImageUpload'))
const ImageValidationDashboard = lazy(() => import('./components/ImageValidationDashboard'))
const MarketValueCalc = lazy(() => import('./components/MarketValueCalc'))
const MaliAI = lazy(() => import('./components/MaliAI'))
const MaliChat = lazy(() => import('./components/MaliChat'))
const SmsSimulator = lazy(() => import('./components/SmsSimulator'))
const InteractiveWalkthrough = lazy(() => import('./components/InteractiveWalkthrough'))

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

function AppContent() {
  const { isDarkMode } = useTheme()
  // New dual-view state
  const [viewMode, setViewMode] = useState<'herder' | 'processor'>('herder')
  const [activeSection, setActiveSection] = useState('dashboard')
  
  // Debug logging
  useEffect(() => {
    console.log('Active section changed to:', activeSection)
  }, [activeSection])
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [showDetailView, setShowDetailView] = useState(false)
  const [showChat, setShowChat] = useState(false)
  
  // Navigation drawer state
  const [isNavOpen, setIsNavOpen] = useState(false)
  
  // Enhanced features state
  const [showEnhanced3DGlobe, setShowEnhanced3DGlobe] = useState(false)
  const [selectedMarketHub, setSelectedMarketHub] = useState<any>(null)
  
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false)
  
  // Master demo flow state
  const [demoStep, setDemoStep] = useState<'intro' | 'scan' | 'sms' | null>(null)
  
  // Existing state
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCase, setSelectedCase] = useState<AssessmentCase | null>(null)
  const [showScore, setShowScore] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showValidationDashboard, setShowValidationDashboard] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [marketValue, setMarketValue] = useState(0)
  const [apiStatus, setApiStatus] = useState<{ groq: boolean; huggingFace: boolean } | null>(null)

  // AI Service Hook
  const { 
    analysis: aiAnalysis, 
    marketAnalysis, 
    error: aiError, 
    analyzeImage, 
    getMarketAnalysis, 
    testConnectivity 
  } = useAI()

  // Check for first-time visitor and show onboarding
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedMaliConnect')
    if (!hasVisited) {
      setShowOnboarding(true)
    }
  }, [])

  // Close navigation drawer on escape key and handle globe events
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false)
      }
    }

    const handleShowGlobe = (event: CustomEvent) => {
      if (event.detail.show) {
        setShowEnhanced3DGlobe(true)
      }
    }

    const handleShowMap = (event: CustomEvent) => {
      if (event.detail.show) {
        setActiveSection('ecosystem-map')
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    window.addEventListener('showGlobe', handleShowGlobe as EventListener)
    window.addEventListener('showMap', handleShowMap as EventListener)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('showGlobe', handleShowGlobe as EventListener)
      window.removeEventListener('showMap', handleShowMap as EventListener)
    }
  }, [isNavOpen])

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

  // Dashboard handlers
  const handleAnimalSelect = (animal: Animal) => {
    setSelectedAnimal(animal)
    setShowDetailView(true)
  }

  const handleBackToDashboard = () => {
    setShowDetailView(false)
    setSelectedAnimal(null)
  }

  const handleApproveAnimal = (animalId: string) => {
    console.log('Approving animal:', animalId)
    // TODO: Implement approval logic
  }

  const handleRejectAnimal = (animalId: string) => {
    console.log('Rejecting animal:', animalId)
    // TODO: Implement rejection logic
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            {/* Interactive Walkthrough Button */}
            <button
              onClick={() => setDemoStep('intro')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Play className="w-4 h-4" />
              <span>Interactive Demo</span>
            </button>
          </div>
          <div className="text-center flex-1">
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 bg-clip-text text-transparent mb-4 tracking-tight">
                MALI
                <span className="block text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  CONNECT
                </span>
              </h1>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <p className={`text-2xl md:text-3xl font-semibold transition-colors duration-300 mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Next-Gen Livestock Intelligence
            </p>
            <p className={`text-lg md:text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              AI-Powered • Real-Time Analysis • Market Intelligence
            </p>
            <div className="flex justify-center items-center mt-4 space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Live AI Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>3D Visualization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Market Insights</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <DarkModeToggle />
          </div>
        </div>

        {/* View Toggle */}
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Main Navigation - Slide-out Drawer */}
        <MainNavbar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          isOpen={isNavOpen}
          onToggle={() => setIsNavOpen(!isNavOpen)}
        />


        {/* Main Content Area */}
        <div className="main-content mt-8 pb-8">
          {/* Master Demo Flow */}
          {demoStep === 'intro' && (
            <Suspense fallback={<div className="flex items-center justify-center h-96 text-lg">Loading Interactive Walkthrough...</div>}>
              <InteractiveWalkthrough
                onSelectSmartphone={() => setDemoStep('scan')}
                onSelectSms={() => setDemoStep('sms')}
                onBackToApp={() => setDemoStep(null)}
              />
            </Suspense>
          )}
          
          {demoStep === 'scan' && (
            <div className="space-y-8">
              {/* Back to App Button */}
              <div className="flex justify-start">
                <button
                  onClick={() => setDemoStep(null)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to App</span>
                </button>
              </div>
              
              {/* 3D Demo Content */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <div className="h-[600px] lg:h-[700px]">
                    <Suspense fallback={<div>Loading 3D Viewer...</div>}>
                      <AdaptiveCattleViewer 
                        activeSection="assessment"
                        maliScore={currentMaliScore}
                        isAnalyzing={isAnalyzing}
                      />
                    </Suspense>
                  </div>
                </div>
                <div className="xl:col-span-1 flex flex-col space-y-8">
                  <Suspense fallback={<div>Loading AI Analysis...</div>}>
                    <AIAnalysis 
                      analysis={aiAnalysis} 
                      isLoading={isAnalyzing} 
                      selectedImage={selectedImage}
                      apiStatus={apiStatus}
                    />
                  </Suspense>
                  <Suspense fallback={<div>Loading Score Display...</div>}>
                    <MaliScoreDisplay 
                      maliScore={currentMaliScore} 
                      analysis={aiAnalysis}
                    />
                  </Suspense>
                  
                  {/* Image Selection Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setShowImageSelector(true)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Select from Gallery</span>
                    </button>
                    
                    <button
                      onClick={() => setShowImageUpload(true)}
                      className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload New Image</span>
                    </button>
                    
                    <button
                      onClick={() => setShowValidationDashboard(true)}
                      className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Validate Images</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {demoStep === 'sms' && (
            <div className="space-y-8">
              {/* Back to App Button */}
              <div className="flex justify-start">
                <button
                  onClick={() => setDemoStep(null)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to App</span>
                </button>
              </div>
              
              {/* SMS Simulator */}
              <Suspense fallback={<div className="flex items-center justify-center h-96 text-lg">Loading SMS Simulator...</div>}>
                <SmsSimulator />
              </Suspense>
            </div>
          )}

          {/* Original App Content (when not in demo flow) */}
          {demoStep === null && (
            <>
              {showDetailView && selectedAnimal ? (
                <AnimalDetailView 
                  animal={selectedAnimal}
                  onBack={handleBackToDashboard}
                  viewMode={viewMode}
                />
              ) : (
                <>
                  {activeSection === 'dashboard' && (
                <>
                  {viewMode === 'herder' ? (
                    <HerdDashboard 
                      onAnimalSelect={handleAnimalSelect}
                      selectedAnimal={selectedAnimal}
                    />
                  ) : (
                    <IntakeDashboard 
                      onAnimalSelect={handleAnimalSelect}
                      selectedAnimal={selectedAnimal}
                      onApprove={handleApproveAnimal}
                      onReject={handleRejectAnimal}
                    />
                  )}
                </>
              )}
              
              {activeSection === 'marketplace' && (
                <FunctionalMarketplace viewMode={viewMode} />
              )}
              
              {activeSection === 'financial-services' && (
                <EnhancedFinancialServices 
                  viewMode={viewMode} 
                  selectedAnimal={selectedAnimal}
                />
              )}
              
              {activeSection === 'sms-simulator' && (
                <Suspense fallback={<div className="flex items-center justify-center h-96 text-lg">Loading SMS Simulator...</div>}>
                  <SmsSimulator />
                </Suspense>
              )}
              
              {activeSection === 'ecosystem-map' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Resource Management</h2>
                    <button
                      onClick={() => setShowEnhanced3DGlobe(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <span>🌍</span>
                      <span>View 3D Globe</span>
                    </button>
                  </div>
                  <EcosystemMap onClose={() => setActiveSection('dashboard')} />
                </div>
              )}

              {activeSection === 'assessment' && (
                <div className="space-y-8">
                  <Suspense fallback={<div>Loading Case Selection...</div>}>
                    <CaseSelection onCaseSelect={(caseData) => {
                      console.log('Selected case:', caseData)
                      // Handle case selection logic here
                    }} />
                  </Suspense>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <div className="h-[600px] lg:h-[700px]">
                      <Suspense fallback={<div>Loading 3D Viewer...</div>}>
                        <AdaptiveCattleViewer 
                          activeSection="assessment"
                          maliScore={currentMaliScore}
                          isAnalyzing={isAnalyzing}
                        />
                      </Suspense>
                    </div>
                  </div>
                  <div className="xl:col-span-1 flex flex-col space-y-8">
                    <Suspense fallback={<div>Loading AI Analysis...</div>}>
                      <AIAnalysis 
                        analysis={aiAnalysis} 
                        isLoading={isAnalyzing} 
                        selectedImage={selectedImage}
                        apiStatus={apiStatus}
                      />
                    </Suspense>
                    <Suspense fallback={<div>Loading Score Display...</div>}>
                      <MaliScoreDisplay 
                        maliScore={currentMaliScore} 
                        analysis={aiAnalysis}
                      />
                    </Suspense>
                    
                    {/* Image Selection Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => setShowImageSelector(true)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        <Camera className="w-5 h-5" />
                        <span>Select from Gallery</span>
                      </button>
                      
                      <button
                        onClick={() => setShowImageUpload(true)}
                        className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Upload New Image</span>
                      </button>
                      
                      <button
                        onClick={() => setShowValidationDashboard(true)}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        <Shield className="w-5 h-5" />
                        <span>Validate Images</span>
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              )}
                </>
              )}
            </>
          )}
        </div>

        {/* Floating Chat Button - Desktop Only */}
        <div className="fixed right-6 bottom-6 z-50 hidden lg:block">
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


        {/* AI Chat Modal */}
        <Suspense fallback={null}>
          <MaliChat
            isOpen={showChat}
            onClose={() => setShowChat(false)}
            maliScore={selectedAnimal?.maliScore || currentMaliScore}
            selectedImage={selectedAnimal ? { alt: selectedAnimal.id, description: selectedAnimal.breed } : null}
          />
        </Suspense>

        {/* Image Selector Modal */}
        <Suspense fallback={null}>
          <ImageSelector
            isOpen={showImageSelector}
            onClose={() => setShowImageSelector(false)}
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
          />
        </Suspense>

        {/* Image Upload Modal */}
        <Suspense fallback={null}>
          <ImageUpload
            isOpen={showImageUpload}
            onClose={() => setShowImageUpload(false)}
            onImageUpload={handleImageSelect}
          />
        </Suspense>

        {/* Image Validation Dashboard Modal */}
        <Suspense fallback={null}>
          {showValidationDashboard && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className={`rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className={`flex items-center justify-between p-6 border-b transition-colors duration-300 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>Image Validation Dashboard</h2>
                  <button
                    onClick={() => setShowValidationDashboard(false)}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <ImageValidationDashboard />
                </div>
              </div>
            </div>
          )}
        </Suspense>

        {/* Enhanced 3D Globe Modal */}
        {showEnhanced3DGlobe && (
          <Enhanced3DGlobe
            isGlobeMode={true}
            onToggleMode={() => {}}
            selectedMarket={selectedMarketHub}
            onMarketSelect={setSelectedMarketHub}
            onClose={() => setShowEnhanced3DGlobe(false)}
          />
        )}

        {/* Onboarding Modal */}
        <OnboardingModal 
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />

      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
