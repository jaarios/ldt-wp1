// I define all the element Ids.
let elementIds = ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenum", "Technetium", "Ruthenium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", "Caesium", "Barium", "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium", "Copernicium", "Nihonium", "Flerovium", "Moscovium", "Livermorium", "Tennessine", "Oganesson", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", "Actinium", "Thorium", "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinum", "Fermium", "Mendelevium", "Nobelum"]

// Funtcion to randomize the list of elements above into a new list.
let shuffleTiles = function(list) {
  let newTileOrder;
  let temp;
  for (let i = list.length -1; i > 0; i--) {
    newTileOrder = Math.floor(Math.random() * (i + 1));
    temp = list[i];
    list[i] = list[newTileOrder];
    list[newTileOrder] = temp;
  }
  return list;
}

// Shuffle the tiles saving them in a new list
let elementIdsShuffled = shuffleTiles(elementIds);

  // Feed the shuffled tiles to the game
  // This for loop takes the new suffled list of elements to generates the html and instert it into the tile dispenser
  for (var i=0; i<elementIdsShuffled.length; i++) {
    tile = elementIdsShuffled[i];
    var htmlString = `<span>${tile}</span>`
    var htmlObject = document.createElement('div');
    htmlObject.setAttribute('id', `${tile}`)
    htmlObject.setAttribute('draggable', 'true')
    htmlObject.classList.add('tile', 'draggable')
    htmlObject.innerHTML=htmlString;
    // insterting the tiles 
    document.getElementById('tile-dispenser').insertAdjacentElement('beforeend', htmlObject);
  }

// Function to start the game. This is called from the popup
// Next I want to start a timer in this function.
function startGame() {
  document.getElementById('startgame').classList.add("hide");
}


// Gather all the element tiles to be dragged.
const draggableElements = document.querySelectorAll(".draggable");
// Gather all the element cells on the table where the tiles will be dropped.
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
  // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
  // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
  elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
  elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
  elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}

//Events fired on the drop target

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

// Variable to count failed attempts
var mistakes = 0;

function drop(event) {
  event.preventDefault(); // This is in order to prevent the browser default handling of the data
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped", droppableElementData);
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("beforeend", `<spam class="merged">${draggableElementData}</spam>`);
  } else {
    // add the failed attempts to the count and print themin the screen
    mistakes += 1;
    document.getElementById("mistakes").innerHTML = mistakes;
  }
}