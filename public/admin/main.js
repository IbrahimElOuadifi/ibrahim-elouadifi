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
const myInfos = firebase.database().ref("Messages");
const myMessages = firebase.database().ref("Messages");

var msgKey = "";

auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "/login";
    }
});

function singout(){
    firebase.auth().signOut();
}

myMessages.once('value', function(snapshot) {
    var messages = '<tr><th id="tr">Subject</th><th>Name</th><th>Email</th><th>Date</th></tr>';
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        messages += '<tr class="message">' +
                        '<td class="key" style="display: none;">' + childKey + '</td>' +
                        '<td>' + childData.subject + '</td>' +
                        '<td>' + childData.name + '</td>' +
                        '<td><a href="mailto:' + childData.email + '">' + childData.email + '</a></td>' +
                        '<td>' + childData.date + '</td>' +
                    '</tr>';
    });
    document.getElementById("messages-table").innerHTML = messages;
    $(".message").click(function(){
        $("#msg-page").css("display", "flex");        
        myMessages.child($(this).children(".key").text()).once('value', function(snapshot) {
            var key = snapshot.key;
            var data = snapshot.val();
            document.getElementById("msg-content").innerHTML = '<h1 class="sub">' + data.subject + '</h1>' +
                                                                '<h2 class="name">' + data.name + '</h2>' +
                                                                '<h2 class="email">' + data.email + '</h2>' +
                                                                '<h5 class="date">' + data.date + '</h5>' +
                                                                '<p class="text">' + data.textMessage + '</p>';
            msgKey = key;
        });
        $("#delete-msg").click(function(){
            myMessages.child(msgKey).set(null, function(error) {
                if (error) {
                    console.log(error);
                } else {
                    alert("Deleted");
                    $("#msg-page").css("display", "none");
                }
            });
        });
    });
});

$(document).ready(function(){
    $(".open-nav").click(function(){
        //$(".nav").toggleClass("active");
        $(".nav").addClass("active-nav");
        
    });
    $(".close-nav").click(function(){
        $(".nav").removeClass("active-nav");
    });

    $( "#logout" ).click(function() {
        singout();
    });

    $(".nav").removeClass("active-nav");
    $(".inbox").show();
    $(".projects").hide();
    $(".skills").hide();
    $(".services").hide();
    $(".profile").hide();

    $("#inbox").click(function(){
        $(".nav").removeClass("active-nav");
        $(".inbox").show();
        $(".projects").hide();
        $(".skills").hide();
        $(".services").hide();
        $(".profile").hide();
    });

    $("#projects").click(function(){
        $(".nav").removeClass("active-nav");
        $(".inbox").hide();
        $(".projects").show();
        $(".skills").hide();
        $(".services").hide();
        $(".profile").hide();
    });

    $("#skills").click(function(){
        $(".nav").removeClass("active-nav");
        $(".inbox").hide();
        $(".projects").hide();
        $(".skills").show();
        $(".services").hide();
        $(".profile").hide();
    });

    $("#services").click(function(){
        $(".nav").removeClass("active-nav");
        $(".inbox").hide();
        $(".projects").hide();
        $(".skills").hide();
        $(".services").show();
        $(".profile").hide();
    });

    $("#profile").click(function(){
        $(".nav").removeClass("active-nav");
        $(".inbox").hide();
        $(".projects").hide();
        $(".skills").hide();
        $(".services").hide();
        $(".profile").show();
    });

    $("#close-msg").click(function(){
        $("#msg-page").css("display", "none");
    });

    $("#clear-button").click(function(){
        $("#clear-box").toggleClass("show-box");
    });

    $("#clear-button-close").click(function(){
        $("#clear-box").removeClass("show-box");
    });

    $("#clear-all").click(function(){
        myMessages.set(null, function(error) {
            if (error) {
                console.log(error);
            } else {
                alert("Cleard...");
                $("#msg-page").css("display", "none");
                $("#clear-box").removeClass("show-box");
            }
        });
    });
});

function openNav(selector){
    $(selector).show();
}

/*
firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
});
*/