// Tipos para os dados do formulário
export type FormDataBasic = {
  papel: string;
  tarefa: string;
  contexto: string;
};

export type FormDataInter = FormDataBasic & {
  formatoSaida: string;
  restricoes: string;
};

export type FormDataAdv = FormDataInter & {
  dicas?: string;
};

export type PromptLevel = 'basico' | 'intermediario' | 'avancado';

export type FormData = FormDataBasic | FormDataInter | FormDataAdv;
