import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useClient } from "@/context";
import { SignupFormDemo } from "./Form";

const Drawer = ({ isCreateCampOpen }) => {
  const { closeDrawer } = useClient();
  return (
    <DrawerRoot
      size="lg"
      open={isCreateCampOpen}
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
          <DrawerTitle fontSize={"2xl"}>Create Campaign</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <SignupFormDemo />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Drawer;
