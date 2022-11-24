let divGame = document.querySelector('.jogo')

let width = 90
let height = 40
let weight = 15
let fps = 100
let ligado = true
let cedulasMarcadas = {}
let cedulasAcusadas = {}
let listaParaMarcar = []
let listaParaDesmarcar = []

montarPainel()
ajustarResolucao()
atualizarJogo()

function montarPainel(){
    let buttonPause = document.querySelector('.btn-pause')

    buttonPause.addEventListener('click',btnPause)

    let fpsInput = document.querySelector('.fps-input')
    
    fpsInput.value = fps
    fpsInput.addEventListener('keydown',(evento)=>{ if(evento.key == 'Enter') fps = eval(evento.target.value) })

    let buttonAjustar = document.querySelector('.btn-ajustar')

    buttonAjustar.addEventListener('click',ajustarResolucao)
}

function btnPause({ target }){
    if(target.innerText == 'Rodando'){
        target.innerText = 'Pausado'
        ligado = false
    }else{
        target.innerText = 'Rodando'
        ligado = true
        setTimeout(atualizarJogo,fps)
    }
}

function ajustarResolucao(){
    let bodyH = document.body.clientHeight
    let bodyW = document.body.clientWidth

    let bordaH = parseInt(bodyH/weight*3)
    let bordaW = parseInt(bodyW/weight*3)

    height = parseInt((bodyH-bordaH)/weight)
    width = parseInt((bodyW-bordaW)/weight)

    montarTabuleiro()
}

function montarTabuleiro(){
    divGame.innerHTML = ''

    for(let x = 0; x < width; x++){
        let coluna = `<div class='coluna' id='c${x}'>`
        
        for(let y = 0; y < height; y++){
            coluna += `<div class='cedula' id='l${y}' style='width: ${weight}px; height: ${weight}px'></div>`
        }

        divGame.innerHTML += coluna + '</div>'
    }

    adicionarEventosNasCedulas()
}

function adicionarEventosNasCedulas(){
    let cedulas = document.querySelectorAll('.cedula')
    
    cedulas.forEach(cedula => {
        cedula.addEventListener('click',clicouNaCedula)
    })
}

function clicouNaCedula({ target }){
    if(target.classList.value.includes('cedula-marcada')){
        let coluna = tratarId(target.parentElement.id) 
        let linha =  tratarId(target.id)
        desmarcarCedula({x: coluna, y: linha, div: target})
    }else{
        adicionarAListaDeMarcadas(target)
    }
}

function atualizarJogo(){

    verificarCedulasMarcadas()
    verificarCedulasAcusadas()
    atualizarCedulas()
    
    if(ligado) setTimeout(atualizarJogo,fps)
}

function verificarCedulasMarcadas(){
    cedulasAcusadas = {}

    for(let id in cedulasMarcadas){
        let cedula = cedulasMarcadas[id]
        acusarAsCedulasAoRedor(cedula)
    }
}

function verificarCedulasAcusadas(){
    listaParaMarcar = []
    listaParaDesmarcar = []

    for(let id in cedulasAcusadas){
        let cedula = cedulasAcusadas[id]
        let marcada = cedulasMarcadas[`${cedula.x}x${cedula.y}`]
        let numeroDeVizinhas = contarVizinhas(cedula)
        
        cedula.div = encontrarDiv(cedula)
        
        if(marcada){
            if(numeroDeVizinhas < 2 || numeroDeVizinhas > 3) listaParaDesmarcar.push(cedula)
        }else{
            if(numeroDeVizinhas == 3) listaParaMarcar.push(cedula.div)
        }
    }
}

function atualizarCedulas(){
    listaParaDesmarcar.forEach(cedula => desmarcarCedula(cedula))
    listaParaMarcar.forEach(div => adicionarAListaDeMarcadas(div))
}

function contarVizinhas(cedula){
    let numeroDeVizinhas = 0
    let vizinhas = encontarCedulasVizinhas(cedula)

    vizinhas.forEach(vizinha =>{
        if(cedulasMarcadas[`${vizinha.x}x${vizinha.y}`]) numeroDeVizinhas++ 
    })

    return numeroDeVizinhas
}

function acusarAsCedulasAoRedor(cedula){
    let cedulasVizinhas = encontarCedulasVizinhas(cedula,false)

    cedulasVizinhas.forEach(cedula => {
        acusarCedula(cedula)
    })
}

function encontarCedulasVizinhas(cedula,pularAPropriaCedula=true){
    let vizinhas = []
    
    for(let x = cedula.x-1; x < cedula.x+2; x++){
        for(let y = cedula.y-1; y < cedula.y+2; y++){
            if(x == cedula.x && y == cedula.y && pularAPropriaCedula) continue
            if(x > -1 &&  y > -1 && x < width && y < height) vizinhas.push({ x, y })
        }
    }

    return vizinhas
}

function acusarCedula({ x, y }){
    let id = `${x}x${y}`

    if(!cedulasAcusadas[id]) cedulasAcusadas[id] = { x, y }
}

function encontrarDiv(cedula){
    let coluna = document.querySelector(`#c${cedula.x}`)

    return coluna.children[cedula.y]
}

function adicionarAListaDeMarcadas(cedula){
    let coluna = tratarId(cedula.parentElement.id) 
    let linha =  tratarId(cedula.id)

    cedulasMarcadas[`${coluna}x${linha}`] = {
        div: cedula,
        x: coluna,
        y: linha
    }
    
    cedula.classList.add('cedula-marcada')
}


function desmarcarCedula(cedula){
    delete cedulasMarcadas[`${cedula.x}x${cedula.y}`]
    
    cedula.div.classList.remove('cedula-marcada')
}

function tratarId(id){
    return eval(id.slice(1,id.lenght))
}
