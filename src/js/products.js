import '../style.css'
import axios from "axios"
import './order.js'

axios.defaults.baseURL = "https://api.zaferayan.com";

const token = localStorage.getItem("token");

if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const app = document.getElementById("app");

let navbar = `
<div class="navbar bg-base-100 shadow mb-6">

<a href="/" class="btn btn-ghost text-5xl">Mini Shop</a>

<div class="ml-auto">
`;

if(!token){

    alert("Sipariş için giriş yapmalısınız");
    window.location.href="/login.html";
};
if(token){

    navbar += `
        <a href="/profile.html" class="btn btn-primary">
            <img class="h-4 w-4" src="user.png">
            Profil
        </a>
    `;

}else{

    navbar += `
        <a href="/login.html" class="btn btn-primary">
            Giriş Yap
        </a>
    `;

}

    navbar += `
        </div>
            <button id="logoutBtn" class="btn btn-error">
                Çıkış Yap
            </button>
        </div>
`;

async function loadProducts() {
    const { data: products } = await axios.get("/products");
    
    let html = `<div class="grid grid-cols-3 gap-6 px-6">
        `;

    products.forEach(v => {

        
        html += `
            <div class="card bg-base-100 gap-2 shadow-lg p-6">
                <h2 class="text-lg font-semibold">${v.name}</h2>
                <p class="text-primary text-xl">${v.price}TL</p>
                <p class="text-sm">${v.stock} tane kaldı.</p>
                <p class="text-sm opacity-70">Kategori: ${v.category}</p>
                <button onclick="orderProduct(${v.id})" class="btn btn-primary">Sipariş Ver</button>
            </div>
        
            
        `;
        
        const logoutBtn = document.getElementById("logoutBtn");

            if (logoutBtn) {
                logoutBtn.addEventListener("click", () => {
                    localStorage.removeItem("token");
                    window.location.href = "/login.html";
                });
            };
    });
    html += `</div>`;
    app.innerHTML = navbar + html;
} 

loadProducts();


