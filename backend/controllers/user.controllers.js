import { User } from "../models/user.model.js";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    console.log("hiii called");
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log("in thte reqqq");
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        console.log("Checking if user already exists...");
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        console.log("Creating user in the database...");
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });
        console.log("User created successfully");

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
                return res.status(404).json({
                    message:"incorrect emailor password",
                    success:false
                })
            }

            const isPasswordMatch = await bcrypt.compare(password,user.password);

            if(!isPasswordMatch) {
                return res.status(404).json({
                    message:"incorrect password",
                    success:false
                })
            }
            console.log(role,user.role)
            if(role!==user.role){
                console.log("sending")
                return res.status(404).json({
                    message:"Account does not exists with current role",
                    success:false
                })
            };
            const tokenData={
                userId:user._id
            }
                user = {
                    _id:user._id,
                    fullname:user.fullname,
                    phoneNumber:user.phoneNumber,
                    role:user.role,
                    profile:user.profile
                }
            const token =await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
            return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
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
            return res.status(200).cookie("token","",{maxAge:0}).json({
                message:"successfully logedout",
                success:true
            })
        } catch (error) {
            console.log(error)
        }
    }

    export const updateProfile = async (req, res) => {
        console.log("im called")
        try {
            const { fullname, email, phoneNumber, bio, skills } = req.body;
            
            const file = req.file;
            // cloudinary ayega idhar
            // const fileUri = getDataUri(file);
            // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
    
    
            let skillsArray;
            if(skills){
                skillsArray = skills.split(",");
            }
            const userId = req.body.id; // middleware authentication
            console.log(userId)
            let user = await User.findById(userId);
    
            if (!user) {
                return res.status(400).json({
                    message: "User not found.",
                    success: false
                })
            }
            // updating data
            if(fullname) user.fullname = fullname
            if(email) user.email = email
            if(phoneNumber)  user.phoneNumber = phoneNumber
            if(bio) user.profile.bio = bio
            if(skills) user.profile.skills = skillsArray
          
            // resume comes later here...
            // if(cloudResponse){
            //     user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            //     user.profile.resumeOriginalName = file.originalname // Save the original file name
            // }
    
    
            await user.save();
    
            user = {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
    
            return res.status(200).json({
                message:"Profile updated successfully.",
                user,
                success:true
            })
        } catch (error) {
            console.log(error);
        }
    }
