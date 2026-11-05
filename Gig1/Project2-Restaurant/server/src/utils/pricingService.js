// Pricing, Fee, and Order Transition Rules Engine for GourmetHaven

const CATALOG_PRICES = {
  'Truffle Infused Wild Mushroom Risotto': 890,
  'Pan-Seared Atlantic Salmon Fillet': 1250,
  'San Marzano Burrata Caprese Flatbread': 740,
  'Crispy Rosemary Calamari Fritti': 650,
  'Handmade Black Truffle Tagliolini': 980,
  'Spiced Avocado & Edamame Crostini': 520,
  'Sous-Vide Rosemary Lamb Chops': 1480,
  'Smoked Harissa Cottage Cheese Skewers': 590,
  'Molten Valrhona Dark Chocolate Dome': 490,
  'Sicilian Pistachio Tiramisu': 530,
  'Smoked Hibiscus & Rosemary Fizz': 360,
  'Yuzu Blood Orange Botanical Spritz': 390
};

// Allowed order state transitions (strict state machine)
const VALID_ORDER_TRANSITIONS = {
  'Received': ['Preparing', 'Cancelled'],
  'Preparing': ['Out for Delivery', 'Cancelled'],
  'Out for Delivery': ['Delivered', 'Cancelled'],
  'Delivered': [], // Terminal state
  'Cancelled': []  // Terminal state
};

/**
 * Validates state transition
 */
function isValidOrderTransition(currentStatus, nextStatus) {
  if (currentStatus === nextStatus) return true;
  const allowed = VALID_ORDER_TRANSITIONS[currentStatus];
  return allowed ? allowed.includes(nextStatus) : false;
}

/**
 * Calculates authoritative order financial breakdown
 */
function calculateOrderTotals({ items, orderType, promoCode, tip, menuPriceMap = CATALOG_PRICES }) {
  const verifiedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
    const itemId = item.menuItem ? String(item.menuItem) : null;
    const unitPrice = (itemId && menuPriceMap[itemId] !== undefined)
      ? menuPriceMap[itemId]
      : menuPriceMap[item.title];
    if (!unitPrice) {
      const error = new Error(`Menu item is not available: ${item.title || 'unknown item'}`);
      error.status = 400;
      throw error;
    }

    const lineTotal = unitPrice * qty;
    subtotal += lineTotal;

    verifiedItems.push({
      menuItem: itemId || undefined,
      title: item.title,
      price: unitPrice,
      quantity: qty,
      specialInstructions: (item.specialInstructions || '').slice(0, 200)
    });
  }

  const isTakeaway = orderType === 'Takeaway';
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = isTakeaway || subtotal >= 999 ? 0 : 60;
  const validatedTip = Math.max(0, Math.min(2000, Number(tip) || 0));

  let discountAmount = 0;
  let appliedPromoCode = '';
  const cleanCode = (promoCode || '').trim().toUpperCase();

  if (cleanCode === 'GOURMET10') {
    discountAmount = Math.round(subtotal * 0.10);
    appliedPromoCode = 'GOURMET10';
  } else if (cleanCode === 'TASTEFULL') {
    discountAmount = Math.min(150, subtotal);
    appliedPromoCode = 'TASTEFULL';
  }

  const totalAmount = Math.max(0, subtotal + tax + deliveryFee + validatedTip - discountAmount);

  return {
    verifiedItems,
    subtotal,
    tax,
    deliveryFee,
    tip: validatedTip,
    discountAmount,
    promoCode: appliedPromoCode,
    totalAmount
  };
}

module.exports = {
  CATALOG_PRICES,
  VALID_ORDER_TRANSITIONS,
  isValidOrderTransition,
  calculateOrderTotals
};
