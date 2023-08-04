const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const socket = io(); // Create a socket instance

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentcolor = 1;

const colorPalette = [
    'white', 'black', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown',
    'cyan', 'magenta', 'lime', 'indigo', 'teal', 'violet', 'olive', 'navy', 'maroon', 'gray',
    'lightgray', 'darkgray', 'rosybrown', 'lightcoral', 'salmon', 'darkred', 'firebrick',
    'brown', 'sienna', 'saddlebrown', 'chocolate', 'peru', 'sandybrown', 'wheat', 'burlywood',
    'tan', 'khaki', 'yellowgreen', 'darkolivegreen', 'olivedrab', 'lawngreen', 'chartreuse',
    'greenyellow', 'darkgreen', 'mediumseagreen', 'mediumaquamarine', 'mediumturquoise',
    'mediumblue', 'darkblue', 'slateblue', 'royalblue', 'deepskyblue', 'cyan', 'darkcyan',
    'cadetblue', 'steelblue', 'powderblue', 'turquoise', 'darkturquoise', 'mediumspringgreen',
    'lime', 'limegreen', 'forestgreen', 'seagreen', 'darkseagreen', 'lightgreen', 'palegreen',
    'springgreen', 'aqua', 'aquamarine', 'paleturquoise', 'lightcyan', 'darkslategray',
    'teal', 'blue', 'mediumblue', 'darkblue', 'navy', 'midnightblue', 'cornflowerblue',
    'dodgerblue', 'royalblue', 'steelblue', 'deepskyblue', 'lightskyblue', 'skyblue',
    'lightblue', 'powderblue', 'indigo', 'darkslateblue', 'darkviolet', 'darkorchid', 'mediumorchid',
    'purple', 'mediumpurple', 'thistle', 'plum', 'violet', 'fuchsia', 'magenta'
  ];
  
let drawing = false;

canvas.addEventListener('wheel', (event) => {
    const deltaY = event.deltaY;
  
    if (deltaY < 0) {
      if (currentcolor < colorPalette.length - 1) {
        currentcolor++;
      }
    } else if (deltaY > 0) {
      if (currentcolor > 0) {
        currentcolor--;
      }
    }
    drawlocalpixel(1, 1, colorPalette[currentcolor]);

});

canvas.addEventListener('mousedown', () => {
  drawing = true;
  drawPixel(event.clientX, event.clientY);
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mousemove', (event) => {
  if (!drawing) return;

  drawPixel(event.clientX, event.clientY);
});

socket.on('draw', (dataURL) => {
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    context.drawImage(img, 0, 0);
  };
});

function drawPixel(x, y) {
  context.fillStyle = colorPalette[currentcolor];
  context.fillRect(Math.ceil(x / 20) * 20 - 20, Math.ceil(y / 20) * 20 - 20, 20, 20);
  socket.emit('draw', canvas.toDataURL()); // Emit drawing data to the server
}

function drawlocalpixel(x, y, c) {
    context.fillStyle = c;
    context.fillRect(Math.ceil(x / 20) * 20, Math.ceil(y / 20) * 20 - 20, 20, 80);
}

socket.on('initialDraw', (dataURL) => {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
  });
  

drawlocalpixel(1, 1, colorPalette[currentcolor]);