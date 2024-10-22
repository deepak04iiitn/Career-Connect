import Referral from "../models/referral.model.js";
import { errorHandler } from "../utils/error.js";

export const createReferral = async(req, res, next) => {
    const { fullName, company, positions, contact } = req.body;

    if (!fullName || !company || !contact ||
        fullName === '' || company === '' || contact === '') {
        return next(errorHandler(400, 'Name, company, and contact are required!'));
    }

    if (!positions || positions.length === 0 || !positions.some(p => p.position)) {
        return next(errorHandler(400, 'At least one position is required!'));
    }

    // Filter out empty positions
    const validPositions = positions.filter(p => p.position.trim() !== '');

    const newReferral = new Referral({
        fullName,
        company,
        positions: validPositions,
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
        const referrals = await Referral.find()
            .sort({ createdAt: -1 });
        res.status(200).json(referrals);
    } catch (error) {
        next(error);
    }
}