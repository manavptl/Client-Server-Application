import { db } from './database.js';
import { decrypt } from './encryptDecrypt.js';
import { register_html, home_html } from './locationUrls.js';
import { numberFormate } from './utilities.js';

const login = document.getElementById("login");
login.addEventListener("click", isUser);

function isUser() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    var formatedMobileNumber = numberFormate(mobileNumber);
    var password = document.getElementById('password').value;

    var user = db.ref();
    user.child("UserInformation").child(formatedMobileNumber).get().then((snapshot) => {
        if (snapshot.exists()) {
            var dbPassword = snapshot.val().Password;
            var decryptedPassword = decrypt(dbPassword);
            var firstName = snapshot.val().FirstName;
            var lastName = snapshot.val().LastName;
            var fullName = firstName + " " + lastName;

            if (password == decryptedPassword) {
                sessionStorage.setItem('User', String(formatedMobileNumber));
                sessionStorage.setItem('Name', String(fullName));
                location.replace(`${home_html}`);
            }
            else {
                alert('Incorrect Password, Try Again!');
            }
        }
        else {
            alert('User does not exists please register to application');
            location.replace(`${register_html}`);
        }
    }).catch((error) => {
        alert('error' + error);
    });
}