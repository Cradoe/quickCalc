   $(function(){
      const quickcalcBtn = $('.calc_keys button');
      var quickcalcDisplay = $('.cal_display');
      var quickcalcVal = quickcalcDisplay.text();
      var quickcalcAction;
      var previousValue = '';
      var keyVal;
      var result
      var quickcalcPressed = '';
      var quickCalcOperator = '';
      quickcalcBtn.each(function(){
        $(this).click(function(){
          keyAction = $(this).attr('quickcalc-action');
            keyVal = $(this).text();
            
            if ((keyAction == 'add' || keyAction ==  'subtract' || keyAction == 'divide' || keyAction == 'multiply') ) {

              if (!(quickcalcPressed == '0') ) {
                quickCalcOperator = keyAction;
                previousValue = quickcalcDisplay.text();
                keyVal = '';
                quickcalcPressed = '';
                quickcalcDisplay.text('0');
              }
            } 

            if (((!keyAction) || keyAction == 'decimal') && quickcalcVal == '0' && !(keyAction == 'clear')) {
              if (keyAction == 'decimal') {
                keyVal = '.'
              }
              quickcalcPressed += keyVal;
              quickcalcDisplay.text(quickcalcPressed);
            } 
          
          if (keyAction == 'calculate') {
            quickcalcResult = calculate(previousValue,quickCalcOperator,quickcalcPressed);
            quickcalcDisplay.text(quickcalcResult);
            quickCalcOperator = '';
	        quickcalcPressed = '';
	        previousValue = '';
	        keyVal = '';
	        operator = '';
	        result = '';
          }


      if (keyAction == 'clear') {
        quickcalcPressed = '';
        previousValue = '';
        keyVal = '';
        operator = '';
        result = '';
        quickcalcDisplay.text('0');
      }

        });
      });

      function calculate(val1,operator,val2){

        if (operator == 'add') {
         result = parseFloat(val1) + parseFloat(val2);
           return result;
         }
          else if(operator == 'subtract'){
         result = parseFloat(val1) - parseFloat(val2);
           return result;
         }
          else if(operator == 'divide'){
            if (val2 == '0') {
              return 'Math Error!';
            }
         result = parseFloat(val1) / parseFloat(val2);
           return result;
         }
          else if(operator == 'multiply'){
         result = parseFloat(val1) * parseFloat(val2);
           return result;
         }
         else{
          return 'Math Error!';
         }
         return "Unkown Error!"
      }
    });