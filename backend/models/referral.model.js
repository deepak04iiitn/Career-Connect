import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  company: {
    type: String,
    required: true,
    trim: true,
  },

  position: {
    type: String,
    required: true,
    trim: true,
  },

  jobid: {
    type: String,
    required: true,
  },

  contact: {
    type: String,
    required: true,
  }

},
  { timestamps: true }
);

const Referral = mongoose.model('Referral', referralSchema);

export default Referral;