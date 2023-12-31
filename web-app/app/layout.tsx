import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PageProvider from '../contexts/PageContext'
import { ThemeProvider } from '../components/theme-provider'
import UserProvider from '../contexts/UserContext'
import { Toaster } from '../components/ui/toaster'
import MachineProvider from '../contexts/MachineContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Velux livefeed',
  description: 'The foundation of your next project.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageProvider>
            <UserProvider>
              <MachineProvider>
                {children}
                <Toaster />
              </MachineProvider>
            </UserProvider>
          </PageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
