// Mock data for demo purposes
export interface MockProduct {
  id: number;
  name: string;
  description: string;
  currentOwner: string;
  currentStage: string;
  stage?: string; // Alias for currentStage
  timestamp: number;
  history: string[];
  quantity?: string;
  location?: string;
}

// Sample products
export const SAMPLE_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    description: "Fresh organic tomatoes from Green Valley Farm, Batch #2024-10-001",
    currentOwner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    currentStage: "Farm",
    timestamp: Date.now() - 86400000 * 2, // 2 days ago
    history: [
      "Stage: Farm | Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Time: " + new Date(Date.now() - 86400000 * 2).toLocaleString(),
    ],
  },
  {
    id: 2,
    name: "Organic Apples",
    description: "Crisp organic apples from Sunrise Orchards, Grade A",
    currentOwner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    currentStage: "Distribution",
    timestamp: Date.now() - 86400000 * 5, // 5 days ago
    history: [
      "Stage: Farm | Owner: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | Time: " + new Date(Date.now() - 86400000 * 5).toLocaleString(),
      "Transferred to: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | Stage: Manufacturing | Time: " + new Date(Date.now() - 86400000 * 4).toLocaleString(),
      "Transferred to: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Stage: Distribution | Time: " + new Date(Date.now() - 86400000 * 3).toLocaleString(),
    ],
  },
  {
    id: 3,
    name: "Organic Carrots",
    description: "Orange carrots harvested from Rich Soil Farm, Pesticide-free",
    currentOwner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    currentStage: "Retail",
    timestamp: Date.now() - 86400000 * 1, // 1 day ago
    history: [
      "Stage: Farm | Owner: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | Time: " + new Date(Date.now() - 86400000 * 7).toLocaleString(),
      "Transferred to: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | Stage: Manufacturing | Time: " + new Date(Date.now() - 86400000 * 6).toLocaleString(),
      "Transferred to: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 | Stage: Distribution | Time: " + new Date(Date.now() - 86400000 * 3).toLocaleString(),
      "Transferred to: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Stage: Retail | Time: " + new Date(Date.now() - 86400000 * 1).toLocaleString(),
    ],
  },
  {
    id: 4,
    name: "Organic Spinach",
    description: "Fresh baby spinach leaves, 100% organic certified",
    currentOwner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    currentStage: "Manufacturing",
    timestamp: Date.now() - 86400000 * 3,
    history: [
      "Stage: Farm | Owner: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | Time: " + new Date(Date.now() - 86400000 * 4).toLocaleString(),
      "Transferred to: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Stage: Manufacturing | Time: " + new Date(Date.now() - 86400000 * 3).toLocaleString(),
    ],
  },
];

// Sample exit products (transferred out)
export const SAMPLE_EXIT_PRODUCTS: MockProduct[] = [
  {
    id: 5,
    name: "Organic Lettuce",
    description: "Iceberg lettuce from Green Acres, Batch #2024-09-050",
    currentOwner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    currentStage: "Distribution",
    timestamp: Date.now() - 86400000 * 10,
    history: [
      "Stage: Farm | Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Time: " + new Date(Date.now() - 86400000 * 12).toLocaleString(),
      "Transferred to: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | Stage: Distribution | Time: " + new Date(Date.now() - 86400000 * 10).toLocaleString(),
    ],
  },
  {
    id: 6,
    name: "Organic Potatoes",
    description: "Yukon Gold potatoes, Grade A quality",
    currentOwner: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    currentStage: "Retail",
    timestamp: Date.now() - 86400000 * 7,
    history: [
      "Stage: Farm | Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Time: " + new Date(Date.now() - 86400000 * 8).toLocaleString(),
      "Transferred to: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | Stage: Retail | Time: " + new Date(Date.now() - 86400000 * 7).toLocaleString(),
    ],
  },
];

// Sample used products
export const SAMPLE_USED_PRODUCTS: MockProduct[] = [
  {
    id: 7,
    name: "Organic Cucumbers",
    description: "Fresh cucumbers used in salad preparation",
    currentOwner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    currentStage: "Used",
    timestamp: Date.now() - 86400000 * 1,
    history: [
      "Stage: Farm | Owner: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | Time: " + new Date(Date.now() - 86400000 * 15).toLocaleString(),
      "Transferred to: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Stage: Retail | Time: " + new Date(Date.now() - 86400000 * 2).toLocaleString(),
      "Marked as Used by: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Time: " + new Date(Date.now() - 86400000 * 1).toLocaleString(),
    ],
  },
  {
    id: 8,
    name: "Organic Bell Peppers",
    description: "Red and yellow bell peppers, consumed yesterday",
    currentOwner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    currentStage: "Used",
    timestamp: Date.now() - 86400000 * 2,
    history: [
      "Stage: Farm | Owner: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | Time: " + new Date(Date.now() - 86400000 * 10).toLocaleString(),
      "Transferred to: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Stage: Consumer | Time: " + new Date(Date.now() - 86400000 * 3).toLocaleString(),
      "Marked as Used by: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Time: " + new Date(Date.now() - 86400000 * 2).toLocaleString(),
    ],
  },
];

// Local storage helpers
const STORAGE_KEY = 'organicFood_products';

export function getStoredProducts(): MockProduct[] {
  if (typeof window === 'undefined') return [...SAMPLE_PRODUCTS];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize with sample data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PRODUCTS));
  return [...SAMPLE_PRODUCTS];
}

export function addProductToStorage(product: Omit<MockProduct, 'id' | 'timestamp' | 'history'>): MockProduct {
  const products = getStoredProducts();
  const newId = Math.max(...products.map(p => p.id), 0) + 1;
  
  const newProduct: MockProduct = {
    ...product,
    id: newId,
    timestamp: Date.now(),
    history: [
      `Stage: ${product.currentStage} | Owner: ${product.currentOwner} | Time: ${new Date().toLocaleString()}`,
    ],
  };
  
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  
  return newProduct;
}

export function updateProductInStorage(productId: number, updates: Partial<MockProduct>): void {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === productId);
  
  if (index !== -1) {
    products[index] = { ...products[index], ...updates, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
}

export function getAllProducts(): MockProduct[] {
  return [...SAMPLE_PRODUCTS, ...getStoredProducts()];
}
