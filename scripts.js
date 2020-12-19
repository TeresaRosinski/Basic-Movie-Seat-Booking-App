//querySelector only selects the first one
const container = document.querySelector(".container");
//querySelectorAll puts all elements within a spectific class etc. into a node list. The node list can then be treated as an array
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//the + turns the string into a number
let ticketPrice = +movieSelect.value;
//Update total and count
function updateSelectedCount() {
  //puts all the selected seats into a nodelist called selectedSeats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //use length to get the amount of seats selected in the nodeList.
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount*ticketPrice;
}
//Movie Select Event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  updateSelectedCount();

})

//Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
