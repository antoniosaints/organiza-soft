const permissoes = [
  "parcelas",
  "usuarios",
  "grupos",
  "permissoes",
  "assinatura",
  "bloqueio",
  "configuracoes",
  "contas",
  "formas_pagamento",
  "parcelas",
  "plano",
  "transacao",
  "cliente"
];

const assemblyPermissoes = () => {
  const permissoesFormatadas = [];
  for (const permissao of permissoes) {
    const dialetos = [ "Listar", "Criar", "Atualizar", "Deletar"];
    const slugs = ["listar_", "criar_", "atualizar_", "deletar_"];
    for (const dialet of dialetos) {
      permissoesFormatadas.push({ permissao: `${dialet} ${permissao}`, slug: `${slugs[dialetos.indexOf(dialet)]}${permissao}`, status: "ativo" });
    }
  }
  return permissoesFormatadas;
};

export {
  assemblyPermissoes
} 