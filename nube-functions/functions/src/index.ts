/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import {UserRepository} from "./repositories/UserRepository";
import {NotificationsRepository} from "./repositories/NotificationsRepository";
import cors from "cors";
import {
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated,
} from "firebase-functions/firestore";
// import {analytics} from "firebase-functions/v1";
// import {ProductRepository} from "./repositories/ProductRepository";
import {MailRepository} from "./repositories/MailRepository";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
const corsHandler = cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
});

export const subscribeToTopic = onRequest((request, response) =>
  corsHandler(request, response, async () => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }
    const {topic, userId} = request.body;
    if (!topic || !userId) {
      response.status(400).send("Bad Request: Missing topic or userId");
      return;
    }
    const repository = new UserRepository(admin.firestore());
    const userProfile = await repository.getProfileById(userId);
    if (!userProfile) {
      response.status(404).send("Not Found: User profile not found");
      return;
    }
    if (
      !userProfile.notificationTokens ||
      userProfile.notificationTokens.length === 0
    ) {
      response
        .status(400)
        .send("Bad Request: No notification tokens found for user");
      return;
    }
    try {
      await repository.subscribeToTopic(userProfile, topic);
      logger.info(`Successfully subscribed user ${userId} to topic ${topic}`);
      response.status(200).send({
        success: true,
      });
    } catch (error) {
      logger.error("Error subscribing to topic:", error);
      response
        .status(500)
        .send("Internal Server Error: Failed to subscribe to topic");
    }
  }),
);
export const sendMessageToTopic = onRequest((request, response) =>
  corsHandler(request, response, async () => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }
    const {topic, title, body} = request.body;
    if (!topic || !title || !body) {
      response.status(400).send("Bad Request: Missing topic, title, or body");
      return;
    }
    new NotificationsRepository()
      .sendMessageToTopic(topic, title, body)
      .then((res) => {
        logger.info("Message sent successfully:", res);
        response.status(200).send({
          success: true,
        });
      })
      .catch((error) => {
        logger.error("Error sending message:", error);
        response
          .status(500)
          .send("Internal Server Error: Failed to send message");
      });
  }),
);
export const sendNewMessageNotification = onRequest(
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }
    const {title, body, userId} = request.body;
    if (!title || !body || !userId) {
      response.status(400).send("Bad Request: Missing title, body, or userId");
      return;
    }
    const repository = new UserRepository(admin.firestore());
    const userProfile = await repository.getProfileById(userId);
    if (!userProfile) {
      response.status(200).send({
        success: true,
      });
      return;
    }

    const payload = {
      tokens: userProfile.notificationTokens,
      notification: {
        title: title,
        body: body,
      },
    };

    const res = await admin.messaging().sendEachForMulticast(payload);
    if (!res) {
      response
        .status(500)
        .send("Internal Server Error: Failed to send message");
      return;
    }
    logger.info("Sending message:", payload);
    logger.info("Message sent successfully:", res);
    response.status(200).send({
      success: true,
    });
  },
);
export const notifyAdminsOnContactCreation = onDocumentCreated(
  "contacts/{contactId}",
  (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }
    const data = snapshot.data();
    new NotificationsRepository()
      .sendMessageToTopic(
        "contactNotifications",
        "Contact added",
        "Added contact " + data.name + " " + data.lastName,
      )
      .then((res) => {
        logger.info("Message sent successfully:", res);
      })
      .catch((error) => {
        logger.error("Error sending message:", error);
      });
    admin
      .auth()
      .getUser(data.ownerId)
      .then((fbUser) => {
        new MailRepository()
          .sendMail(
            fbUser.email || "",
            "New Contact Added",
            `A new contact has been added: ${data.name} ${data.lastName}.`,
            `<strong>contact added: ${data.name} ${data.lastName}.</strong>`,
          )
          .then(() => {
            logger.info("Email sent successfully to:", fbUser.email);
          })
          .catch((error) => {
            logger.error("Error sending email:", error);
          });
      })
      .catch((error) => {
        logger.error("Error getting user by email:", error);
      });
  },
);
export const notifyAdminsOnContactUpdate = onDocumentUpdated(
  "contacts/{contactId}",
  (event) => {
    if (!event.data || !event.data.after) {
      console.log("No data associated with the event");
      return;
    }
    const data = event.data.after.data();
    new NotificationsRepository()
      .sendMessageToTopic(
        "contactNotifications",
        "Contact updated",
        "Updated contact " + data.name + " " + data.lastName,
      )
      .then((res) => {
        logger.info("Message sent successfully:", res);
      })
      .catch((error) => {
        logger.error("Error sending message:", error);
      });
  },
);
export const notifyAdminsOnContactDelete = onDocumentDeleted(
  "contacts/{contactId}",
  (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }
    const data = snapshot.data();
    new NotificationsRepository()
      .sendMessageToTopic(
        "contactNotifications",
        "Contact deleted",
        "Deleted contact " + data.name + " " + data.lastName,
      )
      .then((res) => {
        logger.info("Message sent successfully:", res);
      })
      .catch((error) => {
        logger.error("Error sending message:", error);
      });
  },
);
// export const sendInterestedMail = analytics
//   .event("exit_product_detail")
//   .onLog(async (event) => {
//     const user = event.user;
//     const userId = user?.userId;
//     const productSlug = event.params?.productSlug;
//     if (!userId || !productSlug) {
//       logger.error("Missing userId or productSlug in event data");
//       return;
//     }
//     const theProduct = await new ProductRepository(
//       admin.firestore(),
//     ).getProductBySlug(productSlug);
//     if (!theProduct) {
//       logger.error(`Product with slug ${productSlug} not found`);
//       return;
//     }
//     const userRepository = new UserRepository(admin.firestore());
//     const userProfile = await userRepository.getProfileById(userId);
//     if (!userProfile) {
//       logger.error(`User profile with ID ${userId} not found`);
//       return;
//     }
//     const fbUser = await admin.auth().getUser(userId);
//     if (!fbUser) {
//       logger.error(`Firebase user with ID ${userId} not found`);
//       return;
//     }
//     new MailRepository().sendMail(
//       fbUser.email || "j.m.alvarez.camacho@gmail.com",
//       "Product Interest Notification",
//       `You have shown interest in the product: ${theProduct.name}.`,
//       // eslint-disable-next-line max-len
//       `<strong>You have shown interest in the product:
// ${theProduct.name}.</strong>`,
//     );
//   });
