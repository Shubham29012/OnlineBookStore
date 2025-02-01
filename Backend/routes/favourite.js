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
// router.delete("/remove-book-to-favourite",authenticateToken,async(req,res)=>{
//     try{
//         const {bookid,id}=req.headers;
//         const userData=await User.findById(id);
//         const isBookFavourite=userData.favourites.includes(bookid);
//         if(isBookFavourite){
//             await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
//         }
        
//         return res.status(200).json({message:"Book remove from favourites"});
//     }catch(error){
//         return res.status(500).json({message:"internal error"});
//     }
// });
router.delete("/remove-book-to-favourite", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.body; // Extract bookid from the request body
      const id = req.headers.id; // Extract user ID from the headers
  
      // Check if both bookid and id are provided
      if (!bookid || !id) {
        return res.status(400).json({ message: "Missing required fields: bookid or id" });
      }
  
      // Find the user by ID
      const userData = await User.findById(id);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the book exists in the user's favourites
      const isBookFavourite = userData.favourites.includes(bookid);
      if (!isBookFavourite) {
        return res.status(404).json({ message: "Book not found in favourites" });
      }
  
      // Remove the book from the favourites list
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
  
      return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
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