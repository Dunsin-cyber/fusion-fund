import React, { useState, useContext } from "react";
import { NearContext } from "@/wallets/near";
import { FusionFundContract } from "@/config";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Campaign, User } from "@/redux/types";
import { addProfile } from "@/redux/slice/ProfileSlice";
import { addCampaign } from "@/redux/slice/CampaignSlice";

export const useInitializeContract = () => {
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useContext(NearContext);
  const initContract = async () => {
    if (wallet) {
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

  const isUserExist = async () => {
    if (wallet) {
      try {
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
          toast.success("Profile added successfully");
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

  const getCampaigns = async () => {
    try {
      setLoading(true);
      const data = await wallet.viewMethod({
        contractId: FusionFundContract,
        method: "get_all_campaigns",
        args: {},
      });

      console.log("FROM ACC", data);
      if (data) {
        for (let i = 0; i < data.length; i++) {
          dispatch(addCampaign({ ...data[i], campaign_id: i }));
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
