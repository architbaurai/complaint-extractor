import { ApiError } from "@google/genai";
import { Complaint } from "../models/complaint.model.js";
import { getGeminiResponse } from "../utils/gemini.js";

const processComplaint = async (complainer, complaintMessage, mediaUrls, complaintTime)=>{

    const geminiRaw = await getGeminiResponse(complaintMessage);
    const geminiText = geminiRaw.candidates[0].content.parts[0].text;
    
    console.log(geminiText);
    
    let geminiResponse;
    
    try{
        geminiResponse = JSON.parse(geminiText);
    } catch(error) {
        return res.status(500).json({error: "something went wrong"});
    }
    
    
    if(!geminiResponse.city || geminiResponse.city === ""){
        throw new ApiError(400, "gemini response error");
    }
    
    if(!geminiResponse.street || geminiResponse.street === ""){
        throw new ApiError(400, "gemini response error");
    }
    
    if(!geminiResponse.type || geminiResponse.type === ""){
        throw new ApiError(400, "gemini response error");
    }
    
    if(!geminiResponse.criticality || geminiResponse.criticality === ""){
        throw new ApiError(400, "gemini response error");
    }
    
    const complaint = await Complaint.create({
        username: complainer,
        message: complaintMessage,
        media: mediaUrls,
        createdAt: complaintTime,
        ...geminiResponse
    });
    
    return complaint;
}

export {processComplaint};

