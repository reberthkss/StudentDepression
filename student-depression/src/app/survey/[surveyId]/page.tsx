'use client';

import { useParams } from 'next/navigation';
import SurveyInit from "../../../../public/svgs/survey-init";
import { useContext, useEffect, useState } from 'react';
import { SurveyResponseContext, SurveyDispatchContext } from '../../context/survey_context';
import { QuestionRepository } from '../../repository/question_respository';
import { useRouter } from 'next/navigation';
import { QuestionType } from '@/app/model/question';

export default function SurveyQuestionPage() {
    const params = useParams();
    const surveyId = params.surveyId as string;
    const router = useRouter();
    const questions = useContext(SurveyResponseContext);
    const dispatch = useContext(SurveyDispatchContext);
    const repo = QuestionRepository.instance;

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

       // Busca a pergunta específica pelo surveyId da URL
    const question = questions.find(q => q.id === surveyId);
    
    useEffect(() => {
        setSelectedOption(question?.response?.value || null);
    }, [question]);
   
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                if (questions.length === 0) {
                    const fetchedQuestions = await repo.fetch();
                    dispatch?.({ type: 'save_fetch', questions: fetchedQuestions });
                }
            } catch (error) {
                console.error("Failed to load questions:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadQuestions();
    }, [dispatch, repo, questions.length]);

    useEffect(() => {
        if (!question && !isLoading && questions.length > 0) {
            router.push('/survey/1');
        }
    }, [question, isLoading, questions.length, router]);

    const handleOptionSelect = (value: string) => {
        setSelectedOption(value);
    };

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

    if (isLoading) {
        return <div className="text-center p-8">Carregando...</div>;
    }

    if (!question) {
        return <div className="text-center p-8">Pergunta não encontrada</div>;
    }

    return (
        <div className="flex flex-col min-h-screen pb-16">
            <div className="flex justify-center mt-8">
                <SurveyInit className="w-50 h-100" />
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
                    {question.type === QuestionType.option ? (
                        // Renderização para perguntas de múltipla escolha
                        <div className="space-y-4">
                            {question.options?.map((option, index) => (
                                <label key={index} className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name={`q-${question.id}`}
                                        value={option.value}
                                        onChange={() => setSelectedOption(option.value)}
                                    />
                                    <span>{option.value}</span>
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