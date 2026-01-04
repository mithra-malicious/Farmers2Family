let order = [];
const WHATSAPP_NUMBER = "18684762768"; // 

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product-card');
        const item = {
            name: product.dataset.id,
            price: parseFloat(product.dataset.price)
        };
        order.push(item);
        updateCart();
    });
});

function updateCart() {
    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-val');
    const countEl = document.getElementById('cart-count');
    const btn = document.getElementById('whatsapp-order');

    countEl.innerText = order.length;
    
    if (order.length > 0) {
        btn.style.display = "block";
        list.innerHTML = order.map(i => `<p>${i.name} - $${i.price}</p>`).join('');
    }

    const total = order.reduce((acc, curr) => acc + curr.price, 0);
    totalEl.innerText = total.toFixed(2);
}

document.getElementById('whatsapp-order').addEventListener('click', () => {
    const total = order.reduce((acc, curr) => acc + curr.price, 0);
    let msg = `*NEW ORDER REQUEST - FARMERS TO FAMILY*\n\n`;
    
    order.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.name} ($${item.price})\n`;
    });

    msg += `\n*TOTAL: $${total.toFixed(2)} TTD*\n`;
    msg += `\n_Please confirm availability for Thursday/Friday delivery._`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
});