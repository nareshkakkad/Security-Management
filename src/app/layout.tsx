'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header/page'
import { FloatButton } from 'antd'
import { CommentOutlined, LogoutOutlined , InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
const logOut = () => {
  localStorage.setItem("data", JSON.stringify([]))
  setTimeout(() => {
    router.push('/')
  }, 700);
  setTimeout(() => {
    window.location.reload()
  }, 1000);
  const router = useRouter()
}
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <FloatButton.Group
        trigger="click"
        type="default"
        style={{
          right: 24,
        }}
        icon={<InfoCircleOutlined />}
      >
        <FloatButton />
        <FloatButton  onClick={() => logOut()} icon={<LogoutOutlined />} tooltip={<p>LogOut</p>}/>
      </FloatButton.Group>
      </body>
    </html>
  )
}
