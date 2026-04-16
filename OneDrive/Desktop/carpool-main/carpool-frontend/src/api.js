// src/api.js
const BASE_URL = "http://localhost:9090";

export const getRides = () => fetch(`${BASE_URL}/rides`).then(r => r.json());
export const createBooking = (data) =>
  fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());
