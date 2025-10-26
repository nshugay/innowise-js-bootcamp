# Bookstore Web App

## Description

This is a responsive web application for an online bookstore. It allows users to browse books, search by title, author, or description, add items to the cart, and view cart contents. The app features dynamic carousels for book categories, a search function with highlighting, and a shopping cart with local storage persistence. Built with vanilla JavaScript, HTML, and CSS for a lightweight, fast experience.

Key features:
- Book browsing with categories (e.g., Top Rated, New Releases, Best Sellers).
- Real-time search with text highlighting.
- Add/remove books from cart.
- Horizontal scrollable carousels with navigation buttons and mouse wheel support.
- Responsive design for mobile and desktop.
- Cart persistence using localStorage.
- Support for local data simulation (e.g., using `db.json` for offline testing without a server).

## Technologies Used

- **HTML5**: Structure and markup.
- **CSS3**: Styling, including custom scrollbars and responsive layouts.
- **Vanilla JavaScript (ES6+)**: DOM manipulation, event handling, localStorage, carousel logic, and API simulation.
- **No external libraries**: Pure JavaScript for simplicity and performance.
- **JSON-server** (optional): For simulating a backend API during development.

## Installation

1. **Clone or Download the Project**:
   - Click the "Code" button on the GitHub repository page.
   - Select "Download ZIP" and extract the files to your local machine.
   - Alternatively, clone via Git: `git clone https://github.com/nshugay/innowise-js-bootcamp.git`

2. **Requirements**:
   - A modern web browser (e.g., Chrome, Firefox, Safari).
   - No additional software needed, but a code editor like VS Code is recommended for viewing/editing.
   - Optional: Node.js for server options.

## Running the App

The app uses JavaScript for DOM manipulation and localStorage. To avoid CORS issues when loading from the file system, run it through a local web server.

### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 14 or higher) for server options.

### Running the Local Server (API Simulation)
To mimic a real API, use json-server with `db.json`:

1. Ensure `db.json` is in the `local/` folder.
2. Start the server `npx json-server --watch local/db.json --port 3000` or click the link in the code.
   - `--watch`: Automatically updates data when the file changes.
   - `--port 3000`: The server will be available at `http://localhost:3000`.
3. Test the API: Open `http://localhost:3000/books` in your browser — you should see a JSON array of books.

### Using VS Code Live Server Extension (Recommended for Quick Testing)
1. Open the project folder in VS Code.
2. Install the "Live Server" extension if not already installed (search for "Live Server" in extensions).
3. Right-click on `index.html` and select "Open with Live Server".
4. The app will open in your browser.
   - If using json-server, ensure it's running on port 3000 for API calls.

Once running, navigate to `index.html` for the main page, `explore.html` for browsing categories, or `cart.html` for the shopping cart.

## Usage

- **Browsing Books**: View books in carousels on the Home and Explore pages. Use scroll bar or mouse wheel to scroll.
- **Searching**: Enter a query in the search bar to filter books. Results appear below with highlighted matches.
- **Adding to Cart**: Click "Add to Cart" on a book card.
- **Viewing Cart**: Go to the cart page to see items, remove them, and view totals.
- **Navigation**: Use the site menu to switch between pages or burger-menu for tablets and mobiles.

## Project Structure

```
.
├── assets/          # Book images, icons, and other static assets
├── local/           # Local data file (db.json for offline/API simulation)
├── scripts/         # JavaScript files 
├── styles/          # CSS files
├── cart.html        # Shopping cart page
├── explore.html     # Explore books page with categories
├── index.html       # Main landing page with carousels
├── main.css         # Primary stylesheet (imports styles from styles/)
└── script.js        # Main JavaScript entry point (orchestrates app logic)
```

## License

This project is open-source and available under the MIT License.

## Contact

If you have questions or suggestions, reach out via GitHub issues or via Telegram [@nshugay](http://t.me/nshugay).