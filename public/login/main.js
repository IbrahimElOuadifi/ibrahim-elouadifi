// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDbZt9zuaFvWAOhVWXPa1cYWxQPlL1_-tA",
    authDomain: "ibrahimelouadifi.firebaseapp.com",
    databaseURL: "https://ibrahimelouadifi.firebaseio.com",
    projectId: "ibrahimelouadifi",
    storageBucket: "ibrahimelouadifi.appspot.com",
    messagingSenderId: "1010244116676",
    appId: "1:1010244116676:web:032384ddb9101ca239e991",
    measurementId: "G-TS7ZHQYE1E"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const storageRef = firebase.storage().ref("Images");
const myInfos = firebase.database().ref("info");

auth.onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = "/admin";
    }
    else {
        document.querySelector(".login-form").classList.remove("hide");
    }
});

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    
        var errorCode = error.code;
        var errorMessage = error.message;
        
        console.error(errorCode);
        $("#error-message").text("*" + errorCode + "!");
    });
}

$(document).ready(function(){
    $( "body" ).keydown(function(event) {
        if ( event.which == 13 ) {
            login();
        }
    });
    
    $( "#login" ).click(function() {
        login();
    });
});