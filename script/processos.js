export default (altura, largura)=>{
    let cedulasMarcadas = {}
    let cedulasAcusadas = {}
    let alturaLimite = altura
    let larguraLimite = largura
    let listaParaMarcar = []
    let listaParaDesmarcar = []
    
    function varrerCedulasAcusadas(seletor,nomeDaclass){
        let elemento = $(seletor)

        for(let id in cedulasAcusadas){
            analizarCedula({id, elemento, nomeDaclass})
        }

        cedulasAcusadas = {}
        atualizarGrade()
    }
    
    function analizarCedula({id, elemento, nomeDaclass}){
        let vizinhas = retornarVizinhas(cedulasAcusadas[id])
        let vizinhasMarcadas = 0
        let cedulaMarcada = elemento.find(`#${id}`).hasClass(nomeDaclass)

        for(let index in vizinhas){
            let div = elemento.find(`#${index}`)

            if(index == id) continue
            if( div.hasClass(nomeDaclass) ) vizinhasMarcadas++
        }

        atualizarCedula({cedulaMarcada, id, vizinhasMarcadas})
    }

    function atualizarGrade(){
        listaParaDesmarcar.forEach(id => desmarcarCedula(id))
        listaParaMarcar.forEach(id => marcarCedula(id))

        listaParaDesmarcar = []
        listaParaMarcar = []
    }

    function atualizarCedula({cedulaMarcada, id, vizinhasMarcadas}){
        
        if(vizinhasMarcadas < 2 || vizinhasMarcadas > 3){
            listaParaDesmarcar.push(id)
            console.log(' ',id,' --> ',vizinhasMarcadas, ' DESMARCADA')
        }else if(vizinhasMarcadas == 3) {
            listaParaMarcar.push(id)
            console.log(' ',id,' --> ',vizinhasMarcadas, ' MARCADA')
        }
    }

    function retornarVizinhas({ coluna, linha }){
        let r = 1
        let vizinhas = {}

        for(let x = coluna-r; x <= coluna+r; x++){
            for(let y = linha-r; y <= linha+r; y++){
                if(x > 0 && y > 0 && x < alturaLimite && y < larguraLimite) vizinhas[`${x}x${y}`] ={coluna: x, linha: y}
            }
        }

        return vizinhas
    }

    function marcarCedula(id){
        cedulasMarcadas[id] = id
        $('.grade').find(`#${id}`).addClass('cedula-marcada');
    }
    
    function desmarcarCedula(id){
        delete cedulasMarcadas[id]
        $('.grade').find(`#${id}`).removeClass('cedula-marcada');
    }
    
    function acusarCedula(id){
        console.log(id,' --> Acusada')
        let posicao = tratarId(id)
        let vizinhas = retornarVizinhas(posicao)

        acusarVizinhas(vizinhas)
    }

    function acusarVizinhas(vizinhas){
        for(let id in vizinhas){
            cedulasAcusadas[id] = vizinhas[id]
        }
    }

    function tratarId(id){
        let array = id.split('x')

        return { coluna: eval(array[0]), linha: eval(array[1]) }
    }

    function numeroDeCedulasMarcadas(){ return Object.keys(cedulasMarcadas).length }

    return {
        acusarCedula,
        desmarcarCedula,
        numeroDeCedulasMarcadas,
        varrerCedulasAcusadas
    }
}