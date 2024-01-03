import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import NavHeader from '@/components/NavHeader';
import {ClerkProvider} from '@clerk/nextjs'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AssessMe.AI',
  description: 'An Interview Style Assessment Preparation'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning={true}>
        <body className={cn(lexend.className, 'antialiased min-h-screen border-none outline-none', 'scrollbar scrollbar-thumb scrollbar-thumb-white scrollbar-track-slate-700 bg-gradient-to-br from-indigo-400 to-purple-400 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-600')} suppressHydrationWarning={true}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NavHeader/>
            {children}
          </ThemeProvider>
        </body>
      </html>
      </ClerkProvider>
  )
}
