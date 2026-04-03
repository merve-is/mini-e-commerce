import '../style.css'
import axios from './auth.js'

const token = localStorage.getItem("token");

// token yoksa login'e gönder
if(!token){
    window.location.href = "/login.html";
}

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const app = document.getElementById("app");

async function loadProfile() {
    try {
        const { data } = await axios.get("/auth/me");

        app.innerHTML = `
        <div class="flex justify-center mt-16">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body bg-blue-100 text-gray-800 rounded-lg">
                    <img class="h-6 w-6" src="user.png">
                    <h2 class="text-lg text-gray-900 font-semibold">Profil</h2>
                    <p class="font-semibold opacity-70">Email: ${data.email}</p>
                    <button id="logoutBtn" class="border-b-cyan-950 font-semibold flex justify-items-start p-2">
                        <div class="badge badge-neutral badge-outline p-4">Çıkış Yap</div>
                        
                    </button>
                </div>
            </div>
        </div>
        `;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "/login.html";
        });
    } catch (err) {
        console.log("PROFILE ERROR:", err.response);
        alert("Profil yüklenemedi");
        
    }
}
loadProfile();