/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    //myMain();
    
    setButtonListeners();
    
    app.receivedEvent('deviceready');
    
    //document.getElementById("takePhoto").addEventListener('touchend',newGameButton,false);
    
},
    
    
    // Update DOM on a Received Event
receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    
    console.log('Received Event: ' + id);
}
};

app.initialize();

var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=41.997346,21.427996&sensor=true';
var lant = 41.997346;
var long = 21.427996;
var gameState = "Initial";
var currentCountry = "";

var playerName = "";
var playerPhoto = "";
var playerAudioName = "";

var numberOfStages = 0;

var players = new Array();
var femalePlayerNames = new Array();
var malePlayerNames = new Array();
var currentPlayer = 0;
var playersPlaying = 0;

var gameData = new Array();
var gameContent;
var nameTest = "";

var playerAccounts = {};
var accountsFileEntry;
var playerAchievements = {};
var playerFileEntry;

var selfVoting = false;

function setCountry(country)
{
    setCountryImage(country);
    setCountryData(country);
    
}

function setCountryData(country){
    //malePlayerNames.push();
    if(country === "Macedonia (FYROM)"){
        $.getJSON("countrycontent/mkddata.json", function(data, status){
                  
                  gameData = data.stages;
                  //alert(data);
                  
                  for(var i = 0 ; i < data.playerNames.maleNames.length; i ++)
                  {
                  malePlayerNames.push(data.playerNames.maleNames[i]);
                  }
                  for(var i = 0 ; i < data.playerNames.maleNames.length; i ++)
                  {
                  femalePlayerNames.push(data.playerNames.femaleNames[i]);
                  }
                  
                  });
    }
}

function setCountryImage(country)
{
    
    var image = document.getElementById('playerImage');
    if(country === "Macedonia (FYROM)"){
        // alert("test1");
        image.src = "./img/mkdflag.png";
        // alert("test2");
    }
    
}

function getLocation(){
    $.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lant + ", " + long + "&sensor=true", function(data, status){
          
          setCountry(data.results[0].address_components[6].long_name);
          });
    
    return false;
}


var geolocationSuccess = function(position) {
    lant = position.coords.latitude;
    long = position.coords.longitude;
    
    return false;
};

function setButtonListeners()
{
    
    navigator.geolocation.getCurrentPosition(geolocationSuccess);
    
    if(device.platform === "Android" || device.platform == "iOS")
    {
        document.querySelector("#newGameButton").addEventListener('click',function(){
                                                                  newGame();
                                                                  },false);
        
        document.querySelector("#startGameButton").addEventListener('click',function(){
                                                                    
                                                                    startGame();
                                                                    
                                                                    },false);
        
        var nextPlayerButtons = document.getElementsByClassName("nextPlayerButton");
        for(var i = 0; i < nextPlayerButtons.length ; i ++)
        {
            
            nextPlayerButtons[i].addEventListener('click',function(){
                                                  
                                                  nextPlayerFunction();
                                                  
                                                  },false);
            
        }
        
        document.getElementById("sayYourNameButton").addEventListener('click',function(){
                                                                      
                                                                      sayYourNameFunction();
                                                                      
                                                                      },false);
        
        document.getElementById("takePhotoButton").addEventListener('click',function(){
                                                                    
                                                                    
                                                                    takePhoto();
                                                                    
                                                                    
                                                                    
                                                                    },false);
        document.getElementById("exitButton").addEventListener('click',function(){
                                                               exitButtonClicked();
                                                               
                                                               },false);
        
        document.getElementById("signInButton").addEventListener('click',function(){
                                                                 userSignin();
                                                                 
                                                                 },false);
        
        document.getElementById("menuSigninButton").addEventListener('click',function(){
                                                                     switchToSignin();
                                                                     
                                                                     },false);
        
        document.getElementById("signUnButton").addEventListener('click',function(){
                                                                 signUp();
                                                                 },false);
        
    }
    else
    {
        document.getElementById("newGameButton").addEventListener('click',newGameButton,false);
        
        document.getElementById("startGameButton").addEventListener('click',startGameButton,false);
        
        var nextPlayerButtons = document.getElementsByClassName("nextPlayerButton");
        for(var i = 0; i < nextPlayerButtons.length ; i ++)
        {
            
            nextPlayerButtons[i].addEventListener('click',nextPlayerButton,false);
            
        }
        
        document.getElementById("takePhotoButton").addEventListener('click',takePhotoButton,false);
        document.getElementById("exitButton").addEventListener('click',exitButtonFunc,false);
        
        document.getElementById("signInButton").addEventListener('click',function(){
                                                                 userSignin();
                                                                 
                                                                 },false);
        
        document.getElementById("signUnButton").addEventListener('click',function(){
                                                                 signUp();
                                                                 },false);
        
        document.getElementById("menuSigninButton").addEventListener('click',function(){
                                                                     switchToSignin();
                                                                     
                                                                     },false);
        
    }
    
    document.getElementById("displayAchievements").addEventListener('click',function(){
                                                                    displayAchievements();
                                                                    
                                                                    },false);
    getLocation();
    getAllAccounts();
}

function switchToSignin(){
    gameState = "signin";
    toggleScreen();
    
}

function userSignin()
{
    var name = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    if(playerAccounts[name] === password){
        
        playerAchievements = {};
        
        loadAchievementsForUser(name);
        
        gameState = "initial";
        toggleScreen();
    }
    else
    {
        alert("Account and password didn't match");
    }
    return false;
}

function displayAchievements(){
    for(key in playerAchievements){
        if(key != "")
            alert(key + ":" + playerAchievements[key]);
    }
    return false;
}


function loadAchievementsForUser(name)
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                             
                             //console.log('file system open: ' + fs.name);
                             fs.root.getFile(name+".dat", { create: true, exclusive: false }, function (fileEntry) {
                                             playerFileEntry = fileEntry;
                                             loadAchievements(fileEntry);
                                             
                                             
                                             }, function(errorMsg){
                                             // alert(errorMsg);
                                             });
                             }, function(errorMsg){
                             alert(errorMsg);
                             });
    
    return false;
}

function loadAchievements(fileEntry)
{
    fileEntry.file(function (file) {
                   var reader = new FileReader();
                   
                   reader.onloadend = function() {
                   // console.log("Successful file read: " + this.result);
                   var achievements = this.result.split(";");
                   for(var i = 0; i < achievements.length ; i++)
                   {
                   var temp = achievements[i].split("*");
                   playerAchievements[temp[0]] = temp[1];
                   }
                   
                   };
                   
                   reader.readAsText(file);
                   
                   }, function(error)
                   {
                   alert(error);
                   });
    return false;
}

function incrementAchievement(name){
    for(key in playerAchievements){
        if(key === name)
        {
            playerAchievements[name] =parseInt(playerAchievements[name]) + 1;
            
            return false;
        }
    }
    
    playerAchievements[name] = 1;
    return false;
}

function addAchievement(name){
    
    for(key in playerAchievements){
        if(key === name)
        {
            return false;
        }
    }
    alert("You achieved : " + name);
    playerAchievements[name] = 1;
    return false;
}

function saveAchievements()
{
    if(playerFileEntry === undefined)
    {
        return false;
    }
    var data = "";
    for(key in playerAchievements){
        data = data + key + "*" + playerAchievements[key] + ";"
    }
    
    playerFileEntry.createWriter(function (fileWriter) {
                                 
                                 fileWriter.onwriteend = function() {
                                 
                                 };
                                 
                                 fileWriter.onerror = function (e) {
                                 
                                 };
                                 
                                 for(key in playerAchievements){
                                 
                                 fileWriter.write(data);
                                 
                                 }
                                 
                                 });
    
    return false;
}


function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
                           
                           fileWriter.onwriteend = function() {
                           // console.log("Successful file write...");
                           // aler(fileEntry.name + "testing");
                           //readFile(fileEntry);
                           };
                           
                           fileWriter.onerror = function (e) {
                           //console.log("Failed file write: " + e.toString());
                           };
                           
                           // If data object is not passed in,
                           // create a new Blob sinstead.
                           if (!dataObj) {
                           
                           // dataObj = new Blob(['some file data'], { type: 'text/plain' });
                           return false;
                           }
                           
                           fileWriter.seek(fileWriter.length);
                           fileWriter.write(dataObj);
                           
                           });
    
    return false;
}

function readFile(fileEntry) {
    
    //alert(fileEntry.name + "wow");
    fileEntry.file(function (file) {
                   var reader = new FileReader();
                   
                   reader.onloadend = function() {
                   console.log("Successful file read: " + this.result);
                   // displayFileData(fileEntry.fullPath + ": " + this.result);
                   // alert("data : " + this.result);
                   };
                   
                   reader.readAsText(file);
                   
                   }, function(error)
                   {
                   alert("Error :" + error);
                   });
    return false;
}


function readAccounts(fileEntry)
{
    accountsFileEntry = fileEntry;
    //alert(accountsFileEntry.name);
    fileEntry.file(function (file) {
                   var reader = new FileReader();
                   
                   reader.onloadend = function() {
                   
                   //console.log("Successful file read: " + this.result);
                   
                   var accounts = this.result.split("*");
                   
                   for(var i = 0 ; i < accounts.length; i++){
                   
                   var temp = accounts[i].split("-");
                   playerAccounts[temp[0]] = temp[1];
                   }
                   
                   };
                   
                   reader.readAsText(file);
                   
                   }, function(error)
                   {
                   alert("Error : " + error);
                   });
    return false;
}

function getAllAccounts()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                             
                             //console.log('file system open: ' + fs.name);
                             fs.root.getFile("playerAccounts.dat", { create: true, exclusive: false }, function (fileEntry) {
                                             
                                             readAccounts(fileEntry);
                                             }, function(errorMsg){
                                             alert("Error : " +errorMsg);
                                             });
                             }, function(errorMsg){
                             alert("Error : " +errorMsg);
                             });
    
    return false;
}

function signUp()
{
    
    var name = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    
    //alert(playerAccounts[name]);
    
    for(key in playerAccounts){
        /* use key/value for intended purpose */
        if(name === key)
        {
            alert("Such user already exists");
            return false;
        }
        
    }
    
    
    writeFile(accountsFileEntry,name+"-"+password+"*");
    
    playerAccounts[name] = password;
    /*
     for(key in playerAccounts){
     var value = playerAccounts[key];
     
     
     }
     */
    return false;
}

function createFile()
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                             
                             //console.log('file system open: ' + fs.name);
                             fs.root.getFile("achievements.txt", { create: true, exclusive: false }, function (fileEntry) {
                                             
                                             //console.log("fileEntry is file?" + fileEntry.isFile.toString());
                                             // fileEntry.name == 'someFile.txt'
                                             // fileEntry.fullPath == '/someFile.txt'
                                             //
                                             writeFile(fileEntry, "wow i r amazed.");
                                             //readFile(fileEntry);
                                             }, function(errorMsg){
                                             alert(errorMsg);
                                             });
                             }, function(errorMsg){
                             alert(errorMsg);
                             });
    
    return false;
}

function toggleScreen()
{
    if(gameState === "initial")
    {
        //MainmenuDiv
        document.getElementById("MainmenuDiv").style.display = "block";
        document.getElementById("NewgameDiv").style.display = "none";
        document.getElementById("GameplayScreen1").style.display = "none";
        document.getElementById("GameplayScreen2").style.display = "none";
        document.getElementById("GameplayScreen3").style.display = "none";
        document.getElementById("signinId").style.display = "none";
    }
    else
        if(gameState === "creatingGame")
        {
            document.getElementById("MainmenuDiv").style.display = "none";
            document.getElementById("NewgameDiv").style.display = "block";
            document.getElementById("GameplayScreen1").style.display = "none";
            document.getElementById("GameplayScreen2").style.display = "none";
            document.getElementById("GameplayScreen3").style.display = "none";
            document.getElementById("signinId").style.display = "none";
        }
        else
            if(gameState === "gameplayStages")
            {
                document.getElementById("MainmenuDiv").style.display = "none";
                document.getElementById("NewgameDiv").style.display = "none";
                document.getElementById("GameplayScreen1").style.display = "block";
                document.getElementById("GameplayScreen2").style.display = "none";
                document.getElementById("GameplayScreen3").style.display = "none";
                document.getElementById("signinId").style.display = "none";
                
            }
            else
                if(gameState === "gameplayVoting")
                {
                    document.getElementById("MainmenuDiv").style.display = "none";
                    document.getElementById("NewgameDiv").style.display = "none";
                    document.getElementById("GameplayScreen1").style.display = "none";
                    document.getElementById("GameplayScreen2").style.display = "block";
                    document.getElementById("GameplayScreen3").style.display = "none";
                    document.getElementById("signinId").style.display = "none";
                }
                else
                    if(gameState === "gameplayScoreboard"){
                        document.getElementById("MainmenuDiv").style.display = "none";
                        document.getElementById("NewgameDiv").style.display = "none";
                        document.getElementById("GameplayScreen1").style.display = "none";
                        document.getElementById("GameplayScreen2").style.display = "none";
                        document.getElementById("GameplayScreen3").style.display = "block";
                        document.getElementById("signinId").style.display = "none";
                        
                    }
                    else
                        if(gameState === "signin")
                        {
                            document.getElementById("MainmenuDiv").style.display = "none";
                            document.getElementById("NewgameDiv").style.display = "none";
                            document.getElementById("GameplayScreen1").style.display = "none";
                            document.getElementById("GameplayScreen2").style.display = "none";
                            document.getElementById("GameplayScreen3").style.display = "none";
                            document.getElementById("signinId").style.display = "block";
                        }
    
    return false;
}

var alertButton = function (){
    alert("simpleAlert");
    return false;
};

var exitButtonFunc = function (){
    exitButtonClicked();
};

function exitButtonClicked()
{
    if(gameState === "initial")
    {
        exitApp();
    }
    else {
        
        players = new Array();
        numberOfStages = 0;
        gameState = "initial";
        femalePlayerNames = new Array();
        malePlayerNames = new Array();
        getLocation();
        toggleScreen();
    }
    return false;
}

var sayYourNameButton = sayYourNameFunction();

function sayYourNameFunction(){
    

    var record = new Media('recordplayer'+currentPlayer+'.wav');
    record.startRecord();
    setTimeout(function(){
               record.stopRecord();
               record.release();
               playerAudioName = "yey :D ";
               alert("recording finished");
               
               record = new Media('recordplayer'+currentPlayer+'.wav');
               record.play();
               
               setTimeout(function(){
                          record.stop();
                          record.release();
                          
                          },1500);
               
               },1500);
    
    return false;
}

function exitApp()
{
    
}

var newGameButton = function (){
    newGame();
};

function newGame(){
    
    gameState = "creatingGame";
    selfVoting = false;
    playersPlaying = 0;
    players = new Array();
    
    toggleScreen();
    
    setNewPlayerNames();
    
    return false;
    
}

function setNewPlayerNames()
{
    
    var element = document.getElementById("nameselect");
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    
    var brPara = document.createElement("br");
    var pPara = document.createElement("h2");
    var txtNode = document.createTextNode("Pick one of the following names: ");
    pPara.appendChild(txtNode);
    
    //element.appendChild(brPara);
    element.appendChild(pPara);
    
    for(var i = 0 ; i < 3; i++)
    {
        var num = getRandomArbitrary(0,malePlayerNames.length);
        addNewPlayerName(malePlayerNames[num]);
        malePlayerNames.splice(num, 1);
        num = getRandomArbitrary(0,femalePlayerNames.length);
        addNewPlayerName(femalePlayerNames[num]);
        femalePlayerNames.splice(num, 1);
    }
    element.appendChild(brPara);
    return false;
    
}

function addNewPlayerName(name)
{
    var para = document.createElement("button");
    para.setAttribute("id", name);
    para.setAttribute("class","playerNameButton");
    
    
    var node = document.createTextNode(name);
    para.appendChild(node);
    
    var element = document.getElementById("nameselect");
    element.appendChild(para);
    var brPara = document.createElement("br");
    element.appendChild(brPara);
    
    document.getElementById(name).addEventListener('click',function(){
                                                   $("html, body").animate({ scrollTop: 800 }, 600);
                                                   playerName = name;
                                                   },false);
}

var takePhotoButton = function(){
    takePhoto();
};

function takePhoto()
{
    $("html, body").animate({ scrollTop: 300 }, 600);
    var cameraOptions = {
        quality : 100,
        allowEdit : false,
        targetWidth : 300,
        targetHeight : 300,
        correctOrientation : true,
        saveToPhotoAlbum : false,
        destinationType : 1
    };
    
/*
    if(device.platform === "Android")
    {
        cameraOptions.destinationType = 1;
    }else
        if(device.platform === "iOS")
        {
            cameraOptions.destinationType = 2;
        }else
        {
            cameraOptions.destinationType = 0;
        }
    */
    navigator.camera.getPicture(function (imageData)
                                {
                                
                                var image = document.getElementById('playerImage');
                                if(device.platform === "Android" || device.platform === "iOS")
                                {
                                playerPhoto = imageData;
                                image.src = playerPhoto;
                                }
                                else
                                {
                                
                                image.src ="data:image/jpeg;base64," + imageData;
                                }
                                return false;
                                }, cameraError, cameraOptions);
    
    return false;
}

var cameraSuccess = function (imageData)
{
    
    var image = document.getElementById('playerImage');
    // playerPhoto = imageData;
    if(device.platform === "Android" || device.platform === "iOS")
    {
        playerPhoto = imageData;
        //image.src = "data:image/jpeg;base64," + playerPhoto;
        image.src = playerPhoto;
        
        
    }
    else
    {
        //image.src = "data:image/jpeg;base64," + imageData;
        image.src ="data:image/jpeg;base64," + imageData;
    }
    return false;
};

var cameraError = function (result)
{
    alert("Camera error : " + result);
    return false;
};

function pickName(name)
{
    playerName = name;
}

var nextPlayerButton = function ()
{
    nextPlayerFunction();
};

function changeUI()
{
    
    playerName = players[currentPlayer].playerName;
    
    var record = new Media('recordplayer'+currentPlayer+'.wav');
    record.play();
    
    setTimeout(function(){
               record.stop();
               record.release();
               
               },1500);
    
    
    var image = document.getElementById('playerImage');
    image.src = players[currentPlayer].playerPhoto;
    
    setUpStageForPlayer();
    
    
    toggleScreen();
    return false;
}

function setUpStageForPlayer()
{
    var contentPara = document.getElementById("contentPara");
    
    var objectivePara = document.getElementById("objectivePara");
    
    if(numberOfStages == 2){
        //var picture = document.getElementById("gameplayImage").style.display = "block";
        //contentPara.innerHTML = gameContent.content[getRandomArbitrary(0,gameContent.content.length)];
        contentPara.innerHTML = "";
        //picture.src = "gameContent.content[getRandomArbitrary(0,gameContent.content.length)]";
        
        var imgPara = document.createElement("img");
        imgPara.setAttribute("src", gameContent.content[getRandomArbitrary(0,gameContent.content.length)]);
        imgPara.setAttribute("width",150);
        imgPara.setAttribute("height",150);
        
        contentPara.appendChild(imgPara);
        
    }
    else 
    {
        //document.getElementById("gameplayImage").style.display = "none";
        contentPara.innerHTML = gameContent.content[getRandomArbitrary(0,gameContent.content.length)];
    }
    objectivePara.innerHTML = gameContent.objective;
    return false;
}

function changeToVoting()
{   
    gameState = "gameplayVoting";
    currentPlayer = 0;
    changeUI();
    return false;
}

function setUpScoreboard()
{
    if(playersPlaying === 1)
    {
        addAchievement("Play solo game");
    }
    if(playersPlaying === 8)
    {
        addAchievement("It's crowed >:D");
    }
    if(!selfVoting){
        addAchievement("No self voting, GG");
    }
    
    incrementAchievement("Times played")
    
    saveAchievements();
    gameState = "gameplayScoreboard";
    toggleScreen();
}

function pickStage(){
    gameContent = gameData[numberOfStages - 1];
}

function setupScoreboard(){
    
    players.sort(function(a,b){
                 return b.playerScore - a.playerScore;
                 });
    
    var element = document.getElementById("scoreboardDiv");
    element.setAttribute("class", "playerNameButton");
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    
    for(var i= 0 ; i < players.length; i++)
    {
        addPlayerToScoreboard(i);
    }
    return false;
}

function addPlayerToScoreboard(number)
{
    
    var element = document.getElementById("scoreboardDiv");
    var imgPara = document.createElement("img");
    imgPara.setAttribute("src", players[number].playerPhoto);
    imgPara.setAttribute("width","75px");
    imgPara.setAttribute("height","75px");
    var divPara = document.createElement("div");
    divPara.setAttribute("class", "playerNameButton");
    //divPara.setAttribute("id","div" + name + number);
    //divPara.setAttribute("size","60");
    divPara.appendChild(imgPara);
    
    var playerNamePara = document.createTextNode("   "+players[number].playerName+" socre: " + players[number].playerScore);
    // playerNamePara.style.textAlign = "right";
    divPara.appendChild(playerNamePara);
    
    element.appendChild(divPara);
    var brPara = document.createElement("br");
    element.appendChild(brPara);
    return false;
}

function beginNewStage(){
    if(numberOfStages === 3)
    {
        setupScoreboard();
        gameStage = "gameplayScoreboard";
        setUpScoreboard();
        numberOfStages = 0;
        currentPlayer = 0;
    }
    else {
        
        numberOfStages++;
        gameState = "gameplayStages";
        currentPlayer = 0;
        
        var image = document.getElementById('playerImage');
        image.src =  players[currentPlayer].playerPhoto;
        
        pickStage();
    }
    changeUI();
    
    return false;
    
    
}


function nextPlayerFunction(){

    if(gameState === "creatingGame")
    {
        if(
           playerName == ""  ||
           playerPhoto == "")
        {
            
            
            var msg = "The player must have the following: \n";
            if(playerName == ""){
                msg += " a name\n";
            }
            if(playerPhoto == ""){
                msg += " player photo\n";
            }
            if(playerAudioName == ""){
                msg += " player audio recording\n";
            }
            
            
            alert(msg);
            
                    }
        else {
        
        currentPlayer++;
        playersPlaying++;
        
        players.push({
                     playerName : playerName, 
                     playerPhoto : playerPhoto,
                     playerSoundName : playerAudioName,
                     playerScore : 0  
                     });
        
            playerName = "";
            playerPhoto = "";
            playerAudioName = "";
            alert("Player added with the name " + playerName);
            $("html, body").animate({ scrollTop: 0 }, 600);
        }
        
    }
    else 
        if(gameState === "gameplayStages")
        {
            
            currentPlayer++;
            
            if(currentPlayer >= playersPlaying)
            {
                changeToVoting();
            }
            else 
            {
                changeUI();
            }
        }
        else 
            if(gameState === "gameplayVoting")
            {
                var image = document.getElementById('playerImage');
                image.src = players[currentPlayer].playerPhoto;  
                currentPlayer++;
                
                if(currentPlayer >= playersPlaying)
                {
                    beginNewStage();
                }
                else 
                {
                    changeUI();    
                }
            }
    
    return false; 
}

var startGameButton = function(){
    startGame();
};

function buttonVibrate(){
    
    navigator.vibrate(50);
    return false;
    
}

function createTheVotingTable(){
    
    var element = document.getElementById("votingTable");
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    
    for(var i = 0 ; i < playersPlaying ; i++)
    {
        
        createPlayerVotingDiv(players[i].playerName,i);
    }
    
}

function createPlayerVotingDiv (name,number)
{
    
    var element = document.getElementById("votingTable");
    var imgPara = document.createElement("img");
    imgPara.setAttribute("src", players[number].playerPhoto);
    imgPara.setAttribute("width","75px");
    imgPara.setAttribute("height","75px");
    var divPara = document.createElement("div");
    divPara.setAttribute("id","div" + name + number);
    divPara.setAttribute("class", "playerNameButton");
    //divPara.setAttribute("size","60");
    divPara.appendChild(imgPara);
    
    var playerNamePara = document.createTextNode("   "+players[number].playerName+"   ");
    // playerNamePara.style.textAlign = "right";
    divPara.appendChild(playerNamePara);
    
    var playerPickPara = document.createElement("button");
    playerPickPara.setAttribute("id",name + "PickButton"+number);
    playerPickPara.setAttribute("class","menuButton");
    var pickButtonText = document.createTextNode("Pick ME!");
    playerPickPara.appendChild(pickButtonText);
    
    divPara.appendChild(playerPickPara);
    
    element.appendChild(divPara);
    var brPara = document.createElement("br");
    element.appendChild(brPara);
    
    // nameTest = players[number].playerName;
    document.getElementById(name + "PickButton"+number).addEventListener('click',function(){
                                                                         if(number === currentPlayer){
                                                                         addAchievement("Vote for self, Gratz...");
                                                                         selfVoting = true;
                                                                         }
                                                                         voteForPlayerNumber(number);
                                                                         nextPlayerFunction();
                                                                         },false);
    
    document.getElementById("div" + name + number).style.textAlign = "center";
    return false;
}

function voteForPlayerNumber(number)
{
    players[number].playerScore++;
    return false;
}

function startGame()
{

    if(playersPlaying > 0){
        
        beginNewStage();
        createTheVotingTable();
    }
    else 
    {
        alert("Press the add player button to add the current information into the game");
    }
    
    return false;
    
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
