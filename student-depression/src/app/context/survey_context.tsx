import { ActionDispatch, AnyActionArg, createContext } from "react";

export const SurveyResponseContext = createContext<Question[]>([]);
export const SurveyDispatchContext = createContext<ActionDispatch<any> | null>(null);

export function surveyReducer(questions: Question[], action: {type: string, questions: Question[]}) : Question[] {
    switch (action.type) {
        case 'save_fetch': {
            return questions;
        }
    }
    return [];
}
