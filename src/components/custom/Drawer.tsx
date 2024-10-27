import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Drawer = ({
  isOpen,
  handleSubmit = () => {},
  closeDrawer,
  drawerTitle,
  drawerBody,
}) => {
  return (
    <DrawerRoot
      size="lg"
      open={isOpen}
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
          <DrawerTitle>{drawerTitle}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>{drawerBody}</DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={closeDrawer}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Drawer;
