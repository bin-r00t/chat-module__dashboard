import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [
    // {
    //   id: Math.random(),
    //   name: "test",
    //   socketId: null,
    //   uniqueRoomId: 111,
    //   online: true,
    //   messages: [
    //     {
    //       sender: "me",
    //       timestamp: 1717247816988,
    //       content: "hello",
    //       type: "text",
    //       unread: true,
    //     },
    //     {
    //       sender: "other",
    //       timestamp: 1717247846988,
    //       content: "world 的",
    //       type: "text",
    //       unread: true,
    //     },
    //   ],
    // },
    // {
    //   id: Math.random(),
    //   name: "test2",
    //   socketId: null,
    //   uniqueRoomId: 222,
    //   online: false,
    //   messages: [],
    // },
    // {
    //   id: Math.random(),
    //   name: "test3",
    //   socketId: null,
    //   uniqueRoomId: 333,
    //   online: true,
    //   messages: [],
    // },
  ],
  // currentRoomId: 111,
  currentRoomId: "",
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    /**
     * 添加一个远程用户
     * @param {*} state
     * @param {*} action
     */
    addClient(state, action) {
      const finded = state.all.find((c) => c.name === action.payload.name);
      if (finded) {
        finded.online = true;
        return;
      }
      state.all.push(action.payload);
    },
    /**
     * 切换当前用户的聊天记录
     * @param {*} state
     * @param {*} action [name, uniqueRoomId]
     */
    setCurrentClient(state, action) {
      state.currentRoomId = action.payload.uniqueRoomId;
      state.all
        .find((c) => c.uniqueRoomId === action.payload.uniqueRoomId)
        .messages.forEach((m) => {
          m.unread = false;
        });
    },
    /**
     * 来消息了，追加到对应的消息列表里
     * @param {*} state
     * @param {*} action
     * @returns
     */
    appendMessage(state, action) {
      const { roomId, timestamp, content, type, sender } = action.payload;
      const target = state.all.find((c) => c.uniqueRoomId === roomId);
      if (!target) {
        /** its impossible to enter here.. */
        console.error("[store/clients.js] no such client......", roomId);
        return;
      }
      target.messages.push({
        timestamp,
        content,
        type,
        sender,
        unread: sender != "me" && state.currentRoomId !== roomId,
      });
    },
    /**
     * 更新在线状态
     * @param {*} state
     * @param {*} action
     */
    updateOnlineStatus(state, action) {
      const { name, online } = action.payload;
      const client = state.all.find((c) => c.name === name);
      if (!client) {
        console.warn("[×] 没找到要更新的客户啊:", action.payload);
        return;
      }
      client.online = online;
      if (state.current.name === name) {
        state.current.online = online;
      }
    },
  },
});

export default clientsSlice;
export const {
  addClient,
  setCurrentClient,
  appendMessage,
  updateOnlineStatus,
} = clientsSlice.actions;
