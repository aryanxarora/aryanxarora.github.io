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

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function modalSubmit(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var myForm = document.getElementById("myForm");
  myForm.addEventListener("click", function(event){
    event.preventDefault();
  });
  console.log(email);

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
    console.log("user signed in");
    var user = firebase.auth().currentUser;
    if(user != null){
      console.log(user.email);
    }
    modal.style.display = "none"
    btn.style.display = "none";
    var CRUDform = document.getElementById("CRUDform");
    CRUDform.style.display = "block";

  }).catch(function(err){
    if(err.code == "auth/wrong-password"){
      alert("Wrong password")
    } else {
      alert(err.message);
    }
  });
}

function CRUDform__add (){
  var option = document.getElementById("collection").value;
  var text = document.getElementById("CRUDform__textarea").value;
  console.log(option);
  console.log(text);
  if(text.length === 0){
    alert("Enter a text");
  } else {
    addDataToFirebase(option, text)
  }
  
}

function CRUDform__delete (){
  var option = document.getElementById("collection").value;
  var index = document.getElementById("deleteIndex").value;

  db.collection(option).get().then(function(snapshot){
    docID = snapshot.docs[index-1].id;
    console.log(docID);
    deletefromFirestore(option, docID);
  })
  .then(function(){
  })
  .catch(function (err){
    alert("invalid index")
  })

}

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
function addDataToFirebase(collectionName, text){
  db.collection(collectionName).doc().set({
    text: text
  })
  .then(function(){
    console.log("Success");
    appendToList(collectionName, text);
  })
  .catch(function (err){
    console.log(err)
  });

}


// ? THIS IS TO READ DATA FROM FIRESTORE
function readFirestore(collectionName){
  db.collection(collectionName).get().then(function(snapshot){
    snapshot.forEach(function(doc){
        var otherStuff =  doc.data().text;
    })
  });
}

function InitializeData(collectionName){
  db.collection(collectionName).get().then(function(snapshot){
    snapshot.forEach(function(doc){
        var otherStuff =  doc.data().text;
        appendToList(collectionName, otherStuff);
    })
  });
}


// ? THIS IS HOW YOU INDEX
db.collection("other-stuff").onSnapshot((snapshot) => {
  var data = snapshot.docs[1].data();
});


// ? THIS IS HOW TO APPEND BULLETS TO LISTS
function appendToList(whichList, appendThis) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(appendThis);

  node.appendChild(textnode);
  document.getElementById(whichList).appendChild(node);
};

function deleteFromList(whichList, index) {
  var list = document.getElementById(whichList);
  list.removeChild(list.childNodes[index-1]);
}


function deletefromFirestore(collectionName, docId){
  db.collection(collectionName).doc(docId).delete();
  console.log(docId + " Deleted Successfully");
}



InitializeData("working-on")
InitializeData("other-stuff")
InitializeData("education")