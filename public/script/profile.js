const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#exercise').value.trim();
  const weight = document.querySelector('#amt-weight').value.trim();
  const sets = document.querySelector('#sets').value.trim();
  const reps = document.querySelector('#reps').value.trim();
  const minutes = document.querySelector('#minutes').value.trim();
  const distance = document.querySelector('#distance').value.trim();
  const displayEl = document.getElementById('project-display');
  const todayEl = document.querySelector("#today");



   // set date and time in header
  //  function displayDayTime() {
  //    const dayAndTimeEL = moment().format("MMM DD, YYYY [at] hh:mm:ss a ");
  //    todayEl.innerText(dayAndTimeEL);
  //  }
  //  setInterval(displayDayTime, 1000);

  if (name) {
    const response = await fetch('/api/exercise', {
      method: 'GET',
      headers: {
        'Content-Type': 'applicaion/json',
      },
    });
    const json = await response.json();
    
    if (response.ok) {
      console.log(json);
      // displayEl.textContent = json;
    
      for (let i = 0; i < json.length; i++) {
        const nameEl = document.createElement("li");
        nameEl.textContent = json[i].name
        displayEl.appendChild(nameEl);
      }
    } else {
      alert('Failed to find exercise');
    }
    return json;
}


if (name && weight && sets && reps && minutes) {
  console.log('POST /api/exercise');
  const response = await fetch('/api/exercise', {
    method: 'POST',
    body: JSON.stringify({ name, weight, sets, reps, minutes, distance }),
    headers: {
      'Content-Type': 'applicaion/json',
    },
  });

  if (response.ok) {
    console.log(name);
    displayEl.textContent = `Name: ${name}, Weight: ${weight}, Sets: ${sets}, Reps: ${reps}, Minutes: ${minutes}`;
  } else {
    alert('Failed to create exercise');
  }
}
};

const delBtnHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/exercise/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete exercise');
    }
  }
};

document
  .querySelector('.exercise-btn')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.workout-btn')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.exercise-box')
  .addEventListener('click', delBtnHandler);