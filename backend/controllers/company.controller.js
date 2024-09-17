import {Company} from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";



export const saveCompany=async(req,res)=>{
console.log(req.id)
        try {
            const{companyName}=req.body;

            if(!companyName){
                return res.status(400).json({
                    message:"company name is missing",
                    success:false
                })
            }

            let company = await Company.findOne({name:companyName});

            if(company){
                return res.status(200).json({
                    message:`company ${companyName} already exists`,
                    success:false,
                    exists:true,
                })
            }

            company = await Company.create({
                name:companyName,
                userId:req.id
            })


            return res.status(201).json({
                message:"company created successfully",
                company,
                success:true
            })

        } catch (error) {
            console.log(`itns an error : ${error}`)
        }


}

export const getCompany = async (req, res) => {
    console.log("I'm called - getCompany");

    try {
        const userId = req.id;
        const companies = await Company.find({  userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Companies retrieved successfully",
            companies,
            success: true
        });

    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({
            message: "An error occurred while retrieving companies",
            error: error.message,
            success: false
        });
    }
};


export const getCompanyById=async(req,res)=>{

        try {
            const id=req.params.id
            console.log("this is id ")
                const company = await Company.findById(id);
                if(!company || company.length===0){
                    return res.status(404).json({
                        message:"comany not found",
                        success:false
                    });
                }

            return res.status(200).json({
                message:"comany by id is",
                company,
                success:true
            })
        } catch (error) {
            console.log(error)
        }
}

// export const updateCompanyById= async (req,res)=>{
//     console.log("im companu called")
//     try {
//         const { name, description, website, location } = req.body;
 
//         const file = req.file;
//         // idhar cloudinary ayega
     
//         console.log("im undefinded",req.params.id)
    


//         var logo = null;
//         console.log(req.file);

//         if (file) {
//               const fileUri = getDataUri(file);
//               const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//                logo = cloudResponse.secure_url;
//         }



//         const updateData = { name, description, website, location, logo };

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             })
//         }
//         console.log(company)
//         return res.status(200).json({
            
//             message:"Company information updated.",
//             success:true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }


export const updateCompanyById = async (req, res) => {
    console.log("Update company called");
  
    try {
      // Extracting fields from req.body
      const { name, description, website, location } = req.body;
      const file = req.file;
  
      console.log("Request Body:", req.body); // Check if body data is logged
      console.log("Request File:", req.file); // Check if file data is logged
  
      let logo = null;

      const oneCompany = Company.findById(req.params.id);

      logo=oneCompany.logo;

  
      if (file) {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        logo = cloudResponse.secure_url;
      }
  
      // Prepare update data
      const updateData = { name, description, website, location, logo };
  
      // Update company in database
      
      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
      if (!company) {
        return res.status(404).json({
          message: "Company not found.",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Company information updated.",
        success: true,
        company,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error occurred.",
        success: false,
      });
    }
  };
  