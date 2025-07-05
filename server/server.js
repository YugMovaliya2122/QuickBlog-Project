/**
 * @file server.js
 * @description Entry point for the server application.
 */

/**
 * @description Installs the required npm packages for the project:
 * - express: Web framework for Node.js
 * - mongoose: MongoDB object modeling tool
 * - cors: Middleware for enabling Cross-Origin Resource Sharing
 * - dotenv: Loads environment variables from a .env file
 * - jsonwebtoken: Library to work with JSON Web Tokens
 * - multer: Middleware for handling multipart/form-data (file uploads)
 */
// npm i express mongoose cors dotenv jsonwebtoken multer
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'
const app = express();
await connectDB();
// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());
app.use(express.json());
//Yes, Yug — basically, CORS allows two different domains to connect and share data safely, but with some rules. ✅
//It helps to connect backend and frontend securely
//home route
app.get('/', (req, res) => res.send("API is working"))
    //login route
app.use('/api/admin', adminRouter);
//add blog
app.use('/api/blog', blogRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server is running ' + PORT);
})
export default app;