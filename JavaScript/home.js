const firebaseConfig = {
    apiKey: "AIzaSyCezzXXeWlzvPPt5W_M9nX95w_fQVQms88",
    authDomain: "client-server-applicatio-a899f.firebaseapp.com",
    databaseURL: "https://client-server-applicatio-a899f-default-rtdb.firebaseio.com",
    projectId: "client-server-applicatio-a899f",
    storageBucket: "client-server-applicatio-a899f.appspot.com",
    messagingSenderId: "813097380985",
    appId: "1:813097380985:web:b2f9f08b3c3444e428b8a8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function deleteAccount() {
    var mobileNumber = sessionStorage.getItem('User');
    var password = window.prompt('Enter your password');
    document.write(mobileNumber);
    document.write("checkpoint 1");
    var user = db.ref();
    user.child("UserInformation").child(mobileNumber).get().then((snapshot) => {
        if (snapshot.exists()) {
            var dbPassword = snapshot.val().Password;
            if (password == dbPassword) {
                snapshot.ref.remove();
            }
            else {
                alert('Incorrect Password Account Can not be deleted');
            }
        }
        else {
            alert('Error in fetching your data');
        }
        document.write("checkpoint 2");
    }).catch((error) => {
        alert('error' + error);
    });
}