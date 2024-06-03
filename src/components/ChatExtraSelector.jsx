import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Selector({ options, onSelect }) {
  const [showOpts, setShowOpts] = useState(false);

  const toggle = () => {
    setShowOpts(!showOpts);
  };
  return (
    <div className="selector relative">
      {showOpts}
      <button
        className="p-1 hover:bg-slate-100 rounded transition"
        onClick={toggle}
      >
        <EllipsisVerticalIcon className="w-5 h-5 text-slate-800" />
      </button>
      {showOpts && (
        <div className="selector-options border bg-white absolute -top-[60px] right-0 rounded p-1 flex ">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => onSelect(option)}
              className="p-1 px-2 rounded hover:bg-slate-100 text-slate-800"
            >
              {option.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
