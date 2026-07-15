import {Routes,Route} from "react-router-dom"
import TitlePage from "./pages/TitlePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<TitlePage />}/>
    </Routes>
  )
}

export default App
