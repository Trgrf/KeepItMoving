const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#exercise").value.trim();
  const weight = document.querySelector("#amt-weight").value.trim();
  const sets = document.querySelector("#sets").value.trim();
  const reps = document.querySelector("#reps").value.trim();
  const minutes = document.querySelector("#minutes").value.trim();
  const distance = document.querySelector("#distance").value.trim();
  const displayEl = document.getElementById("exercise-display");
  const todayEl = document.querySelector("#today");

  // set date and time in header
  //  function displayDayTime() {
  //    const dayAndTimeEL = moment().format("MMM DD, YYYY [at] hh:mm:ss a ");
  //    todayEl.innerText(dayAndTimeEL);
  //  }
  //  setInterval(displayDayTime, 1000);
  console.log(name);

  if (name) {
    const response = await fetch("/api/exercise", {
      method: "GET",
      headers: {
        "Content-Type": "applicaion/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      // displayEl.textContent = json;

      for (let i = 0; i < json.length; i++) {
        if (name.toLowerCase().trim() === json[i].name.toLowerCase().trim()) {
          const nameEl = document.createElement("div");
          nameEl.textContent = json[i].name;
          // const deleteBtn = document.createElement("button");
          // deleteBtn.setAttribute("id", "delete-btn");
          // deleteBtn.setAttribute("type", "button");
          // nameEl.appendChild(deleteBtn);
          displayEl.appendChild(nameEl);
          return;
        }
      }
    } else {
      alert("Failed to find exercise");
    }
    return json;
  }
}
async function addExercise() {
  const name = document.querySelector("#exercise").value.trim();
  const weight = document.querySelector("#amt-weight").value.trim();
  const sets = document.querySelector("#sets").value.trim();
  const reps = document.querySelector("#reps").value.trim();
  const time = document.querySelector("#minutes").value.trim();
  const distance = document.querySelector("#distance").value.trim();
  const displayEl = document.getElementById("project-display");
  const todayEl = document.querySelector("#today");
  if (name && weight && sets && reps && time) {
    console.log("POST /api/exercise");
    const response = await fetch("/api/exercise", {
      method: "POST",
      body: JSON.stringify({ body: name, weight, sets, reps, time, distance }),
      headers: {
        "Content-Type": "applicaion/json",
      },
    });

    if (response.ok) {
      console.log(name);
      displayEl.textContent = `Name: ${name}, Weight: ${weight}, Sets: ${sets}, Reps: ${reps}, Minutes: ${time}`;
    } else {
      alert("Failed to create exercise");
    }
  }
};

const delBtnHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/exercise/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete exercise");
    }
  }
};

document
  .querySelector(".exercise-btn")
  .addEventListener("click", newFormHandler);

document
  .querySelector(".add-exercise-btn")
  .addEventListener("click", addExercise);

document
  .querySelector(".delete-btn")
  .addEventListener("click", delBtnHandler);
