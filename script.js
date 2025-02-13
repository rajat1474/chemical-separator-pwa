// Import Firebase modules (Ensure versions match index.html)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Check if Firebase is initialized
if (!window.db) {
    console.error("❌ Firebase Firestore not initialized!");
} else {
    console.log("✅ Firebase Firestore initialized successfully.");
}

const db = window.db; // Use the globally accessible Firestore instance
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

async function searchChemical() {
    console.log("🔍 Searching for chemical...");
    
    let queryText = document.getElementById("search").value.trim().toLowerCase();
    let resultDiv = document.getElementById("result");

    if (!queryText) {
        resultDiv.innerHTML = "<p>⚠ Please enter a chemical name.</p>";
        return;
    }

    try {
        const chemicalsRef = collection(db, "chemicals");
        const q = query(chemicalsRef, where("name", "==", queryText));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("⚠ Chemical not found!");
            resultDiv.innerHTML = "<p>⚠ Chemical not found!</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            let chem = doc.data();
            console.log("✅ Found:", chem.name);

            resultDiv.innerHTML = `
                <h2>${chem.name}</h2>
                <p><strong>Formula:</strong> ${chem.formula}</p>
                <p><strong>Description:</strong> ${chem.description}</p>
                <p><strong>Separation Steps:</strong> ${chem.separationSteps}</p>
                <img src="${chem.imageUrl}" width="200" alt="${chem.name}">
            `;
        });

    } catch (error) {
        console.error("🔥 Firestore Error:", error);
        resultDiv.innerHTML = `<p>🔥 Error: ${error.message}</p>`;
    }
    }
