# Organic Food Traceability System

A decentralized blockchain-based system for tracking organic food products through the entire supply chain, from farm to consumer.

## Features

- **Multi-Role System**: Support for Farmer, Manufacturer, Distributor, Retailer, and Consumer roles
- **Role-Based Access Control**: Admin can assign and revoke roles
- **Product Management**: Add, update, and track products throughout their lifecycle
- **Supply Chain Traceability**: Complete history of product ownership and transfers
- **Transparent & Immutable**: All transactions recorded on the blockchain

## Tech Stack

- **Smart Contracts**: Solidity + OpenZeppelin AccessControl
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Blockchain Interaction**: Wagmi + Viem
- **UI Components**: shadcn/ui + Tailwind CSS
- **Local Development**: Hardhat

## Project Structure

```
crypto-starter-template/
├── blockchain/                 # Smart contract code
│   ├── contracts/
│   │   └── OrganicFoodTraceability.sol
│   ├── ignition/modules/
│   │   └── OrganicFoodTraceability.ts
│   └── hardhat.config.ts
├── frontend/                   # Next.js application
│   └── src/
│       ├── app/
│       │   ├── (app)/dashboard/
│       │   │   ├── components/  # All dashboard components
│       │   │   └── page.tsx
│       │   └── api/            # API routes
│       ├── components/         # Reusable UI components
│       ├── contexts/           # React contexts
│       └── lib/                # Utilities and generated code
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Install blockchain dependencies
cd blockchain
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Compile Smart Contract

```bash
cd blockchain
npx hardhat compile
```

### 3. Start Local Hardhat Node

```bash
cd blockchain
npx hardhat node
```

Keep this terminal running. This will start a local Ethereum node on `http://127.0.0.1:8545`.

### 4. Deploy the Contract

In a new terminal:

```bash
cd blockchain
npx hardhat ignition deploy ignition/modules/OrganicFoodTraceability.ts --network localhost
```
0x5FbDB2315678afecb367f032d93F642f64180aa3

Copy the deployed contract address from the output.

### 5. Configure MetaMask

1. Open MetaMask
2. Add a new network:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH
3. Import one of the test accounts from the Hardhat node output using its private key

### 6. Generate Wagmi Hooks

```bash
cd frontend
npm run wagmi:generate
```

### 7. Start the Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Usage Guide

### Initial Setup

1. **Connect Wallet**: Click "Connect Wallet" and select MetaMask
2. **Set Contract Address**: Enter the deployed contract address
3. The deployer account is automatically the admin

### Admin Functions

1. Navigate to the **Admin** tab
2. **Grant Roles**: 
   - Enter user wallet address
   - Select role (Farmer, Manufacturer, Distributor, Retailer, Consumer)
   - Click "Grant Role"
3. **Revoke Roles**: Similar process to remove roles

### For Farmers/Manufacturers

1. Navigate to the **Products** tab
2. Add new products with name and description
3. Products automatically enter at "Farm" or "Manufacturing" stage
4. View your products in the **Profile** tab

### Entry Product Listing

- View all products you currently own
- Click "View History" to see complete supply chain journey
- Available to all roles

### Exit Product Listing (Transfer Products)

1. Navigate to the **Exit List** tab
2. View products you've transferred out
3. Products automatically move to next stage based on recipient's role

### For Retailers/Consumers

1. Navigate to the **Used Today** tab
2. View available products
3. Click "Mark as Used" when product is consumed/sold
4. View history of used products

### Track Your Food

1. Navigate to the **Track Food** tab
2. Search by Product ID or view all products
3. See complete ownership chain and history
4. Available to everyone for transparency

## Smart Contract Details

### Roles

- **FARMER_ROLE**: Can add products at farm stage
- **MANUFACTURER_ROLE**: Can add products at manufacturing stage
- **DISTRIBUTOR_ROLE**: Receives products for distribution
- **RETAILER_ROLE**: Receives products for retail, can mark as used
- **CONSUMER_ROLE**: Final recipient, can mark as used
- **DEFAULT_ADMIN_ROLE**: Can grant/revoke all roles

### Key Functions

- `addProduct(name, description)`: Add new product (Farmer/Manufacturer only)
- `updateProduct(productId, newStage)`: Update product status
- `transferProduct(productId, recipient)`: Transfer to next role
- `markProductAsUsed(productId)`: Mark product as consumed (Retailer/Consumer only)
- `getProduct(productId)`: View product details
- `getProductHistory(productId)`: View complete history
- `grantUserRole(account, role)`: Assign role (Admin only)
- `revokeUserRole(account, role)`: Remove role (Admin only)

### Events

- `ProductAdded`: Emitted when new product is created
- `ProductUpdated`: Emitted when product status changes
- `ProductTransferred`: Emitted when product ownership changes
- `RoleGranted`: Emitted when role is assigned (inherited from AccessControl)
- `RoleRevoked`: Emitted when role is removed (inherited from AccessControl)

## Development Tips

### Reset Everything

If you need to start fresh:

```bash
# Stop the Hardhat node (Ctrl+C)
# Restart Hardhat node
cd blockchain
npx hardhat node

# Deploy contract again
npx hardhat ignition deploy ignition/modules/OrganicFoodTraceability.ts --network localhost --reset

# Clear browser storage or use a different MetaMask account
```

### Troubleshooting

**Issue**: MetaMask shows "Nonce too high" error
- **Solution**: Reset MetaMask account (Settings → Advanced → Clear activity tab data)

**Issue**: Contract not found
- **Solution**: Make sure Hardhat node is running and contract is deployed

**Issue**: "No role assigned" message
- **Solution**: Ask admin to grant you a role via the Admin tab

**Issue**: Cannot read contract
- **Solution**: Verify contract address is correct and Hardhat node is running

## Security Considerations

- Only the admin (contract deployer) can assign/revoke roles
- Product transfers are restricted to product owners
- Product history is immutable and transparent
- Role-based permissions ensure proper access control

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.
