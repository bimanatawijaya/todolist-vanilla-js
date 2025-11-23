## 📝 Project

This project demonstrates the power of Vanilla JavaScript (ES6+) by creating a functional To-Do List without relying on frameworks like React, Vue, or jQuery.

The application focuses on DOM manipulation and state management. It uses LocalStorage to save the task list array, allowing users to maintain their data across browser sessions.

## ✨ Features
- Pure JavaScript: No external dependencies or build steps required.
- CRUD Operations:

    Create: Add new tasks easily.

    Read: View all tasks in a dynamic list.

    Update: Edit existing tasks or toggle them as "Completed".

    Delete: Remove tasks permanently.

- Data Persistence: Utilizes localStorage to store data as a JSON string, ensuring tasks are not lost on page reload.

## 🛠️ Technologies Used

- HTML5: For the structural markup.
- CSS3: For styling and layout.
- JavaScript (Vanilla): For logic, event handling, and local storage manipulation.

## 🚀 How It Works

- Data Structure: Tasks are stored in an array of objects `(e.g., [{ id: 1, text: "update landing page", completed: false }])`.

- Rendering: A render function loops through the array to generate HTML elements dynamically.

- Storage: Whenever the array changes (add/edit/delete), the data is serialized using `JSON.stringify()` and saved to localStorage. Upon loading, it is retrieved via `JSON.parse()`