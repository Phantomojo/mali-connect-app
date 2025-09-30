# Mali-Connect Data Collection Project

## Project Overview
This project contains the compiled disease information and image asset collection for the Mali-Connect cattle health assessment application.

## Directory Structure
```
webscrape/
├── src/
│   └── data/
│       └── diseases.json          # Compiled disease information
└── public/
    └── images/
        ├── case-underweight/      # BCS 2-3 images
        │   └── README.md          # Image sources and requirements
        ├── case-healthy/          # BCS 5-6 images + hero images
        │   └── README.md          # Image sources and requirements
        ├── case-lsd/              # Lumpy Skin Disease images
        │   └── README.md          # Image sources and requirements
        └── case-ringworm/         # Ringworm images
            └── README.md          # Image sources and requirements
```

## Disease Information (diseases.json)

### 1. Lumpy Skin Disease
- **Source**: Merck Veterinary Manual
- **Key Symptoms**: Fever, lacrimation, nasal discharge, firm painful skin nodules
- **Treatment**: Antibiotics for secondary infections, supportive care, vaccination

### 2. Ringworm (Dermatophytosis)
- **Source**: Merck Veterinary Manual
- **Key Symptoms**: Circular hairless patches, gray-white crusts, lesions on head/neck
- **Treatment**: Topical antifungals, environmental decontamination, isolation

### 3. Photosensitization
- **Source**: Merck Veterinary Manual
- **Key Symptoms**: Redness/swelling in unpigmented areas, crusting/ulceration, severe itching
- **Treatment**: Remove from sunlight, eliminate causative agent, supportive care

## Image Asset Collection

### Body Condition Score Images
- **Underweight (BCS 2-3)**: Sources include University of Nebraska-Lincoln Extension, Penn State Extension
- **Healthy (BCS 5-6)**: Same sources as above, plus African cattle breeds from Unsplash/Pexels

### Disease Images
- **Lumpy Skin Disease**: CFSPH (Iowa State), Merck Veterinary Manual, OIE
- **Ringworm**: Merck Veterinary Manual, CFSPH, University Extension programs

### Hero Images
- **African Cattle Breeds**: Boran, Ankole, Nguni cattle from free stock photo sites

## Next Steps
1. Download actual images from the provided sources in each README.md file
2. Ensure all images are properly licensed for use
3. Optimize images for web use (appropriate file sizes and formats)
4. Integrate with the Mali-Connect application

## Sources Used
- Merck Veterinary Manual (https://www.merckvetmanual.com/)
- Center for Food Security and Public Health - Iowa State University
- University Extension Programs (Nebraska, Penn State, Iowa State)
- OIE (World Organisation for Animal Health)
- Free stock photo sites (Unsplash, Pexels)
