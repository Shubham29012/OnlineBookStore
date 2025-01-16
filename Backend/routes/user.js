const router = require("express").Router();
const User = require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const { authenticateToken }  =require("./userAuth");
// SIGN UP
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Validate input fields
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check username length
    if (username.length < 5) {
      return res.status(400).json({ message: "Username length should be greater than 4" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check password length
    if (password.length <= 5) {
      return res.status(400).json({ message: "Password length should be greater than 5" });
    }
    const hashPass=await bcrypt.hash(password,10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password:hashPass, // Storing plain text password (NOT SECURE)
      address,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(200).json({ message: "Signup Successfully" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/sign-in", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if username and password are provided
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
  
      // Find the user by username
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const authClaims=[
            {name:existingUser.username},
            {role:existingUser.role},
        ];
        const token=jwt.sign({authClaims},"booksonline1234",{
            expiresIn:"30d",
        });
        return res.status(200).json({ id:existingUser._id, 
            role:existingUser.role,
            token:token,
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  //get user info
  
  router.get("/get-user-information",authenticateToken,async (req,res)=>{
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select('-password');
        return res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
  }); 
  router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated successfully"});
    }catch(error){
        res.status(500).json({message:"internal server error"})

    }
  })
module.exports = router;
