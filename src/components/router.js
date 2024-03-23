const BASE_URL = process.env.BASE_URL || "http://localhost:5001";

const makeHttpCallToRestApi = (url, data) => {
  return fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export { makeHttpCallToRestApi };
