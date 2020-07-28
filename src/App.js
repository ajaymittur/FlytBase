import React from "react";
import Warehouse from "./components/Warehouse";

function App() {
  return <Warehouse rows={8} cols={4} groups={[1, 2, 2, 2]} />;
}

export default App;
