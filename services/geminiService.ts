
import { Course } from "../types";

const PROXY_URL = (import.meta as any).env?.VITE_API_PROXY || 'http://localhost:3001/api/openai';

export const analyzeOnboardingProfile = async (answers: any): Promise<string> => {
  try {
    const prompt = `Analyse ces réponses de questionnaire d'onboarding pour une plateforme de formation numérique responsable :\n${JSON.stringify(answers)}\nDonne-moi uniquement un titre de Persona professionnel et une phrase de description.`;
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const json = await res.json();
    return json?.text ?? "Apprenant Engagé";
  } catch (error) {
    return "Apprenant Numérique Responsable";
  }
};

export const getOrientationAdvice = async (userPrompt: string, availableCourses: Course[], externalData?: any) => {
  try {
    const courseContext = JSON.stringify(availableCourses.map(c => ({
      id: c.id,
      title: c.title,
      skills: c.skills.join(', '),
      carbon: c.ecoScore.carbonFootprint + "kg CO2",
      sovScore: c.sovereignty.sovereigntyScore + "/100",
      jurisdiction: c.sovereignty.legalJurisdiction
    })));

    const externalContext = externalData ? `\n\nDONNÉES EXTERNES:\n${JSON.stringify(externalData)}` : '';

    const prompt = `Tu es l'expert en orientation de EcoOrient.\n\nCONTEXTE DES FORMATIONS :\n${courseContext}\n\nDEMANDE UTILISATEUR :\n"${userPrompt}"${externalContext}\n\nDIRECTIVES :\n1. Analyse les compétences mentionnées.\n2. Recommande la formation la plus pertinente techniquement.\n3. Justifie ton choix en comparant explicitement le Score de Souveraineté et l'Empreinte Carbone.\n4. Si l'utilisateur demande une techno polluante, propose une alternative.\n5. Réponds de manière structurée et professionnelle.`;

    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const json = await res.json();
    return json?.text ?? "Erreur de génération de conseil.";
  } catch (error) {
    console.error("Proxy Error:", error);
    return "L'expert IA est momentanément indisponible.";
  }
};
