// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile nav ----------
const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.style.display === "flex";
  mainNav.style.display = isOpen ? "none" : "flex";
  mainNav.style.flexDirection = "column";
  mainNav.style.position = "absolute";
  mainNav.style.top = "64px";
  mainNav.style.right = "24px";
  mainNav.style.background = "#33201a";
  mainNav.style.padding = "18px 22px";
  mainNav.style.borderRadius = "14px";
  mainNav.style.gap = "16px";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 640) mainNav.style.display = "none";
  });
});

// ---------- Flavor filters ----------
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const tags = card.dataset.tags;
      const show = filter === "all" || tags.includes(filter);
      card.classList.toggle("is-hidden", !show);
    });
  });
});

// ---------- Card flip (nutrition info) ----------
cards.forEach((card) => {
  const infoBtn = card.querySelector(".info-btn");
  const backBtn = card.querySelector(".flip-back");
  infoBtn.addEventListener("click", () => card.classList.add("is-flipped"));
  backBtn.addEventListener("click", () => card.classList.remove("is-flipped"));
});

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
cards.forEach((card) => revealObserver.observe(card));

// ---------- Cart ----------
const CART_KEY = "crumbEmberCart";
const FREE_SHIP_THRESHOLD = 800;

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    /* storage unavailable, cart just won't persist */
  }
}

let cart = loadCart(); // { "Flavor Name": { price, qty } }

const cartToggle = document.getElementById("cartToggle");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartClose = document.getElementById("cartClose");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const cartShipNote = document.getElementById("cartShipNote");
const cartOrderBtn = document.getElementById("cartOrderBtn");
const ctaEmailBtn = document.getElementById("ctaEmailBtn");

function openCart() {
  cartDrawer.classList.add("is-open");
  cartOverlay.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
}
cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function cartTotalAmount() {
  return Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
}
function cartTotalCount() {
  return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}

function setQty(name, price, qty) {
  if (qty <= 0) {
    delete cart[name];
  } else {
    cart[name] = { price, qty };
  }
  saveCart(cart);
  renderAll();
}

function renderCardQty(card) {
  const name = card.dataset.name;
  const qtyEl = card.querySelector(".qty-value");
  const qty = cart[name] ? cart[name].qty : 0;
  qtyEl.textContent = qty;
}

function renderCart() {
  const entries = Object.entries(cart);
  if (entries.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Nothing in your box yet — add a flavor or two.</p>';
  } else {
    cartItemsEl.innerHTML = entries
      .map(([name, item]) => {
        const lineTotal = item.price * item.qty;
        return `
          <div class="cart-item" data-name="${name}">
            <div>
              <div class="cart-item-name">${name}</div>
              <div class="cart-item-meta">₹${item.price} each</div>
            </div>
            <div class="cart-item-controls">
              <button data-action="minus" aria-label="Remove one ${name}">−</button>
              <span>${item.qty}</span>
              <button data-action="plus" aria-label="Add one ${name}">+</button>
            </div>
            <div class="cart-item-price">₹${lineTotal}</div>
          </div>`;
      })
      .join("");

    cartItemsEl.querySelectorAll(".cart-item").forEach((row) => {
      const name = row.dataset.name;
      const item = cart[name];
      row.querySelector('[data-action="plus"]').addEventListener("click", () => {
        setQty(name, item.price, item.qty + 1);
      });
      row.querySelector('[data-action="minus"]').addEventListener("click", () => {
        setQty(name, item.price, item.qty - 1);
      });
    });
  }

  const total = cartTotalAmount();
  cartTotalEl.textContent = `₹${total}`;
  cartCountEl.textContent = cartTotalCount();

  if (total === 0) {
    cartShipNote.textContent = "";
  } else if (total >= FREE_SHIP_THRESHOLD) {
    cartShipNote.textContent = "Nice — this order ships free.";
  } else {
    cartShipNote.textContent = `Add ₹${FREE_SHIP_THRESHOLD - total} more for free shipping.`;
  }

  const mailto = buildMailto();
  cartOrderBtn.href = mailto;
  ctaEmailBtn.href = mailto;
}

function buildMailto() {
  const entries = Object.entries(cart);
  const base = "mailto:order@crumbandember.example";
  if (entries.length === 0) return base;
  const lines = entries.map(([name, item]) => `${item.qty} x ${name} — ₹${item.price * item.qty}`);
  const total = cartTotalAmount();
  const body = encodeURIComponent(
    `Hi Crumb & Ember,\n\nI'd like to order:\n${lines.join("\n")}\n\nTotal: ₹${total}\n\nName:\nPhone:\nPickup or delivery address:\n`
  );
  const subject = encodeURIComponent("New cookie order");
  return `${base}?subject=${subject}&body=${body}`;
}

function renderAll() {
  cards.forEach(renderCardQty);
  renderCart();
}

// wire up qty buttons + add-to-box on each card
cards.forEach((card) => {
  const name = card.dataset.name;
  const price = Number(card.dataset.price);
  const plusBtn = card.querySelector('[data-action="plus"]');
  const minusBtn = card.querySelector('[data-action="minus"]');
  const addBtn = card.querySelector(".add-btn");

  plusBtn.addEventListener("click", () => {
    const current = cart[name] ? cart[name].qty : 0;
    setQty(name, price, current + 1);
  });
  minusBtn.addEventListener("click", () => {
    const current = cart[name] ? cart[name].qty : 0;
    setQty(name, price, Math.max(0, current - 1));
  });
  addBtn.addEventListener("click", () => {
    const current = cart[name] ? cart[name].qty : 0;
    setQty(name, price, current + 1);
    addBtn.classList.add("is-added");
    addBtn.textContent = "Added ✓";
    openCart();
    setTimeout(() => {
      addBtn.classList.remove("is-added");
      addBtn.textContent = "Add to box";
    }, 1200);
  });
});

// wire up ready-made box buttons
document.querySelectorAll(".box-add").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = `${btn.dataset.box} box`;
    const price = Number(btn.dataset.price);
    const current = cart[name] ? cart[name].qty : 0;
    setQty(name, price, current + 1);
    openCart();
  });
});

renderAll();
