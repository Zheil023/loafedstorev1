let cart = [];
const serverIP = "loafed.playsmp.xyz:19132";

function copyIP() {
    const btn = document.getElementById('ip-btn');
    navigator.clipboard.writeText(serverIP).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "COPIED!";
        btn.style.backgroundColor = "#ffffff";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 2000);
    });
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

function showPurchasePopup() {
    if (cart.length === 0) {
        alert("Your basket is empty!");
        return;
    }
    // Close cart first
    document.getElementById('cart-drawer').classList.remove('open');
    // Show modal
    document.getElementById('purchase-modal').classList.add('show');
    document.getElementById('overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('show');
    document.getElementById('overlay').classList.remove('active');
}

function closeAll() {
    document.getElementById('cart-drawer').classList.remove('open');
    closeModal();
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateUI();
}

function updateUI() {
    const container = document.getElementById('cart-items');
    const badge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    let total = 0;
    
    badge.innerText = cart.length;
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-zinc-500 text-center italic py-10">Basket is empty.</p>';
    } else {
        container.innerHTML = '';
        cart.forEach((item, i) => {
            total += item.price;
            container.innerHTML += `
                <div class="flex justify-between items-center bg-white/5 p-4 rounded-xl mb-2">
                    <div>
                        <p class="font-black text-white uppercase text-[10px]">${item.name}</p>
                        <p class="text-loaf-gold italic text-xs">₱${item.price}</p>
                    </div>
                    <button onclick="remove(${i})" class="text-zinc-600 hover:text-white transition">✕</button>
                </div>`;
        });
    }
    totalEl.innerText = `₱${total}`;
}

function remove(i) {
    cart.splice(i, 1);
    updateUI();
}