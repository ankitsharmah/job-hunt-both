import { User } from "../models/user.model.js";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        
        const file = req.file;
        var sec_url = ""; // Declare sec_url properly
        if(file){
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            sec_url = cloudResponse.secure_url; // Assign cloudinary secure URL to sec_url
        }

        const user = await User.findOne({ email });
        // console.log(user);
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
                reason: "exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: sec_url, // Use sec_url instead of secure_url
            }
        });
        return res.status(201).json({
            message: "Registered successfully",
            success: true
        });

    } catch (error) {
        console.error("An error occurred during registration:", error);
        return res.status(500).json({
            message: "An error occurred during registration",
            success: false,
            error: error.message
        });
    }
};


    export const login = async(req, res) =>{
        try {
            const {email,password,role}=req.body;

            if(!role || !email || !password){
                return res.status(404).json({
                    message:"some thing is missing",
                    success:false
                })
            };

            let user =await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"incorrect email or password",
                    success:false,
                    reason:"emailorpassword"

                })
            }

            const isPasswordMatch = await bcrypt.compare(password,user.password);

            if(!isPasswordMatch) {
                return res.status(400).json({
                    message:"incorrect password",
                    success:false,
                    reason:"incorrect"
                })
            }
            if(role!==user.role){
                return res.status(400).json({
                    message:"Account does not exists with current role",
                    success:false,
                    reason:"role"
                })
            };
            const tokenData={
                userId:user._id
            }
                user = {
                    _id:user._id,
                    fullname:user.fullname,
                    email:user.email,
                    phoneNumber:user.phoneNumber,
                    role:user.role,
                    profile:user.profile
                }
                const token =await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
                console.log(token)
            return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'none',secure:true}).json({
                message:`welcome back ${user.fullname}`,
                user,
                success:true
            })
        } catch (error) {
            console.log(error)
        }
    }
    export const logOut=(req,res) => {

        try {
            return res.status(200).cookie("token","deleted",{maxAge:0}).json({
                message:"successfully logedout",
                tokenn:"deleted",
                success:true
            })
        } catch (error) {
            console.log(error)
        }
    }

    // export const updateProfile = async (req, res) => {
    //     console.log("im called")
    //     try {
    //         const { fullname, email, phoneNumber, bio, skills } = req.body;
    //         console.log(fullname, email, phoneNumber, bio, skills )
    //         const file = req.file;
    //         // cloudinary ayega idhar
    //         // const fileUri = getDataUri(file);
    //         // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
    
    
    //         let skillsArray;
    //         if(skills){
    //             skillsArray = skills.split(",");
    //         }
    //         const userId = req.id; // middleware authentication
    //         console.log(userId)
    //         let user = await User.findById(userId);
    
    //         if (!user) {
    //             return res.status(400).json({
    //                 message: "User not found.",
    //                 success: false
    //             })
    //         }
    //         // updating data
    //         if(fullname) user.fullname = fullname
    //         if(email) user.email = email
    //         if(phoneNumber)  user.phoneNumber = phoneNumber
    //         if(bio) user.profile.bio = bio
    //         if(skills) user.profile.skills = skillsArray
          
    //         // resume comes later here...
    //         // if(cloudResponse){
    //         //     user.profile.resume = cloudResponse.secure_url // save the cloudinary url
    //         //     user.profile.resumeOriginalName = file.originalname // Save the original file name
    //         // }
    
    
    //         await user.save();
    
    //         user = {
    //             _id: user._id,
    //             fullname: user.fullname,
    //             email: user.email,
    //             phoneNumber: user.phoneNumber,
    //             role: user.role,
    //             profile: user.profile
    //         }
    
    //         return res.status(200).json({
    //             message:"Profile updated successfully.",
    //             user,
    //             success:true
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    export const updateProfile = async (req, res) => {
        try {
            const { fullname, email, phoneNumber, bio, skills } = req.body;
            
            const file = req.file;

            if (file) {
                  // Get the file data and log it
            const fileUri = getDataUri(file);
            var cloudResponse=null;
            ('File URI:', fileUri.content); // Check file content before upload
            
            // Upload the file to Cloudinary
            // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
             cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                // resource_type: "raw",
                type: "upload", // Ensure this is set to 'upload' for public access
                access_mode: "public", // Set access mode to public
              });
              
            }
    
          
    
            let skillsArray;
            if (skills) {
                skillsArray = skills.split(",");
            }

    
            const userId = req.id; // Middleware authentication
            let user = await User.findById(userId);
    
            if (!user) {
                return res.status(400).json({
                    message: "User not found.",
                    success: false
                });
            }
    
            // Update user data
            if (fullname) user.fullname = fullname;
            if (email) user.email = email;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (bio) user.profile.bio = bio;
            if (skills) user.profile.skills = skillsArray;
    
            // Save the resume (from Cloudinary) to the user's profile
            if (cloudResponse) {
                user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
                user.profile.resumeOriginalName = file.originalname; // Save the original file name
            }
    
            await user.save();
    
            // Prepare response object
            user = {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            };
    
            return res.status(200).json({
                message: "Profile updated successfully.",
                user,
                success: true
            });
        } catch (error) {
            console.log('Error:', error.message);
            return res.status(500).json({
                message: "Server error",
                error: error.message,
                success: false
            });
        }
        
    };
    