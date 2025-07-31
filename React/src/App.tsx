import PersonalInfo from './components/PersonalInfo'
import ContentArea from './components/ContentArea'
import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <PersonalInfo 
          name="Li Jiayun"
          title="Software Engineer & Researcher"
          email="jliip@connect.ust.hk"
          // phone="+86 138 0000 0000"
          location="Hong Kong / Shenzhen"
          bio="Welcome to my personal website. I'm passionate about web development, machine learning, and open-source projects. I enjoy creating elegant solutions to complex problems."
          socialLinks={{
            github: "https://github.com/jliip",
            linkedin: "https://linkedin.com/in/lijia",
            twitter: "https://twitter.com/lijia_dev",
            scholar: "https://scholar.google.com/citations?user=lijia"
          }}
        />
      </aside>
      
      <main className="main-content">
        <ContentArea />
      </main>
    </div>
  )
}

export default App
