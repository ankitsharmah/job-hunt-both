import {Job} from "../models/job.model.js"


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        // if(experience === 0){
        //     experience = 0;
        // }
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }
        // console.log(companyId," ",userId)

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            createdjob:job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while creating the job.",
            success: false
        });
    }
};
export const getJobByCompanyId=async (req,res)=>{
    try {
        const companyId = req.params.companyId;

        const jobs = await Job.find({company: companyId}).populate({
            path: "company"
        }).sort({ createdAt: -1 });;

        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        }

        return res.status(200).json({
            message: "jobs found",
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        }).populate({
            path:"company"
        }).populate({
            path:"created_by"
        });
     
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
export const getJobByCompanyName=async (req,res)=>{
    try {

        const id = req.params.companyname;
        const jobs = await Job.find({company:id})   
        
        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        }

        return res.status(200).json({
            message:"Job ",
            jobs,
            success:false
        });
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"some error occured",
            success:false
        });
    }
}
export const getJobPostedByAdmin=async (req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        }).sort({ createdAt: -1 }).populate({
            path:"created_by"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateJob= async(req,res)=>{

    try {

        const jobId= req.params.id;

        const {title,requirements,description,location,salary,jobType,experience,position}= req.body;

        const updated =await Job.findByIdAndUpdate(jobId, req.body,{ new: true });

        if(!updated){
            res.status(404).json({
                message: "Job not found",
                success:false
            })
        }

        res.status(200).json({
            message: "Job updated successfully",
            updatedJob:updated,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }

}
// export const deleteJob = (req,res)=>{

// }