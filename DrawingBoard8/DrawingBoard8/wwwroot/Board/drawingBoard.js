//window.initializeDrawingBoard = (dotNetReference, color, name) => {
//    const canvas = document.getElementById('drawingBoard');
//    const ctx = canvas.getContext('2d');
//    let isDrawing = false;
//    let startX = 0;
//    let startY = 0;

//    function startDrawing(event) {
//        isDrawing = true;
//        startX = event.clientX - canvas.offsetLeft;
//        startY = event.clientY - canvas.offsetTop;
//    }

//    function stopDrawing() {
//        isDrawing = false;
//        ctx.beginPath();
//    }

//    function draw(event) {
//        if (!isDrawing) return;

//        const currentX = event.clientX - canvas.offsetLeft;
//        const currentY = event.clientY - canvas.offsetTop;

//        ctx.strokeStyle = color;
//        ctx.lineWidth = 3;
//        ctx.lineCap = 'round';

//        ctx.lineTo(currentX, currentY);
//        ctx.stroke();
//        ctx.beginPath();
//        ctx.moveTo(currentX, currentY);

//        // Send drawing data to server
//        dotNetReference.invokeMethodAsync("SendDrawingData", startX, startY, currentX, currentY);

//        // Display the user’s name near their cursor
//        ctx.fillStyle = color;
//        ctx.font = "15px Arial";
//        ctx.fillText(name, currentX + 10, currentY + 10);

//        startX = currentX;
//        startY = currentY;

//        // Render user name next to the line
//        renderUserNames();
//    }

//    function renderUserNames() {
//        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for redrawing
//        Object.keys(users).forEach(user => {
//            const { x, y, color } = users[user];
//            ctx.fillStyle = color; // Set the text color to user color
//            ctx.fillText(user, x + 10, y - 10); // Draw user name above the line
//        });
//    }
//    canvas.addEventListener('mousedown', startDrawing);
//    canvas.addEventListener('mouseup', stopDrawing);
//    canvas.addEventListener('mousemove', draw);
//};



//window.drawFromServer = (startX, startY, endX, endY, color, name) => {
//    const canvas = document.getElementById('drawingBoard');
//    const ctx = canvas.getContext('2d');

//    ctx.strokeStyle = color;
//    ctx.lineWidth = 3;
//    ctx.lineCap = 'round';

//    ctx.beginPath();
//    ctx.moveTo(startX, startY);
//    ctx.lineTo(endX, endY);
//    ctx.stroke();
//    //ctx.closePath();

//    // Store user info for rendering
//    users[name] = { x: endX, y: endY, color: color };

//    // Render user names
//    renderUserNames();
