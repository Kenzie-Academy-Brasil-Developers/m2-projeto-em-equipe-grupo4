import toast from "./toast.js";

const baseUrl = "https://m2-api-adot-pet.herokuapp.com"

async function login(body) {

    try {
        const request = await fetch(baseUrl + "/session/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (request.ok) {
            const response = await request.json()
            toast("Sucesso", "Login feito com sucesso");

            localStorage.setItem("user", JSON.stringify(response))

            const validation = await validateUser()

            if (validation.is_admin) {
                setTimeout(() => {
                    window.location.assign(`${window.location.origin}/pages/Admin/admin.html`);
                }, 4000)
            }
            else {
                setTimeout(() => {
                    window.location.assign(`${window.location.origin}/pages/User/user.html`);
                }, 4000)
            }

        } else {
            toast("Erro", "Erro ao fazer o login")
        }


    }
    catch (err) {
        console.log(err)
        toast("Erro", "Erro ao fazer o login")

    }

}
