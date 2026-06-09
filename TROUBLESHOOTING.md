# Troubleshooting: "No Role Assigned" Issue

## Quick Fix Steps

### Step 1: Verify You've Set the Contract Address

1. When you first connect your wallet and visit the dashboard, you should see a "Contract Setup" page
2. You need to paste your deployed contract address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
3. Click "Continue"

If you don't see this page, check your browser's localStorage:
- Open Browser DevTools (F12)
- Go to Application/Storage → Local Storage → http://localhost:3000
- Look for key: `organicFoodContractAddress`
- If it's wrong or missing, delete it and refresh the page

### Step 2: Verify You're Using the Deployer Account

The deployer account (the one that deployed the contract) is automatically the Admin.

**Check which account deployed the contract:**

1. When you ran the deployment command, look for the line:
   ```
   Using account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   ```

2. In MetaMask, check which account you're currently using
3. Make sure you're connected with the **same account** that deployed the contract

**If you're using a different account:**

1. Switch to the deployer account in MetaMask
2. Refresh the page
3. You should now see "Admin" as your role

### Step 3: Import the Correct Account

When you started `npx hardhat node`, it showed 20 accounts. The **first account** (Account #0) is the deployer.

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Import this account into MetaMask:**

1. MetaMask → Click account icon → Import Account
2. Select "Private Key"
3. Paste: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
4. Click Import

### Step 4: Clear Cache and Try Again

If you've set the wrong contract address or something is cached:

1. Clear browser localStorage (F12 → Application → Local Storage → Clear All)
2. Refresh the page
3. Connect wallet again
4. Enter correct contract address
5. You should see your role

### Step 5: Verify Contract is Deployed Correctly

Check that the Hardhat node is running and the contract is deployed:

```bash
# In Terminal 1: This should be running
cd blockchain
npx hardhat node
```

If you stopped it, you need to redeploy:

```bash
# Terminal 2
cd blockchain
npx hardhat ignition deploy ignition/modules/OrganicFoodTraceability.ts --network localhost --reset
```

Copy the NEW contract address and use that in the frontend.

## Debug Information

The dashboard now shows debug information that will help identify the issue:

- **Your Address**: The wallet you're connected with
- **Contract Address**: The contract address you've set
- **Detected Role**: What the frontend thinks your role is
- **Contract Says**: What the smart contract actually says
- **Is Admin**: Whether you have admin privileges

If "Contract Says" shows "Admin" but "Detected Role" shows "None", click the "Refresh Role" button.

## Common Scenarios

### Scenario 1: First Time Setup
- ✅ Connected wallet
- ❌ Haven't set contract address yet
- **Solution**: Enter contract address `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### Scenario 2: Wrong Account
- ✅ Connected wallet
- ✅ Set contract address
- ❌ Using different account than deployer
- **Solution**: Switch to Account #0 (deployer account)

### Scenario 3: Node Restarted
- ✅ Connected wallet
- ✅ Using deployer account
- ❌ Old contract address (from before restart)
- **Solution**: Deploy contract again, get new address, update in frontend

### Scenario 4: Wrong Network
- ✅ Connected wallet
- ❌ MetaMask not on Hardhat Local network
- **Solution**: Switch MetaMask to "Hardhat Local" network (Chain ID: 31337)

## Verification Checklist

- [ ] Hardhat node is running (`npx hardhat node`)
- [ ] Contract is deployed (`npx hardhat ignition deploy ...`)
- [ ] MetaMask is on "Hardhat Local" network (Chain ID: 31337)
- [ ] Using Account #0 (the deployer account)
- [ ] Contract address is set in the frontend
- [ ] Page has been refreshed after setting contract address

## Still Not Working?

Try this complete reset:

```bash
# Stop Hardhat node (Ctrl+C in Terminal 1)

# Terminal 1: Start fresh
cd blockchain
npx hardhat node

# Copy the first account's private key

# Terminal 2: Deploy fresh
cd blockchain
npx hardhat ignition deploy ignition/modules/OrganicFoodTraceability.ts --network localhost --reset

# Copy the new contract address

# Browser:
# 1. Clear localStorage (F12 → Application → Clear)
# 2. Import Account #0 using private key
# 3. Refresh page
# 4. Connect wallet
# 5. Paste contract address
# 6. You should be Admin!
```

## Understanding the Flow

```
1. Deploy Contract → Account #0 becomes Admin
2. Connect Wallet → Must use Account #0
3. Set Contract Address → Frontend can now read blockchain
4. Frontend reads: getUserRole(your address) → Should return "Admin"
5. Dashboard shows your role and available actions
```

The key is: **You must use the same account that deployed the contract!**
