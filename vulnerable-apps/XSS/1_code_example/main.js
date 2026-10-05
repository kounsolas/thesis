"use strict";
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }
    return element;
};
const searchForm = getElement("#product-search");
const searchInput = getElement("#search");
const resultsBox = getElement("#results");
const products = Array.from(document.querySelectorAll("#product-list li")).map((element) => ({
    element,
    name: element.dataset.name ?? element.textContent ?? "",
}));
const filterProducts = (term) => {
    const normalizedTerm = term.trim().toLowerCase();
    products.forEach(({ element, name }) => {
        const matches = normalizedTerm.length === 0 ||
            name.toLowerCase().includes(normalizedTerm);
        element.style.display = matches ? "block" : "none";
    });
};
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = searchInput.value;
    resultsBox.innerHTML = `Results for: ${term}`;
    //resultsBox.innerHTML = `Results for: ${term.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')}`;
    filterProducts(term);
});
