document.getElementById("downloadBtn").addEventListener("click", () => {
    fetch('/get-file')
        .then(response => response.json())
        .then(data => {
            if (data.fileUrl) {
                window.location.href = data.fileUrl; // Redirect to download the file
            } else {
                alert("No file found for your IP!");
            }
        })
        .catch(error => console.error("Error:", error));
});
