import React, { useState } from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>Spontaneously</h1>
      <EventForm />
    </div>
  );
}

function EventForm() {
  
  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
    numberOfDates: "",
    dateGap: "",
    randomDates: ""
  });

  function getDatesBetweenDates(startDate, endDate) {
    let dates = [];
    const theDate = new Date(startDate);
    while (theDate <= endDate) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    return dates;
  }

  function getRandomDates(dateList) {
    let dates = []
    for (let i = 0; i < values.numberOfDates; i++) {
      if (dateList.length > 0) {
        const random = Math.floor(Math.random() * (dateList.length - 0 + 1) + 0);
        const randomDate = dateList[random];
        const lowerDate = randomDate.addDays(-values.dateGap);
        const upperDate = randomDate.addDays(parseInt(values.dateGap));
        dates = [...dates, randomDate];
        dateList = dateList.filter(date => {        
          return !(date > lowerDate && date < upperDate);
        })
      }
    }
    return dates;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const randomDates = getRandomDates(getDatesBetweenDates(new Date(values.startDate), new Date(values.endDate)))
    setValues({
      ...values,
      randomDates: randomDates
    })
  }

  function handleInputChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }
  
  return (
    <form>
      <label>
        Start Date:
        <input 
          onChange={handleInputChange}
          value={values.startDate}
          name="startDate"
          type="date" />
      </label>

      <label>
        End Date:
        <input
          onChange={handleInputChange}
          value={values.endDate}
          name="endDate"
          type="date" />
      </label>

      <label>
        Number of Dates:
        <input
          onChange={handleInputChange}
          value={values.numberOfDates}
          name="numberOfDates" />
      </label>

      <label>
        Date Gap:
        <input
          onChange={handleInputChange}
          value={values.dateGap}
          name="dateGap" />
      </label>

      <input onClick={handleSubmit} type="submit" value="Submit" />
    </form>
  )
}

export default App;
