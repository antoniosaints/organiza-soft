import { ChatCompletionMessage, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { getInfosAccountByID } from "./callables/getInfoAccountByID";
import { getUserByID } from "./callables/getUserByID";
import { saveVendaIntoDatabase } from "./callables/saveVenda";
import { changeColorMode } from "./callables/changeColorMode";
import { createUsuarioAI } from "./callables/usuarios/createUsuarioAI";

export const registerFunctionsIA = async (response: ChatCompletionMessage): Promise<ChatCompletionMessageParam | false> => {
  if (response.tool_calls) {
    const function_name = response.tool_calls[0].function.name;
    if (function_name == "getInfosAccountByID") return await getInfosAccountByID(response);
    if (function_name == "getUserByID") return await getUserByID(response);
    if (function_name == "saveVendaIntoDatabase") return await saveVendaIntoDatabase(response);
    if (function_name == "changeColorMode") return await changeColorMode(response);
    if (function_name == "createUsuarioAI") return await createUsuarioAI(response);
    else return false
  }
  return false;
};
