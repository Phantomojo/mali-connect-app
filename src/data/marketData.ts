export interface MarketData {
  id: string
  name: string
  country: string
  region: string
  coordinates: [number, number]
  livestockTypes: string[]
  averagePrices: {
    cattle: number
    sheep: number
    goats: number
    poultry: number
  }
  marketDays: string[]
  capacity: string
  facilities: string[]
  rating: number
  lastUpdated: string
  trends: {
    priceChange: number
    volumeChange: number
    demandLevel: 'High' | 'Medium' | 'Low'
  }
  contactInfo: {
    phone?: string
    email?: string
    website?: string
  }
}

export const marketData: MarketData[] = [
  {
    id: 'MKT001',
    name: 'Kisumu Livestock Market',
    country: 'Kenya',
    region: 'Western Kenya',
    coordinates: [34.7617, -0.0917],
    livestockTypes: ['Cattle', 'Sheep', 'Goats', 'Poultry'],
    averagePrices: {
      cattle: 45000,
      sheep: 8000,
      goats: 6000,
      poultry: 500
    },
    marketDays: ['Monday', 'Wednesday', 'Friday'],
    capacity: '5000+ animals daily',
    facilities: ['Loading Bay', 'Water Points', 'Veterinary Services', 'Feed Sales'],
    rating: 4.5,
    lastUpdated: '2024-01-15T00:00:00Z',
    trends: {
      priceChange: 5.2,
      volumeChange: 12.3,
      demandLevel: 'High'
    },
    contactInfo: {
      phone: '+254 20 1234567',
      email: 'info@kisumumarket.co.ke'
    }
  },
  {
    id: 'MKT002',
    name: 'Kano Central Market',
    country: 'Nigeria',
    region: 'Northern Nigeria',
    coordinates: [8.5167, 12.0022],
    livestockTypes: ['Cattle', 'Sheep', 'Goats', 'Camels'],
    averagePrices: {
      cattle: 180000,
      sheep: 35000,
      goats: 25000,
      poultry: 2000
    },
    marketDays: ['Tuesday', 'Thursday', 'Saturday'],
    capacity: '10000+ animals daily',
    facilities: ['Modern Facilities', 'Cold Storage', 'Veterinary Services', 'Export Terminal'],
    rating: 4.8,
    lastUpdated: '2024-01-15T00:00:00Z',
    trends: {
      priceChange: 3.8,
      volumeChange: 8.7,
      demandLevel: 'High'
    },
    contactInfo: {
      phone: '+234 64 1234567',
      email: 'info@kanomarket.ng'
    }
  },
  {
    id: 'MKT003',
    name: 'Durban Livestock Market',
    country: 'South Africa',
    region: 'KwaZulu-Natal',
    coordinates: [31.0292, -29.8587],
    livestockTypes: ['Cattle', 'Sheep', 'Pigs', 'Poultry'],
    averagePrices: {
      cattle: 8500,
      sheep: 1200,
      goats: 1000,
      poultry: 80
    },
    marketDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    capacity: '3000+ animals daily',
    facilities: ['Quarantine Area', 'Veterinary Services', 'Feed Production', 'Export Facility'],
    rating: 4.6,
    lastUpdated: '2024-01-15T00:00:00Z',
    trends: {
      priceChange: 2.1,
      volumeChange: 5.4,
      demandLevel: 'Medium'
    },
    contactInfo: {
      phone: '+27 31 1234567',
      email: 'info@durbanmarket.co.za'
    }
  },
  {
    id: 'MKT004',
    name: 'Addis Ababa Livestock Market',
    country: 'Ethiopia',
    region: 'Central Ethiopia',
    coordinates: [38.7613, 9.0192],
    livestockTypes: ['Cattle', 'Sheep', 'Goats', 'Camels'],
    averagePrices: {
      cattle: 25000,
      sheep: 4000,
      goats: 3000,
      poultry: 200
    },
    marketDays: ['Tuesday', 'Thursday', 'Saturday'],
    capacity: '4000+ animals daily',
    facilities: ['Traditional Facilities', 'Water Points', 'Veterinary Services', 'Feed Sales'],
    rating: 4.3,
    lastUpdated: '2024-01-15T00:00:00Z',
    trends: {
      priceChange: 7.5,
      volumeChange: 15.2,
      demandLevel: 'High'
    },
    contactInfo: {
      phone: '+251 11 1234567',
      email: 'info@addismarket.et'
    }
  },
  {
    id: 'MKT005',
    name: 'Dakar Livestock Market',
    country: 'Senegal',
    region: 'Dakar Region',
    coordinates: [-17.4441, 14.6928],
    livestockTypes: ['Cattle', 'Sheep', 'Goats', 'Poultry'],
    averagePrices: {
      cattle: 180000,
      sheep: 35000,
      goats: 25000,
      poultry: 2500
    },
    marketDays: ['Monday', 'Wednesday', 'Friday'],
    capacity: '2000+ animals daily',
    facilities: ['Basic Facilities', 'Water Points', 'Veterinary Services', 'Export Terminal'],
    rating: 4.2,
    lastUpdated: '2024-01-15T00:00:00Z',
    trends: {
      priceChange: 4.3,
      volumeChange: 9.8,
      demandLevel: 'Medium'
    },
    contactInfo: {
      phone: '+221 33 1234567',
      email: 'info@dakarmarket.sn'
    }
  }
]

export const getMarketById = (id: string) => {
  return marketData.find(market => market.id === id)
}

export const getMarketsByCountry = (country: string) => {
  return marketData.filter(market => market.country === country)
}

export const searchMarkets = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return marketData.filter(market => 
    market.name.toLowerCase().includes(lowercaseQuery) ||
    market.country.toLowerCase().includes(lowercaseQuery) ||
    market.region.toLowerCase().includes(lowercaseQuery)
  )
}

export const getMarketsByLivestockType = (livestockType: string) => {
  return marketData.filter(market => 
    market.livestockTypes.includes(livestockType)
  )
}
