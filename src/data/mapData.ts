// Enhanced geospatial data for the Ecosystem Map with real-world APIs
export const pastureQualityData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.3, -1.4], // South of Nairobi, rural area
          [36.8, -1.4],
          [36.8, -1.8],
          [36.3, -1.8],
          [36.3, -1.4]
        ]]
      },
      properties: {
        quality: 'Good',
        area: 'Kajiado County',
        description: 'High-quality pasture with good grass coverage in rural areas'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [35.8, -0.8], // Laikipia County, rural
          [36.3, -0.8],
          [36.3, -1.2],
          [35.8, -1.2],
          [35.8, -0.8]
        ]]
      },
      properties: {
        quality: 'Poor',
        area: 'Laikipia County',
        description: 'Degraded pasture requiring restoration in rural areas'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.9, -2.2], // Coastal rural areas
          [37.4, -2.2],
          [37.4, -2.6],
          [36.9, -2.6],
          [36.9, -2.2]
        ]]
      },
      properties: {
        quality: 'Fair',
        area: 'Kilifi County',
        description: 'Moderate pasture quality with seasonal variations in rural areas'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [35.2, -1.0], // Rift Valley rural areas
          [35.7, -1.0],
          [35.7, -1.4],
          [35.2, -1.4],
          [35.2, -1.0]
        ]]
      },
      properties: {
        quality: 'Good',
        area: 'Nakuru County',
        description: 'Excellent pasture with diverse grass species in rural areas'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -0.2], // Northern rural areas
          [36.5, -0.2],
          [36.5, -0.6],
          [36.0, -0.6],
          [36.0, -0.2]
        ]]
      },
      properties: {
        quality: 'Fair',
        area: 'Nyeri County',
        description: 'Mixed pasture quality in rural highland areas'
      }
    }
  ]
}

export const waterSourcesData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.4, -1.5] // Kajiado County, rural
      },
      properties: {
        name: 'Kajiado Water Borehole',
        type: 'water',
        capacity: 'High',
        status: 'Active'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.1, -0.9] // Nyeri County, rural
      },
      properties: {
        name: 'Nyeri River Source',
        type: 'river',
        capacity: 'Medium',
        status: 'Active'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [37.1, -2.3] // Kilifi County, rural
      },
      properties: {
        name: 'Kilifi Water Point',
        type: 'water',
        capacity: 'High',
        status: 'Active'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [35.5, -1.1] // Nakuru County, rural
      },
      properties: {
        name: 'Nakuru Springs',
        type: 'spring',
        capacity: 'Low',
        status: 'Seasonal'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.6, -1.6] // Kajiado County, rural
      },
      properties: {
        name: 'Kajiado Wells',
        type: 'well',
        capacity: 'Medium',
        status: 'Active'
      }
    }
  ]
}

export const livestockMarketsData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.5, -1.6] // Kajiado County, rural
      },
      properties: {
        name: 'Kajiado Livestock Market',
        type: 'market',
        size: 'Large',
        weeklyVolume: '500+ animals'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.2, -0.8] // Nyeri County, rural
      },
      properties: {
        name: 'Nyeri Market',
        type: 'market',
        size: 'Medium',
        weeklyVolume: '200+ animals'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [37.2, -2.4] // Kilifi County, rural
      },
      properties: {
        name: 'Kilifi Coastal Market',
        type: 'market',
        size: 'Large',
        weeklyVolume: '400+ animals'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [35.6, -1.2] // Nakuru County, rural
      },
      properties: {
        name: 'Nakuru Market',
        type: 'market',
        size: 'Small',
        weeklyVolume: '100+ animals'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.3] // Machakos County, rural
      },
      properties: {
        name: 'Machakos Market',
        type: 'market',
        size: 'Medium',
        weeklyVolume: '300+ animals'
      }
    }
  ]
}

export const veterinaryServicesData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.4, -1.4] // Kajiado County, rural
      },
      properties: {
        name: 'Kajiado Veterinary Clinic',
        type: 'clinic',
        services: ['General Health', 'Emergency Care', 'Vaccinations'],
        rating: 4.8
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.0, -0.9] // Nyeri County, rural
      },
      properties: {
        name: 'Nyeri Animal Hospital',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Preventive Care'],
        rating: 4.6
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [35.7, -1.3] // Nakuru County, rural
      },
      properties: {
        name: 'Nakuru Mobile Veterinary Unit',
        type: 'mobile',
        services: ['Field Visits', 'Emergency Response', 'Health Checks'],
        rating: 4.7
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [37.0, -2.2] // Kilifi County, rural
      },
      properties: {
        name: 'Kilifi Veterinary Station',
        type: 'clinic',
        services: ['General Health', 'Vaccinations', 'Disease Control'],
        rating: 4.5
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.7, -1.7] // Machakos County, rural
      },
      properties: {
        name: 'Machakos Animal Health Center',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Emergency Care'],
        rating: 4.4
      }
    }
  ]
}

// Additional real-world data sources
export const weatherStationsData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.3] // Nairobi
      },
      properties: {
        name: 'Nairobi Weather Station',
        type: 'weather',
        temperature: 22,
        humidity: 65,
        rainfall: 850,
        windSpeed: 12,
        status: 'Active'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.1, -0.9] // Nyeri
      },
      properties: {
        name: 'Nyeri Weather Station',
        type: 'weather',
        temperature: 18,
        humidity: 70,
        rainfall: 1200,
        windSpeed: 8,
        status: 'Active'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [35.6, -1.2] // Nakuru
      },
      properties: {
        name: 'Nakuru Weather Station',
        type: 'weather',
        temperature: 20,
        humidity: 60,
        rainfall: 900,
        windSpeed: 15,
        status: 'Active'
      }
    }
  ]
}

export const feedSuppliersData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.5, -1.4] // Kajiado
      },
      properties: {
        name: 'Kajiado Feed Supply Co.',
        type: 'feed',
        products: ['Hay', 'Silage', 'Concentrates', 'Mineral Supplements'],
        capacity: 'High',
        rating: 4.7,
        deliveryRadius: 50,
        status: 'Open'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.2, -0.8] // Nyeri
      },
      properties: {
        name: 'Nyeri Animal Nutrition',
        type: 'feed',
        products: ['Grass Seeds', 'Fertilizers', 'Feed Pellets'],
        capacity: 'Medium',
        rating: 4.5,
        deliveryRadius: 30,
        status: 'Open'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [35.7, -1.3] // Nakuru
      },
      properties: {
        name: 'Nakuru Feed Mill',
        type: 'feed',
        products: ['Maize Silage', 'Soybean Meal', 'Wheat Bran'],
        capacity: 'High',
        rating: 4.8,
        deliveryRadius: 60,
        status: 'Open'
      }
    }
  ]
}

export const transportHubsData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8219, -1.2921] // Nairobi
      },
      properties: {
        name: 'Nairobi Livestock Transport Hub',
        type: 'transport',
        services: ['Livestock Transport', 'Cold Storage', 'Loading Facilities'],
        capacity: 'Large',
        rating: 4.6,
        operatingHours: '24/7',
        status: 'Active'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.0, -1.0] // Nanyuki
      },
      properties: {
        name: 'Nanyuki Transport Center',
        type: 'transport',
        services: ['Regional Transport', 'Loading Bay'],
        capacity: 'Medium',
        rating: 4.3,
        operatingHours: '6AM-8PM',
        status: 'Active'
      }
    }
  ]
}

export const processingFacilitiesData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.2] // Nairobi area
      },
      properties: {
        name: 'Nairobi Meat Processing Plant',
        type: 'processing',
        services: ['Slaughter', 'Processing', 'Packaging', 'Cold Storage'],
        capacity: 'Large',
        rating: 4.9,
        certifications: ['HACCP', 'ISO 22000'],
        status: 'Active'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [37.0, -2.2] // Kilifi
      },
      properties: {
        name: 'Kilifi Dairy Processing',
        type: 'processing',
        services: ['Milk Processing', 'Cheese Production', 'Yogurt'],
        capacity: 'Medium',
        rating: 4.4,
        certifications: ['HACCP'],
        status: 'Active'
      }
    }
  ]
}

// API Integration functions
export const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    // Using OpenWeatherMap API (you'll need to add your API key)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_OPENWEATHER_API_KEY&units=metric`
    )
    const data = await response.json()
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      windSpeed: data.wind.speed
    }
  } catch (error) {
    console.error('Weather API error:', error)
    return null
  }
}

export const fetchNearbyServices = async (lat: number, lon: number, radius: number = 10) => {
  // This would integrate with Google Places API or similar
  // For now, returning mock data
  return {
    veterinary: 3,
    markets: 2,
    feedSuppliers: 4,
    transportHubs: 1
  }
}

export const fetchSoilQualityData = async (lat: number, lon: number) => {
  // This would integrate with soil quality APIs
  // For now, returning mock data based on location
  return {
    ph: 6.5,
    organicMatter: 3.2,
    nitrogen: 45,
    phosphorus: 12,
    potassium: 180,
    quality: 'Good'
  }
}

// Environmental data sources
export const rainfallData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -1.0], [36.5, -1.0], [36.5, -1.5], [36.0, -1.5], [36.0, -1.0]
        ]]
      },
      properties: {
        rainfall: 'High',
        amount: 1200,
        season: 'Wet'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.5, -1.0], [37.0, -1.0], [37.0, -1.5], [36.5, -1.5], [36.5, -1.0]
        ]]
      },
      properties: {
        rainfall: 'Medium',
        amount: 800,
        season: 'Moderate'
      }
    }
  ]
}

export const temperatureData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -1.0], [36.5, -1.0], [36.5, -1.5], [36.0, -1.5], [36.0, -1.0]
        ]]
      },
      properties: {
        temperature: 'Cool',
        avgTemp: 18,
        range: '15-22°C'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.5, -1.0], [37.0, -1.0], [37.0, -1.5], [36.5, -1.5], [36.5, -1.0]
        ]]
      },
      properties: {
        temperature: 'Warm',
        avgTemp: 25,
        range: '20-30°C'
      }
    }
  ]
}

export const humidityData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -1.0], [36.5, -1.0], [36.5, -1.5], [36.0, -1.5], [36.0, -1.0]
        ]]
      },
      properties: {
        humidity: 'High',
        level: 75,
        comfort: 'Comfortable'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.5, -1.0], [37.0, -1.0], [37.0, -1.5], [36.5, -1.5], [36.5, -1.0]
        ]]
      },
      properties: {
        humidity: 'Low',
        level: 45,
        comfort: 'Dry'
      }
    }
  ]
}

export const windData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.2, -1.2]
      },
      properties: {
        speed: 15,
        direction: 'NE',
        gust: 25
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.7, -1.3]
      },
      properties: {
        speed: 8,
        direction: 'SW',
        gust: 12
      }
    }
  ]
}

export const vegetationData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -1.0], [36.5, -1.0], [36.5, -1.5], [36.0, -1.5], [36.0, -1.0]
        ]]
      },
      properties: {
        index: 'High',
        density: 0.8,
        health: 'Excellent'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.5, -1.0], [37.0, -1.0], [37.0, -1.5], [36.5, -1.5], [36.5, -1.0]
        ]]
      },
      properties: {
        index: 'Medium',
        density: 0.5,
        health: 'Good'
      }
    }
  ]
}

export const elevationData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -1.0], [36.5, -1.0], [36.5, -1.5], [36.0, -1.5], [36.0, -1.0]
        ]]
      },
      properties: {
        elevation: 'High',
        meters: 1800,
        terrain: 'Mountainous'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.5, -1.0], [37.0, -1.0], [37.0, -1.5], [36.5, -1.5], [36.5, -1.0]
        ]]
      },
      properties: {
        elevation: 'Low',
        meters: 500,
        terrain: 'Plains'
      }
    }
  ]
}

export const droughtData = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -1.0], [36.5, -1.0], [36.5, -1.5], [36.0, -1.5], [36.0, -1.0]
        ]]
      },
      properties: {
        risk: 'Low',
        severity: 2,
        impact: 'Minimal'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.5, -1.0], [37.0, -1.0], [37.0, -1.5], [36.5, -1.5], [36.5, -1.0]
        ]]
      },
      properties: {
        risk: 'High',
        severity: 8,
        impact: 'Severe'
      }
    }
  ]
}
