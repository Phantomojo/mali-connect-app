export interface InsuranceProduct {
  id: string
  name: string
  type: 'Livestock Insurance' | 'Crop Insurance' | 'Farm Equipment Insurance' | 'Comprehensive Farm Insurance'
  coverage: string[]
  premium: {
    monthly: number
    annual: number
  }
  coverageAmount: number
  deductible: number
  provider: string
  rating: number
  features: string[]
  eligibility: string[]
  claimsProcess: string[]
  exclusions: string[]
}

export interface LoanProduct {
  id: string
  name: string
  type: 'Livestock Purchase' | 'Farm Equipment' | 'Feed & Inputs' | 'Infrastructure Development' | 'Emergency'
  amount: {
    min: number
    max: number
  }
  interestRate: number
  term: {
    min: number
    max: number
  }
  provider: string
  rating: number
  requirements: string[]
  benefits: string[]
  processingTime: string
  collateral: string[]
}

export interface FinancialService {
  id: string
  name: string
  type: 'Bank' | 'Microfinance' | 'Insurance Company' | 'Credit Union' | 'Government Program'
  country: string
  services: string[]
  rating: number
  contactInfo: {
    phone: string
    email: string
    website: string
    address: string
  }
  eligibility: string[]
  documents: string[]
  processingTime: string
}

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: 'INS001',
    name: 'Livestock Health Protection',
    type: 'Livestock Insurance',
    coverage: ['Disease Treatment', 'Death Coverage', 'Theft Protection', 'Accident Coverage'],
    premium: {
      monthly: 2500,
      annual: 25000
    },
    coverageAmount: 100000,
    deductible: 5000,
    provider: 'Kenya Livestock Insurance',
    rating: 4.5,
    features: ['24/7 Claims Support', 'Veterinary Network', 'Quick Payout', 'Mobile App'],
    eligibility: ['Valid ID', 'Livestock Ownership Proof', 'Veterinary Certificate'],
    claimsProcess: ['Report Incident', 'Veterinary Assessment', 'Documentation', 'Payout'],
    exclusions: ['Pre-existing Conditions', 'War', 'Nuclear Events', 'Intentional Harm']
  },
  {
    id: 'INS002',
    name: 'Comprehensive Farm Coverage',
    type: 'Comprehensive Farm Insurance',
    coverage: ['Livestock', 'Crops', 'Equipment', 'Buildings', 'Liability'],
    premium: {
      monthly: 5000,
      annual: 50000
    },
    coverageAmount: 500000,
    deductible: 10000,
    provider: 'African Farm Insurance',
    rating: 4.7,
    features: ['All-in-One Coverage', 'Risk Assessment', 'Preventive Care', 'Emergency Response'],
    eligibility: ['Farm Registration', 'Business License', 'Financial Records'],
    claimsProcess: ['Incident Report', 'Assessment', 'Documentation', 'Settlement'],
    exclusions: ['Natural Disasters', 'Government Action', 'War', 'Terrorism']
  }
]

export const loanProducts: LoanProduct[] = [
  {
    id: 'LOAN001',
    name: 'Livestock Purchase Loan',
    type: 'Livestock Purchase',
    amount: {
      min: 50000,
      max: 2000000
    },
    interestRate: 12.5,
    term: {
      min: 6,
      max: 36
    },
    provider: 'Agricultural Bank of Kenya',
    rating: 4.3,
    requirements: ['Valid ID', 'Income Proof', 'Livestock Plan', 'Collateral'],
    benefits: ['Low Interest Rate', 'Flexible Repayment', 'Technical Support', 'Insurance Option'],
    processingTime: '5-7 business days',
    collateral: ['Land Title', 'Livestock', 'Equipment', 'Guarantor']
  },
  {
    id: 'LOAN002',
    name: 'Farm Equipment Financing',
    type: 'Farm Equipment',
    amount: {
      min: 100000,
      max: 5000000
    },
    interestRate: 10.8,
    term: {
      min: 12,
      max: 60
    },
    provider: 'Kenya Commercial Bank',
    rating: 4.6,
    requirements: ['Business Registration', 'Equipment Quote', 'Financial Statements', 'Collateral'],
    benefits: ['Equipment Ownership', 'Tax Benefits', 'Maintenance Support', 'Upgrade Options'],
    processingTime: '7-10 business days',
    collateral: ['Equipment', 'Land', 'Guarantor', 'Cash Deposit']
  }
]

export const financialServices: FinancialService[] = [
  {
    id: 'FIN001',
    name: 'Agricultural Bank of Kenya',
    type: 'Bank',
    country: 'Kenya',
    services: ['Livestock Loans', 'Farm Equipment Financing', 'Insurance Products', 'Savings Accounts'],
    rating: 4.4,
    contactInfo: {
      phone: '+254 20 2220000',
      email: 'info@kab.co.ke',
      website: 'www.kab.co.ke',
      address: 'Nairobi, Kenya'
    },
    eligibility: ['Kenyan Citizen', 'Valid ID', 'Income Proof', 'Business Registration'],
    documents: ['ID Copy', 'Income Statement', 'Bank Statements', 'Business Plan'],
    processingTime: '5-10 business days'
  },
  {
    id: 'FIN002',
    name: 'Kenya Livestock Insurance',
    type: 'Insurance Company',
    country: 'Kenya',
    services: ['Livestock Insurance', 'Crop Insurance', 'Farm Equipment Insurance', 'Liability Coverage'],
    rating: 4.5,
    contactInfo: {
      phone: '+254 20 1234567',
      email: 'info@kenyalivestock.co.ke',
      website: 'www.kenyalivestock.co.ke',
      address: 'Nairobi, Kenya'
    },
    eligibility: ['Livestock Owner', 'Valid ID', 'Veterinary Certificate', 'Farm Registration'],
    documents: ['ID Copy', 'Livestock Records', 'Veterinary Certificate', 'Farm Registration'],
    processingTime: '3-5 business days'
  }
]

export const getInsuranceProducts = () => insuranceProducts
export const getLoanProducts = () => loanProducts
export const getFinancialServices = () => financialServices

export const searchFinancialProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  const allProducts = [...insuranceProducts, ...loanProducts, ...financialServices]
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.type.toLowerCase().includes(lowercaseQuery) ||
    (product as any).provider?.toLowerCase().includes(lowercaseQuery)
  )
}
