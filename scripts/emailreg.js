const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const birthday = document.getElementById("birthday");
const email = document.getElementById("email");

function registerUsr() {
  export const signupUser = (userDetails) => {
      //deconstruct the users details we will need these later
      const {firstName, lastName, birthday, email, password} = userDetails
      return () => {
          //user firebase using the appropriate firebase method
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
              //Once the user creation has happened successfully, we can add the currentUser into firestore
              //with the appropriate details.
              firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
              .set({
                  firstName: firstName,
                  lastName: lastName,
                  birthday: birthday,
                  email: email
              })
              //ensure we catch any errors at this stage to advise us if something does go wrong
              .catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
              })
          })
          //we need to catch the whole sign up process if it fails too.
          .catch(error => {
            console.log('Something went wrong with sign up: ', error);
          });
      }
  }
}

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
