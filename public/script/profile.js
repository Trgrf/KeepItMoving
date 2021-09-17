const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#exercise').value.trim();
    const sets = document.querySelector('#sets').value.trim();
    const reps = document.querySelector('#reps').value.trim();

    if (name && date && length) {
        const response = await fetch('/api/exercise', {
            method: 'POST',
            body: JSON.stringify({ name, sets, reps }),
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