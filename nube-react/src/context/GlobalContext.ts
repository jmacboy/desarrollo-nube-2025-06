import { createContext } from "react";
import type { LocalNotification } from "../models/LocalNotification";

type GlobalContextType = {
  notifications: Array<LocalNotification>;
  addNotification: (notification: LocalNotification) => void;
};
export const GlobalContext = createContext<GlobalContextType>({
  notifications: [],
  addNotification: () => {},
});
