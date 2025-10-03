#!/bin/bash

# Script to add disease-specific cattle photos
# Usage: ./scripts/add-disease-photos.sh

echo "🐄 Adding disease-specific cattle photos to Mali-Connect..."

# Source directory (adjust path as needed)
DOWNLOADS_DIR="$HOME/Downloads"
DISEASE_PHOTOS_DIR="$DOWNLOADS_DIR/DiseasePhotos"
PROJECT_DISEASES_DIR="/home/phantomojo/HACKATHON/public/images/diseases"

# Create target directory if it doesn't exist
mkdir -p "$PROJECT_DISEASES_DIR"

# Disease mapping
declare -A diseases=(
    ["east-coast-fever"]="East Coast Fever - Homa ya Pwani"
    ["foot-and-mouth"]="Foot and Mouth Disease - Ugonjwa wa Miguu na Mdomo"
    ["mastitis"]="Mastitis - Ugonjwa wa Maziwa"
    ["trypanosomiasis"]="Trypanosomiasis - Ugonjwa wa Usingizi"
    ["lumpy-skin-disease"]="Lumpy Skin Disease - Ugonjwa wa Ngozi ya Matumbo"
    ["anthrax"]="Anthrax - Ugonjwa wa Anthrax"
)

# Counter for naming
counter=1

# Function to copy and rename disease images
copy_disease_images() {
    local source_dir="$1"
    local disease_id="$2"
    local disease_name="$3"
    
    echo "📁 Checking for $disease_name photos in: $source_dir"
    
    if [ -d "$source_dir" ]; then
        echo "✅ Found directory: $source_dir"
        
        # Find and copy images
        find "$source_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
            if [ -f "$file" ]; then
                # Get file extension
                extension="${file##*.}"
                
                # Create new filename
                new_name="${disease_id}-${counter}.${extension,,}"
                target_path="$PROJECT_DISEASES_DIR/$new_name"
                
                # Copy file
                cp "$file" "$target_path"
                echo "📸 Copied: $(basename "$file") → $new_name"
                
                ((counter++))
            fi
        done
    else
        echo "❌ Directory not found: $source_dir"
    fi
}

# Try different possible disease photo locations
echo "🔍 Searching for disease-specific cattle images..."

# Check for disease-specific folders
for disease_id in "${!diseases[@]}"; do
    disease_name="${diseases[$disease_id]}"
    
    # Try different folder naming patterns
    copy_disease_images "$DOWNLOADS_DIR/$disease_id" "$disease_id" "$disease_name"
    copy_disease_images "$DOWNLOADS_DIR/${disease_id}-photos" "$disease_id" "$disease_name"
    copy_disease_images "$DOWNLOADS_DIR/${disease_id}_photos" "$disease_id" "$disease_name"
    copy_disease_images "$DOWNLOADS_DIR/${disease_id} photos" "$disease_id" "$disease_name"
done

# Check for any folder with "disease" in the name
find "$DOWNLOADS_DIR" -type d -iname "*disease*" | while read -r dir; do
    echo "📁 Found disease folder: $dir"
    # Try to match with known diseases
    for disease_id in "${!diseases[@]}"; do
        if [[ "$dir" =~ $disease_id ]]; then
            disease_name="${diseases[$disease_id]}"
            copy_disease_images "$dir" "$disease_id" "$disease_name"
        fi
    done
done

# Check for any images in Downloads that might be disease photos
echo "🔍 Checking Downloads for any disease-related cattle images..."
find "$DOWNLOADS_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    if [ -f "$file" ]; then
        # Simple check if filename might contain disease-related keywords
        filename=$(basename "$file")
        if [[ "$filename" =~ (disease|sick|unhealthy|fever|mastitis|anthrax|lumpy|foot|mouth) ]]; then
            extension="${file##*.}"
            new_name="disease-cattle-${counter}.${extension,,}"
            target_path="$PROJECT_DISEASES_DIR/$new_name"
            
            cp "$file" "$target_path"
            echo "📸 Copied: $filename → $new_name"
            ((counter++))
        fi
    fi
done

echo "✅ Done! Check $PROJECT_DISEASES_DIR for copied disease images"
echo "📊 Total disease images copied: $((counter-1))"

# List the copied images
echo "📋 Copied disease images:"
ls -la "$PROJECT_DISEASES_DIR"

echo ""
echo "🎯 Next steps:"
echo "1. Review the copied images"
echo "2. Rename them to match the disease IDs if needed"
echo "3. Ensure images show clear disease symptoms"
echo "4. Test the AI analysis with these new disease photos"
