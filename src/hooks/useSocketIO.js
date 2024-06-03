import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toast";
import E from "../events";
import {
  appendMessage,
  addClient,
  updateOnlineStatus,
  setCurrentClient,
} from "../store/clients";
import { useDispatch } from "react-redux";

export default function useSocketIO(url, options = {}) {
  let socket = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("init socket.current...");
    // 此处只做管理端所见的
    socket.current = io(url, options);
    socket.current.on("connect", () => {
      console.log("[React] admin connected");
    });

    socket.current.on(E.ActiveUsers, (users) => {
      users.forEach((user) => {
        dispatch(
          addClient({
            ...user,
            online: true,
            messages: [],
          })
        );
      });
    });

    socket.current.on(E.UserJoin, (user) => {
      toast.success(`新用户 ${user.name} 加入啦`);
      socket.current.emit("room:join", user); // trigger fetch user history
      dispatch(
        addClient({
          ...user,
          online: true,
          messages: [],
        })
      );
    });

    socket.current.on(E.UserLeave, (user) => {
      toast.info(`用户 ${user.name} 离开啦`);
      dispatch(
        updateOnlineStatus({
          name: user.name,
          online: false,
        })
      );
    });

    socket.current.on(E.UserMessage, ({ type, content, roomId, timestamp }) => {
      console.log("user message", { type, content, roomId, timestamp });
      dispatch(
        appendMessage({
          roomId,
          timestamp,
          content,
          type,
          sender: "user",
        })
      );
    });

    return () => {
      console.log("disconnect socket.current...");
      socket.current.disconnect();
    };
  }, [url, options]);

  return ({ type, payload }) => {
    console.log("发送消息 ===> ", { type, payload });
    socket.current.emit(E.MessageIn, { type, payload });
    dispatch(
      appendMessage({
        roomId: payload.roomId,
        timestamp: payload.timestamp,
        content: payload.content,
        type: type,
        sender: payload.sender,
      })
    );
  };
}
