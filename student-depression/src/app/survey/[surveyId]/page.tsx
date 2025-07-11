'use client';

import { useParams } from 'next/navigation';
import SurveyInit from "../../../../public/svgs/survey-init";
import { useContext, useEffect, useState } from 'react';
import { SurveyQuestionContext, SurveyDispatchContext } from '../../context/survey_context';
import { useRouter } from "next/navigation";

export default function SurveyQuestionPage() {
    const params = useParams();
    const surveyId = params.surveyId as string;
    const router = useRouter();
    const questions = useContext(SurveyQuestionContext);
    const dispatch = useContext(SurveyDispatchContext);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Busca a pergunta específica pelo surveyId da URL
    const question = questions.find(q => q.id === surveyId);

    useEffect(() => {
        setSelectedOption(question?.response || null);
    }, [question]);

    const handleNext = async () => {
        if (!selectedOption || !question) return;

        dispatch?.({
            type: 'update_response',
            questionId: question.id,
            response: selectedOption
        });

        const currentIndex = questions.findIndex(q => q.id === question.id);
        const nextQuestion = questions[currentIndex + 1];

        if (nextQuestion) {
            setSelectedOption(null); // Reseta a seleção
            router.push(`/survey/${nextQuestion.id}`);
        } else {
            router.push('/survey/processing');
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

            {
                question.buildWidget(
                    {
                        onChange: (value: string) => {
                            setSelectedOption(value);
                        }
                    }
                )
            }

            <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`fixed bottom-0 w-full py-3 text-white font-semibold text-2xl transition-colors ${selectedOption
                    ? 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'
                    : 'bg-indigo-400 cursor-not-allowed'
                    }`}
            >
                Próximo
            </button>
        </div>
    );
}