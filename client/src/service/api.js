import axios from "axios";

const { CONSTANTS, SERVICE_URLS } = require("../constants/config");
const URL = "https://localhost:8000";

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Stop global loader here
    return processResponse(response);
  },
  function (error) {
    // Stop global loader here
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    //request made and server responded with status other than 200
    console.log("Error in response :", error.toJSON());
    return {
      isTrue: true,
      msg: CONSTANTS.responseFailure,
      code: error.response.data,
    };
  } else if (error.request) {
    //request made but no response was received
    console.log("Error in request :", error.toJSON());
    return {
      isTrue: true,
      msg: CONSTANTS.requestFailure,
      code: "",
    };
  } else {
    //something happened in setting up requesst that triggers an error
    console.log("Error in network :", error.toJSON());
    return {
      isTrue: true,
      msg: CONSTANTS.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
  };
}

export { API };
