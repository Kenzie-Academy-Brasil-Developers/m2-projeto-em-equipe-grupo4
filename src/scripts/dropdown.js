function switchButtons(){
    const btnMenu = document.querySelector('#menu')
    const btnX = document.querySelector('#closeMenu')
    const divButtons = document.querySelector('.div-btn-hidden')

    btnMenu.addEventListener('click',() => {
        btnMenu.classList.add('hidden')
        btnX.classList.remove('hidden')
        divButtons.classList.remove('hidden')
    })

    btnX.addEventListener('click',() => {
        btnMenu.classList.remove('hidden')
        btnX.classList.add('hidden')
        divButtons.classList.add('hidden')
    })
}

export{
    switchButtons
}