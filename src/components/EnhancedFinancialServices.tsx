import React, { useState, useEffect } from 'react'
import { 
  CreditCard, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Percent,
  Award,
  Lock,
  Smartphone,
  Home,
  PieChart,
  BarChart,
  ArrowRight,
  X,
  Upload,
  Eye,
  Download
} from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface LoanApplication {
  id: string
  applicantName: string
  phoneNumber: string
  location: string
  loanAmount: number
  loanPurpose: string
  collateralValue: number
  maliScore: number
  creditScore: number
  monthlyIncome: number
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected'
  interestRate: number
  loanTerm: number
  monthlyPayment: number
  dateApplied: string
  documents: string[]
}

interface InsurancePolicy {
  id: string
  policyholderName: string
  phoneNumber: string
  location: string
  livestockCount: number
  totalValue: number
  averageMaliScore: number
  coverageType: 'basic' | 'comprehensive' | 'premium'
  premiumAmount: number
  coverageAmount: number
  deductible: number
  status: 'active' | 'pending' | 'expired' | 'claimed'
  startDate: string
  endDate: string
  riskAssessment: 'low' | 'medium' | 'high'
}

interface FinancialProduct {
  id: string
  type: 'loan' | 'insurance' | 'savings' | 'investment'
  name: string
  description: string
  provider: string
  minAmount: number
  maxAmount: number
  interestRate?: number
  premiumRate?: number
  features: string[]
  requirements: string[]
  processingTime: string
  eligibility: {
    minMaliScore: number
    minIncome: number
    maxAge: number
    verificationRequired: boolean
  }
}

// Mock financial products data
const FINANCIAL_PRODUCTS: FinancialProduct[] = [
  {
    id: 'livestock-loan-1',
    type: 'loan',
    name: 'Mali-Score Livestock Loan',
    description: 'Quick loans based on your livestock Mali-Score. No traditional collateral required.',
    provider: 'Kenya Commercial Bank',
    minAmount: 100,
    maxAmount: 5000,
    interestRate: 12,
    features: [
      'Mali-Score based approval',
      'No traditional collateral',
      'Quick 48-hour processing',
      'Flexible repayment terms',
      'Mobile money integration'
    ],
    requirements: [
      'Mali-Score ≥ 60',
      'Valid ID',
      'Phone number verification',
      'Livestock ownership proof'
    ],
    processingTime: '48 hours',
    eligibility: {
      minMaliScore: 60,
      minIncome: 200,
      maxAge: 65,
      verificationRequired: true
    }
  },
  {
    id: 'livestock-insurance-1',
    type: 'insurance',
    name: 'Comprehensive Livestock Insurance',
    description: 'Protect your livestock investment against disease, theft, and natural disasters.',
    provider: 'APA Insurance',
    minAmount: 500,
    maxAmount: 50000,
    premiumRate: 8,
    features: [
      'Disease coverage',
      'Theft protection',
      'Natural disaster coverage',
      'Veterinary expenses',
      'Quick claim processing'
    ],
    requirements: [
      'Mali-Score ≥ 70',
      'Health certificates',
      'Vaccination records',
      'Location verification'
    ],
    processingTime: '24 hours',
    eligibility: {
      minMaliScore: 70,
      minIncome: 300,
      maxAge: 70,
      verificationRequired: true
    }
  },
  {
    id: 'savings-account-1',
    type: 'savings',
    name: 'Livestock Savings Account',
    description: 'High-yield savings account designed for livestock farmers with seasonal income.',
    provider: 'Equity Bank',
    minAmount: 50,
    maxAmount: 100000,
    interestRate: 6,
    features: [
      '6% annual interest',
      'No monthly fees',
      'Mobile banking',
      'Seasonal deposit flexibility',
      'Goal-based savings'
    ],
    requirements: [
      'Valid ID',
      'Phone number',
      'Minimum deposit $50'
    ],
    processingTime: '1 hour',
    eligibility: {
      minMaliScore: 0,
      minIncome: 100,
      maxAge: 80,
      verificationRequired: false
    }
  }
]

interface EnhancedFinancialServicesProps {
  viewMode: 'herder' | 'processor'
  selectedAnimal?: any
}

const EnhancedFinancialServices: React.FC<EnhancedFinancialServicesProps> = ({ 
  viewMode, 
  selectedAnimal 
}) => {
  const { isDarkMode } = useTheme()
  const [activeTab, setActiveTab] = useState<'products' | 'apply' | 'status'>('products')
  const [selectedProduct, setSelectedProduct] = useState<FinancialProduct | null>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [applications, setApplications] = useState<LoanApplication[]>([])
  const [policies, setPolicies] = useState<InsurancePolicy[]>([])
  
  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    applicantName: '',
    phoneNumber: '',
    location: '',
    loanAmount: 0,
    loanPurpose: '',
    monthlyIncome: 0,
    collateralValue: selectedAnimal?.marketValue || 0,
    maliScore: selectedAnimal?.maliScore?.totalScore || 75
  })

  // Calculate loan eligibility
  const calculateLoanEligibility = (maliScore: number, income: number, requestedAmount: number) => {
    const baseAmount = maliScore * 50 // Base calculation
    const incomeMultiplier = Math.min(income / 500, 2) // Cap at 2x
    const maxEligible = Math.floor(baseAmount * incomeMultiplier)
    
    return {
      eligible: requestedAmount <= maxEligible && maliScore >= 60,
      maxAmount: maxEligible,
      interestRate: maliScore >= 80 ? 10 : maliScore >= 70 ? 12 : 15,
      riskLevel: maliScore >= 80 ? 'low' : maliScore >= 70 ? 'medium' : 'high'
    }
  }

  // Calculate insurance premium
  const calculateInsurancePremium = (livestockValue: number, maliScore: number, coverageType: string) => {
    let baseRate = 0.08 // 8% base rate
    
    // Adjust based on Mali-Score
    if (maliScore >= 80) baseRate *= 0.8 // 20% discount
    else if (maliScore >= 70) baseRate *= 0.9 // 10% discount
    else if (maliScore < 60) baseRate *= 1.2 // 20% penalty
    
    // Adjust based on coverage type
    const coverageMultiplier = {
      'basic': 0.7,
      'comprehensive': 1.0,
      'premium': 1.3
    }[coverageType] || 1.0
    
    return Math.floor(livestockValue * baseRate * coverageMultiplier)
  }

  const handleApplicationSubmit = () => {
    const newApplication: LoanApplication = {
      id: `app-${Date.now()}`,
      ...applicationForm,
      status: 'submitted',
      creditScore: 650 + (applicationForm.maliScore - 50) * 2, // Simulated credit score
      interestRate: calculateLoanEligibility(applicationForm.maliScore, applicationForm.monthlyIncome, applicationForm.loanAmount).interestRate,
      loanTerm: 12, // Default 12 months
      monthlyPayment: Math.floor(applicationForm.loanAmount * 1.12 / 12), // Simplified calculation
      dateApplied: new Date().toISOString(),
      documents: ['ID Copy', 'Livestock Photos', 'Mali-Score Certificate']
    }
    
    setApplications(prev => [...prev, newApplication])
    setShowApplicationModal(false)
    setActiveTab('status')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'active': return 'text-green-500'
      case 'under-review': case 'pending': return 'text-yellow-500'
      case 'rejected': case 'expired': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': case 'active': return 'bg-green-100 text-green-800'
      case 'under-review': case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      
      {/* Header */}
      <div className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2">
                <CreditCard className="w-6 h-6 text-green-500" />
                <span>Financial Services</span>
              </h1>
              <p className="text-sm opacity-70 mt-1">
                Loans, insurance, and savings powered by Mali-Score
              </p>
            </div>
            
            {selectedAnimal && (
              <div className={`rounded-lg p-3 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-sm opacity-70">Selected Animal Mali-Score</div>
                <div className="text-2xl font-bold text-green-500">
                  {selectedAnimal.maliScore?.totalScore || 75}
                </div>
              </div>
            )}
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-6 mt-4">
            {[
              { id: 'products', label: 'Products', icon: Home },
              { id: 'apply', label: 'Apply', icon: FileText },
              { id: 'status', label: 'My Applications', icon: BarChart }
            ].map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm opacity-70">Available Credit</div>
                    <div className="text-xl font-bold">
                      ${selectedAnimal ? calculateLoanEligibility(selectedAnimal.maliScore?.totalScore || 75, 500, 1000).maxAmount : '2,500'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm opacity-70">Insurance Coverage</div>
                    <div className="text-xl font-bold">Up to $10K</div>
                  </div>
                </div>
              </div>
              
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Percent className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm opacity-70">Best Rate</div>
                    <div className="text-xl font-bold">10% APR</div>
                  </div>
                </div>
              </div>
              
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm opacity-70">Processing Time</div>
                    <div className="text-xl font-bold">24 Hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {FINANCIAL_PRODUCTS.map((product) => {
                const eligibility = selectedAnimal ? 
                  calculateLoanEligibility(selectedAnimal.maliScore?.totalScore || 75, 500, product.maxAmount) :
                  { eligible: true, maxAmount: product.maxAmount, interestRate: product.interestRate || 12, riskLevel: 'medium' }
                
                return (
                  <div
                    key={product.id}
                    className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          product.type === 'loan' ? 'bg-green-100' :
                          product.type === 'insurance' ? 'bg-blue-100' :
                          'bg-purple-100'
                        }`}>
                          {product.type === 'loan' && <DollarSign className="w-5 h-5 text-green-600" />}
                          {product.type === 'insurance' && <Shield className="w-5 h-5 text-blue-600" />}
                          {product.type === 'savings' && <PieChart className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-sm opacity-70">{product.provider}</p>
                        </div>
                      </div>
                      
                      {eligibility.eligible ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Eligible
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Not Eligible
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm opacity-80 mb-4">{product.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Amount Range:</span>
                        <span className="font-medium">${product.minAmount} - ${product.maxAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{product.type === 'insurance' ? 'Premium Rate:' : 'Interest Rate:'}</span>
                        <span className="font-medium">{product.interestRate || product.premiumRate}% APR</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Time:</span>
                        <span className="font-medium">{product.processingTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Min Mali-Score:</span>
                        <span className="font-medium">{product.eligibility.minMaliScore}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">Key Features:</h4>
                      <ul className="text-xs space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedProduct(product)
                        setActiveTab('apply')
                      }}
                      disabled={!eligibility.eligible}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        eligibility.eligible
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {eligibility.eligible ? 'Apply Now' : 'Not Eligible'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {/* Apply Tab */}
        {activeTab === 'apply' && (
          <div className="max-w-2xl mx-auto">
            <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-bold mb-6">
                {selectedProduct ? `Apply for ${selectedProduct.name}` : 'Loan Application'}
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={applicationForm.applicantName}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, applicantName: e.target.value }))}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={applicationForm.phoneNumber}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={applicationForm.location}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, location: e.target.value }))}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    placeholder="City, Region"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
                    <input
                      type="number"
                      value={applicationForm.loanAmount}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, loanAmount: parseInt(e.target.value) || 0 }))}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      placeholder="1000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Monthly Income ($)</label>
                    <input
                      type="number"
                      value={applicationForm.monthlyIncome}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, monthlyIncome: parseInt(e.target.value) || 0 }))}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                      placeholder="500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Loan Purpose</label>
                  <select
                    value={applicationForm.loanPurpose}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, loanPurpose: e.target.value }))}
                    className={`w-full p-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="">Select purpose</option>
                    <option value="livestock-purchase">Livestock Purchase</option>
                    <option value="feed-supplies">Feed & Supplies</option>
                    <option value="veterinary-care">Veterinary Care</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="working-capital">Working Capital</option>
                  </select>
                </div>
                
                {/* Loan Eligibility Preview */}
                {applicationForm.loanAmount > 0 && applicationForm.monthlyIncome > 0 && (
                  <div className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <h3 className="font-medium mb-2">Loan Eligibility Preview</h3>
                    {(() => {
                      const eligibility = calculateLoanEligibility(
                        applicationForm.maliScore, 
                        applicationForm.monthlyIncome, 
                        applicationForm.loanAmount
                      )
                      return (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Eligible Amount:</span>
                            <span className="font-medium">${eligibility.maxAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest Rate:</span>
                            <span className="font-medium">{eligibility.interestRate}% APR</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Level:</span>
                            <span className={`font-medium ${
                              eligibility.riskLevel === 'low' ? 'text-green-500' :
                              eligibility.riskLevel === 'medium' ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                              {eligibility.riskLevel.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className={`font-medium ${
                              eligibility.eligible ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {eligibility.eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                            </span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
                
                <button
                  onClick={handleApplicationSubmit}
                  disabled={!applicationForm.applicantName || !applicationForm.phoneNumber || !applicationForm.loanAmount}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Status Tab */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">My Applications</h2>
              <div className="text-sm opacity-70">
                {applications.length} applications
              </div>
            </div>
            
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto opacity-50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                <p className="opacity-70 mb-4">Start by applying for a loan or insurance</p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className={`rounded-xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Loan Application</h3>
                        <p className="text-sm opacity-70">Applied on {new Date(application.dateApplied).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(application.status)}`}>
                        {application.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm opacity-70">Amount</div>
                        <div className="font-semibold">${application.loanAmount}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-70">Interest Rate</div>
                        <div className="font-semibold">{application.interestRate}%</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-70">Term</div>
                        <div className="font-semibold">{application.loanTerm} months</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-70">Monthly Payment</div>
                        <div className="font-semibold">${application.monthlyPayment}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-blue-500" />
                          <span>Mali-Score: {application.maliScore}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart className="w-4 h-4 text-green-500" />
                          <span>Credit: {application.creditScore}</span>
                        </div>
                      </div>
                      
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EnhancedFinancialServices
