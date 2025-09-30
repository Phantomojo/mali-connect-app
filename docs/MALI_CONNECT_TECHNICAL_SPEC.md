# Mali-Connect: Technical Specifications

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling
- **Three.js** with react-three-fiber for 3D graphics
- **@react-three/drei** for Three.js helpers and components

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
```

#### 2. ImageSelector.tsx
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
```

#### 3. AIAnalysisSim.tsx
```typescript
interface AIAnalysisSimProps {
  isAnalyzing: boolean;
  onAnalysisComplete: (score: MaliScore) => void;
  analysisProgress: number;
}

// Features:
// - Animated progress indicators
// - Simulated AI processing steps
// - Realistic timing and feedback
// - Loading states and transitions
```

#### 4. MaliScoreDisplay.tsx
```typescript
interface MaliScoreDisplayProps {
  score: MaliScore;
  marketValue: number;
  showBreakdown: boolean;
}

// Features:
// - Score visualization with charts
// - Metric breakdown display
// - Market value calculation
// - Color-coded health indicators
```

#### 5. EcosystemPanel.tsx
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
```

#### 6. ResourceMap.tsx
```typescript
interface ResourceMapProps {
  vegetationData: VegetationData[];
  marketHubs: MarketHub[];
  selectedLocation: Location | null;
}

// Features:
// - 3D globe visualization
// - Satellite vegetation overlay
// - Market hub markers
// - Price variation display
// - Interactive location selection
```

## 🎯 Data Models

### MaliScore Interface
```typescript
interface MaliScore {
  bodyCondition: {
    score: number;        // 0-100
    weight: 0.4;          // 40% weight
    indicators: string[]; // Visible ribs, bone prominence
  };
  physicalHealth: {
    score: number;        // 0-100
    weight: 0.25;         // 25% weight
    indicators: string[]; // Skin condition, coat quality
  };
  conformation: {
    score: number;        // 0-100
    weight: 0.2;          // 20% weight
    indicators: string[]; // Leg structure, posture
  };
  ageEstimation: {
    score: number;        // 0-100
    weight: 0.15;         // 15% weight
    indicators: string[]; // Facial features, dental condition
  };
  totalScore: number;     // Weighted composite (0-100)
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
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

### Diagnostic Markers
- **Body Condition:** Rib visibility, muscle definition
- **Physical Health:** Coat quality, skin condition
- **Conformation:** Leg structure, back alignment
- **Age Estimation:** Facial features, dental condition

## 📊 Market Value Calculation

### Pricing Algorithm
```typescript
const calculateMarketValue = (
  maliScore: number,
  basePrice: number = 500,
  marketDemand: number = 1.1,
  locationFactor: number = 1.0
): number => {
  const scoreMultiplier = maliScore / 100;
  const finalPrice = basePrice * scoreMultiplier * marketDemand * locationFactor;
  return Math.round(finalPrice);
};
```

### Market Factors
- **Base Price:** $500 (average cattle price in Kenya)
- **Score Multiplier:** Mali-Score / 100
- **Demand Multiplier:** 1.0 - 1.3 based on market conditions
- **Location Factor:** 0.8 - 1.2 based on distance to markets

## 🎬 Animation Specifications

### AI Analysis Animation
1. **Loading Phase (0-2s):** Spinning loader with "Analyzing..." text
2. **Processing Phase (2-4s):** Progress bar with analysis steps
3. **Results Phase (4-5s):** Score calculation and display
4. **3D Model Phase (5-6s):** 3D model loading and marker placement

### 3D Model Animations
- **Idle Animation:** Subtle breathing and head movement
- **Assessment Pose:** Static pose optimized for marker placement
- **Marker Highlighting:** Pulsing effect for diagnostic markers
- **Score Visualization:** Animated score counter and progress bars

## 📱 Mobile Optimization

### Performance Targets
- **Initial Load:** <3 seconds on 3G
- **3D Rendering:** 60fps on mid-range devices
- **Memory Usage:** <100MB peak
- **Battery Impact:** Minimal during assessment

### Responsive Design
- **Breakpoints:** 320px, 768px, 1024px, 1440px
- **Touch Targets:** Minimum 44px for interactive elements
- **Gesture Support:** Pinch to zoom, pan to rotate
- **Orientation:** Portrait and landscape support

### Network Optimization
- **Progressive Loading:** Essential features first
- **Asset Compression:** Optimized textures and models
- **Caching Strategy:** Local storage for frequently used data
- **Offline Mode:** Core functionality without internet

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd mali-connect

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
mali-connect/
├── public/
│   ├── models/           # 3D model files (.glb)
│   ├── images/          # Cattle images
│   └── data/            # Static data files
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Hardcoded data
│   └── App.tsx         # Main application
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
  ]
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
```

## 🧪 Testing Strategy

### Unit Testing
- **Framework:** Vitest
- **Coverage:** 80%+ for utility functions
- **Components:** React Testing Library

### Integration Testing
- **3D Rendering:** Three.js scene testing
- **User Flows:** Complete assessment workflow
- **Performance:** Load time and frame rate testing

### Manual Testing
- **Devices:** iOS Safari, Android Chrome
- **Networks:** 3G, 4G, WiFi
- **Screen Sizes:** 320px to 1440px

## 📈 Performance Monitoring

### Metrics to Track
- **Load Time:** Initial page load
- **3D Performance:** FPS during rendering
- **Memory Usage:** Peak memory consumption
- **User Interactions:** Click/touch response time

### Optimization Techniques
- **Model LOD:** Different detail levels based on distance
- **Texture Compression:** Optimized image formats
- **Code Splitting:** Lazy loading of components
- **Caching:** Aggressive caching of static assets

---

**Technical specifications for Mali-Connect 3D Livestock Assessment Platform**
