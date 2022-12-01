import gradeConstrutor from "./grade-construtor.js";
import fnProcessos from './processos.js'

let grade = gradeConstrutor()
let processos = fnProcessos(grade.alturaDaGrade(), grade.larguraDaGrade())
let atualizacoesPorSegundo = 200
let pausado = true

grade.atribuirInteracao(processos)

ativarExperimento()
painel({ atualizacoesPorSegundo, pausado })

function ativarExperimento(){
    if(!pausado){
        processos.varrerCedulasAcusadas()
    }

    setTimeout(ativarExperimento, atualizacoesPorSegundo)
}

function painel(){

    $('.atualizacoes-por-segundo').attr('value', atualizacoesPorSegundo) 
    $('.atualizacoes-por-segundo').focusout(({ target })=>{ atualizacoesPorSegundo = target.value })

    $('.btn-pause').click(({ target })=>{
        if( target.innerText == 'Rodando' ){ target.innerText = 'Pausado' }
        else { target.innerText = 'Rodando' }

        pausado = !pausado 
    })    
}


