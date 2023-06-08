class CalcController {

    constructor() {
        this._locale = 'pt-BR';
        this._operation = [];
        this._dispalyCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        //Busca a funcao setDisplayDateTime a cada 1 segundo 
        this.setDisplayDateTime();
        let interval = setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);


        // setTimeout(() => {
        //     clearInterval(interval);
        // }, 5000);
    }

    // Funcao para formatacao de data e hora a serem apresentados no display
    setDisplayDateTime() {
        this.dispalyTime = this.currentDate.toLocaleTimeString(this._locale);
        this.dispalyDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'short',
            year: "numeric"
        });
    }






    // Criacao dos eventos para os botoes ----------------------
    initButtonsEvents() {
        //buttons sera uma lista de nods
        const buttons = document.querySelectorAll('#buttons > g, #parts > g');//todos os elementos <g> filhos de buttons parts

        buttons.forEach(btn => {

            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');
                this.execBtn(textBtn);
                console.log(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            });

        });
    }

    // Funcao para adicionar mais de um evento em um mesmo elemento
    addEventListenerAll(element, events, fn) {
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);//flase para n permitir acao duplicada 
        });
    }
    // Fim dos eventos para os botoes ----------------------








    //Funcoes para botoes de operações --------------
    // Botao AC
    clearAll() {
        this._operation = [];
    }

    // Botao CE
    cancelEntry() {
        this._operation.pop();
    }
    // Fim para botoes de operações   --------------






    // Funcoes pra controller das operacoes do calculator ----------------------------
    //Funcao apresenta mens Error em caso de falha 
    setError() {
        this.dispalyCalc = 'Error';
    }

    //
    addOperation(value) {

        if (isNaN(this.getLastOperation())) { //checks if the last position is not a Number

            //last position is not a Number
            if (this.isOperation(value)) { //checks if the value is an operation

                //last position is not a Number and value is an operation
                if (this.isOperation(this.getLastOperation)) { 
                    this.setLastOperation(value);

                }

            } else if (isNaN(value)) { //checks if the value is not a Number
                //value is not a Number
                console.log(`teste ${value}`);

            } else {
                //value is a Number
                this.addLastOperation(value);

            }


            
        } else {
            //last position is a Number
            if (this.isOperation(value)) {
                this.addLastOperation(value);

            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
            }
            
        }
    }

    // Funcao retorna o valor da ultima posicao do Array operation
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
        console.log(this._operation);
    }

    addLastOperation(value) {
        this._operation.push(value);
        console.log(this._operation);
    }

    //Funcao retorna true caso value for um button de operacao 
    isOperation(value) {
        //returm true or false
        return ['+', '-', '*', '/', '%'].indexOf(value) > -1;
    }
    // Fim pra controller das operacoes do calculator ----------------------------









    // Fumcao para acao dos botoes
    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.cancelEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':

                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }
    }










    //Get's e set's
    get dispalyCalc() {
        return this._dispalyCalcEl.innerHTML;
    }

    set dispalyCalc(value) {
        this._dispalyCalcEl.innerHTML = value;
    }


    get dispalyTime() {
        return this._timeEl.innerHTML;
    }

    set dispalyTime(value) {
        this._timeEl.innerHTML = value;
    }


    get dispalyDate() {
        return this._dateEl.innerHTML;
    }

    set dispalyDate(value) {
        this._dateEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}