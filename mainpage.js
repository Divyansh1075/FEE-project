document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];  // Get the cart from localStorage, if it exists

    // Function to update the cart icon and total
    function updateCart() {
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.querySelector('.cart-total');
        
        const totalItems = cart.length;
        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

        cartCount.textContent = totalItems;
        cartTotal.textContent = "₹ " + totalPrice;
    }

    // Function to add a book to the cart
    function addToCart(book) {
        cart.push(book);
        localStorage.setItem("cart", JSON.stringify(cart));  // Save the cart to localStorage
        updateCart();  // Update the cart display
    }

    // Get all "Buy" buttons
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();  // Prevent the default action (like navigating to another page)

            const bookItem = button.closest('.book-item');  // Get the parent book item
            const title = bookItem.querySelector('h3').textContent;
            const author = bookItem.querySelector('p b').textContent;
            const price = parseFloat(bookItem.querySelector('.price').textContent.replace('₹', '').trim());

            const book = { title, author, price };
            addToCart(book);

            alert(`${title} has been added to your cart!`);
        });
    });

    updateCart();  // Initial update of the cart icon
});
