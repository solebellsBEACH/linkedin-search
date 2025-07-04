import './App.css'
import { TecnicalForm } from './components/TecnicalForm';

export default function Popup() {
  return (
    <div>
      <h3 className="title">🔎 Busca no LinkedIn</h3>
      <section>
       <TecnicalForm />
      </section>
    </div>
  );
}