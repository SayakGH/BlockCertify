import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { loginUser, registerUser , loginOrg , registerOrg } from "./controller/auth.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { createCertificate } from "./certificate/certificate.js";
import helmet from "helmet";
import { viewCertificate } from "./controller/certificate.js";
import { verifyUserToken,verifyOrgToken } from "./middleware/auth.js";

//configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

//routes
app.post('/auth/user/login',loginUser);

app.post('/auth/user/register',registerUser);

app.post('/auth/org/login',loginOrg);

app.post('/auth/org/register',registerOrg);

app.get('/user/certificate',verifyUserToken,viewCertificate)

app.post('/org/certificate',verifyOrgToken, createCertificate)

//mongoose setup
const PORT = process.env.PORT||5001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

   
  })
  .catch((error) => console.log(`${error} did not connect`));