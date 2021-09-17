const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#exercise').value.trim();
  const weight = document.querySelector('#amt-weight').value.trim();
  const sets = document.querySelector('#sets').value.trim();
  const reps = document.querySelector('#reps').value.trim();
  const minutes = document.querySelector('#minutes').value.trim();
  const distance = document.querySelector('#distance').value.trim();

  if (name) {
    const response = await fetch('/api/exercise', {
      method: 'GET',
      headers: {
        'Content-Type': 'applicaion/json',
      },
    });
    const json = await result.json();
    
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to find exercise');
    }
    return json;
}


if (name && weight && sets && reps && minutes) {
  const response = await fetch('/api/exercise', {
    method: 'POST',
    body: JSON.stringify({ name, weight, sets, reps, minutes, distance }),
    headers: {
      'Content-Type': 'applicaion/json',
    },
  });

  if (response.ok) {
    document.location.replace('/profile');
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
  .querySelector('.new-exercise-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.exercise-list')
  .addEventListener('click', delBtnHandler);