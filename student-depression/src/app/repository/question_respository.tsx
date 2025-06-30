export interface QuestionRepositoryInterface {
    fetch(): Promise<QuestionInterface[]>
}

export class QuestionRepository implements QuestionRepositoryInterface {
    private constructor() {}
    static instance = new QuestionRepository();
    async fetch(): Promise<QuestionInterface[]> {
        return [];
    }

}