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
    marketValue: 680
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
    marketValue: 620
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
    marketValue: 750
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
    marketValue: 580
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
    marketValue: 650
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
    marketValue: 450
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
    marketValue: 640
  }
]
