import { email } from "zod";
const token = localStorage.getItem("token");
const API_URL = "https://food-menu-five-delta.vercel.app/api/";
export const getCategories = async () => {
  const res = await fetch(`${API_URL}${`categories`}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};
export const getMenus = async () => {
  const res = await fetch(`${API_URL}${`food-menus`}`);
  if (!res.ok) throw new Error("Failed to fetch menus");
  return res.json();
};
export const order = async (data) => {
  try {
    const res = await fetch(`${API_URL}${`orders`}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error placing order:", error);
  }
};

export const login = async (data) => {
  try {
    const res = await fetch(`${API_URL}${`auth/login`}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const responseData = await res.json();

    if (!res.ok) throw new Error("Login failed");
    return responseData;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
