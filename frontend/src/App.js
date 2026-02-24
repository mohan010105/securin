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

function getFoodImage(index){
  return `${FOOD_IMAGES[index % FOOD_IMAGES.length]}?auto=format&fit=crop&w=900&q=80`;
}

export default function App(){

const [recipes,setRecipes]=useState([]);
const [page,setPage]=useState(1);
const [total,setTotal]=useState(0);
const limit=9;

const [filters,setFilters]=useState({
title:"",
cuisine:"",
rating:"",
total_time:"",
calories:""
});

const [selectedRecipe,setSelectedRecipe]=useState(null);
const [selectedImg,setSelectedImg]=useState("");

useEffect(()=>{
loadData();
},[page]);

async function loadData(){

const cleaned={};

Object.keys(filters).forEach(key=>{
if(filters[key]!==""){
cleaned[key]=filters[key];
}
});

const res=await fetchRecipes({
page,
limit,
filters:cleaned
});

setRecipes(res.data||[]);
setTotal(res.total||0);
}

function updateFilter(key,value){
setFilters(prev=>({...prev,[key]:value}));
}

function applyFilters(){
setPage(1);
loadData();
}

function clearFilters(){
setFilters({
title:"",
cuisine:"",
rating:"",
total_time:"",
calories:""
});
setPage(1);
}

const totalPages=Math.ceil(total/limit);

return(

<div className="app">

{/* HERO */}

<section className="hero">

<h1 className="hero-title">Zestio</h1>
<p className="hero-subtitle">
Discover recipes that match your mood
</p>

<input
className="hero-search"
placeholder="Search recipes..."
value={filters.title}
onChange={(e)=>updateFilter("title",e.target.value)}
/>

<div className="filters">

<select
value={filters.cuisine}
onChange={(e)=>updateFilter("cuisine",e.target.value)}
>
<option value="">Cuisine</option>
<option>Indian</option>
<option>Chinese</option>
<option>Italian</option>
<option>American</option>
</select>

<select
value={filters.rating}
onChange={(e)=>updateFilter("rating",e.target.value)}
>
<option value="">Rating</option>
<option value="4">4+</option>
<option value="3">3+</option>
<option value="2">2+</option>
</select>

<select
value={filters.total_time}
onChange={(e)=>updateFilter("total_time",e.target.value)}
>
<option value="">Time</option>
<option value="30">≤30 min</option>
<option value="60">≤60 min</option>
<option value="90">≤90 min</option>
</select>

<select
value={filters.calories}
onChange={(e)=>updateFilter("calories",e.target.value)}
>
<option value="">Calories</option>
<option value="300">≤300</option>
<option value="500">≤500</option>
<option value="750">≤750</option>
</select>

<button onClick={applyFilters}>
Search
</button>

<button onClick={clearFilters}>
Clear
</button>

</div>

</section>

{/* RECIPES */}

<section className="canvas">

{recipes.map((r,index)=>(

<article
key={r.id}
className="recipe"
onClick={()=>{
setSelectedRecipe(r);
setSelectedImg(getFoodImage(index));
}}
>

<div
className="recipe-image"
style={{backgroundImage:`url(${getFoodImage(index)})`}}
/>

<div className="recipe-content">
<span className="pill">{r.cuisine}</span>
<h3>{r.title}</h3>
<p>{r.description?.slice(0,120)}…</p>

<div className="meta">
<span>⭐ {r.rating??"NA"}</span>
<span>⏱ {r.total_time} min</span>
<span>🔥 {r.nutrients?.calories}</span>
</div>

</div>

</article>

))}

</section>
{/* PAGINATION */}

<div className="pagination-wrapper">

  <button
    className="page-btn"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <span className="page-count">
    Page {page}
  </span>

  <button
    className="page-btn"
    disabled={page === Math.ceil(total / limit)}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>

{/* MODAL */}

{selectedRecipe&&(

<div
className="recipe-details-overlay"
onClick={()=>setSelectedRecipe(null)}
>

<div
className="recipe-details"
onClick={(e)=>e.stopPropagation()}
>

<button
className="modal-close"
onClick={()=>setSelectedRecipe(null)}
>
✕
</button>

{/* <img src={selectedImg}/> */}

<div className="modal-img-wrapper">
  <img
    src={selectedImg}
    alt=""
    className="modal-img"
  />
</div>

<h2>{selectedRecipe.title}</h2>

{/* <p>
{selectedRecipe.description}
</p> */}

{/* ================= NUTRIENTS ================= */}

<h3>Nutrients</h3>
<ul>
  <li>Calories: {selectedRecipe.nutrients?.calories}</li>
  <li>Protein: {selectedRecipe.nutrients?.protein}</li>
  <li>Fat: {selectedRecipe.nutrients?.fat}</li>
</ul>

{/* ================= INGREDIENTS ================= */}

<h3>Ingredients</h3>
<ul>
  {selectedRecipe.ingredients?.map((item,i)=>(
    <li key={i}>{item}</li>
  ))}
</ul>

{/* ================= INSTRUCTIONS ================= */}

{/* <h3>Instructions</h3>
<ol>
  {selectedRecipe.instructions?.map((step,i)=>(
    <li key={i}>{step}</li>
  ))}
</ol> */}

<div className="meta">
<span>⭐ {selectedRecipe.rating??"NA"}</span>
<span>⏱ {selectedRecipe.total_time}</span>
<span>🔥 {selectedRecipe.nutrients?.calories}</span>
</div>

</div>

</div>

)}

</div>

)}