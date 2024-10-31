import React, { useState, useContext, useRef } from "react";
import { NearContext } from "@/wallets/near";
import { FusionFundContract } from "@/config";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Campaign, User } from "@/redux/types";
import { addProfile } from "@/redux/slice/ProfileSlice";
import { addCampaign, clearCampaigns } from "@/redux/slice/CampaignSlice";
import { addMyCampaign, clearMyCampaigns } from "@/redux/slice/MyCampaigns";
import { serializeError } from "@/lib/SerializeError";
import { addMyLoan, clearMyLoans } from "@/redux/slice/MyCreatedLoan";
import { addLoan, clearAllLoans } from "@/redux/slice/AllLoneSlice";
import { addLoanReq, clearLoanReqs } from "@/redux/slice/LoanReqSlice";

export const useInitializeContract = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const hasFetched = useRef(false);

  const initContract = async () => {
    if (wallet) {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        setLoading(true);
        const newAcc = await wallet.callMethod({
          contractId: FusionFundContract,
          method: "init",
          args: {},
        });

        console.log(newAcc);
        console.log("Initialized Account Successfully");
        return;
      } catch (err) {
        // const new_err = serializeError(err);

        // toast.error(new_err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return { initContract, loading };
};

export const useIsUserExist = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const [userExist, setUserExist] = useState(false);
  const router = useRouter();
  const hasFetched = useRef(false);

  const isUserExist = async () => {
    if (wallet) {
      try {
        if (hasFetched.current) return;
        hasFetched.current = true;
        setLoading(true);
        const user = await wallet.viewMethod({
          contractId: FusionFundContract,
          method: "do_i_exists",
          args: {},
        });

        setUserExist(user);
        console.log("user", user);
        console.log("DO I EXIST", user);
        if (user) {
          return;
        } else {
          try {
            await wallet.callMethod({
              contractId: FusionFundContract,
              method: "init",
              args: {},
            });

            console.log("CONTRACT INITALIZED");
            return;
          } catch (err) {
            console.log(err);
          }
        }

        return;
      } catch (err) {
        // toast.error(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return { isUserExist, loading, userExist };
};

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const createUser = async (query: any) => {
    if (wallet) {
      try {
        setLoading(true);
        const data = await wallet.callMethod({
          contractId: FusionFundContract,
          method: user ? "update_profile" : "create_profile",
          args: user
            ? {
                new_bio: JSON.stringify(query.bio),
              }
            : {
                bio: JSON.stringify(query.bio),
                username: query.username,
              },
        });
        if (data) {
          dispatch(
            addProfile({
              username: query.username,
              bio: query.bio,
              kyc_verified: false,
              contributions: [],
              created_campaigns: [],
            })
          );
          return;
        }
      } catch (err) {
        console.log("ERROR", err);
        console.log(err);
        const new_err = serializeError(err);
        toast.error(new_err);
      } finally {
        setLoading(false);
      }
    }
  };
  return { createUser, loading };
};

export const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();

  const getUser = async () => {
    if (wallet) {
      try {
        setLoading(true);
        const data: User = await wallet.viewMethod({
          contractId: FusionFundContract,
          method: "get_user_profile",
          args: { user_id: signedAccountId },
        });
        console.log("USER", data);
        if (data) {
          dispatch(addProfile(data));
          return;
        }
      } catch (err) {
        console.log("ERROR", err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return { getUser, loading };
};

export const useGetAllCampigns = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const getCampaigns = async () => {
    try {
      if (signedAccountId) {
        // if (hasFetched.current) return; // Prevent multiple calls
        // hasFetched.current = true;
        setLoading(true);
        const data = await wallet.viewMethod({
          contractId: FusionFundContract,
          method: "get_all_campaigns",
          args: {
            from_index: 0,
            limit: 10,
          },
        });

        console.log("FROM ACC", data);
        if (data) {
          dispatch(clearCampaigns());
          for (let i = 0; i < data.length; i++) {
            dispatch(addCampaign({ ...data[i][1], campaign_id: data[i][0] }));
          }
        }
      }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { getCampaigns, loading };
};

export const useGetMyCampigns = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const getMyCampaigns = async () => {
    try {
      // if (hasFetched.current) return; // Prevent multiple calls
      // hasFetched.current = true;
      setLoading(true);
      const data = await wallet.viewMethod({
        contractId: FusionFundContract,
        method: "get_all_campaigns",
        args: { from_index: 0, limit: 30 },
      });

      console.log("FROM ACC", data);
      if (data) {
        dispatch(clearMyCampaigns());
        for (let i = 0; i < data.length; i++) {
          if (data[i][1].creator === signedAccountId)
            dispatch(addMyCampaign({ ...data[i][1], campaign_id: [i][0] }));
        }
      }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { getMyCampaigns, loading };
};

export const useGetAllMyCreatedLoans = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const getAllMyCreatedLoans = async () => {
    try {
      if (hasFetched.current) return; // Prevent multiple calls
      hasFetched.current = true;
      setLoading(true);
      const data = await wallet.viewMethod({
        contractId: FusionFundContract,
        method: "get_all_loan_requests",
        args: {
          /* from_index: 0, limit: 30 */
        },
      });

      console.log("FROM ACC", data);
      if (data) {
        dispatch(clearMyLoans());
        for (let i = 0; i < data.length; i++) {
          if (data[i][1].borrower === signedAccountId)
            dispatch(addMyLoan({ ...data[i][1], id: [i][0] }));
        }
      }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { getAllMyCreatedLoans, loading };
};

export const useGetAllLoans = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const getAllLoans = async () => {
    try {
      if (hasFetched.current) return; // Prevent multiple calls
      hasFetched.current = true;
      setLoading(true);
      const data = await wallet.viewMethod({
        contractId: FusionFundContract,
        method: "get_all_loans",
        args: { from_index: 0, limit: 30 },
      });

      console.log("FROM ACC", data);
      if (data) {
        dispatch(clearAllLoans());
        for (let i = 0; i < data.length; i++) {
          if (data[i][1].creator === signedAccountId)
            dispatch(addLoan({ ...data[i][1], campaign_id: [i][0] }));
        }
      }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { getAllLoans, loading };
};

export const useGetAllLoanReq = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const getAllLoanReq = async () => {
    try {
      if (hasFetched.current) return; // Prevent multiple calls
      hasFetched.current = true;
      setLoading(true);
      const data = await wallet.viewMethod({
        contractId: FusionFundContract,
        method: "get_all_loan_requests",
        args: {
          /* from_index: 0, limit: 30 */
        },
      });

      console.log("FROM ACC", data);
      if (data) {
        dispatch(clearLoanReqs());
        for (let i = 0; i < data.length; i++) {
          dispatch(addLoanReq({ ...data[i][1], id: [i][0] }));
        }
      }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { getAllLoanReq, loading };
};
