const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken }  = require("./userAuth");
router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message:"Book is already added in favourites"});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"Book added to favourites"});
    }catch(error){
        return res.status(500).json({message:"internal error"});
    }
});
router.delete("/remove-book-to-favourite",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        
        return res.status(200).json({message:"Book remove from favourites"});
    }catch(error){
        return res.status(500).json({message:"internal error"});
    }
});
router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate("favourites");
        const favouriteBooks=userData.favourites;
        return res.json({
            status:"success",
            data:favouriteBooks,
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"internal error"});
    }
});

module.exports=router;