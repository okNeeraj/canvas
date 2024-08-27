export const DrawBoard = (canvas) => {
	if (!canvas) return
	const ctx = canvas.getContext('2d')
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let hue = 1;

	let drawing = false;
	const mouse = {
		x: 0,
		y: 0,
	}

	const settings = {
		tool: 'pencil',
		color: '#ffffff'
	}

	document.addEventListener('mousedown', () => drawing = true);
	document.addEventListener('mouseup', () => drawing = false)

	document.addEventListener('resize', () => {
		canvas.width = window.width;
		canvas.height = window.height;
	});

	document.getElementById('colorPicker').addEventListener('change', function () {
		settings.color = this.value;
	});

	document.addEventListener('keydown', function (event) {
		toolSelection(event, true)
	});

	document.getElementById('tools').addEventListener('click', function (event) {
		toolSelection(event)
	});

	function toolSelection(event, shortcut = false) {
		const toolEraser = document.getElementById('toolEraser');
		const toolPencil = document.getElementById('toolPencil');

		const removeActiveClass = () => {
			document.querySelectorAll('.tool').forEach(tool => tool.classList.remove('active'));
		};

		if (shortcut) {
			if (event.key == 'p') {
				settings.tool = 'pencil';
				removeActiveClass();
				toolPencil.classList.add('active');
			} else if (event.key == 'e') {
				settings.tool = 'eraser';
				removeActiveClass();
				toolEraser.classList.add('active');
			}
		} else {
			if (toolEraser.contains(event.target)) {
				settings.tool = 'eraser';
				removeActiveClass();
				toolEraser.classList.add('active');
			} else if (toolPencil.contains(event.target)) {
				settings.tool = 'pencil';
				removeActiveClass();
				toolPencil.classList.add('active');
			}
		}
	}

	function eraser(x, y) {
		ctx.clearRect(x, y, 100, 100);
	};

	function drawRect(x, y) {
		ctx.fillRect(x, y, 100, 100)
		ctx.strokeRect(x, y, 100, 100)
		ctx.fillStyle = settings.color
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
		ctx.lineWidth = 5
	};

	function drawRectStroke(x, y) {
		ctx.strokeStyle = settings.color
		ctx.strokeRect(x, y, 100, 100)
	};

	function drawCircle(x, y) {
		ctx.beginPath();
		ctx.arc(x, y, 80, 0, Math.PI * 2)
		ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
		ctx.strokeStyle = 'red'
		ctx.lineWidth = 4
		ctx.fill()
		ctx.stroke()
	}

	function partialCircle(x, y) {
		ctx.beginPath();
		ctx.arc(x, y, 75, Math.PI, Math.PI * 1.5); // From PI to 1.5 * PI (quarter circle)
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
		ctx.lineWidth = 3
		ctx.stroke();
	}

	function drawTriangle(x, y) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(300, 450);
		ctx.lineTo(400, 450);
		ctx.closePath();
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
		ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
		ctx.fill();
		ctx.stroke();
	}

	function drawImage(x, y) {
		const img = new Image();
		img.src = './img/bg.jpg';
		img.onload = function () {
			ctx.drawImage(img, x, y, 100, 100); // Draw at the top-left corner
			// ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Scale the image to fit the canvas
			// ctx.drawImage(img, 50, 50, 200, 200); // Draw with specific width and height
		};
	}

	function drawText(x, y) {
		ctx.strokeText('N', x, y)
		ctx.strokeStyle = settings.color
		ctx.font = '80px Arial'
	}

	let x = 0;
	let speed = 5;

	!function animate() {
		// ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the ball
		ctx.beginPath();
		ctx.arc(x, canvas.height, 20, 0, Math.PI * 2);
		ctx.fillStyle = 'red';
		ctx.fill();

		// Update the x position
		x += speed;

		// Reverse direction if the ball hits the canvas edges
		if (x > canvas.width || x < 0) {
			speed = -speed;
		}

		// Request the next frame
		requestAnimationFrame(animate);
	}()



	document.addEventListener('mousemove', function (event) {
		hue += 5;
		if (drawing) {
			mouse.x = event.x;
			mouse.y = event.y;
			switch (settings.tool) {
				case 'pencil':
					drawCircle(mouse.x, mouse.y)
					break;
				case 'eraser':
					eraser(mouse.x, mouse.y)
					break;
				default:
					break;
			}
		}
	});


	console.log(ctx)
}
