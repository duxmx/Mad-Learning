// Global variables
let video;
let canvas;
let ctx;
let screenshotCanvas;
let screenshotCtx;
let model;
let isModelLoaded = false;
let captureButton;
let objectNameElement;
let objectDescriptionElement;
let screenshotContainer;
let cameraFallback;
let isProcessing = false;

// Audio context for playing sounds
let audioContext;
let audioBuffer = {};

// Initialize the application
async function init() {
    // Get DOM elements
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    screenshotCanvas = document.getElementById('screenshot-canvas');
    screenshotCtx = screenshotCanvas.getContext('2d');
    captureButton = document.getElementById('capture-btn');
    objectNameElement = document.getElementById('object-name');
    objectDescriptionElement = document.getElementById('object-description');
    screenshotContainer = document.getElementById('screenshot-container');
    cameraFallback = document.getElementById('camera-fallback');
    const controlsContainer = document.getElementById('controls-container');
    
    // Create voice selector UI
    setTimeout(() => {
        // We use setTimeout to ensure voices have loaded
        createVoiceSelector();
    }, 1000);

    // Set up event listeners
    captureButton.addEventListener('click', captureImage);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault(); // Prevent scrolling
            captureImage();
        }
    });

    // Initialize audio context
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.error('Web Audio API is not supported in this browser', e);
    }

    // Start camera
    try {
        await setupCamera();
        console.log('Camera setup complete');
        // Add camera-ready class to controls container for animation
        controlsContainer.classList.add('camera-ready');
        // Hide camera fallback message
        if (cameraFallback) {
            cameraFallback.style.display = 'none';
        }
    } catch (error) {
        console.error('Error setting up camera:', error);
        // Show error message in camera fallback
        if (cameraFallback) {
            const icon = cameraFallback.querySelector('.camera-icon');
            if (icon) icon.className = 'fas fa-exclamation-triangle camera-icon';
            
            const mainText = cameraFallback.querySelector('p:not(.small)');
            if (mainText) mainText.textContent = 'Camera access denied';
            
            const subText = cameraFallback.querySelector('.small');
            if (subText) subText.textContent = 'Please allow camera access and refresh the page';
        } else {
            alert('Error accessing camera: ' + error.message);
        }
    }

    // Load the object detection model
    try {
        showMessage('Loading model...', 'Please wait while we load the object detection model.');
        model = await cocoSsd.load();
        isModelLoaded = true;
        console.log('Model loaded successfully');
        showMessage('', '');
    } catch (error) {
        console.error('Error loading model:', error);
        showMessage('Error', 'Failed to load the object detection model. Please refresh the page and try again.');
    }

    // Start animation loop
    animationLoop();
}

// Set up camera access
async function setupCamera() {
    const constraints = {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'environment' // Use the back camera if available
        }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Set up screenshot canvas
            setupScreenshotCanvas();
            
            // Invert the camera horizontally
            video.style.transform = 'scaleX(-1)';
            canvas.style.transform = 'scaleX(-1)';
            
            resolve();
        };
    });
}

// Set up screenshot canvas
function setupScreenshotCanvas() {
    screenshotCanvas.width = video.videoWidth;
    screenshotCanvas.height = video.videoHeight;
}

// Animation loop for continuous rendering
function animationLoop() {
    // Draw video frame to canvas
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(animationLoop);
}

// Capture image and detect objects
async function captureImage() {
    if (!isModelLoaded || isProcessing) {
        return;
    }

    isProcessing = true;
    captureButton.disabled = true;
    captureButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';

    try {
        // Take a screenshot of the current video frame
        takeScreenshot();
        
        // Detect objects in the current frame
        const predictions = await model.detect(video);
        console.log('Predictions:', predictions);

        // Process the predictions
        if (predictions.length > 0) {
            // Sort by confidence score (highest first)
            predictions.sort((a, b) => b.score - a.score);
            
            // Get the most confident prediction
            const topPrediction = predictions[0];
            
            // Only proceed if confidence is above threshold
            if (topPrediction.score > 0.5) {
                // Draw bounding box on the live video
                drawBoundingBox(topPrediction);
                
                // Draw bounding box on the screenshot
                drawBoundingBoxOnScreenshot(topPrediction);
                
                // Display object name and rhyme with context
                displayObjectInfo(topPrediction.class, topPrediction, predictions);
                
                // Show the screenshot container
                screenshotContainer.classList.remove('hidden');
                
                // Add animation effect
                objectNameElement.parentElement.classList.add('detected');
                setTimeout(() => {
                    objectNameElement.parentElement.classList.remove('detected');
                }, 500);
            } else {
                showMessage('Not sure', 'I\'m not sure what that is. Try again with a clearer view!');
                screenshotContainer.classList.add('hidden');
            }
        } else {
            showMessage('No objects found', 'I don\'t see any objects. Try again with a different view!');
            screenshotContainer.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error during object detection:', error);
        showMessage('Error', 'Something went wrong. Please try again.');
        screenshotContainer.classList.add('hidden');
    }

    isProcessing = false;
    captureButton.disabled = false;
    captureButton.innerHTML = '<i class="fas fa-camera"></i> GET STARTED';
}

// Take a screenshot of the current video frame
function takeScreenshot() {
    // Make sure the screenshot canvas is set up
    if (screenshotCanvas.width !== video.videoWidth) {
        setupScreenshotCanvas();
    }
    
    // Draw the current video frame to the screenshot canvas
    screenshotCtx.drawImage(video, 0, 0, screenshotCanvas.width, screenshotCanvas.height);
}

// Draw bounding box on the live video
function drawBoundingBox(prediction) {
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Draw bounding box
    ctx.strokeStyle = '#58cc02';
    ctx.lineWidth = 4;
    ctx.strokeRect(
        prediction.bbox[0],
        prediction.bbox[1],
        prediction.bbox[2],
        prediction.bbox[3]
    );
    
    // Draw label
    ctx.fillStyle = '#58cc02';
    ctx.fillRect(
        prediction.bbox[0],
        prediction.bbox[1] - 30,
        prediction.bbox[2],
        30
    );
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Nunito, Arial Rounded MT Bold, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
        prediction.class,
        prediction.bbox[0] + prediction.bbox[2] / 2,
        prediction.bbox[1] - 10
    );
}

// Draw bounding box on the screenshot
function drawBoundingBoxOnScreenshot(prediction) {
    // Draw bounding box
    screenshotCtx.strokeStyle = '#58cc02';
    screenshotCtx.lineWidth = 4;
    screenshotCtx.strokeRect(
        prediction.bbox[0],
        prediction.bbox[1],
        prediction.bbox[2],
        prediction.bbox[3]
    );
    
    // Draw label
    screenshotCtx.fillStyle = '#58cc02';
    screenshotCtx.fillRect(
        prediction.bbox[0],
        prediction.bbox[1] - 30,
        prediction.bbox[2],
        30
    );
    
    screenshotCtx.fillStyle = 'white';
    screenshotCtx.font = '20px Nunito, Arial Rounded MT Bold, sans-serif';
    screenshotCtx.textAlign = 'center';
    screenshotCtx.fillText(
        prediction.class,
        prediction.bbox[0] + prediction.bbox[2] / 2,
        prediction.bbox[1] - 10
    );
}

// Display object name and rhyme
function displayObjectInfo(objectName, prediction = null, allPredictions = []) {
    // Capitalize first letter of each word
    const formattedName = objectName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Prepare context information for the rhyme
    const context = {};
    
    // Add bounding box if available
    if (prediction && prediction.bbox) {
        context.bbox = prediction.bbox;
        context.screenWidth = canvas.width;
        context.screenHeight = canvas.height;
        
        // Determine position in frame
        const [x, y, width, height] = prediction.bbox;
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        
        // Determine position (top, bottom, left, right, center)
        if (centerX < canvas.width * 0.33) {
            context.position = 'left';
        } else if (centerX > canvas.width * 0.66) {
            context.position = 'right';
        } else if (centerY < canvas.height * 0.33) {
            context.position = 'top';
        } else if (centerY > canvas.height * 0.66) {
            context.position = 'bottom';
        } else {
            context.position = 'center';
        }
    }
    
    // Add confidence score if available
    if (prediction && prediction.score) {
        context.score = prediction.score;
    }
    
    // Add other objects in the frame
    if (allPredictions && allPredictions.length > 1) {
        // Filter out the current object and get names of other objects
        context.otherObjects = allPredictions
            .filter(pred => pred.class !== objectName)
            .map(pred => pred.class);
    }
    
    // Add time of day based on current time
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        context.timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 17) {
        context.timeOfDay = 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        context.timeOfDay = 'evening';
    } else {
        context.timeOfDay = 'night';
    }
    
    // Get contextual rhyme for the object
    const rhymeData = getRhyme(objectName, context);
    
    // Update UI - just show the object name in a child-friendly way
    objectNameElement.textContent = formattedName + '!';
    objectNameElement.style.fontSize = '3.2rem';
    objectNameElement.style.fontWeight = '900';
    objectNameElement.style.color = '#58cc02';
    
    // Hide the rhyme text since we'll just play it
    objectDescriptionElement.style.display = 'none';
    
    // Play audio for the rhyme
    playRhymeAudio(rhymeData.rhyme);
    
    // After a short delay, show the rhyme text
    setTimeout(() => {
        objectDescriptionElement.style.display = 'block';
        objectDescriptionElement.textContent = rhymeData.rhyme;
    }, 1000);
}

// Duolingo color palette
function getDuolingoColor() {
    const duolingoColors = [
        '#58cc02', // Primary green
        '#58a700', // Darker green
        '#89e219', // Lighter green
        '#ffc800', // Gold
        '#ff4b4b', // Red
        '#1cb0f6'  // Blue
    ];
    return duolingoColors[Math.floor(Math.random() * duolingoColors.length)];
}

// Global variable to store the selected voice
let selectedVoiceIndex = -1;

// Create voice selection dropdown
function createVoiceSelector() {
    // Check if we already have a voice selector
    if (document.getElementById('voice-selector')) {
        return;
    }
    
    // Create voice selector container
    const voiceSelectorContainer = document.createElement('div');
    voiceSelectorContainer.className = 'voice-selector-container';
    
    // Create heading
    const heading = document.createElement('h3');
    heading.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i> Voice Options';
    heading.className = 'voice-heading';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'Select voice: ';
    label.htmlFor = 'voice-selector';
    
    // Create select element
    const select = document.createElement('select');
    select.id = 'voice-selector';
    select.className = 'voice-selector';
    select.setAttribute('aria-label', 'Select a voice for text-to-speech');
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '-1';
    defaultOption.textContent = 'Auto (Best Quality)';
    select.appendChild(defaultOption);
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Add voices to selector
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        select.appendChild(option);
    });
    
    // Add change event listener
    select.addEventListener('change', (e) => {
        selectedVoiceIndex = parseInt(e.target.value);
        // Test the selected voice
        const testUtterance = new SpeechSynthesisUtterance('This is a test of the selected voice.');
        if (selectedVoiceIndex >= 0 && selectedVoiceIndex < voices.length) {
            testUtterance.voice = voices[selectedVoiceIndex];
        }
        window.speechSynthesis.speak(testUtterance);
    });
    
    // Create help text
    const helpText = document.createElement('p');
    helpText.className = 'voice-help';
    helpText.textContent = 'Choose a voice for the rhymes. Changes take effect immediately.';
    
    // Append elements to container
    voiceSelectorContainer.appendChild(heading);
    voiceSelectorContainer.appendChild(label);
    voiceSelectorContainer.appendChild(select);
    voiceSelectorContainer.appendChild(helpText);
    
    // Add to the page - insert in the voice-options section
    const voiceOptionsSection = document.querySelector('.voice-options');
    if (voiceOptionsSection) {
        voiceOptionsSection.appendChild(voiceSelectorContainer);
    } else {
        // Fallback to inserting before the footer
        const footer = document.querySelector('.footer');
        if (footer) {
            document.body.insertBefore(voiceSelectorContainer, footer);
        } else {
            document.body.appendChild(voiceSelectorContainer);
        }
    }
}

// Play audio for the rhyme
async function playRhymeAudio(rhymeText) {
    // For now, we'll just use the Web Speech API to read the rhyme
    // In a production app, you would load actual audio files
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Create a new speech utterance
        const utterance = new SpeechSynthesisUtterance(rhymeText);
        
        // Set properties for a more natural voice
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1.0; // Natural pitch
        utterance.volume = 1.0; // Maximum volume
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
        
        // If user has selected a specific voice, use that
        if (selectedVoiceIndex >= 0 && selectedVoiceIndex < voices.length) {
            utterance.voice = voices[selectedVoiceIndex];
            console.log("Using user-selected voice:", utterance.voice.name);
        } else {
            // Auto-select the best voice
            
            // Score function for voices - higher is better
            const scoreVoice = (voice) => {
                let score = 0;
                
                // Premium voices get highest priority
                const premiumKeywords = ['premium', 'enhanced', 'neural', 'wavenet', 'online'];
                if (premiumKeywords.some(kw => voice.name.toLowerCase().includes(kw))) {
                    score += 100;
                }
                
                // Preferred voice names
                const preferredVoices = [
                    'Google US English', 'Microsoft David', 'Microsoft Zira',
                    'Samantha', 'Alex', 'Daniel', 'Karen', 'Moira', 'Tessa',
                    'Google UK English Female'
                ];
                
                if (preferredVoices.some(name => voice.name.includes(name))) {
                    score += 50;
                }
                
                // English voices preferred
                if (voice.lang.startsWith('en-')) {
                    score += 25;
                }
                
                // Remote (non-local) voices often have better quality
                if (!voice.localService) {
                    score += 10;
                }
                
                return score;
            };
            
            // Score and sort voices
            const scoredVoices = voices.map(voice => ({
                voice,
                score: scoreVoice(voice)
            }));
            
            scoredVoices.sort((a, b) => b.score - a.score);
            
            // Log the top 3 voices with their scores
            console.log("Top voices by score:");
            scoredVoices.slice(0, 3).forEach((sv, i) => {
                console.log(`${i+1}. ${sv.voice.name} (${sv.voice.lang}) - Score: ${sv.score}`);
            });
            
            // Use the highest scored voice
            if (scoredVoices.length > 0) {
                utterance.voice = scoredVoices[0].voice;
                console.log("Auto-selected voice:", utterance.voice.name, "with score", scoredVoices[0].score);
            }
        }
        
        // Add a playful sound effect before speaking (using AudioContext)
        playSuccessSound().then(() => {
            // Speak the rhyme after the sound effect
            setTimeout(() => {
                window.speechSynthesis.speak(utterance);
            }, 500);
        });
    }
}

// Play a success sound when an object is detected
async function playSuccessSound() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.error('Web Audio API is not supported in this browser', e);
            return Promise.resolve();
        }
    }
    
    // Create oscillator for a playful sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
    
    return new Promise(resolve => setTimeout(resolve, 300));
}

// Show message in the UI
function showMessage(title, message) {
    objectNameElement.textContent = title;
    objectDescriptionElement.textContent = message;
}

// Initialize the application when the page loads
window.addEventListener('load', init);

// Make sure voices are loaded (for some browsers)
window.speechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
    // Create voice selector when voices are loaded
    createVoiceSelector();
};
