import { useState } from "react";
import Home from "./pages/Home";
import QueuePage from "./pages/QueuePage";

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div>
      {selectedPlace ? (
        <QueuePage place={selectedPlace} />
      ) : (
        <Home onSelectPlace={setSelectedPlace} />
      )}
    </div>
  );
}

export default App;