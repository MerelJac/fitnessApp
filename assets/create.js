const modalBtn = document.querySelector(".modalBtn");
const modalSection = document.querySelector(".modalContent");
const searchQuery = document.querySelector("input[type='text']");
const searchSubmitBtn = document.querySelector("#searchSubmit");
const printSection = document.querySelector("#printSection");
const exerciseContainer = document.querySelector(".exerciseContainer");


modalBtn.addEventListener("click", () => {
    modalSection.style.display = "block";
  });

  // Close modal button
  const closeModalBtn = document.querySelector("#closeModal");
  closeModalBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalSection.style.display = "none";
  });
  
  // Apply button
  const applyBtn = document.querySelector("#addAttributes");
  applyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("apply clicked");
  });


searchSubmitBtn.addEventListener("click", () => {
    console.log(searchQuery.value);

    var clonedContainer = exerciseContainer.cloneNode(true);
    var clonedTitle = clonedContainer.querySelector("h2");
    clonedTitle.textContent = searchQuery.value;
    var clonedAttributes = clonedContainer.querySelector('p');
    clonedAttributes.textContent = "";
    printSection.prepend(clonedContainer);
})

