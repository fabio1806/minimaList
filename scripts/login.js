function displayPsw() {
  var psw = document.getElementById("password");
  var e = document.getElementById("enable");
  var h = document.getElementById("disable");

  if(psw.type === 'password') {
    psw.type = "text";
    e.style.display = "block";
    h.style.display = "none";
  }
  else {
    psw.type = "password";
    e.style.display = "none";
    h.style.display = "block";
  }
}

function validateUsr(){
  var email = document.getElementById("username").value;
  var psw   = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signin_password]
}
}
