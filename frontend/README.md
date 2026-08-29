# 🌗 React + Vite + Tailwind Theme Toggle Project

This project is a **React + Vite** setup styled with **Tailwind CSS v4**, featuring a **custom Dark/Light theme system** using CSS variables.  
The theme toggle button switches between light and dark modes globally, and all pages automatically follow the active theme.  

---

## 🚀 Features
- ⚡ Fast setup with **Vite**  
- 🎨 **Tailwind CSS v4** for styling  
- 🌗 **Custom Dark/Light theme** (no Tailwind `dark:` variant needed)  
- 💾 Theme preference saved in **localStorage**  
- 🔄 Works across **all pages** (Error404, Home, etc.)  

---

## 📂 Project Structure
```
src/
 ├── App.jsx          # Main app wrapper
 ├── main.jsx         # Entry point
 ├── index.css        # Tailwind + custom theme variables
 ├── ThemeToggle.jsx  # Theme toggle button
 ├── Home.jsx         # Example home page
 ├── Error404.jsx     # Example error page
```

### 1. Clone the Repo

```bash
git clone https://github.com/kranand06/Vite-setup.git
cd Vite-setup
npm install
rm -rf .git
npm run dev
