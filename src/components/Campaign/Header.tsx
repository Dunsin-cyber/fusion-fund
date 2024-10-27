"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function Header() {
  const placeholders = [
    "What's the donation code?",
    "Easily donate just by putting in the code?",
    "ART2024",
    "use me",
    "i'm a search bar",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[7rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-md font-bold text-center sm:text-5xl dark:text-white text-black">
        Ask FusionFund Anything
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
