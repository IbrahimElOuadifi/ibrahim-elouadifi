// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "GV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGi1_-tA",
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

    function singout(){
        firebase.auth().signOut();
    }


var contactInfo = firebase.database().ref("Messages");

function sended() {

    var err = false;
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var subject = document.getElementById("subj");
    var textMessage = document.getElementById("message");

    if(name.value == "" || email.value == "" || subject.value == "" || textMessage.value == "" ){
        document.getElementById("sended").classList.replace("hide","senderror");
        document.getElementById("sended").innerHTML = "can't be empty !";
        setTimeout(function() {
                document.getElementById("sended").classList.replace("senderror","hide");
        }, 3000);
        return;
    }
    
    document.getElementById("sended").classList.replace("hide","sended2");
    document.getElementById("sended").innerHTML = "Conneting...";

    var db_date = firebase.firestore.Timestamp.now().toDate().toString();
    var Date = db_date.substring(0,16);
    var Time = db_date.substring(16,21);
    var r = db_date.substring(24,31);
    var r2 = db_date.substring(31,33);


    contactInfo.push().set({
        date: Date + Time + r + ":" + r2,
        name: name.value,
        email: email.value,
        subject: subject.value,
        textMessage: textMessage.value
    }, function(error) {
    if (error) {
        document.getElementById("sended").classList.replace("sended2","senderror");
        document.getElementById("sended").innerHTML = "Connection failed !";
        setTimeout(function() {
                document.getElementById("sended").classList.replace("senderror","hide");
        }, 3000);
    } else {
        document.getElementById("sended").classList.replace("sended2","sended");
        document.getElementById("sended").innerHTML = "Message Send";
        name.value = "";
        email.value = "";
        subject.value = "";
        textMessage.value = "";
        setTimeout(function() {
            document.getElementById("sended").classList.replace("sended","hide");
        }, 3000);
    }
  });
}