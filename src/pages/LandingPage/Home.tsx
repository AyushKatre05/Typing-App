import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-zinc-800 h-screen max-w-full text-white">
      <h1 className="text-5xl text-center">Speed Typo</h1>
      <div className="flex flex-col md:flex-row lg:flex-row border-white mt-20">
        <div className="w-[50vw] h-[50vh] flexflex-col m-5 p-5 items-center justify-center">
          <h1 className="text-[30px]">Make Your Typing Speed To The Next Level</h1>
          <p className='mt-5'>
            
Typing speed apps streamline communication and task completion by improving proficiency through structured exercises and feedback. With features for progress tracking and goal setting, users can monitor improvement and stay motivated. These apps cater to diverse skill levels, promoting inclusivity and accessibility. By enhancing typing speed and accuracy, individuals can boost productivity and efficiency in various personal and professional contexts, ultimately saving time and increasing overall effectiveness.
          </p>
           </div>
        <div className="w-[50vw] h-[50vh]"><img src="https://img.freepik.com/premium-photo/close-up-soft-focus-finger-typing-keyboard_31965-2315.jpg" alt="" /></div>
      </div>
      <div className='flex justify-center items-center'><button className="p-3 bg-blue-500 hover:bg-blue-700 font-bold"><Link to='/typingapp'>Start Typing</Link></button></div>
    </div>
  )
}

export default Home