console.log("welcome to notes aap");
showNotes();
// if user add a note add it to the local storage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let myObj={
        title:addtitle.value,
        text: addTxt.value
    }
    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value = "";
    addtitle.value = "";
    console.log(notesobj);
    showNotes();
});

//function that read notes from local storage and show them 
function showNotes() 
{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html +=
            ` <div class="noteCard my-2 mx-2 card"       style="width: 18rem;">
       <div class="card-body">
         <h5 class="card-title"> ${element.title}<hr></h5>
         <p class="card-text">${element.text}</p>
         <button id="${index}" class="btn btn-danger" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
       </div>
     </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show ! <br> Use "Add a Note" section above to create your note.`
    }

}

// function to delete a note
function deletenote(index) {
    // console.log("i m deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}


//to search the note that include your your search text
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log('input event fired',inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});