import { evaluate, round } from "mathjs";
import React from "react";
import { ThemeProvider } from "styled-components";
import Button from "./components/Button";
import { GlobalStyles, darkTheme, LightTheme } from "./components/Themes";
import Toggle from "./components/Toggle";
import "./index.css";

const endsWithOperator = /[x+/]$/;
const endsWithNegative = /[-]$/;

function App() {
  return (
    <div>
      <Calculator />
    </div>
  );
}
function Calculator(props) {
  const [display, setDisplay] = React.useState("0");
  const [input, setInput] = React.useState("0");
  const [operatorPressed, setOperatorPressed] = React.useState(false);
  const [decimalPressed, setDecimalPressed] = React.useState(false);
  const [isReseted, setIsReseted] = React.useState(true);
  const [theme, setTheme] = React.useState("light");

  //clearing display
  const handleClear = () => {
    console.log("clear");
    setInput("0");
    setDisplay("0");
    setIsReseted(true);
    setDecimalPressed(false);
  };

  //operations
  const handleOperation = (e) => {
    setDecimalPressed(false);
    let currentOperator = e.currentTarget.value;
    let currentExpression = display + " " + currentOperator;
    if (operatorPressed === false) {
      setDisplay(currentExpression);
      setInput(currentOperator);
      setOperatorPressed(true);
    } else if (endsWithNegative.test(display)) {
      let dW = display.substring(0, display.length - 3);
      setDisplay(dW + " " + e.currentTarget.value);
      setInput(e.currentTarget.value);
    } else if (endsWithOperator.test(display)) {
      if (currentOperator === "-") {
        setDisplay(display + " " + currentOperator);
      } else {
        let dWL = display.substring(0, display.length - 1);
        setDisplay(dWL + " " + e.currentTarget.value);
        setInput(e.currentTarget.value);
      }
    }
  };
  //number handler
  const handleNumber = (e) => {
    setOperatorPressed(false);
    if (isReseted === false) {
      let lastChar = display.charAt(display.length - 1);
      if (
        lastChar === "x" ||
        lastChar === "/" ||
        lastChar === "+" ||
        lastChar === "-"
      ) {
        setInput(e.currentTarget.value);
        setDisplay(display + " " + e.currentTarget.value);
      } else {
        setInput(input + e.currentTarget.value);
        setDisplay(display + e.currentTarget.value);
      }
    } else if (isReseted && e.currentTarget.value !== "0") {
      setInput(e.currentTarget.value);
      setDisplay(e.currentTarget.value);
      setIsReseted(false);
    }
  };

  //equals handler
  const handleEquals = () => {
    let expression = display.replace("x", "*");
    let totalResult = round(evaluate(expression), 4);
    //console.log("sonuc: " + totalResult.toString());
    setInput(totalResult);
    setDisplay(totalResult);
    setDecimalPressed(false);
  };

  //decimal handler
  const handleDecimal = () => {
    if (decimalPressed === false) {
      setDisplay(display.concat("."));
      setInput(display.concat("."));
      setDecimalPressed(true);
    }
  };
  //dark-mode toggle function
  const toggleFunction = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : darkTheme}>
      <div className="container">
        <GlobalStyles />
        <h1>Javaskript Hesap Makinesi</h1>
        <div className="dark-mode">
          <p>Karanlık Mod</p>
          <div onClick={() => toggleFunction()}>
            <Toggle />
          </div>
        </div>
        <div id="calc-box">
          <div className="screen">
            <div id="display" className="display-screen">
              {display}
            </div>
            <div className="result">{input}</div>
          </div>
          <div className="btn-grid">
            <Button name="clear" simbol="AC" onClick={handleClear}></Button>
            <Button name="divide" simbol="/" onClick={handleOperation}></Button>
            <Button
              name="multiply"
              simbol="x"
              onClick={handleOperation}
            ></Button>
            <Button name="seven" simbol="7" onClick={handleNumber}></Button>
            <Button name="eight" simbol="8" onClick={handleNumber}></Button>
            <Button name="nine" simbol="9" onClick={handleNumber}></Button>
            <Button
              name="subtract"
              simbol="-"
              onClick={handleOperation}
            ></Button>
            <Button name="four" simbol="4" onClick={handleNumber}></Button>
            <Button name="five" simbol="5" onClick={handleNumber}></Button>
            <Button name="six" simbol="6" onClick={handleNumber}></Button>
            <Button name="add" simbol="+" onClick={handleOperation}></Button>
            <Button name="one" simbol="1" onClick={handleNumber}></Button>
            <Button name="two" simbol="2" onClick={handleNumber}></Button>
            <Button name="three" simbol="3" onClick={handleNumber}></Button>
            <Button name="equals" simbol="=" onClick={handleEquals}></Button>
            <Button name="zero" simbol="0" onClick={handleNumber}></Button>
            <Button name="decimal" simbol="." onClick={handleDecimal}></Button>
          </div>
        </div>
        <p>Coded with love by Selehadin A.</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
