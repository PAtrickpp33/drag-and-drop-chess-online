// Global Variables
//////////////////////////////////////////////////////////////////////////////////////////////////////

// Status of current page
let currentPage = "";

// Logged In or Not
let loggedIn = false;

// Username and Password
let globalUsername = "";
let globalPassword = "";

// User Signed In String
let screenUsername = "Welcome!<br>";

// Check status of loaded pages

let InstituteShopPageAlreadyLoaded = false;

//chess game 

let perdata = "";


//pairme
let lastMovePlayer1 = "";
let lastMovePlayer2 = "";
let gamestate = "";
let gameId = "";
let player1 = "";
let player2 = "";



// Navigation Bar Toggle Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////
const hideAllPages = () => {
    document.getElementById("HomeDIV").style.display = "none";
    document.getElementById("ChessDIV").style.display = "none";
    document.getElementById("InstituteShopDIV").style.display = "none";
    document.getElementById("UserRegistrationDIV").style.display = "none";
    document.getElementById("GuestBookDIV").style.display = "none";
    document.getElementById("LoginDIV").style.display = "none";
}

const HomeDIVToggle = () => {
    if (currentPage != "HomeDIV") {
        currentPage = "HomeDIV";
        hideAllPages();
        document.getElementById("HomeDIV").style.display = "block";
    }
}


const InstituteShopDIVToggle = () => {
    if (currentPage != "InstituteShopDIV") {
        currentPage = "InstituteShopDIV";
        hideAllPages();
        document.getElementById("InstituteShopDIV").style.display = "block";
    }
    if (InstituteShopPageAlreadyLoaded === false) {
        getProducts();
    }

}

const UserRegistrationDIVToggle = () => {
    if (currentPage != "UserRegistrationDIV") {
        currentPage = "UserRegistrationDIV";
        hideAllPages();
        document.getElementById("UserRegistrationDIV").style.display = "block";
    }
}

const GuestBookDIVToggle = () => {
    if (currentPage != "GuestBookDIV") {
        currentPage = "GuestBookDIV";
        hideAllPages();
        document.getElementById("GuestBookDIV").style.display = "block";
    }

    refreshComments();
}

const LoginDIVToggle = () => {
    if (currentPage != "LoginDIV") {
        currentPage = "LoginDIV";
        hideAllPages();
        document.getElementById("LoginDIV").style.display = "block";
    }
}
const ChessDIVToggle = () => {
    if (currentPage != "ChessDIV") {
        currentPage = "ChessDIV";
        hideAllPages();
        document.getElementById("ChessDIV").style.display = "block";
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////


// User Registeration Page Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////
const registerUser = () => {
    const registerUsername = document.getElementById("registerUsername").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const registerAddress = document.getElementById("registerAddress").value;

    if (registerUsername === "" || registerPassword === "" || registerAddress === "") {
        alert("All fields must be filled out");
    }
    else {
        const registerData = {
            "userName": registerUsername,
            "password": registerPassword,
            "address": registerAddress
        };

        const registerBody = JSON.stringify(registerData);

        fetch("https://cws.auckland.ac.nz/gas/api/Register", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: registerBody
        }).then((data) => {
            registerCleanup();
        });
    }
}

const registerCleanup = () => {
    alert("Registration Successful! You have been logged in.");
    setLogin("registerUsername", "registerPassword");
    loggedIn = true;
    toggleLogin();

    // Reset Registration Form
    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerAddress").value = "";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////


// Login Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////
const toggleLogin = () => {
    if (loggedIn) {
        document.getElementById("logout").style.display = "block";
    }
    if (loggedIn === false) {
        document.getElementById("logout").style.display = "none";
        document.getElementById("showID").innerHTML = "Not Logged In";
        globalUsername = "";
        globalPassword = "";
    }
}

const setLogin = (usernameElementID, passwordElementID) => {
    globalUsername = document.getElementById(usernameElementID).value;
    globalPassword = document.getElementById(passwordElementID).value;
    document.getElementById("showID").innerHTML = "";
    document.getElementById("showID").innerHTML = screenUsername + globalUsername;
}

const logOut = () => {
    loggedIn = false;
    toggleLogin();
    alert("Logged Out Successfully!");
}

const login = () => {
    let userName = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    fetch(`https://cws.auckland.ac.nz/gas/api/VersionA`, {
        method: "GET",
        headers: {
            'Authorization': 'Basic ' + btoa(userName + ":" + password),
            'Content-Type': 'application/x-www=form-urlencoded'
        },
    }).then(response => checkLoginCredentials(response.status));
}

const checkLoginCredentials = (responseStatusCode) => {
    if (200 <= responseStatusCode && responseStatusCode < 300) {     //Success Status Code (valid login credentials)
        alert("Login Successful! You have been logged in.");
        HomeDIVToggle();
        loggedIn = true;
        toggleLogin();
        setLogin("loginUsername", "loginPassword");
    }
    else {      // Login Incorrect - Error 401 (Unauthorized)
        alert("Login Unsuccessful. Invalid Login.");
    }
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////


// Guest Book Page Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////
const postComment = () => {
    const commenterName = document.getElementById("commentName").value;
    const commenterComment = document.getElementById("postedComment").value;

    if (commenterName === "" || commenterComment === "") {
        alert("All fields must be filled out");
    }

    const userCommentData = {
        "comment": commenterComment,
        "name": commenterName,
    };

    const commentBody = JSON.stringify(userCommentData);

    fetch("https://cws.auckland.ac.nz/gas/api/Comment", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: commentBody
    }).then(data => {
        commentCleanup();
    });
}

const commentCleanup = () => {
    alert("Comment Submitted!");
    document.getElementById("commentsiFrame").src = document.getElementById("commentsiFrame").src
    document.getElementById("commentName").value = "";
    document.getElementById("postedComment").value = "";
}

const refreshComments = () => {
    let iframe = document.getElementById('commentsiFrame');
    iframe.src = iframe.src;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////


// Shop Page Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////
const getProducts = () => {
    const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/AllItems');
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => showProductsList(data));
}

const showProductsList = (productsData) => {
    let tableContent = "";
    for (let i = 0; i < productsData.length; ++i) {
        let item = productsData[i];
        tableContent += `<li><a><div class="productRow"><div class="productPhoto"><img src="https://cws.auckland.ac.nz/gas/api/ItemPhoto/${item.id}" alt="SHIT Product" width="200px" height=auto></div>\n`;
        tableContent += `<div class="productInfo"><p><b>${item.name}</b></p><br><p>${item.description}</p><br>\n`;
        tableContent += `<p>$${item.price}</p><br><button id="buyProduct" onclick="buyItem(${item.id})">Buy</button></div></div></a></li>\n`;
    }
    document.getElementById("productsUList").innerHTML = tableContent;
}

const productSearch = () => {
    // Declare variables
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('productSearchBar');
    filter = input.value.toUpperCase();
    ul = document.getElementById("productsUList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("b")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

const buyItem = (itemID) => {
    //Check if user is logged in
    //If user is logged in, buy item
    //When item is bought, display a message showing their username that they bought item id

    //If user is NOT logged in, redirect them to login screen
    //Login takes them to homepage

    if (loggedIn) {
        fetch(`https://cws.auckland.ac.nz/gas/api/PurchaseItem/${itemID}`, {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + btoa(globalUsername + ":" + globalPassword),
                'Content-Type': 'application/x-www=form-urlencoded'
            },
        }).then(response => console.log(response.status));

        alert(`User ${globalUsername} successfully purchased product ${itemID}`); //Do Modal instead later
    }
    else {
        LoginDIVToggle();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////


// chess game functions
//////////////////////////////////////////////////////////////////////////////////////////////////////
function drop(ev) {
    ev.preventDefault();
    // get element that fired event
    var elem = event.srcElement;
    // if it's not a DIV (piece) it's an empty TD
    if (elem.tagName != "DIV") {
      // if this TD has a child, the drop happened off to the side
      if (elem.firstElementChild) {
        // move existing piece
        var prent = elem;
        var celem = elem.firstElementChild;
      celem.style.float = "left";
      if (celem.classList.contains("wp")) {
        document.getElementById("wgrave").appendChild(celem);  
        }
        else {
          document.getElementById("bgrave").appendChild(celem);  
        }
      }
      // drop piece
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    } else {
      // move existing piece
      var prent = elem.parentElement;
      elem.style.float = "left";
      if (elem.classList.contains("wp")) {
        document.getElementById("wgrave").appendChild(elem);  
        }
        else {
          document.getElementById("bgrave").appendChild(elem);  
        }
      
      // drop piece
      var data = ev.dataTransfer.getData("text");
      prent.appendChild(document.getElementById(data));
    }
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    if (gamestate == "progress") {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    else {
        alert("The game are not in progress,YOU should login in and click pairMe");
    }
    
  }
function postMove (ev) { 
    var move = document.getElementById("board").innerHTML;
    if (loggedIn&&gamestate=="progress") {
        const moveData = {
            "gameId": gameId,
            "move": move
        };

        const moveBody = JSON.stringify(moveData);

        fetch("https://cws.auckland.ac.nz/gas/api/MyMove", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + btoa(globalUsername + ":" + globalPassword),
            },
            method: "POST",
            body: moveBody
        }).then(response => console.log(response.status) || response) // output the status and return response
            .then(response => response.text()) // send response body to next then chain
            .then(body => alert(body)); // you can use response body here
        
        
    }
    else if (loggedIn && gamestate != "progress") {
        alert("Please click pairMe button,we must ensure your game are in progress");
        
    }
    
    else {
        LoginDIVToggle();
    }
}
function pairMe(ev) {
    if (loggedIn) {
        fetch(`https://cws.auckland.ac.nz/gas/api/PairMe`, {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + btoa(globalUsername + ":" + globalPassword),
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            return response.json().then(function (json) {
            
                lastMovePlayer1 = json.lastMovePlayer1;
                lastMovePlayer2 = json.lastMovePlayer2;
                gamestate = json.state;
                gameId = json.gameId;
                player1 = json.player1;
                player2 = json.player2;
                alert("player1:" + json.player1 + " player2:" + json.player2 + " gamestate:" + json.state + " gameId:" + json.gameId);
                
            });
        });
        perdata=document.getElementById("board").innerHTML
         
    }
    
    else {
        LoginDIVToggle();
    }
}
async function  GetMove(ev) {
    if (loggedIn&&gamestate=="progress") {
        
        const fetchPromise = fetch('https://cws.auckland.ac.nz/gas/api/TheirMove?gameId='+gameId,
    {
        headers:{
            "authorization": 'Basic ' + btoa(globalUsername + ":" + globalPassword),
            "accept": "text/plain" ,
            "Content-Type": "application/json"
        }
    
        
    })

    const streamPromise = fetchPromise.then((response) => response.text())
    streamPromise.then((data)=> showMove(data) )
         
    }
    else if (loggedIn&&gamestate!="progress") {
        alert("Please click pairMe button,we must ensure your game are in progress");
        
    }
    else {
        LoginDIVToggle();
    }
    
}
function Quitgame (ev) { if (loggedIn) {
    fetch(`https://cws.auckland.ac.nz/gas/api/QuitGame?gameId=${gameId}`, {
        method: "GET",
        headers: {
            
            'Authorization': 'Basic ' + btoa(globalUsername + ":" + globalPassword),
            'Content-Type': 'application/json'
        },
    }).then(response => console.log(response.status) || response) // output the status and return response
    .then(response => response.text()) // send response body to next then chain
        .then(body => alert(body)); // you can use response body here
        
        
    showMove(perdata);
    lastMovePlayer1 = "";
    lastMovePlayer2 = "";
    gamestate = "";
    gameId = "";
    player1 = "";
    player2 = "";
       
}
else {
    LoginDIVToggle();
}}

function showMove(data) {
    var board = document.getElementById("board")
    if(data != ""){
        board.innerHTML = data
    }   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = function () {
    
    getProducts();
    refreshComments();
}