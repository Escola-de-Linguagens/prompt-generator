import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PromptLevel, FormDataBasic, FormDataInter, FormDataAdv } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Wand2 } from 'lucide-react';

interface LevelFormProps {
  level: PromptLevel;
  formData: FormDataBasic | FormDataInter | FormDataAdv;
  onFormDataChange: (data: FormDataBasic | FormDataInter | FormDataAdv) => void;
  onGenerate: () => void;
  isFormValid: boolean;
}

const FieldWithTooltip: React.FC<{
  id: string;
  label: string;
  tooltip?: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ id, label, tooltip, required, children }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {children}
    </div>
  );
};

const LevelForm: React.FC<LevelFormProps> = ({
  level,
  formData,
  onFormDataChange,
  onGenerate,
  isFormValid
}) => {
  const handleInputChange = (field: string, value: string) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const renderBasicFields = () => (
    <>
      <FieldWithTooltip
        id="papel"
        label="Papel"
        tooltip="Defina o papel que a IA deve assumir (ex: copywriter, professor, consultor)"
        required
      >
        <Input
          id="papel"
          placeholder="Ex: especialista em marketing digital"
          value={formData.papel}
          onChange={(e) => handleInputChange('papel', e.target.value)}
          className="w-full"
        />
      </FieldWithTooltip>

      <FieldWithTooltip
        id="tarefa"
        label="Tarefa"
        tooltip="Descreva claramente o que você quer que seja feito"
        required
      >
        <Textarea
          id="tarefa"
          placeholder="Ex: Criar um plano de conteúdo para redes sociais"
          value={formData.tarefa}
          onChange={(e) => handleInputChange('tarefa', e.target.value)}
          className="w-full min-h-[100px]"
        />
      </FieldWithTooltip>

      <FieldWithTooltip
        id="contexto"
        label="Contexto"
        tooltip="Forneça informações relevantes sobre a situação, público-alvo, objetivos, etc."
        required
      >
        <Textarea
          id="contexto"
          placeholder="Ex: Para uma empresa de tecnologia B2B, focando em LinkedIn e Instagram"
          value={formData.contexto}
          onChange={(e) => handleInputChange('contexto', e.target.value)}
          className="w-full min-h-[100px]"
        />
      </FieldWithTooltip>
    </>
  );

  const renderIntermediateFields = () => {
    const interData = formData as FormDataInter;
    return (
      <>
        <FieldWithTooltip
          id="formatoSaida"
          label="Formato de Saída"
          tooltip="Especifique como a resposta deve ser estruturada (lista, tabela, parágrafos, etc.)"
          required
        >
          <Textarea
            id="formatoSaida"
            placeholder="Ex: Lista com 10 ideias, cada uma com título, descrição e hashtags sugeridas"
            value={interData.formatoSaida || ''}
            onChange={(e) => handleInputChange('formatoSaida', e.target.value)}
            className="w-full min-h-[80px]"
          />
        </FieldWithTooltip>

        <FieldWithTooltip
          id="restricoes"
          label="Restrições"
          tooltip="Defina limitações, proibições ou diretrizes específicas"
          required
        >
          <Textarea
            id="restricoes"
            placeholder="Ex: Máximo 280 caracteres por post, evitar linguagem muito técnica, incluir call-to-action"
            value={interData.restricoes || ''}
            onChange={(e) => handleInputChange('restricoes', e.target.value)}
            className="w-full min-h-[80px]"
          />
        </FieldWithTooltip>
      </>
    );
  };

  const renderAdvancedFields = () => {
    const advData = formData as FormDataAdv;
    return (
      <FieldWithTooltip
        id="dicas"
        label="Dicas Adicionais"
        tooltip="Informações extras que podem ajudar a IA a entregar um resultado ainda melhor"
      >
        <Textarea
          id="dicas"
          placeholder="Ex: Foque em tendências atuais, use tom conversacional, inspire-se em cases de sucesso"
          value={advData.dicas || ''}
          onChange={(e) => handleInputChange('dicas', e.target.value)}
          className="w-full min-h-[80px]"
        />
      </FieldWithTooltip>
    );
  };

  const levelTitles = {
    basico: 'Formulário Básico',
    intermediario: 'Formulário Intermediário',
    avancado: 'Formulário Avançado'
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-xl">{levelTitles[level]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {renderBasicFields()}
          
          <AnimatePresence mode="wait">
            {(level === 'intermediario' || level === 'avancado') && (
              <motion.div
                key="intermediate"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 border-t pt-4"
              >
                {renderIntermediateFields()}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {level === 'avancado' && (
              <motion.div
                key="advanced"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-4 border-t pt-4"
              >
                {renderAdvancedFields()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-4 border-t">
          <Button
            onClick={onGenerate}
            disabled={!isFormValid}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Gerar Prompt
          </Button>
          {!isFormValid && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Preencha todos os campos obrigatórios para gerar o prompt
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelForm;
