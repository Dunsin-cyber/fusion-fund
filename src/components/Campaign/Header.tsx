"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useAppSelector } from "@/redux/hook";
import { useClient } from "@/context";
import { Campaign } from "@/redux/types";
import toast from "react-hot-toast";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const campaigns: any[] = useAppSelector((state) => state.campaigns);
  const { handlesetIsCampDetailOpen } = useClient();

  const placeholders = [
    "What's the donation code?",
    "Easily donate just by putting in the code?",
    "ART2024",
    "use me",
    "i'm a search bar",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.length === 5) {
      const data = campaigns?.filter(
        (camp: Campaign) => camp.campaign_code === searchQuery
      );
      if (data.length < 1) {
        toast.success(`No Active Campaign with ${searchQuery} `);
      }
      handlesetIsCampDetailOpen(data[0].campaign_id, true);
    } else {
      toast.success(`I will Ask PT`);
    }
    console.log(searchQuery);
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
