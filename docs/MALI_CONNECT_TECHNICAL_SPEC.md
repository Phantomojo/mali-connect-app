# Mali-Connect: Technical Specifications

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling
- **Three.js** with react-three-fiber for 3D graphics
- **@react-three/drei** for Three.js helpers and components

### AI & Machine Learning
- **Groq API** - High-performance AI inference platform
- **Llama 3.1 70B** - Large language model for livestock analysis
- **Custom Disease Database** - Comprehensive livestock health knowledge base
- **Fallback AI System** - Offline capabilities when AI services unavailable

### 3D Graphics Pipeline
- **3D Models:** GLB format for optimal loading
- **Rendering:** WebGL via Three.js
- **Interactions:** OrbitControls for camera manipulation
- **Lighting:** PBR (Physically Based Rendering) materials
- **Performance:** LOD (Level of Detail) for mobile optimization

### State Management
- **React Context API** for global state
- **Custom Hooks** for component logic
- **Local Storage** for demo data persistence
- **Theme Context** for dark/light mode management

## 📱 Component Architecture

### Core Components

#### 1. CattleViewer3D.tsx
```typescript
interface CattleViewer3DProps {
  cattleModel: GLTFModel;
  maliScore: MaliScore;
  diagnosticMarkers: DiagnosticMarker[];
  onModelLoad: (model: GLTFModel) => void;
}

// Features:
// - 3D model rendering with Three.js
// - Camera controls (orbit, zoom, pan)
// - Lighting setup for optimal viewing
// - Diagnostic markers overlay
// - Mali-Score visualization
// - Mobile-optimized touch controls
```

#### 2. AIAnalysis.tsx
```typescript
interface AIAnalysisProps {
  analysis: AIImageAnalysis | null;
  isLoading: boolean;
  selectedImage: any;
  apiStatus: { groq: boolean; huggingFace: boolean } | null;
}

// Features:
// - Real AI integration with Groq API
// - Disease detection and analysis
// - Health assessment scoring
// - Fallback to mock data when AI unavailable
// - Loading states and error handling
```

#### 3. MaliChat.tsx
```typescript
interface MaliChatProps {
  isOpen: boolean;
  onClose: () => void;
  maliScore: MaliScore;
  selectedImage: any;
}

// Features:
// - AI-powered chat interface
// - Context-aware responses
// - Livestock expertise integration
// - Real-time conversation flow
// - Mobile-optimized chat UI
```

#### 4. SmsSimulator.tsx
```typescript
interface SmsSimulatorProps {
  // No props - self-contained component
}

// Features:
// - SMS interface simulation
// - Local language support (Swahili, Kikuyu, Luhya)
// - Quick command system
// - Disease information lookup
// - Financial services information
// - Offline functionality
```

#### 5. ImageSelector.tsx
```typescript
interface ImageSelectorProps {
  onImageSelect: (imageId: string) => void;
  selectedImage: string | null;
}

// Features:
// - Pre-defined cattle image gallery
// - Image preview with metadata
// - Selection state management
// - Mobile-optimized touch interface
// - Disease-specific image categorization
```

#### 6. MaliScoreDisplay.tsx
```typescript
interface MaliScoreDisplayProps {
  score: MaliScore;
  analysis: AIImageAnalysis | null;
}

// Features:
// - Score visualization with charts
// - Metric breakdown display
// - Market value calculation
// - Color-coded health indicators
// - Disease impact visualization
```

#### 7. EcosystemPanel.tsx
```typescript
interface EcosystemPanelProps {
  maliScore: number;
  marketValue: number;
  onActionSelect: (action: EcosystemAction) => void;
}

// Features:
// - "What's Next?" action buttons
// - Market value display
// - Insurance and credit options
// - Hover tooltips and explanations
// - Financial services integration
```

#### 8. EnhancedFinancialServices.tsx
```typescript
interface EnhancedFinancialServicesProps {
  viewMode: 'herder' | 'processor';
  selectedAnimal: Animal | null;
}

// Features:
// - Agricultural loan information
// - Insurance product details
// - Market analysis integration
// - Financial planning tools
// - Local language support
```

## 🎯 Data Models

### MaliScore Interface
```typescript
interface MaliScore {
  bodyCondition: number;        // 0-100
  physicalHealth: number;       // 0-100
  conformation: number;         // 0-100
  ageEstimation: number;        // 0-100
  totalScore: number;           // Weighted composite (0-100)
  confidence: number;           // AI confidence level (0-100)
  analysis: string;             // Detailed analysis text
}
```

### AI Image Analysis Interface
```typescript
interface AIImageAnalysis {
  bodyCondition: number;
  physicalHealth: number;
  conformation: number;
  ageEstimation: number;
  totalScore: number;
  confidence: number;
  analysis: string;
  diseaseDetection: {
    detected: boolean;
    diseases: string[];
    confidence: number;
    recommendations: string[];
    severity: 'low' | 'medium' | 'high' | 'critical';
  };
}
```

### Disease Database Interface
```typescript
interface LivestockDisease {
  id: string;
  name: string;
  localName: string;
  scientificName: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  contagious: boolean;
  mortalityRate: string;
  economicImpact: string;
  commonIn: string[];
  seasonality: string[];
  imagePath: string;
  maliScoreImpact: number;
}
```

### Local Language Interface
```typescript
interface LocalLanguage {
  code: string;
  name: string;
  region: string;
  commonPhrases: { [key: string]: string };
  livestockTerms: { [key: string]: string };
}
```

### Financial Service Interface
```typescript
interface FinancialService {
  id: string;
  name: string;
  localName: string;
  type: 'loan' | 'insurance';
  description: string;
  interestRate?: string;
  requirements: string[];
  benefits: string[];
  providers: string[];
  contact: string;
}
```

### Market Data Interface
```typescript
interface MarketHub {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  basePrice: number;
  demandMultiplier: number;
  distance: number; // from selected location
}

interface VegetationData {
  lat: number;
  lng: number;
  vegetationIndex: number; // 0-1 scale
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  color: string; // Hex color for visualization
}
```

### Assessment Data Interface
```typescript
interface AssessmentCase {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  expectedScore: MaliScore;
  marketValue: number;
  diagnosticMarkers: DiagnosticMarker[];
  modelPath: string; // Path to 3D model
}

interface DiagnosticMarker {
  id: string;
  position: Vector3;
  type: 'bodyCondition' | 'physicalHealth' | 'conformation' | 'ageEstimation';
  description: string;
  severity: 'low' | 'medium' | 'high';
  color: string;
}
```

## 🤖 AI Integration Architecture

### Groq API Integration
```typescript
// AI Service Configuration
const AI_SERVICE_CONFIG = {
  groq: {
    apiKey: process.env.VITE_GROQ_API_KEY,
    model: 'llama-3.1-70b-versatile',
    maxTokens: 1000,
    temperature: 0.7
  },
  fallback: {
    enabled: true,
    responseDelay: 2000
  }
};

// AI Analysis Pipeline
const analyzeImage = async (imageUrl: string, description: string) => {
  try {
    // 1. Send image to Groq API
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a livestock health expert...'
        },
        {
          role: 'user',
          content: `Analyze this cattle image: ${description}`
        }
      ]
    });
    
    // 2. Parse AI response
    const analysis = parseAIResponse(response.choices[0].message.content);
    
    // 3. Return structured analysis
    return analysis;
  } catch (error) {
    // 4. Fallback to mock data
    return getFallbackAnalysis();
  }
};
```

### Disease Detection System
```typescript
// Disease Detection Pipeline
const detectDiseases = (analysis: string, imageData: any) => {
  const detectedDiseases = [];
  const confidence = 0.85;
  
  // 1. Check against disease database
  for (const disease of livestockDiseases) {
    const matchScore = calculateDiseaseMatch(analysis, disease);
    if (matchScore > 0.7) {
      detectedDiseases.push({
        name: disease.name,
        confidence: matchScore,
        severity: disease.severity,
        recommendations: disease.treatment
      });
    }
  }
  
  return {
    detected: detectedDiseases.length > 0,
    diseases: detectedDiseases,
    confidence,
    recommendations: generateRecommendations(detectedDiseases)
  };
};
```

### Chat AI System
```typescript
// Chat AI Configuration
const CHAT_SYSTEM_PROMPT = `
You are Mali AI, an expert livestock assistant specializing in:
- Livestock health assessment and disease diagnosis
- Market analysis and pricing information
- Farming best practices and recommendations
- Financial services for farmers
- Local language support for East African farmers

Provide helpful, accurate, and practical advice for livestock farmers.
`;

const chatWithAI = async (message: string, context: any) => {
  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: CHAT_SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    return generateFallbackResponse(message);
  }
};
```

## 🎨 3D Model Specifications

### Model Requirements
- **Format:** GLB (Binary glTF)
- **Polygon Count:** <50,000 triangles for mobile performance
- **Textures:** 1024x1024 maximum resolution
- **Materials:** PBR materials for realistic rendering
- **Animations:** Idle, walking, and assessment poses

### Model Variations
1. **Healthy Cattle:** Full body condition, good posture
2. **Underweight:** Visible ribs, poor muscle tone
3. **Sick/Unhealthy:** Dull coat, poor posture, visible issues
4. **Old Cattle:** Aged features, wear patterns
5. **Young Cattle:** Juvenile proportions, smooth features
6. **Disease-Specific:** Models showing specific disease symptoms

### Diagnostic Markers
- **Body Condition:** Rib visibility, muscle definition
- **Physical Health:** Coat quality, skin condition
- **Conformation:** Leg structure, back alignment
- **Age Estimation:** Facial features, dental condition
- **Disease Markers:** Visual indicators of specific diseases

## 📊 Market Value Calculation

### Enhanced Pricing Algorithm
```typescript
const calculateMarketValue = (
  maliScore: number,
  diseaseImpact: number = 0,
  basePrice: number = 500,
  marketDemand: number = 1.1,
  locationFactor: number = 1.0
): number => {
  const scoreMultiplier = maliScore / 100;
  const diseasePenalty = diseaseImpact * 0.1; // 10% penalty per disease
  const finalPrice = basePrice * scoreMultiplier * (1 - diseasePenalty) * marketDemand * locationFactor;
  return Math.round(finalPrice);
};
```

### Market Factors
- **Base Price:** $500 (average cattle price in Kenya)
- **Score Multiplier:** Mali-Score / 100
- **Disease Penalty:** 10% reduction per detected disease
- **Demand Multiplier:** 1.0 - 1.3 based on market conditions
- **Location Factor:** 0.8 - 1.2 based on distance to markets

## 🌍 Localization System

### Language Support
```typescript
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', region: 'Global' },
  { code: 'sw', name: 'Swahili', region: 'East Africa' },
  { code: 'ki', name: 'Kikuyu', region: 'Kenya' },
  { code: 'lu', name: 'Luhya', region: 'Kenya' }
];

const translate = (text: string, language: string) => {
  const lang = localLanguages.find(l => l.code === language);
  if (!lang) return text;
  
  return lang.commonPhrases[text] || text;
};
```

### SMS Command System
```typescript
const SMS_COMMANDS = {
  'HEALTH': 'Get health information',
  'DISEASES': 'List common diseases',
  'LOANS': 'Financial services information',
  'MARKET': 'Current market prices',
  'HELP': 'Available commands'
};

const processSMSCommand = (command: string, language: string) => {
  const translatedCommand = translate(command, language);
  const response = generateSMSResponse(translatedCommand, language);
  return response;
};
```

## 🎬 Animation Specifications

### AI Analysis Animation
1. **Loading Phase (0-2s):** Spinning loader with "Analyzing..." text
2. **Processing Phase (2-4s):** Progress bar with analysis steps
3. **Results Phase (4-5s):** Score calculation and display
4. **3D Model Phase (5-6s):** 3D model loading and marker placement
5. **Disease Detection (6-7s):** Disease analysis and recommendations

### 3D Model Animations
- **Idle Animation:** Subtle breathing and head movement
- **Assessment Pose:** Static pose optimized for marker placement
- **Marker Highlighting:** Pulsing effect for diagnostic markers
- **Score Visualization:** Animated score counter and progress bars
- **Disease Visualization:** Color changes for disease indicators

## 📱 Mobile Optimization

### Performance Targets
- **Initial Load:** <3 seconds on 3G
- **3D Rendering:** 60fps on mid-range devices
- **Memory Usage:** <100MB peak
- **Battery Impact:** Minimal during assessment
- **AI Response Time:** <2 seconds for chat responses

### Responsive Design
- **Breakpoints:** 320px, 768px, 1024px, 1440px
- **Touch Targets:** Minimum 44px for interactive elements
- **Gesture Support:** Pinch to zoom, pan to rotate
- **Orientation:** Portrait and landscape support
- **Chat Interface:** Mobile-optimized chat bubbles

### Network Optimization
- **Progressive Loading:** Essential features first
- **Asset Compression:** Optimized textures and models
- **Caching Strategy:** Local storage for frequently used data
- **Offline Mode:** Core functionality without internet
- **AI Fallback:** Local responses when AI unavailable

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Groq API key (optional)

### Installation
```bash
# Clone repository
git clone <repository-url>
cd mali-connect

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```env
# AI Services (Optional - app works without these)
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# App Configuration
VITE_APP_NAME=Mali-Connect
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

### Project Structure
```
mali-connect/
├── public/
│   ├── models/           # 3D model files (.glb)
│   ├── images/          # Cattle images
│   │   ├── healthy/     # Healthy cattle images
│   │   ├── sick/        # Sick cattle images
│   │   ├── diseases/    # Disease-specific images
│   │   └── underweight/ # Underweight cattle images
│   └── data/            # Static data files
├── src/
│   ├── components/      # React components
│   │   ├── AI/         # AI-related components
│   │   ├── 3D/         # 3D visualization components
│   │   ├── UI/         # UI components
│   │   └── Forms/      # Form components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── contexts/       # React contexts
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Hardcoded data
│   │   ├── livestockDiseases.ts
│   │   ├── herdData.ts
│   │   └── marketData.ts
│   └── App.tsx         # Main application
├── docs/               # Documentation
├── scripts/            # Build and deployment scripts
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Deployment Configuration

### Vercel Deployment
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_GROQ_API_KEY": "@groq-api-key",
    "VITE_HUGGINGFACE_API_KEY": "@huggingface-api-key"
  }
}
```

### Netlify Deployment
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## 🧪 Testing Strategy

### Unit Testing
- **Framework:** Vitest
- **Coverage:** 80%+ for utility functions
- **Components:** React Testing Library
- **AI Services:** Mock API responses

### Integration Testing
- **3D Rendering:** Three.js scene testing
- **User Flows:** Complete assessment workflow
- **Performance:** Load time and frame rate testing
- **AI Integration:** Chat and analysis testing

### Manual Testing
- **Devices:** iOS Safari, Android Chrome
- **Networks:** 3G, 4G, WiFi
- **Screen Sizes:** 320px to 1440px
- **Languages:** All supported local languages

## 📈 Performance Monitoring

### Metrics to Track
- **Load Time:** Initial page load
- **3D Performance:** FPS during rendering
- **Memory Usage:** Peak memory consumption
- **User Interactions:** Click/touch response time
- **AI Response Time:** Chat and analysis response times
- **Offline Performance:** Fallback system effectiveness

### Optimization Techniques
- **Model LOD:** Different detail levels based on distance
- **Texture Compression:** Optimized image formats
- **Code Splitting:** Lazy loading of components
- **Caching:** Aggressive caching of static assets
- **AI Caching:** Cache AI responses for similar queries
- **Progressive Enhancement:** Core features work without AI

## 🔒 Security Considerations

### API Security
- **API Key Protection:** Environment variables only
- **Rate Limiting:** Prevent API abuse
- **Input Validation:** Sanitize user inputs
- **Error Handling:** Secure error messages

### Data Privacy
- **Image Processing:** No permanent storage of user images
- **Chat History:** Local storage only
- **Personal Data:** Minimal data collection
- **GDPR Compliance:** User consent and data rights

---

**Technical specifications for Mali-Connect AI Livestock Assessment Platform**

*Version 2.0 - Enhanced with AI Integration, Disease Detection, and Local Language Support*