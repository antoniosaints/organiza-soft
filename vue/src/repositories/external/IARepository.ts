import fs from "fs";
import { OpenAIService } from "@/services/external/openai";
import { IMessageIA } from "@/types/external/IMessageIA";

export class IARepository {
  static Conversations: IMessageIA[] = [
    {
      role: "system",
      content:
        "Meu nome é Saints, sou um assistente de sistema para ajudar pessoas a organizar e melhorar a experiencia e dar dicas finaceiras e estatísticas.Responsa as mensagens usando HTML, pois preciso da resposta nesse formato, assim, pode usar <ul> para listas, <h1> para titulos e etc",
    },
  ];
  static async getIAResponse(conversation: IMessageIA[]): Promise<any> {
    const get_delivery_date = (order_id: string) => {
      alert(`Você esta tentando acessar informaçõe sobre o pedido ${order_id}`);
    }
    const response = await OpenAIService.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversation,
      tools: [
        {
          type: "function",
          function: {
            name: "get_delivery_date",
            description:
              "Get the delivery date for a customer's order. Call this whenever you need to know the delivery date, for example when a customer asks 'Where is my package'",
            parameters: {
              type: "object",
              properties: {
                order_id: {
                  type: "string",
                  description: "The customer's order ID.",
                },
              },
              required: ["order_id"],
              additionalProperties: false,
            },
          },
        },
      ],
    });
    
    if (response.choices[0].message.tool_calls) {
      const function_name = response.choices[0].message.tool_calls[0].function.name;
      const function_arguments = JSON.parse(response.choices[0].message.tool_calls[0].function.arguments);
      if (function_name == "get_delivery_date") {
        get_delivery_date(function_arguments.order_id);
      }

      return {
        role: "assistant",
        content: `O seu pedido é ${function_arguments.order_id}`,
      }
    }

    return response.choices[0].message;
  }

  static async getIAResponseStream(conversation: IMessageIA[]): Promise<any> {
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
