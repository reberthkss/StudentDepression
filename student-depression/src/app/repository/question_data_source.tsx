import {
    AlternativeQuestion,
    DateQuestion,
    NumberQuestion,
    QuestionBase,
    QuestionWithLayoutDecorator,
} from "../model";

export const questions: QuestionBase[] = [
    // 1. Dados demográficos básicos
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "gender",
                title: "Qual seu gênero?",
                description: "Esta informação nos ajuda a entender melhor o contexto da pesquisa",
                alternatives: [
                    "Masculino",
                    "Feminino",
                ],
                labels: [
                    "Masculino",
                    "Feminino",
                ],
            }
        )
    ),

    // 2. Idade - continuando dados demográficos
    new QuestionWithLayoutDecorator(
        new DateQuestion(
            {
                id: "age",
                title: "Qual sua data de nascimento?",
                description: "A idade é um fator importante na análise de saúde mental estudantil",
                max: "2007-12-31"
            }
        )
    ),

    // 4. Performance acadêmica
    new QuestionWithLayoutDecorator(
        new NumberQuestion(
            {
                id: "cgpa",
                title: "Qual o seu Coeficiente de Rendimento na faculdade?",
                description: "Informe seu CR atual (de 0 a 10, com até duas casas decimais)",
                placeholder: "Ex: 8.75",
                min: 0,
                max: 10,
            }
        )
    ),

    // 5. Carga de estudos/trabalho
    new QuestionWithLayoutDecorator(
        new NumberQuestion(
            {
                id: "work_study_hours",
                title: "Quantas horas você dedica por dia para estudar e trabalhar?",
                description: "Considere o tempo total dedicado a atividades acadêmicas e profissionais",
                placeholder: "Ex: 8",
                min: 1,
                max: 23,
            }
        )
    ),

    // 6. Pressão acadêmica - começando fatores de estresse
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "academic_pressure",
                title: "Como você avalia seu nível de pressão acadêmica?",
                description: "Considere o estresse causado por provas, trabalhos, prazos e expectativas acadêmicas",
                labels: [
                    "Muito baixo",
                    "Baixo",
                    "Moderado",
                    "Alto",
                    "Muito alto"
                ],
                alternatives: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                ]
            }
        )
    ),

    // 7. Satisfação com faculdade
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "study_satisfaction",
                title: "Qual seu nível de satisfação com a faculdade?",
                description: "",
                labels: [
                    "Muito insatisfeito",
                    "Insatisfeito",
                    "Neutro",
                    "Satisfeito",
                    "Muito satisfeito"
                ],
                alternatives: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                ],
            }
        )
    ),

    // 9. Aspectos de estilo de vida - sono
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "sleep_duration",
                title: "Quantas horas você dorme por noite em média?",
                description: "O sono é fundamental para a saúde mental e performance acadêmica",
                alternatives: [
                    "Menos de 5 horas",
                    "5-6 horas",
                    "7-8 horas",
                    "Mais de 8 horas",
                ],
                labels: [
                    "Menos de 5 horas",
                    "Entre 5 e 6 horas",
                    "Entre 7 e 8 horas",
                    "Mais de 8 horas",
                ]
            }
        )
    ),

    // 10. Hábitos alimentares
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "dietary_habits",
                title: "Como você descreveria seus hábitos alimentares?",
                description: "A alimentação impacta diretamente no bem-estar mental e físico",
                alternatives: [
                    "Muito saudáveis",
                    "Moderadamente saudáveis",
                    "Pouco saudáveis",
                    "Não muito saudáveis"
                ],
                labels: [
                    "Muito saudáveis",
                    "Moderadamente saudáveis",
                    "Pouco saudáveis",
                    "Não muito saudáveis"
                ]
            }
        )
    ),

    // 11. Contexto familiar - situação financeira
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "financial_stress",
                title: "Como você avalia a situação financeira da sua família?",
                description: "Dificuldades financeiras podem impactar significativamente a saúde mental",
                labels: [
                    "Muito boa",
                    "Boa",
                    "Regular",
                    "Difícil",
                    "Muito difícil",
                ],
                alternatives: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5"
                ]
            }
        )
    ),

    // 12. Histórico familiar de saúde mental
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "family_history",
                title: "Existe histórico de doenças mentais na sua família?",
                description: "Histórico familiar pode ser um fator de risco importante para considerar",
                alternatives: [
                    "Sim",
                    "Não"
                ],
                labels: [
                    "Sim",
                    "Não"
                ]
            }
        )
    ),

    // 13. Pergunta mais sensível por último
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "suicidal_thoughts",
                title: "Você já teve pensamentos relacionados ao suicídio?",
                description: "Esta é uma pergunta importante para avaliação de risco. Suas respostas são confidenciais",
                alternatives: [
                    "Sim",
                    "Não"
                ],
                labels: [
                    "Sim",
                    "Não"
                ]
            }
        )
    )
]