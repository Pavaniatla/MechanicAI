


// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import "./Sidebar.css";
// import { assets } from "../../assets/assets";
// import axios from "axios";
// import ChatAPI from "../../config/ChatAPI";

// const Sidebar = ({ user, onNewChat, onChatSelect }) => {
//   const [extended, setExtended] = useState(false);
//   const [chats, setChats] = useState([]); 
//   const [selectedChat, setSelectedChat] = useState(null); 
//   const [loading, setLoading] = useState(false);
//   const [offset, setOffset] = useState(0); 
//   const [hasMore, setHasMore] = useState(true); 
//   const [menuOpen, setMenuOpen] = useState(null); 
//   const dropdownRef = useRef(null); 
//   const [editingTitle, setEditingTitle] = useState(null); 
//   const [newTitle, setNewTitle] = useState(""); 

//   const userId = user.$id || "";
//   const navigate = useNavigate();
//   const { sessionId } = useParams();

//   const fetchChats = useCallback(
//     async (loadMore = false) => {
//       if (!userId || loading || (!hasMore && loadMore)) return;
//       setLoading(true);
//       const data = await ChatAPI.getChats(userId, offset);
//       if (!data.success) {
//         setLoading(false);
//         return;
//       }
//       const { chatList, offset: newOffset } = data;

//       if (loadMore) {
//         setChats((prevChats) => [...prevChats, ...chatList]);
//       } else {
//         setChats(chatList);
//       }

//       setOffset(newOffset);
//       setHasMore(chatList.length === 10);
//       setLoading(false);
//     },
//     [userId, loading, offset, hasMore]
//   );

//   useEffect(() => {
//     if (userId) {
//       fetchChats();
//     }
//   }, [userId]);

//   const fetchChatDetails = async (chatId) => {
//     navigate(`/chat/${chatId}`);
//   };

//   const handleMenuClick = (chatId) => {
//     setMenuOpen((prev) => (prev === chatId ? null : chatId));
//   };

//   const handleRename = async (chatId) => {
//     if (newTitle.trim()) {
//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.sessionId === chatId ? { ...chat, title: newTitle } : chat
//         )
//       );
//       const data = await ChatAPI.renameTitle(userId, chatId, newTitle);
//       if (!data.success) {
//         alert(data.error);
//       }
//       setEditingTitle(null);
//       setNewTitle("");
//       setMenuOpen(null);
//     }
//   };

//   const handleDelete = async (chatId) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/delete", {
//         userId: userId,
//         sessionId: chatId,
//       });

//       if (response.status === 204) {
//         setChats((prevChats) =>
//           prevChats.filter((chat) => chat.sessionId !== chatId)
//         );
//         if (selectedChat === chatId) {
//           setSelectedChat(null);
//           onChatSelect(null);
//         }
//         setMenuOpen(null);
//         return;
//       }

//       if (response?.data?.success) {
//         setChats((prevChats) =>
//           prevChats.filter((chat) => chat.sessionId !== chatId)
//         );
//         if (selectedChat === chatId) {
//           setSelectedChat(null);
//           onChatSelect(null);
//         }
//         setMenuOpen(null);
//       } else {
//         console.error("Error deleting chat:", response?.data?.error || "Unknown error");
//       }
//     } catch (error) {
//       console.error("Error deleting chat:", error.message);
//     }
//   };

//   return (
//     <div className={`sidebar ${extended ? 'extended' : ''}`}>
//       <div className="top">
//         <img
//           onClick={() => setExtended((prev) => !prev)}
//           className="menu"
//           src={assets.menu_icon}
//           alt="menu"
//         />
//         <div className="new-chat" onClick={() => navigate('/')}>
//           <img src={assets.plus_icon} alt="new chat" />
//           {extended && <p>New Chat</p>}
//         </div>
//       </div>

//       {extended && (
//         <div className="recent">
//           <p className="recent-title">Recent</p>
//           <div className="recent-list">
//             {chats.map((chat) => (
//               <div
//                 key={chat.sessionId}
//                 className="recent-entry"
//                 onClick={() => fetchChatDetails(chat.sessionId)}
//               >
//                 <div
//                   className={`chat-content ${selectedChat === chat.sessionId ? "selected" : ""}`}
//                   onClick={() => fetchChatDetails(chat.sessionId)}
//                 >
//                   {editingTitle === chat.sessionId ? (
//                     <input
//                       type="text"
//                       value={newTitle}
//                       onChange={(e) => setNewTitle(e.target.value)}
//                       onBlur={() => setEditingTitle(null)}
//                       onKeyPress={(e) => {
//                         if (e.key === "Enter") handleRename(chat.sessionId);
//                       }}
//                       autoFocus
//                     />
//                   ) : (
//                     <p>{chat.title || "New Chat"}</p>
//                   )}
//                 </div>
//                 <div className="menu-icon" ref={dropdownRef}>
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleMenuClick(chat.sessionId);
//                     }}
//                   >
//                     <circle cx="12" cy="5" r="2" fill="black" />
//                     <circle cx="12" cy="12" r="2" fill="black" />
//                     <circle cx="12" cy="19" r="2" fill="black" />
//                   </svg>
//                   {menuOpen === chat.sessionId && (
//                     <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
//                       <button onClick={() => {setEditingTitle(chat.sessionId);setNewTitle(chat.title); setMenuOpen(null);  }}>Rename </button>
//                       <button onClick={() => handleDelete(chat.sessionId)}>Delete</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {hasMore && !loading && (
//             <button className="load-more" onClick={() => fetchChats(true)}>
//               Load More
//             </button>
//           )}
//           {!hasMore && <p>No more chats available</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;























import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import ChatAPI from "../../config/ChatAPI";

const Sidebar = ({ user, onNewChat, onChatSelect }) => {
  const [extended, setExtended] = useState(false);
  const [chats, setChats] = useState([]); 
  const [selectedChat, setSelectedChat] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); 
  const [hasMore, setHasMore] = useState(true); 
  const [menuOpen, setMenuOpen] = useState(null); 
  const dropdownRef = useRef(null); 
  const [editingTitle, setEditingTitle] = useState(null); 
  const [newTitle, setNewTitle] = useState(""); 

  const userId = user.$id || "";
  const navigate = useNavigate();
  const { sessionId } = useParams();  // Get current session ID from URL

  const fetchChats = useCallback(
    async (loadMore = false) => {
      if (!userId || loading || (!hasMore && loadMore)) return;
      setLoading(true);
      const data = await ChatAPI.getChats(userId, offset);
      if (!data.success) {
        setLoading(false);
        return;
      }
      const { chatList, offset: newOffset } = data;

      if (loadMore) {
        setChats((prevChats) => [...prevChats, ...chatList]);
      } else {
        setChats(chatList);
      }

      setOffset(newOffset);
      setHasMore(chatList.length === 10);
      setLoading(false);
    },
    [userId, loading, offset, hasMore]
  );

  useEffect(() => {
    if (userId) {
      fetchChats();
    }
  }, [userId]);

  const fetchChatDetails = async (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const handleMenuClick = (chatId) => {
    setMenuOpen((prev) => (prev === chatId ? null : chatId));
  };

  const handleRename = async (chatId) => {
    if (newTitle.trim()) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.sessionId === chatId ? { ...chat, title: newTitle } : chat
        )
      );
      const data = await ChatAPI.renameTitle(userId, chatId, newTitle);
      if (!data.success) {
        alert(data.error);
      }
      setEditingTitle(null);
      setNewTitle("");
      setMenuOpen(null);
    }
  };

  // const handleDelete = async (chatId) => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/delete", {
  //       userId: userId,
  //       sessionId: chatId,
  //     });

  //     if (response.status === 204) {
  //       setChats((prevChats) =>
  //         prevChats.filter((chat) => chat.sessionId !== chatId)
  //       );
  //       if (selectedChat === chatId) {
  //         setSelectedChat(null);
  //         onChatSelect(null);
  //       }
  //       setMenuOpen(null);
  //       return;
  //     }

  //     if (response?.data?.success) {
  //       setChats((prevChats) =>
  //         prevChats.filter((chat) => chat.sessionId !== chatId)
  //       );
  //       if (selectedChat === chatId) {
  //         setSelectedChat(null);
  //         onChatSelect(null);
  //       }
  //       setMenuOpen(null);
  //     } else {
  //       console.error("Error deleting chat:", response?.data?.error || "Unknown error");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting chat:", error.message);
  //   }
  // };





  const handleDelete = async (chatId) => {
    const confirmed = window.confirm("Are you sure you want to delete this chat?");
    if (!confirmed) {
      return; // Exit if the user cancels
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/delete", {
        userId: userId,
        sessionId: chatId,
      });
  
      if (response.status === 204) {
        setChats((prevChats) =>
          prevChats.filter((chat) => chat.sessionId !== chatId)
        );
        if (selectedChat === chatId) {
          setSelectedChat(null);
          onChatSelect(null);
        }
        setMenuOpen(null);
        return;
      }
  
      if (response?.data?.success) {
        setChats((prevChats) =>
          prevChats.filter((chat) => chat.sessionId !== chatId)
        );
        if (selectedChat === chatId) {
          setSelectedChat(null);
          onChatSelect(null);
        }
        setMenuOpen(null);
      } else {
        console.error("Error deleting chat:", response?.data?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting chat:", error.message);
    }
  };
  

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div className="new-chat" onClick={() => navigate('/')}>
          <img src={assets.plus_icon} alt="new chat" />
          {extended && <p>New Chat</p>}
        </div>
      </div>

      {extended && (
        <div className="recent">
          <p className="recent-title">Recent</p>
          <div className="recent-list">
            {chats.map((chat) => (
              <div
                key={chat.sessionId}
                className={`recent-entry ${sessionId === chat.sessionId ? 'active' : ''}`} // Highlight active chat
                onClick={() => fetchChatDetails(chat.sessionId)}
              >
                <div
                  className={`chat-content ${selectedChat === chat.sessionId ? "selected" : ""}`}
                >
                  {editingTitle === chat.sessionId ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onBlur={() => setEditingTitle(null)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleRename(chat.sessionId);
                      }}
                      autoFocus
                    />
                  ) : (
                    <p>{chat.title || "New Chat"}</p>
                  )}
                </div>
                <div className="menu-icon" ref={dropdownRef}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(chat.sessionId);
                    }}
                  >
                    <circle cx="12" cy="5" r="2" fill="white" />
                    <circle cx="12" cy="12" r="2" fill="white" />
                    <circle cx="12" cy="19" r="2" fill="white" />
                  </svg>
                  {menuOpen === chat.sessionId && (
                    <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => {setEditingTitle(chat.sessionId); setNewTitle(chat.title); setMenuOpen(null);  }}>Rename</button>
                      <button onClick={() => handleDelete(chat.sessionId)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {hasMore && !loading && (
            <button className="load-more" onClick={() => fetchChats(true)}>
              Load More
            </button>
          )}
          {!hasMore && <p>No more chats available</p>}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
