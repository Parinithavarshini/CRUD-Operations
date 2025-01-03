import user from '../model/usermodel.js';          //importing user model
//create
export const create = async (req,res) => {  
    try{
        let userdata = new user(req.body);          //catch the data from body and store in userdata
        const {email}=userdata;                      //catch the email from userdata
        const userExist = await user.findOne({email});   //check the email is already exist or not
        if(userExist){
            return res.status(400).json({message:"Email already exist"});  //if email already exist then it will give error
        }
        const saveduser=await userdata.save();                      //if email is not exist then it will save the data
        res.status(200).json+({saveduser})
    }
    catch(error){
        res.status(500).json({error:"internal server error"});   
    }
}  


// //fetch
// export const fetch = async (req,res) => {
//     try{
//        const users=await user.find();        
//        if(users.length==0){
//               return res.status(404).json({message:"No users found"});
//        }
//        res.status(200).json(users);          
//     }
//     catch(error){
//         res.status(500).json({error:"internal server error"});
//     }
// }  

//fetch by id
export const fetch = async(req,res)=>{
    try{
        const users = await user.find();
        const id=req.params.id;
        const users = await user.findOne({_id:id});
        if(users.length === 0){
            return res.status(404).json({message:"no user found"});
        }
        res.status(200).json({users});
        const updateUser=await user.findById(id,req.body,{new:true});
        res.status(200).json({updateUser});
    }
    catch(err){
        res.status(500).json({error:"internel server error"})
    }
}

//update
export const update = async (req,res) => {
    try{
        const id=req.params.id;
        const userExist=await user.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message:"User not found"});
        }
        const updatedUser=await user.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updatedUser);
    }
    catch(error){
        res.status(500).json({error:"internal server error"});
    }
}

//delete
export const deletes = async (req,res) => {
    try{
        const id=req.params.id;
        const userExist=await user.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message:"User not found"});
        }
        const deleteUser=await user.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    }
    catch(error){
        res.status(500).json({error:"internal server error"});
    }
}
