import {Routes,Route} from "react-router-dom"
import TitlePage from "./pages/Title/TitlePage"
import MainPage from "./pages/Main/MainPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<TitlePage />}/>
      <Route path="/main" element = {<MainPage />}/>
    </Routes>
  )
}

export default App
