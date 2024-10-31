import React from "react";
import { BsCurrencyDollar } from "react-icons/bs"; // Icon for loan cards
import { useGetAllMyCreatedLoans } from "@/functions";
import { NearContext } from "@/wallets/near";
import { useAppSelector } from "@/redux/hook";
import { msToDaysLeft } from "@/lib/DaysLeft";
const myLoans = [
  {
    loan_id: 1,
    amount: 500,
    interest_rate: 5,
    duration: 30,
    start_time: new Date().getTime(),
    repaid: false,
  },
  {
    loan_id: 2,
    amount: 300,
    interest_rate: 7,
    duration: 45,
    start_time: new Date().getTime(),
    repaid: true,
  },
  // Add more sample loans as needed
];

const MyLoansPage = () => {
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const myLoans_ = useAppSelector((state) => state.myLoans);
  console.log(myLoans_);
  const { getAllMyCreatedLoans } = useGetAllMyCreatedLoans();

  React.useEffect(() => {
    getAllMyCreatedLoans();
  }, [signedAccountId]);

  return (
    <div className="min-h-screen p-4 font-sans">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200">My Created Loans</h1>
      </header>

      {/* Loan Cards */}
      <div className="space-y-4">
        {myLoans_?.map((loan) => (
          <div
            key={loan.id}
            className="bg-gray-900 shadow-md rounded-lg p-4 flex items-center justify-evenly"
          >
            {/* <div className="flex items-center"> */}
            <div>
              <p className="text-sm text-gray-500">
                Amount:{" "}
                <span className="font-semibold">
                  {loan.amount.toLocaleString()} NEAR
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Interest Rate:{" "}
                <span className="font-semibold">{loan.interest_rate}%</span>
              </p>
            </div>
            <BsCurrencyDollar className="text-gray-600 text-3xl" />
            <div className="space-x-3 flex flex-col">
              <p className="text-sm text-gray-500">
                Duration:{" "}
                <span className="font-semibold">
                  {msToDaysLeft(loan.duration)} days
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    loan.fulfilled ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {loan.fulfilled ? "Repaid" : "Pending"}
                </span>
              </p>
            </div>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLoansPage;
