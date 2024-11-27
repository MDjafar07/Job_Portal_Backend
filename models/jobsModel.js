import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is Require...']

    },
    position: {
        type: String,
        required: [true, 'Positions is Require...']
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['internship', 'part-times', 'full-time', 'contract']
    },
    workLocation: {
        type: String,
        default: 'Kolkata',
        required: [true, 'Work Location is Required...']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"

    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;