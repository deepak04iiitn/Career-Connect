import Referral from "../models/referral.model.js";
import { errorHandler } from "../utils/error.js";

export const createReferral = async(req, res, next) => {

    const { fullName, company, position, jobid, contact } = req.body;

    if (!fullName || !company || !position || !jobid || !contact ||
        fullName === '' || company === '' || position === '' || jobid === '' || contact === '' ) 
    {
        return next(errorHandler(400, 'All fields are required!'));
    }

    const newReferral = new Referral({
        fullName,
        company,
        position,
        jobid,
        contact,
    });

    try {
        await newReferral.save();
        res.status(201).json(newReferral);
    } catch (error) {
        next(error);
    }
}

export const getReferrals = async(req, res, next) => {

    try {

        const referrals = await Referral.find().sort({ createdAt: -1 });
        res.status(200).json(referrals);

    } catch (error) {
        next(error);
    }

}

