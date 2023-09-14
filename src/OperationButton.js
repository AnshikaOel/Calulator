import { ACTIONS } from "./App";
import './style.css';

export default function OperationButton({dispatch,Operation})
{
    return(
        <button className="Bradius" onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{Operation}})}>
        {Operation}
        </button>
    )
}