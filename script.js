let cart = [];
const phone = "18684762768"; // REPLACE WITH YOUR TRINIDAD WHATSAPP NUMBER

document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const item = {
            name: card.getAttribute('data-id'),
            price: parseFloat(card.getAttribute('data-price'))
        };
        
        cart.push(item);
        updateUI();
    });
});

function updateUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    const countSpan = document.getElementById('cart-count');
    const waBtn = document.getElementById('whatsapp-btn');

    // Update count
    countSpan.innerText = cart.length;

    // Update list
    if (cart.length > 0) {
        waBtn.style.display = "block";
        cartItemsDiv.innerHTML = cart.map((item, index) => 
            `<div class="item-row">${item.name} - $${item.price}</div>`
        ).join('');
    }

    // Calculate Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalSpan.innerText = total.toFixed(2);
}

document.getElementById('whatsapp-btn').addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Format the message string
    let message = `*New Order from Website*\n------------------\n`;
    cart.forEach(item => {
        message += `• ${item.name} ($${item.price})\n`;
    });
    message += `------------------\n*Total: $${total.toFixed(2)} TTD*`;

    // Create WhatsApp Link
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(waLink, '_blank');
});