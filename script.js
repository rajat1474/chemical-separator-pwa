// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvgLnMtXYXQ9TOGk0j4WC31bAOsRCNwPk",
    authDomain: "chemical-identifier.firebaseapp.com",
    projectId: "chemical-identifier",
    storageBucket: "chemical-identifier.firebasestorage.app",
    messagingSenderId: "778237393691",
    appId: "1:778237393691:web:3f587588808f5a229c31be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to search for a chemical in Firestore
async function searchChemical() {
    let query = document.getElementById("search").value.trim().toLowerCase();
    let resultDiv = document.getElementById("result");

    const chemicalsRef = collection(db, "chemicals");
    const querySnapshot = await getDocs(chemicalsRef);

    let found = false;
    querySnapshot.forEach((doc) => {
        let chem = doc.data();
        if (chem.name.toLowerCase() === query) {
            found = true;
            resultDiv.innerHTML = `
                <h2>${chem.name}</h2>
                <p><strong>Formula:</strong> ${chem.formula}</p>
                <p><strong>Description:</strong> ${chem.description}</p>
                <p><strong>Separation Steps:</strong> ${chem.separationSteps}</p>
                <img src="${chem.imageUrl}" width="200" alt="${chem.name}">
            `;
        }
    });

    if (!found) {
        resultDiv.innerHTML = "<p>⚠ Chemical not found!</p>";
    }
                            }
