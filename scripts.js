let currentSlide = 0;
const totalSlides = 11;

const speakerNotes = [
    "Introduce yourself, project title, duration, and hosting link.",
    "Highlight your strengths and how they apply to the project.",
    "Explain company background and your assigned role.",
    "Explain why NLP is important and its role in meeting tools.",
    "Clarify goals and practical benefits.",
    "Justify why each tool was chosen.",
    "Describe data flow from input to result display.",
    "Showcase live functionality and user interface.",
    "Explain deployment workflow.",
    "Summarize achievement and future possibilities.",
    "Close presentation, invite questions."
];

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    if (n >= totalSlides) currentSlide = totalSlides - 1;
    else if (n < 0) currentSlide = 0;
    else currentSlide = n;

    slides[currentSlide].classList.add('active');

    document.getElementById('current-slide').textContent = currentSlide + 1;
    document.getElementById('notes-content').textContent = speakerNotes[currentSlide];

    // Update navigation buttons
    const prevBtn = document.querySelector('.nav-controls .nav-btn:first-child');
    const nextBtn = document.querySelector('.nav-controls .nav-btn:last-child');

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function toggleNotes() {
    const notes = document.getElementById('speaker-notes');
    notes.classList.toggle('show');
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    } else if (e.key === 'Escape') {
        const notes = document.getElementById('speaker-notes');
        notes.classList.remove('show');
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('total-slides').textContent = totalSlides;
    showSlide(0);

    // Re-trigger animations when slide changes - MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('active')) {
                // Reset and trigger animations on elements with animation styles
                const animatedElements = mutation.target.querySelectorAll('[style*="animation"]');
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                });
            }
        });
    });

    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });
});
