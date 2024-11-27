import userModel from "../models/userModel.js";


export const updateUserController = async (req, res, next) => {
    const { email, name, location, lastName } = req.body;
    if (!email || !name || !location || !lastName) {
        next('Please Required all Field');
    }
    //updates
    const user = await userModel.findOne({ _id: req.user.userId });
    user.name = name;
    user.email = email;
    user.location = location;
    user.lastName = lastName;
    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        sucess: true,
        message: 'Upadete Succecfully',
        user,
        token
    });



};

