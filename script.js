const d = document.getElementById("res");
let num1 = "";
let num2 = "";
let op = null;
function append(val) {
    if (val == "+" || val == "-" || val == "*" || val == "/" || val == "%") {
        if (num1 == "" && num2 == "") {
            if (val == "-") {
                num2 = "-";
                d.value = num2;
            }
            return;
        }
        if (num2 == "")
        return;        
        if (num1 != "" && op != null) {
            let exp = num1 + op + num2;
            num1 = eval(exp).toString();
            d.value = num1;
        } else {
            num1 = num2;
        }
        num2 = "";
        op = val;
    }
    else {
        if (val == "." && num2.includes("."))
            return;
        num2 += val;
        d.value = num2;
    }
}
function clearDisplay() {
    num1 = "";
    num2 = "";
    op = null;
    d.value = "";
}
function deleteLast() {
    num2 = num2.substring(0, num2.length - 1);
    d.value = num2;
}
function calculate() {
    if (op == null || num2 == ""){
        d.value = "Invalid Expression";
        return;
    }
    let exp = num1 + op + num2;
    try{    
        let ans = eval(exp);
        if (!isFinite(ans)) {
            d.value = "Cannot divide by zero";
            num1 = "";
            num2 = "";
            op = null;
            return;
        }
        d.value = ans;
        num2 = ans.toString();
        num1 = "";
        op = null;
    }
    catch (error) {
        d.value = "Error";
        num1 = "";
        num2 = "";
        op = null;
    }
}
document.addEventListener("keydown", function (e) {
    let key = e.key;
    if ((key >= "0" && key <= "9") || key == ".") {
        append(key);
    }
    else if (key == "+" || key == "-" || key == "*" || key == "/" || key == "%") {
        append(key);
    }
    else if (key == "Enter") {
        calculate();
    }
    else if (key == "Backspace") {
        deleteLast();
    }
    else if (key == "Escape") {
        clearDisplay();
    }
});