import { useEffect, useState } from "react";
import { forwardRef } from "react";
import "./scrollbar.css";

export default forwardRef(function MessageHistory({ user }, ref) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [user.messages]);
  return (
    <section ref={ref} className="history-view flex-1 overflow-y-auto border-b">
      {user.messages.map((m, i) => (
        <MessageItem
          key={m.timestamp + "-" + i}
          timestamp={m.timestamp}
          content={m.content}
          sender={m.sender}
          type={m.type}
        />
      ))}
    </section>
  );
});

function MessageItem({ timestamp, sender, content, type }) {
  return (
    <div
      className={`message rounded p-5 flex ${
        sender == "me" ? "flex-row-reverse" : ""
      } gap-3 items-start relative`}
    >
      <div className="rounded-full w-8 h-8 bg-black flex-shrink-0"></div>
      <div
        className={`message-content relative font-[Montserrat]  p-1 px-3 rounded-lg ${
          sender == "me"
            ? "bg-blue-500 text-white ml-10"
            : "bg-gray-200 text-gray-800 mr-10"
        }`}
      >
        {content}
        <p
          className={`absolute -bottom-5 text-nowrap ${
            sender == "me" ? "right-0" : "left-0"
          } rounded px-1 text-xs text-gray-400`}
        >
          {new Date(timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
