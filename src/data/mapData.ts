// Mock geospatial data for the Ecosystem Map
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
