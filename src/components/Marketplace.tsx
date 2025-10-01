import React, { useState } from 'react'
import { ShoppingCart, Search, Filter, Star, MapPin, Calendar, TrendingUp, Eye } from 'react-feather'
import type { Animal } from '../data/herdData'

interface MarketplaceProps {
  viewMode: 'herder' | 'processor'
}

const Marketplace: React.FC<MarketplaceProps> = ({ viewMode }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('price')

  // Mock marketplace data
  const marketplaceItems = [
    {
      id: 'MKT001',
      animalId: 'ANI001',
      herderName: 'Jelani',
      breed: 'Ankole',
      age: 3,
      weight: 450,
      maliScore: 88,
      price: 680,
      location: 'Nairobi County',
      image: '/images/healthy/cattle-healthy-1.jpg',
      description: 'Premium Ankole cattle with excellent health scores',
      category: 'premium',
      verified: true,
      rating: 4.8,
      reviews: 12,
      listedDate: '2024-01-15'
    },
    {
      id: 'MKT002',
      animalId: 'ANI005',
      herderName: 'Asha',
      breed: 'Zebu',
      age: 3,
      weight: 430,
      maliScore: 88,
      price: 650,
      location: 'Mombasa County',
      image: '/images/healthy/cattle-healthy-5.jpg',
      description: 'High-quality Zebu cattle suitable for breeding',
      category: 'premium',
      verified: true,
      rating: 4.6,
      reviews: 8,
      listedDate: '2024-01-14'
    },
    {
      id: 'MKT003',
      animalId: 'ANI002',
      herderName: 'Jelani',
      breed: 'Boran',
      age: 4,
      weight: 420,
      maliScore: 82,
      price: 620,
      location: 'Nairobi County',
      image: '/images/healthy/cattle-healthy-2.jpg',
      description: 'Good condition Boran cattle with minor improvements needed',
      category: 'standard',
      verified: true,
      rating: 4.2,
      reviews: 5,
      listedDate: '2024-01-16'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: marketplaceItems.length },
    { id: 'premium', name: 'Premium', count: marketplaceItems.filter(item => item.category === 'premium').length },
    { id: 'standard', name: 'Standard', count: marketplaceItems.filter(item => item.category === 'standard').length },
    { id: 'budget', name: 'Budget', count: marketplaceItems.filter(item => item.category === 'budget').length }
  ]

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.herderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price
      case 'score':
        return b.maliScore - a.maliScore
      case 'rating':
        return b.rating - a.rating
      case 'date':
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
      default:
        return 0
    }
  })

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-blue-600 bg-blue-50'
    if (score >= 55) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium':
        return 'bg-purple-100 text-purple-800'
      case 'standard':
        return 'bg-blue-100 text-blue-800'
      case 'budget':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Livestock Marketplace</h2>
            <p className="text-gray-600">Buy and sell verified livestock with Mali-Score assessments</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{marketplaceItems.length}</div>
            <div className="text-sm text-gray-500">Active Listings</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by breed, herder, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="price">Sort by Price</option>
              <option value="score">Sort by Mali-Score</option>
              <option value="rating">Sort by Rating</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.breed}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              
              {/* Mali Score Badge */}
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(item.maliScore)}`}>
                  {item.maliScore}
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </div>
              </div>
              
              {/* Verified Badge */}
              {item.verified && (
                <div className="absolute bottom-4 right-4">
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800">{item.breed}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {item.rating} ({item.reviews})
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Herder:</span>
                  <span className="font-medium">{item.herderName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Age:</span>
                  <span className="font-medium">{item.age} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Weight:</span>
                  <span className="font-medium">{item.weight} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-green-600">${item.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500">
                  Listed: {new Date(item.listedDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {viewMode === 'herder' ? 'Contact Seller' : 'View Details'}
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Listings Found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Marketplace
