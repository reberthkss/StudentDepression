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
    ),
    new Question(
        {
            id: "3",
            type: QuestionType.option,
            title: "Qual sua profissão?",
            description: "Selecione a opção em que você está atualmente",
            options: [
                new ResponseOption("Estudante"),
                new ResponseOption("Estudante e bolsista"),
                new ResponseOption("Estudante e estagiário"),
                new ResponseOption("Estudante e freelancer"),
                new ResponseOption("Estudante e Full-Time")
            ],
            response: undefined
        }
    ),
    new Question(
        {
            id: "4",
            type: QuestionType.text,
            title: "De 0 a 5, qual seu nível de pressão acadêmica?",
            description: "Informe o valor que indica o nível de pressão que você enfrenta em ambientes acadêmicos. Isso pode incluir estresse causado por provas, trabalhos e expectativas acadêmicas gerais.",
            options: [],
            response: undefined
        }
    ),
    new Question(
        {
            id: "5",
            type: QuestionType.text,
            title: "De 0 a 5, qual seu nível de pressão no trabalho?",
            description: "Informe o valor que indica o nível de pressão que você enfrenta relacionado ao trabalho.",
            options: [],
            response: undefined
        }
    ),
    new Question(
        {
            id: "6",
            type: QuestionType.text,
            title: "Qual o seu CR?",
            description: "Informe com até duas casas decimais.",
            options: [],
            response: undefined
        }
    ),
    new Question(
        {
            id: "7",
            type: QuestionType.text,
            title: "Qual o seu nível de satisfação com o trabalho?",
            description: "Informe com até duas casas decimais.",
            options: [],
            response: undefined
        }
    )
]