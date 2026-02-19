import { useEffect, useState } from "react";
import { fetchRecipes } from "./services/api";
import "./App.css";

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1540914124281-342587941389",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
];

function getFoodImage(index) {
  return `${FOOD_IMAGES[index % FOOD_IMAGES.length]}?auto=format&fit=crop&w=900&q=80`;
}

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 9;
  const [total, setTotal] = useState(0);

  // Draft (UI typing/selecting)
  const [draftFilters, setDraftFilters] = useState({
    title: "",
    cuisine: "",
    rating: "",
    total_time: "",
    calories: "",
  });

  // Applied (API uses this)
  const [appliedFilters, setAppliedFilters] = useState({});

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    loadData();
  }, [page, appliedFilters]);

  async function loadData() {
    const res = await fetchRecipes({
      page,
      limit,
      filters: appliedFilters,
    });
    setRecipes(res.data || []);
    setTotal(res.total || 0);
  }

  function updateDraft(key, value) {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  }

  function applyFilters() {
    setPage(1);
    setAppliedFilters(draftFilters);
  }

  function clearFilters() {
    setPage(1);
    setDraftFilters({
      title: "",
      cuisine: "",
      rating: "",
      total_time: "",
      calories: "",
    });
    setAppliedFilters({});
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">
        <div className="hero-brand">
          <span className="hero-logo">🍳</span>
          <span className="hero-name">Cookr</span>
        </div>

        <p className="hero-tagline">
          Discover recipes that match your mood
        </p>

        {/* 🔍 SEARCH — PRESS ENTER TO SEARCH */}
        <input
          className="hero-search"
          placeholder="Search recipes..."
          value={draftFilters.title}
          onChange={(e) => updateDraft("title", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyFilters();
            }
          }}
        />
      </section>

      {/* FILTERS */}
      <section className="filters">
        <select
          value={draftFilters.cuisine}
          onChange={(e) => updateDraft("cuisine", e.target.value)}
        >
          <option value="">Cuisine</option>
          <option>Indian</option>
          <option>Italian</option>
          <option>American</option>
          <option>Chinese</option>
          <option>Southern</option>
        </select>

        <select
          value={draftFilters.rating}
          onChange={(e) => updateDraft("rating", e.target.value)}
        >
          <option value="">Rating</option>
          <option value="4">4+</option>
          <option value="3">3+</option>
          <option value="2">2+</option>
          <option value="1">1+</option>
        </select>

        <select
          value={draftFilters.total_time}
          onChange={(e) => updateDraft("total_time", e.target.value)}
        >
          <option value="">Time</option>
          <option value="30">≤ 30 min</option>
          <option value="60">≤ 60 min</option>
          <option value="90">≤ 90 min</option>
          <option value="120">≤ 120 min</option>
          
        </select>

        <select
          value={draftFilters.calories}
          onChange={(e) => updateDraft("calories", e.target.value)}
        >
          <option value="">Calories</option>
          <option value="300">≤ 300</option>
          <option value="500">≤ 500</option>
          <option value="750">≤ 750</option>
          <option value="1000">≤ 1000</option>
        </select>

        <button onClick={applyFilters}>Filter</button>
        <button onClick={clearFilters}>Clear</button>
      </section>

      {/* RECIPES */}
      <section className="canvas">
        {recipes.length === 0 && (
          <div className="empty">No recipes found</div>
        )}

        {recipes.map((r, index) => (
          <article
            key={r.id}
            className="recipe"
            onClick={() => setSelectedRecipe(r)}
            onMouseMove={(e)=>{
              const rect=e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--x', e.clientX - rect.left);
              e.currentTarget.style.setProperty('--y', e.clientY - rect.top);
              
            }}
          >
            <div
              className="recipe-image"
              style={{ backgroundImage: `url(${getFoodImage(index)})` }}
            />

            <div className="recipe-content">
              <span className="pill">{r.cuisine}</span>
              <h3>{r.title}</h3>
              <p>{r.description?.slice(0, 120)}…</p>

              <div className="meta">
                <span>⭐ {r.rating ?? "NA"}</span>
                <span>⏱ {r.total_time} min</span>
                <span>🔥 {r.nutrients?.calories}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner" align="center" justify="center">
          © {new Date().getFullYear()} Cookr. All rights reserved.
        </div>
      </footer>

      {/* MODAL */}
      {selectedRecipe && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRecipe(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedRecipe(null)}
            >
              ✕
            </button>

            <h2>{selectedRecipe.title}</h2>
            <p className="modal-desc">
              {selectedRecipe.description}
            </p>

            <div className="meta">
              <span>⭐ {selectedRecipe.rating ?? "NA"}</span>
              <span>⏱ {selectedRecipe.total_time} min</span>
              <span>🔥 {selectedRecipe.nutrients?.calories}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
