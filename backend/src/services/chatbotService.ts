// Define the structure of our chatbot's response
interface ChatOption {
  label: string;      // The text on the button (e.g., "Marketplace")
  value: string;      // What happens when clicked (a link or a message to send back)
  type: 'link' | 'message'; // The type of action
}

interface ChatResponse {
  text: string;
  options?: ChatOption[];
}

// This is our main menu of options
const mainMenu: ChatOption[] = [
  { label: "Marketplace", value: "/marketplace", type: 'link' },
  { label: "Crop Suggestion", value: "/crop-suggestion", type: 'link' },
  { label: "MSP Rates", value: "What are the msp rates?", type: 'message' },
  { label: "Latest News", value: "/news", type: 'link' },
];

// This is the new "brain" of the chatbot
export const getChatbotResponse = async (prompt: string): Promise<ChatResponse> => {
  // Simulate an async operation
  await new Promise(resolve => setTimeout(resolve, 500));

  const lowerCasePrompt = prompt.toLowerCase();

  // If the user says hello, hi, or menu, show the main menu
  if (lowerCasePrompt.includes("hello") || lowerCasePrompt.includes("hi") || lowerCasePrompt.includes("menu")) {
    return {
      text: "Hello! I am Krishi Mitra's assistant. Please choose an option below or type your question.",
      options: mainMenu,
    };
  }

  // Handle other specific questions
  if (lowerCasePrompt.includes("msp") || lowerCasePrompt.includes("minimum support price")) {
    return {
      text: "You can find the latest MSP rates on our 'MSP' page. Would you like me to take you there or ask something else?",
      options: [
        { label: "Go to MSP Page", value: "/msp", type: 'link' },
        { label: "Main Menu", value: "menu", type: 'message' },
      ],
    };
  }

  if (lowerCasePrompt.includes("buy") || lowerCasePrompt.includes("sell") || lowerCasePrompt.includes("marketplace")) {
    return {
      text: "Our 'Marketplace' is the perfect place to buy or sell agricultural products. I can take you there now.",
      options: [
        { label: "Go to Marketplace", value: "/marketplace", type: 'link' },
      ],
    };
  }
  
  // Default response if it doesn't understand
  return {
    text: "I'm sorry, I don't understand that yet. Maybe one of these options can help?",
    options: mainMenu,
  };
};