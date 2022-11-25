import fnProcessos from "./processos.js"
import fnPaineil from './painel.js'

const processos = fnProcessos()
const painel = fnPaineil()
const grade = fnGrade()

grade.ativarPainel(painel)
grade.iniciar()

function fnGrade (){
    let divGrade = $('.grade')
    let tamanhoDasCedulas = 10
    let pausado = true

    function iniciar(){
        montarGrade()
        rodar()
    }

    function rodar(){
        if(!pausado){
            processos.processarCedulas()
        }

        requestAnimationFrame(rodar)
    }
    
    function montarGrade(){
        let bodyW = $('body').width()
        let bodyH = $('body').height()
        let numeroDeColunas = Math.floor( bodyW / tamanhoDasCedulas )
        let NumeroDeLinhas = Math.floor( bodyH / tamanhoDasCedulas )

        for(let idDaColuna = 1; idDaColuna < numeroDeColunas; idDaColuna++){
            let coluna = $('<div>')
            
            for(let idDaLinha = 1; idDaLinha < NumeroDeLinhas; idDaLinha++){
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

        if(cedula.hasClass('cedula-marcada')){
            cedula.removeClass('cedula-marcada')
            processos.desmarcarCedula()
        }else{
            cedula.addClass('cedula-marcada')
            processos.marcarCedula()
        }
    }

    return {
        iniciar
    }
}