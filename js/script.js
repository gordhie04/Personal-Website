
 <!--  Javascript to go around each text and highlight it with color - this is for .name (Gordina Hodibert)-->
// 1. Generate and inject keyframes
const colors = ["#564378", "#7c696d", "#5d5d7e", "#853f37", "#5A032BFF", "#4ec5ff", "#23451FFF", "#7570FF"];

function getRandomColorSet() {
  const shuffled = [...colors].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

const [color1, color2, color3] = getRandomColorSet();

const styleTag = document.createElement("style");
styleTag.textContent = `
  @keyframes strokeColor {
    0% {
      opacity: 0;
      -webkit-text-stroke: 1px gray;
    }
    50% {
      opacity: 1;
      -webkit-text-stroke: 1px ${color1};
    }
    75% {
      -webkit-text-stroke: 1px ${color2};
    }
    100% {
      -webkit-text-stroke: 1px ${color3};
    }
  }
`;
document.head.appendChild(styleTag);

// 2. Animate the letters
if (window.location.pathname.endsWith("index.html")) {
    const nameElement = document.querySelector(".name");
    const text = nameElement.textContent;
    nameElement.innerHTML = "";

    [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animation = `strokeColor 1.5s ease forwards`;
        span.style.animationDelay = `${i * 0.15}s`;
        nameElement.appendChild(span);
    });
}


  // script for individual text highlight in the Introduction section when I put my pointer on it
window.addEventListener("DOMContentLoaded", () => {
  const para = document.getElementById("intro-text");
  const words = para.textContent.trim().split(/\s+/);
  para.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");
});

//ADDING A TOGGLE MENU
 function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}
//....................................................................................................///
//JS CODE FOR OPENING THE MODAL
// 1. grab your elements
const openModalButtons  = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay           = document.getElementById('overlay');

// 2. wire up each “open” button exactly as you had it
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selector = button.dataset.modalTarget;          // e.g. "#modal-edu"
    const modal    = document.querySelector(selector);
    if (!modal) return;
    openModal(modal);
  });
});

// 3. your existing close logic (no changes needed here)
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (!modal) return;
    closeModal(modal);
  });
});

// 4. click-the-overlay closes everything
overlay.addEventListener('click', () => {
  document.querySelectorAll('.modal.active').forEach(m => closeModal(m));
  overlay.classList.remove('active');
});

// let ov = document.getElementById('overlay');
// ov.classList.add('active');
// // ov.classList.remove('active');


// 5. your helper functions
function openModal(modal) {
  modal.classList.add('active');
  overlay.classList.add('active');
}
function closeModal(modal) {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}
