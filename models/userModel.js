import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Require']
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is Require'],
        unique: true,
        vaidate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is Require']
    },
    count: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        default: "India"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    }
}, { timestamps: true });


//middleware

userSchema.pre('save', async function (next) {
    if (!this.isNew) { return next(); }   //!this.ismodified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

//Compare Password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
};

//JWT token
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
export default mongoose.model('User', userSchema);