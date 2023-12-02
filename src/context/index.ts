import { useContext } from "react";
import { root, rootDispatch } from "./Root";

export const useRoot = () => {
  const context = useContext(root);

  if (context === undefined) {
    throw new Error("useRoot must be used within a RootProvider");
  }

  return context;
};

export const useRootDispatch = () => {
  const context = useContext(rootDispatch);

  if (context === undefined) {
    throw new Error("useRootDispatch must be used within a RootProvider");
  }

  return context;
};
