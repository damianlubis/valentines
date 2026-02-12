// Get the No button element
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

if (noBtn) {
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        checkProximity();
    });

    // Check proximity and move button if too close
    function checkProximity() {
        const btnRect = noBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        // Calculate distance between mouse and button center
        const distance = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) + Math.pow(mouseY - btnCenterY, 2)
        );

        // If mouse is within 100px of the button, move it away
        const threshold = 100;
        
        if (distance < threshold) {
            moveButtonAway();
        }
    }

    // Move button to a random position away from cursor
    function moveButtonAway() {
        const container = document.querySelector('.button-container');
        const containerRect = container.getBoundingClientRect();
        
        // Get viewport dimensions
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 100;
        
        // Generate random position
        let newX, newY;
        let attempts = 0;
        const maxAttempts = 10;
        
        do {
            newX = Math.random() * (maxX - 100) + 50;
            newY = Math.random() * (maxY - 100) + 50;
            attempts++;
            
            // Calculate distance from mouse to new position
            const distanceFromMouse = Math.sqrt(
                Math.pow(mouseX - newX, 2) + Math.pow(mouseY - newY, 2)
            );
            
            // If new position is far enough from mouse, use it
            if (distanceFromMouse > 150 || attempts >= maxAttempts) {
                break;
            }
        } while (attempts < maxAttempts);
        
        // Apply new position
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.zIndex = '1000';
    }

    // Also move on hover as backup
    noBtn.addEventListener('mouseenter', () => {
        moveButtonAway();
    });

    // Prevent clicking (just in case they're really fast)
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButtonAway();
        
        // Make Yes button grow slightly to encourage clicking it
        yesBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            yesBtn.style.transform = 'scale(1)';
        }, 300);
    });
}

// Add extra celebration to Yes button
if (yesBtn) {
    yesBtn.addEventListener('mouseenter', () => {
        yesBtn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    yesBtn.addEventListener('mouseleave', () => {
        yesBtn.style.transform = 'translateY(0) scale(1)';
    });
}