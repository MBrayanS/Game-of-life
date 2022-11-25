const grade = {
    divGrade: $('.grade'),
    tamanhoDasCedulas: 15,

    iniciar(){
        this.ajustarGrade()
        this.montarGrade()
    },

    ajustarGrade(){
        this.divGrade.width($('body').width()-160)
        this.divGrade.height($('body').height()-90)
        this.divGrade.css('border', '1px solid red')
    },

    montarGrade(){
        let colunas = this.divGrade.height()/this.tamanhoDasCedulas
        let linhas = this.divGrade.width()/this.tamanhoDasCedulas

        for(let coluna = 1; coluna < colunas; coluna++){
            let tr = $('<tr>')

            for(let linha = 1; linha < linhas; linha++){
                let id = `${coluna}x${linha}`
                
                this.criarTd(tr, id)
            }

            this.divGrade.append(tr)
        }
    },

    criarTd(tr, id){
        let td = $('<td>')

        td.attr('id',id)
        td.addClass('cedula')
        td.css('width', `${this.tamanhoDasCedulas}`)
        td.css('height', `${this.tamanhoDasCedulas}`)
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