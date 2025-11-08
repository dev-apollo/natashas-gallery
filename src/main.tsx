import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.min.css"
import App from './pages/App.tsx'
import "./styles/main.css"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<App/>}></Route>
    </Routes>
  </BrowserRouter>
)
