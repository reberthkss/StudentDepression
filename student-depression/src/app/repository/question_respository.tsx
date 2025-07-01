import { questions } from "./question_data_source_response";
import { QuestionInterface } from '../model/question';
export interface QuestionRepositoryInterface {
    fetch(): Promise<QuestionInterface[]>
    updateResponse(questionId: string, response: string): Promise<void>;
}

export class QuestionRepository implements QuestionRepositoryInterface {
    private constructor() { }
    static instance = new QuestionRepository();

    async fetch(): Promise<QuestionInterface[]> {
        return [...questions];
    }
    async updateResponse(questionId: string, response: string): Promise<void> {
        console.log(`Response updated: Q${questionId} = ${response}`);
    }
}