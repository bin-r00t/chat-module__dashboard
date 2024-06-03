import { useState } from "react";
import UserItem from "./UserItem";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function UserList({ users }) {
  let [currentUser, setCurrentUser] = useState(users[0]);

  function changeUser(user) {
    setCurrentUser(user);
  }
  return (
    <>
      <div className="search-form font-[Montserrat] mb-5 p-1 flex gap-3 items-center bg-gray-200 rounded-md">
        <input
          type="text"
          className="flex outline-none bg-transparent p-1 px-2 flex-1 font-[Montserrat] text-gray-600"
          placeholder="Search"
        />
        <MagnifyingGlassIcon className="mx-3 h-5 w-5 text-gray-600" />
      </div>
      <ul className="user-list mt-3 flex flex-col gap-1">
        {users.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            暂时没有用户哦，快去邀请好友吧
          </p>
        )}
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            selected={currentUser}
            onSelect={changeUser}
          />
        ))}
      </ul>
    </>
  );
}
