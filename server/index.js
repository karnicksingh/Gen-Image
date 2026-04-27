require("dotenv").config({path: __dirname + "/.env"});
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db.js")

const app = express();
  app.set("trust proxy",1);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173",
        "https://gen-image-tac6.onrender.com"
    ],
    credentials:true
}));


const routes = require("./routes/routes.js");
app.use(routes);


connectDB();

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
      