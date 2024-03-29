// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract counterfeitDrugDetection {
    // Structure to represent a drug
    struct Drug {
        uint256 batchNumber;
        string name;
        uint256 manufacturingDate;
        address manufacturer;
        bool isRegistered;
    }

    // Mapping of drug ID to Drug struct
    mapping(uint256 => Drug) public drugs;

    // Event to log when a drug is registered
    event DrugRegistered(uint256 indexed batchNumber, string name, uint256 manufacturingDate, address manufacturer);

    // Function to register a new drug
    function registerDrug(uint256 _batchNumber, string memory _name, uint256 _manufacturingDate) public {
        require(!drugs[_batchNumber].isRegistered, "Drug with this batch number already registered");

        Drug memory newDrug = Drug(_batchNumber, _name, _manufacturingDate, msg.sender, true);
        drugs[_batchNumber] = newDrug;

        emit DrugRegistered(_batchNumber, _name, _manufacturingDate, msg.sender);
    }

    // Function to verify the authenticity of a drug
    function verifyDrug(uint256 _batchNumber) public view returns (bool) {
        return drugs[_batchNumber].isRegistered;
    }
}
