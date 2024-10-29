"use client";
import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useClient } from "@/context";
import { NearContext } from "@/wallets/near";
import { FusionFundContract } from "@/config";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";
import { useGetUser } from "@/functions";

// Example usage:
// const title = "Example Title";
// const randomCode = generateCode(title);
// console.log(`Generated code for "${title}": ${randomCode}`);

export function SignupFormDemo() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { getUser } = useGetUser();

  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { wallet } = useContext(NearContext);

  function generateCode(title) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Allowed characters
    let code = "";

    // Generate a random code of 5 characters
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    setCode(code);
    return code;
  }

  const { setIsCreateCampOpen } = useClient();

  const onSubmit = async (e: any) => {
    console.log(e, new Date(e.time).getTime().toString());
    if (wallet) {
      try {
        setLoading(true);
        const create_camp = await wallet.callMethod({
          contractId: FusionFundContract,
          method: "create_campaign",
          args: {
            end_time: (new Date(e.time).getTime() * 1_000_000).toString(),
            title: e.title,
            description: e.description,
            images: "image",
            amount_required: +e.amount_required,
            campaign_code: code,
          },
        });

        await getUser();
        setIsCreateCampOpen(false);
        toast.success("campaign created");
      } catch (err) {
        toast.error("could not create campaign");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    generateCode(watch("title"));
  }, [watch("title")]);

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
      <div
        className="flex justify-end "
        onClick={() => setIsCreateCampOpen(false)}
      >
        <MdOutlineCancel size={"30px"} />
      </div>
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Campaign name</Label>
            <Input
              {...register("title", { required: true })}
              id="firstname"
              placeholder="title"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Description</Label>
            <Input
              {...register("description", { required: true })}
              id="lastname"
              placeholder="i need this fund..."
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">How much do you want to Raise</Label>
          <Input
            id="amount"
            {...register("amount_required", { required: true })}
            placeholder="0"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="token">Token</Label>
          <Input
            {...register("token", { required: true })}
            id="token"
            placeholder="NEAR"
            type="option"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="time">Til When</Label>
          <Input
            {...register("time", { required: true })}
            id="time"
            placeholder=""
            type="date"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="time">Donation Code</Label>
          <Input
            disabled={true}
            id="time"
            value={code}
            placeholder=""
            type="text"
          />
        </LabelInputContainer>

        <button
          disabled={loading}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {loading ? "loading..." : "Create"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
