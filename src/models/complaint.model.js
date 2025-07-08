import mongoose from "mongoose";
import { Schema } from "mongoose";

const complaintSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1,
  },

  city: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1,
  },

  street: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1,
  },

  type: {
    type: String,
    enum: ["Road", "Water", "Electricity", "Waste", "Other"],
    required: true,
    minlength: 1,
  },

  criticality: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },

  message: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1,
  },

  media: {
    type:[String],
    required: false,
    minlength: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Complaint = mongoose.model("Complaint", complaintSchema);
