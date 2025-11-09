import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css"
import "./styles/main.css"
import App from './pages/App.tsx'
import Portfolio from './pages/Portfolio.tsx'
import Events from './pages/Events.tsx'
import Contacts from './pages/Contacts.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/portfolio' element={<Portfolio/>}></Route>
      <Route path='/events' element={<Events/>}></Route>
      <Route path='/contacts' element={<Contacts/>}></Route>
    </Routes>
  </BrowserRouter>
)
