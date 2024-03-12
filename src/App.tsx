import { Route,Routes } from "react-router-dom"
import TypingApp from "./pages/TypingPage/TypingApp"
import Home from "./pages/LandingPage/Home"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/typingapp" element={<TypingApp/>}/>
    </Routes>
    </>
  )
}

export default App