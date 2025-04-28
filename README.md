# Mad Learning with Vision

A fun, interactive learning application that uses computer vision to identify objects in photos and teaches about them through rhymes.

## Overview

Mad Learning with Vision is an educational web application that uses the device's camera to capture images of objects, identifies them using machine learning, and then displays a rhyme about the object. This creates an engaging, multi-sensory learning experience that helps users learn about the world around them.

## Features

- **Simple, Child-Friendly Interface**: Bright colors, large buttons, and intuitive design suitable for young children.
- **Object Recognition**: Uses TensorFlow.js and COCO-SSD model to identify common objects in real-time.
- **Educational Rhymes**: Displays fun, age-appropriate rhymes for each recognized object.
- **Audio Feedback**: Reads the rhymes aloud using text-to-speech technology.
- **Spacebar Control**: Easy for children to use by simply pressing the spacebar to take a photo.
- **Visual Feedback**: Highlights detected objects with colorful bounding boxes.

## Technical Details

### Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Computer Vision**: TensorFlow.js with COCO-SSD model
- **Audio**: Web Speech API for text-to-speech

### Architecture

The application follows a simple architecture:

1. **Camera Module**: Handles video streaming and image capture
2. **Object Detection Module**: Processes images and identifies objects
3. **Rhyme Database**: Stores educational rhymes for common objects
4. **UI Controller**: Manages the user interface and interactions
5. **Audio Module**: Handles text-to-speech functionality

## Setup Instructions

You can run this application in three different ways:

### Option 1: Direct Browser Opening

1. Clone or download this repository to your local machine.
2. Open the project folder in your preferred code editor.
3. Launch the application by opening `index.html` directly in a modern web browser (Chrome, Firefox, Edge recommended).
4. Allow camera access when prompted by the browser.

### Option 2: Using Node.js (Express)

1. Clone or download this repository to your local machine.
2. Open the project folder in your preferred code editor.
3. Make sure you have Node.js installed on your computer.
4. Open a terminal in the project directory and run:
   ```
   npm install
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`
6. Allow camera access when prompted by the browser.

### Option 3: Using Python (Flask)

1. Clone or download this repository to your local machine.
2. Open the project folder in your preferred code editor.
3. Make sure you have Python installed on your computer.
4. Open a terminal in the project directory and run:
   ```
   pip install -r requirements.txt
   python app.py
   ```
5. Open your browser and navigate to `http://localhost:5000`
6. Allow camera access when prompted by the browser.

**Note**: For best performance, use the application in a well-lit environment.

## How to Use

1. Point your device's camera at an object you want to identify.
2. Press the spacebar or click the "Take Photo" button.
3. The application will identify the object, display its name, and show a rhyme about it.
4. The rhyme will be read aloud automatically.
5. To identify another object, simply point the camera at it and press the spacebar again.

## Supported Objects

The application can recognize a wide range of common objects, including:

- Fruits (apple, banana, orange)
- Animals (cat, dog, bird, fish)
- Toys (ball, teddy bear, doll)
- Household items (chair, table, cup, book, clock)
- Clothing (shoe, hat)
- Transportation (car, bicycle)
- Nature (tree, flower)

## Privacy and Security

- All processing happens locally in the browser - no images are uploaded to any server.
- No data is collected or stored beyond the current session.
- Camera access is only used while the application is open.

## Future Improvements

- Add actual audio recordings for rhymes instead of text-to-speech
- Expand the database of objects and rhymes
- Add multilingual support
- Implement a "learning mode" that quizzes children on objects they've seen
- Create a mobile app version for better performance on tablets and smartphones

## License

This project is open source and available under the MIT License.

## Credits

- Object detection powered by TensorFlow.js and COCO-SSD model
- Rhymes created specifically for educational purposes
- Icons and design elements created for child-friendly interfaces
