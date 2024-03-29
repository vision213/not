const productVerificationAddress = 'YOUR_PRODUCT_VERIFICATION_ADDRESS';
const productRegistryAddress = 'YOUR_PRODUCT_REGISTRY_ADDRESS';

let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

let productVerificationContract = new web3.eth.Contract(abi, productVerificationAddress);
let productRegistryContract = new web3.eth.Contract(abi, productRegistryAddress);

async function verifyProduct() {
    const batchNumber = document.getElementById("batchNumber").value;

    try {
        let result = await productVerificationContract.methods.verifyProduct(batchNumber).call();
        if (result) {
            document.getElementById("result").innerHTML = `Product with Batch Number ${batchNumber} is Authentic!`;
        } else {
            document.getElementById("result").innerHTML = `Product with Batch Number ${batchNumber} is Counterfeit!`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById("result").innerHTML = "Error verifying product.";
    }
}