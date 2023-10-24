import React from 'react'

function Header() {
  return (
    <div className="mt-5 justify-center items-center self-stretch  flex flex-col px-5">
        <div className='flex'>
        <img src='/apecoin.png' className='w-12 h-12 mr-4' />
        <h1 className="text-neutral-200 text-4xl font-bold leading-relaxed tracking-tight uppercase">
    Proposal Generator
</h1>


        </div>
        <h1 className='mt-2 justify-center items-center flex text-neutral-200 text-s leading-[183.33%] uppercase self-stretch'>
            Create Ape Improvement Proposals with AI
        </h1>

    </div>
  )
}

export default Header