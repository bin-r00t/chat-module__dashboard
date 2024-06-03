import MessageHistory from "./MessageHistory";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { useRef } from "react";
import ImagePlaceholder from "../../assets/placeholder_image.png";

export default function ChatRoom({ onSend }) {
  const messageRef = useRef(null);
  const { currentRoomId, all } = useSelector((state) => state.clients);
  const currentUser = all.find((c) => c.uniqueRoomId === currentRoomId);

  return (
    <>
      {!currentUser && (
        <div className="chat-room__placeholder font-[Montserrat] bg-white h-full flex flex-col items-center justify-center gap-5">
          <h2 className="text-3xl select-none text-center font-semibold hover:bg-gray-200 rounded-md p-2 transition">
            “Pick a user”
          </h2>
          <img
            src={ImagePlaceholder}
            alt="placeholder"
            className="w-1/2 h-1/2 "
          />
        </div>
      )}
      {currentUser && (
        <div className="chat-room bg-white h-full flex flex-col">
          <div className="header-meta p-5 flex justify-between border-b">
            <div className="person flex flex-col gap-1">
              <h2 className="text-xl font-semibold">{currentUser.name}</h2>
              <span
                className={`w-2 h-2 rounded-full ${
                  currentUser.online ? "bg-green-500" : "bg-gray-300"
                } `}
              ></span>
            </div>
            <div className="settings"></div>
          </div>
          <MessageHistory ref={messageRef} user={currentUser} />
          <ChatInput
            user={currentUser}
            onSend={onSend}
            messageRef={messageRef}
          />
        </div>
      )}
    </>
  );
}
