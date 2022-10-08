import { firebaseConfig } from './database.js';
import { decrypt } from './encryptDecrypt.js';
import { register_html,home_html } from './locationUrls.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const login = document.getElementById("login");
login.addEventListener("click", isUser);

function isUser() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    var password = document.getElementById('password').value;

    var user = db.ref();
    user.child("UserInformation").child(mobileNumber).get().then((snapshot) => {
        if (snapshot.exists()) {
            var dbPassword = snapshot.val().Password;
            var decryptedPassword = decrypt(dbPassword);

            if (password == decryptedPassword) {
                sessionStorage.setItem('User', String(mobileNumber));
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