import '../style.css'
import axios from './auth.js'

const app = document.getElementById("app");

app.innerHTML = `
<div class="min-h-screen flex items-center justify-center bg-base-300">
        <div class="card w-96 bg-base-200 shadow-xl">
            <div class="card-body">
                <h2 class="card-title justify-center">Kayıt Ol</h2>
                <div class="form-control">
                <label class="label">
                    <span class="label-text">Kullanıcı Adı</span>
                </label>
                <input id="username" type="text" class="input input-bordered" />
            </div>
                <div class="form-control">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input id="email" type="email" placeholder="ornek@mail.com" class="input input-bordered" />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Şifre</span>
                </label>
                <input id="password" type="password" placeholder="••••••••" class="input input-bordered" />
            </div>
            <div class="form-control mt-4">
                <button id="registerBtn" class="btn btn-primary">Kayıt Ol</button>
            </div>
            </div>
        </div>
    </div>


`;

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        await axios.post("/auth/register", {
            username,
            email,
            password
        });

        alert("Kayıt başarılı");

        window.location.href = "/login.html";

    } catch (error) {

        alert("Kayıt başarısız");

    }

});