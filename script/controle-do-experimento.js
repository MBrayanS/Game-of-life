import gradeConstrutor from "./grade-construtor.js";
import fnProcessos from './processos.js'

let grade = gradeConstrutor()
let processos = fnProcessos(grade.alturaDaGrade(), grade.larguraDaGrade())
let atualizacoesPorSegundo = 200
let pausado = true
let painel = fnPainel({ atualizacoesPorSegundo, pausado })

grade.atribuirInteracao(processos)

ativarExperimento()

function ativarExperimento(){
    if(!pausado){
        processos.varrerCedulasAcusadas()
    }
    
    painel.atualizarNumeroDeCedulasmarcadas()
    
    setTimeout(ativarExperimento, atualizacoesPorSegundo)
}

function fnPainel(){

    $('#atualizacoes-por-segundo').attr('value', atualizacoesPorSegundo) 
    $('#atualizacoes-por-segundo').focusout(({ target })=>{ atualizacoesPorSegundo = target.value })
    $('#atualizacoes-por-segundo').on('keydown',({ target, key})=>{
        if(key == 'Enter') atualizacoesPorSegundo = target.value
    })

    $('#btn-pause').click(({ target })=>{
        if( target.innerText == 'Rodando' ){ target.innerText = 'Pausado' }
        else { target.innerText = 'Rodando' }

        pausado = !pausado 
    })    

    $('#limpar-grade').click(()=>{ processos.limparGrade() })

    function atualizarNumeroDeCedulasmarcadas(){
        $('#cedulas-marcadas').html( processos.numeroDeCedulasMarcadas() )
    }

    $('.expande-painel').click(()=>{
        let divPainel = $('.painel')

        if(divPainel.hasClass('painel--escondido')){
            divPainel.removeClass('painel--escondido')
            divPainel.addClass('painel--visivel')
            $('.expande-painel').removeClass('expande-painel--escondido')
        }else{
            divPainel.removeClass('painel--visivel')
            divPainel.addClass('painel--escondido')
            $('.expande-painel').addClass('expande-painel--escondido')
        }
    })

    return {
        atualizarNumeroDeCedulasmarcadas
    }
}


