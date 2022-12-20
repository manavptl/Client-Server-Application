import { db } from './database.js';
import { encrypt } from './encryptDecrypt.js';
import { register_html, index_html } from './locationUrls.js';
import { numberFormate } from './utilities.js';

const deleteAccount = document.getElementById("deleteAccount");
deleteAccount.addEventListener("click", deleteUserAccount);

const updatePassword = document.getElementById("updatePassword");
updatePassword.addEventListener("click", updateUserPassword);

const logout = document.getElementById("logout");
logout.addEventListener("click", logoutUser);

function deleteUserAccount() {
    var mobileNumber = sessionStorage.getItem('User');
    var formatedMobileNumber = numberFormate(mobileNumber);
    var password = window.prompt('Enter your password');
    var user = db.ref();
    user.child("UserInformation").child(formatedMobileNumber).get().then((snapshot) => {
        if (snapshot.exists()) {
            var dbPassword = snapshot.val().Password;
            var encryptedPassword = encrypt(password);
            if (encryptedPassword == dbPassword) {
                snapshot.ref.remove()
                    .then(() => {
                        alert("Account Deleted");
                        sessionStorage.removeItem('User');
                        location.replace(`${register_html}`);
                    }).catch((error) => {
                        alert("catch" + error);
                    });
            }
            else {
                alert('Incorrect Password Account Can not be deleted');
            }
        }
        else {
            alert('Error in fetching your data');
        }
    }).catch((error) => {
        alert('error' + error);
    });
}

function updateUserPassword() {
    var mobileNumber = sessionStorage.getItem('User');
    var formatedMobileNumber = numberFormate(mobileNumber);
    var password = window.prompt('Enter your current password');
    var user = db.ref();
    user.child("UserInformation").child(formatedMobileNumber).get().then((snapshot) => {
        if (snapshot.exists()) {
            var dbPassword = snapshot.val().Password;
            var encryptedPassword = encrypt(password);
            if (encryptedPassword == dbPassword) {
                var newPassword = window.prompt('Enter your new Password');
                var newEncryptedPassword = encrypt(newPassword);
                db.ref("UserInformation/" + formatedMobileNumber).update({ Password: newEncryptedPassword });
                alert('Password Updated Successfully');
            }
            else {
                alert('Incorrect Password for your Account');
            }
        }
        else {
            alert('Error in fetching your data');
        }
    }).catch((error) => {
        alert('error' + error);
    });
}

function logoutUser() {
    window.alert("do you want to logout?");
    sessionStorage.removeItem('User');
    location.replace(`${index_html}`);
}