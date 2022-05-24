const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAuQybwr4ugEorx251sba41p2l53-IIe8",
    authDomain: "upload-image-5b0d9.firebaseapp.com",
    projectId: "upload-image-5b0d9",
    storageBucket: "upload-image-5b0d9.appspot.com",
    messagingSenderId: "177774099569",
    appId: "1:177774099569:web:67d63103eaac6e13cd2fd0",
    measurementId: "G-WMXCPFLCCQ"
    };

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);