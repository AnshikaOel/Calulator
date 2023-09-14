// import logo from './logo.svg';
//  import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationtButton from './OperationButton';
import './style.css';

export  const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION :'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}

function reducer(state,{type,payload}){
   switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state ,
          currentOperand:payload.digit
          ,overwrite:false
        }
      }
      if(payload.digit==='0' && state.currentOperand==='0'){
        return state
      }
      if(payload.digit==='.' && state.currentOperand.includes(".")){
        return state
      }
      return{
        ...state,
        currentOperand:`${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand==null && state.previousOperand==null){
        return state
      }
      if(state.currentOperand==null)
      {
        return{
          ...state ,
          Operation:payload.Operation
        }
      }
      if(state.previousOperand==null){
      return {
          ...state,
          Operation:payload.Operation,
          previousOperand:state.currentOperand,
          currentOperand:null
        }
      }
      return{
        ...state ,
        previousOperand:evaluate(state),
        Operation:payload.Operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.EVALUATE:
      if(state.previousOperand==null || state.currentOperand==null || state.Operation==null)
      {
        return state
      }
      return{
        ...state,
        overwrite:true,
        previousOperand:null,
        Operation:null,
        currentOperand:evaluate(state)
      }
      
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite)
      {
        return {
          ...state,
          overwrite:false,
          currentOperand:null
        }
      }
      if(state.currentOperand==null) return state
      if(state.currentOperand.length==1)
      {
        return { ...state,currentOperand:null}
      }

      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
   }
}

function evaluate({currentOperand,previousOperand,Operation}){
  const prev=parseFloat(previousOperand)
  const curr=parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(curr)) return ""

  let computation =""

  switch(Operation){
    case "+":
      computation=prev+curr;
      break;
    case "-":
      computation=prev-curr;
      break;
    case "*":
      computation=prev*curr;
      break;
    case "÷":
      computation=prev/curr;
      break;
  }
  return computation.toString()
}

const INTEGER_FORMATTER=new Intl.NumberFormat("en-IN",{
  maximumFractionDigits:0
})
function formatOperand(operand){
  if(operand==null)return
  const [integer,decimal]=operand.split(".")
  if(decimal==null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


function App() {
  const [{currentOperand, previousOperand,Operation},dispatch]=useReducer(reducer,{})
  return (
    <div className="calulator-grid">
      <div className="output">
        <div className="prev-operand">{formatOperand(previousOperand)}{Operation}</div>
        <div className="curr-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={()=> dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationtButton Operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationtButton Operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationtButton Operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationtButton Operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;