import React from 'react'
import { Users, Cpu } from 'react-feather'

interface ViewToggleProps {
  viewMode: 'herder' | 'processor'
  onViewModeChange: (mode: 'herder' | 'processor') => void
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200/50">
        <div className="flex space-x-2">
          {/* Herder View Button */}
          <button
            onClick={() => onViewModeChange('herder')}
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
              viewMode === 'herder'
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
            }`}
          >
            <Users className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold text-sm">Herder View</div>
              <div className="text-xs opacity-90">Manage Your Herd</div>
            </div>
          </button>

          {/* Processor View Button */}
          <button
            onClick={() => onViewModeChange('processor')}
            className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
              viewMode === 'processor'
                ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:bg-gray-100 hover:scale-105'
            }`}
          >
            <Cpu className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold text-sm">Processor View</div>
              <div className="text-xs opacity-90">Review Submissions</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewToggle
