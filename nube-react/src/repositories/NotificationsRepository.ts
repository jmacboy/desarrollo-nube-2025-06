import axios from "axios";

export class NotificationsRepository {
  sendMessageToTopic(
    topic: string,
    title: string,
    body: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      axios
        .post("https://sendmessagetotopic-hwdpxx5abq-uc.a.run.app", {
          topic: topic,
          title: title,
          body: body,
        })
        .then(() => {
          console.log(`Message sent to topic ${topic}`);
          resolve();
        })
        .catch((error) => {
          console.error("Error sending message to topic:", error);
          reject(error);
        });
    });
  }
}
