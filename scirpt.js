let add = document.getElementById("addbtn");
let notes = document.getElementById("notes");
const counterBtn = document.getElementById("counter");
const clearAllBtn = document.getElementById("clear-all");
let doneCount = 0;

function updateCounter() {
  counterBtn.textContent = "Done: " + doneCount;
}

function createNote(text) {
  const note = document.createElement("div");
  const span_txt = document.createElement("span");
  const div2 = document.createElement("div");
  const del_btn = document.createElement("button");
  const edit_btn = document.createElement("button");
  const edit_icon = document.createElement("img");
  const del_icon = document.createElement("img");

  // classes
  note.classList.add("note");
  div2.classList.add("div2");
  span_txt.classList.add("span");
  edit_btn.classList.add("editButton");
  del_btn.classList.add("delButton");

  // content
  span_txt.contentEditable = false;
  span_txt.textContent = text;

  edit_icon.src = "./icons8-edit-24.png";
  edit_icon.alt = "Edit";
  edit_btn.appendChild(edit_icon);

  del_icon.src = "./icons8-multiply-24.png";
  del_icon.alt = "Delete";
  del_btn.appendChild(del_icon);

  // build
  notes.appendChild(note);
  note.appendChild(span_txt);
  note.appendChild(div2);
  div2.appendChild(edit_btn);
  div2.appendChild(del_btn);

  // note click toggles done (but ignore clicks that originate from buttons or while editing)
  note.addEventListener("click", function (e) {
    if (e.target.closest("button")) return;            // ignore button clicks
    if (span_txt.isContentEditable) return;            // ignore while editing

    if (note.classList.toggle("done")) {
      doneCount++;
    } else {
      doneCount--;
    }
    updateCounter();
  });

  // delete: stop bubbling; only decrement if it *was* done
  del_btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (note.classList.contains("done")) {
      doneCount--;
      updateCounter();
    }
    note.remove();
  });

  // edit: stop bubbling so clicking edit doesn’t toggle done
  edit_btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (span_txt.isContentEditable) {
      const trimmed = span_txt.textContent.trim();
      if (trimmed === "") {
        alert("Cannot save an empty note");
        span_txt.focus();
        return;
      }
      span_txt.contentEditable = false;
      edit_icon.src = "./icons8-edit-24.png";
    } else {
      span_txt.contentEditable = true;
      edit_icon.src = "./icons8-save-24.png";
      span_txt.focus();
    }
  });
}

add.addEventListener("click", function () {
  const inputEl = document.getElementById("input");
  const text = inputEl.value.trim();
  if (text === "") {
    alert("Warning ⚠️ empty Note");
    return;
  }
  createNote(text);
  inputEl.value = "";
  inputEl.focus();
});

document.getElementById("input").addEventListener("keydown", function (event) {
  if (event.key !== "Enter") return;
  event.preventDefault();

  const inputEl = event.target;
  const text = inputEl.value.trim();
  if (text === "") {
    alert("Warning ⚠️ empty Note");
    return;
  }
  createNote(text);
  inputEl.value = "";
  inputEl.focus();
});

clearAllBtn.addEventListener("click", () => {
  if (notes.children.length === 0) {
    alert("Nothing to Delete. Add Some notes");
    return;
  }
  notes.innerHTML = "";
  doneCount = 0;
  updateCounter();
});

updateCounter();
