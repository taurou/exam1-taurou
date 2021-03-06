import { useState, useEffect } from 'react';
import API from './API.js';
import SurveyCards from './SurveyCardsComponent.js';

function UserView() {

  const [surveysArray, setSurveysArray] = useState([]);



  useEffect(() => {
    const getAllSurveys = async () => {
      const surveys = await API.getAllSurveys();
      setSurveysArray(surveys)
    };

    getAllSurveys().catch(err => {
      alert('error while getting all surveys!')
    });

  }, []);



  return (

    <SurveyCards isAdmin={false} surveysArray={surveysArray} setSurveysArray={setSurveysArray} />

  );
}



export default UserView;


