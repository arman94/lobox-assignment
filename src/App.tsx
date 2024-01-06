import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Dropdown, { DropdownOption } from "./components/Dropdown";

function App() {
  const [options, setOptions] = useState<DropdownOption[]>([
    {
      label: "Education",
      icon: '🎓'
    },
    {
      label: "Yeeeah, science!",
      icon: '🧪'
    },
    {
      label: "Art",
      icon: '🎭'
    },
    {
      label: "Sport",
      icon: '⚽'
    },
    {
      label: "Games",
      icon: '🎮'
    },
    {
      label: "Health",
      icon: '🏥'
    },
  ])
  return (
    <div className="App">
      <Dropdown
        options={options}
        setOptions={setOptions}
      />
    </div>
  );
}

export default App;
