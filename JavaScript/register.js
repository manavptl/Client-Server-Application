import {firebaseConfig} from './database.js';
import {encrypt} from './encryptDecrypt.js';
import {index_html} from './locationUrls.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
firebase.auth().languageCode = 'EN';
render();

function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('reCaptcha');
    recaptchaVerifier.render();
}

const register = document.getElementById("register");
register.addEventListener("click", processChecker);

const otpSubmit = document.getElementById("otpSubmit");
otpSubmit.addEventListener("click", codeVerify);

var coderesult;

function processChecker() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('ConfirmPassword').value;
    if (passwordValidation(password, confirmPassword)) {
        var user = db.ref();
        user.child("UserInformation").child(mobileNumber).get().then((snapshot) => {
            if (snapshot.exists()) {
                alert('Already Exists User Try to Login');
                location.replace(`${index_html}`);
            }
            else {
                phoneAuthencation();
            }
        }).catch((error) => {
            alert('error' + error);
        });
    }
    else {
        alert('Password and Confirm Password are not matching');
    }
}

function phoneAuthencation() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    firebase.auth().signInWithPhoneNumber(mobileNumber, window.recaptchaVerifier).then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        coderesult = confirmationResult;
        document.getElementById('sender').style.display = 'none';
        document.getElementById('verifier').style.display = 'block';
    }).catch(function (error) {
        alert('error' + error);
    });
    console.log("phoneAuthencation over");
}

function codeVerify() {
    var code = document.getElementById('otp').value;
    coderesult.confirm(code).then(function () {
        var mobileNumber = document.getElementById('mobileNumber').value;
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var password = document.getElementById('password').value;
        var encryptedPassword = encrypt(password);

        db.ref("UserInformation/" + mobileNumber).set({
            MobileNumber: mobileNumber,
            FirstName: firstName,
            LastName: lastName,
            Password: encryptedPassword
        }).then(() => {
            alert("Registration successful");
            location.replace(`${index_html}`);
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