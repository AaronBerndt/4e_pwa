import useToggle from "../hooks/useToggleOpen";
import {
  ListItemButton,
  SwipeableDrawer,
} from "../node_modules/@mui/material/index";
import { DisplayCard } from "./DisplayCard";
export function ListItemDrawer({ content }) {
  const { open, toggleOpen } = useToggle();
  return (
    <>
      <ListItemButton onClick={toggleOpen}>{content.name}</ListItemButton>
      <SwipeableDrawer open={open} onClose={toggleOpen} onOpen={() => null}>
        <DisplayCard htmlToRender={content.html} />
      </SwipeableDrawer>
    </>
  );
}
