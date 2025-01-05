"use client";  // Required for useEffect to work in Next.js 13+

import { useEffect } from 'react';

const KommunicateChat: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (function (d, m) {
        const kommunicateSettings = {
          appId: '1419b11cf8789508fac6e3593e146bd1b', // Replace with your App ID
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
        };

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';

        const h = document.getElementsByTagName('head')[0];
        h.appendChild(s);

        (window as any).kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, (window as any).kommunicate || {});
    }
  }, []);

  return <div></div>;
};

export default KommunicateChat;






// "use client";

// const ChatButton: React.FC = () => {
//   const handleChatOpen = () => {
//     window.open(
//       "https://www.kommunicate.io/livechat-demo?appId=1419b11cf8789508fac6e3593e146bd1b&botIds=stu-hdzbj&assignee=stu-hdzbj&languageCode=en",
//       "_blank"
//     );
//   };

//   return (
//     <button
//       onClick={handleChatOpen}
//       style={{
//         padding: "10px 20px",
//         backgroundColor: "#007bff",
//         color: "white",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//       }}
//     >
//       Open Chatbot
//     </button>
//   );
// };

// export default ChatButton;
