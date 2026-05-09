import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import InboxHeroPage from './pages/InboxHeroPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/inbox-hero" element={<InboxHeroPage />} />
      </Routes>
    </BrowserRouter>
  )
}
