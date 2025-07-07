const API_URL = "https://food-menu-five-delta.vercel.app/api/";
export const getCategories = async () => {
  const res = await fetch(`${API_URL}${`categories`}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};
export const getMenus = async () => {
  const res = await fetch(`${API_URL}${`food-menus`}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};
