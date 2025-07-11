import { QuestionBase } from "../model";
import { questions } from "./question_data_source";

export interface QuestionRepositoryInterface {
    fetch(): Promise<QuestionBase[]>
}

export class QuestionRepository implements QuestionRepositoryInterface {
    private constructor() { }
    static instance = new QuestionRepository();

    async fetch(): Promise<QuestionBase[]> {
        return [...questions];
    }
}