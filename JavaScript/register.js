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
firebase.auth().languageCode = 'EN';
render();

function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('reCaptcha');
    recaptchaVerifier.render();
}

function processChecker() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('ConfirmPassword').value;
    if (passwordValidation(password, confirmPassword)) {
        phoneAuthencation();
    }
    else {
        alert('password and confirm password are not matching');
    }
}

function phoneAuthencation() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    firebase.auth().signInWithPhoneNumber(mobileNumber, window.recaptchaVerifier).then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        document.getElementById('sender').style.display = 'none';
        document.getElementById('verifier').style.display = 'block';
    }).catch(function (error) {
        alert('error' + error);
    });
}

function codeVerify() {
    var code = document.getElementById('otp').value;
    coderesult.confirm(code).then(function () {
        var mobileNumber = document.getElementById('mobileNumber').value;
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var password = document.getElementById('password').value;

        db.ref("UserInformation/" + mobileNumber).set({
            MobileNumber: mobileNumber,
            FirstName: firstName,
            LastName: lastName,
            Password: password
        }).then(() => {
            alert("Signin successful");
            window.close();
            window.location.href = "http://localhost/Client-Server-Application/index.html";
        }).catch((error) => {
            alert("catch" + error);
        });
    }).catch(function (error) {
        alert('error');
    });
}

function passwordValidation(password, confirmPassword) {
    if (password == confirmPassword)
        return true
    else
        return false
}