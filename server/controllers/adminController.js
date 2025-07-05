 import jwt from 'jsonwebtoken';
 import Blog from '../models/Blog.js';
 import Comment from '../models/Comments.js';

 export const adminLogin = async(req, res) => {
     try {
         const { email, password } = req.body;
         if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
             return res.json({ success: false, message: "Invalid Credentials" })
         }
         const token = jwt.sign({ email }, process.env.JWT_SECRET);
         //rew.authorisation conain token
         res.json({ success: true, token })
             //by token we are giving ID card to admin
             //whenever admin want to excss page he has to give token for authntication

     } catch (e) {
         res.json({ success: false, message: e.message })
     }
 }


 //A JWT (JSON Web Token) is a secure way to share information (like login status) between a client (frontend) and a server (backend).

 // It proves:

 //     ✅“This user is who they say they are”

 // ✅“ They’ re allowed to access this route / data”
 export const getAllBlogsAdmin = async(req, res) => {
     try {

         const blogs = await Blog.find({}).sort({ createdAt: -1 });
         res.json({
                 success: true,
                 blogs
             }

         )

     } catch (e) {
         res.json({ success: false, message: e.message })

     }
 }
 export const getAllComments = async(req, res) => {



     try {

         const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 })
             //   .populate("blog") tells Mongoose:

         //  “ Go to the Blog collection, and
         //  for each comment, fetch the full blog document where _id matches the value in blog field— and attach that blog data to the comment.”
         res.json({
                 success: true,
                 comments
             }

         )



     } catch (e) {
         res.json({ success: false, message: e.message })

     }
 }

 export const getDashboard = async(req, res) => {
     try {
         const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
         const blogs = await Blog.countDocuments();
         const comments = await Comment.countDocuments();
         const drafts = await Blog.countDocuments({ isPublished: false });
         const dashboardData = {
             blogs,
             comments,
             drafts,
             recentBlogs
         }
         res.json({
                 success: true,
                 dashboardData
             }

         )

     } catch (e) {
         res.json({ success: false, message: e.message });

     }
 }
 export const deleteCommentByID = async(req, res) => {
     try {
         const { id } = req.body;
         await Comment.findByIdAndDelete(id);
         res.json({
             success: true,
             message: "comment deleted successfully"
         })
     } catch (e) {
         res.json({ success: false, message: e.message });
     }
 }
 export const approveCommentByID = async(req, res) => {
     try {
         const { id } = req.body;
         await Comment.findByIdAndUpdate(id, { isApproved: true });

         res.json({
             success: true,
             message: "Comment approved successfully"
         })
     } catch (e) {
         res.json({ success: false, message: e.message });
     }
 }