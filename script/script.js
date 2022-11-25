const grade = {
    divGrade: $('.grade'),
    tamanhoDasCedulas: 10,

    iniciar(){
        this.ajustarGrade()
        this.montarGrade()
    },

    ajustarGrade(){
        
        
        this.divGrade.css('border', '1px solid red')
    },
    
    montarGrade(){
        let bodyW = $('body').width()
        let bodyH = $('body').height()
        let colunas = this.calcularNumeroDeCedulas(bodyW)
        let linhas = this.calcularNumeroDeCedulas(bodyH)

        console.log(colunas,linhas)

        for(let coluna = 1; coluna < colunas; coluna++){
            let tr = $('<div>')
            
            for(let linha = 1; linha < linhas; linha++){
            let id = `${coluna}x${linha}`

                this.criarTd(tr, id)
            }

            this.divGrade.append(tr)
        }
    },

    calcularNumeroDeCedulas(largura){ return Math.floor( largura / this.tamanhoDasCedulas ) },

    criarTd(tr, id){
        let td = $('<div>')

        td.attr('id',id)
        td.css('width', `${this.tamanhoDasCedulas}`)
        td.css('height', `${this.tamanhoDasCedulas}`)
        td.addClass('cedula')
        td.click(this.clicouNaCedula)
        
        tr.append(td)
    },

    clicouNaCedula({ target }){
        let cedula = $(`#${target.id}`)

        if(cedula.hasClass('cedula-marcada')){
            cedula.removeClass('cedula-marcada')
        }else{
            cedula.addClass('cedula-marcada')
        }
    }
}

grade.iniciar()