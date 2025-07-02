'use client'

import { ActionDispatch, createContext, Suspense, use, useReducer } from "react";
import { QuestionInterface, QuestionResponse } from '../model/question';
import { QuestionRepository } from "../repository/question_respository";

type SurveyAction =
  | { type: 'save_fetch', questions: QuestionInterface[] }
  | { type: 'update_response', questionId: string, response: string };
export const SurveyQuestionContext = createContext<QuestionInterface[]>([]);
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

export function SurveyProvider({ children }: { children: any }) {
  const repo = QuestionRepository.instance;
  const questions = repo.fetch();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SurveyConsumer questions={questions}>
        {children}
      </SurveyConsumer>
    </Suspense>
  )
}

export function SurveyConsumer({ children, questions }: { children: any, questions: Promise<QuestionInterface[]> }) {
  const allQuestions = use(questions);
  const [initQuestions, surveyDispatch] = useReducer(surveyReducer, allQuestions);

  return (
    <SurveyQuestionContext value={initQuestions}>
      <SurveyDispatchContext value={surveyDispatch}>
        {children}
      </SurveyDispatchContext>
    </SurveyQuestionContext>

  )
} 