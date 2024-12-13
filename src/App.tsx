import './App.css'
import {Counter} from "./ui/Counter.tsx";

function App() {

  return (
    <>
      <div>
          <Counter start={0} end={234} duration={800} />
      </div>
    </>
  )
}

export default App
