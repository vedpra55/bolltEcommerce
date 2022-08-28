import { useState } from "react";
import LoaderSpinner from "./loader";

export default function Button({ text, Icon, handleClick }) {
  const [isBtnClick, setBtnClick] = useState(false);

  function handleButtonClick() {
    setBtnClick(true);
    handleClick ? handleClick() : console.log("no fun");
  }

  return (
    <button
      onClick={handleButtonClick}
      className="bg-black/80 hover:bg-black/60 text-white px-3 py-2 rounded-md"
    >
      <div className="flex gap-x-2">
        {isBtnClick ? (
          <LoaderSpinner height="3" />
        ) : (
          <>
            <div>{Icon && <Icon className="h-6" />}</div>
            <div>{text && <p className=" font-medium">{text}</p>}</div>
          </>
        )}
      </div>
    </button>
  );
}
