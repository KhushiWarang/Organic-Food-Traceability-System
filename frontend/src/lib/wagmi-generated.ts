import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accessControlAbi = [
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAccessControlAbi = [
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lockAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_unlockTime', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'when',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlockTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const
export const lockBytecode = "0x60806040526040516105d83803806105d8833981810160405281019061002591906100f0565b804210610067576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161005e906101a0565b60405180910390fd5b8060008190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506101c0565b600080fd5b6000819050919050565b6100cd816100ba565b81146100d857600080fd5b50565b6000815190506100ea816100c4565b92915050565b600060208284031215610106576101056100b5565b5b6000610114848285016100db565b91505092915050565b600082825260208201905092915050565b7f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460008201527f7572650000000000000000000000000000000000000000000000000000000000602082015250565b600061018a60238361011d565b91506101958261012e565b604082019050919050565b600060208201905081810360008301526101b98161017d565b9050919050565b610409806101cf6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100645780638da5cb5b1461006e575b600080fd5b61004e61008c565b60405161005b919061024a565b60405180910390f35b61006c610092565b005b61007661020b565b60405161008391906102a6565b60405180910390f35b60005481565b6000544210156100d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100ce9061031e565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610167576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015e9061038a565b60405180910390fd5b7fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b9347426040516101989291906103aa565b60405180910390a1600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610208573d6000803e3d6000fd5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000819050919050565b61024481610231565b82525050565b600060208201905061025f600083018461023b565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061029082610265565b9050919050565b6102a081610285565b82525050565b60006020820190506102bb6000830184610297565b92915050565b600082825260208201905092915050565b7f596f752063616e27742077697468647261772079657400000000000000000000600082015250565b60006103086016836102c1565b9150610313826102d2565b602082019050919050565b60006020820190508181036000830152610337816102fb565b9050919050565b7f596f75206172656e277420746865206f776e6572000000000000000000000000600082015250565b60006103746014836102c1565b915061037f8261033e565b602082019050919050565b600060208201905081810360008301526103a381610367565b9050919050565b60006040820190506103bf600083018561023b565b6103cc602083018461023b565b939250505056fea26469706673582212202d2006ef26cbefcc4deab66c32f5ff5efb638f080c7490b6633879942caf232764736f6c634300081c0033" as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OrganicFoodTraceability
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const organicFoodTraceabilityAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'productId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'stage', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProductAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'productId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'stage', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProductTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'productId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newStage',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'updatedBy',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProductUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CONSUMER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DISTRIBUTOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FARMER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MANUFACTURER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RETAILER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
    ],
    name: 'addProduct',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllProducts',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'productId', internalType: 'uint256', type: 'uint256' }],
    name: 'getProduct',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'currentOwner', internalType: 'address', type: 'address' },
      { name: 'currentStage', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'productId', internalType: 'uint256', type: 'uint256' }],
    name: 'getProductHistory',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserExitProducts',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserProducts',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserRole',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserUsedProducts',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'grantUserRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'productId', internalType: 'uint256', type: 'uint256' }],
    name: 'markProductAsUsed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'productCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'products',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'currentOwner', internalType: 'address', type: 'address' },
      { name: 'currentStage', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'revokeUserRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'productId', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'transferProduct',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'productId', internalType: 'uint256', type: 'uint256' },
      { name: 'newStage', internalType: 'string', type: 'string' },
    ],
    name: 'updateProduct',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userExitProducts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userProducts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userUsedProducts',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlAbi}__
 */
export const useReadAccessControl = /*#__PURE__*/ createUseReadContract({
  abi: accessControlAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadAccessControlDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: accessControlAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadAccessControlGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: accessControlAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadAccessControlHasRole = /*#__PURE__*/ createUseReadContract({
  abi: accessControlAbi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAccessControlSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: accessControlAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlAbi}__
 */
export const useWriteAccessControl = /*#__PURE__*/ createUseWriteContract({
  abi: accessControlAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteAccessControlGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: accessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteAccessControlRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: accessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteAccessControlRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: accessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlAbi}__
 */
export const useSimulateAccessControl = /*#__PURE__*/ createUseSimulateContract(
  { abi: accessControlAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateAccessControlGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: accessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateAccessControlRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: accessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateAccessControlRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: accessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlAbi}__
 */
export const useWatchAccessControlEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: accessControlAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: accessControlAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: accessControlAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link accessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: accessControlAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165Abi}__
 */
export const useReadErc165 = /*#__PURE__*/ createUseReadContract({
  abi: erc165Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc165SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc165Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useReadIAccessControl = /*#__PURE__*/ createUseReadContract({
  abi: iAccessControlAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadIAccessControlGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: iAccessControlAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadIAccessControlHasRole = /*#__PURE__*/ createUseReadContract(
  { abi: iAccessControlAbi, functionName: 'hasRole' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useWriteIAccessControl = /*#__PURE__*/ createUseWriteContract({
  abi: iAccessControlAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteIAccessControlGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: iAccessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteIAccessControlRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: iAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteIAccessControlRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: iAccessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useSimulateIAccessControl =
  /*#__PURE__*/ createUseSimulateContract({ abi: iAccessControlAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateIAccessControlGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iAccessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateIAccessControlRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateIAccessControlRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iAccessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const useWatchIAccessControlEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: iAccessControlAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchIAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iAccessControlAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchIAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iAccessControlAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchIAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iAccessControlAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__
 */
export const useReadIerc165 = /*#__PURE__*/ createUseReadContract({
  abi: ierc165Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc165SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc165Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useReadLock = /*#__PURE__*/ createUseReadContract({ abi: lockAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLockOwner = /*#__PURE__*/ createUseReadContract({
  abi: lockAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"unlockTime"`
 */
export const useReadLockUnlockTime = /*#__PURE__*/ createUseReadContract({
  abi: lockAbi,
  functionName: 'unlockTime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useWriteLock = /*#__PURE__*/ createUseWriteContract({
  abi: lockAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLockWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lockAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useSimulateLock = /*#__PURE__*/ createUseSimulateContract({
  abi: lockAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLockWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: lockAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockAbi}__
 */
export const useWatchLockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lockAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchLockWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lockAbi,
    eventName: 'Withdrawal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__
 */
export const useReadOrganicFoodTraceability =
  /*#__PURE__*/ createUseReadContract({ abi: organicFoodTraceabilityAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"CONSUMER_ROLE"`
 */
export const useReadOrganicFoodTraceabilityConsumerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'CONSUMER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadOrganicFoodTraceabilityDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"DISTRIBUTOR_ROLE"`
 */
export const useReadOrganicFoodTraceabilityDistributorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'DISTRIBUTOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"FARMER_ROLE"`
 */
export const useReadOrganicFoodTraceabilityFarmerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'FARMER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"MANUFACTURER_ROLE"`
 */
export const useReadOrganicFoodTraceabilityManufacturerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'MANUFACTURER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"RETAILER_ROLE"`
 */
export const useReadOrganicFoodTraceabilityRetailerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'RETAILER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getAllProducts"`
 */
export const useReadOrganicFoodTraceabilityGetAllProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getAllProducts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getProduct"`
 */
export const useReadOrganicFoodTraceabilityGetProduct =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getProduct',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getProductHistory"`
 */
export const useReadOrganicFoodTraceabilityGetProductHistory =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getProductHistory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadOrganicFoodTraceabilityGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getUserExitProducts"`
 */
export const useReadOrganicFoodTraceabilityGetUserExitProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getUserExitProducts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getUserProducts"`
 */
export const useReadOrganicFoodTraceabilityGetUserProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getUserProducts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getUserRole"`
 */
export const useReadOrganicFoodTraceabilityGetUserRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getUserRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"getUserUsedProducts"`
 */
export const useReadOrganicFoodTraceabilityGetUserUsedProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'getUserUsedProducts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadOrganicFoodTraceabilityHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"productCount"`
 */
export const useReadOrganicFoodTraceabilityProductCount =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'productCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"products"`
 */
export const useReadOrganicFoodTraceabilityProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'products',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadOrganicFoodTraceabilitySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"userExitProducts"`
 */
export const useReadOrganicFoodTraceabilityUserExitProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'userExitProducts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"userProducts"`
 */
export const useReadOrganicFoodTraceabilityUserProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'userProducts',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"userUsedProducts"`
 */
export const useReadOrganicFoodTraceabilityUserUsedProducts =
  /*#__PURE__*/ createUseReadContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'userUsedProducts',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__
 */
export const useWriteOrganicFoodTraceability =
  /*#__PURE__*/ createUseWriteContract({ abi: organicFoodTraceabilityAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"addProduct"`
 */
export const useWriteOrganicFoodTraceabilityAddProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'addProduct',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteOrganicFoodTraceabilityGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"grantUserRole"`
 */
export const useWriteOrganicFoodTraceabilityGrantUserRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'grantUserRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"markProductAsUsed"`
 */
export const useWriteOrganicFoodTraceabilityMarkProductAsUsed =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'markProductAsUsed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteOrganicFoodTraceabilityRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteOrganicFoodTraceabilityRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"revokeUserRole"`
 */
export const useWriteOrganicFoodTraceabilityRevokeUserRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'revokeUserRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"transferProduct"`
 */
export const useWriteOrganicFoodTraceabilityTransferProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'transferProduct',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"updateProduct"`
 */
export const useWriteOrganicFoodTraceabilityUpdateProduct =
  /*#__PURE__*/ createUseWriteContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'updateProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__
 */
export const useSimulateOrganicFoodTraceability =
  /*#__PURE__*/ createUseSimulateContract({ abi: organicFoodTraceabilityAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"addProduct"`
 */
export const useSimulateOrganicFoodTraceabilityAddProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'addProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateOrganicFoodTraceabilityGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"grantUserRole"`
 */
export const useSimulateOrganicFoodTraceabilityGrantUserRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'grantUserRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"markProductAsUsed"`
 */
export const useSimulateOrganicFoodTraceabilityMarkProductAsUsed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'markProductAsUsed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateOrganicFoodTraceabilityRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateOrganicFoodTraceabilityRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"revokeUserRole"`
 */
export const useSimulateOrganicFoodTraceabilityRevokeUserRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'revokeUserRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"transferProduct"`
 */
export const useSimulateOrganicFoodTraceabilityTransferProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'transferProduct',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `functionName` set to `"updateProduct"`
 */
export const useSimulateOrganicFoodTraceabilityUpdateProduct =
  /*#__PURE__*/ createUseSimulateContract({
    abi: organicFoodTraceabilityAbi,
    functionName: 'updateProduct',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__
 */
export const useWatchOrganicFoodTraceabilityEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: organicFoodTraceabilityAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `eventName` set to `"ProductAdded"`
 */
export const useWatchOrganicFoodTraceabilityProductAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: organicFoodTraceabilityAbi,
    eventName: 'ProductAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `eventName` set to `"ProductTransferred"`
 */
export const useWatchOrganicFoodTraceabilityProductTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: organicFoodTraceabilityAbi,
    eventName: 'ProductTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `eventName` set to `"ProductUpdated"`
 */
export const useWatchOrganicFoodTraceabilityProductUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: organicFoodTraceabilityAbi,
    eventName: 'ProductUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchOrganicFoodTraceabilityRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: organicFoodTraceabilityAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchOrganicFoodTraceabilityRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: organicFoodTraceabilityAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link organicFoodTraceabilityAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchOrganicFoodTraceabilityRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: organicFoodTraceabilityAbi,
    eventName: 'RoleRevoked',
  })
