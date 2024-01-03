"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Themetoggle } from './ui/Themetoggle'
import Logo from './Logo'


type Props = {}

const NavHeader = (props: Props) => {
  const [addDialog, setAddDialog] = useState(false);
  return (
    <>
      <header className='sticky top-0 z-50 backdrop-blur-sm mx-auto'>
        <nav className='flex max-w-6xl gap-2 flex-col sm:flex-row items-center p-5 pl-2 bg-none mx-auto'>
          <Logo/>
          <div className='flex-1 flex items-center justify-end space-x-4'>
            <div className='flex gap-4 bg-secondary p-4 mr-0 rounded-lg'>
              {true &&
                <div className='flex flex-row gap-4 items-center justify-center'> 
                  <Button className='p-3 shadow-md shadow-black border-none bg-gradient-to-br from-violet-500 to-orange-300 text-white rounded-xl' onClick={()=>setAddDialog(true)}>Access ⭐</Button>
                </div>
              }
              <Themetoggle/>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default NavHeader