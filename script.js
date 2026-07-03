// ================================
// LOADING SCREEN
// ================================

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ================================
// FLOATING PARTICLES
// ================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 10s and 30s
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ================================
// BACKGROUND MUSIC
// ================================

const bgMusic = document.getElementById('bgMusic');
const musicOverlay = document.getElementById('musicOverlay');
const musicStartBtn = document.getElementById('musicStartBtn');
const musicControl = document.getElementById('musicControl');
const playIcon = musicControl.querySelector('.play-icon');
const pauseIcon = musicControl.querySelector('.pause-icon');

let musicPlaying = false;

// Try to autoplay
bgMusic.play().then(() => {
    // Autoplay succeeded
    musicPlaying = true;
    musicOverlay.classList.add('hidden');
    updateMusicIcon();
}).catch(() => {
    // Autoplay blocked - show overlay
    musicOverlay.classList.remove('hidden');
});

// Music start button click
musicStartBtn.addEventListener('click', () => {
    bgMusic.play();
    musicPlaying = true;
    musicOverlay.classList.add('hidden');
    updateMusicIcon();
});

// Music control button click
musicControl.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
    } else {
        bgMusic.play();
        musicPlaying = true;
    }
    updateMusicIcon();
});

// Update music control icon
function updateMusicIcon() {
    if (musicPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

// ================================
// VIDEO PLAYER
// ================================

const mediaVideo = document.getElementById('mediaVideo');
const playOverlay = document.getElementById('playOverlay');
const playButton = document.getElementById('playButton');

// Check if video element exists
if (mediaVideo && playOverlay && playButton) {
    // Play button click
    playButton.addEventListener('click', () => {
        mediaVideo.play();
        playOverlay.classList.add('hidden');
    });

    // Show overlay when video is paused
    mediaVideo.addEventListener('pause', () => {
        if (mediaVideo.currentTime < mediaVideo.duration) {
            playOverlay.classList.remove('hidden');
        }
    });

    // Hide overlay when video is playing
    mediaVideo.addEventListener('play', () => {
        playOverlay.classList.add('hidden');
    });

    // Show overlay when video ends
    mediaVideo.addEventListener('ended', () => {
        playOverlay.classList.remove('hidden');
    });
}

// ================================
// SECOND VIDEO PLAYER
// ================================

const mediaVideo2 = document.getElementById('mediaVideo2');
const playOverlay2 = document.getElementById('playOverlay2');
const playButton2 = document.getElementById('playButton2');

if (mediaVideo2 && playOverlay2 && playButton2) {
    playButton2.addEventListener('click', () => {
        mediaVideo2.play();
        playOverlay2.classList.add('hidden');
    });

    mediaVideo2.addEventListener('pause', () => {
        if (mediaVideo2.currentTime < mediaVideo2.duration) {
            playOverlay2.classList.remove('hidden');
        }
    });

    mediaVideo2.addEventListener('play', () => {
        playOverlay2.classList.add('hidden');
    });

    mediaVideo2.addEventListener('ended', () => {
        playOverlay2.classList.remove('hidden');
    });
}
// ================================
// SCROLL PROGRESS BAR
// ================================

window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ================================
// RIPPLE CLICK EFFECT
// ================================

const rippleContainer = document.getElementById('rippleContainer');

document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    
    rippleContainer.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// ================================
// SCROLL ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all note cards
const noteCards = document.querySelectorAll('.note-card');
noteCards.forEach(card => {
    observer.observe(card);
});

// Observe media section
const mediaSection = document.getElementById('mediaSection');
if (mediaSection) {
    observer.observe(mediaSection);
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// PROFILE PICTURE HOVER EFFECT
// ================================

const profilePicture = document.querySelector('.profile-picture');

if (profilePicture) {
    profilePicture.addEventListener('mouseenter', () => {
        profilePicture.style.transform = 'scale(1.05)';
        profilePicture.style.transition = 'transform 0.3s ease';
    });
    
    profilePicture.addEventListener('mouseleave', () => {
        profilePicture.style.transform = 'scale(1)';
    });
}

// ================================
// PREVENT RIGHT CLICK ON IMAGES (OPTIONAL)
// ================================

/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/
// ================================
// MEMORY TIMELINE ANIMATION
// ================================

const timelinePhotos = document.querySelectorAll('.timeline-photo');
const celebrationContainer = document.getElementById('celebrationContainer');
let timelineAnimationStarted = false;

// Intersection Observer for Timeline Section
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !timelineAnimationStarted) {
            timelineAnimationStarted = true;
            startTimelineAnimation();
        }
    });
}, {
    threshold: 0.3
});

// Observe the timeline section
const timelineSection = document.getElementById('memoryTimelineSection');
if (timelineSection) {
    timelineObserver.observe(timelineSection);
}

// Start Timeline Animation
function startTimelineAnimation() {
    let delay = 0;
    const delayIncrement = 1800; // 1.8 seconds between each photo

    timelinePhotos.forEach((photo, index) => {
        setTimeout(() => {
            // Add reveal class
            photo.classList.add('reveal');
            
            // After reveal animation completes, add revealed class
            setTimeout(() => {
                photo.classList.remove('reveal');
                photo.classList.add('revealed');
            }, 1200);

            // Camera flash effect on each photo
            createCameraFlash();

            // If this is the last photo, trigger celebration
            if (index === timelinePhotos.length - 1) {
                setTimeout(() => {
                    triggerCelebration();
                }, 1500);
            }
        }, delay);

        delay += delayIncrement;
    });
}

// Camera Flash Effect
function createCameraFlash() {
    const flash = document.createElement('div');
    flash.classList.add('camera-flash');
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.remove();
    }, 500);
}

// Trigger Celebration (Hearts + Confetti)
function triggerCelebration() {
    createFloatingHearts();
    createConfetti();
    
    // Smooth scroll to next section after 4 seconds
    setTimeout(() => {
        const mediaSection = document.getElementById('mediaSection');
        if (mediaSection) {
            mediaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 4000);
}

// Create Floating Hearts
function createFloatingHearts() {
    const heartCount = 20;
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            // Random horizontal position
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            celebrationContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 150);
    }
}

// Create Confetti
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#f093fb', '#f5576c', '#667eea', '#764ba2', '#4facfe', '#00f2fe'];

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            confetti.style.animationDuration = (Math.random() * 1 + 2) + 's';
            
            // Random size
            const size = Math.random() * 8 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Random shape (some squares, some circles)
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            celebrationContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}
// ================================
// VIDEO GALLERY CONTROLS
// ================================

const galleryVideos = document.querySelectorAll('.gallery-video');
const videoPlayOverlays = document.querySelectorAll('.video-play-overlay');
const videoPlayBtns = document.querySelectorAll('.video-play-btn');

// Add play button functionality for each video
videoPlayBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const video = galleryVideos[index];
        const overlay = videoPlayOverlays[index];
        
        video.play();
        overlay.classList.add('hidden');
    });
});

// Handle video pause/play events
galleryVideos.forEach((video, index) => {
    const overlay = videoPlayOverlays[index];
    
    video.addEventListener('pause', () => {
        if (video.currentTime < video.duration) {
            overlay.classList.remove('hidden');
        }
    });
    
    video.addEventListener('play', () => {
        overlay.classList.add('hidden');
    });
    
    video.addEventListener('ended', () => {
        overlay.classList.remove('hidden');
    });
});

// Pause all other videos when one plays
galleryVideos.forEach((currentVideo, currentIndex) => {
    currentVideo.addEventListener('play', () => {
        galleryVideos.forEach((otherVideo, otherIndex) => {
            if (otherIndex !== currentIndex) {
                otherVideo.pause();
            }
        });
    });
});

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%c Powered by PSYCHO ', 'background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); color: white; font-size: 20px; padding: 10px; font-weight: bold;');
