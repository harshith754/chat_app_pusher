import './globals.css'

export const metadata = {
  title: 'Chat App Pusher',
  description: 'Chat app using pusher',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
