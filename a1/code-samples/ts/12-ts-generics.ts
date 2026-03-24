// Exemplo 12: generics para funcoes e estruturas reutilizaveis

function primeiro<T>(itens: T[]): T | undefined {
  return itens[0];
}

function agruparPor<T, K extends string | number>(
  itens: T[],
  seletor: (item: T) => K
): Record<K, T[]> {
  return itens.reduce((acc, item) => {
    const chave = seletor(item);
    if (!acc[chave]) {
      acc[chave] = [];
    }
    acc[chave].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

type Aluno = { nome: string; turma: string };

const alunos: Aluno[] = [
  { nome: "Ana", turma: "A" },
  { nome: "Bia", turma: "B" },
  { nome: "Cadu", turma: "A" },
];

console.log(primeiro(alunos));
console.log(agruparPor(alunos, (aluno) => aluno.turma));
