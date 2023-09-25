function addNote() {
            const color = document.getElementById("colorPicker").value;
            const title = document.getElementById("noteTitle").value;
            const content = document.getElementById("noteContent").value;

            if (!title || !content) {
                alert("Bitte Titel und Notiz eingeben.");
                return;
            }

            const note = document.createElement("div");
            note.classList.add("note");
            note.style.backgroundColor = color;
            note.style.color = isDarkColor(color) ? "white" : "black";
            note.innerHTML = `
                <span class="delete" onclick="deleteNote(this)">X</span>
                <h2>${title}</h2>
                <p>${content}</p>
            `;

            document.getElementById("container").appendChild(note);
            saveNotes();
            clearInputFields();
        }

        function deleteNote(element) {
            const note = element.parentElement;
            note.remove();
            saveNotes();
        }

        function isDarkColor(hexColor) {
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);

            // Helligkeitsberechnung (Luma)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            return brightness < 128; // Arbiträrer Schwellenwert für Dunkelheit
        }

        function saveNotes() {
            const notes = [];
            const noteElements = document.querySelectorAll(".note");
            noteElements.forEach(noteElement => {
                const color = noteElement.style.backgroundColor;
                const title = noteElement.querySelector("h2").textContent;
                const content = noteElement.querySelector("p").textContent;
                notes.push({ color, title, content });
            });

            localStorage.setItem("notes", JSON.stringify(notes));
        }

        function loadNotes() {
            const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

            savedNotes.forEach(savedNote => {
                const note = document.createElement("div");
                note.classList.add("note");
                note.style.backgroundColor = savedNote.color;
                note.style.color = isDarkColor(savedNote.color) ? "white" : "black";
                note.innerHTML = `
                    <span class="delete" onclick="deleteNote(this)">X</span>
                    <h2>${savedNote.title}</h2>
                    <p>${savedNote.content}</p>
                `;

                document.getElementById("container").appendChild(note);
            });
        }

        function clearInputFields() {
            document.getElementById("colorPicker").value = "#ffffff";
            document.getElementById("noteTitle").value = "";
            document.getElementById("noteContent").value = "";
        }

        loadNotes();

        // Aktualisiert die Uhrzeit und das Datum alle 1000ms (1 Sekunde)
        function updateDateTime() {
            const now = new Date();
            const datetimeElement = document.getElementById("datetime");
            datetimeElement.textContent = now.toLocaleString();
        }

        // Initialer Aufruf und fortlaufende Aktualisierung der Uhrzeit/Datum
        updateDateTime();
        setInterval(updateDateTime, 1000);
