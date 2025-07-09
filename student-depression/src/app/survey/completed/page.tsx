'use client';

import { SurveyQuestionContext } from "@/app/context/survey_context";
import { SurveyService } from "@/app/data/survey_service";
import { QuestionResponseInterface } from "@/app/model/question";
import { useContext, useEffect } from "react";

export default function SurveyCompleted() {
  const questions = useContext(SurveyQuestionContext);
  const answeredQuestions: QuestionResponseInterface[] = questions.filter(q => q.response !== undefined && q.response !== null).map(q => q.response!);

  useEffect(() => {
    SurveyService.requestFeedback(answeredQuestions).then(response => { console.log("Response => ", response) }).catch(error => { console.log("Error => ", error) });
  }, [])

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Questionário Completo!</h1>
      <p>Obrigado por participar.</p>
    </div>
  );
}