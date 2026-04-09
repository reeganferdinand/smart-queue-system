const API_BASE = "http://localhost:5000/api";

export const getPlaces = async () => {
  const res = await fetch(`${API_BASE}/places`);
  return res.json();
};


export const getQueueByPlace = async (placeId) => {
  const res = await fetch(`http://localhost:5000/api/queues/place/${placeId}`);
  return res.json();
};