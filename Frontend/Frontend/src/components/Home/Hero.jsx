import React from 'react'

const Hero = () => {
  return (
    <div className="h-[75vh] flex">
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
      <h1 className="text-4xl lg:text-6xl font-semibold text-purple-200 text-center lg:text-left">Find Your Next Great Book</h1>
      <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">Find your next great book and let curiosity guide the way! Whether you’re diving into a new genre or revisiting an old favorite, there’s always a story waiting to captivate your imagination.</p>
      <div className="mt-8">
        <button className="text-purple-300 text-xl lg:text-2xl font-semibold border-purple-100  px-10 py-3 hover:bg-zinc-800 rounded-full">Discover Books</button></div>
      </div>
      <div className="flex justify-end w-2/5 ml-auto rounded-full">
    <img
      src="pixels1.jpg"
      alt="pixels1"
      className="object-contain h-auto w-full"
    />
</div>
    </div>
  )
}

export default Hero
