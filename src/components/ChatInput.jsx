import { useRef } from "react";
import Selector from "./ChatExtraSelector";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PhoneIcon,
  PhotoIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";

const options = [
  {
    icon: <FaceSmileIcon className="w-6 h-6" />,
    value: "emoji",
  },
  {
    icon: <PhotoIcon className="w-6 h-6" />,
    value: "image",
  },
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    value: "audio",
  },
  {
    icon: <CameraIcon className="w-6 h-6" />,
    value: "video",
  },
];

export default function ChatInput({ user, messageRef, onSend }) {
  const inputRef = useRef(null);

  const handleSend = () => {
    if (!inputRef.current.value) return;
    onSend({
      type: "text",
      payload: {
        roomId: user.uniqueRoomId,
        content: inputRef.current.value,
        timestamp: Date.now(),
        sender: "me",
      },
    });
    inputRef.current.value = "";

    setTimeout(() => {
      // 消息自动滚动到底部, 50ms 是为了等待消息渲染完成
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }, 50);
  };

  function handleEnter(e) {
    if (e.key === "Enter") {
      handleSend();
    } else {
      return;
    }
  }

  return (
    <div className="input-view-inner p-3 flex items-center gap-3">
      <input
        ref={inputRef}
        onKeyDown={handleEnter}
        placeholder="Type a message"
        className="outline-none p-1 px-2 rounded active:outline outline-slate-200 flex-1"
      />
      <Selector options={options} />
      <button
        className="p-2 px-7 rounded-lg bg-green-500 text-white"
        onClick={handleSend}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
