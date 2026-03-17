const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const heartCount = 50;

// Heart class
class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.color = `rgba(255, 92, 141, ${Math.random()})`;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x, this.y - this.size / 2,
            this.x - this.size, this.y - this.size / 2,
            this.x - this.size, this.y
        );
        ctx.bezierCurveTo(
            this.x - this.size, this.y + this.size / 2,
            this.x, this.y + this.size / 1.5,
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x, this.y + this.size / 1.5,
            this.x + this.size, this.y + this.size / 2,
            this.x + this.size, this.y
        );
        ctx.bezierCurveTo(
            this.x + this.size, this.y - this.size / 2,
            this.x, this.y - this.size / 2,
            this.x, this.y
        );
        ctx.fill();
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height + this.size) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

// Create hearts
for (let i = 0; i < heartCount; i++) {
    hearts.push(new Heart());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => heart.update());
    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window change
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});