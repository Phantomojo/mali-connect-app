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
  Users,
  ShoppingCart,
  CreditCard,
  Upload,
  X
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
import FinancialServices from './components/FinancialServices'
import EcosystemMap from './components/EcosystemMap'
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
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [showDetailView, setShowDetailView] = useState(false)
  const [showChat, setShowChat] = useState(false)
  
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
      <div className="w-full max-w-7xl mx-auto px-4 py-8 pb-20 md:pb-8 flex-1">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Mali-Connect</h1>
            <p className={`text-xl transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>AI-Powered Livestock Assessment</p>
          </div>
          <div className="flex-1 flex justify-end">
            <DarkModeToggle />
          </div>
        </div>

        {/* View Toggle */}
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Main Navigation - Desktop (Right Side) */}
        <MainNavbar activeSection={activeSection} onSectionChange={setActiveSection} />


        {/* Main Content Area */}
        <div className="main-content mt-8 pb-20 lg:pb-8">
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
                <Marketplace viewMode={viewMode} />
              )}
              
              {activeSection === 'financial-services' && (
                <FinancialServices 
                  viewMode={viewMode} 
                  selectedAnimal={selectedAnimal}
                />
              )}
              
              {activeSection === 'ecosystem-map' && (
                <EcosystemMap onClose={() => setActiveSection('dashboard')} />
              )}

              {activeSection === 'assessment' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="lg:col-span-1">
                    <Suspense fallback={<div>Loading 3D Viewer...</div>}>
                      <AdaptiveCattleViewer 
                        activeSection="assessment"
                        maliScore={currentMaliScore}
                        isAnalyzing={isAnalyzing}
                      />
                    </Suspense>
                  </div>
                  <div className="lg:col-span-1 flex flex-col space-y-8">
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

        {/* Mobile Chat Button - Integrated into bottom nav */}
        <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl shadow-2xl border-t z-50 lg:hidden transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-900/95 border-gray-700/50' 
            : 'bg-white/95 border-gray-200/50'
        }`}>
          <div className="flex justify-around py-2">
            {[
              { id: 'dashboard', icon: BarChart, label: 'Dashboard' },
              { id: 'assessment', icon: Activity, label: 'Assessment' },
              { id: 'marketplace', icon: ShoppingCart, label: 'Marketplace' },
              { id: 'financial-services', icon: CreditCard, label: 'Financial' },
              { id: 'ecosystem-map', icon: Globe, label: 'Map' },
              { id: 'chat', icon: MessageCircle, label: 'Chat', isSpecial: true },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => item.id === 'chat' ? setShowChat(true) : setActiveSection(item.id)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                    item.isSpecial
                      ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg'
                      : activeSection === item.id
                      ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-lg'
                      : isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-800' 
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mb-1" />
                  <div className="text-xs font-medium">{item.label}</div>
                </button>
              );
            })}
          </div>
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
              <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Image Validation Dashboard</h2>
                  <button
                    onClick={() => setShowValidationDashboard(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
