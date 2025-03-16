import { Server } from "socket.io";  //creates new socketio server
import http from "http";   //create http server 
import express from "express";

const app = express();

const server = http.createServer(app);
// passing server object ,this helps in bidirectional communication between client and server.
// cors->cross origin resource sharing 
// cors allow to accept request from server origin and methods GET and POST 
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

//this fn takes the receiver id from the server and gives a socketid from userSocketMap object.
//this is used to find the socketid based on userdid.
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

//map the connection between socket id and userid 
const userSocketMap = {}; // {userId: socketId}

//This event listener listens for a new connection to the Socket.IO server. When a client connects, it triggers the callback function, which receives the socket object representing the connection.
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	// his extracts the userId from the query parameters of the socket handshake, which is sent when the client establishes the connection.
	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() emits an event to all connected user .event carries the current list of all online user (key of usersocketmap)
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server  side .
	// this listen the disconected event 
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		// this remove the disconnected user id from 'user socket map'
		delete userSocketMap[userId];
		// after disconnection it reemit the event getonlineuser 
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server }; 