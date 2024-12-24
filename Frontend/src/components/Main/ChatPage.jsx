




// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import "./Main.css";
// import Navbar from "../Navbar/Navbar";
// import { assets } from "../../assets/assets";
// import ChatAPI from "../../config/ChatAPI";
// import ReactMarkdown from "react-markdown";
// import { motion } from "framer-motion";

// const botMessageVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1 } },
// };

// const ChatPage = ({ user, onLogout }) => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const chatRef = useRef(null);
//   const { sessionId } = useParams();
//   const userId = user?.$id;
//   const initializationRef = useRef(false);
//   const [loading, setLoading] = useState(false);
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const placeholderMessages = ["Thinking...", "Diagnosing...", "Just a sec..."];

//   const handleBotResponse = useCallback(
//     async (userInput, placeholderId) => {
//       try {
//         const data = await ChatAPI.addMessage(userId, sessionId, userInput);
//         if (!data.success) {
//           alert(data.error);
//           return;
//         }

//         const botMessage = {
//           sender: "bot",
//           message: data.response,
//           urls: data.urls,  // Add urls to the bot message
//         };

//         // Log URLs to the console
//         console.log("Bot URLs:", botMessage.urls);

//         // Replace the placeholder bot message with the real bot response
//         setMessages((prevMessages) =>
//           prevMessages.map((msg) =>
//             msg.id === placeholderId ? { ...msg, ...botMessage } : msg
//           )
//         );

//         setLoading(false);
//       } catch (error) {
//         console.error("Error in bot response:", error);
//       }
//     },
//     [userId, sessionId]
//   );

//   useEffect(() => {
//     const initializeChat = async () => {
//       if (initializationRef.current) return;
//       initializationRef.current = true;

//       if (state?.initialMessage && state?.fromMain) {
//         const initialMessage = {
//           sender: "user",
//           message: state.initialMessage,
//         };
//         setMessages([initialMessage]);
//         await handleBotResponse(state.initialMessage);

//         navigate(".", { replace: true, state: {} });
//       } else {
//         try {
//           const data = await ChatAPI.getHistory(userId, sessionId);
//           setMessages(data.conversation || []);
//         } catch (error) {
//           console.error("Error fetching conversation history:", error);
//         }
//       }
//     };

//     if (userId && sessionId) {
//       initializeChat();
//     }
//   }, [userId, sessionId, state, navigate, handleBotResponse]);

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Cycle through Placeholder Messages
//   useEffect(() => {
//     let interval;
//     if (loading) {
//       interval = setInterval(() => {
//         setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderMessages.length);
//       }, 1000);  // Rotate every second
//     }
//     return () => clearInterval(interval);
//   }, [loading]);

//   const handleSend = async () => {
//     if (input.trim() && !loading) {
//       const userMessage = { sender: "user", message: input };
//       const placeholderId = Date.now();  // Unique ID for placeholder message

//       // Add User Message and Placeholder Bot Message
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         userMessage,
//         { id: placeholderId, sender: "bot", message: placeholderMessages[0] },
//       ]);

//       setInput("");
//       setLoading(true);

//       // Simulate Bot Response (replace placeholder later)
//       await handleBotResponse(input.trim(), placeholderId);
//     }
//   };

//   return (
//     <div className="main">
//       <Navbar user={user} onLogout={onLogout} />
//       <div className="main-container">
//         <div className="chat-section" ref={chatRef}>
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message-row ${
//                 message.sender === "user" ? "user-row" : "bot-row"
//               }`}
//             >
//               {message.sender === "bot" && (
//                 <img
//                   src={assets.gemini_icon}
//                   alt="Bot Icon"
//                   className="message-icon"
//                 />
//               )}
//               <motion.div
//                 className={`message ${
//                   message.sender === "user" ? "user-message" : "bot-message"
//                 }`}
//                 variants={message.sender === "bot" ? botMessageVariants : {}}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {message.sender === "bot" ? (
//                   <>
//                     <ReactMarkdown className="bot-formatted-response">
//                       {loading && message.id
//                         ? placeholderMessages[placeholderIndex]
//                         : message.message}
//                     </ReactMarkdown>
//                     {/* Display URLs if available */}
//                     {message.urls && message.urls.length > 0 && (
//                       <div className="bot-urls">
//                         {message.urls.map((urlData, idx) => (
//                           <a
//                             key={idx}
//                             href={urlData.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="bot-url-link"
//                           >
//                             {urlData.name || `Link ${idx + 1}`}
//                           </a>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <p>{message.message}</p>
//                 )}
//               </motion.div>
//             </div>
//           ))}
//         </div>

//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Enter your message here"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSend()}
//               disabled={loading}
//             />
//             <div
//               onClick={handleSend}
//               style={{ pointerEvents: loading ? "none" : "auto" }}
//             >
//               <img src={assets.send_icon} alt="Send Icon" />
//             </div>
//           </div>
//           <p className="bottom-info">AI may provide inaccurate info</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;






// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import "./Main.css";
// import Navbar from "../Navbar/Navbar";
// import { assets } from "../../assets/assets";
// import ChatAPI from "../../config/ChatAPI";
// import ReactMarkdown from "react-markdown";
// import { motion } from "framer-motion"; // Import framer-motion

// const botMessageVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.5 } },
// };

// const ChatPage = ({ user, onLogout }) => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const chatRef = useRef(null);
//   const { sessionId } = useParams();
//   const userId = user?.$id;
//   const initializationRef = useRef(false);
//   const [loading, setLoading] = useState(false);
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const placeholderMessages = ["Thinking...", "Diagnosing...", "Just a sec..."];

//   const handleBotResponse = useCallback(
//     async (userInput, placeholderId) => {
//       setLoading(true);
//       try {
//         const data = await ChatAPI.addMessage(userId, sessionId, userInput);
//         if (!data.success) {
//           alert(data.error);
//           setLoading(false);
//           return;
//         }

//         const botMessage = {
//           sender: "bot",
//           message: data.response,
//           urls: data.urls || [], // Capture URLs from API response
//         };
//         console.log("Bot URLs:", botMessage.urls);
        
//         setMessages((prevMessages) =>
//           prevMessages.map((msg) =>
//             msg.id === placeholderId ? botMessage : msg
//           )
//         );
        
  
//         setLoading(false);

//       } catch (error) {
//         console.error("Error in bot response:", error);
//         setLoading(false);
//       }
//     },
//     [userId, sessionId]
//   );

//   useEffect(() => {
//     const initializeChat = async () => {
//       if (initializationRef.current) return;
//       initializationRef.current = true;

//       if (state?.initialMessage && state?.fromMain) {
//         const initialMessage = {
//           sender: "user",
//           message: state.initialMessage,
//         };
//         const placeholderId = Date.now();

//         setMessages([
//           initialMessage,
//           { id: placeholderId, sender: "bot", message: placeholderMessages[0] },
//         ]);
    
//         setLoading(true);
//         await handleBotResponse(state.initialMessage, placeholderId);

//         navigate(".", { replace: true, state: {} });
//       } else {
//         try {
//           const data = await ChatAPI.getHistory(userId, sessionId);
//           if (!data.success) {
//             alert("Session not found");
//             navigate("/");
//           }
//           setMessages(data.conversation || []);
//         } catch (error) {
//           console.error("Error fetching conversation history:", error);
//         }
//       }
//     };

//     if (userId && sessionId) {
//       initializeChat();
//     }
//   }, []);

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (input.trim()) {
//       const userMessage = { sender: "user", message: input };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setInput("");
//       await handleBotResponse(input.trim());
//     }
//   };

//   return (
//     <div className="main">
//       <Navbar user={user} onLogout={onLogout} />
//       <div className="main-container">
//         <div className="chat-section" ref={chatRef}>
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message-row ${message.sender === "user" ? "user-row" : "bot-row"}`}
//             >
//               {message.sender === "bot" && (
//                 <img
//                   src={assets.gemini_icon}
//                   alt="Bot Icon"
//                   className="message-icon"
//                 />
//               )}

//               <motion.div
//                 className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
//                 variants={message.sender === "bot" ? botMessageVariants : {}}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {message.sender === "bot" ? (
//                   <>
//                     <ReactMarkdown className="bot-formatted-response">
//                       {message.message}
//                     </ReactMarkdown>

//                     {/* Display URLs if available */}
//                     {message.urls && message.urls.length > 0 && (
//                       <div className="urls-container">
//                         {message.urls.map((urlObj, i) => (
//                           <a
//                             key={i}
//                             href={urlObj.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="url-link"
//                           >
//                             🔗 {urlObj.name}
//                           </a>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <p>{message.message}</p>
//                 )}
//               </motion.div>
//             </div>
//           ))}
//         </div>

//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Enter your message here"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <div onClick={handleSend}>
//               <img src={assets.send_icon} alt="Send Icon" />
//             </div>
//           </div>
//           <p className="bottom-info">AI may provide inaccurate info</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;



import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./Main.css";
import Navbar from "../Navbar/Navbar";
import { assets } from "../../assets/assets";
import ChatAPI from "../../config/ChatAPI";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const botMessageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const ChatPage = ({ user, onLogout }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const { sessionId } = useParams();
  const userId = user?.$id;
  const initializationRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderMessages = ["Thinking...", "Diagnosing...", "Just a sec..."];

  
  const handleBotResponse = useCallback(
    async (userInput, placeholderId) => {
      setLoading(true);
      try {
        const data = await ChatAPI.addMessage(userId, sessionId, userInput);
        if (!data.success) {
          alert(data.error);
          setLoading(false);
          return;
        }
  
        const botMessage = {
          sender: "bot",
          message: data.response,
          urls: data.urls,  // Add urls to the bot message
        };
  
        // Log URLs to the console
        console.log("Bot URLs:", botMessage.urls);
  
        // Replace Placeholder Message with Real Response
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === placeholderId ? botMessage : msg
          )
        );
        
  
        setLoading(false);
      } catch (error) {
        console.error("Error in bot response:", error);
        setLoading(false);
      }
    },
    [userId, sessionId]
  );
  

  useEffect(() => {
    const initializeChat = async () => {
      if (initializationRef.current) return;
      initializationRef.current = true;
    
      if (state?.initialMessage && state?.fromMain) {
        const initialMessage = {
          sender: "user",
          message: state.initialMessage,
        };
        const placeholderId = Date.now(); // Unique ID for placeholder
    
        // Add the user message and the placeholder bot message
        setMessages([
          initialMessage,
          { id: placeholderId, sender: "bot", message: placeholderMessages[0] },
        ]);
    
        setLoading(true); // Start loading to enable placeholder cycling
        await handleBotResponse(state.initialMessage, placeholderId);
    
        navigate(".", { replace: true, state: {} });
      } else {
        try {
          const data = await ChatAPI.getHistory(userId, sessionId);
          setMessages(data.conversation || []);
        } catch (error) {
          console.error("Error fetching conversation history:", error);
        }
      }
    };
    

    if (userId && sessionId) {
      initializeChat();
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Cycle through Placeholder Messages
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderMessages.length);
      }, 1000);  // Rotate every second
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSend = async () => {
    if (input.trim() && !loading) {
      const userMessage = { sender: "user", message: input };
      const placeholderId = Date.now();  // Unique ID for placeholder message

      // Add User Message and Placeholder Bot Message
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { id: placeholderId, sender: "bot", message: placeholderMessages[0] },
      ]);

      setInput("");
      setLoading(true);

      // Simulate Bot Response (replace placeholder later)
      await handleBotResponse(input.trim(), placeholderId);
    }
  };

  return (
    <div className="main">
      <Navbar user={user} onLogout={onLogout} />
      <div className="main-container">
        <div className="chat-section" ref={chatRef}>
        {messages.map((message, index) => (
  <div
    key={index}
    className={`message-row ${
      message.sender === "user" ? "user-row" : "bot-row"
    }`}
  >
    {message.sender === "bot" && (
      <img
        src={assets.gemini_icon}
        alt="Bot Icon"
        className="message-icon"
      />
    )}
    <motion.div
      className={`message ${
        message.sender === "user" ? "user-message" : "bot-message"
      }`}
      variants={message.sender === "bot" ? botMessageVariants : {}}
      initial="hidden"
      animate="visible"
    >
      {message.sender === "bot" ? (
        <>
          <ReactMarkdown className="bot-formatted-response">
            {loading && message.id ? placeholderMessages[placeholderIndex] : message.message}
          </ReactMarkdown>
          {/* Display URLs if available */}
          {message.urls && message.urls.length > 0 && (
            <div className="bot-urls">
              {message.urls.map((urlData, idx) => (
                <a
                  key={idx}
                  href={urlData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bot-url-link"
                >
                  {urlData.name || `Link ${idx + 1}`}
                </a>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>{message.message}</p>
      )}
    </motion.div>
  </div>
))}

        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter your message here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <div
              onClick={handleSend}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              <img src={assets.send_icon} alt="Send Icon" />
            </div>
          </div>
          <p className="bottom-info">AI may provide inaccurate info</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;