import React from "react";

function ImageEvent({ src, title, date, desc, width }) {
  return (
    <div
      className={
        width +
        "flex items-end lg:h-96 md:h-80 h-64 rounded-2xl bg-cover pb-4 " +
        src
      }
    >
      <div className="p-6">
        <p className="text-white mb-1 text-sm font-normal">{title}</p>
        <p className="text-white text-xs font-thin">{date}</p>
        <p className="text-white text-sm font-normal mt-2 md:block hidden">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default ImageEvent;
