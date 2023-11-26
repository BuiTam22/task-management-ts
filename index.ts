import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"; 
import * as database from "./config/database"; 
import mainV1Route from "./api/v1/routes/index.route";
import bodyParser = require("body-parser");

dotenv.config();
database.connect();

const app: Express = express();
const port:number|string = process.env.PORT || 3000;

// phải để trước mainV1Route mới kích hoạt dọc body cho các route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mainV1Route(app);

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});

