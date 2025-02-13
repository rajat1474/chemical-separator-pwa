// ✅ Use Firebase 11.3.1 to match index.html
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// ✅ Use global `db` from index.html instead of reinitializing Firebase
const db = window.db;

// ✅ Debug: Check if Firebase is actually working
if (!db) {
    console.error("❌ Firebase failed to initialize!");
} else {
    console.log("🔥 Firestore Loaded:", db);
}

// ✅ Function to search for a chemical in Firestore
async function searchChemical() {     
    console.log("🔍 Searching for chemical...");

    let query = document.getElementById("search").value.trim().toLowerCase();
    let resultDiv = document.getElementById("result");

    console.log("User searched for:", query);

    try {         
        const chemicalsRef = collection(db, "chemicals");         
        const querySnapshot = await getDocs(chemicalsRef);

        let found = false;         
        querySnapshot.forEach((doc) => {             
            let chem = doc.data();             
            console.log("Checking chemical:", chem.name);

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

// ✅ Debug: Show script is loaded
console.log("🚀 Script loaded successfully!");
