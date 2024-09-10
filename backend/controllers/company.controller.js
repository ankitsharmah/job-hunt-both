import {Company} from "../models/company.model.js";



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
                return res.status(400).json({
                    message:`company ${companyName} already exists`,
                    success:false
                })
            }

            company = await Company.create({
                name:companyName,
                userId:req.id
            })


            return res.status(201).json({
                message:"comany created successfully",
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

export const updateCompanyById= async (req,res)=>{

            try {
                const id = req.params.id;
                console.log("this is id",id)
                const file = req.file;
                const {name,description,website,location,logo}=req.body;
                const updated= {name,description,website,location,logo};
                console.log("tis updated",updated)
                const company = await Company.findByIdAndUpdate(id,updated,{new:true});

                // respose = {
                //     _id: company._id,
                //     name: company.name,
                //     description: company.description,
                //     wesite: company.website,
                //     location: company.location,
                //     logo: company.logo
                // }
                // console.log("this is company",response);

                return res.status(200).json({
                    message:"updated company details",
                    company,
                    success:true
                })

            } catch (error) {
                
            }

}