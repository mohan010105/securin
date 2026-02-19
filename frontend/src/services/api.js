const BASE_URL = "http://localhost:8000";

export async function fetchRecipes({ page = 1, limit = 9, filters = {} }) {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v != null)
  );

  const query = new URLSearchParams({
    page,
    limit,
    ...cleanFilters,
  }).toString();

  const endpoint =
    Object.keys(cleanFilters).length > 0
      ? "/api/recipes/search"
      : "/api/recipes";

  const res = await fetch(`${BASE_URL}${endpoint}?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}
