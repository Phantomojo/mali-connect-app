#!/bin/bash

echo "🚀 Deploying Mali-Connect App..."

# Build the app
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create a simple server for testing
    echo "🌐 Starting local server for testing..."
    echo "Your app is available at:"
    echo "  - http://localhost:8080 (local)"
    echo "  - http://192.168.0.100:8080 (network)"
    echo "  - http://192.168.0.101:8080 (wifi)"
    echo ""
    echo "📱 QR Code for mobile access:"
    python3 -c "
import qrcode
qr = qrcode.QRCode(version=1, box_size=2, border=1)
qr.add_data('http://192.168.0.100:8080')
qr.make()
qr.print_ascii(invert=True)
"
    echo ""
    echo "🔧 To deploy to production:"
    echo "1. Push to GitHub repository"
    echo "2. Connect to Vercel/Netlify/Railway"
    echo "3. Or use: surge dist/ your-app-name.surge.sh"
    echo ""
    
    # Start a simple HTTP server
    python3 -m http.server 8080 --directory dist
else
    echo "❌ Build failed!"
    exit 1
fi
