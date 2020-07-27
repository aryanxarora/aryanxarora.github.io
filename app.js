const texts = ['design', 'code', 'cook', 'watch movies', 'play games'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type () {

  if (count === texts.length){
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.querySelector('.typing').textContent = letter;
  if(letter.length === currentText.length){
    count++;
    index = 0;
  }
  setTimeout(type, 400);

}());

// Your web app's Firebase configuration
var firebaseConfig = {
        apiKey: "AIzaSyCnK4ClGsb2vn4An-JBSrFUrfQ0j49nR_c",
        authDomain: "resume-mp1-ccapdev.firebaseapp.com",
        databaseURL: "https://resume-mp1-ccapdev.firebaseio.com",
        projectId: "resume-mp1-ccapdev",
        storageBucket: "resume-mp1-ccapdev.appspot.com",
        messagingSenderId: "822915553621",
        appId: "1:822915553621:web:aa899a316eab401b5eb7dc",
        measurementId: "G-0B2F0P89HS"
};

// Initialize Firebase
var project = firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore()

// ? THIS IS HOW YOU ADD DATA
/*
db.collection("other-stuff").doc().set({
  text: "Something new"
})
.then(function(){
  console.log("Success");
})
.catch(function (err){
  console.log(err)
});

*/

// ? THIS IS TO READ DATA FROM FIRESTORE
db.collection("other-stuff").get().then(function(snapshot){
  snapshot.forEach(function(doc){
      var otherStuff =  doc.data().text;
      var temp = otherStuff;
      console.log(temp);
  })
});


// ? THIS IS HOW TO APPEND BULLETS TO LISTS
function appendToList(whichList, appendThis) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(appendThis);

  node.appendChild(textnode);
  document.getElementById(whichList).appendChild(node);
}