import { ActionDispatch, AnyActionArg, createContext } from "react";
import {QuestionInterface, QuestionResponse} from '../model/question';

type SurveyAction =
  | { type: 'save_fetch'; questions: QuestionInterface[] }
  | { type: 'update_response'; questionId: string; response: string };
export const SurveyResponseContext = createContext<QuestionInterface[]>([]);
export const SurveyDispatchContext = createContext<ActionDispatch<any> | null>(null);

export function surveyReducer(questions: QuestionInterface[], action: SurveyAction): QuestionInterface[] {
    switch (action.type) {
        case 'save_fetch': 
            return [...action.questions];
        case 'update_response':
      return questions.map(q => {
        if (q.id === action.questionId) {
          return {
            ...q,
            response: new QuestionResponse(action.response) // Usa a classe correta
          };
        }
        return q;
      });

    default:
      return questions;
  }
}
