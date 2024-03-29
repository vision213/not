// Initialize web3
let web3 = new Web3(Web3.givenProvider);

// Contract address and ABI
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

// Initialize contract
let counterfeitDrugContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to register a drug
async function registerDrug(event) {
    event.preventDefault();
    let batchNumber = document.getElementById("batchNumber").value;
    let name = document.getElementById("name").value;
    let manufacturingDate = new Date(document.getElementById("manufacturingDate").value).getTime() / 1000;

    try {
        let accounts = await web3.eth.requestAccounts();
        let result = await counterfeitDrugContract.methods.registerDrug(batchNumber, name, manufacturingDate).send({
            from: accounts[0]
        });

        alert("Drug registered successfully with transaction hash: " + result.transactionHash);
    } catch (error) {
        console.error(error);
        alert("Error registering drug: " + error.message);
    }
}

// Function to verify a drug
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

// Add event listener for the register form
document.getElementById("registerForm").addEventListener("submit", registerDrug);
