import Robot from '../../public/svgs/robot';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <div className="flex flex-col">
        <div className="">
          <Robot className='justify-self-center h-80 w-80 fill-white stroke-black dark:fill-black dark:stroke-white' />
        </div>
        <div className="mb-8 text-center"> 
          <p className='text-black text-center text-[1.8rem] dark:text-white font-mono'>Student Depression</p>
        </div>
        <div className='mx-5'>
          <p className="font-mono text-justify dark:text-white">Este é um projeto para o trabalho final da materia de Inteligência Artificial ministrado pela professora Dra. Lillian Berton</p>
          <p className="font-mono text-justify dark:text-white">Por meio de inteligência artificial, este projeto visa apresentar diagnostico de depressão para quem responder o questionário a seguir.</p>
          <p className="font-mono text-justify dark:text-white">Nenhum resultado gerado por este aplicativo deve ser considerado como verdade. Orientamos sempre a buscar um médico especialista no assunto.</p>
        </div>
        <Link href={"/survey"}>
          <div className='fixed bottom-0 bg-indigo-600 w-full cursor-pointer hover:bg-indigo-500'>
            <p className='text-center text-shadow-md text-white font-semibold text-[2rem] dark:text-white'>
              Começar
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
