export default ()=>{
    let divGrade = $('.grade')
    let tamanhoDasCedulas = 10
    let altura = 0
    let largura = 0
    let funcaoDeInteracao

    montarGrade()

    function montarGrade(){
        let numeroDeColunas = Math.floor( $('body').width() / tamanhoDasCedulas )
        let numeroDeLinhas = Math.floor( $('body').height() / tamanhoDasCedulas )

        altura = numeroDeLinhas
        largura = numeroDeColunas

        for(let idDaColuna = 1; idDaColuna <= numeroDeColunas; idDaColuna++){
            let coluna = $('<div>')
            
            for(let idDaLinha = 1; idDaLinha <= numeroDeLinhas; idDaLinha++){
            let id = `${idDaColuna}x${idDaLinha}`

                criarCedula(coluna, id)
            }

            divGrade.append(coluna)
        }
    }

    function criarCedula(coluna, id){
        let cedula = $('<div>')

        cedula.attr('id',id)
        cedula.css('width', `${tamanhoDasCedulas}`)
        cedula.css('height', `${tamanhoDasCedulas}`)
        cedula.addClass('cedula')
        cedula.click(clicouNaCedula)
        
        coluna.append(cedula)
    }

    function clicouNaCedula({ target }){
        let cedula = $(`#${target.id}`)
        let id = target.id

        if(cedula.hasClass('cedula-marcada')){
            cedula.removeClass('cedula-marcada')
            funcaoDeInteracao.desmarcarCedula(id)
        }else{
            cedula.addClass('cedula-marcada')
            funcaoDeInteracao.acusarCedula(id)
        }
    }

    function atribuirInteracao(interacao){
        funcaoDeInteracao = interacao
    }

    function alturaDaGrade (){ return altura }

    function larguraDaGrade (){ return largura }

    return {
        larguraDaGrade,
        alturaDaGrade,
        atribuirInteracao
    }
}