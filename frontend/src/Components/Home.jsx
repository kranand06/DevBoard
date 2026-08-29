import React from 'react'
import ThemeToggle from './ThemeToggle'

function Home() {
  return (
    <div className='min-h-screen bg-theme text-theme-1 transition-colors duration-300 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12 '>
      <h1 className='text-4xl font-bold'>This is Basic react setup</h1>
      <p>Here I have set-up Vite using JS, Tailwind, React-icons, React-router-dom</p>
      <ThemeToggle />
      <div className="p-4 rounded text-theme-1">
        <h2 className="text-2xl font-bold">Theme Accent Example</h2>
        <p className="text-theme-2 mt-1">The following block uses the accent color:</p>

        <div className="mt-4 p-4 rounded bg-accent hover:bg-hover text-white">
          Accent Highlight
        </div>

        <p className="mt-2 text-accent font-medium">This text is accent colored</p>
      </div>
    </div>
  )
}

export default Home