// components/FloatingIcon.js
import { useClient } from "@/context";
import { useState } from "react";

export default function FloatingIcon({ content }) {
  const { isAssistantOpen, setIsAssistantOpen } = useClient();

  return (
    <>
      {/* Overlay with Fade-In Animation */}
      <div
        onClick={() => setIsAssistantOpen(false)}
        className={`fixed inset-0 z-[1000] bg-black/60 flex justify-center items-center p-4 transition-opacity duration-500 ${
          isAssistantOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-400 rounded-lg p-6 max-w-xs text-black overflow-auto transform transition-transform duration-500 scale-100"
          style={{
            transform: isAssistantOpen ? "scale(1)" : "scale(0.95)",
            transition: "transform 0.5s ease-in-out",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Floating Icon with Scale Animation */}
      <div
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        className={`fixed z-[1000] right-4 top-[30%] p-4 bg-gray-500 rounded-full text-white cursor-pointer shadow-lg transform ${
          isAssistantOpen ? "rotate-45 scale-110" : "scale-100"
        } transition-transform duration-300 hover:bg-gray-600`}
      >
        +
      </div>
    </>
  );
}
