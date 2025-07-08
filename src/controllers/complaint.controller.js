import { asyncHandler } from "../utils/asyncHandler.js";
import { processComplaint } from "../utils/processComplaint.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const registerComplaint = asyncHandler( async (req, res, next) => {

    const complainer = req.body.name.trim();
    const complaintMessage = req.body.message.trim();
    const media = req.files; // array of files

    if(!complainer || complainer === "") return res.status(400).json({error: "name is required and cannot be empty."});
    if(!complaintMessage || complaintMessage === "") return res.status(400).json({error: "message is required and cannot be empty."});
        
    const mediaUrls = [];
    
    if(media.length > 0){
        for(const file of media){
            const url = await uploadToCloudinary(file.path);
            mediaUrls.push(url);
        }
    }

    const response = await processComplaint(complainer, complaintMessage, mediaUrls, undefined);

    return res.status(200).json(response);
});


export { registerComplaint } ;