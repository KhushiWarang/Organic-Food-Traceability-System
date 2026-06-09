// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract OrganicFoodTraceability is AccessControl {
    // Define roles
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");

    // Product structure
    struct Product {
        uint256 id;
        string name;
        string description;
        address currentOwner;
        string currentStage;
        uint256 timestamp;
        string[] history;
    }

    // State variables
    mapping(uint256 => Product) public products;
    uint256 public productCount;
    
    // Mappings for queries
    mapping(address => uint256[]) public userProducts;
    mapping(address => uint256[]) public userExitProducts;
    mapping(address => uint256[]) public userUsedProducts;

    // Events
    event ProductAdded(
        uint256 indexed productId,
        string name,
        address indexed owner,
        string stage,
        uint256 timestamp
    );
    
    event ProductUpdated(
        uint256 indexed productId,
        string newStage,
        address indexed updatedBy,
        uint256 timestamp
    );
    
    event ProductTransferred(
        uint256 indexed productId,
        address indexed from,
        address indexed to,
        string stage,
        uint256 timestamp
    );

    // Constructor
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Modifiers
    modifier onlyFarmerOrManufacturer() {
        require(
            hasRole(FARMER_ROLE, msg.sender) || hasRole(MANUFACTURER_ROLE, msg.sender),
            "Only Farmer or Manufacturer can perform this action"
        );
        _;
    }

    modifier onlyRetailerOrConsumer() {
        require(
            hasRole(RETAILER_ROLE, msg.sender) || hasRole(CONSUMER_ROLE, msg.sender),
            "Only Retailer or Consumer can perform this action"
        );
        _;
    }

    // Admin functions
    function grantUserRole(address account, bytes32 role) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            role == FARMER_ROLE ||
            role == MANUFACTURER_ROLE ||
            role == DISTRIBUTOR_ROLE ||
            role == RETAILER_ROLE ||
            role == CONSUMER_ROLE,
            "Invalid role"
        );
        _grantRole(role, account);
    }

    function revokeUserRole(address account, bytes32 role) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(role, account);
    }

    // Product functions
    function addProduct(
        string memory name,
        string memory description
    ) external onlyFarmerOrManufacturer returns (uint256) {
        productCount++;
        uint256 productId = productCount;

        string memory stage;
        if (hasRole(FARMER_ROLE, msg.sender)) {
            stage = "Farm";
        } else {
            stage = "Manufacturing";
        }

        Product storage newProduct = products[productId];
        newProduct.id = productId;
        newProduct.name = name;
        newProduct.description = description;
        newProduct.currentOwner = msg.sender;
        newProduct.currentStage = stage;
        newProduct.timestamp = block.timestamp;

        string memory historyEntry = string(
            abi.encodePacked(
                "Stage: ", stage,
                " | Owner: ", addressToString(msg.sender),
                " | Time: ", uint2str(block.timestamp)
            )
        );
        newProduct.history.push(historyEntry);

        userProducts[msg.sender].push(productId);

        emit ProductAdded(productId, name, msg.sender, stage, block.timestamp);

        return productId;
    }

    function updateProduct(
        uint256 productId,
        string memory newStage
    ) external {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        Product storage product = products[productId];
        require(product.currentOwner == msg.sender, "Only owner can update product");

        product.currentStage = newStage;
        product.timestamp = block.timestamp;

        string memory historyEntry = string(
            abi.encodePacked(
                "Updated Stage: ", newStage,
                " | By: ", addressToString(msg.sender),
                " | Time: ", uint2str(block.timestamp)
            )
        );
        product.history.push(historyEntry);

        emit ProductUpdated(productId, newStage, msg.sender, block.timestamp);
    }

    function transferProduct(
        uint256 productId,
        address to
    ) external {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        Product storage product = products[productId];
        require(product.currentOwner == msg.sender, "Only owner can transfer product");
        require(to != address(0), "Invalid recipient address");

        string memory newStage;
        if (hasRole(MANUFACTURER_ROLE, to)) {
            newStage = "Manufacturing";
        } else if (hasRole(DISTRIBUTOR_ROLE, to)) {
            newStage = "Distribution";
        } else if (hasRole(RETAILER_ROLE, to)) {
            newStage = "Retail";
        } else if (hasRole(CONSUMER_ROLE, to)) {
            newStage = "Consumer";
        } else {
            newStage = "Transferred";
        }

        address from = product.currentOwner;
        product.currentOwner = to;
        product.currentStage = newStage;
        product.timestamp = block.timestamp;

        string memory historyEntry = string(
            abi.encodePacked(
                "Transferred to: ", addressToString(to),
                " | Stage: ", newStage,
                " | Time: ", uint2str(block.timestamp)
            )
        );
        product.history.push(historyEntry);

        userProducts[to].push(productId);
        userExitProducts[from].push(productId);

        emit ProductTransferred(productId, from, to, newStage, block.timestamp);
    }

    function markProductAsUsed(uint256 productId) external onlyRetailerOrConsumer {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        Product storage product = products[productId];
        require(product.currentOwner == msg.sender, "Only owner can mark product as used");

        product.currentStage = "Used";
        product.timestamp = block.timestamp;

        string memory historyEntry = string(
            abi.encodePacked(
                "Marked as Used by: ", addressToString(msg.sender),
                " | Time: ", uint2str(block.timestamp)
            )
        );
        product.history.push(historyEntry);

        userUsedProducts[msg.sender].push(productId);

        emit ProductUpdated(productId, "Used", msg.sender, block.timestamp);
    }

    // View functions
    function getProduct(uint256 productId) external view returns (
        uint256 id,
        string memory name,
        string memory description,
        address currentOwner,
        string memory currentStage,
        uint256 timestamp
    ) {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        Product storage product = products[productId];
        return (
            product.id,
            product.name,
            product.description,
            product.currentOwner,
            product.currentStage,
            product.timestamp
        );
    }

    function getProductHistory(uint256 productId) external view returns (string[] memory) {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        return products[productId].history;
    }

    function getUserProducts(address user) external view returns (uint256[] memory) {
        return userProducts[user];
    }

    function getUserExitProducts(address user) external view returns (uint256[] memory) {
        return userExitProducts[user];
    }

    function getUserUsedProducts(address user) external view returns (uint256[] memory) {
        return userUsedProducts[user];
    }

    function getUserRole(address user) external view returns (string memory) {
        if (hasRole(DEFAULT_ADMIN_ROLE, user)) return "Admin";
        if (hasRole(FARMER_ROLE, user)) return "Farmer";
        if (hasRole(MANUFACTURER_ROLE, user)) return "Manufacturer";
        if (hasRole(DISTRIBUTOR_ROLE, user)) return "Distributor";
        if (hasRole(RETAILER_ROLE, user)) return "Retailer";
        if (hasRole(CONSUMER_ROLE, user)) return "Consumer";
        return "None";
    }

    function getAllProducts() external view returns (uint256[] memory) {
        uint256[] memory allProductIds = new uint256[](productCount);
        for (uint256 i = 0; i < productCount; i++) {
            allProductIds[i] = i + 1;
        }
        return allProductIds;
    }

    // Helper functions
    function addressToString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(j - j / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            j /= 10;
        }
        return string(bstr);
    }
}
