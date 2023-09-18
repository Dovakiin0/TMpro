import path from "path";
import { Transporter } from "../config/NodeMailer";
import { IEmailOptions } from "../types/IEmailOptions";

export const sendEmail = async ({
  to,
  subject,
  template,
  context,
}: IEmailOptions) => {
  let transporter = Transporter();
  let email = {
    from: `"${process.env.EMAIL_USER}"`, // sender address
    to,
    subject,
    template,
    context,
    attachments: [
      {
        filename: "full.png",
        path: path.resolve("src/assets/full.png"),
        cid: "tmpro",
      },
    ],
  };
  const info = await transporter.sendMail(email);
  return info;
};

module.exports = {
  sendEmail,
};
