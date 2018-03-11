function computeBits() {
    var data = $("#input").val();

    var result = "";
    for (var i = 0; i < data.length; i++) {
        var n = data.charCodeAt(i).toString(2);
        result = result + "00000000".substr(n.length) + n;
    }

    $("#bits").val(result);
}

function computeNumbers() {
    $("#numbers").val("");
    var bitData = $("#bits").val();
    var numbers = [];

    var number256 = bigInt(0);
    var big2 = bigInt(2);
    for (var i = 0; i < bitData.length; i++) {
        if (i % 256 == 0 && i > 0) {
            numbers.push("0x" + number256.toString(16));
            number256 = bigInt(0);
        }

        // console.log(number256);

        number256 = number256.multiply(big2)
        number256 = number256.plus(bitData.charCodeAt(i) - 48);
    }

    if ((bitData.length + 1) % 256 != 0) {
        numbers.push("0x" + number256.toString(16));
    }

    $("#numbers").val(JSON.stringify(numbers));
}

var web3;
var abiOfContract = [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "numberArray", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "stringArray", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "singleString", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "singleNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "x", "type": "uint256" }], "name": "setSingleNumber", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "PayableContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "x", "type": "string" }], "name": "updateStringArray", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "clear", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "initializeArrays", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [{ "name": "x", "type": "uint256" }], "name": "updateNumberArray", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "x", "type": "uint256" }], "name": "pushToNumberArray", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "x", "type": "string" }], "name": "pushToStringArray", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": false, "inputs": [{ "name": "x", "type": "string" }], "name": "setSingleString", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }];
var demoContract;

$(document).ready(function () {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);

        var contractAbi = web3.eth.contract(abiOfContract);
        demoContract = contractAbi.at('0x6B4562D11BFAAd3f75d606aD341f776E7597eF7D');
    } else {
        console.log('missing web3')
    }
});



//var Web3 = require('web3');
//var	 web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'))


function setSingleNumber(numberAsStringx16) {
    console.log(numberAsStringx16)

    demoContract.setSingleNumber(numberAsStringx16, { gas: 2000000 }, function (err, result) {
        console.log(err);
        console.log(result);
    });
}

function getSingleNumber() {
    var number = demoContract.singleNumber(function (err, reslt) {
        console.log(reslt);
        var number = '0x' + reslt.toString(16);
        $('#contractNumberGet').val(number);
    });
}