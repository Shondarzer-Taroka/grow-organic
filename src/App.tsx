
// // final selecting table


// import React, { useState } from "react";
// import RowSelectionPanel from "./Garbase/pages/RowSelectionPanel";
// import ArtworksTable from "./Garbase/pages/ArtworksTable";

// const App: React.FC = () => {
//   const [selectedRows, setSelectedRows] = useState<{ [id: number]: boolean }>({});

//   return (
//     <div>
//       <h1>Artworks Table with Row Selection</h1>
//       <ArtworksTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
//       <RowSelectionPanel selectedRows={selectedRows} />
//     </div>
//   );
// };

// export default App;










import React, { useState } from "react";
import RowSelectionPanel from "./Garbase/pages/RowSelectionPanel";
import ArtworksTable from "./Garbase/pages/ArtworksTable";
import ShowingDataTable from "./components/ShowingDataTable/ShowingDataTable";

const App: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<{ [id: number]: boolean }>({});

  return (
    <div>
      <h1>Artworks Table with Row Selection</h1>
      {/* <ArtworksTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} /> */}
      <ShowingDataTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      {/* <RowSelectionPanel selectedRows={selectedRows} /> */}
    </div>
  );
};

export default App;

