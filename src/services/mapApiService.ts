// Enhanced API service for comprehensive map data integration
export interface WeatherData {
  temperature: number
  humidity: number
  description: string
  windSpeed: number
  rainfall?: number
  pressure?: number
  visibility?: number
}

export interface SoilData {
  ph: number
  organicMatter: number
  nitrogen: number
  phosphorus: number
  potassium: number
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  moisture: number
  temperature: number
}

export interface MarketData {
  name: string
  price: number
  volume: number
  trend: 'up' | 'down' | 'stable'
  lastUpdated: string
}

export interface ServiceData {
  name: string
  type: string
  rating: number
  distance: number
  status: 'open' | 'closed' | 'limited'
  services: string[]
}

// OpenWeatherMap API integration
export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    // Using a free weather API (OpenWeatherMap requires API key)
    // For demo purposes, using a mock API that returns realistic data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=demo&units=metric`
    )
    
    // Since we don't have a real API key, return mock data based on location
    const mockWeatherData: WeatherData = {
      temperature: 20 + Math.random() * 10, // 20-30°C
      humidity: 60 + Math.random() * 20, // 60-80%
      description: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
      windSpeed: 5 + Math.random() * 15, // 5-20 km/h
      rainfall: Math.random() * 50, // 0-50mm
      pressure: 1000 + Math.random() * 50, // 1000-1050 hPa
      visibility: 8 + Math.random() * 4 // 8-12 km
    }
    
    return mockWeatherData
  } catch (error) {
    console.error('Weather API error:', error)
    return null
  }
}

// Soil quality API integration (mock implementation)
export const fetchSoilData = async (lat: number, lon: number): Promise<SoilData | null> => {
  try {
    // Mock soil data based on location
    const mockSoilData: SoilData = {
      ph: 6.0 + Math.random() * 1.5, // 6.0-7.5
      organicMatter: 2.0 + Math.random() * 3.0, // 2-5%
      nitrogen: 30 + Math.random() * 40, // 30-70 ppm
      phosphorus: 10 + Math.random() * 20, // 10-30 ppm
      potassium: 100 + Math.random() * 200, // 100-300 ppm
      quality: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)] as any,
      moisture: 20 + Math.random() * 30, // 20-50%
      temperature: 15 + Math.random() * 10 // 15-25°C
    }
    
    return mockSoilData
  } catch (error) {
    console.error('Soil API error:', error)
    return null
  }
}

// Market data API integration (mock implementation)
export const fetchMarketData = async (lat: number, lon: number): Promise<MarketData[]> => {
  try {
    // Mock market data for different livestock types
    const mockMarketData: MarketData[] = [
      {
        name: 'Cattle (Live Weight)',
        price: 150 + Math.random() * 50, // 150-200 KES/kg
        volume: 100 + Math.random() * 200, // 100-300 animals
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as any,
        lastUpdated: new Date().toISOString()
      },
      {
        name: 'Sheep (Live Weight)',
        price: 200 + Math.random() * 100, // 200-300 KES/kg
        volume: 50 + Math.random() * 100, // 50-150 animals
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as any,
        lastUpdated: new Date().toISOString()
      },
      {
        name: 'Goats (Live Weight)',
        price: 180 + Math.random() * 80, // 180-260 KES/kg
        volume: 80 + Math.random() * 120, // 80-200 animals
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as any,
        lastUpdated: new Date().toISOString()
      }
    ]
    
    return mockMarketData
  } catch (error) {
    console.error('Market API error:', error)
    return []
  }
}

// Nearby services API integration (mock implementation)
export const fetchNearbyServices = async (lat: number, lon: number, radius: number = 10): Promise<ServiceData[]> => {
  try {
    // Mock service data
    const mockServices: ServiceData[] = [
      {
        name: 'Kajiado Veterinary Clinic',
        type: 'veterinary',
        rating: 4.2 + Math.random() * 0.8, // 4.2-5.0
        distance: Math.random() * radius, // 0-radius km
        status: ['open', 'closed', 'limited'][Math.floor(Math.random() * 3)] as any,
        services: ['General Health', 'Emergency Care', 'Vaccinations']
      },
      {
        name: 'Nairobi Feed Supply',
        type: 'feed',
        rating: 4.0 + Math.random() * 1.0, // 4.0-5.0
        distance: Math.random() * radius,
        status: ['open', 'closed', 'limited'][Math.floor(Math.random() * 3)] as any,
        services: ['Hay', 'Silage', 'Concentrates', 'Mineral Supplements']
      },
      {
        name: 'Nakuru Livestock Market',
        type: 'market',
        rating: 4.5 + Math.random() * 0.5, // 4.5-5.0
        distance: Math.random() * radius,
        status: ['open', 'closed', 'limited'][Math.floor(Math.random() * 3)] as any,
        services: ['Livestock Trading', 'Auction', 'Price Discovery']
      }
    ]
    
    return mockServices
  } catch (error) {
    console.error('Services API error:', error)
    return []
  }
}

// Disease outbreak data API integration (mock implementation)
export const fetchDiseaseData = async (lat: number, lon: number): Promise<any[]> => {
  try {
    // Mock disease outbreak data
    const mockDiseaseData = [
      {
        disease: 'Foot and Mouth Disease',
        severity: 'Low',
        cases: Math.floor(Math.random() * 10),
        lastReported: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        radius: 5 + Math.random() * 15 // 5-20 km radius
      },
      {
        disease: 'Lumpy Skin Disease',
        severity: 'Medium',
        cases: Math.floor(Math.random() * 5),
        lastReported: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
        radius: 3 + Math.random() * 10 // 3-13 km radius
      }
    ]
    
    return mockDiseaseData
  } catch (error) {
    console.error('Disease API error:', error)
    return []
  }
}

// Pasture quality prediction API integration (mock implementation)
export const fetchPasturePrediction = async (lat: number, lon: number): Promise<any> => {
  try {
    // Mock pasture quality prediction
    const mockPrediction = {
      currentQuality: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
      predictedQuality: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
      confidence: 70 + Math.random() * 25, // 70-95%
      factors: [
        'Rainfall patterns',
        'Soil moisture',
        'Temperature trends',
        'Grazing pressure'
      ],
      recommendations: [
        'Rotate grazing areas',
        'Supplement with feed',
        'Monitor soil health',
        'Adjust stocking rates'
      ]
    }
    
    return mockPrediction
  } catch (error) {
    console.error('Pasture prediction API error:', error)
    return null
  }
}

// Real-time livestock tracking API integration (mock implementation)
export const fetchLivestockTracking = async (lat: number, lon: number): Promise<any[]> => {
  try {
    // Mock livestock tracking data
    const mockTrackingData = [
      {
        id: 'COW001',
        type: 'Cattle',
        breed: 'Boran',
        location: { lat: lat + (Math.random() - 0.5) * 0.01, lon: lon + (Math.random() - 0.5) * 0.01 },
        health: ['Healthy', 'Sick', 'Under Observation'][Math.floor(Math.random() * 3)],
        lastUpdate: new Date().toISOString(),
        temperature: 38 + Math.random() * 2, // 38-40°C
        activity: ['Grazing', 'Resting', 'Moving'][Math.floor(Math.random() * 3)]
      },
      {
        id: 'COW002',
        type: 'Cattle',
        breed: 'Ankole',
        location: { lat: lat + (Math.random() - 0.5) * 0.01, lon: lon + (Math.random() - 0.5) * 0.01 },
        health: ['Healthy', 'Sick', 'Under Observation'][Math.floor(Math.random() * 3)],
        lastUpdate: new Date().toISOString(),
        temperature: 38 + Math.random() * 2,
        activity: ['Grazing', 'Resting', 'Moving'][Math.floor(Math.random() * 3)]
      }
    ]
    
    return mockTrackingData
  } catch (error) {
    console.error('Livestock tracking API error:', error)
    return []
  }
}

// Water source quality API integration (mock implementation)
export const fetchWaterQuality = async (lat: number, lon: number): Promise<any> => {
  try {
    // Mock water quality data
    const mockWaterQuality = {
      ph: 6.5 + Math.random() * 1.5, // 6.5-8.0
      turbidity: Math.random() * 10, // 0-10 NTU
      bacteria: Math.random() * 100, // 0-100 CFU/100ml
      quality: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
      lastTested: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      recommendations: [
        'Water is safe for livestock',
        'Consider filtration',
        'Test more frequently',
        'Treat before use'
      ][Math.floor(Math.random() * 4)]
    }
    
    return mockWaterQuality
  } catch (error) {
    console.error('Water quality API error:', error)
    return null
  }
}

// Export all API functions
export const mapApiService = {
  fetchWeatherData,
  fetchSoilData,
  fetchMarketData,
  fetchNearbyServices,
  fetchDiseaseData,
  fetchPasturePrediction,
  fetchLivestockTracking,
  fetchWaterQuality
}
