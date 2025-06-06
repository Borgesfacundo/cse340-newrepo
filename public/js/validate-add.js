const addClassification = document.getElementById("addClassificationForm");
const addInventory = document.getElementById("addInventoryForm");

if (addClassification) {
  addClassification.addEventListener("submit", function (event) {
    if (!this.checkValidity()) {
      event.preventDefault();
      alert(
        "Classification name must be alphanumeric with no spaces or special characters."
      );
    }
  });
}

if (addInventory) {
  addInventory.addEventListener("submit", function (event) {
    if (!this.checkValidity()) {
      event.preventDefault();
      alert("Please fill out all fields correctly before submitting.");
    }
  });
}
