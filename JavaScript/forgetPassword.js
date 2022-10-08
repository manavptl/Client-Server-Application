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

var coderesult;

const forgetPassword = document.getElementById("forgetPassword");
forgetPassword.addEventListener("click", phoneAuthencation);

const otpSubmit = document.getElementById("otpSubmit");
otpSubmit.addEventListener("click", codeVerify);

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
    var mobileNumber = document.getElementById('mobileNumber').value;
    coderesult.confirm(code).then(function () {
        var updatedPassword = window.prompt('Enter your new password');
        var encryptedPassword = encrypt(updatedPassword);
        db.ref("UserInformation/" + mobileNumber).update({
            Password: encryptedPassword
        }).then(() => {
            alert('Password Updated Successfully');
            location.replace(`${index_html}`);
        }).catch((error) => {
            alert(error);
        });
    }).catch(function (error) {
        alert('error');
    });
}