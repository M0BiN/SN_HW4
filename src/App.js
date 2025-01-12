import React from "react";
import {DisplayGraph} from "./GraphViewer";
import SelectMenu from "./SelectMenu"
const App = () => {
  const [selectedMenu, setSelectedMenu] = React.useState(null);
  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <SelectMenu state={selectedMenu} setState={setSelectedMenu}/>
      <DisplayGraph criteria_label={selectedMenu?.value} />
    </div>
  );
};

export default App;
