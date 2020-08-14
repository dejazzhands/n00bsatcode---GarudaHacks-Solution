// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const clear = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Get item from localstorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data)
{
    LIST = JSON.parse(data);
    id = LIST.length; // Set the id to the last one on the list
    loadlist(LIST); // Load the list to the user's interface
}
else
{
    // If fata is not empty
    LIST = [];
    id = 0;
}

// Load items to the user's interface
function loadList(array)
{
    array.array.forEach(function(item)
    {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// Clear the local storage
clear.addEventListener("click", function()
{
    localStorage.clear();
    location.reload();
});

// Show today's date
const options = {weekday: "long", month: "short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US",options);

// Add toDo function
function addToDo(toDo, id, done, trash)
{
    if(trash)
    {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa ${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
    const postion = "beforeend";

    list.insertAdjacentElement(position, item);
}

// Add an item to the list
document.addEventListener("keyup", function(even)
{
    if(event.keyCode == 13)
    {
        const toDo = input.value;
        //if the input is not empty
        if(toDo)
        {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // Add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value="";
    }
});

// Complete toDo
function completeToDo(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove toDo
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//Target the items created dynamically
list.addEventListener("click", function(event)
{
    const element = event.target; //Return the clicked element inside list
    const elementJob = element.attributes.job.value; //Complete or delete
    if(elementJob == "complete")
    {
        completeToDo(element);
    }
    else if(elementJob == "delete")
    {
        removeToDo(element);
    }

    // Add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});