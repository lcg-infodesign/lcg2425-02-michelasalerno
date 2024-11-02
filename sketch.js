let side = 80; // distanza tra i punti di partenza
let maxTracciaLength = 1000; // Lunghezza massima della traccia
let staticFrame = 200; // Valore statico per simulare un determinato frame

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  let nPuntiX = ceil(windowWidth / side); // Numero di punti della griglia in X
  let nPuntiY = ceil(windowHeight / side); // Numero di punti della griglia in Y

  let colors = ["white", "purple"]; // Colori per le tracce

  for (let c = 0; c < 2; c++) {
    // Imposta un seed diverso per ogni iterazione
    noiseSeed(99 + c); // Cambia leggermente il seed per ogni ciclo
    
    let positions = []; // Inizializza l'array a ogni iterazione di c

    // Crea la lista di posizioni per i punti della griglia
    for (let i = 0; i < nPuntiX; i++) {
      positions[i] = [];
      for (let j = 0; j < nPuntiY; j++) {
        positions[i][j] = []; // lista per la traccia di ogni punto

        // Trova i valori con cui riempire la lista
        for (let t = 0; t < maxTracciaLength; t++) {
          let noiseX = noise(0.005 * (staticFrame - t) + i * 0.1, j * 0.1);  
          let noiseY = noise(0.005 * (staticFrame - t) + i * 0.1, j * 0.1 + 100);  
          let x = i * side + noiseX * 100; // trovo coordinata x del punto
          let y = j * side + noiseY * 100; // trovo coordinata y 

          // Riempio la lista
          positions[i][j].push(createVector(x, y));
        }

        // Disegna la traccia per il colore attuale
        drawTraccia(positions[i][j], colors[c]);
      }
    }

    // Pulisce l'array positions alla fine dell'iterazione
    positions = [];
  }
}

function drawTraccia(traccia, colore) {
  // Disegna le linee che compongono la traccia
  noFill();
  strokeWeight(1.5);
  stroke(colore);
  beginShape();
  for (let v of traccia) {
    vertex(v.x, v.y);
  }
  endShape();
}
