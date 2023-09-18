import {v4 as uuidv4}  from 'uuid';
import User from '../models/User.js';
import Org from '../models/Org.js';
import { spawn } from 'child_process';
import jwt from "jsonwebtoken";



export const createCertificate= async (req,res)=>{
    try {
        const {
            firstname,
            lastname,
            phone,
            token
        }=req.body;
    
        const user = await User.findOne({
            firstname:firstname,
            lastname:lastname,
            phone:phone
        })
        if(!user)
        return res.status(400).json({ msg : "User does not exist. "});

        const org = jwt.verify(token,process.env.JWT_SECRET);
    
        const organizaation= await Org.findOne({ _id : org.id });
        const issue="../assets/certificate_generated_from_python.png"
        
        // const Name = user.firstname +" "+user.lastname;
    
        // const python_process = spawn('python',['./certificate.py',Name]);
        // python_process.stdout.on('data',(data)=>{
        //     console.log(data.toString())
        // });
        user.certificates.push(issue); 

    // Save the updated document
        await user.save();

        res.status(200).json({msg: "certificate issued"})
        const userId = uuidv4();
    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}
