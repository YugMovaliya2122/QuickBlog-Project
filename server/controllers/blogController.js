import mongoose from "mongoose";
import fs from 'fs'
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comments.js";
import main from "../configs/gemini.js";

//all function related to blog
export const addBlog = async(req, res) => {
    try {
        console.log("Step 1 ✅: Received request");

        const blogData = req.body.blog;
        console.log("Step 2 ✅: blogData =", blogData);

        const { title, subTitle, description, category, isPublished } = JSON.parse(blogData);
        console.log("Step 3 ✅: Parsed blogData");

        const imgFile = req.file;
        console.log("Step 4 ✅: imgFile =", imgFile);

        if (!title || !description || !category || !imgFile) {
            console.log("Step 5 ❌: Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required field" });
        }

        const fileBuffer = await fs.promises.readFile(imgFile.path);
        console.log("Step 6 ✅: Read file buffer");

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imgFile.originalname,
            folder: '/blogs'
        });
        console.log("Step 7 ✅: Uploaded to ImageKit");

        const optimizedImageurl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });
        console.log("Step 8 ✅: Created optimized image URL");

        const image = optimizedImageurl;

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        });
        console.log("Step 9 ✅: Blog saved to DB");

        res.json({
            success: true,
            message: "Blog added successfully"
        });

    } catch (e) {
        console.error("🔥 Step Error:", e);
        res.status(500).json({
            success: false,
            message: e.message || "Something went wrong"
        });
    }
};

// Its job is to:
// Receive files from frontend(like images, PDFs, videos)

// Parse and attach them to the req object(req.file or req.files)

// Temporarily store them in:

//     Memory(RAM)

// Or disk(like uploads / folder)

export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });
    } catch (e) {
        res.json({ success: false, message: e.message })
    }

}
export const getBlogByID = async(req, res) => {
    try {
        const { blogId } = req.params; //or req.parse?
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "blog not found" })
        }
        res.json({ success: true, blog })
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}
export const deleteBlogByID = async(req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        //delete comment associatedwith blog
        await Comment.deleteMany({ blog: id });
        res.json({ success: true, message: "blog deleted successfully" })

    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}
export const togglePublish = async(req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        //to finally save the change in databse
        return res.json({ success: true, message: "blog status updated" })

    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}

export const addComment = async(req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: 'Comment added for review' })

    } catch (e) {
        res.json({ success: false, message: e.message });
    }
}
export const getBlogComments = async(req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments })

    } catch (e) {
        res.json({ success: false, message: e.message });
    }
}
export const generateContent = async(req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + ' generate a blog content for this topic in simple text format')
        res.json({ success: true, content })
    } catch (e) {
        res.json({
            success: false,
            message: e.message

        })
    }
}