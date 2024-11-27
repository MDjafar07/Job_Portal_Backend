import userModel from "../models/userModel.js";

export const paginationsController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = req.query.limit || 5;
        // const cursor = req.query.cursor;
        const totalUsers = await userModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);
        const nextPage = page < totalPages ? page + 1 : null;

        const users = await userModel.find().skip((page - 1) * limit).limit(limit);
        // let query = {};

        // if (cursor) {
        //     query.count = { $gt: Number(cursor) };

        // }
        // const users = await userModel.find(query).sort({ count: 1 }).limit(Number(limit));

        return res.status(200).json({
            sucess: true,
            message: "User data",
            data: users,
            page,
            nextPage,
            totalPages,
            totalUsers,


        });


    } catch (error) {
        return res.status(400).json({
            sucess: false,
            message: error.message
        });
    }

};



