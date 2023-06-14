class CalcController {

    constructor() {
        this._locale = 'pt-BR';
        this._operation = [0];
        this._dispalyCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this._lastOperation = '';
        this._lastNumber = '';
        this._result = '';

        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        //Busca a funcao setDisplayDateTime a cada 1 segundo 
        this.setDisplayDateTime();
        let interval = setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        this.dispalyCalc = this.getLastOperation();

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








    // Funcoes para botoes de operações --------------
    // Botao AC
    clearAll() {
        this._operation = [0];
        this.result = '';
        this.dispalyCalc = this.getLastOperation();
    }

    // Botao CE
    cancelEntry() {
        this._operation.pop();
        if (this._operation.length == 0) {
            this._operation = ['0'];
        }
        this.result = '';
        this.setDisplayCalc();
    }
    // Fim para botoes de operações   --------------






    // Funcoes pra controller das operacoes do calculator ----------------------------
    // Funcao apresenta mens Error em caso de falha 
    setError() {
        this.dispalyCalc = 'Error';
        this.result = '';
    }

    //
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {
            //última posição do Array Operation não é um número

            if (this.isOperation(value)) {
                //Valor digitado é um operador 

                if (this.isOperation(this.getLastOperation())) {
                    //última posição do Array Operation é um operador

                    if (value != '%') {
                        this.setLastOperation(value);

                    } else {
                        this.addLastOperation(value, true);
                    }
                }

            } else if (isNaN(value)) {
                console.log(value);

            } else {
                //Valor digitado é um número
                
                this.addLastOperation(value, false);
            }



        } else {
            //última posição do Array Operation é um número
            
            if (this.isOperation(value)) {
                //Valor digitado é um operador

                this.addLastOperation(value, true);

            } else {
                if (this.result == '') {
                    //Valor digitado é um número e será concatenado com o número da ultima posição do Array
                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(newValue);

                } else {
                    //O valor no dispay é o result e não poderá ser concatenado com a entrado de um novo número
                    this.result = '';
                    this.setLastOperation(value);
                }

            }

        }
    }

    // Funcao retorna o valor da ultima posicao do Array operation
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    //Função altera a última posição do Array pelo value
    setLastOperation(value) {
        isNaN(value) ? this.lastOperation = value : this.lastNumber = value;
        this._operation[this._operation.length - 1] = value;
        this.result = '';
        this.setDisplayCalc();
        // console.log(this._operation);
    }

    // Função adiciona o value na proxima posição vazia do Array
    addLastOperation(value, op = true) {
        //op == true (operador)
        //op == false (numero)
        if (op) {
            if (this._operation.length <= 1 && value != '%') {

                this._operation.push(value);
                this.lastOperation = value
                this.result = '';
                this.setDisplayCalc();

            } else {
                this.lastOperation = value;
                this.result = '';
                this.calc();
            }

        } else {
            this._operation.push(value);
            this.lastNumber = value
            this.result = '';
            this.setDisplayCalc();
            // console.log(this._operation);
        }

    }

    //Funcao retorna true caso value for um button de operacao 
    isOperation(value) {
        //returm true or false
        return ['+', '-', '*', '/', '%'].indexOf(value) > -1;
    }


    setDisplayCalc() {
        this._dispalyCalcEl.innerHTML = this._operation.join(' ');
    }



    calc(equal = false) {

        if (equal) {

            if (this.result == '' && this._operation.length > 2) {
                this.result = eval(this._operation.join(' '));
                this._operation = [this.result];

            } else if (this.result != '' && this._operation.length == 2) {
                let value = this._operation.join(' ') + this.result;
                value = eval(value);
                this._operation = [value, this.lastOperation];

            } else if (this.result != '' && this._operation.length < 2) {
                let value = this.getLastOperation() + this.lastOperation + this.lastNumber;
                value = eval(value);
                this._operation = [value];
            }



        } else {
            if (this.lastOperation != '%') {
                this.result = eval(this._operation.join(' '));
                this._operation = [this.result, this.lastOperation];
            
            } else {
                if (this._operation.length == 1) {
                    this.result = (this.getLastOperation() / 100);
                    this._operation = [this.result];
                
                } else if (this._operation.length > 2) {
                    let value = (this.getLastOperation() / 100) * this._operation[0];
                    this.lastOperation = this._operation[1]
                    this.setLastOperation(value);
                
                } else {
                    return false;
                }
            }
        }


        this.setDisplayCalc();
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
                this.calc(true);
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

    get lastOperation() {
        return this._lastOperation;
    }

    set lastOperation(value) {
        this._lastOperation = value;
    }

    get lastNumber() {
        return this._lastNumber;
    }

    set lastNumber(value) {
        this._lastNumber = value;
    }

    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
    }
}