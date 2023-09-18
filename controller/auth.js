import User from "../models/User.js";
import Org from '../models/Org.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//Login User

export const loginUser = async (req,res)=>{
    try {
        const{ phone , pin } =req.body;
        const user = await User.findOne({ phone : phone });
        if(!user)
        return res.status(400).json({ msg : "User does not exist. "})
        
        const isMatch = await bcrypt.compare(pin, user.pin);
        if(!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. "});
        
        const token  = jwt.sign( { id: user._id},process.env.JWT_SECRET );
        delete user.pin;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const registerUser = async (req,res)=>{
    try {
        const{
            firstname,
            lastname,
            phone,
            email,
            pin,
        }=req.body;

        const check = await Org.findOne({phone:phone});
        if(check)
        res.status(400).json({msg:"User already exists "});

        const salt = await bcrypt.genSalt();
        const pinHash = await bcrypt.hash(pin,salt);

        const newUser= new User({
            firstname:firstname,
            lastname:lastname,
            phone:phone,
            email:email,
            pin:pinHash,
            certificates
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//organisation register

export const registerOrg= async (req,res)=>{
    try {
        const{
            name,
            email,
            password
        }=req.body;

        const check = await Org.findOne({email:email,name:name});
        if(check)
        res.status(400).json({msg:"Organization already exists "});

        const salt = await  bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newOrg= new Org({
            name,
            email,
            password:passwordHash,
            issues
        });
        const savedOrg = await newOrg.save();
        res.status(201).json(savedOrg);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//organisation login

export const loginOrg= async (req,res)=>{
    try {
        const{ email , password } =req.body;
        const org = await Org.findOne({ email : email });
        if(!org)
        return res.status(400).json({ msg : "Organisation does not exist. "})
        
        const isMatch = await bcrypt.compare(password, org.password);
        if(!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. "});
        
        const token  = jwt.sign( { id: org._id},process.env.JWT_SECRET );
        delete org.password;
        res.status(200).json({ token, org });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}
