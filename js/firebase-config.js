// Firebase configuration
// Replace with your own Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();

// Create collections references
const documentsRef = db.collection('documents');
const notesRef = db.collection('notes');
