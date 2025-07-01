'use client';

import { useParams } from 'next/navigation';
import SurveyInit from "../../../../public/svgs/survey-init";
import { useContext, useEffect, useState } from 'react';
import { SurveyQuestionContext, SurveyDispatchContext } from '../../context/survey_context';
import { QuestionRepository } from '../../repository/question_respository';
import { useRouter } from 'next/navigation';
import { QuestionType } from '@/app/model/question';

export default function SurveyQuestionPage() {
    const params = useParams();
    const surveyId = params.surveyId as string;
    const router = useRouter();
    const questions = useContext(SurveyQuestionContext);
    const dispatch = useContext(SurveyDispatchContext);
    const repo = QuestionRepository.instance;

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

       // Busca a pergunta específica pelo surveyId da URL
    const question = questions.find(q => q.id === surveyId);
    
    useEffect(() => {
        setSelectedOption(question?.response?.value || null);
    }, [question]);

    const handleNext = async () => {
        if ((!selectedOption && question?.type === QuestionType.option) || !question) return;

        // Salva a resposta
        await repo.updateResponse(question.id, selectedOption || '');
        dispatch?.({
            type: 'update_response',
            questionId: question.id,
            response: selectedOption || ''
        });

        // Navegação inteligente
        const currentIndex = questions.findIndex(q => q.id === question.id);
        const nextQuestion = questions[currentIndex + 1];

        if (nextQuestion) {
            setSelectedOption(null); // Reseta a seleção
            router.push(`/survey/${nextQuestion.id}`);
        } else {
            router.push('/survey/completed');
        }
    };

    if (!question) {
        return <div className="text-center p-8">Pergunta não encontrada</div>;
    }

    return (
        <div className="flex flex-col my-16">
            <div className="flex justify-center">
                <SurveyInit className="w-50 h-100" />
            </div>

            <div className="flex-1 p-6 mt-4">
                <h2 className="text-[2rem] font-bold text-center dark:text-white">
                    {question.title}
                </h2>
                {question.description && (
                    <p className="text-[1.3rem] text-indigo-500 mb-4 text-center">
                        {question.description}
                    </p>
                )}

                <div className="space-y-4 mx-auto max-w-md">
                    {question.type === QuestionType.option ? (
                        // Renderização para perguntas de múltipla escolha
                        <div className="space-y-4">
                            {question.options?.map((option, index) => (
                                <label key={index} className="flex items-center space-x-3 font-mono dark:text-white border-3 p-3 rounded-md border-indigo-300">
                                    <input
                                        type="radio"
                                        name={`q-${question.id}`}
                                        value={option.value}
                                        onChange={() => setSelectedOption(option.value)}
                                    />
                                    <span className='font-mono dark:text-white'>{option.value}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        // Renderização para perguntas textuais
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            onChange={(e) => setSelectedOption(e.target.value)}
                            placeholder="Digite sua resposta aqui..."
                        />
                    )}
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