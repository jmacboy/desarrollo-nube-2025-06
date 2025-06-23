import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const NotificationsPopup = () => {
  const { notifications } = useContext(GlobalContext);

  return (
    <div>
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <ul className="list-disc pl-0">
              {notifications.map((notification, index) => (
                <li key={index} className="mb-1 display-block list-none">
                  {notification.body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
