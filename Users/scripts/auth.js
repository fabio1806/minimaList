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
        }
    },
};
