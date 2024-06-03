import { setCurrentClient } from "../store/clients";
import { useDispatch } from "react-redux";

export default function UserItem({ user, selected, onSelect }) {
  const dispatch = useDispatch();
  const unreadMessagesCount = user.messages.filter((m) => m.unread).length;

  console.log("unreadMessagesCount", unreadMessagesCount);

  function handleSelect() {
    onSelect(user);
    dispatch(setCurrentClient(user));
  }
  return (
    <li
      className={`transition hover:bg-sky-100 ${
        selected == user ? "bg-sky-100" : ""
      } p-2 rounded cursor-pointer relative`}
      onClick={handleSelect}
    >
      {/* <div className="item-modal bg-[#ccc3] backdrop:blur(12px) absolute top-0 left-0 h-full w-full cursor-pointer"></div> */}
      <div className="user-item flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`dot ${
              user.online ? "bg-green-500" : "bg-gray-300"
            } w-2 h-2 rounded-full`}
          ></span>
          <span className="font-[Montserrat] text-slate-800">{user.name}</span>
        </div>
        {unreadMessagesCount != 0 && (
          <div className="badge w-4 h-4 bg-red-500 rounded-full text-white text-xs text-center">
            {unreadMessagesCount}
          </div>
        )}
      </div>
    </li>
  );
}
