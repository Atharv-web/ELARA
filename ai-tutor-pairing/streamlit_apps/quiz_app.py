import streamlit as st
import random
from PIL import Image
import numpy as np

# Configure the Streamlit page
st.set_page_config(
    page_title="ELARA Interactive Quiz",
    page_icon="🎯",
    layout="wide"
)

# Quiz data
quiz_data = {
    "AI & Machine Learning": [
        {
            "question": "What is the main goal of supervised learning?",
            "options": [
                "To learn from labeled data and make predictions",
                "To cluster data without labels",
                "To learn through trial and error",
                "To generate new data samples"
            ],
            "correct": 0
        },
        {
            "question": "Which of these is NOT a type of machine learning?",
            "options": [
                "Supervised Learning",
                "Reinforcement Learning",
                "Cognitive Learning",
                "Unsupervised Learning"
            ],
            "correct": 2
        }
    ],
    "Programming": [
        {
            "question": "What is a variable in programming?",
            "options": [
                "A fixed value that never changes",
                "A container for storing data values",
                "A type of loop",
                "A mathematical equation"
            ],
            "correct": 1
        },
        {
            "question": "Which data structure uses LIFO (Last In, First Out)?",
            "options": [
                "Queue",
                "Stack",
                "Array",
                "Linked List"
            ],
            "correct": 1
        }
    ],
    "Science": [
        {
            "question": "What is the process by which plants convert light energy into chemical energy?",
            "options": [
                "Photosynthesis",
                "Respiration",
                "Fermentation",
                "Oxidation"
            ],
            "correct": 0
        },
        {
            "question": "Which of these is NOT a state of matter?",
            "options": [
                "Solid",
                "Liquid",
                "Energy",
                "Gas"
            ],
            "correct": 2
        }
    ]
}

def main():
    st.title("🎯 ELARA Interactive Quiz")
    
    # Sidebar for subject selection
    st.sidebar.title("Quiz Settings")
    subject = st.sidebar.selectbox(
        "Choose your subject",
        list(quiz_data.keys())
    )
    
    # Initialize session state
    if 'current_question' not in st.session_state:
        st.session_state.current_question = 0
    if 'score' not in st.session_state:
        st.session_state.score = 0
    if 'answered' not in st.session_state:
        st.session_state.answered = False
    
    # Display current subject and progress
    st.write(f"## {subject}")
    progress = st.progress(st.session_state.current_question / len(quiz_data[subject]))
    
    # Display current question
    if st.session_state.current_question < len(quiz_data[subject]):
        question = quiz_data[subject][st.session_state.current_question]
        
        st.write(f"### Question {st.session_state.current_question + 1}")
        st.write(question["question"])
        
        # Display options as buttons
        if not st.session_state.answered:
            cols = st.columns(2)
            for i, option in enumerate(question["options"]):
                if i % 2 == 0:
                    if cols[0].button(option, key=f"option_{i}"):
                        st.session_state.answered = True
                        if i == question["correct"]:
                            st.success("✅ Correct!")
                            st.session_state.score += 1
                        else:
                            st.error("❌ Incorrect. The correct answer was: " + 
                                   question["options"][question["correct"]])
                else:
                    if cols[1].button(option, key=f"option_{i}"):
                        st.session_state.answered = True
                        if i == question["correct"]:
                            st.success("✅ Correct!")
                            st.session_state.score += 1
                        else:
                            st.error("❌ Incorrect. The correct answer was: " + 
                                   question["options"][question["correct"]])
        
        # Next question button
        if st.session_state.answered:
            if st.button("Next Question"):
                st.session_state.current_question += 1
                st.session_state.answered = False
                st.experimental_rerun()
    
    else:
        # Quiz completed
        st.success(f"🎉 Quiz completed! Your score: {st.session_state.score}/{len(quiz_data[subject])}")
        
        # Calculate percentage
        percentage = (st.session_state.score / len(quiz_data[subject])) * 100
        st.write(f"Percentage: {percentage:.1f}%")
        
        # Display performance message
        if percentage >= 80:
            st.balloons()
            st.write("🌟 Excellent performance! You've mastered this subject!")
        elif percentage >= 60:
            st.write("👍 Good job! Keep practicing to improve further.")
        else:
            st.write("📚 Keep learning! Review the topics and try again.")
        
        # Restart button
        if st.button("Restart Quiz"):
            st.session_state.current_question = 0
            st.session_state.score = 0
            st.session_state.answered = False
            st.experimental_rerun()

if __name__ == "__main__":
    main() 