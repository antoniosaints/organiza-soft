import { changeColorModeTool } from "./callables/changeColorMode";
import { getIdAccountTool } from "./callables/getInfoAccountByID";
import { getUserByIDTool } from "./callables/getUserByID";
import { saveVendaIntoDatabaseTool } from "./callables/saveVenda";
import { createUsuarioAITool } from "./callables/usuarios/createUsuarioAI";

export const getToolsIA = () => {
  return [
    getIdAccountTool, 
    getUserByIDTool, 
    saveVendaIntoDatabaseTool, 
    changeColorModeTool, 
    createUsuarioAITool
  ];
};
