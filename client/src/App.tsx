import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import SmsLabPage from './pages/SmsLabPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/sms-lab" element={<SmsLabPage />} />
      </Routes>
    </BrowserRouter>
  )
}
