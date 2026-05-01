const API_BASE_URL = "https://YOUR-VERCEL-APP.vercel.app";

// Replace this with your real Stripe Price ID
const TEST_PRICE_ID = "price_REPLACE_ME";

async function checkout(cart) {
  const items = cart.map(i => ({
    priceId: i.priceId,
    quantity: i.qty
  }));

  const resp = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items })
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.error || "Checkout request failed");
  }

  if (!data.url) {
    throw new Error("No checkout URL returned");
  }

  window.location.href = data.url;
}

document.getElementById("checkoutBtn").addEventListener("click", async () => {
  const btn = document.getElementById("checkoutBtn");
  const status = document.getElementById("status");
  const qty = Number(document.getElementById("qty").value);

  if (!qty || qty < 1) {
    status.textContent = "Quantity must be at least 1.";
    return;
  }

  btn.disabled = true;
  status.textContent = "Redirecting to Stripe Checkout...";

  try {
    await checkout([
      {
        priceId: TEST_PRICE_ID,
        qty: qty
      }
    ]);
  } catch (err) {
    console.error(err);
    status.textContent = "Checkout failed: " + err.message;
    btn.disabled = false;
  }
});
