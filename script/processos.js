export default (altura, largura)=>{
    let cedulasMarcadas = {}
    let cedulasAcusadas = {}
    let alturaLimite = altura
    let larguraLimite = largura
    let listaParaMarcar = []
    let listaParaDesmarcar = []
    let seletorDaGrade = '.grade'
    let classDeEstilizacao = 'cedula-marcada'

    function varrerCedulasAcusadas(){
        for(let id in cedulasAcusadas){
            analizarCedula(id)
            delete cedulasAcusadas[id]
        }
        atualizarGrade()
    }
    
    function analizarCedula(id){
        let elemento = $(seletorDaGrade)
        let vizinhas = retornarVizinhas(cedulasAcusadas[id])
        let vizinhasMarcadas = 0
        let cedulaMarcada = elemento.find(`#${id}`).hasClass(classDeEstilizacao)

        for(let index in vizinhas){
            let div = elemento.find(`#${index}`)

            if(index == id) continue
            if( div.hasClass(classDeEstilizacao) ) vizinhasMarcadas++
        }

        atualizarCedula({id, vizinhasMarcadas, cedulaMarcada})
    }

    function atualizarGrade(){
        listaParaDesmarcar.forEach( id => desmarcarCedula(id) )
        listaParaMarcar.forEach( id => acusarCedula(id) )

        listaParaDesmarcar = []
        listaParaMarcar = []
    }

    function atualizarCedula({id, vizinhasMarcadas, cedulaMarcada}){
        
        if(vizinhasMarcadas < 2 || vizinhasMarcadas > 3){
            listaParaDesmarcar.push(id)
        }else if(vizinhasMarcadas == 3) {
            listaParaMarcar.push(id)
        }else{
            if(cedulaMarcada){
                listaParaMarcar.push(id)
            }
        }
    }

    function retornarVizinhas({ coluna, linha }){
        let r = 1
        let vizinhas = {}

        for(let x = coluna-r; x <= coluna+r; x++){
            for(let y = linha-r; y <= linha+r; y++){
                if(x > 0 && y > 0 && x < larguraLimite && y < alturaLimite) vizinhas[`${x}x${y}`] = {coluna: x, linha: y}
            }
        }

        return vizinhas
    }

    function marcarCedula(id){
        cedulasMarcadas[id] = id
        $(seletorDaGrade).find(`#${id}`).addClass(classDeEstilizacao);
    }
    
    function desmarcarCedula(id){
        delete cedulasMarcadas[id]
        $(seletorDaGrade).find(`#${id}`).removeClass(classDeEstilizacao);
    }
    
    function acusarCedula(id){
        let posicao = tratarId(id)
        let vizinhas = retornarVizinhas(posicao)

        marcarCedula(id)
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

    function limparGrade(){
        for(let id in cedulasAcusadas){
            desmarcarCedula(id)
        }
    }

    return {
        acusarCedula,
        desmarcarCedula,
        numeroDeCedulasMarcadas,
        limparGrade,
        varrerCedulasAcusadas
    }
}