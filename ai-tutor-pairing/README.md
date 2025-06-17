# ELARA Interactive Learning Platform

A modern learning platform that combines Next.js for the main application and Streamlit for interactive learning features.

## Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Install Python dependencies for Streamlit apps:
```bash
cd streamlit_apps
pip install -r requirements.txt
cd ..
```

## Running the Applications

### Main Application
Start the Next.js development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Interactive Learning Features
Open two new terminal windows and run the following commands:

1. Quiz Application:
```bash
cd streamlit_apps
streamlit run quiz_app.py
```
The quiz app will be available at `http://localhost:8501`

2. Games Application:
```bash
cd streamlit_apps
streamlit run game_app.py --port 8502
```
The games app will be available at `http://localhost:8502`

## Features

### Main Application
- Modern, responsive UI built with Next.js and Tailwind CSS
- Interactive learning dashboard
- Progress tracking
- Achievement system
- User profiles

### Interactive Learning
1. Quiz Application
   - Multiple subjects (AI & ML, Programming, Science)
   - Interactive questions with immediate feedback
   - Progress tracking
   - Performance analytics

2. Games Application
   - Memory Match: Card matching game with multiple difficulty levels
   - Code Puzzle: Arrange code snippets in correct order
   - Math Challenge: Timed math problems with scoring

## Usage
1. Start all three applications as described above
2. Navigate to `http://localhost:3000` in your browser
3. Click on "Interactive Learning" in the navigation
4. Choose a subject to start the quiz app or click "Play Interactive Games" to access the games

## Development
- The main application is built with Next.js and can be found in the root directory
- Interactive learning features are built with Streamlit and can be found in the `streamlit_apps` directory
- Each component is designed to work independently while providing a seamless experience when used together 