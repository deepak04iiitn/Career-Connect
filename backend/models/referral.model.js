import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
    trim: true,
  },
  jobid: {
    type: String,
    required: false,
    trim: true,
  }
});

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
    positions: [positionSchema],
    contact: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Referral = mongoose.model('Referral', referralSchema);

export default Referral;