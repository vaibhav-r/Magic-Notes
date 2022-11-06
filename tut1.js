showNodes();
let btn = document.getElementById('addnote');
btn.addEventListener('click', function (e) {
    let txt = document.getElementById('text');
    let txt2 = document.getElementById('title_text');
    if (txt2.value == "" && txt.value == "") {
        alert("Both Title and node are empty,Enter Something to Save");
        txt.value = "";
        txt2.value = "";
        return;
    }
    if (txt2.value == "") {
        alert(" Title is empty,Enter Valid Title");
        txt.value = "";
        txt2.value = "";
        return;
    }
    if (txt.value == "") {
        alert(" Note is empty,Enter Valid Note");
        txt.value = "";
        txt2.value = "";
        return;
    }
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if (notes == null) {
        notesobj = [];
        titleobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }
    notesobj.push(txt.value);
    titleobj.push(txt2.value);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    localStorage.setItem('titles', JSON.stringify(titleobj));
    txt.value = "";
    txt2.value = "";
    showNodes();
});
function showNodes() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if (notes == null) {
        notesobj = [];
        titleobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }
    let html = "";
    let a= notesobj.length;
    for(let i =0 ;i<a;i++)
    {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem ; margin-top: 20px;">
                 <div class="card-body">
                    <h2 class="card-title">Note ${i+1}: ${titleobj[i]}</h2>
                    <p class="card-text">${notesobj[i]}</p> 
                    <button id="${i}" onclick ="delete_node(${i})" class="btn btn-primary">Delete Node</buttton>
                 </div>
            </div>
         `
    };
    let noteselem = document.getElementById('notes');
    {
        if (html.length != 0)
            noteselem.innerHTML = html;
        else {
            noteselem.innerHTML = "<br><br> Ahh snap....You have No Notes to show"
        }
    }
}

function delete_node(index) {
    console.log("deleting ", index);
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if (notes == null) {
        notesobj = [];
        titleobj =[];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }
    notesobj.splice(index, 1);
    titleobj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    localStorage.setItem('titles', JSON.stringify(titleobj));
    showNodes();
}
let search = document.getElementById('searchtxt');
search.addEventListener('input', function (e) {
    let inputvalue = search.value;
    let titlecard = document.getElementsByClassName('noteCard');
    Array.from(titlecard).forEach(function (element) {
        let titletext = element.getElementsByTagName("h2")[0].innerText;
        if (titletext.toLowerCase().includes(inputvalue.toLowerCase())) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
})
