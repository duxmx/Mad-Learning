// Class Dojo-inspired features for Kids Vision Learning

// User profile and state
let userProfile = {
    name: '',
    avatar: '',
    points: 0,
    streak: 0,
    achievements: [],
    categoryProgress: {
        animals: 0,
        fruits: 0,
        toys: 0,
        household: 0,
        clothing: 0,
        transportation: 0,
        nature: 0
    },
    identifiedObjects: []
};

// Available avatars
const avatars = [
    { id: 'monster1', name: 'Bloo', color: '#4ECDC4' },
    { id: 'monster2', name: 'Spike', color: '#FF6B6B' },
    { id: 'monster3', name: 'Fuzzy', color: '#FFD166' },
    { id: 'monster4', name: 'Bubbles', color: '#06D6A0' }
];

// Achievement definitions
const achievements = [
    { id: 'first_object', name: 'First Discovery!', description: 'Identify your first object', icon: '🔍' },
    { id: 'animal_expert', name: 'Animal Expert', description: 'Identify 5 different animals', icon: '🐾', category: 'animals', count: 5 },
    { id: 'fruit_lover', name: 'Fruit Lover', description: 'Identify 3 different fruits', icon: '🍎', category: 'fruits', count: 3 },
    { id: 'toy_collector', name: 'Toy Collector', description: 'Identify 3 different toys', icon: '🧸', category: 'toys', count: 3 },
    { id: 'streak_3', name: 'On a Roll!', description: 'Identify 3 objects in a row', icon: '🔥', streakCount: 3 }
];

// Object categories
const objectCategories = {
    animals: ['cat', 'dog', 'bird', 'fish'],
    fruits: ['apple', 'banana', 'orange'],
    toys: ['ball', 'teddy bear', 'doll'],
    household: ['chair', 'table', 'cup', 'book', 'clock'],
    clothing: ['shoe', 'hat'],
    transportation: ['car', 'bicycle'],
    nature: ['tree', 'flower']
};

// Initialize the Dojo features
function initDojoFeatures() {
    // Load user profile from localStorage if available
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        updateUI();
    } else {
        showAvatarSelection();
    }
    
    // Add Dojo UI elements to the page
    addDojoUI();
}

// Show avatar selection screen
function showAvatarSelection() {
    // Create modal for avatar selection
    const modal = document.createElement('div');
    modal.className = 'dojo-modal';
    modal.innerHTML = `
        <div class="dojo-modal-content">
            <h2>Choose Your Learning Buddy!</h2>
            <p>First, tell us your name:</p>
            <input type="text" id="username-input" placeholder="Your name">
            <div class="avatar-grid">
                ${avatars.map(avatar => `
                    <div class="avatar-option" data-avatar-id="${avatar.id}">
                        <div class="avatar-circle" style="background-color: ${avatar.color}">
                            <span>${avatar.name.charAt(0)}</span>
                        </div>
                        <p>${avatar.name}</p>
                    </div>
                `).join('')}
            </div>
            <button id="start-learning-btn" disabled>Start Learning!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            // Enable start button if name is also entered
            const nameInput = document.getElementById('username-input');
            document.getElementById('start-learning-btn').disabled = !nameInput.value.trim();
        });
    });
    
    // Enable start button when both name and avatar are selected
    document.getElementById('username-input').addEventListener('input', (e) => {
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        document.getElementById('start-learning-btn').disabled = !(e.target.value.trim() && selectedAvatar);
    });
    
    // Handle start button click
    document.getElementById('start-learning-btn').addEventListener('click', () => {
        const name = document.getElementById('username-input').value.trim();
        const selectedAvatar = document.querySelector('.avatar-option.selected');
        
        if (name && selectedAvatar) {
            const avatarId = selectedAvatar.dataset.avatarId;
            const avatar = avatars.find(a => a.id === avatarId);
            
            // Update user profile
            userProfile.name = name;
            userProfile.avatar = avatarId;
            
            // Save to localStorage
            saveUserProfile();
            
            // Remove modal
            document.body.removeChild(modal);
            
            // Update UI
            updateUI();
            
            // Show welcome message
            showMessage(`Welcome, ${name}!`, `Your learning buddy ${avatar.name} is excited to help you discover new things!`);
        }
    });
}

// Add Dojo UI elements to the page
function addDojoUI() {
    // Create Dojo UI container
    const dojoUI = document.createElement('div');
    dojoUI.className = 'dojo-ui';
    dojoUI.innerHTML = `
        <div class="dojo-profile">
            <div class="avatar-display">
                <div class="avatar-circle" id="profile-avatar"></div>
            </div>
            <div class="profile-info">
                <h3 id="profile-name"></h3>
                <div class="points-display">
                    <span id="points-count">0</span> points
                </div>
                <div class="streak-display">
                    <span id="streak-count">0</span> streak 🔥
                </div>
            </div>
        </div>
        <div class="achievements-panel">
            <h3>Achievements</h3>
            <div id="achievements-list"></div>
        </div>
    `;
    
    // Add to the page
    const container = document.querySelector('.container');
    container.insertBefore(dojoUI, container.firstChild);
    
    // Add CSS for Dojo UI
    const style = document.createElement('style');
    style.textContent = `
        .dojo-ui {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .dojo-profile {
            display: flex;
            align-items: center;
        }
        
        .avatar-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: white;
            font-weight: bold;
            margin-right: 15px;
        }
        
        .profile-info h3 {
            margin: 0 0 5px 0;
            color: #333;
        }
        
        .points-display, .streak-display {
            font-size: 16px;
            margin-bottom: 5px;
        }
        
        #points-count, #streak-count {
            font-weight: bold;
            font-size: 18px;
        }
        
        .achievements-panel {
            background-color: white;
            padding: 10px;
            border-radius: 10px;
            min-width: 200px;
        }
        
        .achievements-panel h3 {
            margin-top: 0;
            color: #333;
            text-align: center;
        }
        
        #achievements-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .achievement-badge {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #e9ecef;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .achievement-badge:hover {
            transform: scale(1.1);
        }
        
        .achievement-badge.earned {
            background-color: #ffd166;
            box-shadow: 0 0 10px rgba(255, 209, 102, 0.7);
        }
        
        /* Avatar selection modal */
        .dojo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .dojo-modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            text-align: center;
        }
        
        .avatar-grid {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin: 20px 0;
        }
        
        .avatar-option {
            cursor: pointer;
            padding: 10px;
            border-radius: 10px;
            transition: all 0.2s;
        }
        
        .avatar-option:hover {
            background-color: #f0f0f0;
        }
        
        .avatar-option.selected {
            background-color: #e0f7fa;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        #username-input {
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 10px;
            width: 100%;
            margin-bottom: 20px;
        }
        
        #start-learning-btn {
            background-color: #4ECDC4;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 18px;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        #start-learning-btn:hover:not([disabled]) {
            background-color: #3dbdb5;
            transform: translateY(-3px);
        }
        
        #start-learning-btn:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        
        /* Achievement unlocked animation */
        @keyframes achievement-unlocked {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .achievement-unlocked {
            animation: achievement-unlocked 0.5s forwards;
        }
    `;
    
    document.head.appendChild(style);
}

// Update UI with current user profile
function updateUI() {
    if (!userProfile.name) return;
    
    // Update profile display
    document.getElementById('profile-name').textContent = userProfile.name;
    document.getElementById('points-count').textContent = userProfile.points;
    document.getElementById('streak-count').textContent = userProfile.streak;
    
    // Update avatar
    const avatar = avatars.find(a => a.id === userProfile.avatar);
    if (avatar) {
        const avatarEl = document.getElementById('profile-avatar');
        avatarEl.style.backgroundColor = avatar.color;
        avatarEl.innerHTML = `<span>${avatar.name.charAt(0)}</span>`;
    }
    
    // Update achievements
    const achievementsEl = document.getElementById('achievements-list');
    achievementsEl.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isEarned = userProfile.achievements.includes(achievement.id);
        const badge = document.createElement('div');
        badge.className = `achievement-badge ${isEarned ? 'earned' : ''}`;
        badge.innerHTML = achievement.icon;
        badge.title = `${achievement.name}: ${achievement.description}`;
        
        achievementsEl.appendChild(badge);
    });
}

// Process object detection and award points
function processObjectDetection(objectName) {
    // Determine object category
    let category = null;
    for (const [cat, objects] of Object.entries(objectCategories)) {
        if (objects.includes(objectName.toLowerCase())) {
            category = cat;
            break;
        }
    }
    
    // Award points based on category
    const pointValues = {
        animals: 10,
        fruits: 8,
        toys: 7,
        household: 6,
        clothing: 7,
        transportation: 9,
        nature: 8,
        default: 5
    };
    
    const pointsEarned = category ? pointValues[category] : pointValues.default;
    
    // Update user profile
    userProfile.points += pointsEarned;
    userProfile.streak += 1;
    
    // Track identified object
    if (!userProfile.identifiedObjects.includes(objectName)) {
        userProfile.identifiedObjects.push(objectName);
        
        // Update category progress
        if (category) {
            userProfile.categoryProgress[category] += 1;
        }
        
        // Check for achievements
        checkAchievements(objectName, category);
    }
    
    // Save user profile
    saveUserProfile();
    
    // Update UI
    updateUI();
    
    // Show points earned
    showPointsEarned(pointsEarned);
    
    return pointsEarned;
}

// Check for achievements
function checkAchievements(objectName, category) {
    const newAchievements = [];
    
    // Check each achievement
    achievements.forEach(achievement => {
        // Skip if already earned
        if (userProfile.achievements.includes(achievement.id)) return;
        
        // Check achievement conditions
        let earned = false;
        
        if (achievement.id === 'first_object' && userProfile.identifiedObjects.length === 1) {
            earned = true;
        } else if (achievement.category && achievement.count && 
                  category === achievement.category && 
                  userProfile.categoryProgress[category] >= achievement.count) {
            earned = true;
        } else if (achievement.streakCount && userProfile.streak >= achievement.streakCount) {
            earned = true;
        }
        
        if (earned) {
            userProfile.achievements.push(achievement.id);
            newAchievements.push(achievement);
        }
    });
    
    // Show achievement notifications
    if (newAchievements.length > 0) {
        showAchievementUnlocked(newAchievements);
    }
}

// Show points earned notification
function showPointsEarned(points) {
    const pointsNotification = document.createElement('div');
    pointsNotification.className = 'points-notification';
    pointsNotification.textContent = `+${points} points!`;
    
    document.querySelector('.result-container').appendChild(pointsNotification);
    
    // Add CSS for points notification
    const style = document.createElement('style');
    style.textContent = `
        .points-notification {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #ffd166;
            color: #333;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            animation: float-up 2s forwards;
        }
        
        @keyframes float-up {
            0% { opacity: 0; transform: translateY(20px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
    `;
    
    document.head.appendChild(style);
    
    // Remove after animation
    setTimeout(() => {
        if (pointsNotification.parentNode) {
            pointsNotification.parentNode.removeChild(pointsNotification);
        }
    }, 2000);
}

// Show achievement unlocked notification
function showAchievementUnlocked(achievements) {
    achievements.forEach((achievement, index) => {
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h3>Achievement Unlocked!</h3>
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Add CSS for achievement notification
            const style = document.createElement('style');
            style.textContent = `
                .achievement-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #ffd166;
                    border-radius: 10px;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 1000;
                    transform: scale(0);
                    opacity: 0;
                    animation: achievement-unlocked 0.5s forwards, fade-out 0.5s 4.5s forwards;
                }
                
                .achievement-icon {
                    font-size: 40px;
                    margin-right: 15px;
                }
                
                .achievement-info h3 {
                    margin: 0;
                    color: #333;
                }
                
                .achievement-info h4 {
                    margin: 5px 0;
                    color: #555;
                }
                
                .achievement-info p {
                    margin: 0;
                    font-size: 14px;
                    color: #666;
                }
                
                @keyframes fade-out {
                    from { opacity: 1; transform: scale(1); }
                    to { opacity: 0; transform: scale(0.8); }
                }
            `;
            
            document.head.appendChild(style);
            
            // Remove after display
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }, index * 1000); // Stagger multiple achievements
    });
}

// Save user profile to localStorage
function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

// Reset streak if too much time has passed
function checkStreakTimeout() {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
        const now = new Date().getTime();
        const last = parseInt(lastActivity);
        
        // Reset streak if more than 24 hours have passed
        if (now - last > 24 * 60 * 60 * 1000) {
            userProfile.streak = 0;
            saveUserProfile();
            updateUI();
        }
    }
    
    // Update last activity
    localStorage.setItem('lastActivity', new Date().getTime().toString());
}

// Modify the existing captureImage function to integrate with Dojo features
const originalCaptureImage = window.captureImage;
window.captureImage = async function() {
    // Call the original function
    await originalCaptureImage();
    
    // Get the detected object name
    const objectName = document.getElementById('object-name').textContent;
    
    // Process with Dojo features if an object was detected
    if (objectName && objectName !== 'Not sure' && objectName !== 'No objects found' && objectName !== 'Error') {
        // Clean up the object name (remove the exclamation mark we added)
        const cleanObjectName = objectName.replace('!', '').trim();
        
        // Process the detection
        processObjectDetection(cleanObjectName);
        
        // Check streak timeout
        checkStreakTimeout();
    } else {
        // Reset streak on failed detection
        userProfile.streak = 0;
        saveUserProfile();
        updateUI();
    }
};

// Initialize Dojo features when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure the original app is initialized
    setTimeout(initDojoFeatures, 1000);
});
