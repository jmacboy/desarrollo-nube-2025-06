import { BrowserRouter } from "react-router";
import { RouterConfig } from "./routes/RouterConfig";
import { GlobalContext } from "./context/GlobalContext";
import { useState } from "react";
import type { LocalNotification } from "./models/LocalNotification";
import { NotificationsPopup } from "./components/NotificationsPopup";

function App() {
  const [notifications, setNotifications] = useState<Array<LocalNotification>>(
    []
  );
  const addNotification = (notification: LocalNotification) => {
    const newNotifications: Array<LocalNotification> = [
      ...notifications,
      notification,
    ];
    setNotifications(newNotifications);
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n !== notification)
      );
    }, 10000); // Remove notification after 10 seconds
  };
  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          notifications,
          addNotification,
        }}
      >
        <RouterConfig />
        <NotificationsPopup />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
