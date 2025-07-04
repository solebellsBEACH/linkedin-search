import { useState } from "react";
import { DevelopersTab } from "./tabs/developers";
import { QaTab } from "./tabs/qa-tab";
import { DesignTab } from "./tabs/design-tab";
import './App.css'

export default function Popup() {
  const [activeTab, setActiveTab] = useState("developers");

  const renderTab = () => {
    switch (activeTab) {
      case "developers":
        return <DevelopersTab />;
      case "qa":
        return <QaTab />;
      case "design":
        return <DesignTab />;
      default:
        return <DevelopersTab />;
    }
  };

  return (
    <div>
      <h3 className="title">🔎 Busca no LinkedIn</h3>
      {/* <nav>
        <button onClick={() => setActiveTab("developers")} className={activeTab === "developers" ? "active" : ""}>Desenvolvedores</button>
        <button onClick={() => setActiveTab("qa")} className={activeTab === "qa" ? "active" : ""}>QA</button>
        <button onClick={() => setActiveTab("design")} className={activeTab === "design" ? "active" : ""}>Design</button>
      </nav> */}

      <section>
       <DevelopersTab />
      </section>
    </div>
  );
}