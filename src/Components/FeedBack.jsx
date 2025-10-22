import React from "react";

export const FeedBack = () => {
  return (
    <div className="my-20  flex max-w-7xl flex-col items-center justify-center gap-10 p-4 md:p-8">
      <div className="flex items-center">
        <span className="text-4xl">"</span>
      </div>

      <p className="text-center tracking-loose md:text-xl md:leading-[46px]">
        Very nice working with bistro it is easy to integrate with existing
        Restraunt hassle free, loved it!
      </p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-red-400 to-blue-500"></div>{" "}
        <span>Trust F. Obe</span>
      </div>
    </div>
  );
};
