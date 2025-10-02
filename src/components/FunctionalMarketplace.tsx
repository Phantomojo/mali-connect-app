import React, { useState, useEffect, useMemo } from 'react'
import { 
  ShoppingCart, 
  Heart, 
  MapPin, 
  Star, 
  Filter, 
  Search, 
  DollarSign, 
  Calendar, 
  User, 
  Phone, 
  MessageCircle, 
  TrendingUp,
  Award,
  Shield,
  Truck,
  Eye,
  Share2,
  Bookmark,
  AlertCircle,
  CheckCircle,
  Clock,
  X
} from 'react-feather'
import { useTheme } from '../contexts/ThemeContext'

interface LivestockListing {
  id: string
  sellerId: string
  sellerName: string
  sellerRating: number
  sellerVerified: boolean
  title: string
  description: string
  breed: string
  age: number
  weight: number
  gender: 'male' | 'female'
  maliScore: number
  price: number
  negotiable: boolean
  location: {
    city: string
    region: string
    country: string
    coordinates: [number, number]
  }
  images: string[]
  healthCertificates: string[]
  vaccinations: string[]
  datePosted: string
  status: 'available' | 'pending' | 'sold'
  views: number
  favorites: number
  category: 'cattle' | 'goats' | 'sheep' | 'camels'
  tags: string[]
  transportAvailable: boolean
  paymentMethods: string[]
  lastPriceUpdate: string
}

interface MarketplaceFilters {
  category: string
  minPrice: number
  maxPrice: number
  minMaliScore: number
  location: string
  breed: string
  gender: string
  ageRange: string
  transportAvailable: boolean
  verifiedSellers: boolean
}

// Mock live livestock data - simulating real marketplace
const LIVE_LIVESTOCK_LISTINGS: LivestockListing[] = [
  {
    id: 'cattle-001',
    sellerId: 'seller-001',
    sellerName: 'John Kiprotich',
    sellerRating: 4.8,
    sellerVerified: true,
    title: 'Premium Friesian Bull - Excellent Health',
    description: 'High-quality Friesian bull with excellent breeding potential. Well-maintained, vaccinated, and ready for breeding. Perfect for dairy farming expansion.',
    breed: 'Friesian',
    age: 3,
    weight: 650,
    gender: 'male',
    maliScore: 92,
    price: 580,
    negotiable: true,
    location: {
      city: 'Nakuru',
      region: 'Rift Valley',
      country: 'Kenya',
      coordinates: [-0.3031, 36.0800]
    },
    images: ['/images/healthy/cattle-healthy-1.jpg', '/images/healthy/cattle-healthy-2.jpg'],
    healthCertificates: ['Health Certificate 2024', 'Vaccination Record'],
    vaccinations: ['FMD', 'Anthrax', 'Blackleg'],
    datePosted: '2024-01-15T10:30:00Z',
    status: 'available',
    views: 245,
    favorites: 18,
    category: 'cattle',
    tags: ['breeding', 'dairy', 'premium'],
    transportAvailable: true,
    paymentMethods: ['Cash', 'M-Pesa', 'Bank Transfer'],
    lastPriceUpdate: '2024-01-15T10:30:00Z'
  },
  {
    id: 'cattle-002',
    sellerId: 'seller-002',
    sellerName: 'Mary Wanjiku',
    sellerRating: 4.6,
    sellerVerified: true,
    title: 'Healthy Zebu Cow - Good for Meat Production',
    description: 'Well-fed Zebu cow, perfect for meat production. Good body condition and ready for immediate sale. Local breed, well-adapted to climate.',
    breed: 'Zebu',
    age: 4,
    weight: 420,
    gender: 'female',
    maliScore: 78,
    price: 450,
    negotiable: true,
    location: {
      city: 'Meru',
      region: 'Eastern',
      country: 'Kenya',
      coordinates: [0.0467, 37.6556]
    },
    images: ['/images/healthy/cattle-healthy-3.jpg'],
    healthCertificates: ['Health Certificate 2024'],
    vaccinations: ['FMD', 'Anthrax'],
    datePosted: '2024-01-14T14:20:00Z',
    status: 'available',
    views: 189,
    favorites: 12,
    category: 'cattle',
    tags: ['meat', 'local-breed', 'climate-adapted'],
    transportAvailable: false,
    paymentMethods: ['Cash', 'M-Pesa'],
    lastPriceUpdate: '2024-01-14T14:20:00Z'
  },
  {
    id: 'cattle-003',
    sellerId: 'seller-003',
    sellerName: 'Samuel Kipchoge',
    sellerRating: 4.9,
    sellerVerified: true,
    title: 'Young Ayrshire Heifer - Future Dairy Star',
    description: 'Beautiful young Ayrshire heifer with excellent genetics. Perfect for dairy farming. Well-cared for and healthy.',
    breed: 'Ayrshire',
    age: 2,
    weight: 380,
    gender: 'female',
    maliScore: 88,
    price: 520,
    negotiable: false,
    location: {
      city: 'Eldoret',
      region: 'Rift Valley',
      country: 'Kenya',
      coordinates: [0.5143, 35.2698]
    },
    images: ['/images/healthy/cattle-healthy-4.jpg', '/images/healthy/cattle-healthy-5.jpg'],
    healthCertificates: ['Health Certificate 2024', 'Breeding Record'],
    vaccinations: ['FMD', 'Anthrax', 'Blackleg', 'Brucellosis'],
    datePosted: '2024-01-13T09:15:00Z',
    status: 'pending',
    views: 312,
    favorites: 28,
    category: 'cattle',
    tags: ['dairy', 'young', 'genetics'],
    transportAvailable: true,
    paymentMethods: ['Cash', 'M-Pesa', 'Bank Transfer', 'Installments'],
    lastPriceUpdate: '2024-01-13T09:15:00Z'
  },
  {
    id: 'cattle-004',
    sellerId: 'seller-004',
    sellerName: 'Peter Mutua',
    sellerRating: 4.3,
    sellerVerified: false,
    title: 'Boran Bull - Hardy and Strong',
    description: 'Strong Boran bull, excellent for harsh conditions. Good for crossbreeding and meat production.',
    breed: 'Boran',
    age: 5,
    weight: 550,
    gender: 'male',
    maliScore: 72,
    price: 380,
    negotiable: true,
    location: {
      city: 'Marsabit',
      region: 'Northern',
      country: 'Kenya',
      coordinates: [2.3284, 37.9899]
    },
    images: ['/images/healthy/cattle-healthy-6.jpg'],
    healthCertificates: ['Basic Health Check'],
    vaccinations: ['FMD'],
    datePosted: '2024-01-12T16:45:00Z',
    status: 'available',
    views: 156,
    favorites: 8,
    category: 'cattle',
    tags: ['hardy', 'crossbreeding', 'drought-resistant'],
    transportAvailable: false,
    paymentMethods: ['Cash'],
    lastPriceUpdate: '2024-01-12T16:45:00Z'
  }
]

interface FunctionalMarketplaceProps {
  viewMode: 'herder' | 'processor'
}

const FunctionalMarketplace: React.FC<FunctionalMarketplaceProps> = ({ viewMode }) => {
  const { isDarkMode } = useTheme()
  const [listings, setListings] = useState<LivestockListing[]>(LIVE_LIVESTOCK_LISTINGS)
  const [filteredListings, setFilteredListings] = useState<LivestockListing[]>(LIVE_LIVESTOCK_LISTINGS)
  const [selectedListing, setSelectedListing] = useState<LivestockListing | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [showContactModal, setShowContactModal] = useState(false)
  
  const [filters, setFilters] = useState<MarketplaceFilters>({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    minMaliScore: 0,
    location: 'all',
    breed: 'all',
    gender: 'all',
    ageRange: 'all',
    transportAvailable: false,
    verifiedSellers: false
  })

  // Filter listings based on search and filters
  useEffect(() => {
    let filtered = listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           listing.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           listing.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = filters.category === 'all' || listing.category === filters.category
      const matchesPrice = listing.price >= filters.minPrice && listing.price <= filters.maxPrice
      const matchesMaliScore = listing.maliScore >= filters.minMaliScore
      const matchesLocation = filters.location === 'all' || listing.location.region.toLowerCase().includes(filters.location.toLowerCase())
      const matchesBreed = filters.breed === 'all' || listing.breed.toLowerCase().includes(filters.breed.toLowerCase())
      const matchesGender = filters.gender === 'all' || listing.gender === filters.gender
      const matchesTransport = !filters.transportAvailable || listing.transportAvailable
      const matchesVerified = !filters.verifiedSellers || listing.sellerVerified
      
      let matchesAge = true
      if (filters.ageRange !== 'all') {
        switch (filters.ageRange) {
          case 'young': matchesAge = listing.age <= 2; break
          case 'adult': matchesAge = listing.age > 2 && listing.age <= 5; break
          case 'mature': matchesAge = listing.age > 5; break
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice && matchesMaliScore && 
             matchesLocation && matchesBreed && matchesGender && matchesAge && 
             matchesTransport && matchesVerified
    })
    
    setFilteredListings(filtered)
  }, [listings, searchQuery, filters])

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    )
  }

  const handleContactSeller = (listing: LivestockListing) => {
    setSelectedListing(listing)
    setShowContactModal(true)
  }

  const getMaliScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-blue-500'
    if (score >= 40) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getMaliScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-blue-100 text-blue-800'
    if (score >= 40) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Title and Stats */}
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
                <span>Livestock Marketplace</span>
              </h1>
              <p className="text-sm opacity-70 mt-1">
                {filteredListings.length} listings • {filteredListings.filter(l => l.status === 'available').length} available
              </p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Search livestock..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className={`mt-4 p-4 rounded-lg border transition-colors ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className={`w-full p-2 rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="all">All</option>
                    <option value="cattle">Cattle</option>
                    <option value="goats">Goats</option>
                    <option value="sheep">Sheep</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Max Price ($)</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || 1000 }))}
                    className={`w-full p-2 rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Min Mali-Score</label>
                  <input
                    type="number"
                    value={filters.minMaliScore}
                    onChange={(e) => setFilters(prev => ({ ...prev, minMaliScore: parseInt(e.target.value) || 0 }))}
                    className={`w-full p-2 rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Region/City"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className={`w-full p-2 rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="transport"
                    checked={filters.transportAvailable}
                    onChange={(e) => setFilters(prev => ({ ...prev, transportAvailable: e.target.checked }))}
                  />
                  <label htmlFor="transport" className="text-sm">Transport Available</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={filters.verifiedSellers}
                    onChange={(e) => setFilters(prev => ({ ...prev, verifiedSellers: e.target.checked }))}
                  />
                  <label htmlFor="verified" className="text-sm">Verified Sellers</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'available' ? 'bg-green-100 text-green-800' :
                    listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {listing.status.toUpperCase()}
                  </span>
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(listing.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                </button>
                
                {/* Mali-Score Badge */}
                <div className="absolute bottom-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getMaliScoreBadge(listing.maliScore)}`}>
                    Mali-Score: {listing.maliScore}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg leading-tight">{listing.title}</h3>
                  {listing.sellerVerified && (
                    <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 ml-2" />
                  )}
                </div>
                
                <p className="text-sm opacity-70 mb-3 line-clamp-2">{listing.description}</p>
                
                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Breed:</span>
                    <span className="font-medium">{listing.breed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Age:</span>
                    <span className="font-medium">{listing.age} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Weight:</span>
                    <span className="font-medium">{listing.weight} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Location:</span>
                    <span className="font-medium">{listing.location.city}</span>
                  </div>
                </div>
                
                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      ${listing.price}
                    </div>
                    {listing.negotiable && (
                      <div className="text-xs opacity-70">Negotiable</div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleContactSeller(listing)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Contact
                  </button>
                </div>
                
                {/* Seller Info */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 opacity-50" />
                    <span className="text-sm">{listing.sellerName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{listing.sellerRating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 mx-auto opacity-50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            <p className="opacity-70">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      {/* Contact Modal */}
      {showContactModal && selectedListing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`max-w-md w-full rounded-xl shadow-2xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Contact Seller</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium">{selectedListing.sellerName}</div>
                    <div className="text-sm opacity-70">
                      {selectedListing.sellerVerified ? 'Verified Seller' : 'Unverified Seller'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium">{selectedListing.sellerRating}/5.0</div>
                    <div className="text-sm opacity-70">Seller Rating</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Payment Methods:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedListing.paymentMethods.map((method) => (
                      <span
                        key={method}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </div>
                
                <div className="text-xs opacity-70 text-center">
                  By contacting this seller, you agree to our terms of service
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FunctionalMarketplace
