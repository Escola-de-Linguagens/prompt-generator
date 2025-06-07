import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultCardProps {
  prompt: string;
  onCopy: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ prompt, onCopy }) => {
  const { toast } = useToast();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt copiado!",
        description: "O prompt foi copiado para a área de transferência.",
      });
      onCopy();
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o prompt. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (!prompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6"
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Prompt Gerado
            </CardTitle>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="text-blue-700 border-blue-300 hover:bg-blue-100"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg border border-blue-200 p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {prompt}
            </pre>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Dica:</strong> Copie este prompt e cole na sua IA favorita (ChatGPT, Claude, Gemini, etc.) 
              para obter resultados otimizados!
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
