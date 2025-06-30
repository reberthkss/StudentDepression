const questions: QuestionInterface[] = [
    new Question(
        {
            id: "1",
            type: QuestionType.option,
            title: "Qual seu genero?",
            description: "Descreva seu genero",
            options: [
                new ResponseOption("Masculino"),
                new ResponseOption("Feminino"),
                new ResponseOption("LGBTQIAPN+")
            ],
            response: undefined
        }
    ),
    new Question(
        {
            id: "2",
            type: QuestionType.text,
            title: "Qual sua idade?",
            description: "Sua idade influencia ....",
            options: [],
            response: undefined
        }
    )
]