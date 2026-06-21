/**
 * PNU Developmental Portfolio - Core Dashboard Logic
 * Year 1 (Aspiring Teacher Stage)[cite: 1]
 */

// 1. DYNAMIC SCORE CALCULATION
function calculateScore() {
    const selectElements = document.querySelectorAll('.score-input');
    let totalScore = 0;

    selectElements.forEach(select => {
        totalScore += parseInt(select.value, 10);
    });

    document.getElementById('totalScoreText').innerText = totalScore;

    let stage = "";
    let interpretation = "";

    // Exact PNU Rubric Scoring Ranges Mapping[cite: 1]
    if (totalScore >= 16 && totalScore <= 24) {
        stage = "Exploring";
        interpretation = "You are still discovering what it means to be a future teacher. It's normal to feel uncertain. At this stage, ask questions, seek guidance, and reflect on why you want to teach."[cite: 1];
    } else if (totalScore >= 25 && totalScore <= 40) {
        stage = "Emerging";
        interpretation = "You are starting to connect with the teaching profession. You show growing interest and awareness of your role. Keep building confidence, learning from experiences, and clarifying your purpose."[cite: 1];
    } else if (totalScore >= 41 && totalScore <= 56) {
        stage = "Consolidating";
        interpretation = "You are consistently engaged and committed to becoming a teacher. You show responsibility, creativity, and openness to growth. Use this stage to set goals and keep strengthening your skills."[cite: 1];
    } else if (totalScore >= 57 && totalScore <= 64) {
        stage = "Building";
        interpretation = "You show strong alignment with the values and mindset of teaching. You demonstrate leadership, ethical awareness, and readiness to contribute to others' growth. You are preparing with a clear purpose for your future career."[cite: 1];
    } else {
        stage = "Invalid Calculation";
        interpretation = "Please double check your score entry updates. The matrix requires an active score between 16 and 64."[cite: 1];
    }

    document.getElementById('stageText').innerText = stage;
    document.getElementById('interpretationText').innerText = interpretation;
    
    const resultsBox = document.getElementById('resultsBox');
    resultsBox.style.display = "block";
    
    resultsBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 2. DASHBOARD INTERACTIONS (Scroll-Spy & Multimedia Features)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- FEATURE A: ACTIVE SIDEBAR NAVIGATION HIGHLIGHTING ---
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });


    // --- FEATURE B: MULTIMEDIA LIGHTBOX EXPANSION ---
    // Creates a smooth overlay when clicking on portfolio images
    const artifactImages = document.querySelectorAll('.media-preview-box img');
    
    artifactImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            // Create overlay elements dynamically
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            
            const fullImg = document.createElement('img');
            fullImg.src = img.src;
            
            overlay.appendChild(fullImg);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden'; // Lock background scrolling
            
            // Click outside or on the image to close
            overlay.addEventListener('click', () => {
                overlay.remove();
                document.body.style.overflow = ''; // Restore scrolling
            });
        });
    });


    // --- FEATURE C: SECURE VAULT ACCESS NOTIFICATION ---
    const secureBtns = document.querySelectorAll('.secure-link-btn');
    
    secureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // If you want it to just show a notification before opening the link, 
            // remove e.preventDefault() later. For now, it simulates an action:
            e.preventDefault();
            
            const originalText = btn.innerHTML;
            btn.innerHTML = "⏳ Authorizing Token...";
            btn.style.background = "#e2e8f0";
            
            setTimeout(() => {
                btn.innerHTML = "✅ Access Granted";
                btn.style.background = "#d1fae5";
                btn.style.color = "#065f46";
                
                // Optional: Alert or redirect after approval
                alert("Redirecting to secured PNU OneDrive/Google Drive verification directory...");[cite: 1]
                
                // Reset button back to normal state
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                    btn.style.color = "";
                }, 2000);
            }, 1000);
        });
    });
});

/**
 * PNU Developmental Portfolio - Core Dashboard Logic
 * Year 1 (Aspiring Teacher Stage)
 */

// =========================================================================
// 1. MONTHLY LOGS DATA VAULT (Store your updates here each month!)
// =========================================================================
const monthlyUpdatesRegistry = {
    "June 2026": {
        tag: "⚡ Latest Monthly Update",
        title: "Month in Review: Focus & Milestones",
        description: "This month, I concentrated heavily on structuring my digital tracking matrix and finalizing my primary reflection artifacts. I successfully integrated multimedia resources into my workspace to prepare for upcoming evaluations.",
        image: "june-activity.jpg", // Replace with your real filename later
        fallbackText: "Upload June's Photo Here",
        statArtifacts: "1",
        statProgress: "100%"
    },
    "July 2026": {
        tag: "📅 Upcoming Target Phase",
        title: "July Foundations: Peer Calibration Logs",
        description: "Looking forward into next month, the portfolio framework will be adapted to track group collaboration artifacts, peer feedback integration cycles, and initial draft compilations.",
        image: "july-activity.jpg",
        fallbackText: "Upload July's Photo Here",
        statArtifacts: "0",
        statProgress: "0%"
    }
    // You can add "August 2026", "September 2026", etc., right here as the year goes on!
};

// Function to smoothly switch out the monthly highlights panel content
function changeFeaturedMonth(monthKey) {
    const data = monthlyUpdatesRegistry[monthKey];
    if (!data) return;

    const showcaseImage = document.getElementById('showcaseImg');
    const updateTag = document.getElementById('showcaseUpdateTag');
    const title = document.getElementById('showcaseTitle');
    const desc = document.getElementById('showcaseDesc');
    const statArt = document.getElementById('showcaseStatArtifacts');
    const statProg = document.getElementById('showcaseStatProgress');

    // Apply fade-out transition effect
    const textSide = document.querySelector('.showcase-text-side');
    textSide.style.opacity = "0.3";
    showcaseImage.style.opacity = "0.3";

    setTimeout(() => {
        // Swap content properties
        updateTag.innerText = data.tag;
        title.innerText = data.title;
        desc.innerText = data.description;
        statArt.innerText = data.statArtifacts;
        statProg.innerText = data.statProgress;
        
        showcaseImage.src = data.image;
        showcaseImage.onerror = function() {
            this.src = `https://placehold.co/800x400/0c2340/ffffff?text=${encodeURIComponent(data.fallbackText)}`;
        };

        // Fade back in
        textSide.style.opacity = "1";
        showcaseImage.style.opacity = "1";
    }, 200);
}


// =========================================================================
// 2. DYNAMIC SCORE CALCULATION
// =========================================================================
function calculateScore() {
    const selectElements = document.querySelectorAll('.score-input');
    let totalScore = 0;

    selectElements.forEach(select => {
        totalScore += parseInt(select.value, 10);
    });

    document.getElementById('totalScoreText').innerText = totalScore;

    let stage = "";
    let interpretation = "";

    if (totalScore >= 16 && totalScore <= 24) {
        stage = "Exploring";
        interpretation = "You are still discovering what it means to be a future teacher. It's normal to feel uncertain. At this stage, ask questions, seek guidance, and reflect on why you want to teach.";
    } else if (totalScore >= 25 && totalScore <= 40) {
        stage = "Emerging";
        interpretation = "You are starting to connect with the teaching profession. You show growing interest and awareness of your role. Keep building confidence, learning from experiences, and clarifying your purpose.";
    } else if (totalScore >= 41 && totalScore <= 56) {
        stage = "Consolidating";
        interpretation = "You are consistently engaged and committed to becoming a teacher. You show responsibility, creativity, and openness to growth. Use this stage to set goals and keep strengthening your skills.";
    } else if (totalScore >= 57 && totalScore <= 64) {
        stage = "Building";
        interpretation = "You show strong alignment with the values and mindset of teaching. You demonstrate leadership, ethical awareness, and readiness to contribute to others' growth. You are preparing with a clear purpose for your future career.";
    } else {
        stage = "Invalid Calculation";
        interpretation = "Please double check your score entry updates. The matrix requires an active score between 16 and 64.";
    }

    document.getElementById('stageText').innerText = stage;
    document.getElementById('interpretationText').innerText = interpretation;
    
    const resultsBox = document.getElementById('resultsBox');
    resultsBox.style.display = "block";
    resultsBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// =========================================================================
// 3. MAIN DASHBOARD LIFE-CYCLE INITIALIZATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- FEATURE A: INJECT INTERACTIVE MONTH PICKER TO THE UI ---
    const badgeContainer = document.querySelector('.month-badge');
    if (badgeContainer) {
        // Create an elegant minimalist interactive select menu overlaying the badge
        let dropdownHtml = `<select id="monthSelector" style="background: transparent; color: white; border: none; font-weight: 700; font-family: inherit; font-size: 0.85rem; outline: none; cursor: pointer;">`;
        Object.keys(monthlyUpdatesRegistry).forEach(month => {
            dropdownHtml += `<option value="${month}" style="background: #091524; color: white;">${month}</option>`;
        });
        dropdownHtml += `</select>`;
        badgeContainer.innerHTML = dropdownHtml;

        document.getElementById('monthSelector').addEventListener('change', (e) => {
            changeFeaturedMonth(e.target.value);
        });
    }

    // --- FEATURE B: ACTIVE SIDEBAR SCROLL-SPY NAVIGATION ---
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });


    // --- FEATURE C: MULTIMEDIA GALLERY LIGHTBOX ---
    // Works dynamically across current AND archived monthly images!
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.media-preview-box img') || e.target.matches('#showcaseImg')) {
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            
            const fullImg = document.createElement('img');
            fullImg.src = e.target.src;
            
            overlay.appendChild(fullImg);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            overlay.addEventListener('click', () => {
                overlay.remove();
                document.body.style.overflow = '';
            });
        }
    });


    // --- FEATURE D: SECURE VAULT AUTHORIZATION ANIMATION ---
    const secureBtns = document.querySelectorAll('.secure-link-btn');
    secureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = btn.innerHTML;
            btn.innerHTML = "⏳ Authorizing Token...";
            btn.style.background = "#e2e8f0";
            
            setTimeout(() => {
                btn.innerHTML = "✅ Access Granted";
                btn.style.background = "#d1fae5";
                btn.style.color = "#065f46";
                
                alert("Redirecting to secured PNU OneDrive/Google Drive verification directory...");
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                    btn.style.color = "";
                }, 2000);
            }, 1000);
        });
    });
});

// Get the button element
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const mainContentPane = document.querySelector(".main-content");

// Function to handle scroll checking
function checkScrollPosition(container) {
    if (container.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// Check window scroll
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Also check inner content panel scrolling if it exists
if (mainContentPane) {
    mainContentPane.addEventListener("scroll", function() {
        checkScrollPosition(mainContentPane);
    });
}

// Clear scroll behavior to go all the way to the top smoothly
function scrollToTop() {
    // Scroll window
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Scroll inner panel container if active
    if (mainContentPane) {
        mainContentPane.scrollTo({ top: 0, behavior: "smooth" });
    }
}