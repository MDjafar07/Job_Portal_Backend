import userModel from "../models/userModel.js";
import countUser from "../models/countUser.js";



// export const registerController = async (req, res, next) => {
//     try {
//         const { name, email, password } = req.body;

//         // Validate each field with a specific error message
//         if (!name) {
//             next('Name is Required');
//         }
//         if (!email) {
//             next('Email is Required');
//         }
//         if (!password) {
//             next('Password is Required');
//         }
//         const existingUser = await userModel.findOne({ email });

//         if (existingUser) {
//             return res.status(200).send({
//                 success: false,
//                 message: 'Email already registered, please log in'
//             });
//         }

//         const user = await userModel.create({ name, email, password });


//         res.status(201).send({
//             success: true,
//             message: 'User created successfully',
//             user,

//         });

//     } catch (error) {
//         next(error);
//     }
// };




export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate each field with a specific error message
        if (!name) {
            next('Name is Required');
        }
        if (!email) {
            next('Email is Required');
        }
        if (!password) {
            next('Password is Required');
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Email already registered, please log in'
            });
        }

        // Find or create the user count counter
        let userCount = await countUser.findOneAndUpdate(
            { name: 'userCount' },
            { $inc: { count: 1 } },  // Increment the count by 1
            { new: true, upsert: true }  // Return the updated document and create if not exists
        );


        // Create the new user with the incremented count
        const user = await userModel.create({ name, email, password, count: userCount.count });
        const token = user.createJWT();

        res.status(201).send({
            success: true,
            message: 'User created successfully',
            user,
            token
        });

    } catch (error) {
        next(error);
    }
};



export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            next("All field required..");
        }
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            next("Invalid user Name and Password");
        }
        //Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            next('Invalid user Name and Password');
        }
        // user.password = undefined;
        const token = user.createJWT();
        res.status(200).json({
            success: true,
            message: 'Succesfull Login',
            user,
            token

        });

    } catch (error) {

    }
}



