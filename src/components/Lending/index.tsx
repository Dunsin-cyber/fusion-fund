// import React, { useState, useEffect } from "react";
// import { NearContext } from "@/wallets/near";
// import { FusionFundContract } from "@/config";

// function index() {
//   const { wallet, signedAccountId } = React.useContext(NearContext);
//   const [loading, setLoading] = useState(false);

//   const val = [
//     {
//       amount: 300,
//       interest_rate: 7,
//       duration: Date.now() * 1_000_000,
//     },
//     {
//       amount: 200,
//       interest_rate: 8,
//       duration: Date.now() * 1_000_000,
//     },
//     {
//       amount: 100,
//       interest_rate: 9,
//       duration: Date.now() * 1_000_000,
//     },
//   ];

//   const handleCreateLoanReq = async () => {
//     // data.map(async (val) => {
//     try {
//       setLoading(true);
//       if (wallet && signedAccountId) {
//         const run = await wallet.callMethod({
//           contractId: FusionFundContract,
//           method: "create_loan_request",
//           args: {
//             amount: 200,
//             interest_rate: 1,
//             duration: (Date.now() * 1_000_000).toString(),
//           },
//         });
//         console.log("created lone", run);
//       }
//     } catch (err) {
//     } finally {
//       setLoading(false);
//     }
//     // });
//   };

//   const handleGetAll = async () => {
//     try {
//       const getAll = await wallet.viewMethod({
//         contractId: FusionFundContract,
//         method: "get_all_loan_requests",
//         args: {
//           // from_index: 0,
//           // limit: 10,
//         },
//       });

//       console.log("All Loans", getAll);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleGetOne = async () => {
//     try {
//       const getAll = await wallet.viewMethod({
//         contractId: FusionFundContract,
//         method: "get_loan_request",
//         args: {
//           loan_request_id: 1,
//         },
//       });

//       console.log("Loan one", getAll);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     // handleCreateLoanReq();
//     handleGetAll();
//     // handleGetOne();
//   }, []);

//   return <div>index</div>;
// }

// export default index;

// LoanPage.jsx

import { FusionFundContract } from "@/config";
import { useClient } from "@/context";
import { useGetAllLoanReq } from "@/functions";
import { msToDaysLeft } from "@/lib/DaysLeft";
import { serializeError } from "@/lib/SerializeError";
import { useAppSelector } from "@/redux/hook";
import { LoanRequest } from "@/redux/types";
import { NearContext } from "@/wallets/near";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsGraphUp } from "react-icons/bs"; // Graph icon for each card

// Sample data for loans, similar to Loan struct
const loans = [
  {
    loan_id: 1,
    borrower: "alice.near",
    lender: "bob.near",
    amount: 500,
    interest_rate: 10,
    duration: 30,
    start_time: new Date().getTime(),
    repaid: false,
  },
  {
    loan_id: 1,
    borrower: "alice.near",
    lender: "bob.near",
    amount: 500,
    interest_rate: 10,
    duration: 30,
    start_time: new Date().getTime(),
    repaid: false,
  },
  {
    loan_id: 1,
    borrower: "alice.near",
    lender: "bob.near",
    amount: 500,
    interest_rate: 10,
    duration: 30,
    start_time: new Date().getTime(),
    repaid: false,
  },
  {
    loan_id: 1,
    borrower: "alice.near",
    lender: "bob.near",
    amount: 500,
    interest_rate: 10,
    duration: 30,
    start_time: new Date().getTime(),
    repaid: false,
  },
  // Add more sample loans as needed
];

const LoanPage = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const router = useRouter();
  const { setIsLoanModalOpen } = useClient();
  const allLoansReq = useAppSelector((state) => state.allLoanReq);
  const { getAllLoanReq } = useGetAllLoanReq();
  const [loading, setLoading] = useState(false);
  console.log("ALAL LONES", allLoansReq);
  const { wallet } = React.useContext(NearContext);
  useEffect(() => {
    getAllLoanReq();
  }, []);

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan);
  };

  const handleAcceptLoan = async (loan: LoanRequest) => {
    try {
      if (wallet) {
        setLoading(true);

        const call = await wallet.callMethod({
          contractId: FusionFundContract,
          method: "accept_loan_request",
          args: {
            loan_request_id: +loan.id,
          },
          deposit: loan.amount * 1e24,
        });

        toast.success("You have successfully loaned");
      }
    } catch (err) {
      const new_err = serializeError(err);

      toast.error(new_err);

      console.log(err);
    } finally {
      setSelectedLoan(null);
      setLoading(false);
    }
  };

  return (
    <div className="bmin-h-screen p-4 font-sans">
      {/* Headers */}
      <header className="flex justify-between items-center mb-10">
        <button
          onClick={() => setIsLoanModalOpen(true)}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Create a Loan Request
        </button>

        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div
            onClick={() => router.push("/loans")}
            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 "
          >
            <span>See All Loans</span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
      </header>

      <h1>Loan Requests</h1>

      {/* Loan List */}
      <div className="space-y-4">
        {allLoansReq?.map((loan) => (
          <div
            key={loan.id}
            className="bg-gray-900 shadow-lg rounded-lg p-4 flex items-center justify-between"
            onClick={() => handleLoanClick(loan)}
          >
            <div>
              <h2 className="text-lg font-semibold">Loan #{loan.id}</h2>
              <p className="text-sm text-gray-400">Borrower: {loan.borrower}</p>
              <p className="text-sm text-gray-400">
                Amount: {loan.amount.toLocaleString()} NEAR
              </p>
            </div>
            <BsGraphUp className="text-blue-500 text-2xl" />
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">
              Loan Details #{selectedLoan.id}
            </h2>
            <p className="text-gray-400">
              <span className="font-semibold">Borrower:</span>{" "}
              {selectedLoan.borrower}
            </p>

            <p className="text-gray-400">
              <span className="font-semibold">Amount:</span>{" "}
              {selectedLoan.amount} NEAR
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Interest Rate:</span>{" "}
              {selectedLoan.interest_rate}%
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Duration:</span>{" "}
              {msToDaysLeft(selectedLoan.duration)} days
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Repaid:</span>{" "}
              {selectedLoan.fulfilled ? "Yes" : "No"}
            </p>

            <button
              disabled={loading}
              onClick={() => handleAcceptLoan(selectedLoan)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "processing" : "Accept Loan Request"}
            </button>
            <button
              disabled={loading}
              onClick={() => setSelectedLoan(null)}
              className="mt-2 w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanPage;
