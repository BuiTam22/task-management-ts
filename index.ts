import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"; 
import * as database from "./config/database"; 
import mainV1Route from "./api/v1/routes/index.route";

dotenv.config();
database.connect();

const app: Express = express();
const port:number|string = process.env.PORT || 3000;

mainV1Route(app);

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});

