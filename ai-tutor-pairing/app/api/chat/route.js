import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { teaching_templates } from '@/lib/tutorTemplates';
import { teachingChains, determineNextPhase } from '@/lib/teachingChains';

// Initialize Supabase client with proper error handling
let supabase;
try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // For local development, use the service role key from supabase status
  const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

  if (!supabaseUrl) {
    throw new Error('Missing Supabase URL');
  }

  supabase = createClient(supabaseUrl, serviceRoleKey);
  
  // Test the connection
  supabase.from('conversations').select('count', { count: 'exact', head: true })
    .then(({ error }) => {
      if (error) {
        console.error('Supabase connection test failed:', error);
      } else {
        console.log('Supabase connection test successful');
      }
    });

} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

// Initialize Gemini model with configuration
const GEMINI_MODEL = {
  name: "gemini-2.0-flash",
  options: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  }
};

// Initialize Gemini with error handling
let model;
try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ 
    model: GEMINI_MODEL.name,
    ...GEMINI_MODEL.options
  });
} catch (error) {
  console.error('Failed to initialize Gemini model:', error);
}

export async function POST(req) {
  try {
    if (!model) {
      throw new Error('Gemini model not properly initialized');
    }

    const { message, tutor, history, currentChain, currentPhase } = await req.json();

    if (!message || !tutor || !teaching_templates[tutor]) {
      throw new Error('Invalid request parameters');
    }

    // Check for phase transition if we're in a chain
    let nextPhase = null;
    let nextTutor = tutor;
    
    if (currentChain && currentPhase) {
      nextPhase = determineNextPhase(currentChain, currentPhase, [...history, { role: 'user', content: message }]);
      if (nextPhase && nextPhase.name !== currentPhase) {
        nextTutor = nextPhase.tutor;
      }
    }

    // Store the conversation in Supabase
    let conversationData;
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .insert([
            {
              user_message: message,
              tutor_type: tutor,
              timestamp: new Date().toISOString(),
              user_id: null,
              metadata: {
                chain: currentChain,
                phase: currentPhase,
                next_phase: nextPhase?.name,
                next_tutor: nextTutor
              }
            }
          ])
          .select();

        if (error) {
          console.error('Supabase insert error:', error);
        } else {
          conversationData = data;
        }
      } catch (error) {
        console.error('Failed to store conversation:', error);
      }
    }

    // Get response from Gemini with error handling
    let result;
    try {
      // Add chain and phase context to the prompt
      const chainContext = currentChain ? 
        `You are in the "${currentPhase}" phase of the "${currentChain}" teaching chain. ` +
        `Focus on ${nextPhase?.name === currentPhase ? 'maintaining' : 'transitioning to'} this teaching style.` : '';

      result = await model.generateContent([
        teaching_templates[nextTutor],
        chainContext,
        ...history.map(msg => msg.content),
        message
      ]);
      
      if (!result?.response) {
        throw new Error('Empty response from Gemini');
      }

      const text = result.response.text();
      if (!text) {
        throw new Error('Empty text from Gemini response');
      }

      // Store the AI response if Supabase is available
      if (supabase && conversationData?.[0]?.id) {
        try {
          await supabase
            .from('conversations')
            .update({ ai_response: text })
            .eq('id', conversationData[0].id);
        } catch (error) {
          console.error('Failed to store AI response:', error);
        }
      }

      return new Response(
        JSON.stringify({ 
          response: text,
          nextPhase: nextPhase?.name !== currentPhase ? nextPhase : null,
          nextTutor: nextPhase?.name !== currentPhase ? nextTutor : null
        }), 
        { headers: { 'Content-Type': 'application/json' } }
      );

    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Try fallback with simpler context
      try {
        result = await model.generateContent([
          "You are a helpful tutor. Keep responses clear and concise.",
          message
        ]);
        
        const fallbackText = result?.response?.text();
        if (fallbackText) {
          return new Response(
            JSON.stringify({ 
              response: fallbackText,
              fallback: true 
            }), 
            { headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }

      return new Response(
        JSON.stringify({ 
          error: 'Failed to get response from AI',
          details: error.message 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 