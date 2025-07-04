import { DevelopersTab } from "./tabs/developers";
import './App.css'

export default function Popup() {
  return (
    <div>
      <h3 className="title">🔎 Busca no LinkedIn</h3>
      <section>
       <DevelopersTab />
      </section>
    </div>
  );
}