


import React, { useState } from "react";
import ShowingDataTable from "./components/ShowingDataTable/ShowingDataTable";

const App: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<{ [id: number]: boolean }>({});

  return (
    <div>
      <h1>Show Data in Table with Row Selection</h1>
      <ShowingDataTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
    </div>
  );
};

export default App;

