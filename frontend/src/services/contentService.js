import api from "./api";

// Every function returns just the `data` payload (unwrapping the
// { success, data, message } envelope the backend always sends), so
// components can use the result directly.
export const getProfile = () => api.get("/profile").then((r) => r.data.data);
export const getSettings = () => api.get("/settings").then((r) => r.data.data);

export const getProjects = (params = {}) =>
  api.get("/projects", { params }).then((r) => r.data.data);
export const getProjectBySlug = (slug) =>
  api.get(`/projects/slug/${slug}`).then((r) => r.data.data);

export const getClassWork = (params = {}) =>
  api.get("/class-work", { params }).then((r) => r.data.data);

export const getExperience = () => api.get("/experience").then((r) => r.data.data);
export const getEducation = () => api.get("/education").then((r) => r.data.data);
export const getSkills = () => api.get("/skills").then((r) => r.data.data);
export const getCertificates = () => api.get("/certificates").then((r) => r.data.data);
