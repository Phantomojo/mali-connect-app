import React, { useState } from 'react'
import { CreditCard, TrendingUp, Shield, BarChart, FileText, Clock, CheckCircle, AlertCircle } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'
import type { Animal } from '../data/herdData'

interface FinancialServicesProps {
  viewMode: 'herder' | 'processor'
  selectedAnimal?: Animal | null
}

const FinancialServices: React.FC<FinancialServicesProps> = ({ viewMode, selectedAnimal }) => {
  const { isDarkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('insurance')
  const [loanAmount, setLoanAmount] = useState(1000)
  const [loanTerm, setLoanTerm] = useState(12)

  // Mock financial services data
  const insurancePlans = [
    {
      id: 'INS001',
      name: 'Livestock Health Insurance',
      description: 'Comprehensive health coverage for your livestock',
      monthlyPremium: 25,
      coverage: 5000,
      deductible: 200,
      features: ['Health coverage', 'Emergency care', 'Veterinary visits', 'Death benefits'],
      recommended: true
    },
    {
      id: 'INS002',
      name: 'Market Value Insurance',
      description: 'Protect your investment against market fluctuations',
      monthlyPremium: 35,
      coverage: 8000,
      deductible: 300,
      features: ['Market protection', 'Price guarantees', 'Loss coverage', 'Flexible terms'],
      recommended: false
    },
    {
      id: 'INS003',
      name: 'Breeding Insurance',
      description: 'Specialized coverage for breeding livestock',
      monthlyPremium: 45,
      coverage: 12000,
      deductible: 400,
      features: ['Breeding coverage', 'Pregnancy care', 'Calf protection', 'Genetic guarantees'],
      recommended: false
    }
  ]

  const loanProducts = [
    {
      id: 'LOAN001',
      name: 'Livestock Purchase Loan',
      description: 'Finance your next livestock purchase',
      interestRate: 8.5,
      maxAmount: 50000,
      minAmount: 1000,
      maxTerm: 60,
      features: ['Low interest rates', 'Quick approval', 'Flexible terms', 'No collateral required']
    },
    {
      id: 'LOAN002',
      name: 'Farm Equipment Loan',
      description: 'Upgrade your farming equipment',
      interestRate: 7.2,
      maxAmount: 100000,
      minAmount: 5000,
      maxTerm: 84,
      features: ['Equipment financing', 'Tax benefits', 'Maintenance support', 'Warranty coverage']
    },
    {
      id: 'LOAN003',
      name: 'Emergency Livestock Loan',
      description: 'Quick funding for urgent livestock needs',
      interestRate: 12.0,
      maxAmount: 20000,
      minAmount: 500,
      maxTerm: 24,
      features: ['Same-day approval', 'Emergency funding', 'Simple application', 'Quick disbursement']
    }
  ]

  const calculateLoanPayment = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                   (Math.pow(1 + monthlyRate, term) - 1)
    return Math.round(payment)
  }

  const getMaliScoreMultiplier = (score: number) => {
    if (score >= 85) return 1.2 // 20% better rates
    if (score >= 70) return 1.1 // 10% better rates
    if (score >= 55) return 1.0 // Standard rates
    return 0.9 // 10% worse rates
  }

  const tabs = [
    { id: 'insurance', name: 'Insurance', icon: Shield },
    { id: 'loans', name: 'Loans', icon: CreditCard },
    { id: 'calculator', name: 'Calculator', icon: BarChart },
    { id: 'documents', name: 'Documents', icon: FileText }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>Financial Services</h2>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Insurance, loans, and financial tools for livestock management</p>
          </div>
          {selectedAnimal && (
            <div className="text-right">
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Selected Animal</div>
              <div className={`text-lg font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>{selectedAnimal.id}</div>
              <div className="text-sm text-green-600">Mali-Score: {selectedAnimal.maliScore.totalScore}</div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className={`flex space-x-1 rounded-lg p-1 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? isDarkMode 
                      ? 'bg-gray-600 text-green-400 shadow-sm' 
                      : 'bg-white text-green-600 shadow-sm'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-gray-100' 
                      : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Insurance Tab */}
      {activeTab === 'insurance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insurancePlans.map((plan) => (
              <div key={plan.id} className={`rounded-2xl shadow-xl p-6 relative transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>{plan.name}</h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    ${plan.monthlyPremium}
                    <span className={`text-lg transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>/month</span>
                  </div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Up to ${plan.coverage.toLocaleString()} coverage</div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`text-center text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Deductible: ${plan.deductible}
                </div>

                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  plan.recommended
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  {viewMode === 'herder' ? 'Get Quote' : 'View Details'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loans Tab */}
      {activeTab === 'loans' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {loanProducts.map((loan) => (
              <div key={loan.id} className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>{loan.name}</h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{loan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {loan.interestRate}%
                    <span className={`text-lg transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}> APR</span>
                  </div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    ${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {loan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`text-center text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Up to {loan.maxTerm} months term
                </div>

                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {viewMode === 'herder' ? 'Apply Now' : 'View Details'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>Loan Calculator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Loan Amount
                </label>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className={`flex justify-between text-sm mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>$500</span>
                  <span className="font-medium">${loanAmount.toLocaleString()}</span>
                  <span>$50,000</span>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Loan Term (Months)
                </label>
                <input
                  type="range"
                  min="6"
                  max="84"
                  step="6"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full"
                />
                <div className={`flex justify-between text-sm mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>6 months</span>
                  <span className="font-medium">{loanTerm} months</span>
                  <span>84 months</span>
                </div>
              </div>

              {selectedAnimal && (
                <div className={`p-4 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
                }`}>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-green-300' : 'text-green-800'
                    }`}>Mali-Score Bonus</span>
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-green-300' : 'text-green-700'
                  }`}>
                    Your Mali-Score of {selectedAnimal.maliScore.totalScore} qualifies for a {Math.round((getMaliScoreMultiplier(selectedAnimal.maliScore.totalScore) - 1) * 100)}% rate reduction!
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className={`rounded-lg p-6 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h4 className={`font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>Loan Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Principal:</span>
                    <span className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>${loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Interest Rate:</span>
                    <span className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>8.5% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Term:</span>
                    <span className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>{loanTerm} months</span>
                  </div>
                  <hr className={`transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`} />
                  <div className="flex justify-between text-lg font-bold">
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>Monthly Payment:</span>
                    <span className="text-green-600">
                      ${calculateLoanPayment(loanAmount, 8.5, loanTerm).toLocaleString()}
                    </span>
                  </div>
                  <div className={`flex justify-between text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>Total Interest:</span>
                    <span>
                      ${(calculateLoanPayment(loanAmount, 8.5, loanTerm) * loanTerm - loanAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                Apply for This Loan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { name: 'Insurance Policy', status: 'Active', date: '2024-01-15', type: 'insurance' },
              { name: 'Loan Agreement', status: 'Pending', date: '2024-01-20', type: 'loan' },
              { name: 'Mali-Score Certificate', status: 'Valid', date: '2024-01-10', type: 'certificate' },
              { name: 'Health Records', status: 'Updated', date: '2024-01-18', type: 'health' },
              { name: 'Market Analysis Report', status: 'Available', date: '2024-01-12', type: 'report' },
              { name: 'Financial Statement', status: 'Current', date: '2024-01-01', type: 'financial' }
            ].map((doc, index) => (
              <div key={index} className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>{doc.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'Active' || doc.status === 'Valid' || doc.status === 'Updated' || doc.status === 'Current'
                      ? isDarkMode 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-green-100 text-green-800'
                      : doc.status === 'Pending'
                      ? isDarkMode 
                        ? 'bg-yellow-900/50 text-yellow-300' 
                        : 'bg-yellow-100 text-yellow-800'
                      : isDarkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {doc.status}
                  </div>
                </div>
                
                <div className={`text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Last updated: {new Date(doc.date).toLocaleDateString()}
                </div>
                
                <button className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  View Document
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FinancialServices
