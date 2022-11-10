import {
  getApiUserInformations,
  getApiUserPets,
  getApiProfileUpdate,
  getApiDeleteUser,
  getApiRegisterPet,
  getApiUpdatePet,
  getReadMyAdoptions
} from "../requests.js"

function openModal(child) {
  if (child) {
    const divModalBackground = document.createElement("div")
    const sectionModalContainer = document.createElement("section")
    const divButtonCloseContainer = document.createElement("div")
    const buttonModalClose = document.createElement("button")
    const imgX = document.createElement("img")
    const divChild = document.createElement("div")
    const divBrandBox = document.createElement("div")

    divModalBackground.classList = "modal-bg-container"
    divModalBackground.id = "modal"

    sectionModalContainer.classList = "modal-container"
    divButtonCloseContainer.classList = "button-close-container"
    divBrandBox.classList = "purple-box"

    imgX.src = "../assets/xFigma.svg"
    imgX.id = "img-close-modal"

    buttonModalClose.id = "button-close-modal"

    buttonModalClose.appendChild(imgX)
    divButtonCloseContainer.appendChild(buttonModalClose)
    divChild.append(child)
    sectionModalContainer.append(divButtonCloseContainer, divChild, divBrandBox)
    divModalBackground.appendChild(sectionModalContainer)

    const main = document.querySelector("main")
    main.appendChild(divModalBackground)

    divModalBackground.addEventListener("mousedown", (event) => {
      if (
        event.target.className == "modal-bg-container" ||
        event.target.id == "img-close-modal" ||
        event.target.id == "button-close-modal"
      ) {
        divModalBackground.remove()
      }
    })
  }
}
function closeModal() {
  const div = document.querySelector("#modal")
  div.remove()
}

const token = localStorage.getItem("token")
export const initPerfil = await getApiUserInformations()
export const initUserPets = await getApiUserPets()

function logoutEvent() {
  const button = document.querySelector("#logout")
  button.addEventListener("click", () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.location.replace("../../index.html")
  })
}

async function renderUserInformations(perfil) {
  if (perfil) {
    const imgAvatar = document.querySelector("#avatar")
    imgAvatar.onerror = () => (imgAvatar.src = "../assets/no-image.png")

    const spanName = document.querySelector("#name")
    const spanEmail = document.querySelector("#email")

    imgAvatar.src = perfil.avatar_url
    imgAvatar.alt = perfil.name

    spanName.innerText = perfil.name

    spanEmail.innerText = perfil.email
  }
}

function renderUserPets(pets) {
  const ulPetsList = document.querySelector("#petsList")
  ulPetsList.innerHTML = ""

  if (pets.length != 0) {
    pets.forEach((pet) => {
      const li = document.createElement("li")
      const img = document.createElement("img")
      const div = document.createElement("div")
      const p = document.createElement("p")
      const span = document.createElement("span")
      const spanName = document.createElement("span")
      const p2 = document.createElement("p")
      const span2 = document.createElement("span")
      const spanSpecies = document.createElement("span")
      const p3 = document.createElement("p")
      const span3 = document.createElement("span")
      const spanAdoption = document.createElement("span")
      const buttonUpdate = document.createElement("button")

      li.classList = "card"
      span.classList = "color-brand-1"
      spanName.classList = "color-black"
      span2.classList = "color-brand-1"
      spanSpecies.classList = "color-black"
      span3.classList = "color-brand-1"
      spanAdoption.classList = "color-black"
      buttonUpdate.classList = "button button-user button-brand"

      img.src = pet.avatar_url
      img.onerror = () => (img.src = "../assets/no-image.png")

      span.innerText = "Nome: "
      span2.innerText = "Espécie: "
      span3.innerText = "Adotável: "

      spanName.innerText = pet.name
      spanSpecies.innerText = pet.species
      if (pet.available_for_adoption) {
        spanAdoption.innerText = "Sim"
      } else {
        spanAdoption.innerText = "Não"
      }
      buttonUpdate.innerText = "Atualizar"

      p.append(span, spanName)
      p2.append(span2, spanSpecies)
      p3.append(span3, spanAdoption)
      div.append(p, p2, p3, buttonUpdate)
      li.append(img, div)

      ulPetsList.appendChild(li)

      buttonUpdate.addEventListener("click", () => {
        const divAll = document.createElement("div")
        const pTitle = document.createElement("p")
        const form = document.createElement("form")
        const inputName = document.createElement("input")
        const inputBread = document.createElement("input")
        const inputSpecies = document.createElement("input")
        const inputAvatar = document.createElement("input")
        const buttonUpdate = document.createElement("button")

        divAll.classList = "modal-container-content"
        buttonUpdate.classList = "button button-header button-brand"

        pTitle.innerText = "Atualizar pet"
        buttonUpdate.innerText = "Atualizar"

        inputName.name = "name"
        inputName.placeholder = "Nome"

        inputBread.name = "bread"
        inputBread.placeholder = "Raça"

        inputSpecies.name = "species"
        inputSpecies.placeholder = "Espécie"

        inputAvatar.name = "avatar_url"
        inputAvatar.placeholder = "Avatar"

        form.append(
          inputName,
          inputBread,
          inputSpecies,
          inputAvatar,
          buttonUpdate
        )
        divAll.append(pTitle, form)

        openModal(divAll)

        form.addEventListener("submit", async (event) => {
          event.preventDefault()
          const inputs = [...event.target]
          let body = Object()
          inputs.forEach((input) => {
            if (input.tagname !== "BUTTON" && input.value != "") {
              body[input.name] = input.value
            }
          })
          const response = await getApiUpdatePet(body, pet.id)
          if (response) {
            closeModal()
            renderUserPets(await getApiUserPets())
          }
        })
      })
    })
  }
}

async function updateUserInformationsEvent() {
  const buttonUpdate = document.querySelector("#updateUser")
  buttonUpdate.addEventListener("click", () => {
    const divAll = document.createElement("div")
    const pTitle = document.createElement("p")
    const form = document.createElement("form")
    const inputName = document.createElement("input")
    const inputAvatar = document.createElement("input")
    const buttonSubmit = document.createElement("button")

    divAll.classList = "modal-container-content"
    pTitle.innerText = "Atualizar perfil"
    buttonSubmit.classList = "button button-header button-brand"

    inputName.placeholder = "Nome"
    inputAvatar.placeholder = "Avatar"

    inputName.name = "name"
    inputAvatar.name = "avatar_url"

    buttonSubmit.innerText = "Atualizar"
    buttonSubmit.type = "submit"

    form.append(inputName, inputAvatar, buttonSubmit)

    divAll.append(pTitle, form)
    openModal(divAll)

    form.addEventListener("submit", async (event) => {
      event.preventDefault()
      const inputs = [...event.target]
      let body = Object()
      inputs.forEach((input) => {
        if (input.tagname !== "BUTTON" && input.value != "") {
          body[input.name] = input.value
        }
      })
      const response = await getApiProfileUpdate(body)
      if (response) {
        closeModal()
        renderUserInformations(await getApiUserInformations())
      }
    })
  })
}
async function deleteUserEvent() {
  const buttonDelete = document.querySelector("#deleteUser")
  buttonDelete.addEventListener("click", () => {
    const divAll = document.createElement("div")
    const pTitle = document.createElement("p")
    const buttonCancel = document.createElement("button")
    const buttonConfirm = document.createElement("button")

    divAll.classList = "modal-container-content"
    buttonCancel.classList = "button button-header button-brand"
    buttonCancel.style.marginBottom = "1rem"
    buttonConfirm.classList = "button button-header button-border-red"

    buttonCancel.innerText = "Não desejo deletar minha conta"
    buttonConfirm.innerText = "Quero deletar minha conta"

    divAll.append(buttonCancel, buttonConfirm)
    openModal(divAll)

    buttonCancel.addEventListener("click", () => {
      closeModal()
    })
    buttonConfirm.addEventListener("click", async () => {
      const response = await getApiDeleteUser()
      if (response) {
        window.location.replace("../../index.html")
      }
    })
  })
}

async function registerPetEvent() {
  const buttonRegister = document.querySelector("#registerPet")
  buttonRegister.addEventListener("click", () => {
    const divAll = document.createElement("div")
    const pTitle = document.createElement("p")
    const form = document.createElement("form")
    const inputName = document.createElement("input")
    const inputBread = document.createElement("input")
    const inputSpecies = document.createElement("input")
    const inputAvatar = document.createElement("input")
    const buttonSubmit = document.createElement("button")

    divAll.classList = "modal-container-content"
    buttonSubmit.classList = "button button-header button-brand"

    pTitle.innerText = "Cadastrar pet"

    inputName.name = "name"
    inputName.placeholder = "Nome"

    inputBread.name = "bread"
    inputBread.placeholder = "Raça"

    inputSpecies.name = "species"
    inputSpecies.placeholder = "Espécie"

    inputAvatar.name = "avatar_url"
    inputAvatar.placeholder = "Avatar"

    buttonSubmit.innerText = "Cadastrar"

    form.append(inputName, inputBread, inputSpecies, inputAvatar, buttonSubmit)
    divAll.append(pTitle, form)
    openModal(divAll)

    form.addEventListener("submit", async (event) => {
      event.preventDefault()
      const inputs = [...event.target]
      let body = Object()
      inputs.forEach((input) => {
        if (input.tagname !== "BUTTON" && input.value != "") {
          body[input.name] = input.value
        }
      })
      console.log(body)
      await getApiRegisterPet(body)
      
        
      
      
    })
   
  })
}

async function readToAdoptPets() {
    const data = await getApiUserPets()
    console.log(data)
    renderUserPets(data)
}

function switchButtonsProfile(){
  const btnMenu = document.querySelector('#menu')
  const btnX = document.querySelector('#closeMenu')
  const divButtons = document.querySelector('#drop-nav')

  btnMenu.addEventListener('click',() => {
      btnMenu.classList.add('hidden')
      btnX.classList.remove('hidden')
      divButtons.classList.remove('desk-buttons')
  })

  btnX.addEventListener('click',() => {
      btnMenu.classList.remove('hidden')
      btnX.classList.add('hidden')
      divButtons.classList.add('desk-buttons')
  })
}

export {
  logoutEvent,
  renderUserInformations,
  renderUserPets,
  updateUserInformationsEvent,
  deleteUserEvent,
  registerPetEvent,
  readToAdoptPets,
  closeModal,
  switchButtonsProfile
}
