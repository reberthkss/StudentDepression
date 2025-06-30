export interface QuestionRepositoryInterface {
    fetch(): Promise<Question[]>
}

export class QuestionRepository implements QuestionRepositoryInterface {
    private constructor() {}
    static instance = new QuestionRepository();
    async fetch(): Promise<Question[]> {
        return [];
    }

}