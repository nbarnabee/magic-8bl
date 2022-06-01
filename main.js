const answer = document.querySelector(".answer");

document.querySelector(".ball").addEventListener("click", getResponse);

async function getResponse() {
  answer.textContent = "";
  answer.classList.remove("appear-mysteriously");
  document.querySelector(".ball").classList.add("shake");
  const res = await fetch(`/askTheBall`);
  const data = await res.json();

  console.log(data);
  setTimeout(() => { 
    document.querySelector(".ball").classList.remove("shake");
    answer.textContent = data.answer;
    answer.classList.add("appear-mysteriously");
  }, 1000);
}