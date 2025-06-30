import { Suspense, useContext } from "react";
import { QuestionRepository } from "../repository/question_respository";
import SurveyResponseCounter from "./survey_response_counter";

export default function SurveyHeader() {
    const questionRespository = QuestionRepository.instance;
    const questions = questionRespository.fetch();
    return (
        <Suspense>
            <SurveyResponseCounter questions={questions} />
        </Suspense>
    )
}