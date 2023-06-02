class CalcController {

    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._dispalyCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
        let interval = setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);


        // setTimeout(() => {
        //     clearInterval(interval);
        // }, 5000);

    }


    setError() {
        this.dispalyCalc = 'Error';
    }

    clearAll() {
        this._operation = [];
    }

    cancelEntry() {
        this._operation.pop();
    }

    
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {
            console.log('aqui');
            this._operation.push(value);
            console.log(this._operation);

        } else {
            console.log(this._operation.pop());
        }

             
    }

    getLastOperation(){
        return this._operation[this._operation.length -1];
    }



    addEventListenerAll(element, events, fn) {
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.cancelEntry();
                break;

            case 'soma':

                break;

            case 'subtracao':

                break;

            case 'divisao':

                break;

            case 'multiplicacao':

                break;

            case 'porcento':

                break;

            case 'igual':

                break;

            case 'ponto':

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

                break;
        }
    }

    initButtonsEvents() {
        //buttons será uma lista de nod
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        //console.log(buttons);
        buttons.forEach(btn => {

            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');
                console.log(textBtn);
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            });

        });
    }

    setDisplayDateTime() {
        this.dispalyTime = this.currentDate.toLocaleTimeString(this._locale);
        this.dispalyDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'short',
            year: "numeric"
        });
    }


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