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

export function CreateLoan() {
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

  const { setIsLoanModalOpen } = useClient();

  const onSubmit = async (e: any) => {
    if (wallet) {
      try {
        setLoading(true);
        const create_camp = await wallet.callMethod({
          contractId: FusionFundContract,
          method: "create_loan_request",
          args: {
            amount: +e.amount,
            interest_rate: +e.interest_rate,
            duration: (new Date(e.duration).getTime() * 1_000_000).toString(),
          },
        });

        await getUser();
        setIsLoanModalOpen(false);
        toast.success("Request created");
      } catch (err) {
        toast.error("could not create request");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
      <div
        className="flex justify-end "
        onClick={() => setIsLoanModalOpen(false)}
      >
        <MdOutlineCancel size={"30px"} />
      </div>
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            {...register("amount", { required: true })}
            placeholder="0"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="interest_rate">Interest Rate</Label>
          <Input
            {...register("interest_rate", { required: true })}
            id="token"
            placeholder="1"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="time">Till When</Label>
          <Input
            {...register("duration", { required: true })}
            id="time"
            placeholder=""
            type="date"
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
