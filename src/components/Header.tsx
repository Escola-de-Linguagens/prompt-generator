import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Gerador de Prompts
          </h1>
          <p className="text-sm text-gray-600">
            Do básico ao avançado
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
