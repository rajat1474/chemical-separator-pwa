const chemicals = {
    "Water": { formula: "H2O", description: "Essential for life", imageUrl: "https://example.com/water.png" },
    "Salt": { formula: "NaCl", description: "Used in cooking", imageUrl: "https://example.com/salt.png" }
};

function searchChemical() {
    let query = document.getElementById("search").value;
    let resultDiv = document.getElementById("result");

    if (chemicals[query]) {
        let chem = chemicals[query];
        resultDiv.innerHTML = `<h2>${query}</h2><p>Formula: ${chem.formula}</p>
        <p>${chem.description}</p><img src="${chem.imageUrl}" width="100">`;
    } else {
        resultDiv.innerHTML = "<p>⚠ Chemical not found!</p>";
    }
}
