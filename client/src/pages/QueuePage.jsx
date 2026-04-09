import { useEffect, useState } from "react";
import { getQueueByPlace } from "../services/api";

function QueuePage({ place }) {
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    const fetchQueue = async () => {
      const data = await getQueueByPlace(place._id);
      setQueue(data);
    };

    fetchQueue();
  }, [place]);

  if (!queue) return <p>Loading...</p>;

  return (
    <div>
      <h1>{place.name}</h1>
      <p>{place.location}</p>

      <h3>Current Token: {queue.currentNumber}</h3>
      <h3>Total Tickets: {queue.totalTickets || 0}</h3>

      <button>Join Queue</button>
    </div>
  );
}

export default QueuePage;