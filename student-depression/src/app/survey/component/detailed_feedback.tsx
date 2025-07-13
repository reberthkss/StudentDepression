import React from 'react';

export interface FeatureFeedback {
  feature: string;
  user_value: string;
  importance: number;
  impact_level: 'BAIXO' | 'MODERADO' | 'ALTO' | 'MUITO ALTO' | 'CRÍTICO';
  message: string;
  context: string;
}

interface DetailedFeedbackProps {
  featureFeedback: FeatureFeedback[];
}

const DetailedFeedback: React.FC<DetailedFeedbackProps> = ({ featureFeedback }) => {
  const getImpactColor = (level: string) => {
    switch (level) {
      case 'CRÍTICO':
        return 'bg-red-600 text-white';
      case 'MUITO ALTO':
        return 'bg-red-500 text-white';
      case 'ALTO':
        return 'bg-orange-500 text-white';
      case 'MODERADO':
        return 'bg-yellow-500 text-white';
      case 'BAIXO':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getImpactIcon = (level: string) => {
    switch (level) {
      case 'CRÍTICO':
        return '🚨';
      case 'MUITO ALTO':
        return '⚠️';
      case 'ALTO':
        return '🔴';
      case 'MODERADO':
        return '🟡';
      case 'BAIXO':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const sortedFeedback = [...featureFeedback].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Análise Detalhada dos Fatores
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Compreenda como cada fator contribuiu para sua avaliação
        </p>
      </div>

      <div className="space-y-4">
        {sortedFeedback.map((feedback, index) => (
          <div 
            key={index}
            className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            {/* Cabeçalho do fator */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {getImpactIcon(feedback.impact_level)}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {feedback.feature}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Valor informado: <span className="font-medium">{feedback.user_value}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Badge do nível de impacto */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getImpactColor(feedback.impact_level)}`}>
                  {feedback.impact_level}
                </span>
                
                {/* Indicador de importância */}
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {Math.abs(feedback.importance).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    importância
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de importância visual */}
            <div className="mb-3">
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    feedback.impact_level === 'CRÍTICO' ? 'bg-red-600' :
                    feedback.impact_level === 'MUITO ALTO' ? 'bg-red-500' :
                    feedback.impact_level === 'ALTO' ? 'bg-orange-500' :
                    feedback.impact_level === 'MODERADO' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ 
                    width: `${Math.min(Math.abs(feedback.importance), 100)}%` 
                  }}
                />
              </div>
            </div>

            {/* Mensagem principal */}
            <div className="mb-3">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {feedback.message}
              </p>
            </div>

            {/* Contexto técnico */}
            <div className="bg-gray-50 dark:bg-gray-600 rounded-md p-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Contexto técnico:
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feedback.context}
              </p>
            </div>

            {/* Alertas especiais para fatores críticos */}
            {feedback.impact_level === 'CRÍTICO' && (
              <div className="mt-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">⚠️ ATENÇÃO:</span>
                  <span className="text-red-700 dark:text-red-300 font-medium">
                    Este é um fator de risco crítico que requer atenção imediata.
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legenda dos níveis de impacto */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Legenda dos Níveis de Impacto
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { level: 'BAIXO', icon: '🟢', desc: 'Impacto mínimo' },
            { level: 'MODERADO', icon: '🟡', desc: 'Impacto moderado' },
            { level: 'ALTO', icon: '🔴', desc: 'Impacto significativo' },
            { level: 'MUITO ALTO', icon: '⚠️', desc: 'Impacto elevado' },
            { level: 'CRÍTICO', icon: '🚨', desc: 'Requer atenção imediata' }
          ].map((item) => (
            <div key={item.level} className="flex items-center space-x-2">
              <span>{item.icon}</span>
              <div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-200">
                  {item.level}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedFeedback;