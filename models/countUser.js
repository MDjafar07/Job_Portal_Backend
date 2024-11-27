// import mongoose from "mongoose";

// const statsSchema = new mongoose.Schema({
//     registrationCount: {
//         type: Number,
//         default: 0
//     }
// });

// const Stats = mongoose.model("Stats", statsSchema);

// export default Stats;


import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
});

const Counter = mongoose.model('Counter', counterSchema);

export default Counter;