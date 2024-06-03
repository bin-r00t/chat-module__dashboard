import { useState, useMemo, useEffect } from "react";
import { ToastContainer, toast } from "react-toast";
import { useSelector } from "react-redux";
import UserList from "./components/UserList";
import ChatRoom from "./components/ChatRoom";
import useSocketIO from "./hooks/useSocketIO";
import "./App.css";

function App() {
  const [active, setActive] = useState("online-users");
  const users = useSelector((state) => state.clients.all);
  const onlineUsers = users.filter((u) => u.online);
  const offlineUsers = users.filter((u) => !u.online);
  const cfg = useMemo(
    () => ({
      auth: {
        token: 1,
      },
    }),
    []
  );

  const emit = useSocketIO("http://localhost:3000/super", cfg);

  return (
    <div className="bg-slate-100 h-screen min-w-[970px] p-12">
      <div className="chat h-full flex flex-col ">
        <main className="flex-1 flex gap-5 h-1">
          <section className="chat-left shadow-lg rounded-lg bg-white">
            <div className="flex p-2 border-b">
              <button className="btn flex-1 p-2 rounded text-white font-[Montserrat] bg-blue-500 capitalize">
                chats
              </button>
              <button className="btn flex-1 p-2 rounded text-slate-800 font-[Montserrat] bg-slate-100 capitalize">
                users
              </button>
            </div>
            <div className="p-3">
              {active == "online-users" && (
                <UserList key="online-users" users={onlineUsers} />
              )}
              {active == "offline-users" && (
                <UserList key="offline-users" users={offlineUsers} />
              )}
            </div>
          </section>
          <section className="chat-right flex-1 rounded-lg shadow-lg overflow-hidden">
            <ChatRoom onSend={emit} />
          </section>
        </main>
      </div>
      <ToastContainer delay={3000} position="bottom-center" />
    </div>
  );
}

export default App;
