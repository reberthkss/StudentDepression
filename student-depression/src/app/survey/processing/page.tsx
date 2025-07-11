'use client';

import { SurveyQuestionContext } from "@/app/context/survey_context";
import { SurveyService } from "@/app/data/survey_service";
import { useContext, useEffect, useState } from "react";
import { SurveyProcessing } from "../../../../public/svgs/survey-processing";
import { Loading } from "../../../../public/animated/loading";
import SurveyFeedback from "../../../../public/svgs/survey-feedback";
import Link from "next/dist/client/link";

export default function Processing() {
    const [loading, setLoading] = useState<boolean>(true);
    const [depressionProbability, setDepressionProbability] = useState<number | null>(null);
    const questions = useContext(SurveyQuestionContext);
    const answeredQuestions: Record<string, any> = questions
        .filter(q => q.response !== undefined && q.response !== null)
        .sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id))
        .reduce((json, question) => {
            if (question.id == 'age') { 
                const birthDate = new Date(question.response!);
                const today = new Date();
                var age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                     age = (age - 1);
                }
                
                json[question.id] = age.toString();
                return json;
            }

            json[question.id] = question.response;
            return json;
        }, {} as Record<string, any>);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await SurveyService.requestFeedback(answeredQuestions)
                const probabilityToDepression = response.probability[response.prediction] * 100;
                setDepressionProbability(probabilityToDepression);
                setLoading(false);

            } catch (error) {
                // todo
                console.log("Error => ", error)
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="container flex flex-col items-center justify-center h-screen p-4 space-y-4">
                <SurveyProcessing className="w-100 h-100" />
                <h1 className="text-2xl font-bold dark:text-white">Submetendo respostas...</h1>
                <p className="dark:text-white">Estamos analisando e processando sua resposta. Obrigado por participar.</p>
                <Loading />
            </div>
        );
    }

    return (
        <div className="container flex flex-col items-center justify-center h-screen p-4 space-y-4">
            <SurveyFeedback className="w-100 h-100  mb-4" />
            <p className="font-sans text-xl dark:text-white">Suas chances de ter depressão são</p>
            <p className="text-6xl font-mono font-bold dark:text-white"> {depressionProbability?.toFixed(2)} %</p>
            <h1 className="text-xl dark:text-white"></h1>
            <Link href="/" className="px-28 py-2 border-4 border-indigo-700 bg-transparent text-black rounded-md cursor-pointer">
                <span className="font-sans text-md font-medium dark:text-white">
                    Voltar para inicio
                </span>
            </Link>
        </div>
    )


}