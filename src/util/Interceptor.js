import axios from "axios";

// Request interceptor for API calls
axios.interceptors.request.use(
  async (config) => {
    if (config.url !== "https://udemy-nestjs-course.herokuapp.com/api/login") {
      const access_token = localStorage.getItem("token");
      config.headers = {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// axiosApiInstance.interceptors.request.use(
//   async (config) => {
//     const access_token = await localStorage.getItem("token").value;
//     console.log("adsadad", access_token);
//     config.headers = {
//       Authorization: `Bearer ${access_token}`,
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// Response interceptor for API calls
// axiosApiInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       // const access_token = await refreshAccessToken();
//       // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//       return axiosApiInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// switch (error.response.status) {
//   case 400:
//        console.log('Bad request');
//        break;
//   ...
//   default:
//       ....
