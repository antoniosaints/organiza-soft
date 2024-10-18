import fs from "fs";
import { OpenAIService } from "@/services/external/openai";
import { getToolsIA } from "./openai/functions/registerToolsIA";
import { registerFunctionsIA } from "./openai/functions/registerFunctionsIA";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export class IARepository {
  static async getIAResponse(conversation: ChatCompletionMessageParam[]): Promise<ChatCompletionMessageParam> {

    const response = await OpenAIService.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversation,
      tools: getToolsIA()
    });
    
    if (response.choices[0].message.tool_calls) {
      const res = await registerFunctionsIA(response.choices[0].message);
      if (res) return res;
      return response.choices[0].message;
    }

    return response.choices[0].message;
  }

  static async getIAResponseStream(conversation: ChatCompletionMessageParam[]): Promise<any> {
    const response = await OpenAIService.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversation,
      stream: true,
    });

    const [stream1, stream2] = response.tee();
    let res = "";

    for await (const chunk of stream1) {
      res += chunk.choices[0].delta.content || "";
    }

    (async () => {
      for await (const _ of stream2) {
        continue;
      }
    })();

    return res; // Retorne a resposta completa
  }

  static async getIAImage(question: string): Promise<any> {
    const response = await OpenAIService.images.generate({
      prompt: question,
      n: 3,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url;
  }

  static async getIATextToSpeech(question: string): Promise<any> {
    const speechFile = `/tmp/${Math.random()}.mp3`;
    const mp3 = await OpenAIService.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: question,
    });
    console.log(speechFile);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
  }

  static async getIAAssistants(): Promise<any> {
    const response = await OpenAIService.beta.assistants.list({
      order: "desc",
      limit: 20,
    });
    return response.data;
  }

  static async createIAAssistant(
    instructions: string,
    name: string,
    model: string = "gpt-4o-mini"
  ): Promise<any> {
    const assistant = await OpenAIService.beta.assistants.create({
      name,
      model,
      instructions,
    });

    return assistant;
  }

  static async updateIAAssistant(
    id: string,
    instructions: string,
    name: string,
    model: string = "gpt-4o-mini"
  ): Promise<any> {
    const assistant = await OpenAIService.beta.assistants.update(id, {
      name,
      model,
      instructions,
    });

    return assistant;
  }

  static async deleteIAAssistant(id: string): Promise<any> {
    const assistant = await OpenAIService.beta.assistants.del(id);
    return assistant;
  }
}
