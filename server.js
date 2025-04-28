require('dotenv').config();
const express = require('express');
const app = express();
const connecttodb = require('./database/db');
const authroutes=require('./routes/auth-route');
const homeauth=require('./routes/home');
const adminauth=require('./routes/auth-role');
const authMiddleware = require('./middleware/middle');
const uploadimage=require('./routes/image');
connecttodb();
app.use(express.json());
app.use('/api/auth',authroutes);
app.use('/api/home',homeauth);
app.use('/api/admin',adminauth);
app.use('/api/image',uploadimage);





app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});