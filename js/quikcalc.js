$(function () {
    const quickcalcBtn = $('.calc_keys button');
    var quickcalcDisplay = $('.cal_display');
    var quickcalcDisplayPrev = $('.cal_display_prev');
    var quickcalcVal = quickcalcDisplay.html();
    var quickcalcAction;
    var previousValue = '';
    var keyVal;
    var operator = '';
    var result;
    var quickcalcPressed = 0;
    var quickCalcOperator = '';
    var quickcalcResult = '';
    var toReset = false;
    const operations = {'add':'+', 'subtract':'-', 'divide':'&#247;', 'multiply' : 'x'};

    function handleKeyAction(keyAction,keyValTemp = false){
        if(keyValTemp !== false){
            keyVal = keyValTemp;
        }
        if (operations.hasOwnProperty(keyAction) && !(quickcalcPressed === '0')) {
            quickCalcOperator = keyAction;
            previousValue = quickcalcDisplay.html();
            quickcalcDisplayPrev.html(previousValue + ' ' + operations[quickCalcOperator]);
            keyVal = '';
            toReset = true;
            quickcalcDisplay.html(quickcalcPressed);
        }

        if (((!keyAction) || keyAction === 'decimal') && quickcalcVal === '0' && !(keyAction === 'clear')) {
            keyVal = parseInt(keyVal);
            let shiftFactor = 10;
            if (keyAction === 'decimal') {
                if(quickcalcPressed.toString().indexOf('.') !== -1){
                    return 0;
                }
                keyVal = '.';
                shiftFactor = 1;
            }
            if(toReset){
                quickcalcPressed = 0;
                toReset = false;
            }
            quickcalcPressed = ((parseFloat(quickcalcPressed) === parseInt(quickcalcPressed) && quickcalcPressed.toString().indexOf('.') === -1) ? (parseFloat(quickcalcPressed) * shiftFactor) : quickcalcPressed) + keyVal;
            quickcalcDisplay.html(quickcalcPressed);
        }

        if (keyAction === 'calculate') {
            quickcalcDisplayPrev.html(previousValue + ' ' + operations[quickCalcOperator] + ' ' + quickcalcPressed + ' = ');
            quickcalcResult = calculate(previousValue, quickCalcOperator, quickcalcPressed);
            quickcalcDisplay.html(quickcalcResult);
            toReset = true;
            quickcalcPressed = quickcalcResult;
            previousValue = quickcalcResult;
            keyVal = '';
            result = '';
        }


        if (keyAction === 'clear') {
            quickcalcPressed = 0;
            previousValue = '';
            keyVal = '';
            operator = '';
            result = '';
            quickcalcDisplay.html(quickcalcPressed);
            quickcalcDisplayPrev.html('');
        }
        if (keyAction === 'delete') {
            quickcalcPressed = quickcalcPressed.toString().slice(0,-1);
            quickcalcDisplay.html(parseFloat(quickcalcPressed));
        }
    };
    quickcalcBtn.each(function () {
        $(this).click(function () {
            keyVal = $(this).text();
            handleKeyAction($(this).attr('quickcalc-action'));
        });
    });
    $(window).on("keypress keydown", function (event) {
        let keyValTemp = event.key;
        if(event.type === 'keydown' && keyValTemp !== 'Backspace'){ return 0; }
        let operatorsKeyMap = {
            '+':'add',
            '-':'subtract',
            '/':'divide',
            '*':'multiply',
            '.':'decimal',
            'Enter':'calculate',
            'Backspace':'delete',
            'Delete':'clear',
        };
        if (keyValTemp >= 0 && keyValTemp < 10) {
            handleKeyAction(undefined,keyValTemp);
        }
        else if(operatorsKeyMap.hasOwnProperty(keyValTemp)){
            handleKeyAction(operatorsKeyMap[keyValTemp]);
        }
    });

    function calculate(val1, operator, val2) {
        if (operator === 'add') {
            result = parseFloat(val1) + parseFloat(val2);
            return result;
        }
        else if (operator === 'subtract') {
            result = parseFloat(val1) - parseFloat(val2);
            return result;
        }
        else if (operator === 'divide') {
            if (val2 === '0') {
                return 'Cannot divide by 0!';
            }
            result = parseFloat(val1) / parseFloat(val2);
            return result;
        }
        else if (operator === 'multiply') {
            result = parseFloat(val1) * parseFloat(val2);
            return result;
        }
        else {
            return 'Math Error!';
        }
        return "Unkown Error!"
    }
});