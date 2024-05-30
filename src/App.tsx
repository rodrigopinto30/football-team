import Header from "./components/Header"
import Player from "./components/Player"
import Team from "./components/Team"


function App() {

  return (
    <main className="bg-[url('assets/football-image.webp')] h-fit bg-no-repeat bg-cover m-0 p-0">
      <Header/>
      
      <section id="teams" className="mt-20">
        <Team/>
      </section>

      <section id="players" className="mt-20">
        <Player/>
      </section>
      
      <footer>
        footer
      </footer>
    </main> 
  )
}

export default App
