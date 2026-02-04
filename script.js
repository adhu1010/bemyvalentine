// Elements
const envelope = document.getElementById("envelopecontainer");
const letter = document.getElementById("lettercontainer");
const noBtn = document.querySelector(".nobutton");
const yesBtn = document.querySelector(".yesbutton");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

function moveNoButton(e) {
    // Prevent default touch behavior
    if (e.type === "touchstart") {
        e.preventDefault();
    }
    
    const letterWindow = document.querySelector(".letter-window");
    const containerRect = letterWindow.getBoundingClientRect();
    
    // Get button's original position (reset transform first)
    noBtn.style.transform = "";
    const btnRect = noBtn.getBoundingClientRect();
    
    const minMove = 100;
    const maxMove = 300;
    
    // Try up to 10 times to find a valid position
    let moveX, moveY, newLeft, newRight, newTop, newBottom;
    let attempts = 0;
    
    do {
        const distance = Math.random() * (maxMove - minMove) + minMove;
        const angle = Math.random() * Math.PI * 2;
        
        moveX = Math.cos(angle) * distance;
        moveY = Math.sin(angle) * distance;
        
        // Calculate where the button would end up
        newLeft = btnRect.left + moveX;
        newRight = btnRect.right + moveX;
        newTop = btnRect.top + moveY;
        newBottom = btnRect.bottom + moveY;
        
        attempts++;
    } while (
        attempts < 10 && 
        (newLeft < containerRect.left + 10 || 
         newRight > containerRect.right - 10 || 
         newTop < containerRect.top + 10 || 
         newBottom > containerRect.bottom - 10)
    );
    
    // If still out of bounds after 10 attempts, clamp the values
    if (newLeft < containerRect.left + 10) {
        moveX = containerRect.left + 10 - btnRect.left;
    }
    if (newRight > containerRect.right - 10) {
        moveX = containerRect.right - 10 - btnRect.right;
    }
    if (newTop < containerRect.top + 10) {
        moveY = containerRect.top + 10 - btnRect.top;
    }
    if (newBottom > containerRect.bottom - 10) {
        moveY = containerRect.bottom - 10 - btnRect.bottom;
    }

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// Desktop hover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile touch - move on each tap
noBtn.addEventListener("touchstart", moveNoButton, { passive: false });

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
