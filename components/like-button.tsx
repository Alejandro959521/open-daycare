"use client";

import { useState } from "react";

interface LikeButtonProps {
  initialCount: number;
}

export default function LikeButton({ initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <button
      type="button"
      onClick={() => setCount(count + 1)}
      aria-label="Me gusta"
      className="flex cursor-pointer items-center gap-[7px] text-[14px] font-bold text-coral-100"
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
      {count}
    </button>
  );
}
