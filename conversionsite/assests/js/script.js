document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculate").addEventListener("click", function () {
        let fromValue = document.getElementById("fromValue").value.trim();
        let fromUnit = document.querySelector("input[name='fromUnit']:checked");
        let toUnit = document.querySelector("input[name='toUnit']:checked");
        
        document.getElementById("valueError").style.display = fromValue ? "none" : "inline";
        document.getElementById("fromUnitError").style.display = fromUnit ? "none" : "inline";
        document.getElementById("toUnitError").style.display = toUnit ? "none" : "inline";
        
        if (!fromValue || isNaN(fromValue) || !fromUnit || !toUnit) {
            return;
        }
        
        let url = `https://brucebauer.info/assets/ITEC3650/unitsconversion.php?FromValue=${fromValue}&FromUnit=${fromUnit.value}&ToUnit=${toUnit.value}`;
        
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("toValue").textContent = data;
            })
            .catch(error => console.error("Error fetching data:", error));
    });
    
    document.getElementById("clear").addEventListener("click", function () {
        document.getElementById("converterForm").reset();
        document.getElementById("toValue").textContent = "";
        document.querySelectorAll(".error").forEach(error => error.style.display = "none");
    });
});