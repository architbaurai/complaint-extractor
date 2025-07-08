import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const getGeminiResponse = async (complaintMessage)=>{

    const prompt = `
        You are an information extractor.

        Your task:
        1. Analyze and Extract the following details from the complaint smartly: 
        - city
        - street (Extract only the core location name. Remove words like near, around, beside, in front of, etc.)
        - type (enum: ["Road", "Water", "Electricity", "Waste", "Other"])
        - severity (enum: ["Low", "Medium", "High"])

        2. If any detail is missing, set its value to null.

        3. Respond ONLY with a valid minified JSON object. No extra text, no explanations, no markdown.

        Complaint: """${complaintMessage}"""
    `;

    const response = await ai.models.generateContent({

        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
            systemInstruction: "Always return JSON with keys: city, street, type, criticality.",
            temperature: 0,
            maxOutputTokens: 256,
            candidateCount: 1
          }
    });

    return response;
}

export {getGeminiResponse};
