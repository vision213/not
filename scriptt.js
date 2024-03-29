async function verifyDrug() {
    let batchNumber = document.getElementById("verifyBatchNumber").value;
    
    try {
        let result = await counterfeitDrugContract.methods.verifyDrug(batchNumber).call();
        if (result) {
            document.getElementById("verificationResult").textContent = "Authentic Drug";
        } else {
            document.getElementById("verificationResult").textContent = "Counterfeit Drug";
        }
    } catch (error) {
        console.error(error);
        alert("Error verifying drug: " + error.message);
    }
}
