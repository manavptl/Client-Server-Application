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

function isUser() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    var password = document.getElementById('password').value;

    var user = db.ref();
    user.child("UserInformation").child(mobileNumber).get().then((snapshot) => {
        if (snapshot.exists()) {
            var dbPassword = snapshot.val().Password;
            if (password == dbPassword) {
                sessionStorage.setItem('LoggedUser', String(mobileNumber));
                // windows.location.href = "../HTML/home.html";
                window.location.href = "http://localhost/Client-Server-Application/HTML/home.html";
            }
            else {
                alert('password to sacho loko yarrr');
            }
        }
        else {
            alert('User does not exists please register to application');
        }
    }).catch((error) => {
        alert('error' + error);
    });
}