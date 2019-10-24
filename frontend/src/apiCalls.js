import axios from "axios";

// const DEV_BASE_URL = "http://localhost:8081";

export function getAllAdventures() {
  return axios.get(`/api/explore`).then(res => res.data);
}

export function getAllTasksInAdventure(advId) {
  return axios
    .get(`/api/adv`, {
      params: {
        advId: advId
      }
    })
    .then(res => res.data);
}
