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
    console.log("🔍 Searching for chemical..."); // Debugging step 1      

    let query = document.getElementById("search").value.trim().toLowerCase();     
    let resultDiv = document.getElementById("result");      

    console.log("User searched for:", query); // Debugging step 2      

    try {         
        const chemicalsRef = collection(db, "chemicals");         
        const querySnapshot = await getDocs(chemicalsRef);          

        let found = false;         
        querySnapshot.forEach((doc) => {             
            let chem = doc.data();             
            console.log("Checking chemical:", chem.name); // Debugging step 3              

            if (chem.name.toLowerCase() === query) {                 
                found = true;                 
                console.log("✅ Found:", chem.name);                  

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
            console.log("⚠ Chemical not found!");             
            resultDiv.innerHTML = "<p>⚠ Chemical not found!</p>";         
        }     
    } catch (error) {         
        console.error("🔥 Firestore Error:", error);         
        resultDiv.innerHTML = `<p>🔥 Error: ${error.message}</p>`;     
    }
                    }
console.log("🚀 Script loaded successfully!");

// Check if Firebase is initializing
if (typeof firebase !== "undefined") {
    console.log("✅ Firebase loaded");
} else {
    console.error("❌ Firebase not loaded!");
                        }
