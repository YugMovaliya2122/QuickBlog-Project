import express from 'express';
import { addBlog, getAllBlogs, deleteBlogByID, getBlogByID, togglePublish, addComment, getBlogComments, generateContent } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import { auth } from '../middleware/auth.js';
const blogRouter = express.Router();
blogRouter.post('/add', upload.single('image'), addBlog);
blogRouter.get('/all', getAllBlogs); //to get blog in home page
blogRouter.get('/:blogId', getBlogByID); //to get blog by ID
blogRouter.post('/delete', auth, deleteBlogByID);
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate', auth, generateContent);

//upload  add image in req.file
export default blogRouter;