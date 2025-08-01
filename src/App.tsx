import PersonalInfo from './components/PersonalInfo'
import ContentArea from './components/ContentArea'
import { personalData } from './data/personalData'
import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <PersonalInfo {...personalData} />
      </aside>
      
      <main className="main-content">
        <ContentArea />
      </main>
    </div>
  )
}

export default App
