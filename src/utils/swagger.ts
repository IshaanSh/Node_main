import { version } from "../../package.json";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Request,Response} from "express";
import { AnyARecord } from "dns";
// import allroutes from "../routes/allroutes";

const options:swaggerJsdoc.Options= {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Rest API Docs",
            version
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"
                }
            }
        },
        security:[
            {
                bearerAuth:[],

            }
        ]
    },
    apis:["./scr/routes/allroutes"]
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app:any,port:any){
    console.log("hyy")
    app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("docs.json",(req:AnyARecord,res:any)=>{
        res.setHeader("Content-Type","application/json");
        res.send(swaggerSpec);
        console.log(`Docs available at http://localhost${port}/docs`)
    })
}

export default swaggerDocs;
