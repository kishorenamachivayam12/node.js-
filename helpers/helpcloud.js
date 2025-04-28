const cloud=require('../config/cloudniary');
const uploadimage=async (filePath)=>{
    try{
        const result=await cloud.uploader.upload(filePath);

        return {
            url:result.secure_url,
            public_id:result.public_id
        };

    }
    catch(err){
        console.log(err);
        throw new Error('Error uploading image to Cloudinary');
    }
}

module.exports={
    uploadimage
}