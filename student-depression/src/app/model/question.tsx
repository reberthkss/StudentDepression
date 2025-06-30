interface Question {
    id: string,
    type: QuestionType,
    title: string,
    description: string,
    options: ResponseOption[]
    response: Response | undefined
}

enum QuestionType {
    option,
    text
}

interface ResponseOption {
    value: string
}

interface Response {
    value: string
}