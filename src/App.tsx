import { DevelopersTab } from "./tabs/developers";
import './App.css'

export default function Popup() {

  return (
    <div className="container">
      <h3 className="title">🔎 Busca no LinkedIn</h3>
      <DevelopersTab/>
    </div>
  )
}
