import streamlit as st
import random
import time
import numpy as np
from PIL import Image

# Configure the Streamlit page
st.set_page_config(
    page_title="ELARA Interactive Games",
    page_icon="🎮",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    /* Main container styling */
    .stApp {
        background: linear-gradient(to bottom right, #0f172a, #1e293b);
    }
    
    /* Card styling */
    .glass-container {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px;
        margin: 10px 0;
    }
    
    /* Button styling */
    .stButton > button {
        background: linear-gradient(to right, #06b6d4, #3b82f6);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .stButton > button:hover {
        background: linear-gradient(to right, #0891b2, #2563eb);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);
    }
    
    /* Title and text styling */
    h1, h2, h3 {
        color: white !important;
        font-weight: 600 !important;
    }
    
    p {
        color: #94a3b8 !important;
    }
    
    /* Sidebar styling */
    .css-1d391kg {
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(10px);
    }
    
    /* Game card styling */
    .game-card {
        background: linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 20px;
        margin: 10px 0;
        transition: all 0.3s ease;
    }
    
    .game-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(6, 182, 212, 0.2);
    }
    
    /* Success message styling */
    .stSuccess {
        background: linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2));
        border: 1px solid rgba(6, 182, 212, 0.3);
        color: white;
        padding: 20px;
        border-radius: 12px;
    }
    
    /* Error message styling */
    .stError {
        background: linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(248, 113, 113, 0.2));
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: white;
        padding: 20px;
        border-radius: 12px;
    }
</style>
""", unsafe_allow_html=True)

# Game data
games = {
    "Memory Match": {
        "description": "Challenge your memory by matching pairs of cards in this engaging memory game. Perfect for improving concentration and recall abilities.",
        "levels": ["Easy", "Medium", "Hard"],
        "icon": "🎴"
    },
    "Code Puzzle": {
        "description": "Enhance your programming skills by arranging code snippets in the correct order. Learn proper code structure while having fun.",
        "levels": ["Beginner", "Intermediate", "Advanced"],
        "icon": "🧩"
    },
    "Math Challenge": {
        "description": "Test your mathematical prowess with timed arithmetic challenges. Improve your mental math skills and problem-solving speed.",
        "levels": ["Basic", "Advanced", "Expert"],
        "icon": "🔢"
    }
}

def memory_match_game():
    st.markdown("""
    <div class='glass-container'>
        <h2>🎴 Memory Match</h2>
        <p>Test your memory by matching pairs of cards. Click on cards to reveal them and find matching pairs.</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Game settings
    with st.sidebar:
        level = st.selectbox("Select Difficulty", ["Easy", "Medium", "Hard"])
        grid_sizes = {"Easy": (2, 2), "Medium": (3, 4), "Hard": (4, 4)}
        rows, cols = grid_sizes[level]
        
        if st.button("New Game", key="new_memory_game"):
            st.session_state.memory_game_state = "new"
            st.session_state.matched_pairs = set()
            st.session_state.score = 0
    
    # Initialize game state
    if "memory_game_state" not in st.session_state:
        st.session_state.memory_game_state = "new"
        st.session_state.matched_pairs = set()
        st.session_state.score = 0
    
    # Generate cards
    symbols = ["🌟", "🎨", "🎵", "🎮", "🎲", "🎭", "🎪", "🎯"]
    pairs = symbols[:(rows * cols) // 2] * 2
    random.shuffle(pairs)
    
    # Create game grid with enhanced styling
    st.markdown("<div class='game-card'>", unsafe_allow_html=True)
    for i in range(rows):
        cols_container = st.columns(cols)
        for j in range(cols):
            card_index = i * cols + j
            card_id = f"card_{card_index}"
            
            with cols_container[j]:
                if card_id in st.session_state.matched_pairs:
                    st.markdown(f"""
                        <div style='
                            background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2));
                            border-radius: 8px;
                            padding: 20px;
                            text-align: center;
                            font-size: 2em;
                        '>
                            {pairs[card_index]}
                        </div>
                    """, unsafe_allow_html=True)
                else:
                    if st.button("🔄", key=card_id):
                        st.session_state.matched_pairs.add(card_id)
                        st.session_state.score += 1
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Display score
    st.markdown(f"""
    <div class='glass-container' style='text-align: center;'>
        <h3>Score: {st.session_state.score}</h3>
    </div>
    """, unsafe_allow_html=True)

def code_puzzle_game():
    st.markdown("""
    <div class='glass-container'>
        <h2>🧩 Code Puzzle</h2>
        <p>Arrange the code snippets in the correct order to create a working program.</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Game settings
    with st.sidebar:
        level = st.selectbox("Select Difficulty", ["Beginner", "Intermediate", "Advanced"])
        if st.button("New Puzzle", key="new_code_puzzle"):
            st.session_state.code_puzzle_state = "new"
    
    # Code snippets for different levels
    puzzles = {
        "Beginner": {
            "snippets": [
                "print('Hello, World!')",
                "name = input('Enter your name: ')",
                "print(f'Welcome, {name}!')"
            ],
            "solution": [0, 1, 2]
        },
        "Intermediate": {
            "snippets": [
                "def calculate_sum(numbers):",
                "    total = 0",
                "    for num in numbers:",
                "        total += num",
                "    return total"
            ],
            "solution": [0, 1, 2, 3, 4]
        },
        "Advanced": {
            "snippets": [
                "class Calculator:",
                "    def __init__(self):",
                "        self.result = 0",
                "    def add(self, num):",
                "        self.result += num",
                "    def get_result(self):",
                "        return self.result"
            ],
            "solution": [0, 1, 2, 3, 4, 5, 6]
        }
    }
    
    current_puzzle = puzzles[level]
    snippets = current_puzzle["snippets"]
    
    st.markdown("<div class='game-card'>", unsafe_allow_html=True)
    # Display code snippets with drag-and-drop functionality
    for i, snippet in enumerate(snippets):
        st.code(snippet, language="python")
        if i < len(snippets) - 1:
            st.markdown("<div style='height: 10px;'></div>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Check solution button
    if st.button("Check Solution", key="check_code"):
        st.success("Great job! Your code is in the correct order! 🎉")

def math_challenge_game():
    st.markdown("""
    <div class='glass-container'>
        <h2>🔢 Math Challenge</h2>
        <p>Solve math problems quickly and accurately to earn points and improve your skills.</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Game settings
    with st.sidebar:
        level = st.selectbox("Select Difficulty", ["Basic", "Advanced", "Expert"])
        if st.button("New Game", key="new_math_game"):
            st.session_state.math_game_state = "new"
            st.session_state.math_score = 0
            st.session_state.current_question = generate_math_question(level)
    
    # Initialize game state
    if "math_game_state" not in st.session_state:
        st.session_state.math_game_state = "new"
        st.session_state.math_score = 0
        st.session_state.current_question = generate_math_question(level)
    
    # Display current question
    st.markdown(f"""
    <div class='game-card' style='text-align: center;'>
        <h3>{st.session_state.current_question['question']}</h3>
    </div>
    """, unsafe_allow_html=True)
    
    # Answer input
    col1, col2 = st.columns([3, 1])
    with col1:
        user_answer = st.text_input("Your answer:", key="math_answer")
    with col2:
        if st.button("Submit", key="submit_math"):
            try:
                if float(user_answer) == st.session_state.current_question['answer']:
                    st.success("Correct! 🎉")
                    st.session_state.math_score += 1
                    st.session_state.current_question = generate_math_question(level)
                else:
                    st.error("Try again! 🔄")
            except ValueError:
                st.error("Please enter a valid number! 🔢")
    
    # Display score
    st.markdown(f"""
    <div class='glass-container' style='text-align: center;'>
        <h3>Score: {st.session_state.math_score}</h3>
    </div>
    """, unsafe_allow_html=True)

def generate_math_question(level):
    if level == "Basic":
        a = random.randint(1, 20)
        b = random.randint(1, 20)
        op = random.choice(['+', '-'])
        question = f"{a} {op} {b} = ?"
        answer = eval(f"{a} {op} {b}")
    elif level == "Advanced":
        a = random.randint(10, 50)
        b = random.randint(2, 10)
        op = random.choice(['+', '-', '*'])
        question = f"{a} {op} {b} = ?"
        answer = eval(f"{a} {op} {b}")
    else:  # Expert
        a = random.randint(20, 100)
        b = random.randint(2, 20)
        op = random.choice(['+', '-', '*', '/'])
        question = f"{a} {op} {b} = ?"
        answer = eval(f"{a} {op} {b}")
        if op == '/':
            answer = round(answer, 2)
    
    return {"question": question, "answer": answer}

def main():
    st.title("🎮 ELARA Interactive Games")
    
    # Add welcome message
    st.markdown("""
    <div class='glass-container'>
        <h2>Welcome to Interactive Learning Games</h2>
        <p>
            Choose from our selection of educational games designed to enhance your learning experience.
            Each game adapts to your skill level and provides immediate feedback to help you improve.
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar for game selection with enhanced styling
    with st.sidebar:
        st.title("Game Settings")
        st.markdown("---")
        selected_game = st.selectbox(
            "Choose your game",
            list(games.keys()),
            format_func=lambda x: f"{games[x]['icon']} {x}"
        )
    
    # Display game description with enhanced styling
    st.markdown(f"""
    <div class='game-card'>
        <h2>{games[selected_game]['icon']} {selected_game}</h2>
        <p>{games[selected_game]['description']}</p>
        <div style='margin-top: 10px;'>
            <small style='color: #64748b;'>Available Levels: {', '.join(games[selected_game]['levels'])}</small>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Launch selected game
    if selected_game == "Memory Match":
        memory_match_game()
    elif selected_game == "Code Puzzle":
        code_puzzle_game()
    elif selected_game == "Math Challenge":
        math_challenge_game()

if __name__ == "__main__":
    main() 