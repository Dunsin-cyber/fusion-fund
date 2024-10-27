import React from "react";
import { Header } from "@/components/Campaign/Header";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";

function index() {
  const router = useRouter();
  const [impactOccurred] = useHapticFeedback();
  return (
    <div>
      <div
        onClick={() => {
          impactOccurred("medium");
          router.push("/");
        }}
      >
        <IoIosArrowBack color="white" />
      </div>
      <Header />
    </div>
  );
}

export default index;
