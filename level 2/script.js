//setup and initialization
document.addEventListener("DOMContentLoaded", function(){
    const inputScreen = document.getElementById("input-screen");
    const displayField = document.getElementById("display");
    const buttons = document.querySelectorAll("button");
    let expression = "";
    let shouldClearInput = false;

    //clear input screen
    function clearInputScreen(){
        expression = "";
        inputScreen.value = "";
        displayField.value = "";
        shouldClearInput = false;
    }
    //detele the last character or backspace
    function deleteLastCharacter(){
        expression = expression.slice(0,-1);
        inputScreen.value = expression;
    }
    //to evaluate expression, to give result
    function evaluateExpression(){
        try{
            const result = eval(expression).toString();//eval(2+2).toString
            displayField.value = expression;//2+2
            inputScreen.value = result;//4
            shouldClearInput = true;
            expression = "";
        }
        catch(error){
            inputScreen.value = "Error";
        }
    }
    //for operation 
    function addOperator(operator){
        if(shouldClearInput){
            clearInputScreen();
        }
        expression = expression + operator;
        inputScreen.value = expression;
    }
    //fn to append a number or dot to the expression
    function appendToExpression(text){
        if(shouldClearInput){
            clearInputScreen();
        }
        expression = expression + text;
        inputScreen.value = expression;
    }
    //fn for handling sqrt, +/-, 1/x
    function handleOperation(operation){
        //step 1:check expression is empty or not
        if(expression ==="")return;
        let result;
        //step 2:convert expression to number
        const currentValue = parseFloat(expression);
        //step 3:perform the operations
        switch(operation){
            case "toggleSign":
                result = currentValue * -1;
                console.log(result);
                break;
            case "sqrt":
                result = Math.sqrt(currentValue);
                expression = `\u221A(${currentValue})`;
                break;
            case "reciprocal":
                result = 1/currentValue;
                expression =`1/${currentValue}`;
                break;
            case "percentage":
                result = currentValue/100;
                expression = `${currentValue}%`
                break;    
        }
        displayField.value = expression;
        expression = result.toString();
        inputScreen.value = expression;
        shouldClearInput = "true";
    }

    //add the event listener to each button
    buttons.forEach(function(button){
        button.addEventListener("click",function(){
            if(button.classList.contains("clear-icon")){
                clearInputScreen();
                console.log("clicked");
            }
            else if(button.classList.contains("delete-icon")){
                deleteLastCharacter();
                console.log("clicked");
            }
            else if(button.classList.contains("equal-icon")){
                evaluateExpression();
                console.log("clicked");
            }
            else if(button.classList.contains("divide-icon")){
                addOperator("/");
                console.log("clicked");
            }
            else if(button.classList.contains("multiply-icon")){
                addOperator("*");
                console.log("clicked");
            }
            else if(button.classList.contains("add-icon")){
                addOperator("+");
                console.log("clicked");
            }
            else if(button.classList.contains("minus-icon")){
                addOperator("-");
                console.log("clicked");
            }
            else if(button.classList.contains("mod-icon")){
                addOperator("%");
                console.log("clicked");
            }
            else if(button.classList.contains("power-icon")){
                addOperator("**");
                console.log("clicked");
            }
            else if(button.classList.contains("toggle-sign-icon")){
                handleOperation("toggleSign");
                console.log("clicked");
            }
            else if(button.classList.contains("squareroot-icon")){
                handleOperation("sqrt");
                console.log("clicked");
            }
            else if(button.classList.contains("reciprocal-icon")){
                handleOperation("reciprocal");
                console.log("clicked");
            }
            else if(button.classList.contains("precentage-icon")){
                handleOperation("percentage");
                console.log("clicked");
            }
            else{
                appendToExpression(button.innerText);//concantenate or append :234
                console.log("clicked");
            }
        });
    });
});