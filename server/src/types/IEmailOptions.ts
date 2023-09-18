export interface IEmailOptions {
  to: string;
  subject: string;
  template: string;
  context: { [key: string]: string };
}
