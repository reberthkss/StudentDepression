'use client'

import { use, useContext } from "react"
import { SurveyDispatchContext, SurveyResponseContext } from "../context/survey_context";

export default function SurveyResponseCounter({questions}: {questions: Promise<Question[]>}) {
    // const allQuestions = use(questions);
    // const questionDispatch = useContext(SurveyDispatchContext);
    const questionsResponse = useContext(SurveyResponseContext);
    
    return (
        <div className="h-10 m-2 content-center">
            <p className="text-center dark:text-white">Você possui 0 questões de {questionsResponse.length} respondidas</p>
        </div>
    )
}