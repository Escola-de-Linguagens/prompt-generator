import React, { useState, useEffect } from 'react';
import { PromptLevel, FormDataBasic, FormDataInter, FormDataAdv } from '@/types';
import { usePromptGenerator } from '@/hooks/usePromptGenerator';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LevelForm from '@/components/LevelForm';
import ResultCard from '@/components/ResultCard';

const Home: React.FC = () => {
  const [level, setLevel] = useState<PromptLevel>('basico');
  const [formData, setFormData] = useState<FormDataBasic | FormDataInter | FormDataAdv>({
    papel: '',
    tarefa: '',
    contexto: ''
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const { generatePrompt } = usePromptGenerator();

  // Reset form data when level changes
  useEffect(() => {
    const resetData: FormDataBasic = {
      papel: '',
      tarefa: '',
      contexto: ''
    };

    if (level === 'intermediario') {
      setFormData({
        ...resetData,
        formatoSaida: '',
        restricoes: ''
      } as FormDataInter);
    } else if (level === 'avancado') {
      setFormData({
        ...resetData,
        formatoSaida: '',
        restricoes: '',
        dicas: ''
      } as FormDataAdv);
    } else {
      setFormData(resetData);
    }
    
    setGeneratedPrompt('');
  }, [level]);

  const isFormValid = (): boolean => {
    const { papel, tarefa, contexto } = formData;
    const basicValid = papel.trim() !== '' && tarefa.trim() !== '' && contexto.trim() !== '';

    if (level === 'basico') {
      return basicValid;
    }

    if (level === 'intermediario') {
      const { formatoSaida, restricoes } = formData as FormDataInter;
      return basicValid && formatoSaida.trim() !== '' && restricoes.trim() !== '';
    }

    if (level === 'avancado') {
      const { formatoSaida, restricoes } = formData as FormDataAdv;
      return basicValid && formatoSaida.trim() !== '' && restricoes.trim() !== '';
    }

    return false;
  };

  const handleGenerate = () => {
    if (!isFormValid()) return;
    
    const prompt = generatePrompt(level, formData);
    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    // TODO: Add analytics tracking for copy action
    console.log('Prompt copied successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar level={level} onLevelChange={setLevel} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Mobile Level Selector - TODO: Implement responsive drawer */}
            <div className="lg:hidden">
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <Sidebar level={level} onLevelChange={setLevel} />
              </div>
            </div>

            {/* Form */}
            <LevelForm
              level={level}
              formData={formData}
              onFormDataChange={setFormData}
              onGenerate={handleGenerate}
              isFormValid={isFormValid()}
            />

            {/* Result */}
            <ResultCard
              prompt={generatedPrompt}
              onCopy={handleCopy}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
