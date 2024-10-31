import React from "react";
import { useRouter } from "next/router";
import { ShootingStars } from "@/components/ui/shooting-stars";
import Background from "@/components/Background";
import Loans from "@/components/Lending/Loans";

function Index() {
  const router = useRouter();
  return (
    <Background>
      <Loans />
    </Background>
  );
}

export default Index;
