import axios from "axios";

var BASE_URL = "";
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:8080";
}

export function getAllAdventures() {
  return axios.get(`${BASE_URL}/api/explore`).then(res => res.data);
}

export function getAllTasksInAdventure(advId) {
  return axios
    .get(`${BASE_URL}/api/adv`, {
      params: {
        advId: advId
      }
    })
    .then(res => res.data);
}

export function fly(prog) {
  return axios.post(`${BASE_URL}/api/fly`, {
    body: {
      program: prog
    }
  });
}

export function simulate(prog) {
  return axios.post(`${BASE_URL}/api/simulate`, {
    body: {
      program: prog
    }
  });
}
