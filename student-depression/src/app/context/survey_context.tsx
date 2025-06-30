import { ActionDispatch, createContext } from "react";

export const SurveyResponseContext = createContext<Question[]>([]);
export const SurveyDispatchContext = createContext<ActionDispatch<any> | null>(null);

export function surveyReducer(questions: Question[], actions: {}) : Question[] {
    return [];
}
