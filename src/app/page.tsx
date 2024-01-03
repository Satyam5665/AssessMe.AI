import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight, BarChart, BarChart2, BookText, Bot, BotIcon, Github, Key, Linkedin, Lock, Mail, Map, ScrollText, Text } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Typewriter from '@/components/ui/Typewriter'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

export default function Home() {
  return (
    <div className='flex relative overflow-hidden antialiased min-h-screen flex-col items-center justify-between pt-28'>
        <div className='flex px-8 flex-col items-center pt-10 sm:pt-26'>
          <div className='flex text-white p-6 sm:p-0 pb-0 mb-10 rounded-xl gap-8 flex-col max-w-5xl'>
            <div className='text-center font-semibold text-3xl md:text-5xl xl:text-6xl'>
              <div className='flex flex-col text-center'>Access your <span className=' text-purple-900 dark:text-purple-300'><Typewriter/></span></div>
              <div>With AI-Powered Interview Assessment.</div>
            </div>
            <h2 className='text-center text-xl'>              
            Experience tailored mock interviews, receive personalized feedback, and <span className='text-purple-900 dark:text-purple-300'>elevate your career prospects</span> with enhanced communication skills.
            </h2>
            <div className='text-center'>
            <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-br from-violet-500 to-orange-300 text-white rounded-xl' size={'lg'} asChild>
              <Link href={'/'}>Let's Access <ArrowRight className='ml-1 w-5 h-5'/></Link>
            </Button>
            </div>
          </div>
          {/* <div className='flex flex-col md:flex-row items-center'>
            <div className='grid mx-auto text-white max-w-7xl gap-4 place-items-center m-0 lg:grid-cols-2 grid-cols-1'>
              <Button className='p-6 shadow-md shadow-black border-none bg-gradient-to-r from-indigo-400 to-purple-500 border text-white rounded-xl'>
                <Bot className='mr-2 w-5'/>
                Health Assistant with Memory
              </Button>
            </div>  
          </div>         */}
          {/* <div className='flex text-center p-4 pb-28 pt-0 items-center flex-col gap-4'>
            <h1 className='text-white px-4 text-xl mt-20'>“Tracking major health events so seamlessly has made diagnosis more transparent with doctor.”</h1>
            <img src="https://avatars.githubusercontent.com/u/89721628?v=4" className='w-14 h-14 rounded-full border-2 border-white' />
            <Link href={'https://www.linkedin.com/in/aaditya-srivastava-b4564821b/'}>
            <h2 className='text-white text-md underline underline-offset-2'>Aaditya Srivastava</h2>
            </Link>
          </div> */}
        </div>
        <div className='flex px-4 pt-1 bg-white/20 text-white justify-between gap-4 flex-row items-center text-primary h-14 absolute bottom-0 w-full'>
        <h2 className='text-white'>© 2023 AccessMe.Ai</h2>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <Link href={'https://github.com/sumionochi'}>
            <Github/>
          </Link>
          <Link href={'https://www.linkedin.com/in/aaditya-srivastava-b4564821b/'}>
            <Linkedin/>
          </Link>
          <Link href={'mailto:aaditya.srivastava.connect@gmail.com'}>
            <Mail/>
          </Link>
          <Link href={'https://sumionochi.github.io/Portfolio-landing-page/'}>
            <ArrowUpRight/>
          </Link>
        </div>
        </div>    
    </div>
  )
}
