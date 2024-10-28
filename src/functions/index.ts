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
        if (newAcc) {
          console.log(newAcc);
          toast.success("Initialized Account Successfully");
          return;
        }
      } catch (err) {
        toast.error(err.message);
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
          method: "do_i_exist",
          args: {},
        });

        setUserExist(user);
        console.log("user", user);

        // if (user) {
        //   router.push("/profile");
        // } else {
        //   await wallet.callMethod({
        //     contractId: FusionFundContract,
        //     method: "new",
        //     args: {},
        //   });
        //   router.push("/create-profile");
        // }

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

  const createUser = async (user: any) => {
    if (wallet) {
      try {
        setLoading(true);
        const data = await wallet.callMethod({
          contractId: FusionFundContract,
          method: user ? "update_profile" : "create_profile",
          args: user
            ? {
                new_bio: JSON.stringify(user.bio),
              }
            : {
                bio: JSON.stringify(user.bio),
                username: user.username,
              },
        });
        if (data) {
          console.log("DATA", data);
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
          args: { user_id: JSON.stringify(signedAccountId) },
        });
        console.log(data);
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
      // if (data) {
      //   for (let i = 1; i < data.length, i++; ) {
      //     // console.log(data[i][1]);
      //     // dispatch(addCampaign(data[i][1]));
      //   }
      //   return;
      // }
    } catch (err) {
      console.log("ERROR", err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { getCampaigns, loading };
};
