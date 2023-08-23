import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

//GET ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy : req.user.userId});
  res.status(StatusCodes.OK).json({ jobs });
};

//CREATE A JOB
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//GET A JOB BY ID
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

//EDIT JOB BY ID
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "JOB MODIFIED", job: updatedJob });
};

//DELETE A JOB BY ID
export const deleteJob = async (req, res) => {
  const deleteJob = Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "JOB DELETED", job: deleteJob });
};
