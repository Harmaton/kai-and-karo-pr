export interface Chatbot {
    id: string;
    clerk_user_id: string;
    name: string;
    created_at: string;
    chatbot_characteristics: ChatbotCharacteristic[];
    chat_sessions: ChatSession[];
  }
  
  export interface ChatbotCharacteristic {
    id: string;
    chatbot_id: string;
    content: string;
    created_at: string;
  }
  
  export interface Guest {
    id: string;
    name: string;
    email: string;
    clerkid: string;
    created_at: string;
  }
  
  export interface ChatSession {
    id: string;
    chatbot_id: string;
    guest_id: string | null;
    created_at: string;
    messages: Message[];
    guests: Guest;
  }
  
  export interface Message {
    id: string;
    chat_session_id: string;
    content: string;
    created_at: string;
    sender: 'ai' | 'user';
  }
  
  export interface GetChatbotByIdResponse {
    chatbots: Chatbot;
  }
  
  export interface ChatbotWithSessions extends Chatbot {
    chatbot_characteristics: ChatbotCharacteristic[];
    chat_sessions: ChatSession[];
  }

  export interface GetUserChatbotsVariables {
    userId: string;
  }
  
  export interface GetChatSessionMessagesResponse {
    chat_sessions: {
      id: string;
      created_at: string;
      messages: Message[];
      chatbots: {
        name: string;
      };
      guests: {
        name: string;
        email: string;
      };
    };
  }
  
  export interface GetChatSessionMessagesVariables {
    id: string;
  }
  
  export interface MessagesByChatSessionIdResponse {
    chat_sessions: ChatSession;
  }
  