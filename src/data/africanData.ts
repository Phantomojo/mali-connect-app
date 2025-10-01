export interface AfricanLocation {
  id: string
  name: string
  country: string
  type: 'water' | 'market' | 'veterinary' | 'pasture' | 'city' | 'region'
  coordinates: [number, number]
  description: string
  quality?: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  rating?: number
  status?: string
}

export const africanData: AfricanLocation[] = [
  {
    id: 'WAT001',
    name: 'Nile River - Aswan',
    country: 'Egypt',
    type: 'water',
    coordinates: [32.8998, 24.0889],
    description: 'Major water source for irrigation and livestock',
    quality: 'Excellent',
    status: 'Active'
  },
  {
    id: 'WAT002',
    name: 'Lake Victoria',
    country: 'Kenya',
    type: 'water',
    coordinates: [33.7518, -1.2921],
    description: 'Largest lake in Africa, vital water source',
    quality: 'Good',
    status: 'Active'
  },
  {
    id: 'MKT001',
    name: 'Kisumu Livestock Market',
    country: 'Kenya',
    type: 'market',
    coordinates: [34.7617, -0.0917],
    description: 'Major livestock trading center in Western Kenya',
    quality: 'Good',
    rating: 4.5,
    status: 'Active'
  },
  {
    id: 'VET001',
    name: 'Nairobi Veterinary Hospital',
    country: 'Kenya',
    type: 'veterinary',
    coordinates: [36.8219, -1.2921],
    description: 'Leading veterinary hospital in East Africa',
    quality: 'Excellent',
    rating: 4.7,
    status: 'Active'
  }
]

export const searchLocations = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return africanData.filter(location => 
    location.name.toLowerCase().includes(lowercaseQuery) ||
    location.country.toLowerCase().includes(lowercaseQuery) ||
    location.description.toLowerCase().includes(lowercaseQuery)
  )
}