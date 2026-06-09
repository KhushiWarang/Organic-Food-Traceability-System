#!/bin/bash

# Organic Food Traceability System - Quick Setup Script

echo "🌱 Organic Food Traceability System - Setup Script"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -d "blockchain" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   Installing blockchain dependencies..."
cd blockchain
npm install --silent
cd ..

echo "   Installing frontend dependencies..."
cd frontend
npm install --silent
cd ..

echo "✅ Dependencies installed"
echo ""

# Compile contract
echo "🔨 Compiling smart contract..."
cd blockchain
npx hardhat compile
cd ..
echo "✅ Contract compiled"
echo ""

# Generate Wagmi hooks
echo "⚙️  Generating Wagmi hooks..."
cd frontend
npm run wagmi:generate --silent
cd ..
echo "✅ Wagmi hooks generated"
echo ""

echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Open Terminal 1 and run:"
echo "      cd blockchain && npx hardhat node"
echo ""
echo "   2. Open Terminal 2 and run:"
echo "      cd blockchain && npx hardhat ignition deploy ignition/modules/OrganicFoodTraceability.ts --network localhost"
echo ""
echo "   3. Copy the contract address from Terminal 2"
echo ""
echo "   4. Open Terminal 3 and run:"
echo "      cd frontend && npm run dev"
echo ""
echo "   5. Visit http://localhost:3000 and paste the contract address"
echo ""
echo "📖 For detailed instructions, see QUICKSTART.md"
echo ""
