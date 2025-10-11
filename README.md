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

## Technologies Used

- **HTML5**: Structure and markup.
- **CSS3**: Styling, including custom scrollbars and responsive layouts.
- **Vanilla JavaScript (ES6+)**: DOM manipulation, event handling, localStorage, and carousel logic.
- **No external libraries**: Pure JavaScript for simplicity and performance.

## Installation

1. **Clone or Download the Project**:
   - Click the "Code" button on the GitHub repository page.
   - Select "Download ZIP" and extract the files to your local machine.
   - Alternatively, clone via Git: `git clone https://github.com/nshugay/innowise-js-bootcamp.git`

2. **Requirements**:
   - A modern web browser (e.g., Chrome, Firefox, Safari).
   - No additional software needed, but a code editor like VS Code is recommended for viewing/editing.

## Running the App

Since the app uses JavaScript for DOM manipulation and localStorage, and may involve file paths or potential CORS issues if run directly from the file system, it's recommended to run it through a local web server.

### Option 1: Using VS Code Live Server Extension
1. Open the project folder in VS Code.
2. Install the "Live Server" extension if not already installed (search for "Live Server" in extensions).
3. Right-click on `index.html` (or any HTML file) and select "Open with Live Server".
4. The app will open in your browser at `http://127.0.0.1:5500` or similar.

### Option 2: Using Python (if installed)
1. Open a terminal/command prompt in the project folder.
2. Run: `python -m http.server 8000` (for Python 3) or `python -m SimpleHTTPServer 8000` (for Python 2).
3. Open your browser and go to `http://localhost:8000/index.html`.

### Option 3: Using Node.js (if preferred)
1. Install Node.js if not already installed.
2. In the project folder, run: `npx http-server` (installs and runs a simple server).
3. Open the provided URL in your browser.

Once running, navigate to `index.html` for the main page, `explore.html` for browsing categories, or `cart.html` for the shopping cart.

## Usage

- **Browsing Books**: View books in carousels on the main page. Use arrow buttons or mouse wheel to scroll.
- **Searching**: Enter a query in the search bar to filter books. Results appear below with highlighted matches.
- **Adding to Cart**: Click "Add to Cart" on a book card. The button changes to "Added to Cart".
- **Viewing Cart**: Go to the cart page to see items, remove them, and view totals.
- **Navigation**: Use the site menu to switch between pages.

## Project Structure

- `index.html`: Main page with best sellers and new releases.
- `explore.html`: Explore page with additional categories.
- `cart.html`: Shopping cart page.
- `css/`: Stylesheets (e.g., `styles.css`).
- `js/`: JavaScript files (e.g., `app.js` with the main logic).
- `images/`: Book images and assets.

## Contributing

Feel free to fork the repo, make improvements, and submit a pull request. For major changes, open an issue first to discuss.

## License

This project is open-source and available under the MIT License.

## Contact

If you have questions or suggestions, reach out via GitHub issues.
