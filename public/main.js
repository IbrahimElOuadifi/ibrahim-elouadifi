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

var storageRef = firebase.storage().ref("Images");
var myInfos = firebase.database().ref("info");

storageRef.child('Profile.jpg').getDownloadURL().then(function(url) {

    // Or inserted into an <img> element:
    document.getElementById('profile-img').innerHTML = '<img src="' + url + '" alt="Ibrahim El Ouadifi Picture" title="My Picture">';

    }).catch(function(error) {
    // Handle any errors
});

myInfos.child("about").once('value', function(snapshot) {
    var key = snapshot.key;
    var data = snapshot.val();
    document.getElementById("about-desc").innerHTML = '<p>' + data.description + '</p>';
});

myInfos.child("timeline").child("education").once('value', function(snapshot) {
    var education = "";
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        education = '<div class="timeline-wrapper">' +
             '<div class="timeline-yr">' +
                  '<span>' + childData.year + '</span>' +
             '</div>' +
             '<div class="timeline-info">' +
                  '<h3><span>' + childData.title + '</span></h3>' +
                  '<small>'+ childData.name +' | <i style="font-size:18px" class="fa"> </i> '+ childData.city +', '+ childData.country +'</small>' +
                  '<p>'+ childData.text +'</p>' +
             '</div>' +
        '</div>' + education;
    });
    document.getElementById("edu").innerHTML = education;
});

myInfos.child("timeline").child("experience").once('value', function(snapshot) {
    var experience = "";
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        experience = '<div class="timeline-wrapper">' +
             '<div class="timeline-yr">' +
                  '<span>' + childData.year + '</span>' +
             '</div>' +
             '<div class="timeline-info">' +
                  '<h3><span>' + childData.title + '</span></h3>' +
                  '<small>'+ childData.name +' | <i style="font-size:18px" class="fa"> </i> '+ childData.city +', '+ childData.country +'</small>' +
                  '<p>'+ childData.text +'</p>' +
             '</div>' +
        '</div>' + experience;
    });
    document.getElementById("exp").innerHTML = experience;
});

myInfos.child("projects").once('value', function(snapshot) {
    var projects = "";
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        projects += '<div class="card">' +
                '<div class="box">' +
                    '<img src="' + childData.urlPic + '" alt="">' +
                    '<a class="text" href="#">' + childData.name +'</a>' +
                    '<p>' + childData.text + '</p>' +
                '</div>' +
            '</div>';
    });
    $("#load-projects").remove();
    document.getElementById("project-cards").innerHTML = projects;

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
            }
        },
        nav: true,
        navText : ["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"]
    });

    $(".owl-prev, .owl-next").show();
});

myInfos.child("skills").once('value', function(snapshot) {
    var skills = "";
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        skills += '<div class="box" title="' + childData.name + '">' +
        '<div class="left"><img src="' + childData.urlPic + '" alt="' + childData.name + '"></div>' +
        '<div class="right">' +
        '<h2>' + childData.title + '</h2>' +
        
        '<div class="value"><div class="text">' +
                childData.text +
            '</div>' +
            '<div class="bar"><div style="width: ' + childData.text + ';"></div></div></div>'+
        '</div>' +
        '</div>';
    });
    document.getElementById("skill-cards").innerHTML = skills;
});

myInfos.child("services").once('value', function(snapshot) {
    var services = "";
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        services += '<div class="card">' +
            '<div class="box">' +
                '<i class="fa ' + childData.faicon + '"></i>' +
                '<div class="text">' + childData.name + '</div>' +
                '<p>' + childData.text + '</p>' +
            '</div>' +
        '</div>';
    });
    document.getElementById("service-cards").innerHTML = services;
});

function singout(){
    firebase.auth().signOut();
}

function next(){
    owl.trigger('next.owl.carousel');
}

function prev(){
    owl.trigger('prev.owl.carousel', [300]);
}

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.nav').addClass("sticky");
        }else{
            $('.nav').removeClass("sticky");
        }
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student ^2000", "GameDev^2000"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
});