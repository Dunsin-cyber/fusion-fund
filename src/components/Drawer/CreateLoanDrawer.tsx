import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useClient } from "@/context";
import { CreateLoan } from "./CreateLoan";

const Drawer = ({ isLoanModalOpen }) => {
  const { closeDrawer } = useClient();
  return (
    <DrawerRoot
      size="full"
      open={isLoanModalOpen}
      onOpenChange={closeDrawer}
      placement={"bottom"}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" style={{ display: "none" }}>
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent roundedTop={"25"} roundedBottom={undefined}>
        <DrawerHeader>
          <DrawerTitle fontSize={"2xl"}>Create Loan Request</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <CreateLoan />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Drawer;
