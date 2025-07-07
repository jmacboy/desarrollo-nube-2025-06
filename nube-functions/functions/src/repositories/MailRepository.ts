/**
 * Repository for sending emails using SendGrid.
 */
import sgMail from "@sendgrid/mail";
import {defineString} from "firebase-functions/params";

/**
 * Repository class for handling email sending operations using SendGrid.
 */
export class MailRepository {
  /**
   * Sends an email using SendGrid.
   * @param {string} toMail - The recipient's email address.
   * @param {string} subject - The subject of the email.
   * @param {string} text - The plain text content of the email.
   * @param {string} html - The HTML content of the email.
   * @return {Promise<void>} A promise that resolves when the email is sent.
   */
  public async sendMail(
    toMail: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const SENDGRID_API_KEY = defineString("SENDGRID_API_KEY").value();
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: toMail,
      from: "info@jmacboy.com",
      subject,
      text,
      html,
    };
    sgMail.send(msg).then(
      () => {
        console.log("Email sent successfully");
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      },
    );

    try {
      await sgMail.send(msg);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}
