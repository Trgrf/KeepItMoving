const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#workout-name').value.trim();
    const date = document.querySelector('#date').value.trim();
    const length = document.querySelector('#session-length').value.trim();

    if (name && date && length) {
        const response = await fetch('/api/workout', {
            method: 'POST',
            body: JSON.stringify({ name, date, length }),
            headers: {
                'Content-Type': 'applicaion/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create Workout');
        }
    }
};

const delBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/workout/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            document.location.replace('/profile');
          } else {
            alert('Failed to delete workout');
          }
    }
};

document
  .querySelector('.new-workout-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.workout-list')
  .addEventListener('click', delButtonHandler);