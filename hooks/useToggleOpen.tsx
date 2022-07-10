import { useState } from "react";

export default function useToggle() {
  const [open, setOpen] = useState(false);

  return {
    open,
    toggleOpen: () => setOpen(!open),
  };
}
