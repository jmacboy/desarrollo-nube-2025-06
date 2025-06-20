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
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
export const subscribeToTopic = onRequest(async (request, response) => {
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
});
export const sendMessageToTopic = onRequest(async (request, response) => {
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
});
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
