import React from 'react'
import { Camera, Eye } from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface AssessmentCase {
  id: string
  name: string
  description: string
  images: string[]
  expectedScore: number
  healthIssues: string[]
  marketValue: number
}

interface CaseSelectionProps {
  onCaseSelect: (caseData: AssessmentCase) => void
}

const mockCases: AssessmentCase[] = [
  {
    id: 'case-1',
    name: 'Healthy Cattle - Sample 1',
    description: 'Prime condition cattle with excellent health indicators - strong body condition, shiny coat, alert demeanor',
    images: ['/images/healthy/cattle-healthy-1.jpg', '/images/healthy/cattle-healthy-2.jpg', '/images/healthy/cattle-healthy-3.jpg'],
    expectedScore: 85,
    healthIssues: [],
    marketValue: 650
  },
  {
    id: 'case-2',
    name: 'Healthy Cattle - Sample 2',
    description: 'Well-maintained cattle showing good health indicators - proper nutrition, healthy appearance',
    images: ['/images/healthy/cattle-healthy-4.jpg', '/images/healthy/cattle-healthy-5.jpg'],
    expectedScore: 82,
    healthIssues: [],
    marketValue: 620
  },
  {
    id: 'case-3',
    name: 'Healthy Cattle - Sample 3',
    description: 'Robust cattle with strong physical condition - excellent for breeding and production',
    images: ['/images/healthy/cattle-healthy-6.jpg', '/images/healthy/cattle-healthy-7.jpg'],
    expectedScore: 88,
    healthIssues: [],
    marketValue: 680
  },
  {
    id: 'case-4',
    name: 'Healthy Cattle - Sample 4',
    description: 'Premium quality cattle with superior health metrics - top-tier market value',
    images: ['/images/healthy/cattle-healthy-8.jpg'],
    expectedScore: 92,
    healthIssues: [],
    marketValue: 720
  }
]

const CaseSelection: React.FC<CaseSelectionProps> = ({ onCaseSelect }) => {
  const { isDarkMode } = useTheme()
  
  return (
    <div className="card">
      <h2 className={`text-2xl font-bold mb-4 flex items-center transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-mali-dark'
      }`}>
        <Camera className="mr-3 text-mali-green" size={28} />
        Select Assessment Case
      </h2>
      <p className={`mb-6 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-mali-gray'
      }`}>
        Choose a livestock case to demonstrate the Mali-Connect AI assessment system.
        <br />
        <span className="text-sm text-mali-green font-medium">
          Currently showing healthy cattle samples. More health condition categories coming soon!
        </span>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCases.map((caseData) => (
          <div
            key={caseData.id}
            onClick={() => onCaseSelect(caseData)}
            className={`border-2 rounded-lg p-4 cursor-pointer hover:border-mali-green hover:shadow-lg transition-all duration-200 group ${
              isDarkMode 
                ? 'border-gray-700 hover:bg-gray-800/50' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            {/* Image Preview */}
            <div className="mb-3">
              <img
                src={caseData.images[0]}
                alt={caseData.name}
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold group-hover:text-mali-green transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-mali-dark'
              }`}>
                {caseData.name}
              </h3>
              <Eye className={`group-hover:text-mali-green transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-mali-gray'
              }`} size={20} />
            </div>
            
            <p className={`text-sm mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-mali-gray'
            }`}>
              {caseData.description}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-mali-green font-medium">
                Expected Score: {caseData.expectedScore}
              </span>
              <span className="text-mali-blue font-medium">
                ${caseData.marketValue}
              </span>
            </div>
            
            {caseData.healthIssues.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {caseData.healthIssues.map((issue, index) => (
                    <span
                      key={index}
                      className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaseSelection
