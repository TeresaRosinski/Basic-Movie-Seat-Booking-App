//querySelector only selects the first one
const container = document.querySelector(".container");
//querySelectorAll puts all elements within a spectific class etc. into a node list. The node list can then be treated as an array
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI()


//the + turns the string into a number
let ticketPrice = +movieSelect.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex, movieIndex');
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount() {
  //puts all the selected seats into a nodelist called selectedSeats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //copy selected seats into arr
  //Map through arr
  //return a new array of indexes

  //use the spread operator to add all selected seats to the seatsIndex - spread operators copy elements of arrays - passes in the values from the original array
  //we use map because it will return an array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //use length to get the amount of seats selected in the nodeList.
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount*ticketPrice;
}

//Get data from localsstorage and populateUI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null ){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}


//Movie Select Event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData()
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

//Initial count and total set 
updateSelectedCount();