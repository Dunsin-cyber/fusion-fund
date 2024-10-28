import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface DrawerParam {
  title: string;
  body: string;
}

const UserContext = React.createContext<{
  setDrawerTitle: any;
  drawerTitle: string;
  drawerBody: string;
  setDrawerBody: any;
  closeDrawer: any;
  drawerIsOpen: boolean;
  setDrawerIsOpen: any;
  passDrawerParams: (data: DrawerParam) => {} | any;
  isCreateCampOpen: any;
  setIsCreateCampOpen: any;
  isCampDetailOpen: any;
  setIsCampDetailOpen: any;
  connectWallet: boolean;
  setConnectWallet: any;
  setIsCreateProfile: any;
  isCreateProfile: any;
}>({
  setDrawerTitle: undefined,
  drawerTitle: "",
  drawerBody: "",
  setDrawerBody: undefined,
  closeDrawer: undefined,
  drawerIsOpen: false,
  setDrawerIsOpen: undefined,
  passDrawerParams: undefined,
  isCreateCampOpen: false,
  setIsCreateCampOpen: undefined,
  isCampDetailOpen: undefined,
  setIsCampDetailOpen: undefined,
  connectWallet: undefined,
  setConnectWallet: undefined,
  setIsCreateProfile: undefined,
  isCreateProfile: false,
});

export const useUserContext = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerBody, setDrawerBody] = useState("");
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isCreateCampOpen, setIsCreateCampOpen] = useState(false);
  const [isCampDetailOpen, setIsCampDetailOpen] = useState(false);
  const [connectWallet, setConnectWallet] = useState(false);
  const [isCreateProfile, setIsCreateProfile] = useState(false);
  const closeDrawer = () => {
    setDrawerTitle("");
    setDrawerBody("");
    setDrawerIsOpen(false);
  };

  const passDrawerParams = (data: DrawerParam) => {
    setDrawerTitle(data.title);
    setDrawerBody(data.body);
    setDrawerIsOpen(true);
  };

  return {
    drawerTitle,
    setDrawerTitle,
    drawerBody,
    setDrawerBody,
    closeDrawer,
    drawerIsOpen,
    setDrawerIsOpen,
    passDrawerParams,
    isCreateCampOpen,
    setIsCreateCampOpen,
    isCampDetailOpen,
    setIsCampDetailOpen,
    connectWallet,
    setConnectWallet,
    setIsCreateProfile,
    isCreateProfile,
  };
};

export const UserContextProvider = ({ children }) => {
  const auth = useUserContext();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useClient = () => useContext(UserContext);
