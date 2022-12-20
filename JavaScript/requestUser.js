import { numberFormate } from './utilities.js';
import { db } from './database.js';

var sendRequest = document.getElementById('sendRequest');
sendRequest.addEventListener("click", sendFriendRequest);


function sendFriendRequest() {
    var mobileNumber = document.getElementById('mobileNumber').value;
    var senderMobileNumber = sessionStorage.getItem('User');
    var senderFullName = sessionStorage.getItem('Name');
    var receiverMobileNumber = numberFormate(mobileNumber);

    var receiverMobileNumberRef = db.ref("UserInformation/" + receiverMobileNumber);
    receiverMobileNumberRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            var receiverPendingFriendrequestListRef = db.ref("UserInformation/" + receiverMobileNumber + "/PendingFriendRequestList/" + senderMobileNumber);
            receiverPendingFriendrequestListRef.get().then((snapshot1) => {
                if (snapshot1.exists()) {
                    console.log('Friend Request Already Sent');
                    return;
                } else {
                    var receiverMobileNumberRef = db.ref("UserInformation/" + senderMobileNumber + "/FriendList/" + receiverMobileNumber);
                    receiverMobileNumberRef.get().then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log('Already Friend !');
                            return;
                        } else {
                            var user = db.ref();
                            user.child("UserInformation").child(receiverMobileNumber).get().then((snapshot) => {
                                if (snapshot.exists()) {
                                    var pendingFriendRequest = snapshot.val().PendingFriendRequest;

                                    db.ref("UserInformation/" + receiverMobileNumber).update({ PendingFriendRequest: pendingFriendRequest + 1 });

                                    db.ref("UserInformation/" + receiverMobileNumber + "/PendingFriendRequestList/" + senderMobileNumber).set({
                                        MobileNumber: senderMobileNumber,
                                        FullName: senderFullName,
                                    }).then(() => {
                                        alert('Friend Request Send Succesfully');
                                    }).catch((error) => {
                                        alert('Please Try again something went wrong');
                                    });
                                }
                            }).catch((error) => {
                                alert('error' + error);
                            });
                        }
                    }).catch((error) => {
                        window.alert(error);
                    });
                }
            }).catch((error) => {
                window.alert(error);
            });
        } else {
            console.log('User Does Not Exists');
            return;
        }
    }).catch((error) => {
        window.alert(error);
    });
}