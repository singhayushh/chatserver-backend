import dotenv from "dotenv";
dotenv.config({ path: '.env' });

// Import npm modules
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";


// Import custom modules
import connect from "./config/db.config";
import swaggerSpec from "./config/swagger.config";
import mainRouter from "./routes/index";
import { SocketClientDto } from "./dtos/user.dtos";
import { toggleActive } from "./services/user.service";

// Env variables for logging
const PROJECT_NAME: String = String(process.env.PROJECT_NAME);
const PORT: Number = Number(process.env.PORT);

// Config for express app
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route for logging server startup time
app.get("/", (_req: express.Request, res: express.Response) =>
    res.send(`${PROJECT_NAME} server started on ${new Date()}`)
);

// Swagger Documentation
app.get("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main Router
app.use("/", mainRouter);


const server = http.createServer(app); //Create server with express
const io = new Server(); //Initialize Socket

var clients: SocketClientDto[] = []; //connected clients

io.on("connection", (socket) => {
    console.log("New User Connected");
    socket.on("storeClientInfo", async (data) => {
        console.log(data.customId + " Connected");
        //store the new client
        var client: SocketClientDto = {
            userId: data.customId,
            socketId: socket.id,
        };
        clients.push(client);

        //update the active status
        try {
            const user = await toggleActive(client.userId, true);
            if (user) {
                console.log("Activated " + client.userId);
                //Notify others
                socket.broadcast.emit("update", "Updated");
                console.log("emmited");
            } else {
                console.log("Error in activation service");
            }
        } catch (err) {
            console.log("Error in activation service");
        }
    });


    socket.on("disconnect", async (data) => {
        for (var i = 0, len = clients.length; i < len; ++i) {
            var client = clients[i];

            if (client.socketId == socket.id) {
                //remove the client
                clients.splice(i, 1);
                console.log(client.userId + " Disconnected");

                try {
                    //update the active status
                    const user = await toggleActive(client.userId, false);
                    if (user) {
                        console.log("Dectivated " + client.userId);
                        //Notify others
                        socket.broadcast.emit("update", "Updated");
                        console.log("emmited");
                    } else {
                        console.log("Error in activation service");
                    }
                } catch (err) {
                    console.log("Error in activation service");
                }
                break;
            }
        }
    });
});

//Messages Socket
const chatSocket = io.of("/chatsocket");
chatSocket.on("connection", function (socket) {
    //On new message
    socket.on("newMessage", (data) => {
        //Notify the room
        socket.broadcast.emit("incommingMessage", "reload");
    });
});

// Start the express server in the defined port
server.listen(Number(process.env.PORT), () => {
    connect; // connect to the mongo instance
    console.log(`Listening on Port ${PORT}...`); // Log on server start up
});