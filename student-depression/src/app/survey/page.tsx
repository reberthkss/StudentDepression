'use client'
import SurveyInit from "../../../public/svgs/survey-init";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col">
      <div>
        <SurveyInit className="justify-self-center w-50 h-100" />
      </div>
      <div className="flex-1 p-6 mt-4">
        <p className="font-mono dark:text-white">
          Antes de começarmos, gostaríamos de entender um pouco mais sobre o seu contexto de vida.
          As próximas perguntas têm o objetivo de compreender aspectos do seu dia a dia, suas emoções e experiências recentes.
          Essas informações ajudarão nossa aplicação a oferecer uma análise mais precisa e personalizada, sempre com foco no seu bem-estar.
        </p>
        <br />
        <p className="font-mono font-bold dark:text-white">
          🔒 Seus dados são tratados com total confidencialidade.
        </p>
        <br />
        <p className="font-mono dark:text-white">
          ⚠️ <span className="font-bold ">Importante:</span> Esta aplicação utiliza inteligência artificial para identificar possíveis sinais de depressão com base nas suas respostas.
          No entanto, ela <span className="font-bold">não substitui o diagnóstico de um profissional de saúde mental.</span>
          As informações fornecidas aqui <span className="font-bold">não devem ser interpretadas como um diagnóstico clínico ou recomendação médica.</span>
        </p>
        <br />
        <p className="font-mono dark:text-white">
          Se você estiver passando por um momento difícil, recomendamos que procure ajuda profissional qualificada.
          Você não está sozinho — cuidar da saúde mental é um passo importante, e buscar apoio é um ato de coragem.
        </p>
      </div>
      <Link href={"/survey/1"}>
        <div className='fixed bottom-0 bg-indigo-600 w-full cursor-pointer hover:bg-indigo-500'>
          <p className='text-center text-shadow-md text-white font-semibold text-[2rem] dark:text-white'>
            Iniciar
          </p>
        </div>
      </Link>
    </div>
  );
}