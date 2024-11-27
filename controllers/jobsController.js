import mongoose from 'mongoose';
import jobsModel from '../models/jobsModel.js';
import userModel from '../models/userModel.js';
import moment from 'moment';
import { query } from 'express';

//===================Create Jobs===========================

export const creatJobController = async (req, res, next) => {
    try {
        const { company, position } = req.body;

        if (!company || !position) {
            next("All feilds Requaire...");
        }
        req.body.createdBy = req.user.userId;
        const jobs = await jobsModel.create(req.body);


        res.status(200).json({
            success: true,
            message: 'Job Create Succesfull',
            jobs

        });
    } catch (error) {

        return res.status(400).json({
            sucess: false,
            message: error.message

        });
    }
};

//======================Get All Jobs=============================

export const getAllJobsController = async (req, res, next) => {
    try {
        const { status, workType, search, sort } = req.query;
        const queryObject = {
            createdBy: req.user.userId,
        };
        //=====Filter by status=====
        if (status && status !== "all") {
            queryObject.status = status;

        };
        //=====Filter by workType======
        if (workType && workType !== "all") {
            queryObject.workType = workType;
        };
        //=====Filter by search ========
        if (search) {
            queryObject.position = { $regex: search, $options: "i" };
        }
        let queryResult = jobsModel.find(queryObject);

        //====sort======
        if (sort === "latest") {
            queryResult = queryResult.sort("-createdAt");
        };
        if (sort === "odlest") {
            queryResult = queryResult.sort("createdAt");
        };
        if (sort === 'a-z') {
            queryResult = queryResult.sort("position");
        };
        if (sort === 'z-a') {
            queryResult = queryResult.sort("-position");
        };
        const jobs = await queryResult;
        // const jobs = await jobsModel.find({ createdBy: req.user.userId });
        res.status(200).json({
            success: true,
            totalCount: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//=================Update Jobs=====================

export const updateJobsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { company, position } = req.body;
        // Validations
        if (!company || !position) {
            next('All feilds Requaire...');
        }
        const job = await jobsModel.findOne({ _id: id });
        //validation
        if (!job) {
            next('Jobs is not available for this id...');
        }
        if (!req.user.userId === job.createdBy.toString()) {
            next('Not Authorized dont update Jobs..');
            return;
        }
        const updateJobs = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ updateJobs });



    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//=================Delete Jobs=====================

export const deleteJobsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobsModel.findOne({ _id: id });
        if (!job) {
            next('Jobs is not available for this id...');
        }
        if (!req.user.userId === job.createdBy.toString()) {
            next('Not Authorized dont Delete Jobs..');
            return;
        }
        await job.deleteOne();
        res.status(200).json({
            success: true,
            message: "Deleted Succesfull"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//====================Jobs Stats======================
export const jobsStatsController = async (req, res) => {
    try {
        const stats = await jobsModel.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId)
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        //======defult status vlaues=====
        // const defultstats = {
        //     interview: stats.interview || 0,
        //     pending: stats.pending || 0,
        //     reject: stats.reject || 0
        // };

        //agregation monthly,yearly besis
        let monthlyApplication = await jobsModel.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId)
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                    count: { $sum: 1 }

                },
            }

        ]);
        monthlyApplication = monthlyApplication.map(item => {
            const { _id: { month, year }, count } = item;  //get data
            const date = moment().month(month - 1).year(year).format("MMM yyyy");
            return { date, count };
        });          //.reverse()

        res.status(200).json({
            success: true,
            jobsCount: stats.length,
            stats,
            monthlyApplication
            // defultstats
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};