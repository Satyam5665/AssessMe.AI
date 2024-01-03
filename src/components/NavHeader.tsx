"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Themetoggle } from './ui/Themetoggle'
import Logo from './Logo'
import { UserButton, auth } from '@clerk/nextjs'
import {dark} from "@clerk/themes"
import { useTheme } from 'next-themes'

type Props = {}

const NavHeader = (props: Props) => {
  const {theme} = useTheme();
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
                <UserButton afterSignOutUrl='/' appearance={{baseTheme: (theme === "dark" ? dark : undefined), elements:{avatarBox:{width:'2.5rem', height:"2.5rem"}}}}/>
                <Button className='p-3 shadow-md shadow-black border-none bg-gradient-to-br from-violet-500 to-orange-300 text-white rounded-xl' onClick={()=>setAddDialog(true)}>Assess ✨</Button>
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