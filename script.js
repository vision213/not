let web3;
let counterfeitDrugContract; // Define the variable at the global scope

// Wait for the window to load before initializing
window.onload = async function () {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            console.error(error);
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    // Replace with your deployed contract address
    const contractAddress = '0xb8e0Ad8DFf10c59ddace8c8DA294aD8909C4bc36'; // Replace with the actual contract address
    const contractABI = [
        // Paste your contract ABI here
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "batchNumber",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "manufacturingDate",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "manufacturer",
                    "type": "address"
                }
            ],
            "name": "DrugRegistered",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "drugs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "batchNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "manufacturingDate",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "manufacturer",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isRegistered",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_manufacturingDate",
                    "type": "uint256"
                }
            ],
            "name": "registerDrug",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_batchNumber",
                    "type": "uint256"
                }
            ],
            "name": "verifyDrug",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    counterfeitDrugContract = new web3.eth.Contract(contractABI, contractAddress);

    // Check if the contract is initialized
    if (counterfeitDrugContract) {
        console.log("Contract initialized:", counterfeitDrugContract);
    } else {
        console.error("Contract not initialized.");
    }
};

async function registerDrug(event) {
    event.preventDefault();
    let batchNumber = document.getElementById("batchNumber").value;
    let name = document.getElementById("name").value;
    let manufacturingDate = new Date(document.getElementById("manufacturingDate").value).getTime() / 1000;

    try {
        let accounts = await web3.eth.getAccounts();
        console.log("Accounts:", accounts); // Log the accounts for debugging
        console.log("Counterfeit Drug Contract:", counterfeitDrugContract); // Log the contract for debugging
        let result = await counterfeitDrugContract.methods.registerDrug(batchNumber, name, manufacturingDate).send({
            from: accounts[0]
        });

        alert("Drug registered successfully with transaction hash: " + result.transactionHash);
    } catch (error) {
        console.error(error);
        alert("Error registering drug: " + error.message);
    }
}

async function verifyDrug() {
    let batchNumber = document.getElementById("verifyBatchNumber").value;

    try {
        let result = await counterfeitDrugContract.methods.verifyDrug(batchNumber).call();
        let message = result ? "Authentic Drug" : "Counterfeit Drug";
        document.getElementById("verificationResult").textContent = message;
    } catch (error) {
        console.error(error);
        alert("Error verifying drug: " + error.message);
    }
}

// Add 10 random drug datasets for testing
let randomDrugs = [
    { batchNumber: 12345, name: "Paracetamol", manufacturingDate: 1648939200 }, // Example 1
    { batchNumber: 54321, name: "Ibuprofen", manufacturingDate: 1648593600 }, // Example 2
    { batchNumber: 98765, name: "Aspirin", manufacturingDate: 1648262400 }, // Example 3
    { batchNumber: 67890, name: "Amoxicillin", manufacturingDate: 1647931200 }, // Example 4
    { batchNumber: 13579, name: "Ciprofloxacin", manufacturingDate: 1647595200 }, // Example 5
    { batchNumber: 24680, name: "Lisinopril", manufacturingDate: 1647264000 }, // Example 6
    { batchNumber: 11223, name: "Atorvastatin", manufacturingDate: 1646928000 }, // Example 7
    { batchNumber: 33445, name: "Metformin", manufacturingDate: 1646596800 }, // Example 8
    { batchNumber: 55667, name: "Levothyroxine", manufacturingDate: 1646265600 }, // Example 9
    { batchNumber: 77889, name: "Simvastatin", manufacturingDate: 1645934400 } // Example 10
];

// Display random drugs in the table
let drugsTable = document.getElementById("drugsTable");
randomDrugs.forEach(drug => {
    let row = drugsTable.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = drug.batchNumber;
    cell2.innerHTML = drug.name;
    cell3.innerHTML = new Date(drug.manufacturingDate * 1000).toLocaleDateString();
    let verifyButton = document.createElement("button");
    verifyButton.innerHTML = "Verify";
    verifyButton.addEventListener("click", () => {
        document.getElementById("verifyBatchNumber").value = drug.batchNumber;
        verifyDrug();
    });
    cell4.appendChild(verifyButton);
});

document.getElementById("registerForm").addEventListener("submit", registerDrug);
