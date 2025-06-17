export const teachingChains = [
  {
    id: "discover_practice_reflect",
    chain_name: "Discover → Practice → Reflect",
    styles: ["Professor Echo", "Coach Phoenix", "Master Zen"],
    description: "Start with inquiry-driven learning, reinforce through gamified practice, and conclude with mindfulness and reflection.",
    phases: [
      {
        name: "Discover",
        tutor: "Professor Echo",
        transition_point: "concept_understood"
      },
      {
        name: "Practice",
        tutor: "Coach Phoenix",
        transition_point: "skills_demonstrated"
      },
      {
        name: "Reflect",
        tutor: "Master Zen",
        transition_point: "session_complete"
      }
    ]
  },
  {
    id: "understand_connect_system",
    chain_name: "Understand Deeply → Connect Broadly → Think Systemically",
    styles: ["Master Zen", "Nova Starweaver", "Dr. Quantum Quest"],
    description: "Begin with clarity, relate to other disciplines, and then contextualize within complex systems.",
    phases: [
      {
        name: "Understand",
        tutor: "Master Zen",
        transition_point: "basics_mastered"
      },
      {
        name: "Connect",
        tutor: "Nova Starweaver",
        transition_point: "connections_made"
      },
      {
        name: "Systemize",
        tutor: "Dr. Quantum Quest",
        transition_point: "session_complete"
      }
    ]
  },
  {
    id: "teach_story_visual",
    chain_name: "Teach Simply → Tell a Story → Visualize It",
    styles: ["Master Zen", "Nova Starweaver", "Dr. Quantum Quest"],
    description: "Use child-friendly simplicity, build narrative memory, and reinforce with visual structures.",
    phases: [
      {
        name: "Simplify",
        tutor: "Master Zen",
        transition_point: "concept_simplified"
      },
      {
        name: "Narrate",
        tutor: "Nova Starweaver",
        transition_point: "story_complete"
      },
      {
        name: "Visualize",
        tutor: "Dr. Quantum Quest",
        transition_point: "session_complete"
      }
    ]
  },
  {
    id: "light_deep_debate",
    chain_name: "Light → Deep → Debate",
    styles: ["Urahara Sensei", "Professor Echo", "Kuchiki Sensei"],
    description: "Warm up with friendly guidance, explore logic rigorously, and conclude with a structured argument.",
    phases: [
      {
        name: "Warm Up",
        tutor: "Urahara Sensei",
        transition_point: "comfort_established"
      },
      {
        name: "Deep Dive",
        tutor: "Professor Echo",
        transition_point: "depth_achieved"
      },
      {
        name: "Debate",
        tutor: "Kuchiki Sensei",
        transition_point: "session_complete"
      }
    ]
  },
  {
    id: "explore_simulate_analyze",
    chain_name: "Explore Creatively → Simulate → Analyze with Data",
    styles: ["Nova Starweaver", "Dr. Quantum Quest", "Kuchiki Sensei"],
    description: "Foster curiosity, test ideas interactively, then reflect on performance using metrics.",
    phases: [
      {
        name: "Explore",
        tutor: "Nova Starweaver",
        transition_point: "curiosity_sparked"
      },
      {
        name: "Simulate",
        tutor: "Dr. Quantum Quest",
        transition_point: "simulation_complete"
      },
      {
        name: "Analyze",
        tutor: "Kuchiki Sensei",
        transition_point: "session_complete"
      }
    ]
  }
];

export const chainTransitionTriggers = {
  concept_understood: (messages) => {
    // Check if the student has demonstrated understanding through their responses
    const lastUserMessages = messages.slice(-3).filter(m => m.role === 'user');
    return lastUserMessages.length >= 2;
  },
  skills_demonstrated: (messages) => {
    // Check if the student has successfully completed practice exercises
    const practiceAttempts = messages.filter(m => m.role === 'user' && m.content.includes('practice'));
    return practiceAttempts.length >= 3;
  },
  basics_mastered: (messages) => {
    // Check if student has grasped fundamental concepts
    const userResponses = messages.filter(m => m.role === 'user');
    return userResponses.length >= 3;
  },
  connections_made: (messages) => {
    // Check if student has made interdisciplinary connections
    const connectionResponses = messages.filter(m => 
      m.role === 'user' && m.content.toLowerCase().includes('connect')
    );
    return connectionResponses.length >= 2;
  },
  concept_simplified: (messages) => {
    // Check if student can explain the concept simply
    const explanations = messages.filter(m => 
      m.role === 'user' && m.content.length > 50
    );
    return explanations.length >= 1;
  },
  comfort_established: (messages) => {
    // Check if student is engaged and comfortable
    return messages.filter(m => m.role === 'user').length >= 2;
  },
  depth_achieved: (messages) => {
    // Check if discussion has reached sufficient depth
    const longResponses = messages.filter(m => 
      m.role === 'user' && m.content.length > 100
    );
    return longResponses.length >= 2;
  },
  curiosity_sparked: (messages) => {
    // Check if student is asking exploratory questions
    const questions = messages.filter(m => 
      m.role === 'user' && m.content.includes('?')
    );
    return questions.length >= 2;
  }
};

export function determineNextPhase(currentChain, currentPhase, messages) {
  const chain = teachingChains.find(c => c.id === currentChain);
  if (!chain) return null;

  const currentPhaseIndex = chain.phases.findIndex(p => p.name === currentPhase);
  if (currentPhaseIndex === -1) return chain.phases[0];

  const currentPhaseObj = chain.phases[currentPhaseIndex];
  const transitionTrigger = chainTransitionTriggers[currentPhaseObj.transition_point];

  if (transitionTrigger && transitionTrigger(messages)) {
    return chain.phases[currentPhaseIndex + 1] || null;
  }

  return currentPhaseObj;
}

// Function to determine the next phase based on current phase and user message
const getNextPhase = (currentChain, currentPhase, userMessage) => {
  const chain = teachingChains.find(c => c.id === currentChain);
  if (!chain) return null;

  const currentPhaseObj = chain.phases.find(p => p.name === currentPhase);
  if (!currentPhaseObj) return null;

  // Check if user is trying to change tutors
  if (userMessage.toLowerCase().includes('change tutor') || 
      userMessage.toLowerCase().includes('switch tutor') ||
      userMessage.toLowerCase().includes('different tutor')) {
    return {
      nextPhase: currentPhase,
      message: "I understand you might want to change tutors, but let's first complete our current learning phase. This ensures you get the most out of your learning experience. Would you like to continue with our current topic?"
    };
  }

  // Check transition triggers
  for (const trigger of currentPhaseObj.transitionTriggers) {
    if (trigger.type === 'message' && trigger.condition(userMessage)) {
      return {
        nextPhase: trigger.nextPhase,
        message: null
      };
    }
  }

  return {
    nextPhase: currentPhase,
    message: null
  };
};

// Function to get the current tutor for a phase
const getTutorForPhase = (chainId, phaseName) => {
  const chain = teachingChains.find(c => c.id === chainId);
  if (!chain) return null;

  const phase = chain.phases.find(p => p.name === phaseName);
  return phase ? phase.tutor : null;
};

// Function to check if a tutor change is allowed
const isTutorChangeAllowed = (currentChain, currentPhase, newTutor) => {
  const chain = teachingChains.find(c => c.id === currentChain);
  if (!chain) return false;

  const currentPhaseObj = chain.phases.find(p => p.name === currentPhase);
  if (!currentPhaseObj) return false;

  // Only allow tutor changes if we're in a transition phase or if the current phase is complete
  const isTransitionPhase = currentPhaseObj.transitionTriggers.some(trigger => 
    trigger.type === 'message' && trigger.condition('ready')
  );

  return isTransitionPhase || currentPhaseObj.name === 'mastery';
};

export {
  getNextPhase,
  getTutorForPhase,
  isTutorChangeAllowed
}; 