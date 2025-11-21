/**
 * Build the display name for a cart item.
 *
 * Rules you wanted:
 *  - Non-premade, has color: "Curtain Ring (White)"
 *  - Premade (any color):   "Curtain Ring (Premade)"
 */
function buildCartItemTitle(item) {
  const baseName = item.baseName || item.name || "Item";

  const variant = (item.variant || "").toLowerCase();
  const color = item.color || "";

  // If it's a premade variant, ignore the color in the title
  if (variant === "premade") {
    return `${baseName} (Premade)`;
  }

  // Otherwise, show color if there is one
  if (color) {
    return `${baseName} (${color})`;
  }

  return baseName;
}
