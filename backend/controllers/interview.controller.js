import InterviewExperience from "../models/interview.model.js";
import { errorHandler } from "../utils/error.js";

export const createExperience = async(req , res , next) => {

    const {fullName , company , position , experience , rating} = req.body;

    if(!fullName ||!company ||!position ||!experience ||!rating || fullName === '' || company === '' || position === '' || experience === '' || rating === '')
    {
        next(errorHandler(400 , 'All fields are required!'));
    }

    const newExperience = new InterviewExperience({
        fullName,
        company,
        position,
        experience,
        rating,
    });


    try {

        await newExperience.save();

        res.status(201).json(newExperience);

    } catch (error) {

        next(error);
        
    }

}


export const getExperiences = async(req, res, next) => {

    try {

        const experiences = await InterviewExperience.find().sort({ createdAt : -1});
        
        res.status(200).json(experiences);

    } catch (error) {
        next(error);
    }

}


export const likeExperience = async (req, res, next) => {

    try {

        const experience = await InterviewExperience.findById(req.params.expId);

        if(!experience) 
        {
            return next(errorHandler(404, 'Experience not found'));
        }

        const userId = req.user.id; 

        if(!experience.likes.includes(userId)) 
        {
            // User hasn't liked the experience before
            experience.likes.push(userId);
            experience.numberOfLikes += 1;

            // Remove from dislikes if present
            const dislikeIndex = experience.dislikes.indexOf(userId);

            if(dislikeIndex !== -1) 
            {
                experience.dislikes.splice(dislikeIndex, 1);
                experience.numberOfDislikes -= 1;
            }

            await experience.save();

            res.status(200).json({ message: 'Experience liked successfully', likes: experience.numberOfLikes, dislikes: experience.numberOfDislikes });

        } else {

            // User has already liked the experience
            res.status(400).json({ message: 'You have already liked this experience' });
        }

    } catch (error) {
        next(error);
    }
}


export const dislikeExperience = async (req, res, next) => {

    try {

        const experience = await InterviewExperience.findById(req.params.expId);

        if(!experience) 
        {
            return next(errorHandler(404, 'Experience not found'));
        }

        const userId = req.user.id; 

        if(!experience.dislikes.includes(userId)) 
        {
            // User hasn't disliked the experience before
            experience.dislikes.push(userId);
            experience.numberOfDislikes += 1;

            // Remove from likes if present
            const likeIndex = experience.likes.indexOf(userId);

            if(likeIndex !== -1) 
            {
                experience.likes.splice(likeIndex, 1);
                experience.numberOfLikes -= 1;
            }

            await experience.save();

            res.status(200).json({ message: 'Experience disliked successfully', likes: experience.numberOfLikes, dislikes: experience.numberOfDislikes });

        } else {

            // User has already disliked the experience
            res.status(400).json({ message: 'You have already disliked this experience' });

        }
        
    } catch (error) {
        next(error);
    }
}