export const firebaseConfig = {
    apiKey: "AIzaSyCezzXXeWlzvPPt5W_M9nX95w_fQVQms88",
    authDomain: "client-server-applicatio-a899f.firebaseapp.com",
    databaseURL: "https://client-server-applicatio-a899f-default-rtdb.firebaseio.com",
    projectId: "client-server-applicatio-a899f",
    storageBucket: "client-server-applicatio-a899f.appspot.com",
    messagingSenderId: "813097380985",
    appId: "1:813097380985:web:b2f9f08b3c3444e428b8a8"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();