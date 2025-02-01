// const router = require("express").Router();
// const { authenticateToken }  = require("./userAuth");
// const Book=require("../models/book");
// const Order=require("../models/order");
// const User=require("../models/user");
// router.post("/place-order",authenticateToken,async(req,res)=>{
//     try{
//         const {id}=req.headers;
//         const {order}=req.body;
//         for(const orderData of order){
//             const newOrder=new Order({user:id,book:orderData._id});
//             const orderDataFromDb=await newOrder.save();
//             //saving order in user cart
//             await User.findByIdAndUpdate(id,{
//                 $push:{orders:orderDataFromDb._id},
//             });
//             //clearing cart
//             await User.findByIdAndUpdate(id,{
//                 $pull:{orders:orderData._id},
//             });
//         }
//             return res.json({
//                 status:"Success",
//                 message:"Order Succesfully Placed",
//             });
//     }catch(error){
//         return res.status(500).json({message:"internal error"});
//     }
// });

// router.get("/get-order-history",authenticateToken,async(req,res)=>{
//     try{
//         const {id}=req.headers;
//        const UserData= await User.findById(id).populate({
//             path:"orders",
//             populate:{path:"book"},
//               });
//               const ordersData= userData.orders.reverse();
//         return res.json({
//             status:"success",
//             data:"ordersData"
//         });
//     }catch(error){
//         return res.status(500).json({message:"internal error"});
//     }
// });
// router.get("/get-all-orders",authenticateToken,async(req,res)=>{
//     try{
//         const userData=await Order.find()
//         .populate({
//             path:"book",
//         })
//         .populate({
//             path:"user",
//         })
//         .sort({createdAt:-1});
//         return res.json({
//             status:"success",
//             data:userData,
//         });
//     }catch(error){
//         return res.status(500).json({message:"internal error"});
//     }
// });

// router.put("/upadte-status/:id",authenticateToken,async(req,res)=>{
//     try{
//         const {id}=req.params;
//         await Order.findByIdAndUpdate(id,{status:req.body.status});
//         return res.json({
//             status:"Success",
//             message:"Status Updated Successfully",
//         });
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({message:"internal error"});
//     }
// });
// module.exports=router;
const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            // Saving order in user orders
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            // Clearing cart (Assumption: cart holds pending orders)
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }, // Fixed from 'orders' to 'cart'
            });
        }

        return res.json({
            status: "Success",
            message: "Order Successfully Placed",
        });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Internal error" });
    }
});

router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const ordersData = userData.orders.reverse(); // Fixed incorrect variable
        return res.json({
            status: "success",
            data: ordersData, // Fixed incorrect response format
        });
    } catch (error) {
        console.error("Error fetching order history:", error);
        return res.status(500).json({ message: "Internal error" });
    }
});

router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({ path: "book" })
            .populate({ path: "user" })
            .sort({ createdAt: -1 });

        return res.json({
            status: "success",
            data: orders,
        });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        return res.status(500).json({ message: "Internal error" });
    }
});

router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Internal error" });
    }
});

module.exports = router;
