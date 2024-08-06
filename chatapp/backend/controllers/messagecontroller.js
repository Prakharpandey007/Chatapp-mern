import Conversation from "../models/conversationmodel.js";
import Message from '../models/messagemodel.js'
export const sendMessage = async (req, res) => {
  try {

    const { message } = req.body;   //message from user as input 
    const { id: receiverId } = req.params;   //receivewr id 
    const senderId = req.user._id;    //
    // first find the conservation between user
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    // if theyy send message first time and no conversation in future then we create conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });
    // save the new message 
    await newMessage.save();
    //if new message successfull created then push its id in array 
    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }
    // save the conversation 
    await conversation.save();
    
res.status(201).json(newMessage);
  } catch (error) {
    console.log("error is sendmessage controller", errorMessage);
    res.status(500).json({ error: "internal server error" });
  }
};

//getting messages of user 
export const getMessages = async (req, res) => {
	try {
        // user u chat with 
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES
// populate give object of messages between sender and userTochatId
		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};