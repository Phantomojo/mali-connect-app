// Comprehensive African livestock and agricultural data
// Covering major countries across the continent

export const africanWaterSourcesData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8219, -1.2921] // Nairobi, Kenya
      },
      properties: {
        name: 'Nairobi Water Treatment Plant',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [32.5825, 0.3476] // Kampala, Uganda
      },
      properties: {
        name: 'Kampala Water Board',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Uganda'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [30.0596, -1.9441] // Dar es Salaam, Tanzania
      },
      properties: {
        name: 'Dar es Salaam Water Authority',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Tanzania'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [30.0619, -1.9441] // Kigali, Rwanda
      },
      properties: {
        name: 'Kigali Water Supply',
        type: 'water',
        capacity: 'Medium',
        status: 'Active',
        country: 'Rwanda'
      }
    },
    // West Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-1.6197, 6.5244] // Accra, Ghana
      },
      properties: {
        name: 'Accra Water Company',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [2.3522, 48.8566] // Lagos, Nigeria
      },
      properties: {
        name: 'Lagos Water Corporation',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Nigeria'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-4.0083, 5.3600] // Abidjan, Côte d\'Ivoire
      },
      properties: {
        name: 'Abidjan Water Supply',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Côte d\'Ivoire'
      }
    },
    // North Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.2357, 30.0444] // Cairo, Egypt
      },
      properties: {
        name: 'Cairo Water Authority',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Egypt'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-6.8498, 34.0209] // Casablanca, Morocco
      },
      properties: {
        name: 'Casablanca Water Management',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'Morocco'
      }
    },
    // Southern Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [28.0473, -26.2041] // Johannesburg, South Africa
      },
      properties: {
        name: 'Johannesburg Water',
        type: 'water',
        capacity: 'High',
        status: 'Active',
        country: 'South Africa'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.0335, -17.8252] // Harare, Zimbabwe
      },
      properties: {
        name: 'Harare Water Supply',
        type: 'water',
        capacity: 'Medium',
        status: 'Active',
        country: 'Zimbabwe'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [25.7471, -24.6541] // Gaborone, Botswana
      },
      properties: {
        name: 'Gaborone Water Utilities',
        type: 'water',
        capacity: 'Medium',
        status: 'Active',
        country: 'Botswana'
      }
    }
  ]
}

export const africanLivestockMarketsData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.3] // Nairobi, Kenya
      },
      properties: {
        name: 'Nairobi Livestock Market',
        type: 'market',
        size: 'Large',
        weeklyVolume: '1000+ animals',
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [32.6, 0.3] // Kampala, Uganda
      },
      properties: {
        name: 'Kampala Central Market',
        type: 'market',
        size: 'Large',
        weeklyVolume: '800+ animals',
        country: 'Uganda'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [30.0, -1.9] // Dar es Salaam, Tanzania
      },
      properties: {
        name: 'Dar es Salaam Livestock Exchange',
        type: 'market',
        size: 'Large',
        weeklyVolume: '1200+ animals',
        country: 'Tanzania'
      }
    },
    // West Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-1.6, 6.5] // Accra, Ghana
      },
      properties: {
        name: 'Accra Livestock Market',
        type: 'market',
        size: 'Large',
        weeklyVolume: '900+ animals',
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [2.3, 48.8] // Lagos, Nigeria
      },
      properties: {
        name: 'Lagos Cattle Market',
        type: 'market',
        size: 'Very Large',
        weeklyVolume: '2000+ animals',
        country: 'Nigeria'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-4.0, 5.3] // Abidjan, Côte d\'Ivoire
      },
      properties: {
        name: 'Abidjan Livestock Center',
        type: 'market',
        size: 'Large',
        weeklyVolume: '700+ animals',
        country: 'Côte d\'Ivoire'
      }
    },
    // North Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.2, 30.0] // Cairo, Egypt
      },
      properties: {
        name: 'Cairo Livestock Market',
        type: 'market',
        size: 'Very Large',
        weeklyVolume: '1500+ animals',
        country: 'Egypt'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-6.8, 34.0] // Casablanca, Morocco
      },
      properties: {
        name: 'Casablanca Animal Market',
        type: 'market',
        size: 'Large',
        weeklyVolume: '600+ animals',
        country: 'Morocco'
      }
    },
    // Southern Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [28.0, -26.2] // Johannesburg, South Africa
      },
      properties: {
        name: 'Johannesburg Livestock Exchange',
        type: 'market',
        size: 'Very Large',
        weeklyVolume: '1800+ animals',
        country: 'South Africa'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.0, -17.8] // Harare, Zimbabwe
      },
      properties: {
        name: 'Harare Livestock Market',
        type: 'market',
        size: 'Medium',
        weeklyVolume: '400+ animals',
        country: 'Zimbabwe'
      }
    }
  ]
}

export const africanVeterinaryServicesData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.3] // Nairobi, Kenya
      },
      properties: {
        name: 'Nairobi Veterinary Hospital',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Emergency Care', 'Vaccinations'],
        rating: 4.8,
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [32.6, 0.3] // Kampala, Uganda
      },
      properties: {
        name: 'Kampala Animal Health Center',
        type: 'hospital',
        services: ['General Health', 'Surgery', 'Preventive Care'],
        rating: 4.6,
        country: 'Uganda'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [30.0, -1.9] // Dar es Salaam, Tanzania
      },
      properties: {
        name: 'Dar es Salaam Veterinary Clinic',
        type: 'clinic',
        services: ['General Health', 'Vaccinations', 'Disease Control'],
        rating: 4.5,
        country: 'Tanzania'
      }
    },
    // West Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-1.6, 6.5] // Accra, Ghana
      },
      properties: {
        name: 'Accra Veterinary Services',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Emergency Care'],
        rating: 4.7,
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [2.3, 48.8] // Lagos, Nigeria
      },
      properties: {
        name: 'Lagos Animal Hospital',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Preventive Care', 'Emergency Care'],
        rating: 4.9,
        country: 'Nigeria'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-4.0, 5.3] // Abidjan, Côte d\'Ivoire
      },
      properties: {
        name: 'Abidjan Veterinary Center',
        type: 'clinic',
        services: ['General Health', 'Vaccinations', 'Disease Control'],
        rating: 4.4,
        country: 'Côte d\'Ivoire'
      }
    },
    // North Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.2, 30.0] // Cairo, Egypt
      },
      properties: {
        name: 'Cairo Veterinary Hospital',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Emergency Care', 'Research'],
        rating: 4.8,
        country: 'Egypt'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-6.8, 34.0] // Casablanca, Morocco
      },
      properties: {
        name: 'Casablanca Animal Health Center',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Preventive Care'],
        rating: 4.6,
        country: 'Morocco'
      }
    },
    // Southern Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [28.0, -26.2] // Johannesburg, South Africa
      },
      properties: {
        name: 'Johannesburg Veterinary Hospital',
        type: 'hospital',
        services: ['Surgery', 'Diagnostics', 'Emergency Care', 'Specialist Care'],
        rating: 4.9,
        country: 'South Africa'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.0, -17.8] // Harare, Zimbabwe
      },
      properties: {
        name: 'Harare Veterinary Clinic',
        type: 'clinic',
        services: ['General Health', 'Vaccinations', 'Disease Control'],
        rating: 4.3,
        country: 'Zimbabwe'
      }
    }
  ]
}

export const africanWeatherStationsData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.3] // Nairobi, Kenya
      },
      properties: {
        name: 'Nairobi Weather Station',
        type: 'weather',
        temperature: 22,
        humidity: 65,
        rainfall: 850,
        windSpeed: 12,
        status: 'Active',
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [32.6, 0.3] // Kampala, Uganda
      },
      properties: {
        name: 'Kampala Meteorological Station',
        type: 'weather',
        temperature: 25,
        humidity: 70,
        rainfall: 1200,
        windSpeed: 8,
        status: 'Active',
        country: 'Uganda'
      }
    },
    // West Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-1.6, 6.5] // Accra, Ghana
      },
      properties: {
        name: 'Accra Weather Station',
        type: 'weather',
        temperature: 28,
        humidity: 80,
        rainfall: 2000,
        windSpeed: 15,
        status: 'Active',
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [2.3, 48.8] // Lagos, Nigeria
      },
      properties: {
        name: 'Lagos Meteorological Center',
        type: 'weather',
        temperature: 30,
        humidity: 85,
        rainfall: 1800,
        windSpeed: 18,
        status: 'Active',
        country: 'Nigeria'
      }
    },
    // North Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.2, 30.0] // Cairo, Egypt
      },
      properties: {
        name: 'Cairo Weather Station',
        type: 'weather',
        temperature: 26,
        humidity: 45,
        rainfall: 25,
        windSpeed: 20,
        status: 'Active',
        country: 'Egypt'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-6.8, 34.0] // Casablanca, Morocco
      },
      properties: {
        name: 'Casablanca Meteorological Station',
        type: 'weather',
        temperature: 20,
        humidity: 60,
        rainfall: 400,
        windSpeed: 25,
        status: 'Active',
        country: 'Morocco'
      }
    },
    // Southern Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [28.0, -26.2] // Johannesburg, South Africa
      },
      properties: {
        name: 'Johannesburg Weather Center',
        type: 'weather',
        temperature: 18,
        humidity: 55,
        rainfall: 600,
        windSpeed: 12,
        status: 'Active',
        country: 'South Africa'
      }
    }
  ]
}

export const africanFeedSuppliersData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.5, -1.4] // Kenya
      },
      properties: {
        name: 'Kenya Feed Supply Co.',
        type: 'feed',
        products: ['Hay', 'Silage', 'Concentrates', 'Mineral Supplements'],
        capacity: 'High',
        rating: 4.7,
        deliveryRadius: 50,
        status: 'Open',
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [32.3, 0.1] // Uganda
      },
      properties: {
        name: 'Uganda Animal Nutrition',
        type: 'feed',
        products: ['Grass Seeds', 'Fertilizers', 'Feed Pellets'],
        capacity: 'Medium',
        rating: 4.5,
        deliveryRadius: 30,
        status: 'Open',
        country: 'Uganda'
      }
    },
    // West Africa
    {
      type: 'Feature' as const,
        geometry: {
        type: 'Point' as const,
        coordinates: [-1.4, 6.3] // Ghana
      },
      properties: {
        name: 'Ghana Feed Mill',
        type: 'feed',
        products: ['Maize Silage', 'Soybean Meal', 'Wheat Bran'],
        capacity: 'High',
        rating: 4.8,
        deliveryRadius: 60,
        status: 'Open',
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [2.1, 48.6] // Nigeria
      },
      properties: {
        name: 'Nigeria Feed Corporation',
        type: 'feed',
        products: ['Hay', 'Silage', 'Concentrates', 'Supplements'],
        capacity: 'Very High',
        rating: 4.9,
        deliveryRadius: 100,
        status: 'Open',
        country: 'Nigeria'
      }
    },
    // North Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.0, 29.8] // Egypt
      },
      properties: {
        name: 'Egypt Feed Solutions',
        type: 'feed',
        products: ['Alfalfa', 'Barley', 'Corn Silage'],
        capacity: 'High',
        rating: 4.6,
        deliveryRadius: 80,
        status: 'Open',
        country: 'Egypt'
      }
    },
    // Southern Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [27.8, -26.0] // South Africa
      },
      properties: {
        name: 'South Africa Feed Co.',
        type: 'feed',
        products: ['Grass Pellets', 'Lucerne', 'Concentrates'],
        capacity: 'Very High',
        rating: 4.9,
        deliveryRadius: 120,
        status: 'Open',
        country: 'South Africa'
      }
    }
  ]
}

export const africanTransportHubsData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.3] // Nairobi, Kenya
      },
      properties: {
        name: 'Nairobi Livestock Transport Hub',
        type: 'transport',
        services: ['Livestock Transport', 'Cold Storage', 'Loading Facilities'],
        capacity: 'Large',
        rating: 4.6,
        operatingHours: '24/7',
        status: 'Active',
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [32.6, 0.3] // Kampala, Uganda
      },
      properties: {
        name: 'Kampala Transport Center',
        type: 'transport',
        services: ['Regional Transport', 'Loading Bay'],
        capacity: 'Medium',
        rating: 4.3,
        operatingHours: '6AM-8PM',
        status: 'Active',
        country: 'Uganda'
      }
    },
    // West Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-1.6, 6.5] // Accra, Ghana
      },
      properties: {
        name: 'Accra Livestock Terminal',
        type: 'transport',
        services: ['Livestock Transport', 'Cold Storage'],
        capacity: 'Large',
        rating: 4.5,
        operatingHours: '24/7',
        status: 'Active',
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [2.3, 48.8] // Lagos, Nigeria
      },
      properties: {
        name: 'Lagos Transport Hub',
        type: 'transport',
        services: ['Livestock Transport', 'Cold Storage', 'Loading Facilities', 'Export Terminal'],
        capacity: 'Very Large',
        rating: 4.8,
        operatingHours: '24/7',
        status: 'Active',
        country: 'Nigeria'
      }
    },
    // North Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.2, 30.0] // Cairo, Egypt
      },
      properties: {
        name: 'Cairo Livestock Terminal',
        type: 'transport',
        services: ['Livestock Transport', 'Cold Storage', 'Export Facilities'],
        capacity: 'Large',
        rating: 4.7,
        operatingHours: '24/7',
        status: 'Active',
        country: 'Egypt'
      }
    },
    // Southern Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [28.0, -26.2] // Johannesburg, South Africa
      },
      properties: {
        name: 'Johannesburg Transport Center',
        type: 'transport',
        services: ['Livestock Transport', 'Cold Storage', 'Loading Facilities', 'Export Terminal'],
        capacity: 'Very Large',
        rating: 4.9,
        operatingHours: '24/7',
        status: 'Active',
        country: 'South Africa'
      }
    }
  ]
}

export const africanProcessingFacilitiesData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [36.8, -1.2] // Nairobi, Kenya
      },
      properties: {
        name: 'Nairobi Meat Processing Plant',
        type: 'processing',
        services: ['Slaughter', 'Processing', 'Packaging', 'Cold Storage'],
        capacity: 'Large',
        rating: 4.9,
        certifications: ['HACCP', 'ISO 22000'],
        status: 'Active',
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [32.6, 0.2] // Kampala, Uganda
      },
      properties: {
        name: 'Kampala Dairy Processing',
        type: 'processing',
        services: ['Milk Processing', 'Cheese Production', 'Yogurt'],
        capacity: 'Medium',
        rating: 4.4,
        certifications: ['HACCP'],
        status: 'Active',
        country: 'Uganda'
      }
    },
    // West Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [-1.6, 6.4] // Accra, Ghana
      },
      properties: {
        name: 'Accra Processing Facility',
        type: 'processing',
        services: ['Slaughter', 'Processing', 'Packaging'],
        capacity: 'Large',
        rating: 4.6,
        certifications: ['HACCP', 'ISO 22000'],
        status: 'Active',
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [2.3, 48.7] // Lagos, Nigeria
      },
      properties: {
        name: 'Lagos Processing Complex',
        type: 'processing',
        services: ['Slaughter', 'Processing', 'Packaging', 'Cold Storage', 'Export'],
        capacity: 'Very Large',
        rating: 4.9,
        certifications: ['HACCP', 'ISO 22000', 'Halal'],
        status: 'Active',
        country: 'Nigeria'
      }
    },
    // North Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [31.2, 29.9] // Cairo, Egypt
      },
      properties: {
        name: 'Cairo Processing Plant',
        type: 'processing',
        services: ['Slaughter', 'Processing', 'Packaging', 'Export'],
        capacity: 'Large',
        rating: 4.8,
        certifications: ['HACCP', 'Halal'],
        status: 'Active',
        country: 'Egypt'
      }
    },
    // Southern Africa
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [28.0, -26.1] // Johannesburg, South Africa
      },
      properties: {
        name: 'Johannesburg Processing Center',
        type: 'processing',
        services: ['Slaughter', 'Processing', 'Packaging', 'Cold Storage', 'Export'],
        capacity: 'Very Large',
        rating: 4.9,
        certifications: ['HACCP', 'ISO 22000', 'SABS'],
        status: 'Active',
        country: 'South Africa'
      }
    }
  ]
}

// African pasture quality data covering different regions
export const africanPastureQualityData = {
  type: 'FeatureCollection' as const,
  features: [
    // East Africa - Good pasture
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [36.0, -1.0], [36.5, -1.0], [36.5, -1.5], [36.0, -1.5], [36.0, -1.0]
        ]]
      },
      properties: {
        quality: 'Good',
        area: 'Kenya Highlands',
        description: 'High-quality pasture with good grass coverage',
        country: 'Kenya'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [32.0, 0.0], [32.5, 0.0], [32.5, -0.5], [32.0, -0.5], [32.0, 0.0]
        ]]
      },
      properties: {
        quality: 'Good',
        area: 'Uganda Central',
        description: 'Fertile pasture land with good rainfall',
        country: 'Uganda'
      }
    },
    // West Africa - Mixed quality
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [-1.5, 6.0], [-1.0, 6.0], [-1.0, 6.5], [-1.5, 6.5], [-1.5, 6.0]
        ]]
      },
      properties: {
        quality: 'Fair',
        area: 'Ghana Central',
        description: 'Moderate pasture quality with seasonal variations',
        country: 'Ghana'
      }
    },
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [2.0, 48.5], [2.5, 48.5], [2.5, 49.0], [2.0, 49.0], [2.0, 48.5]
        ]]
      },
      properties: {
        quality: 'Poor',
        area: 'Nigeria North',
        description: 'Degraded pasture requiring restoration',
        country: 'Nigeria'
      }
    },
    // North Africa - Arid regions
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [31.0, 29.5], [31.5, 29.5], [31.5, 30.0], [31.0, 30.0], [31.0, 29.5]
        ]]
      },
      properties: {
        quality: 'Poor',
        area: 'Egypt Delta',
        description: 'Limited pasture due to arid conditions',
        country: 'Egypt'
      }
    },
    // Southern Africa - Good pasture
    {
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [27.5, -26.0], [28.0, -26.0], [28.0, -26.5], [27.5, -26.5], [27.5, -26.0]
        ]]
      },
      properties: {
        quality: 'Good',
        area: 'South Africa Highveld',
        description: 'Excellent pasture with diverse grass species',
        country: 'South Africa'
      }
    }
  ]
}
