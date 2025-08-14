function hashToPercent(a, b) {
    let str = a.trim().toLowerCase() + b.trim().toLowerCase();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 101);
}

function getStatus(score) {
    if (score >= 90) return "Soulmates ✨";
    if (score >= 75) return "Fireworks 💥";
    if (score >= 60) return "Great vibes 💞";
    if (score >= 45) return "Promising 🌱";
    if (score >= 25) return "Could click 🤝";
    return "Better as friends 🙂";
}

function calculateLove() {
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    if (!name1 || !name2) {
        alert("Please enter both names!");
        return;
    }

    let score = hashToPercent(name1, name2);
    let counter = 0;
    let resultEl = document.getElementById("resultText");
    let statusEl = document.getElementById("statusText");
    resultEl.innerHTML = "Calculating...";
    statusEl.innerHTML = "";

    let interval = setInterval(() => {
        resultEl.innerHTML = counter + "%";
        counter++;
        if (counter > score) {
            clearInterval(interval);
            statusEl.innerHTML = getStatus(score);

            // 🎉 Confetti amount based on score
            if (score >= 90) burstConfetti(300);
            else if (score >= 60) burstConfetti(150);
            else if (score >= 45) burstConfetti(75);
            else if (score >= 25) burstConfetti(30);
            // <25 → no confetti
        }
    }, 20);
}



const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
let W = window.innerWidth, H = window.innerHeight;
confettiCanvas.width = W;
confettiCanvas.height = H;

let confettiPieces = [];

function ConfettiParticle() {
    this.x = Math.random() * W;
    this.y = Math.random() * -H;
    this.r = Math.random() * 6 + 4;
    this.color = "hsl(" + Math.random() * 360 + ",100%,50%)";
    this.speed = Math.random() * 3 + 2;
    this.tilt = Math.random() * 10 - 10;
    this.tiltSpeed = Math.random() * 0.1 + 0.05;

    this.draw = function() {
        ctx.beginPath();
        ctx.lineWidth = this.r / 2;
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
        ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
        ctx.stroke();
    }

    this.update = function() {
        this.y += this.speed;
        this.tilt += this.tiltSpeed;
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, W, H);
    confettiPieces.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.y > H) {
            confettiPieces.splice(index, 1);
        }
    });
    requestAnimationFrame(drawConfetti);
}
function burstConfetti(count) {
    for (let i = 0; i < count; i++) {
        confettiPieces.push(new ConfettiParticle());
    }
}

drawConfetti();

window.addEventListener("resize", () => {
    W = window.innerWidth;
    H = window.innerHeight;
    confettiCanvas.width = W;
    confettiCanvas.height = H;
});
