let positions = []; // Matrice vuota per le posizioni dei punti
let side = 40; //distanza tra i punti di partenza
let maxTracciaLength = 2000; // Lunghezza massima della traccia
let staticFrame = 200; // Valore statico per simulare un determinato frame
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  let nPuntiX = ceil(windowWidth/side); // Numero di punti della griglia in X
  let nPuntiY = ceil(windowHeight/side); // Numero di punti della griglia in Y
  noiseSeed(99); //per far venire sempre gli stessi scarabocchi
  
  // inizio a creare la lista vuota che riempirò poi
  for (let i = 0; i < nPuntiX; i++) {
    positions[i] = [];
    for (let j = 0; j < nPuntiY; j++) {
      positions[i][j] = []; // lista per la traccia di ogni punto

      // trovo i valori con cui riempire la lista
      for (let t = 0; t < maxTracciaLength; t++) {
        let noiseX = noise(0.005 * (staticFrame - t) + i * 0.1, j * 0.1);  
        let noiseY = noise(0.005 * (staticFrame - t) + i * 0.1, j * 0.1 + 100);  
        let x = i * side + noiseX * 50; //trovo coordinata x del punto
        let y = j * side + noiseY * 50; // trovo coordinata y 
        
        // riempio la lista
        positions[i][j].push(createVector(x, y));
      }

      // Disegna la traccia statica
      drawTraccia(positions[i][j]);
    }
  }
}

function drawTraccia(traccia) {
  // Disegna le linee che compongono la traccia
  noFill();
  stroke(0);
  strokeWeight(1.5);

  beginShape();
  for (let v of traccia) {
    vertex(v.x, v.y);
  }
  endShape();
}
