#!/bin/bash

# Script to add unhealthy cattle photos from Downloads to the project
# Usage: ./scripts/add-unhealthy-cattle.sh

echo "🐄 Adding unhealthy cattle photos to Mali-Connect..."

# Source directory (adjust path as needed)
DOWNLOADS_DIR="$HOME/Downloads"
WHATSAPP_DIR="$DOWNLOADS_DIR/WhatsApp"
PROJECT_IMAGES_DIR="/home/phantomojo/HACKATHON/public/images/unhealthy"

# Create target directory if it doesn't exist
mkdir -p "$PROJECT_IMAGES_DIR"

# Counter for naming
counter=1

# Function to copy and rename images
copy_images() {
    local source_dir="$1"
    local pattern="$2"
    
    echo "📁 Checking directory: $source_dir"
    
    if [ -d "$source_dir" ]; then
        echo "✅ Found directory: $source_dir"
        
        # Find and copy images
        find "$source_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
            if [ -f "$file" ]; then
                # Get file extension
                extension="${file##*.}"
                
                # Create new filename
                new_name="cattle-unhealthy-${counter}.${extension,,}"
                target_path="$PROJECT_IMAGES_DIR/$new_name"
                
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

# Try different possible WhatsApp folder locations
echo "🔍 Searching for WhatsApp images..."

# Check common WhatsApp folder locations
copy_images "$WHATSAPP_DIR" "*.jpg"
copy_images "$WHATSAPP_DIR" "*.jpeg"
copy_images "$WHATSAPP_DIR" "*.png"

# Also check for any folder with "whatsapp" in the name
find "$DOWNLOADS_DIR" -type d -iname "*whatsapp*" | while read -r dir; do
    copy_images "$dir" "*.jpg"
    copy_images "$dir" "*.jpeg"
    copy_images "$dir" "*.png"
done

# Check for any images in Downloads that might be cattle photos
echo "🔍 Checking Downloads for any cattle images..."
find "$DOWNLOADS_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    if [ -f "$file" ]; then
        # Simple check if filename might contain cattle-related keywords
        filename=$(basename "$file")
        if [[ "$filename" =~ (cow|cattle|livestock|animal|beef|dairy) ]]; then
            extension="${file##*.}"
            new_name="cattle-unhealthy-${counter}.${extension,,}"
            target_path="$PROJECT_IMAGES_DIR/$new_name"
            
            cp "$file" "$target_path"
            echo "📸 Copied: $filename → $new_name"
            ((counter++))
        fi
    fi
done

echo "✅ Done! Check $PROJECT_IMAGES_DIR for copied images"
echo "📊 Total images copied: $((counter-1))"

# List the copied images
echo "📋 Copied images:"
ls -la "$PROJECT_IMAGES_DIR"
