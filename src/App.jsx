import { AppProvider, useApp } from './store'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Mission from './sections/Mission'
import Wall from './sections/Wall'
import Tree from './sections/Tree'
import Invisible from './sections/Invisible'
import Match from './sections/Match'
import Chain from './sections/Chain'
import KindMap from './sections/KindMap'
import Capsule from './sections/Capsule'
import Impact from './sections/Impact'

function Toast() {
  const { toast } = useApp()
  return <div className="toast-wrap" role="status" aria-live="polite">{toast && <div key={toast.id} className="toast">{toast.m}</div>}</div>
}

export default function App() {
  return (
    <AppProvider>
      <Nav />
      <main>
        <Hero /><Mission /><Wall /><Tree /><Invisible /><Match /><Chain /><KindMap /><Capsule /><Impact />
      </main>
      <Footer />
      <Toast />
    </AppProvider>
  )
}
