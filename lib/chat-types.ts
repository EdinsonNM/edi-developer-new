export type ChatRequestBody = {
  userInput: string;
  messagesForApi: { role: "user" | "model"; parts: Array<{ text: string }> }[];
  language: "es" | "en";
};
