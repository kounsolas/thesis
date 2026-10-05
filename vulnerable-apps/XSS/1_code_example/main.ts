type Product = {
  name: string;
  element: HTMLLIElement;
};

const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
};

const searchForm = getElement<HTMLFormElement>("#product-search");
const searchInput = getElement<HTMLInputElement>("#search");
const resultsBox = getElement<HTMLDivElement>("#results");

const products: Product[] = Array.from(
  document.querySelectorAll<HTMLLIElement>("#product-list li")
).map((element) => ({
  element,
  name: element.dataset.name ?? element.textContent ?? "",
}));

const filterProducts = (term: string) => {
  const normalizedTerm = term.trim().toLowerCase();
  products.forEach(({ element, name }) => {
    const matches =
      normalizedTerm.length === 0 ||
      name.toLowerCase().includes(normalizedTerm);
    element.style.display = matches ? "block" : "none";
  });
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const term = searchInput.value;
  resultsBox.innerHTML = `Results for: ${term}`;
  filterProducts(term);
});
