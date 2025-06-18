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
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
export const sendNewMessageNotification = onRequest(
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }
    const {title, body, token} = request.body;
    if (!title || !body || !token) {
      response.status(400).send("Bad Request: Missing title, body, or token");
      return;
    }
    const payload = {
      token:
        token,
      notification: {
        title: title,
        body: body,
      },
    };

    const res = await admin.messaging().send(payload);
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
  }
);
