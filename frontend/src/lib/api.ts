export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const getAuthToken = () => localStorage.getItem("kalpvan_token");

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message ?? "Request failed");
  }
  return response.json();
};
