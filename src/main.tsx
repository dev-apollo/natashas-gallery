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
import EventsByCountry from './pages/EventsByCountry.tsx'
import 'react-loading-skeleton/dist/skeleton.css';
import Login from './pages/Login.tsx'
import CreateArt from './pages/CreateArt.tsx'
import CreateEvent from './pages/CreateEvent.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/portfolio' element={<Portfolio />}></Route>
      <Route path='/events' element={<Events />}></Route>
      <Route path='/events/:country' element={<EventsByCountry />}></Route>
      <Route path='/contacts' element={<Contacts />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/createArt' element={<CreateArt />}></Route>
      <Route path='/createEvent' element={<CreateEvent />}></Route>
    </Routes>
  </BrowserRouter>
)
