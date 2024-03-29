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

    // Replace with your deployed contract address on Ganache
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [
        // Paste your contract ABI here
        {
            "inputs": [],
            "name": "CounterfeitDrugDetection",
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        // Add other ABI entries here
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

document.getElementById("registerForm").addEventListener("submit", registerDrug);
