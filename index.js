const ballotAbi = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "proposalNames",
        "type": "string[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "chairperson",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "voted",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "vote",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "giveRightToVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "delegate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposal",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "winningProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "winningProposal_",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "winnerName",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Ballot.Proposal",
        "name": "winnerName_",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "viewProposalsName",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "viewChairperson",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "summaryOfVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Ballot.Proposal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "resetVoters",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];



var Ballot;

var userAccount;
var userAccountBalance;
var chairPerson;


// var ballotAddress = "0x5f9b4d6c731EF0Daf3d545Cc6c720813791a17E7";

var ballotAddress = "0x3833851BF438B2731DF89ea9C9E4855d8de55b9F";
//   var name = document.querySelector("#name1");
var proposal_name = document.querySelector("#proposal_name");
var alertPlaceholder = document.getElementById("txStatus");












function startApp() {
  //ballot contratc address
  console.log(userAccount, window.location.href);
  Ballot = new web3.eth.Contract(ballotAbi, ballotAddress);


  //enter value into your profile
  document.getElementById(
    "adminAddress"
  ).innerHTML = `<i class="bi bi-person-fill me-1"></i>  ${userAccount}`;
  document.getElementById(
    "adminBalance"
  ).innerHTML = `<i class="bi bi-currency-dollar me-1"></i>
    ${userAccountBalance} Ether `;

  //  e = sessionStorage.getItem("endVote");
  if (window.location.href == "http://localhost:8080/Voter.html") {
 
    if (JSON.parse(localStorage.getItem("pause"))) {
      $(".votingSection").hide();
      $(".resultSection").show();
      $(".resultSection").html(`<p>Voting paused</p>`);
    } else if (JSON.parse(localStorage.getItem("endVote"))) {

      $(".votingSection").hide();
      $(".resultSection").show();
      winner();
    }
  }

  if (window.location.href == "http://localhost:8080/Admin.html") {
    if (!JSON.parse(localStorage.getItem("pause"))) {
      document.getElementById("pause").value = "pause";
      document.getElementById("pause").textContent = "pause";
    } else {
      document.getElementById("pause").value = "continue";
      document.getElementById("pause").textContent = "continue";
    }
  }

  
}

function displayProposalsName() {
  getProposalsName().then(function (value) {
    value.forEach((element) => {
      console.log(element);
      $(".name1").append(`<p>${element}</p>`);
    });
  });
}

function getProposalsName() {
  return Ballot.methods.viewProposalsName().call();
}

function giveRight(addr) {
  Ballot.methods
    .giveRightToVote(addr)
    .send({
      from: userAccount,
    })
    .on("receipt", function (receipt) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-success alert-dismissible" role="alert">`,
        `   <div>You are now eligible for voting</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
      console.log("success");
    })
    .on("error", function (error) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>Sorry something wrong happen</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
      console.log(error);
    });
}

function vote(index) {
  Ballot.methods
    .vote(index)
    .send({
      from: userAccount,
    })
    .on("receipt", function (receipt) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-success alert-dismissible" role="alert">`,
        `   <div><h2 class="text-center">You have successfully voted</h2></div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
      console.log("success");
    })
    .on("error", function (error) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>Some Error</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
      console.log(error);
    });
}


function winner() {
  Ballot.methods
    .winnerName()
    .call()
    .then(function (value) {
      $(".content").append(
        `<p>Winner name :- ${value.name}</p><p>Total votes :- ${value.voteCount}</p>`
      );
    });
}

function summaryVotes() {
  Ballot.methods
    .summaryOfVotes()
    .call()
    .then(function (value) {
      var temp = [".votes1", ".votes2", ".votes3", ".votes4", ".votes5"];
      var i = 0;
      value.forEach(function (val) {
        console.log(temp[i] +" "+val.voteCount);
        $(temp[i]).html(`<p>${val.voteCount}</p>`);
        i++;
      });
      $("#exampleModal").modal("show");
    })
    .catch((err)=>{
      console.log(err);
    })
}

function resetVote() {
  Ballot.methods
    .resetVoters()
    .send({
      from: userAccount,
    })
    .on("receipt", function (receipt) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-success alert-dismissible" role="alert">`,
        `   <div>You successfully reset voting</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
      console.log("success");
      localStorage.clear()
    })
    .on("error", function (error) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>Sorry! Its unsuccessfull to reset voting</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
      console.log(error);
    });
}


window.addEventListener("load", async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      const accounts = await ethereum.enable();
      // Acccounts now exposed
      userAccount = accounts[0];
      web3.eth.getBalance(userAccount).then(function (val) {
        userAccountBalance = web3.utils.fromWei(val, "ether");
        startApp();
      });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    userAccount = web3.eth.accounts[0];
    web3.eth.getBalance(userAccount).then(function (val) {
      userAccountBalance = web3.utils.fromWei(val, "ether");
      startApp();
    });
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
});

ethereum.on("accountsChanged", (accounts) => {
  window.location.reload();
});

ethereum.on("chainChanged", (chainId) => {
  window.location.reload();
});

$("#giveRight").click(function (params) {
  let value = $("#addressId").val();
  giveRight(value);
});

$("#vote").click(function (params) {
  var radios = document.getElementsByName("flexRadioDefault");
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      console.log(radios[i].value);
      vote(radios[i].value);
      break;
    }
  }
});



$("#summary").click(function () {
  console.log("hello");
  summaryVotes();
});


// admin end vote
$("#endVote").click(function (val) {
  localStorage.setItem("endVote", true);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-success alert-dismissible" role="alert">`,
    `   <div>Voting is over. You can see winner name soon</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
});

// admin pause button
$("#pause").click(function (val) {
  var btn = document.getElementById("pause");

  if (btn.value == "pause") {
    btn.value = "continue";
    btn.textContent = "continue";
    localStorage.setItem("pause", true);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-success alert-dismissible" role="alert">`,
      `   <div>You successfully pause the voting</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  } else if (btn.value == "continue") {
    btn.value = "pause";
    btn.textContent = "pause";
    localStorage.setItem("pause", false);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-success alert-dismissible" role="alert">`,
      `   <div>Voting is continue</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  }
});

$("#reset").click(function (val) {
  resetVote();
});

//for login home page
$("#submit").click(function () {
  let value = $("#loginId").val();
  // let temp = "0x25236bdb3cd72bEBaA0bea08f6f42cB924c3F659";
  let temp = "0x64D6B0044f0Bfc7A02A06A9ECddDCd4DB608840f";
console.log("hi");
  console.log(value, temp);
 
  if (value.toLowerCase() == temp.toLowerCase()) {
    window.location.href = "./Admin.html";
  } else if (value.toLowerCase() == userAccount.toLowerCase()) {
    window.location.href = "./Voter.html";
  }
});
