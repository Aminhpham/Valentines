const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noGif = document.getElementById("noGif");
const mainGif = document.getElementById("gif");

// Scatter initial hearts
function scatterHearts() {
  const layer = document.getElementById("heartLayer");

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.classList.add("random-heart");
    heart.textContent = "❤️";

    // random position anywhere on screen
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";

    // random size
    heart.style.fontSize = (15 + Math.random() * 30) + "px";

    // random rotation
    heart.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;

    layer.appendChild(heart);
  }
}

scatterHearts();

// Mouse trail hearts
document.addEventListener("mousemove", (e) => {
  // Only create hearts occasionally (1 in 10 mouse moves)
  if (Math.random() > 0.9) {
    const heart = document.createElement("div");
    heart.classList.add("trail-heart");
    heart.textContent = "💕";
    heart.style.left = e.pageX + "px";
    heart.style.top = e.pageY + "px";
    document.body.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
});

// Confetti explosion
function createConfetti() {
  const colors = ["#ff4d6d", "#ff758f", "#ffa5b8", "#ffccd5", "#f72585", "#b5179e"];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    
    // Random starting position near center
    confetti.style.left = (window.innerWidth / 2 + (Math.random() - 0.5) * 200) + "px";
    confetti.style.top = (window.innerHeight / 2 + (Math.random() - 0.5) * 200) + "px";
    
    // Random color
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size
    confetti.style.width = (5 + Math.random() * 10) + "px";
    confetti.style.height = confetti.style.width;
    
    // Random animation duration
    confetti.style.animationDuration = (2 + Math.random() * 2) + "s";
    
    // Random horizontal movement
    const randomX = (Math.random() - 0.5) * 400;
    confetti.style.setProperty("--randomX", randomX + "px");
    
    document.body.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

// Enhanced No button responses
const noTexts = [ 
  "Are you sure?", 
  "Really? 🥺", 
  "Please? Pretty please?",
  "Think about it...",
  "You're breaking my heart 💔",
  "One more chance?",
  "I'll cry 😢",
  "PLEASE!",
  "Don't do this to me",
  "Final answer?",
  "😭😭😭",
  "..."
];

let noClickCount = 0;
let yesSize = 1; // starting scale

yesBtn.style.transition = "transform 0.3s ease";

noBtn.addEventListener("click", () => {
  // Shake animation
  noBtn.classList.add("shake");
  setTimeout(() => {
    noBtn.classList.remove("shake");
  }, 300);

  mainGif.style.display = "none";
  // Show sad GIF
  noGif.style.display = "block";

  // Make the Yes button grow
  yesSize += 0.3; 
  yesBtn.style.transform = `scale(${yesSize})`;

  // Change text with more variety
  if (noClickCount < noTexts.length) {
    noBtn.textContent = noTexts[noClickCount];
  } else {
    // After all texts, keep showing sad emoji
    noBtn.textContent = "💔";
  }

  noClickCount++;
});

yesBtn.addEventListener("click", () => {
  // Create confetti explosion
  createConfetti();
  
  // Wait a tiny bit for confetti to start, then show success screen
  setTimeout(() => {
    document.body.innerHTML = `
      <div class="success-screen">
        <h1>Yay! I knew you'd say yes ❤️</h1>
        <h2>I love you Gorda! 💕</h2>
        <img src="https://media.tenor.com/KLjuNj119g0AAAAi/love-love-you.gif" style="width:300px; border-radius: 15px; margin: 20px;">
        <p style="font-size: 1.2rem; color: #d6336c; margin-top: 20px;">Can't wait to spend Valentine's Day with you! 🌹</p>
      </div>
    `;
  }, 100);
});