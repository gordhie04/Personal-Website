// script zoom in and out
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section-01, .section-02, .section-03');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Get the intro box (only exists in section-01)
        const intro = section.querySelector('.intro');

        if (intro) {
            // For section-01: stop zoom when intro disappears
            const introRect = intro.getBoundingClientRect();
            const introBottom = introRect.bottom;

            // Calculate scroll depth
            const scrollDepth = -rect.top;

            // Stop zooming when intro bottom leaves the top of viewport
            const maxScrollForZoom = scrollDepth + Math.max(0, introBottom);

            // Calculate progress
            const progress = Math.max(0, Math.min(1, scrollDepth / maxScrollForZoom));

            // Smooth zoom from 100% to 120%
            const minZoom = 100;
            const maxZoom = 120;
            const zoom = minZoom + (progress * (maxZoom - minZoom));

            section.style.backgroundSize = `${zoom}%`;
        } else {
            // For other sections without intro, use original logic
            const scrollDepth = -rect.top;
            const sectionHeight = section.offsetHeight;
            const progress = Math.max(0, Math.min(1, scrollDepth / (sectionHeight + viewportHeight)));

            const minZoom = 100;
            const maxZoom = 120;
            const zoom = minZoom + (progress * (maxZoom - minZoom));

            section.style.backgroundSize = `${zoom}%`;
        }
    });
});

 <!--  Javascript to go around each text and highlight it with color - this is for .name (Gordina Hodibert)-->
// 1. Generate and inject keyframes
const colors = ["#000000", "#ffdd00", "#ff0076", "#ff6400", "#5d00ff", "#ea00ff", "#02d9ff","#0bff00"];

function getRandomColorSet() {
  const shuffled = [...colors].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

const [color1, color2, color3] = getRandomColorSet();

const styleTag = document.createElement("style");
styleTag.textContent = `
  @keyframes strokeColor {
    0%   { opacity: 0; -webkit-text-stroke: 1px gray; }
    50%  { opacity: 1; -webkit-text-stroke: 2px ${color1}; }
    75%  { -webkit-text-stroke: 2px ${color2}; }
    100% { -webkit-text-stroke: 2px ${color3}; }
  }
`;
document.head.appendChild(styleTag);

// 2. Animate the letters (no URL check)
document.addEventListener("DOMContentLoaded", () => {
  const nameElement = document.querySelector(".name-1");
  if (!nameElement) return;

  const text = nameElement.textContent;
  nameElement.innerHTML = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.animation = "strokeColor 1.5s ease forwards";
    span.style.animationDelay = `${i * 0.15}s`;
    nameElement.appendChild(span);
  });
});

  // =====================================================================================================================

  // Sidebar creation - this is the js code for the sidebar
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.body.style.backgroundColor = "rgba(0,0,1,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "#f1f1f1";
}

document.addEventListener('click', function(event) {
    const sidenav = document.getElementById("mySidenav");
    const hamburger = document.querySelector('.hamburger-icon');

    // Check if sidebar is open (width is not 0)
    const sidenavStyle = window.getComputedStyle(sidenav);
    const isOpen = sidenavStyle.width !== '0px';

    // If sidebar is open and click is outside both sidebar and hamburger
    if (isOpen && !sidenav.contains(event.target) && !hamburger.contains(event.target)) {
        closeNav();
    }
});

  // =================================================================================

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

// 5. your helper functions
function openModal(modal) {
  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  modal.classList.remove('active');
  overlay.classList.remove('active');

  // Only unlock scroll if no other modals are open
  if (!document.querySelector('.modal.active')) {
    document.body.classList.remove('modal-open');
  }
}


