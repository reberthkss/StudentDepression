'use client';

import SurveyInit from "../../../public/svgs/survey-init";
import { useContext, useEffect, useState } from 'react';
import { SurveyResponseContext, SurveyDispatchContext } from '../context/survey_context';
import { QuestionRepository } from '../repository/question_respository';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const questions = useContext(SurveyResponseContext);
  const dispatch = useContext(SurveyDispatchContext);
  const repo = QuestionRepository.instance;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Busca a pergunta específica (ID 1 - Gênero)
  const question = questions.find(q => q.id === "1");
  useEffect(() => {
    const loadQuestions = async () => {
      if (questions.length === 0) {
        const fetchedQuestions = await repo.fetch();
        dispatch?.({ type: 'save_fetch', questions: fetchedQuestions });
      }
      setIsLoading(false);
    };
    loadQuestions();
  }, []);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = async () => {
    if (!selectedOption || !question) return;

    // Atualiza no repositório e contexto
    await repo.updateResponse(question.id, selectedOption);
    dispatch?.({
      type: 'update_response',
      questionId: question.id,
      response: selectedOption
    });

    // Navega para a próxima pergunta (ID 2)
    router.push("/");
  };

  if (isLoading) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  if (!question) {
    return <div className="text-center p-8">PergunAAAA encontrada</div>;
  }

  return (
    <div className="flex flex-col">
      <div>
        <SurveyInit className="justify-self-center w-50 h-100" />
      </div>

      <div className="flex-1 p-6 mt-4">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {question.title}
        </h2>
        {question.description && (
          <p className="text-sm text-gray-500 mb-4 text-center dark:text-gray-400">
            {question.description}
          </p>
        )}

        <div className="space-y-4 mx-auto max-w-md">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedOption === option.value ? 'bg-indigo-50 dark:bg-indigo-900' : ''
                }`}
            >
              <input
                type="radio"
                name="gender"
                className="h-5 w-5 text-indigo-600"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => handleOptionSelect(option.value)}
              />
              <span className="dark:text-white">{option.value}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedOption}
        className={`fixed bottom-0 w-full py-3 text-white font-semibold text-2xl transition-colors ${selectedOption
            ? 'bg-indigo-600 hover:bg-indigo-500'
            : 'bg-indigo-400 cursor-not-allowed'
          }`}
      >
        Próximo
      </button>
    </div>
  );
}