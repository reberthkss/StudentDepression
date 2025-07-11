import { AlternativeQuestion, DateQuestion, NumberQuestion, QuestionBase, QuestionWithLayoutDecorator, SliderQuestion } from "../model/question_type";

export const questions: QuestionBase[] = [
    // 1. Dados demográficos básicos
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "1",
                title: "Qual seu gênero?",
                description: "Esta informação nos ajuda a entender melhor o contexto da pesquisa",
                alternatives: [
                    "1",
                    "2",
                    "3"
                ],
                labels: [
                    "Masculino",
                    "Feminino",
                    "Outro"
                ],
            }
        )
    ),

    // 2. Idade - continuando dados demográficos
    new QuestionWithLayoutDecorator(
        new DateQuestion(
            {
                id: "2",
                title: "Qual sua data de nascimento?",
                description: "A idade é um fator importante na análise de saúde mental estudantil",
            }
        )
    ),

    // 3. Situação acadêmica/profissional
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "3",
                title: "Qual sua situação atual?",
                description: "Selecione a opção que melhor descreve sua situação acadêmica/profissional",
                alternatives: [
                    "1",
                    "2"
                ],
                labels: [
                    "Apenas estudando",
                    "Estudando e trabalhando"
                ]
            }
        )
    ),

    // 4. Performance acadêmica
    new QuestionWithLayoutDecorator(
        new NumberQuestion(
            {
                id: "6",
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
                id: "12",
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
        new SliderQuestion(
            {
                id: "4",
                title: "Como você avalia seu nível de pressão acadêmica?",
                description: "Considere o estresse causado por provas, trabalhos, prazos e expectativas acadêmicas",
                labels: [
                    "Muito baixo",
                    "Baixo",
                    "Moderado",
                    "Alto",
                    "Muito alto"
                ],
            }
        )
    ),

    // 7. Satisfação com faculdade
    new QuestionWithLayoutDecorator(
        new SliderQuestion(
            {
                id: "7",
                title: "Qual seu nível de satisfação com a faculdade?",
                description: "",
                labels: [
                    "Muito insatisfeito",
                    "Insatisfeito",
                    "Neutro",
                    "Satisfeito",
                    "Muito satisfeito"
                ],
            }
        )
    ),

    // 7. Pressão no trabalho (se aplicável)
    new QuestionWithLayoutDecorator(
        new SliderQuestion(
            {
                id: "5",
                title: "Como você avalia seu nível de pressão no trabalho?",
                description: "Se você não trabalha, considere como 'Muito baixo'",
                labels: [
                    "Muito baixo",
                    "Baixo",
                    "Moderado",
                    "Alto",
                    "Muito alto"
                ],
            }
        )
    ),

    // 8. Satisfação com trabalho
    new QuestionWithLayoutDecorator(
        new SliderQuestion(
            {
                id: "8",
                title: "Qual seu nível de satisfação com o trabalho?",
                description: "Se você não trabalha, considere sua satisfação com as atividades acadêmicas",
                labels: [
                    "Muito insatisfeito",
                    "Insatisfeito",
                    "Neutro",
                    "Satisfeito",
                    "Muito satisfeito"
                ],
            }
        )
    ),

    // 9. Aspectos de estilo de vida - sono
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "9",
                title: "Quantas horas você dorme por noite em média?",
                description: "O sono é fundamental para a saúde mental e performance acadêmica",
                alternatives: [
                    "2",
                    "1",
                    "3",
                    "4",
                    "5"
                ],
                labels: [
                    "Menos de 5 horas",
                    "Entre 5 e 6 horas",
                    "Entre 7 e 8 horas",
                    "Mais de 8 horas",
                    "Varia muito"
                ]
            }
        )
    ),

    // 10. Hábitos alimentares
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "10",
                title: "Como você descreveria seus hábitos alimentares?",
                description: "A alimentação impacta diretamente no bem-estar mental e físico",
                alternatives: [
                    "1",
                    "2",
                    "3",
                    "4"
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
        new SliderQuestion(
            {
                id: "13",
                title: "Como você avalia a situação financeira da sua família?",
                description: "Dificuldades financeiras podem impactar significativamente a saúde mental",
                labels: [
                    "Muito boa",
                    "Boa",
                    "Regular",
                    "Difícil",
                    "Muito difícil",
                ],
            }
        )
    ),

    // 12. Histórico familiar de saúde mental
    new QuestionWithLayoutDecorator(
        new AlternativeQuestion(
            {
                id: "14",
                title: "Existe histórico de doenças mentais na sua família?",
                description: "Histórico familiar pode ser um fator de risco importante para considerar",
                alternatives: [
                    "2",
                    "1",
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
                id: "11",
                title: "Você já teve pensamentos relacionados ao suicídio?",
                description: "Esta é uma pergunta importante para avaliação de risco. Suas respostas são confidenciais",
                alternatives: [
                    "2",
                    "1",
                ],
                labels: [
                    "Sim",
                    "Não"
                ]
            }
        )
    )
]