interface QuestionInterface {
    id: string,
    type: QuestionType,
    title: string,
    description: string,
    options: ResponseOptionInterface[]
    response: QuestionResponseInterface | undefined
}

enum QuestionType {
    option,
    text
}

interface ResponseOptionInterface {
    value: string
}

interface QuestionResponseInterface {
    value: string
}

class Question implements QuestionInterface {
    constructor({id, type, title, description, options}: QuestionInterface) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.options = options;
        this.response = undefined;
    }

    id: string
    type: QuestionType
    title: string
    description: string
    options: ResponseOptionInterface[]
    response: QuestionResponseInterface | undefined

}

class ResponseOption implements ResponseOptionInterface {
    public constructor(value: string) {
        this.value = value;
    }

    value: string;
}

class QuestionResponse implements QuestionResponseInterface {
    public constructor(value: string) {
        this.value = value;
    }

    value: string;

}