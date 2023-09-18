import nodemailer from "nodemailer";
import * as path from "path";
import hbs from "nodemailer-express-handlebars";

export const Transporter = () => {
  let transporter;
  if (process.env.NODE_ENV === "development") {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  const handleBarsOptions: hbs.NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      partialsDir: path.resolve("src/templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve("src/templates"),
  };

  transporter.use("compile", hbs(handleBarsOptions));
  return transporter;
};
