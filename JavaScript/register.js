import { db } from './database.js';
import { encrypt } from './encryptDecrypt.js';
import { index_html } from './locationUrls.js';
import { numberFormate } from './utilities.js';

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
    var formatedMobileNumber = numberFormate(mobileNumber);
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('ConfirmPassword').value;
    if (passwordValidation(password, confirmPassword)) {
        var user = db.ref();
        user.child("UserInformation").child(formatedMobileNumber).get().then((snapshot) => {
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
    var formatedMobileNumber = numberFormate(mobileNumber);
    firebase.auth().signInWithPhoneNumber(formatedMobileNumber, window.recaptchaVerifier).then(function (confirmationResult) {
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
        var formatedMobileNumber = numberFormate(mobileNumber);
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var password = document.getElementById('password').value;
        var encryptedPassword = encrypt(password);

        db.ref("UserInformation/" + formatedMobileNumber).set({
            MobileNumber: formatedMobileNumber,
            FirstName: firstName,
            LastName: lastName,
            Password: encryptedPassword,
            TotalFriend: 0,
            PendingFriendRequest: 0
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