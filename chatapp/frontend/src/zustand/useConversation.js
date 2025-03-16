import { create } from "zustand";
// useConversation hook is used to handle and manipulate conversation related style in components
const useConversation = create((set) => ({
	// This piece of state holds the currently selected conversation. It is initialized as null, indicating that no conversation is selected by default.
	selectedConversation: null,
	
	//setselected conversation allows you to update the selected conversation 
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
