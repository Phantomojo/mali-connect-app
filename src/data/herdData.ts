export interface Animal {
  id: string
  herderId: string
  herderName: string
  photoUrl: string
  maliScore: {
    bodyCondition: number
    physicalHealth: number
    conformation: number
    ageEstimation: number
    totalScore: number
  }
  submissionStatus: 'Pending' | 'Approved' | 'Rejected' | 'Under Review'
  submissionTime: string
  breed: string
  age: number
  weight: number
  location: string
  healthNotes?: string
  marketValue?: number
  gender: 'Male' | 'Female'
  vaccinationStatus: 'Up to Date' | 'Overdue' | 'Not Vaccinated'
  lastVetCheck: string
  breedingHistory?: {
    pregnancies: number
    lastBreeding: string
    offspring: number
  }
  feedType: 'Grazing' | 'Mixed' | 'Concentrate'
  waterSource: 'Natural' | 'Borehole' | 'Treated'
  temperature: number
  heartRate: number
  respiratoryRate: number
  coatCondition: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  hoofCondition: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  dentalHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  mobility: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  appetite: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  behavior: 'Calm' | 'Active' | 'Aggressive' | 'Lethargic'
  specialNeeds?: string[]
  tags: string[]
}

export const mockHerd: Animal[] = [
  {
    id: 'ANI001',
    herderId: 'herder01',
    herderName: 'Jelani',
    photoUrl: '/images/healthy/cattle-healthy-1.jpg',
    maliScore: {
      bodyCondition: 88,
      physicalHealth: 85,
      conformation: 92,
      ageEstimation: 90,
      totalScore: 88
    },
    submissionStatus: 'Approved',
    submissionTime: '2024-01-15T10:30:00Z',
    breed: 'Ankole',
    age: 3,
    weight: 450,
    location: 'Nairobi County',
    healthNotes: 'Excellent condition, ideal for breeding',
    marketValue: 680,
    gender: 'Male',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-10T09:00:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Mixed',
    waterSource: 'Borehole',
    temperature: 38.5,
    heartRate: 65,
    respiratoryRate: 20,
    coatCondition: 'Excellent',
    hoofCondition: 'Good',
    dentalHealth: 'Excellent',
    mobility: 'Excellent',
    appetite: 'Excellent',
    behavior: 'Calm',
    specialNeeds: [],
    tags: ['Premium', 'Breeding Stock', 'High Value']
  },
  {
    id: 'ANI002',
    herderId: 'herder01',
    herderName: 'Jelani',
    photoUrl: '/images/healthy/cattle-healthy-2.jpg',
    maliScore: {
      bodyCondition: 82,
      physicalHealth: 78,
      conformation: 85,
      ageEstimation: 88,
      totalScore: 82
    },
    submissionStatus: 'Pending',
    submissionTime: '2024-01-16T14:20:00Z',
    breed: 'Boran',
    age: 4,
    weight: 420,
    location: 'Nairobi County',
    healthNotes: 'Good health, minor weight concerns',
    marketValue: 620,
    gender: 'Female',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-12T14:00:00Z',
    breedingHistory: {
      pregnancies: 2,
      lastBreeding: '2023-08-15T00:00:00Z',
      offspring: 1
    },
    feedType: 'Grazing',
    waterSource: 'Natural',
    temperature: 38.2,
    heartRate: 70,
    respiratoryRate: 22,
    coatCondition: 'Good',
    hoofCondition: 'Good',
    dentalHealth: 'Good',
    mobility: 'Good',
    appetite: 'Good',
    behavior: 'Active',
    specialNeeds: ['Weight Management'],
    tags: ['Productive', 'Good Mother', 'Local Breed']
  },
  {
    id: 'ANI003',
    herderId: 'herder01',
    herderName: 'Jelani',
    photoUrl: '/images/healthy/cattle-healthy-3.jpg',
    maliScore: {
      bodyCondition: 95,
      physicalHealth: 92,
      conformation: 88,
      ageEstimation: 85,
      totalScore: 92
    },
    submissionStatus: 'Under Review',
    submissionTime: '2024-01-17T09:15:00Z',
    breed: 'Friesian',
    age: 2,
    weight: 380,
    location: 'Nairobi County',
    healthNotes: 'Premium quality, exceptional body condition',
    marketValue: 750,
    gender: 'Female',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-14T10:30:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Concentrate',
    waterSource: 'Treated',
    temperature: 38.1,
    heartRate: 62,
    respiratoryRate: 18,
    coatCondition: 'Excellent',
    hoofCondition: 'Excellent',
    dentalHealth: 'Excellent',
    mobility: 'Excellent',
    appetite: 'Excellent',
    behavior: 'Calm',
    specialNeeds: [],
    tags: ['Premium', 'Export Quality', 'High Performance']
  },
  {
    id: 'ANI004',
    herderId: 'herder02',
    herderName: 'Asha',
    photoUrl: '/images/healthy/cattle-healthy-4.jpg',
    maliScore: {
      bodyCondition: 75,
      physicalHealth: 80,
      conformation: 78,
      ageEstimation: 82,
      totalScore: 78
    },
    submissionStatus: 'Pending',
    submissionTime: '2024-01-16T16:45:00Z',
    breed: 'Sahiwal',
    age: 5,
    weight: 400,
    location: 'Mombasa County',
    healthNotes: 'Fair condition, needs nutritional improvement',
    marketValue: 580,
    gender: 'Female',
    vaccinationStatus: 'Overdue',
    lastVetCheck: '2023-12-01T08:00:00Z',
    breedingHistory: {
      pregnancies: 3,
      lastBreeding: '2023-06-20T00:00:00Z',
      offspring: 2
    },
    feedType: 'Grazing',
    waterSource: 'Natural',
    temperature: 38.8,
    heartRate: 75,
    respiratoryRate: 25,
    coatCondition: 'Fair',
    hoofCondition: 'Good',
    dentalHealth: 'Fair',
    mobility: 'Good',
    appetite: 'Fair',
    behavior: 'Lethargic',
    specialNeeds: ['Nutritional Support', 'Vaccination'],
    tags: ['Needs Attention', 'Mature', 'Local Breed']
  },
  {
    id: 'ANI005',
    herderId: 'herder02',
    herderName: 'Asha',
    photoUrl: '/images/healthy/cattle-healthy-5.jpg',
    maliScore: {
      bodyCondition: 90,
      physicalHealth: 88,
      conformation: 85,
      ageEstimation: 87,
      totalScore: 88
    },
    submissionStatus: 'Approved',
    submissionTime: '2024-01-15T11:20:00Z',
    breed: 'Zebu',
    age: 3,
    weight: 430,
    location: 'Mombasa County',
    healthNotes: 'Very good health, suitable for market',
    marketValue: 650,
    gender: 'Male',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-11T15:00:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Mixed',
    waterSource: 'Borehole',
    temperature: 38.3,
    heartRate: 68,
    respiratoryRate: 21,
    coatCondition: 'Good',
    hoofCondition: 'Good',
    dentalHealth: 'Good',
    mobility: 'Good',
    appetite: 'Good',
    behavior: 'Active',
    specialNeeds: [],
    tags: ['Market Ready', 'Good Quality', 'Local Breed']
  },
  {
    id: 'ANI006',
    herderId: 'herder02',
    herderName: 'Asha',
    photoUrl: '/images/healthy/cattle-healthy-6.jpg',
    maliScore: {
      bodyCondition: 70,
      physicalHealth: 72,
      conformation: 75,
      ageEstimation: 78,
      totalScore: 72
    },
    submissionStatus: 'Rejected',
    submissionTime: '2024-01-14T13:30:00Z',
    breed: 'Crossbreed',
    age: 6,
    weight: 350,
    location: 'Mombasa County',
    healthNotes: 'Health concerns identified, requires veterinary attention',
    marketValue: 450,
    gender: 'Female',
    vaccinationStatus: 'Not Vaccinated',
    lastVetCheck: '2023-10-15T09:00:00Z',
    breedingHistory: {
      pregnancies: 4,
      lastBreeding: '2023-03-10T00:00:00Z',
      offspring: 3
    },
    feedType: 'Grazing',
    waterSource: 'Natural',
    temperature: 39.2,
    heartRate: 85,
    respiratoryRate: 30,
    coatCondition: 'Poor',
    hoofCondition: 'Fair',
    dentalHealth: 'Poor',
    mobility: 'Fair',
    appetite: 'Poor',
    behavior: 'Lethargic',
    specialNeeds: ['Veterinary Care', 'Nutritional Support', 'Vaccination'],
    tags: ['Health Issues', 'Senior', 'Needs Care']
  },
  {
    id: 'ANI007',
    herderId: 'herder01',
    herderName: 'Jelani',
    photoUrl: '/images/healthy/cattle-healthy-7.jpg',
    maliScore: {
      bodyCondition: 85,
      physicalHealth: 82,
      conformation: 88,
      ageEstimation: 90,
      totalScore: 85
    },
    submissionStatus: 'Pending',
    submissionTime: '2024-01-17T08:00:00Z',
    breed: 'Ankole',
    age: 4,
    weight: 460,
    location: 'Nairobi County',
    healthNotes: 'Good overall health, minor conformation issues',
    marketValue: 640,
    gender: 'Male',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-13T11:00:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Mixed',
    waterSource: 'Borehole',
    temperature: 38.4,
    heartRate: 67,
    respiratoryRate: 19,
    coatCondition: 'Good',
    hoofCondition: 'Good',
    dentalHealth: 'Good',
    mobility: 'Good',
    appetite: 'Good',
    behavior: 'Calm',
    specialNeeds: [],
    tags: ['Good Quality', 'Breeding Potential', 'Local Breed']
  },
  // Additional animals for more comprehensive data
  {
    id: 'ANI008',
    herderId: 'herder03',
    herderName: 'Kipchoge',
    photoUrl: '/images/healthy/cattle-healthy-8.jpg',
    maliScore: {
      bodyCondition: 92,
      physicalHealth: 90,
      conformation: 94,
      ageEstimation: 88,
      totalScore: 91
    },
    submissionStatus: 'Approved',
    submissionTime: '2024-01-16T07:30:00Z',
    breed: 'Charolais',
    age: 3,
    weight: 520,
    location: 'Nakuru County',
    healthNotes: 'Exceptional quality, premium breeding stock',
    marketValue: 850,
    gender: 'Male',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-12T08:00:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Concentrate',
    waterSource: 'Treated',
    temperature: 38.0,
    heartRate: 60,
    respiratoryRate: 17,
    coatCondition: 'Excellent',
    hoofCondition: 'Excellent',
    dentalHealth: 'Excellent',
    mobility: 'Excellent',
    appetite: 'Excellent',
    behavior: 'Calm',
    specialNeeds: [],
    tags: ['Premium', 'Breeding Stock', 'Export Quality', 'High Value']
  },
  {
    id: 'ANI009',
    herderId: 'herder03',
    herderName: 'Kipchoge',
    photoUrl: '/images/healthy/cattle-healthy-1.jpg',
    maliScore: {
      bodyCondition: 78,
      physicalHealth: 75,
      conformation: 80,
      ageEstimation: 85,
      totalScore: 78
    },
    submissionStatus: 'Pending',
    submissionTime: '2024-01-17T12:15:00Z',
    breed: 'Simmental',
    age: 4,
    weight: 480,
    location: 'Nakuru County',
    healthNotes: 'Good health, suitable for breeding program',
    marketValue: 720,
    gender: 'Female',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-14T14:30:00Z',
    breedingHistory: {
      pregnancies: 1,
      lastBreeding: '2023-09-15T00:00:00Z',
      offspring: 1
    },
    feedType: 'Mixed',
    waterSource: 'Borehole',
    temperature: 38.6,
    heartRate: 72,
    respiratoryRate: 23,
    coatCondition: 'Good',
    hoofCondition: 'Good',
    dentalHealth: 'Good',
    mobility: 'Good',
    appetite: 'Good',
    behavior: 'Active',
    specialNeeds: [],
    tags: ['Breeding Female', 'Good Mother', 'High Value']
  },
  {
    id: 'ANI010',
    herderId: 'herder04',
    herderName: 'Wanjiku',
    photoUrl: '/images/healthy/cattle-healthy-2.jpg',
    maliScore: {
      bodyCondition: 65,
      physicalHealth: 68,
      conformation: 70,
      ageEstimation: 75,
      totalScore: 68
    },
    submissionStatus: 'Under Review',
    submissionTime: '2024-01-15T16:45:00Z',
    breed: 'Local Crossbreed',
    age: 7,
    weight: 320,
    location: 'Kisumu County',
    healthNotes: 'Aging animal, requires special care and monitoring',
    marketValue: 380,
    gender: 'Female',
    vaccinationStatus: 'Overdue',
    lastVetCheck: '2023-11-20T10:00:00Z',
    breedingHistory: {
      pregnancies: 5,
      lastBreeding: '2022-12-01T00:00:00Z',
      offspring: 4
    },
    feedType: 'Grazing',
    waterSource: 'Natural',
    temperature: 38.9,
    heartRate: 78,
    respiratoryRate: 28,
    coatCondition: 'Fair',
    hoofCondition: 'Fair',
    dentalHealth: 'Fair',
    mobility: 'Fair',
    appetite: 'Fair',
    behavior: 'Lethargic',
    specialNeeds: ['Senior Care', 'Vaccination', 'Nutritional Support'],
    tags: ['Senior', 'Needs Care', 'Low Value', 'Retirement']
  },
  {
    id: 'ANI011',
    herderId: 'herder04',
    herderName: 'Wanjiku',
    photoUrl: '/images/healthy/cattle-healthy-3.jpg',
    maliScore: {
      bodyCondition: 88,
      physicalHealth: 85,
      conformation: 90,
      ageEstimation: 82,
      totalScore: 87
    },
    submissionStatus: 'Approved',
    submissionTime: '2024-01-14T09:20:00Z',
    breed: 'Holstein',
    age: 2,
    weight: 400,
    location: 'Kisumu County',
    healthNotes: 'Excellent dairy potential, high milk production genetics',
    marketValue: 780,
    gender: 'Female',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-10T13:00:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Concentrate',
    waterSource: 'Treated',
    temperature: 38.2,
    heartRate: 64,
    respiratoryRate: 19,
    coatCondition: 'Excellent',
    hoofCondition: 'Excellent',
    dentalHealth: 'Excellent',
    mobility: 'Excellent',
    appetite: 'Excellent',
    behavior: 'Calm',
    specialNeeds: [],
    tags: ['Dairy Breed', 'High Performance', 'Export Quality', 'Premium']
  },
  {
    id: 'ANI012',
    herderId: 'herder05',
    herderName: 'Ochieng',
    photoUrl: '/images/healthy/cattle-healthy-4.jpg',
    maliScore: {
      bodyCondition: 82,
      physicalHealth: 80,
      conformation: 85,
      ageEstimation: 88,
      totalScore: 82
    },
    submissionStatus: 'Pending',
    submissionTime: '2024-01-17T11:00:00Z',
    breed: 'Angus',
    age: 3,
    weight: 450,
    location: 'Eldoret County',
    healthNotes: 'Good meat quality, suitable for premium markets',
    marketValue: 690,
    gender: 'Male',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-13T16:00:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Mixed',
    waterSource: 'Borehole',
    temperature: 38.3,
    heartRate: 66,
    respiratoryRate: 20,
    coatCondition: 'Good',
    hoofCondition: 'Good',
    dentalHealth: 'Good',
    mobility: 'Good',
    appetite: 'Good',
    behavior: 'Active',
    specialNeeds: [],
    tags: ['Meat Quality', 'Premium Market', 'Good Genetics']
  },
  {
    id: 'ANI013',
    herderId: 'herder05',
    herderName: 'Ochieng',
    photoUrl: '/images/healthy/cattle-healthy-5.jpg',
    maliScore: {
      bodyCondition: 75,
      physicalHealth: 78,
      conformation: 72,
      ageEstimation: 80,
      totalScore: 75
    },
    submissionStatus: 'Rejected',
    submissionTime: '2024-01-16T14:30:00Z',
    breed: 'Crossbreed',
    age: 5,
    weight: 380,
    location: 'Eldoret County',
    healthNotes: 'Health issues detected, requires immediate veterinary attention',
    marketValue: 420,
    gender: 'Female',
    vaccinationStatus: 'Not Vaccinated',
    lastVetCheck: '2023-09-15T11:00:00Z',
    breedingHistory: {
      pregnancies: 2,
      lastBreeding: '2023-05-20T00:00:00Z',
      offspring: 1
    },
    feedType: 'Grazing',
    waterSource: 'Natural',
    temperature: 39.5,
    heartRate: 90,
    respiratoryRate: 35,
    coatCondition: 'Poor',
    hoofCondition: 'Poor',
    dentalHealth: 'Poor',
    mobility: 'Poor',
    appetite: 'Poor',
    behavior: 'Lethargic',
    specialNeeds: ['Emergency Veterinary Care', 'Isolation', 'Special Diet'],
    tags: ['Health Emergency', 'Quarantine', 'Low Value', 'Critical Care']
  },
  {
    id: 'ANI014',
    herderId: 'herder06',
    herderName: 'Akinyi',
    photoUrl: '/images/healthy/cattle-healthy-6.jpg',
    maliScore: {
      bodyCondition: 90,
      physicalHealth: 88,
      conformation: 92,
      ageEstimation: 85,
      totalScore: 89
    },
    submissionStatus: 'Approved',
    submissionTime: '2024-01-15T13:45:00Z',
    breed: 'Hereford',
    age: 3,
    weight: 470,
    location: 'Nyeri County',
    healthNotes: 'Excellent conformation, ideal for breeding and market',
    marketValue: 750,
    gender: 'Male',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-11T09:30:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Mixed',
    waterSource: 'Treated',
    temperature: 38.1,
    heartRate: 63,
    respiratoryRate: 18,
    coatCondition: 'Excellent',
    hoofCondition: 'Excellent',
    dentalHealth: 'Excellent',
    mobility: 'Excellent',
    appetite: 'Excellent',
    behavior: 'Calm',
    specialNeeds: [],
    tags: ['Premium', 'Breeding Stock', 'Export Quality', 'High Performance']
  },
  {
    id: 'ANI015',
    herderId: 'herder06',
    herderName: 'Akinyi',
    photoUrl: '/images/healthy/cattle-healthy-7.jpg',
    maliScore: {
      bodyCondition: 85,
      physicalHealth: 82,
      conformation: 88,
      ageEstimation: 90,
      totalScore: 85
    },
    submissionStatus: 'Pending',
    submissionTime: '2024-01-17T10:15:00Z',
    breed: 'Jersey',
    age: 2,
    weight: 350,
    location: 'Nyeri County',
    healthNotes: 'Good dairy potential, efficient feed conversion',
    marketValue: 650,
    gender: 'Female',
    vaccinationStatus: 'Up to Date',
    lastVetCheck: '2024-01-14T12:00:00Z',
    breedingHistory: {
      pregnancies: 0,
      lastBreeding: 'N/A',
      offspring: 0
    },
    feedType: 'Concentrate',
    waterSource: 'Borehole',
    temperature: 38.4,
    heartRate: 69,
    respiratoryRate: 21,
    coatCondition: 'Good',
    hoofCondition: 'Good',
    dentalHealth: 'Good',
    mobility: 'Good',
    appetite: 'Good',
    behavior: 'Active',
    specialNeeds: [],
    tags: ['Dairy Breed', 'Efficient', 'Good Quality', 'Young']
  }
]
