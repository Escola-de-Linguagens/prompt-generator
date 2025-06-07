import React from 'react';
import { PromptLevel } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Target, Zap } from 'lucide-react';

interface SidebarProps {
  level: PromptLevel;
  onLevelChange: (level: PromptLevel) => void;
}

const levelInfo = {
  basico: {
    icon: Target,
    title: 'Básico',
    description: 'Estrutura simples com papel, tarefa e contexto',
    color: 'text-green-600'
  },
  intermediario: {
    icon: GraduationCap,
    title: 'Intermediário',
    description: 'Adiciona formato de saída e restrições',
    color: 'text-blue-600'
  },
  avancado: {
    icon: Zap,
    title: 'Avançado',
    description: 'Estrutura completa com dicas e instruções detalhadas',
    color: 'text-purple-600'
  }
};

const Sidebar: React.FC<SidebarProps> = ({ level, onLevelChange }) => {
  const currentLevel = levelInfo[level];
  const Icon = currentLevel.icon;

  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Nível do Prompt
        </h2>
        
        <Select value={level} onValueChange={(value) => onLevelChange(value as PromptLevel)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basico">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                Básico
              </div>
            </SelectItem>
            <SelectItem value="intermediario">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                Intermediário
              </div>
            </SelectItem>
            <SelectItem value="avancado">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Avançado
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon className={`w-5 h-5 ${currentLevel.color}`} />
            {currentLevel.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm leading-relaxed">
            {currentLevel.description}
          </CardDescription>
        </CardContent>
      </Card>

      <div className="space-y-3 text-sm text-gray-600">
        <h3 className="font-medium text-gray-900">Dicas de Evolução</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
            <span>Comece sempre pelo nível básico</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
            <span>Seja específico no papel e contexto</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
            <span>Use restrições para controlar a saída</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
