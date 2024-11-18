"use strict";

let username;  // Dichiarazione globale di username
let ws = new WebSocket("ws://10.1.0.52:7070/serverchat/chat24");

ws.onopen = function () {
  console.log("Connessione WebSocket aperta.");
};

ws.onclose = function () {
  console.log("Connessione WebSocket chiusa.");
  alert("La connessione al server è stata chiusa.");
};

ws.onerror = function (error) {
  console.error("Errore WebSocket:", error);
  alert("Errore di connessione WebSocket.");
};

ws.onmessage = function (messaggioRicevuto) {
  console.log("Messaggio ricevuto:", messaggioRicevuto.data);
};

function inviaLogin() {
  username = document.getElementById("utente").value.trim();
  let password = document.getElementById("password").value.trim();

  if (username && password) {
    document.getElementById("loadingMessage").style.display = "block";

    const dataAttuale = new Date().toISOString();
    const messaggioLogin = `L;${username};${password};L;${dataAttuale};`;
    ws.send(messaggioLogin);
    console.log("Messaggio di login inviato:", messaggioLogin);
  } else {
    document.getElementById("errorMessage").style.display = "block";
  }
}

function inviaMessaggio() {
  const messaggio = document.getElementById("testo").value.trim();

  if (username && messaggio) {
    const dataAttuale = new Date().toISOString();
    const messaggioDaInviare = `M;N;${username};it-IT;${messaggio};${dataAttuale};`;
    ws.send(messaggioDaInviare);
    console.log("Messaggio inviato:", messaggioDaInviare);
    document.getElementById("testo").value = "";
  } else {
    alert("Inserisci un messaggio.");
  }
}

function chiudiLaConnessione() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(`LOGOUT;${username}`);
    ws.close();
  }
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("chatSection").classList.add("hidden");
}
