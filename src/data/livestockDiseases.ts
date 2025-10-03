// Comprehensive livestock disease database for East Africa
export interface LivestockDisease {
  id: string
  name: string
  localName: string // Swahili name
  scientificName: string
  symptoms: string[]
  causes: string[]
  prevention: string[]
  treatment: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  contagious: boolean
  mortalityRate: string
  economicImpact: string
  commonIn: string[]
  seasonality: string[]
  imagePath: string
  maliScoreImpact: number // How much this disease affects Mali-Score
}

export const livestockDiseases: LivestockDisease[] = [
  {
    id: 'east-coast-fever',
    name: 'East Coast Fever',
    localName: 'Homa ya Pwani',
    scientificName: 'Theileria parva',
    symptoms: [
      'High fever (40-42°C)',
      'Swollen lymph nodes',
      'Loss of appetite',
      'Rapid breathing',
      'Watery eyes and nose',
      'Weakness and depression'
    ],
    causes: [
      'Tick-borne parasite (Rhipicephalus appendiculatus)',
      'Infected tick bites',
      'Poor tick control',
      'Overcrowded grazing areas'
    ],
    prevention: [
      'Regular tick control with acaricides',
      'Rotational grazing',
      'Quarantine new animals',
      'Vaccination where available'
    ],
    treatment: [
      'Immediate veterinary attention required',
      'Anti-parasitic drugs (Buparvaquone)',
      'Supportive care (fluids, anti-inflammatory)',
      'Isolation from other animals'
    ],
    severity: 'critical',
    contagious: false,
    mortalityRate: '60-90% if untreated',
    economicImpact: 'High - can wipe out entire herds',
    commonIn: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'],
    seasonality: ['Rainy season', 'High humidity periods'],
    imagePath: '/images/diseases/east-coast-fever.jpg',
    maliScoreImpact: -40
  },
  {
    id: 'foot-and-mouth',
    name: 'Foot and Mouth Disease',
    localName: 'Ugonjwa wa Miguu na Mdomo',
    scientificName: 'Aphthovirus',
    symptoms: [
      'Blisters on mouth, tongue, and feet',
      'Excessive salivation',
      'Lameness',
      'Loss of appetite',
      'Fever',
      'Reduced milk production'
    ],
    causes: [
      'Highly contagious virus',
      'Direct contact with infected animals',
      'Contaminated feed and water',
      'Human and vehicle transmission'
    ],
    prevention: [
      'Vaccination programs',
      'Quarantine measures',
      'Biosecurity protocols',
      'Regular disinfection'
    ],
    treatment: [
      'Supportive care only',
      'Isolation of infected animals',
      'Antibiotics for secondary infections',
      'Soft, palatable feed'
    ],
    severity: 'high',
    contagious: true,
    mortalityRate: 'Low (1-5%) but high economic impact',
    economicImpact: 'Very High - trade restrictions, production losses',
    commonIn: ['All East African countries'],
    seasonality: ['Year-round', 'Peaks in dry season'],
    imagePath: '/images/diseases/foot-and-mouth.jpg',
    maliScoreImpact: -35
  },
  {
    id: 'mastitis',
    name: 'Mastitis',
    localName: 'Ugonjwa wa Maziwa',
    scientificName: 'Bovine mastitis',
    symptoms: [
      'Swollen, painful udder',
      'Abnormal milk (clots, blood)',
      'Reduced milk production',
      'Fever',
      'Loss of appetite',
      'Lethargy'
    ],
    causes: [
      'Bacterial infection (Staphylococcus, Streptococcus)',
      'Poor milking hygiene',
      'Injured teats',
      'Dirty bedding',
      'Incomplete milking'
    ],
    prevention: [
      'Proper milking hygiene',
      'Clean, dry bedding',
      'Complete milking',
      'Teat dipping after milking',
      'Regular udder health checks'
    ],
    treatment: [
      'Antibiotic therapy',
      'Anti-inflammatory drugs',
      'Frequent milking',
      'Warm compresses',
      'Proper nutrition'
    ],
    severity: 'medium',
    contagious: false,
    mortalityRate: 'Low but affects productivity',
    economicImpact: 'Medium - reduced milk production and quality',
    commonIn: ['All dairy farming areas'],
    seasonality: ['Year-round', 'Worse in wet conditions'],
    imagePath: '/images/diseases/mastitis.jpg',
    maliScoreImpact: -25
  },
  {
    id: 'trypanosomiasis',
    name: 'Trypanosomiasis (Sleeping Sickness)',
    localName: 'Ugonjwa wa Usingizi',
    scientificName: 'Trypanosoma spp.',
    symptoms: [
      'Intermittent fever',
      'Weight loss',
      'Anemia',
      'Swollen lymph nodes',
      'Weakness',
      'Progressive emaciation'
    ],
    causes: [
      'Tsetse fly bites',
      'Trypanosoma parasites',
      'Endemic in tsetse fly areas',
      'Wildlife reservoir hosts'
    ],
    prevention: [
      'Tsetse fly control',
      'Trypanocidal drugs',
      'Avoid tsetse fly areas',
      'Regular screening',
      'Vector control measures'
    ],
    treatment: [
      'Trypanocidal drugs (Diminazene, Isometamidium)',
      'Supportive care',
      'Blood transfusions if severe anemia',
      'Nutritional support'
    ],
    severity: 'high',
    contagious: false,
    mortalityRate: '50-80% if untreated',
    economicImpact: 'High - prevents cattle keeping in affected areas',
    commonIn: ['Tsetse fly belts', 'Game reserves'],
    seasonality: ['Year-round', 'Peaks in wet season'],
    imagePath: '/images/diseases/trypanosomiasis.jpg',
    maliScoreImpact: -30
  },
  {
    id: 'lumpy-skin-disease',
    name: 'Lumpy Skin Disease',
    localName: 'Ugonjwa wa Ngozi ya Matumbo',
    scientificName: 'Capripoxvirus',
    symptoms: [
      'Nodules on skin and mucous membranes',
      'Fever',
      'Loss of appetite',
      'Reduced milk production',
      'Lameness',
      'Difficulty breathing'
    ],
    causes: [
      'Viral infection',
      'Insect vectors (mosquitoes, flies)',
      'Direct contact with infected animals',
      'Contaminated equipment'
    ],
    prevention: [
      'Vaccination',
      'Vector control',
      'Quarantine measures',
      'Biosecurity protocols'
    ],
    treatment: [
      'Supportive care',
      'Antibiotics for secondary infections',
      'Anti-inflammatory drugs',
      'Good nutrition',
      'Isolation'
    ],
    severity: 'medium',
    contagious: true,
    mortalityRate: '1-5% but high morbidity',
    economicImpact: 'High - trade restrictions, production losses',
    commonIn: ['Kenya', 'Tanzania', 'Uganda'],
    seasonality: ['Wet season', 'High vector activity'],
    imagePath: '/images/diseases/lumpy-skin-disease.jpg',
    maliScoreImpact: -20
  },
  {
    id: 'anthrax',
    name: 'Anthrax',
    localName: 'Ugonjwa wa Anthrax',
    scientificName: 'Bacillus anthracis',
    symptoms: [
      'Sudden death (peracute form)',
      'High fever',
      'Difficulty breathing',
      'Swelling around neck and chest',
      'Bloody discharge from natural openings',
      'Convulsions before death'
    ],
    causes: [
      'Bacterial spores in soil',
      'Contaminated feed or water',
      'Wound contamination',
      'Poor disposal of infected carcasses'
    ],
    prevention: [
      'Vaccination',
      'Proper carcass disposal',
      'Avoid grazing in contaminated areas',
      'Quarantine infected areas'
    ],
    treatment: [
      'Immediate antibiotic treatment',
      'Early intervention critical',
      'Supportive care',
      'Isolation of infected animals'
    ],
    severity: 'critical',
    contagious: false,
    mortalityRate: '80-95%',
    economicImpact: 'Very High - zoonotic, trade restrictions',
    commonIn: ['All East African countries'],
    seasonality: ['Dry season', 'Dusty conditions'],
    imagePath: '/images/diseases/anthrax.jpg',
    maliScoreImpact: -50
  }
]

// Financial information for farmers
export interface FinancialService {
  id: string
  name: string
  localName: string
  description: string
  requirements: string[]
  benefits: string[]
  interestRate: string
  repaymentPeriod: string
  collateral: string[]
  applicationProcess: string[]
  providers: string[]
  eligibility: string[]
}

export const financialServices: FinancialService[] = [
  {
    id: 'livestock-loan',
    name: 'Livestock Collateral Loan',
    localName: 'Mkopo wa Mifugo',
    description: 'Use your healthy livestock as collateral to secure loans for farm improvements, inputs, or business expansion.',
    requirements: [
      'Valid livestock ownership documents',
      'Veterinary health certificates',
      'Mali-Score of 70+ for collateral animals',
      'Proof of income or business plan',
      'National ID and KRA PIN'
    ],
    benefits: [
      'Lower interest rates (8-12%)',
      'Flexible repayment terms',
      'No need to sell productive animals',
      'Access to larger loan amounts',
      'Builds credit history'
    ],
    interestRate: '8-12% per annum',
    repaymentPeriod: '6-24 months',
    collateral: [
      'Healthy cattle (Mali-Score 70+)',
      'Farm equipment',
      'Land title deed',
      'Guarantor (optional)'
    ],
    applicationProcess: [
      'Get livestock assessed and scored',
      'Gather required documents',
      'Submit application online or at branch',
      'Loan officer evaluation',
      'Approval and disbursement'
    ],
    providers: [
      'Equity Bank',
      'KCB Bank',
      'Cooperative Bank',
      'SACCOs',
      'Microfinance institutions'
    ],
    eligibility: [
      'Kenyan citizen or resident',
      '18+ years old',
      'Valid livestock ownership',
      'Stable income source',
      'Good credit history'
    ]
  },
  {
    id: 'livestock-insurance',
    name: 'Livestock Insurance',
    localName: 'Bima ya Mifugo',
    description: 'Protect your livestock investment against disease, death, theft, and natural disasters.',
    requirements: [
      'Livestock identification and registration',
      'Veterinary health certificates',
      'Proof of ownership',
      'Farm location details',
      'Premium payment'
    ],
    benefits: [
      'Financial protection against losses',
      'Peace of mind',
      'Access to veterinary services',
      'Compensation for covered events',
      'Risk management support'
    ],
    interestRate: 'N/A - Premium based',
    repaymentPeriod: 'Annual premium',
    collateral: ['N/A'],
    applicationProcess: [
      'Get livestock assessed',
      'Choose coverage level',
      'Complete application form',
      'Pay premium',
      'Receive policy documents'
    ],
    providers: [
      'APA Insurance',
      'CIC Insurance',
      'UAP Insurance',
      'Kenindia Assurance',
      'Agricultural insurance schemes'
    ],
    eligibility: [
      'Valid livestock ownership',
      'Animals meet health standards',
      'Farm in covered area',
      'Compliance with policy terms'
    ]
  }
]

// Local language support
export interface LocalLanguage {
  code: string
  name: string
  region: string
  commonPhrases: { [key: string]: string }
  greetings: string[]
  numbers: { [key: string]: string }
  livestockTerms: { [key: string]: string }
}

export const localLanguages: LocalLanguage[] = [
  {
    code: 'sw',
    name: 'Swahili',
    region: 'East Africa',
    commonPhrases: {
      'hello': 'Hujambo',
      'how_are_you': 'Habari yako?',
      'thank_you': 'Asante',
      'good_morning': 'Habari za asubuhi',
      'good_evening': 'Habari za jioni',
      'yes': 'Ndiyo',
      'no': 'Hapana',
      'help': 'Msaada',
      'emergency': 'Dharura',
      'cattle': 'Ng\'ombe',
      'healthy': 'Mwenye afya',
      'sick': 'Mgonjwa',
      'money': 'Pesa',
      'loan': 'Mkopo',
      'market': 'Soko',
      'price': 'Bei'
    },
    greetings: [
      'Hujambo',
      'Habari yako?',
      'Mambo?',
      'Shikamoo',
      'Hodi'
    ],
    numbers: {
      '1': 'moja',
      '2': 'mbili',
      '3': 'tatu',
      '4': 'nne',
      '5': 'tano',
      '6': 'sita',
      '7': 'saba',
      '8': 'nane',
      '9': 'tisa',
      '10': 'kumi'
    },
    livestockTerms: {
      'cow': 'Ng\'ombe',
      'bull': 'Ng\'ombe dume',
      'calf': 'Mwanang\'ombe',
      'milk': 'Maziwa',
      'meat': 'Nyama',
      'disease': 'Ugonjwa',
      'healthy': 'Mwenye afya',
      'sick': 'Mgonjwa',
      'vaccination': 'Chanjo',
      'medicine': 'Dawa',
      'veterinary': 'Mtaalamu wa mifugo',
      'farm': 'Shamba',
      'grass': 'Nyasi',
      'water': 'Maji',
      'feed': 'Chakula cha mifugo'
    }
  },
  {
    code: 'ki',
    name: 'Kikuyu',
    region: 'Central Kenya',
    commonPhrases: {
      'hello': 'Wamwega',
      'how_are_you': 'Uga?',
      'thank_you': 'Ngaatho',
      'good_morning': 'Wamwega rucin',
      'good_evening': 'Wamwega hwa',
      'yes': 'Eeh',
      'no': 'Nda',
      'help': 'Uthui',
      'emergency': 'Mbere',
      'cattle': 'Ng\'ombe',
      'healthy': 'Mwega',
      'sick': 'Mugongo',
      'money': 'Cira',
      'loan': 'Mkopo',
      'market': 'Soko',
      'price': 'Mbeca'
    },
    greetings: [
      'Wamwega',
      'Uga?',
      'Wamwega rucin',
      'Wamwega hwa'
    ],
    numbers: {
      '1': 'imwe',
      '2': 'igiri',
      '3': 'igithatu',
      '4': 'inya',
      '5': 'ithano',
      '6': 'ithathatu',
      '7': 'mugwanja',
      '8': 'inyanya',
      '9': 'kenda',
      '10': 'ikumi'
    },
    livestockTerms: {
      'cow': 'Ng\'ombe',
      'bull': 'Ng\'ombe dume',
      'calf': 'Mwanang\'ombe',
      'milk': 'Iria',
      'meat': 'Nyama',
      'disease': 'Ugonjwa',
      'healthy': 'Mwega',
      'sick': 'Mugongo',
      'vaccination': 'Chanjo',
      'medicine': 'Muti',
      'veterinary': 'Muganga wa ng\'ombe',
      'farm': 'Mugunda',
      'grass': 'Rucu',
      'water': 'Mai',
      'feed': 'Ria'
    }
  },
  {
    code: 'lu',
    name: 'Luhya',
    region: 'Western Kenya',
    commonPhrases: {
      'hello': 'Mulembe',
      'how_are_you': 'Mulembe?',
      'thank_you': 'Asante',
      'good_morning': 'Mulembe mukhasi',
      'good_evening': 'Mulembe mukhasi',
      'yes': 'Eeh',
      'no': 'Aaye',
      'help': 'Khusa',
      'emergency': 'Khusa',
      'cattle': 'Eng\'ombe',
      'healthy': 'Mukesi',
      'sick': 'Mugongo',
      'money': 'Imbuli',
      'loan': 'Mkopo',
      'market': 'Soko',
      'price': 'Mbeca'
    },
    greetings: [
      'Mulembe',
      'Mulembe mukhasi',
      'Mulembe mukhasi'
    ],
    numbers: {
      '1': 'imwe',
      '2': 'ibili',
      '3': 'isatu',
      '4': 'ine',
      '5': 'itano',
      '6': 'isano',
      '7': 'saba',
      '8': 'munane',
      '9': 'tisa',
      '10': 'ikumi'
    },
    livestockTerms: {
      'cow': 'Eng\'ombe',
      'bull': 'Eng\'ombe dume',
      'calf': 'Mwaneng\'ombe',
      'milk': 'Amachi',
      'meat': 'Inyama',
      'disease': 'Ugonjwa',
      'healthy': 'Mukesi',
      'sick': 'Mugongo',
      'vaccination': 'Chanjo',
      'medicine': 'Muti',
      'veterinary': 'Muganga wa eng\'ombe',
      'farm': 'Mugunda',
      'grass': 'Amakhu',
      'water': 'Amachi',
      'feed': 'Ria'
    }
  }
]
