import axios from "axios"

axios.defaults.baseURL = "https://api.zaferayan.com";

const token = localStorage.getItem("token");

if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}



window.orderProduct = async function(id){

    const token = localStorage.getItem("token");

    // eğer token yoksa login'e gönder
    if(!token){
        alert("Sipariş vermek için giriş yapmalısınız");

        window.location.href = "/login.html";
        return;
    }

    try{

        await axios.post("/orders", {
            productId: id,
            quantity: 1
        });

        alert("Sipariş oluşturuldu");

    }catch(err){

        console.log(err.response);

        alert("Sipariş oluşturulamadı");

    }

}