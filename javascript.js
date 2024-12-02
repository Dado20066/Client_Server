"use strict";

// Crea una connessione WebSocket al server di chat
let ws = new WebSocket("ws://10.1.0.52:7070/serverchat/chat24");
// let ws = new WebSocket("ws://localhost:8080/serverchat/chat24");
// let ws = new WebSocket("ws://10.3.1.23:1777");

// Variabile globale per l'username
let username = "";

// Gestisce i messaggi ricevuti dal server
ws.onmessage = function (messaggioRicevuto) {
  let testoArrivato = messaggioRicevuto.data;

  // Controlla il prefisso del messaggio per determinare il tipo
  if (testoArrivato.startsWith("M;")) {
    // Messaggio di tipo "M;" (messaggio normale)
    let messaggio = testoArrivato.slice(2).trim(); // Rimuove "M;" e gli spazi
    document.getElementById("ricezione").textContent += messaggio + "\n"; // Mostra il messaggio nella sezione di ricezione
  } else if (testoArrivato.startsWith("S;")) {
    // Messaggio di tipo "S;" (lista degli utenti)
    let listaUtenti = testoArrivato.slice(2).trim(); // Rimuove "S;" e gli spazi
    let utentiArray = listaUtenti.split(','); // Divide la lista di utenti per virgole
    document.getElementById("messages-table").textContent = utentiArray.join('\n'); // Mostra gli utenti uno per riga
  } else {
    // Caso in cui il messaggio non è riconosciuto
    console.log("Messaggio non riconosciuto: ", testoArrivato);
  }
};

// Funzione per inviare i dati di login al server
function inviaLogin() {
  username = document.getElementById("utente").value.trim(); // Ottieni l'username dall'input
  let password = document.getElementById("password").value.trim(); // Ottieni la password dall'input

  // Verifica che username e password non siano vuoti
  if (username && password) {
    let dataCorrente = new Date().toISOString().split('.')[0]; // "2024-11-29T14:37:05"
    let messaggioLogin = `L;${username};${password};L;${dataCorrente};`; // Corretto il messaggio di login includendo la variabile
    ws.send(messaggioLogin); // Invia il messaggio al server

    // Nascondi la sezione di login e mostra la sezione della chat
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("chatSection").classList.add("visibile");
  } else {
    // Se manca l'username o la password, mostra un alert
    alert("Inserisci username e password.");
  }
}

// Funzione per inviare un messaggio nella chat
function inviaMessaggio() {
  let messaggio = document.getElementById("testo").value.trim(); // Ottieni il messaggio dall'input
  let dataCorrente = new Date().toISOString().split('.')[0]; // "2024-11-29T14:37:05"
  
  if (messaggio) {
    if (ws.readyState === WebSocket.OPEN) {
      let messaggioDaInviare = `M;N;${username};iT-IT;${messaggio};${dataCorrente};`; // Componi il messaggio con i dati
      ws.send(messaggioDaInviare); // Invia il messaggio al server
    } else {
      alert("Connessione WebSocket non aperta.");
    }
  } else {
    alert("Il messaggio non può essere vuoto.");
  }
}

// Funzione per chiudere la connessione WebSocket
function chiudiLaConnessione() {
  // Verifica se la connessione WebSocket è ancora aperta
  if (ws.readyState === WebSocket.OPEN) {
    ws.close(); // Chiude la connessione
    alert("Connessione chiusa.");
  } else {
    // Se la connessione è già chiusa, mostra un alert
    alert("Connessione già chiusa.");
  }
}
