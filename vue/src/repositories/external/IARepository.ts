import fs from "fs";
import { OpenAIService } from "@/services/external/openai";

export class IARepository {
  static async getIAResponseMessage(question: string): Promise<any> {
    const response = await OpenAIService.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é responsável pra receber uma mensagem e entender o que o usuário quer lançar no sistema`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    return response.choices[0].message;
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
