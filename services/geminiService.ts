import { Course, ChatMessage } from "../types";

/**
 * Service to interact with our local Gemini API proxy.
 */
export const getOrientationAdvice = async (
  prompt: string, 
  courses: Course[], 
  externalData: any = null,
  context?: string,
  history: ChatMessage[] = [] // New: Full conversation history
): Promise<string> => {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt, 
        courses, 
        externalData,
        context,
        history
      })
    });

    if (!res.ok) return "Désolé, le mentor est indisponible.";
    const json = await res.json();
    return json?.text ?? "Erreur de génération.";
  } catch (error) {
    return "Erreur de connexion au mentor.";
  }
};

export const analyzeOnboardingProfile = async (answers: any): Promise<string> => {
  try {
    const prompt = `Analyse ce profil utilisateur et génère un titre de persona (3-4 mots max) : ${JSON.stringify(answers)}`;
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const json = await res.json();
    return json?.text ?? "Apprenant Engagé";
  } catch (error) {
    return "Apprenant Engagé";
  }
};
