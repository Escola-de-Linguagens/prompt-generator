import { PromptLevel, FormDataBasic, FormDataInter, FormDataAdv } from '@/types';

export function usePromptGenerator() {
  const generatePrompt = (level: PromptLevel, formData: FormDataBasic | FormDataInter | FormDataAdv): string => {
    const { papel, tarefa, contexto } = formData;

    switch (level) {
      case 'basico':
        return `Você é um ${papel}. ${tarefa}. 

Contexto: ${contexto}`;

      case 'intermediario': {
        const { formatoSaida, restricoes } = formData as FormDataInter;
        return `# Papel
Você é um ${papel}.

# Tarefa
${tarefa}

# Contexto
${contexto}

# Formato de Saída
${formatoSaida}

# Restrições
${restricoes}`;
      }

      case 'avancado': {
        const { formatoSaida, restricoes, dicas } = formData as FormDataAdv;
        return `# 🎯 Papel
Você é um ${papel} experiente e especializado.

# 📋 Tarefa Principal
${tarefa}

# 🔍 Contexto Detalhado
${contexto}

# 📄 Formato de Saída Esperado
${formatoSaida}

# ⚠️ Restrições e Limitações
${restricoes}

${dicas ? `# 💡 Dicas Adicionais
${dicas}

` : ''}# 🚀 Instruções de Execução
1. Analise cuidadosamente todos os elementos fornecidos
2. Mantenha o foco na qualidade e precisão
3. Siga rigorosamente as restrições estabelecidas
4. Forneça uma resposta estruturada e completa`;
      }

      default:
        return '';
    }
  };

  return { generatePrompt };
}
