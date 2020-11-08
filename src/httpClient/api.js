import httpClient from "./httpClient";

// const EXPRESS_BASE_URL = "http://localhost:5000";
const EXPRESS_BASE_URL = "https://expressazure.azurewebsites.net";

const EMP_GET_URL = "/employees";
const EMP_INSERT_URL = "/employee";
const EMP_DELETE_URL = "/delete";
const EMP_UPDATE_URL = "/update";
const SLASH_URL = "/";

export const getAllEmployees = () =>
    httpClient.get(
        `${EXPRESS_BASE_URL}${EMP_GET_URL}`
    );

export const saveEmployee = payload =>
    httpClient.post(
        `${EXPRESS_BASE_URL}${EMP_INSERT_URL}`,
        payload
    );

export const deleteEmployee = id =>
    httpClient.delete(
        `${EXPRESS_BASE_URL}${EMP_INSERT_URL}${SLASH_URL}${id}${EMP_DELETE_URL}`
    );

export const updateEmployee = payload =>
    httpClient.put(
        `${EXPRESS_BASE_URL}${EMP_INSERT_URL}${EMP_UPDATE_URL}`,
        payload
    );