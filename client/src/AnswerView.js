import { useState, useEffect } from 'react';
import { Button, Form,FormGroup, Modal, Card, ListGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ShowQuestions from './QuestionDisplayComponent.js';
import API from './API.js';
import { useHistory , useParams, useLocation} from "react-router-dom";

function ViewAnswers(props){
    let { id } = useParams();
    let { ansid } = useParams();
    const [username, setUsername] = useState('');
    const [answer, setAnswer] = useState(null);
    const [answerIdArray,setAnswerIdArray] = useState([]);

    let history = useHistory();

    useEffect(() => {
        const getAnswerIdArray = async () => {
            const answersId = await API.getAnswerIDs(id);
            let array = [] ;
            answersId.map((a)=> array.push(a.AnswerId));
            setAnswerIdArray(array);

        };

        getAnswerIdArray().catch(err => {
            alert('no answers stored!')
        });
        
    }, []);

    useEffect(() => {
        const getAnswer = async () => {
        
            const answer = await API.getAnswerById(answerIdArray[parseInt(ansid)]);
            setUsername(answer.Username);
            setAnswer(JSON.parse(answer.Questions));
        };

        if(answerIdArray.length!==0){
        getAnswer().catch(err => {
            alert('error while getting answer IDs!')
        });
    }

    
    }, [answerIdArray, ansid]);

    
    function handle(direction){
        if(direction==="right")
            if(parseInt(ansid) < answerIdArray.length -1 ){
                let next = parseInt(ansid) + 1;
            history.push(`/viewanswers/${id}/${next}` );
            }
            if(direction==="left")
            if(parseInt(ansid) !== 0  ){
                let prev = parseInt(ansid) - 1;
                history.push(`/viewanswers/${id}/${prev}` );

            }


    }
if(answer)
    return <>
    <Button variant="transparent" className="fixed-left-middle shadow-none" onClick={() => handle("left")} ><svg   xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg>
</Button>
<Button variant="transparent" className=" fixed-right-middle shadow-none" onClick={() => handle("right")} >
<svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
</Button>

    <ShowQuestions username={username} isAnswering={false} questions={answer}  /> 
    </>
    ;
    else return "" ;

}

export default ViewAnswers