# Quick Start Guide - Organic Food Traceability System

## Prerequisites
- Node.js installed
- MetaMask browser extension
- Terminal access

## Step-by-Step Setup

### Terminal 1: Start Blockchain

```bash
cd /home/sundaram/crypto-starter-template/blockchain
npx hardhat node
```

**Keep this running!** Note the accounts and private keys shown.

### Terminal 2: Deploy Contract

```bash
cd /home/sundaram/crypto-starter-template/blockchain
npx hardhat ignition deploy ignition/modules/OrganicFoodTraceability.ts --network localhost
```

**Important**: Copy the contract address from the output. It will look like:
```
OrganicFoodTraceabilityModule#OrganicFoodTraceability - 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Terminal 3: Start Frontend

```bash
cd /home/sundaram/crypto-starter-template/frontend
npm run dev
```

Visit: http://localhost:3000

## Configure MetaMask

1. **Add Hardhat Network**:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

2. **Import Test Account**:
   - Copy a private key from Terminal 1 (Hardhat node output)
   - MetaMask → Import Account → Paste private key
   - You'll have ~10,000 ETH for testing

## First-Time Usage

### Step 1: Connect Wallet
- Click "Enter the App"
- Click "Connect Wallet" → Select MetaMask
- Approve the connection

### Step 2: Set Contract Address
- Paste the contract address you copied earlier
- Click "Continue"

### Step 3: You're the Admin!
- The deployer (first account) is automatically the admin
- Navigate to the "Admin" tab to assign roles

## Test the System

### Create Test Users

Import multiple Hardhat accounts into MetaMask to simulate different roles:

**Account 1** (you): Admin
**Account 2**: Farmer
**Account 3**: Manufacturer
**Account 4**: Distributor
**Account 5**: Retailer
**Account 6**: Consumer

### Assign Roles

1. As admin, go to Admin tab
2. For each account, grant appropriate role:
   - Copy account address from MetaMask
   - Select role
   - Click "Grant Role"
   - Approve transaction

### Test Product Flow

#### As Farmer (Account 2):
1. Switch to Account 2 in MetaMask
2. Go to "Products" tab
3. Add product: "Organic Tomatoes" with description
4. Approve transaction
5. Product appears with status "Farm"

#### As Manufacturer (Account 3):
1. Farmer transfers product to Manufacturer's address
2. Switch to Account 3
3. Product appears in "Entry List"
4. Can view product history

#### Continue the chain:
- Manufacturer → Distributor
- Distributor → Retailer
- Retailer → Consumer
- Consumer marks as "Used"

### Track Product Journey

1. Go to "Track Food" tab
2. Search by Product ID or view all
3. Click "View Complete History"
4. See entire supply chain journey!

## Common Operations

### Add Product (Farmer/Manufacturer)
```
Products tab → Fill form → Add Product → Approve in MetaMask
```

### Transfer Product
```
Exit List tab → Enter recipient address → Transfer → Approve
```

### Mark as Used (Retailer/Consumer)
```
Used Today tab → Click "Mark as Used" → Approve
```

### View History (Anyone)
```
Track Food tab → Search ID → View Complete History
```

### Grant Role (Admin Only)
```
Admin tab → Grant Role section → Enter address + Select role → Grant
```

## Troubleshooting

### "Nonce too high" error
- MetaMask → Settings → Advanced → Clear activity tab data
- Try transaction again

### Can't see contract functions
- Ensure Hardhat node is running (Terminal 1)
- Verify correct contract address
- Check you're on the Hardhat network in MetaMask

### "No role assigned"
- Ask admin to grant you a role
- Or switch to admin account and grant yourself a role

### Transaction fails
- Make sure you have enough ETH
- Check if you have the required role for that action
- Verify you own the product (for transfers)

## Demo Scenario

Here's a complete flow you can demo:

1. **Admin** grants roles to 5 different accounts
2. **Farmer** adds "Organic Apples" batch
3. **Farmer** transfers to Manufacturer
4. **Manufacturer** updates stage to "Processed"
5. **Manufacturer** transfers to Distributor
6. **Distributor** transfers to Retailer
7. **Retailer** transfers to Consumer
8. **Consumer** marks as "Used"
9. **Anyone** can track the product and see all 8 steps!

## Architecture Overview

```
┌─────────────────┐
│   Smart Contract │  ← Deployed on Hardhat local node
│  (Solidity)      │
└────────┬─────────┘
         │
         │ Wagmi/Viem
         │
┌────────▼─────────┐
│   Frontend       │  ← Next.js app on localhost:3000
│   (React)        │
└──────────────────┘
         │
         │ MetaMask
         │
┌────────▼─────────┐
│   User Wallet    │  ← Your browser wallet
└──────────────────┘
```

## What You've Built

✅ Complete supply chain traceability system
✅ Role-based access control with 5 roles
✅ Immutable product history
✅ Admin dashboard for role management
✅ Product lifecycle tracking
✅ Transparent and verifiable data
✅ Full blockchain integration

## Next Steps

- Deploy to testnet (Sepolia, Goerli)
- Add product images using IPFS
- Implement QR codes for easy tracking
- Add email notifications
- Create mobile app
- Implement batch operations
- Add analytics dashboard

Enjoy your decentralized food traceability system! 🎉
