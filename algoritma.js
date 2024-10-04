function calculateBasicLine() {
    activateButton('basicLine');

    let x1 = parseFloat(document.getElementById('x1').value);
    let y1 = parseFloat(document.getElementById('y1').value);
    let x2 = parseFloat(document.getElementById('x2').value);
    let y2 = parseFloat(document.getElementById('y2').value);

    let dx = x2 - x1;
    let dy = y2 - y1;
    let m = dy / dx;
    
    let table = `
        <tr>
            <th>x</th><th>dx</th><th>x</th><th>y(b)</th><th>m</th><th>y</th>
        </tr>`;
    
    let y = y1;
    for (let x = x1; x <= x2; x++) {
        table += `
            <tr>
                <td>${x1}</td><td>${dx}</td><td>${x}</td><td>${y1}</td><td>${m.toFixed(2)}</td><td>${y.toFixed(2)}</td>
            </tr>`;
        y += m;
    }

    document.getElementById('outputTable').innerHTML = table;
    drawGraph(x1, y1, x2, y2);
}

function calculateDDA() {
    activateButton('dda');

    let x1 = parseFloat(document.getElementById('x1').value);
    let y1 = parseFloat(document.getElementById('y1').value);
    let x2 = parseFloat(document.getElementById('x2').value);
    let y2 = parseFloat(document.getElementById('y2').value);

    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    let table = `
        <tr>
            <th>k</th><th>x</th><th>y</th><th>round(x)</th><th>round(y)</th>
        </tr>`;

    for (let k = 0; k <= steps; k++) {
        table += `
            <tr>
                <td>${k}</td><td>${x.toFixed(2)}</td><td>${y.toFixed(2)}</td><td>${Math.round(x)}</td><td>${Math.round(y)}</td>
            </tr>`;
        x += xIncrement;
        y += yIncrement;
    }

    document.getElementById('outputTable').innerHTML = table;
    drawGraph(x1, y1, x2, y2);
}

// New function to handle button activation
function activateButton(selectedButton) {
    const basicLineButton = document.querySelector('button:nth-child(1)');
    const ddaButton = document.querySelector('button:nth-child(2)');
    
    // Remove active class from both buttons
    basicLineButton.classList.remove('active');
    ddaButton.classList.remove('active');
    
    // Add active class to the selected button
    if (selectedButton === 'basicLine') {
        basicLineButton.classList.add('active');
    } else if (selectedButton === 'dda') {
        ddaButton.classList.add('active');
    }
}

function clearAll() {
    document.getElementById('x1').value = '';
    document.getElementById('y1').value = '';
    document.getElementById('x2').value = '';
    document.getElementById('y2').value = '';
    document.getElementById('outputTable').innerHTML = '';
    let canvas = document.getElementById('graphCanvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Remove active state when clearing
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));
}

function drawGraph(x1, y1, x2, y2) {
    let canvas = document.getElementById('graphCanvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    let width = canvas.width;
    let height = canvas.height;

    
    let minX = Math.min(x1, x2) - 1;
    let maxX = Math.max(x1, x2) + 1;
    let minY = Math.min(y1, y2) - 1;
    let maxY = Math.max(y1, y2) + 1;

    
    function mapX(x) {
        return ((x - minX) / (maxX - minX)) * width;
    }

    function mapY(y) {
        return height - ((y - minY) / (maxY - minY)) * height;
    }

    
    context.strokeStyle = '#ddd';
    context.lineWidth = 1;
    
    
    for (let x = Math.floor(minX); x <= Math.ceil(maxX); x++) {
        context.beginPath();
        context.moveTo(mapX(x), 0);
        context.lineTo(mapX(x), height);
        context.stroke();
        
        context.fillText(x, mapX(x), height - 5); 
    }
    for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
        context.beginPath();
        context.moveTo(0, mapY(y));
        context.lineTo(width, mapY(y));
        context.stroke();
      
        context.fillText(y, 5, mapY(y) + 3); 
    }

    
    context.strokeStyle = '#000'; 
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(mapX(0), 0);
    context.lineTo(mapX(0), height); 
    context.moveTo(0, mapY(0));
    context.lineTo(width, mapY(0)); 
    context.stroke();

    context.strokeStyle = '#00f'; 
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(mapX(x1), mapY(y1));
    context.lineTo(mapX(x2), mapY(y2));
    context.stroke();
}
