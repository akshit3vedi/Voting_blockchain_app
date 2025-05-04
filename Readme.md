

You should have node js , ganache, truffle, solidity installed on your local machine. Truffle v5.4.25 Ganache v2.5.4 Solidity - 0.8.11 (solc-js) Node v14.16.0 Web3.js v1.2.7 Metamask

Steps -

run npm i
Connect ganache by linking truffle-config.js file
run truffle compile
run truffle migrate
Open Metamask
Connect Ganache network to Metamask : Network Name: Ganache New RPC URL: http://localhost:7545 Chain ID: 1337 (according to your network id) Symbol: ETH
From accounts section copy any private key and create new account on metamask
In index.js change the Ballot Address from your ganache key
run http-start