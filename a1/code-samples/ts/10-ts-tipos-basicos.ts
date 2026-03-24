// Exemplo 10: tipos basicos em TypeScript

const nome: string = "Marina";
const idade: number = 31;
const ativo: boolean = true;
const tags: string[] = ["frontend", "react", "ts"];

type Perfil = {
  nome: string;
  idade: number;
  ativo: boolean;
};

const perfil: Perfil = {
  nome,
  idade,
  ativo,
};

function resumirPerfil(p: Perfil): string {
  return `${p.nome} (${p.idade}) - ativo: ${p.ativo}`;
}

console.log(tags.join(", "));
console.log(resumirPerfil(perfil));
