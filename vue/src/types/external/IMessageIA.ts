export interface IMessageIA {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
}
