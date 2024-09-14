import fs from "fs";
import { OpenAIService } from "@/services/external/openai";

export class IARepository {
  static Conversations: any = [
    {
      role: "system",
      content: "Meu nome é Saints, sou um assistente de sistema para ajudar pessoas a organizar e melhorar a experiencia e dar dicas finaceiras e estatísticas.",
    }
  ];
  static async getIAResponse(question: string): Promise<any> {

    this.Conversations.push({ role: "user", content: question });

    const response = await OpenAIService.chat.completions.create({
      model: "gpt-4o-mini",
      messages: this.Conversations,
    });

    this.Conversations.push({
      role: "assistant",
      content: response.choices[0].message.content,
    })

    return response.choices[0].message;
  }

  static async getIAResponseStream(question: string): Promise<any> {

    this.Conversations.push({ role: "user", content: question })

    const response = await OpenAIService.chat.completions.create({
      model: "gpt-4o-mini",
      messages: this.Conversations,
      stream: true,
    });

    let res = '';
    for await (const chunk of response) res += chunk.choices[0].delta.content || '';

    this.Conversations.push({
      role: "assistant",
      content: res,
    })

    return response;
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
