# Alex Morgan — Personal Portfolio

A responsive personal portfolio website for **Alex Morgan**, a Frontend Developer.

The website is designed to showcase Alex's skills, experience, projects, and contact information in a simple and modern way. It was built using HTML, CSS, and JavaScript, with a focus on responsive design and interactive features.

## 🌐 Live Demo

[View Live Portfolio](#)

---

## 📌 About the Project

This project is a frontend portfolio website created for Alex Morgan.

It includes:

- A hero section with a short introduction
- An About section with Alex's background and education
- A Skills section
- A Projects section
- A Contact section
- A responsive navigation menu
- A footer with social links

The projects are loaded dynamically using an API, and JavaScript is used to handle the interactive parts of the website.

---

## ✨ Features

### 🏠 Hero Section

The homepage introduces Alex as a Frontend Developer and includes buttons to view projects and get in touch.

It also includes a responsive navigation bar and a simple entrance animation.

### 👤 About Section

This section gives visitors a quick overview of Alex's:

- Experience
- Education
- Specialization
- Location

There is also a button to download Alex's CV.

### 🛠️ Skills

The Skills section shows the main technologies Alex works with:

- HTML
- CSS
- JavaScript
- React
- Git
- Responsive Design

Each skill has a visual progress indicator.

### 📂 Projects

Projects are loaded from an API instead of being hard-coded into the page.

Visitors can:

- Filter projects by category
- View project cards
- See the technologies used
- Load more projects
- Open a project to see more details

### 📋 Project Details

Clicking **View Details** opens a modal with more information about the selected project, including its image, description, technologies, and a link to view the project.

### 📩 Contact

The Contact section includes a simple form where visitors can enter their:

- Name
- Email
- Message

It also displays Alex's contact information and social media links.

### 📱 Responsive Design

The website works across different screen sizes, including:

- Desktop
- Tablet
- Mobile

On mobile devices, the navigation changes to a menu that can be opened and closed.

### 🎨 Animations

Some small animations and transitions are included to make the website feel more interactive.

These include:

- Button hover effects
- Project card hover effects
- Hero animation
- Loading spinner
- Mobile menu animation

### ⚠️ Loading & Error Handling

While projects are being loaded, a loading spinner is displayed.

If the API request fails, an error message is shown along with a **Retry** button.

---

## 🧰 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API

### JavaScript Concepts Used

- DOM manipulation
- Event listeners
- Functions
- Arrays and objects
- Array methods
- `fetch()`
- `async/await`
- `try/catch`
- Form validation
- Dynamic content rendering

---

## 📁 Project Structure

```text
alex-morgan-portfolio/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│   ├── profile.jpg
│   ├── project-1.jpg
│   ├── project-2.jpg
│   └── project-3.jpg
│
├── assets/
│   └── ...
│
└── README.md