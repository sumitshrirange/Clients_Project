import api from "./api";

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);
export const logout = () => api.post("/auth/logout").then((r) => r.data);
export const getMe = () => api.get("/auth/me").then((r) => r.data.data);

export const getDashboardStats = () => api.get("/dashboard").then((r) => r.data.data);

// Generic multipart create/update used by every admin form. `fields` is a
// plain object; any value that is a File (or FileList) is appended as a
// file, everything else (including arrays/objects, JSON-stringified) as text.
const toFormData = (fields) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof FileList) {
      Array.from(value).forEach((file) => formData.append(key, file));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

const multipartConfig = { headers: { "Content-Type": "multipart/form-data" } };

export const projectsAdmin = {
  create: (fields) => api.post("/projects", toFormData(fields), multipartConfig).then((r) => r.data),
  update: (id, fields) =>
    api.put(`/projects/${id}`, toFormData(fields), multipartConfig).then((r) => r.data),
  remove: (id) => api.delete(`/projects/${id}`).then((r) => r.data),
};

export const classWorkAdmin = {
  create: (fields) => api.post("/class-work", toFormData(fields), multipartConfig).then((r) => r.data),
  update: (id, fields) =>
    api.put(`/class-work/${id}`, toFormData(fields), multipartConfig).then((r) => r.data),
  removeImage: (id, publicId) =>
    api.delete(`/class-work/${id}/images/${encodeURIComponent(publicId)}`).then((r) => r.data),
  remove: (id) => api.delete(`/class-work/${id}`).then((r) => r.data),
};

export const experienceAdmin = {
  create: (fields) => api.post("/experience", toFormData(fields), multipartConfig).then((r) => r.data),
  update: (id, fields) =>
    api.put(`/experience/${id}`, toFormData(fields), multipartConfig).then((r) => r.data),
  remove: (id) => api.delete(`/experience/${id}`).then((r) => r.data),
};

export const educationAdmin = {
  create: (fields) => api.post("/education", fields).then((r) => r.data),
  update: (id, fields) => api.put(`/education/${id}`, fields).then((r) => r.data),
  remove: (id) => api.delete(`/education/${id}`).then((r) => r.data),
};

export const skillsAdmin = {
  create: (fields) => api.post("/skills", fields).then((r) => r.data),
  update: (id, fields) => api.put(`/skills/${id}`, fields).then((r) => r.data),
  remove: (id) => api.delete(`/skills/${id}`).then((r) => r.data),
};

export const certificatesAdmin = {
  create: (fields) =>
    api.post("/certificates", toFormData(fields), multipartConfig).then((r) => r.data),
  update: (id, fields) =>
    api.put(`/certificates/${id}`, toFormData(fields), multipartConfig).then((r) => r.data),
  remove: (id) => api.delete(`/certificates/${id}`).then((r) => r.data),
};

export const profileAdmin = {
  update: (fields) => api.put("/profile", toFormData(fields), multipartConfig).then((r) => r.data),
  updateResume: (file) => {
    const fd = new FormData();
    fd.append("resume", file);
    return api.put("/profile/resume", fd, multipartConfig).then((r) => r.data);
  },
};

export const settingsAdmin = {
  update: (fields) => api.put("/settings", toFormData(fields), multipartConfig).then((r) => r.data),
};

export const adminAccount = {
  updateProfile: (fields) =>
    api.put("/auth/profile", toFormData(fields), multipartConfig).then((r) => r.data),
  updatePassword: (currentPassword, newPassword) =>
    api.put("/auth/password", { currentPassword, newPassword }).then((r) => r.data),
};
