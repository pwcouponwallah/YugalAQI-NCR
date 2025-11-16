
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Using mock data.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const getMockHealthRecommendations = (aqi: number) => {
    let recommendations = "### General Advice\n*   Stay hydrated by drinking plenty of water.\n\n";

    if (aqi <= 50) {
        recommendations += "### Specific Groups\n*   **Everyone:** It's a great day to be active outside. Enjoy the fresh air!";
    } else if (aqi <= 100) {
        recommendations += "### Specific Groups\n*   **Sensitive Groups:** You might feel some minor effects. It's still okay for outdoor activities.";
    } else if (aqi <= 200) {
        recommendations += "### Specific Groups\n*   **Sensitive Groups:** Reduce prolonged or heavy exertion outdoors.\n*   **Everyone else:** It's okay for outdoor activities, but take it easy if you feel discomfort.";
    } else if (aqi <= 300) {
        recommendations += "### Specific Groups\n*   **Sensitive Groups:** Avoid all outdoor exertion.\n*   **Everyone else:** Reduce prolonged or heavy outdoor exertion.";
    } else if (aqi <= 400) {
        recommendations += "### Specific Groups\n*   **Everyone:** Avoid prolonged or heavy outdoor exertion. Consider rescheduling outdoor activities.\n*   **Sensitive Groups:** Remain indoors and keep activity levels low.";
    } else {
        recommendations += "### Specific Groups\n*   **Everyone:** Avoid all outdoor exertion and stay indoors as much as possible.\n*   **Sensitive Groups:** Remain indoors and keep windows closed. Use an air purifier if available.";
    }
    return recommendations;
};

export const getHealthRecommendations = async (aqi: number): Promise<string> => {
  if (!ai) {
    return getMockHealthRecommendations(aqi);
  }

  const prompt = `
    You are an expert health advisor specializing in air quality in Delhi, India.
    The current Air Quality Index (AQI) is ${aqi}.

    Provide clear, concise, and actionable health recommendations.
    Organize the advice into two sections: "General Advice" for everyone, and "Specific Groups" with tailored advice for:
    - Children & Elderly
    - People with respiratory conditions (like asthma)
    - Outdoor workers/exercisers

    The advice should be practical for a resident of Delhi. Use simple language.
    Format the output as markdown with headings and bullet points. Do not include any introductory or concluding sentences outside of the recommendations themselves.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching recommendations from Gemini:", error);
    return getMockHealthRecommendations(aqi);
  }
};
