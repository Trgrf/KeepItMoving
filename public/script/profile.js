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
          const deleteBtn = document.createElement("button");
          deleteBtn.setAttribute("id", "delete-btn");
          deleteBtn.setAttribute("type", "button");
          deleteBtn.textContent= "x";
          nameEl.appendChild(deleteBtn);
          displayEl.appendChild(nameEl);
          deleteBtn.addEventListener("click", function (event) {
            nameEl.textContext="";
          } )
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
  console.log("hello")
  const name = document.querySelector("#exercise").value.trim();
  const weight = +document.querySelector("#amt-weight").value.trim();
  const sets = +document.querySelector("#sets").value.trim();
  const reps = +document.querySelector("#reps").value.trim();
  const time = +document.querySelector("#minutes").value.trim();
  const distance = +document.querySelector("#distance").value.trim();
  const displayEl = document.getElementById("exercise-display");
  const todayEl = document.querySelector("#today");
  console.log(name, weight, sets, reps, time, distance);
  if ((name && weight && sets && reps) || (name && time && distance)) {
    console.log("POST /api/exercise");
    const response = await fetch("/api/exercise", {
      method: "POST",
      body: JSON.stringify({ name, weight, sets, reps, time, distance }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(name);
      const data = await response.json()
      console.log(data);
      displayEl.textContent = `Name: ${name}, Weight: ${weight}, Sets: ${sets}, Reps: ${reps}, Minutes: ${time}`;
      const deleteBtn = document.createElement("button");
          deleteBtn.setAttribute("id", "delete-btn");
          deleteBtn.setAttribute("type", "button");
          deleteBtn.textContent= "X";
          displayEl.appendChild(deleteBtn)
          deleteBtn.addEventListener("click", async function (event) {
          displayEl.textContent= "";
          const response = await fetch(`/api/exercise/${data.id}`, {
            method: "DELETE",
          });
      
          if (response.ok) {
            document.location.replace("/profile");
          } else {
            alert("Failed to delete exercise");
          }

          } )

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
