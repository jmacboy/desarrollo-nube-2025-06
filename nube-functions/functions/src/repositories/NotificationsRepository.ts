import {getMessaging} from "firebase-admin/messaging";

/**
 * Repository for sending notifications using Firebase Cloud Messaging.
 */
export class NotificationsRepository {
  /**
   * Sends a notification message to a specific topic.
   * @param {string} topic - The topic to which the message will be sent.
   * @param {string} title - The title of the notification.
   * @param {string} body - The body text of the notification.
   * @return {Promise<string>} A promise that resolves with the response
   * from Firebase or rejects with an error.
   */
  sendMessageToTopic(
    topic: string,
    title: string,
    body: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = {
        topic: topic,
        notification: {
          title: title,
          body: body,
        },
      };
      getMessaging()
        .send(payload)
        .then((response) => {
          console.log("Message sent successfully:", response);
          resolve(response);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          reject(error);
        });
    });
  }
}
