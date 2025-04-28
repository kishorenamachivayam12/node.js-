const image=require('../models/image');
const {uploadimage}=require('../helpers/helpcloud');
const cloudinary=require('../config/cloudniary')



const upload=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:'No file uploaded'});
        }
        const {url,public_id}=await uploadimage(req.file.path);
        const newImage=new image({
            url,
            publicid:public_id,
            uploadedAt:req.user.userId
        });
        await newImage.save();
        res.status(200).json({
            success:true,
            message:'Image uploaded successfully',
            image:newImage
        });
    }
    catch(err){
        console.log(err);
        throw new Error('Error uploading image to Cloudinary');
    }
}
const fetchall=async(req,res)=>{    
    try{
        const images=await image.find({});
        if (images){
            return res.status(200).json({
                success:true,
                message:'Images fetched successfully',
                images
            });
        }

    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching images from Cloudinary');
    }
}
const deleteimage=async(req,res)=>{
    try{
        const getid=req.params.id;
        const imageToDelete=await image.findById(getid);
        if(!imageToDelete){
            return res.status(404).json({message:'Image not found'});
        }
        if(imageToDelete.uploadedAt.toString()!==req.user.userId.toString()){
            return res.status(403).json({message:'You are not authorized to delete this image'});
        }
        await cloudinary.uploader.destroy(imageToDelete.publicid);
        await image.findByIdAndDelete(getid);
        res.status(200).json({
            success:true,
            message:'Image deleted successfully',
        });


    }
    catch(err){
        console.log(err);
        throw new Error('Error deleting image from Cloudinary');
    }
}
module.exports={
    upload,fetchall,deleteimage
}