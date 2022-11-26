import fnProcessos from "./processos.js"
import fnPainel from './painel.js'

const grade = fnGrade({
    fnProcessos,
    fnPainel
})

grade.iniciar()

function fnGrade (params){
    let divGrade = $('.grade')
    let tamanhoDasCedulas = 10
    let pausado = false
    let altura
    let largura
    let processos
    let painel

    function iniciar(){
        montarGrade()

        processos = params.fnProcessos(altura, largura)
        painel = params.fnPainel()

        rodar()
    }

    function rodar(){
        console.log('Atualizar ->')
        if(!pausado){
            processos.varrerCedulasAcusadas('.grade','cedula-marcada')
        }

        setTimeout(rodar,3000)
    }
    
    function montarGrade(){
        let numeroDeColunas = Math.floor( $('body').width() / tamanhoDasCedulas )
        let numeroDeLinhas = Math.floor( $('body').height() / tamanhoDasCedulas )

        altura = numeroDeLinhas
        largura = numeroDeColunas

        for(let idDaColuna = 1; idDaColuna < numeroDeColunas; idDaColuna++){
            let coluna = $('<div>')
            
            for(let idDaLinha = 1; idDaLinha < numeroDeLinhas; idDaLinha++){
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
            processos.desmarcarCedula(id)
        }else{
            cedula.addClass('cedula-marcada')
            processos.acusarCedula(id)
        }
    }

    return {
        iniciar
    }
}