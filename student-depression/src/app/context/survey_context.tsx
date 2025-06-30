import { ActionDispatch, AnyActionArg, createContext } from "react";

export const SurveyResponseContext = createContext<QuestionInterface[]>([]);
export const SurveyDispatchContext = createContext<ActionDispatch<any> | null>(null);

export function surveyReducer(questions: QuestionInterface[], action: {type: string, questions: QuestionInterface[]}) : QuestionInterface[] {
    switch (action.type) {
        case 'save_fetch': {
            return questions;
        }
    }
    return [];
}
