/* @ds-bundle: {"format":4,"namespace":"MeetShredDesignSystem_e904a6","components":[{"name":"Headline","sourcePath":"components/brand/Headline.jsx"},{"name":"Liseret","sourcePath":"components/brand/Liseret.jsx"},{"name":"PhaseHeader","sourcePath":"components/brand/PhaseHeader.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BottomSheet","sourcePath":"components/core/BottomSheet.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardMedia","sourcePath":"components/core/Card.jsx"},{"name":"DisciplineChip","sourcePath":"components/core/DisciplineChip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Marker","sourcePath":"components/core/Marker.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"Toggle","sourcePath":"components/core/Toggle.jsx"}],"sourceHashes":{"components/brand/Headline.jsx":"4d38ad7822a1","components/brand/Liseret.jsx":"be9e6b9b4692","components/brand/PhaseHeader.jsx":"4d8eeb057173","components/core/Avatar.jsx":"db54fbadbee1","components/core/Badge.jsx":"30ba6e042966","components/core/BottomSheet.jsx":"91cb4ad10072","components/core/Button.jsx":"8fc5a423b75f","components/core/Card.jsx":"2b8db30875b5","components/core/DisciplineChip.jsx":"7486ea3e6d63","components/core/IconButton.jsx":"7d9405ef86fb","components/core/Input.jsx":"2cfc540bc46d","components/core/Marker.jsx":"ebaf619eb9b0","components/core/ProgressBar.jsx":"7f9852353706","components/core/SegmentedControl.jsx":"4502f9744c2f","components/core/StatusPill.jsx":"d105c73db28d","components/core/Toggle.jsx":"2a169c2d0985","ui_kits/app/EventsScreen.jsx":"3f7e1052f0ec","ui_kits/app/MapScreen.jsx":"d31908e09731","ui_kits/app/ProfileScreen.jsx":"4fd365b363ed","ui_kits/app/SpotScreen.jsx":"d89bc4cba8b2","ui_kits/app/WelcomeScreen.jsx":"37010b4b9b5b","ui_kits/app/app.jsx":"f631824a1380","ui_kits/app/chrome.jsx":"9254482bf043"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MeetShredDesignSystem_e904a6 = window.MeetShredDesignSystem_e904a6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Headline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 20,
  md: 26,
  lg: 34,
  xl: 44
};

/**
 * Signature headline — the 2015 light + black pairing:
 * "Next event **coming up**", "Past **events you attended**".
 * `light` is the lead-in (Roboto 300), `bold` the punch (Roboto 900).
 */
function Headline({
  light,
  bold,
  size = "md",
  color = "var(--text)",
  boldColor,
  as = "h2",
  align = "left",
  style = {},
  ...rest
}) {
  const Tag = as;
  const px = SIZES[size] || size;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      font: `300 ${px}px/1.08 var(--font-display)`,
      letterSpacing: "-0.015em",
      color,
      textAlign: align,
      textWrap: "balance",
      ...style
    }
  }, rest), light, light && bold ? " " : "", bold && /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 900,
      color: boldColor || color
    }
  }, bold));
}
Object.assign(__ds_scope, { Headline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Headline.jsx", error: String((e && e.message) || e) }); }

// components/brand/Liseret.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The red "liseret" — the 2015 signature band that seals the bottom edge of
 * every hero photo, with the script "m" monogram breaking out of it.
 * Place at the bottom of a photo header (position:relative parent).
 */
function Liseret({
  src,
  height = 10,
  markSize = 44,
  align = "center",
  style = {},
  className = "",
  ...rest
}) {
  const justify = align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: "relative",
      height,
      background: "var(--accent)",
      display: "flex",
      justifyContent: justify,
      padding: "0 20px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      top: -markSize * 0.55,
      height: markSize,
      display: "flex",
      alignItems: "center"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "Meetnshred",
    style: {
      height: markSize,
      width: "auto",
      display: "block",
      filter: "drop-shadow(0 2px 6px rgba(0,0,0,.35))"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 ${markSize}px/1 var(--font-script)`,
      color: "var(--white)",
      textShadow: "0 2px 6px rgba(0,0,0,.35)"
    }
  }, "m")));
}
Object.assign(__ds_scope, { Liseret });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Liseret.jsx", error: String((e && e.message) || e) }); }

// components/brand/PhaseHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PHASES = {
  live: {
    bg: "var(--phase-live)",
    fg: "var(--white)"
  },
  next: {
    bg: "var(--phase-next)",
    fg: "var(--carbon-950)"
  },
  mine: {
    bg: "var(--phase-mine)",
    fg: "var(--carbon-950)"
  },
  past: {
    bg: "var(--phase-past)",
    fg: "var(--white)"
  }
};

/**
 * Color-blocked event-phase banner (heritage "My events" sections):
 * live = blue · next = yellow · mine = green · past = slate.
 * Optional `badge` image (the fist), optional `pattern` image tiled at low opacity.
 */
function PhaseHeader({
  phase = "live",
  light,
  bold,
  badge,
  pattern,
  count,
  compact = false,
  children,
  style = {},
  ...rest
}) {
  const p = PHASES[phase] || PHASES.live;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      background: p.bg,
      color: p.fg,
      borderRadius: "var(--radius-lg)",
      padding: compact ? "12px 14px" : "16px 16px",
      ...style
    }
  }, rest), pattern && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.18,
      backgroundImage: `url("${pattern}")`,
      backgroundSize: "120px auto",
      mixBlendMode: "multiply"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, badge && /*#__PURE__*/React.createElement("img", {
    src: badge,
    alt: "",
    style: {
      width: compact ? 30 : 40,
      height: "auto",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      font: `300 ${compact ? 18 : 22}px/1.1 var(--font-display)`
    }
  }, light, light && bold ? " " : "", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 900
    }
  }, bold)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 14px var(--font-mono)",
      padding: "4px 10px",
      borderRadius: 999,
      background: "rgba(0,0,0,.18)"
    }
  }, count)), children && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginTop: 12
    }
  }, children));
}
Object.assign(__ds_scope, { PhaseHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PhaseHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  overflow: hidden;
  background: var(--surface-raised);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-weight: var(--fw-black);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  flex: none;
  user-select: none;
}
.ms-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ms-avatar--ring { box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent); }
.ms-avatar__badge {
  position: absolute; right: -1px; bottom: -1px;
  width: 30%; height: 30%; min-width: 9px; min-height: 9px;
  border-radius: 50%; border: 2px solid var(--bg); background: var(--status-open);
}
`;
if (typeof document !== "undefined" && !document.getElementById("ms-avatar-css")) {
  const s = document.createElement("style");
  s.id = "ms-avatar-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 88
};

/**
 * Rider avatar — photo or initials fallback. `ring` (red) for the active/own rider,
 * `online` for the live presence dot.
 */
function Avatar({
  src,
  name = "",
  size = "md",
  ring = false,
  online = false,
  className = "",
  ...rest
}) {
  const px = SIZES[size] || size;
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("");
  const cls = ["ms-avatar", ring ? "ms-avatar--ring" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      width: px,
      height: px,
      fontSize: Math.round(px * 0.4)
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : /*#__PURE__*/React.createElement("span", null, initials || "?"), online && /*#__PURE__*/React.createElement("span", {
    className: "ms-avatar__badge"
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: var(--fw-bold);
  font-size: 11px;
  line-height: 1;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--radius-pill);
  background: var(--status-closed);
  color: var(--carbon-950);
}
.ms-badge--brand { background: var(--accent); color: var(--on-accent); }
.ms-badge--neutral { background: var(--surface-raised); color: var(--text-secondary); border: 1px solid var(--border); }
.ms-badge--dot { min-width: 9px; width: 9px; height: 9px; padding: 0; }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-badge-css")) {
  const s = document.createElement("style");
  s.id = "ms-badge-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Count / notification badge — e.g. unread notifications, places left.
 * `dot` renders a bare indicator with no number.
 */
function Badge({
  tone = "alert",
  dot = false,
  children,
  className = "",
  ...rest
}) {
  const toneCls = tone === "brand" ? "ms-badge--brand" : tone === "neutral" ? "ms-badge--neutral" : "";
  const cls = ["ms-badge", toneCls, dot ? "ms-badge--dot" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), !dot && children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/BottomSheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-sheet-scrim {
  position: absolute; inset: 0;
  background: var(--overlay);
  display: flex; align-items: flex-end;
  z-index: 40;
  animation: ms-sheet-fade var(--dur-base) var(--ease-out);
}
@keyframes ms-sheet-fade { from { opacity: 0; } to { opacity: 1; } }
.ms-sheet {
  width: 100%;
  background: rgba(20,25,27,.92);
  backdrop-filter: blur(var(--backdrop-blur));
  -webkit-backdrop-filter: blur(var(--backdrop-blur));
  border-top-left-radius: var(--radius-xl);
  border-top-right-radius: var(--radius-xl);
  border-top: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sheet);
  padding: 10px var(--gutter) calc(var(--gutter) + env(safe-area-inset-bottom, 0px));
  color: var(--text);
  animation: ms-sheet-rise var(--dur-slow) var(--ease-out);
  max-height: 88%;
  overflow-y: auto;
}
@keyframes ms-sheet-rise { from { transform: translateY(100%); } to { transform: translateY(0); } }
.ms-sheet__grip { width: 38px; height: 4px; border-radius: 999px; background: var(--carbon-500); margin: 2px auto 14px; }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-sheet-css")) {
  const s = document.createElement("style");
  s.id = "ms-sheet-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Bottom sheet — the marker preview / spot detail / filters surface. Rises
 * over a scrim with a translucent blurred fill so the map shows through.
 * Render inside the phone frame (position: relative parent).
 */
function BottomSheet({
  open = true,
  onClose,
  grip = true,
  children,
  className = "",
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "ms-sheet-scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-sheet", className].filter(Boolean).join(" "),
    onClick: e => e.stopPropagation()
  }, rest), grip && /*#__PURE__*/React.createElement("div", {
    className: "ms-sheet__grip"
  }), children));
}
Object.assign(__ds_scope, { BottomSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BottomSheet.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Self-contained styles, injected once. References design-system CSS variables. */
const CSS = `
.ms-btn {
  font-family: var(--font-sans);
  font-weight: var(--fw-bold);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  white-space: nowrap;
  text-decoration: none;
  transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
.ms-btn:active { transform: scale(var(--press-scale)); }
.ms-btn:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--focus-ring); }
.ms-btn[disabled] { cursor: not-allowed; opacity: .45; transform: none; }

.ms-btn--sm { height: var(--control-sm); padding: 0 14px; font-size: 13px; }
.ms-btn--md { height: var(--control-md); padding: 0 18px; font-size: 15px; }
.ms-btn--lg { height: var(--control-lg); padding: 0 24px; font-size: 16px; }
.ms-btn--block { width: 100%; }

.ms-btn--primary { background: var(--accent); color: var(--on-accent); }
.ms-btn--primary:hover:not([disabled]) { background: var(--accent-hover); }

.ms-btn--secondary { background: var(--surface-raised); color: var(--text); border-color: var(--border); }
.ms-btn--secondary:hover:not([disabled]) { background: var(--carbon-600); }

.ms-btn--ghost { background: transparent; color: var(--text-secondary); }
.ms-btn--ghost:hover:not([disabled]) { background: rgba(255,255,255,.06); color: var(--text); }

.ms-btn--danger { background: var(--status-closed); color: #fff; }
.ms-btn--danger:hover:not([disabled]) { background: #ff6363; }

.ms-btn svg { width: 1.15em; height: 1.15em; }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-btn-css")) {
  const s = document.createElement("style");
  s.id = "ms-btn-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Primary action button. Shred Red = the one decisive CTA on a screen ("Voir le spot",
 * "Je participe"); secondary/ghost for everything else.
 */
function Button({
  variant = "primary",
  size = "md",
  block = false,
  iconLeft = null,
  iconRight = null,
  as = "button",
  children,
  className = "",
  ...rest
}) {
  const Tag = as;
  const cls = ["ms-btn", `ms-btn--${variant}`, `ms-btn--${size}`, block ? "ms-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconLeft, children != null && /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-card {
  background: var(--surface-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md), var(--edge-top);
  border: 1px solid var(--hairline);
  overflow: hidden;
  color: var(--text);
}
.ms-card--flat { box-shadow: none; border-color: var(--border-subtle); }
.ms-card--pad { padding: var(--space-4); }
.ms-card--interactive { cursor: pointer; transition: transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out); }
.ms-card--interactive:hover { border-color: var(--border); }
.ms-card--interactive:active { transform: scale(0.992); }
.ms-card__media { position: relative; width: 100%; aspect-ratio: 16 / 10; background: var(--carbon-700); overflow: hidden; }
.ms-card__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ms-card__media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(9,11,12,.78), transparent 55%); }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-card-css")) {
  const s = document.createElement("style");
  s.id = "ms-card-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Surface container. The standard dark card: lifted surface, lit top edge,
 * soft drop shadow. Set `padded` for body padding, `interactive` for tap rows.
 */
function Card({
  padded = false,
  flat = false,
  interactive = false,
  className = "",
  children,
  ...rest
}) {
  const cls = ["ms-card", flat ? "ms-card--flat" : "", padded ? "ms-card--pad" : "", interactive ? "ms-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), children);
}

/** Image header for a card, with a built-in bottom scrim for legible overlay text. */
function CardMedia({
  src,
  alt = "",
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-card__media", className].filter(Boolean).join(" ")
  }, rest), src && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }), children);
}
Object.assign(__ds_scope, { Card, CardMedia });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/DisciplineChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-weight: var(--fw-semibold);
  font-size: 13px;
  line-height: 1;
  padding: 8px 13px;
  border-radius: var(--radius-md);
  background: var(--surface-card);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
.ms-chip:active { transform: scale(var(--press-scale)); }
.ms-chip:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--focus-ring); }
.ms-chip__dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.ms-chip svg { width: 15px; height: 15px; }
.ms-chip:hover { background: var(--surface-raised); color: var(--text); }
.ms-chip--selected { background: var(--text); color: var(--carbon-950); border-color: var(--text); }
.ms-chip--selected:hover { background: var(--carbon-050); }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-chip-css")) {
  const s = document.createElement("style");
  s.id = "ms-chip-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const CAT_COLOR = {
  moto: "var(--cat-moto)",
  velo: "var(--cat-velo)",
  eau: "var(--cat-eau)",
  snow: "var(--cat-snow)",
  urban: "var(--cat-urban)"
};

/**
 * Toggleable discipline / filter chip. The category dot carries the muted
 * category accent; selected state inverts to a solid light chip.
 */
function DisciplineChip({
  label,
  category,
  icon = null,
  selected = false,
  className = "",
  ...rest
}) {
  const cls = ["ms-chip", selected ? "ms-chip--selected" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-pressed": selected
  }, rest), category && /*#__PURE__*/React.createElement("span", {
    className: "ms-chip__dot",
    style: {
      background: CAT_COLOR[category] || "var(--text-muted)"
    }
  }), icon, label);
}
Object.assign(__ds_scope, { DisciplineChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DisciplineChip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-iconbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  background: transparent;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
.ms-iconbtn:active { transform: scale(var(--press-scale)); }
.ms-iconbtn:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--focus-ring); }
.ms-iconbtn[disabled] { opacity: .45; cursor: not-allowed; transform: none; }
.ms-iconbtn svg { width: 55%; height: 55%; }

.ms-iconbtn--sm { width: var(--control-sm); height: var(--control-sm); }
.ms-iconbtn--md { width: var(--control-md); height: var(--control-md); }
.ms-iconbtn--lg { width: var(--control-lg); height: var(--control-lg); }

.ms-iconbtn--ghost:hover:not([disabled]) { background: rgba(255,255,255,.07); color: var(--text); }
.ms-iconbtn--surface { background: var(--surface-raised); border-color: var(--border); color: var(--text); }
.ms-iconbtn--surface:hover:not([disabled]) { background: var(--carbon-600); }
.ms-iconbtn--solid { background: var(--accent); color: var(--on-accent); border-radius: var(--radius-pill); }
.ms-iconbtn--solid:hover:not([disabled]) { background: var(--accent-hover); }
/* floating over the map */
.ms-iconbtn--float {
  background: rgba(26,32,35,.72);
  backdrop-filter: blur(var(--backdrop-blur));
  -webkit-backdrop-filter: blur(var(--backdrop-blur));
  border-color: var(--border-subtle);
  color: var(--text);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-md);
}
.ms-iconbtn--float:hover:not([disabled]) { background: rgba(35,43,47,.85); }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-iconbtn-css")) {
  const s = document.createElement("style");
  s.id = "ms-iconbtn-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Icon-only square/round button. Use `float` for the controls that hover over
 * the dark map (locate-me, filters, layers).
 */
function IconButton({
  variant = "ghost",
  size = "md",
  label,
  children,
  className = "",
  ...rest
}) {
  const cls = ["ms-iconbtn", `ms-iconbtn--${variant}`, `ms-iconbtn--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-field { display: flex; flex-direction: column; gap: 7px; width: 100%; }
.ms-field__label { font: var(--fw-semibold) 13px var(--font-sans); color: var(--text-secondary); }
.ms-input {
  position: relative; display: flex; align-items: center; gap: 10px;
  background: var(--surface-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  padding: 0 14px;
  height: var(--control-lg);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.ms-input:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px var(--focus-ring); }
.ms-input--invalid { border-color: var(--status-closed); }
.ms-input__icon { color: var(--text-muted); display: inline-flex; }
.ms-input__icon svg { width: 18px; height: 18px; }
.ms-input input {
  flex: 1; min-width: 0;
  background: transparent; border: none; outline: none;
  color: var(--text); font: var(--fw-medium) 15px var(--font-sans);
}
.ms-input input::placeholder { color: var(--text-muted); font-weight: var(--fw-regular); }
.ms-field__hint { font: var(--fw-medium) 12px var(--font-sans); color: var(--text-muted); }
.ms-field__hint--error { color: var(--status-closed); }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-input-css")) {
  const s = document.createElement("style");
  s.id = "ms-input-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Text / search input with optional label, leading icon and hint. The lagoon
 * focus ring is the standard focus treatment across the app.
 */
function Input({
  label,
  icon = null,
  trailing = null,
  hint,
  error,
  className = "",
  id,
  ...rest
}) {
  const invalid = Boolean(error);
  return /*#__PURE__*/React.createElement("label", {
    className: ["ms-field", className].filter(Boolean).join(" "),
    htmlFor: id
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ms-field__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: ["ms-input", invalid ? "ms-input--invalid" : ""].filter(Boolean).join(" ")
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "ms-input__icon"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: id
  }, rest)), trailing), (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: ["ms-field__hint", invalid ? "ms-field__hint--error" : ""].filter(Boolean).join(" ")
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Marker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-marker { position: relative; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; flex: none; }
/* spot — circle */
.ms-marker--spot {
  border-radius: 50%;
  color: var(--text-on-status);
  border: 2px solid rgba(255,255,255,.85);
  box-shadow: var(--shadow-marker);
  transition: transform var(--dur-fast) var(--ease-spring);
}
.ms-marker--spot:active { transform: scale(1.12); }
.ms-marker--spot svg { width: 52%; height: 52%; }
/* event — diamond */
.ms-marker--event {
  border-radius: 10px;
  transform: rotate(45deg);
  background: var(--accent);
  border: 2px solid rgba(255,255,255,.9);
  box-shadow: var(--shadow-marker);
}
.ms-marker--event .ms-marker__inner { transform: rotate(-45deg); display: inline-flex; color: var(--white); }
.ms-marker--event .ms-marker__inner svg { width: 18px; height: 18px; }
/* cluster */
.ms-marker--cluster {
  border-radius: 50%;
  background: var(--carbon-800);
  border: 2px solid var(--carbon-500);
  color: var(--text);
  font: var(--fw-bold) 15px var(--font-mono);
  box-shadow: var(--shadow-marker);
}
.ms-marker--selected { outline: 3px solid var(--accent-2); outline-offset: 2px; }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-marker-css")) {
  const s = document.createElement("style");
  s.id = "ms-marker-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}
const TONE_COLOR = {
  open: "var(--status-open)",
  info: "var(--status-info)",
  warn: "var(--status-warn)",
  closed: "var(--status-closed)",
  off: "var(--status-off)"
};

/**
 * Map marker. `type="spot"` is a status-colored circle holding the discipline
 * icon; `type="event"` is a red diamond; `type="cluster"` shows a count.
 * Shape is semantic — keep spot=circle, event=diamond.
 */
function Marker({
  type = "spot",
  tone = "open",
  count,
  size = 44,
  selected = false,
  children,
  className = "",
  ...rest
}) {
  const sel = selected ? "ms-marker--selected" : "";
  if (type === "event") {
    const d = size * 0.86;
    return /*#__PURE__*/React.createElement("span", _extends({
      className: ["ms-marker", "ms-marker--event", sel, className].filter(Boolean).join(" "),
      style: {
        width: d,
        height: d
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      className: "ms-marker__inner"
    }, children));
  }
  if (type === "cluster") {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: ["ms-marker", "ms-marker--cluster", sel, className].filter(Boolean).join(" "),
      style: {
        width: size,
        height: size
      }
    }, rest), count);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ms-marker", "ms-marker--spot", sel, className].filter(Boolean).join(" "),
    style: {
      width: size,
      height: size,
      background: TONE_COLOR[tone] || TONE_COLOR.open
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Marker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Marker.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-prog { width: 100%; }
.ms-prog__track {
  width: 100%; height: 6px; border-radius: var(--radius-pill);
  background: var(--carbon-700); overflow: hidden;
}
.ms-prog__fill {
  height: 100%; border-radius: var(--radius-pill);
  background: var(--accent-2);
  transition: width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out);
}
.ms-prog--warn .ms-prog__fill { background: var(--status-warn); }
.ms-prog--full .ms-prog__fill { background: var(--status-closed); }
.ms-prog__meta {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 6px;
}
.ms-prog__label { font: var(--fw-semibold) 13px var(--font-sans); color: var(--text-secondary); }
.ms-prog__count { font: var(--fw-bold) 13px var(--font-mono); color: var(--text); }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-prog-css")) {
  const s = document.createElement("style");
  s.id = "ms-prog-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Capacity / places-remaining bar. Auto-colors: lagoon normally, orange when
 * nearly full (≥80%), red when full. Pass value/max to show the "x/y" count.
 */
function ProgressBar({
  value,
  max = 100,
  label,
  showCount = true,
  className = "",
  ...rest
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, value / max * 100)) : 0;
  const state = pct >= 100 ? "full" : pct >= 80 ? "warn" : "";
  const cls = ["ms-prog", state ? `ms-prog--${state}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), (label || showCount) && /*#__PURE__*/React.createElement("div", {
    className: "ms-prog__meta"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ms-prog__label"
  }, label), showCount && /*#__PURE__*/React.createElement("span", {
    className: "ms-prog__count"
  }, value, "/", max)), /*#__PURE__*/React.createElement("div", {
    className: "ms-prog__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-prog__fill",
    style: {
      width: pct + "%"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-seg {
  display: inline-flex;
  padding: 4px;
  gap: 2px;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.ms-seg--block { display: flex; width: 100%; }
.ms-seg__opt {
  flex: 1;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border: none; background: transparent; cursor: pointer;
  font: var(--fw-bold) 13px var(--font-sans);
  color: var(--text-muted);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
.ms-seg__opt svg { width: 16px; height: 16px; }
.ms-seg__opt:hover { color: var(--text-secondary); }
.ms-seg__opt--active { background: var(--surface-raised); color: var(--text); box-shadow: var(--edge-top); }
.ms-seg__opt:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--focus-ring); }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-seg-css")) {
  const s = document.createElement("style");
  s.id = "ms-seg-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Segmented control — the swipe/list toggle, spots/events filter, etc.
 * `options` = [{ value, label, icon? }]; controlled via value/onChange.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  block = false,
  className = "",
  ...rest
}) {
  const cls = ["ms-seg", block ? "ms-seg--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "tablist"
  }, rest), options.map(opt => {
    const active = opt.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      role: "tab",
      "aria-selected": active,
      className: ["ms-seg__opt", active ? "ms-seg__opt--active" : ""].filter(Boolean).join(" "),
      onClick: () => onChange && onChange(opt.value)
    }, opt.icon, opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-sans);
  font-weight: var(--fw-bold);
  border-radius: var(--radius-pill);
  white-space: nowrap;
  line-height: 1;
}
.ms-status--sm { padding: 5px 10px 5px 8px; font-size: 11px; }
.ms-status--md { padding: 7px 13px 7px 10px; font-size: 13px; }
.ms-status__dot { width: 8px; height: 8px; border-radius: 50%; flex: none; background: currentColor; }
.ms-status--md .ms-status__dot { width: 9px; height: 9px; }
.ms-status--solid { color: var(--text-on-status); }
.ms-status--solid .ms-status__dot { background: rgba(0,0,0,.55); }
.ms-status--pulse .ms-status__dot { animation: ms-pulse-open 1.8s var(--ease-in-out) infinite; }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-status-css")) {
  const s = document.createElement("style");
  s.id = "ms-status-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* tone → [color var, tint var] */
const TONES = {
  open: ["var(--status-open)", "var(--status-open-tint)"],
  info: ["var(--status-info)", "var(--status-info-tint)"],
  warn: ["var(--status-warn)", "var(--status-warn-tint)"],
  closed: ["var(--status-closed)", "var(--status-closed-tint)"],
  off: ["var(--status-off)", "var(--status-off-tint)"]
};

/**
 * Localized spot/event status pill. `tone` maps to the five config status colors;
 * `label` is the already-localized string from the discipline config.
 */
function StatusPill({
  tone = "open",
  label,
  size = "md",
  solid = false,
  pulse = false,
  className = "",
  ...rest
}) {
  const [color, tint] = TONES[tone] || TONES.open;
  const style = solid ? {
    background: color
  } : {
    background: tint,
    color
  };
  const cls = ["ms-status", `ms-status--${size}`, solid ? "ms-status--solid" : "", pulse ? "ms-status--pulse" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: style
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ms-status__dot"
  }), label);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 46px; height: 28px;
  border-radius: var(--radius-pill);
  background: var(--carbon-600);
  border: none; cursor: pointer; padding: 0;
  transition: background var(--dur-base) var(--ease-out);
  flex: none;
  -webkit-tap-highlight-color: transparent;
}
.ms-switch__knob {
  position: absolute; top: 3px; left: 3px;
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--carbon-100);
  box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-spring), background var(--dur-base) var(--ease-out);
}
.ms-switch--on { background: var(--accent); }
.ms-switch--on .ms-switch__knob { transform: translateX(18px); background: var(--white); }
.ms-switch:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--focus-ring); }
.ms-switch[disabled] { opacity: .45; cursor: not-allowed; }
`;
if (typeof document !== "undefined" && !document.getElementById("ms-switch-css")) {
  const s = document.createElement("style");
  s.id = "ms-switch-css";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * On/off switch — settings, notification prefs, "Toutes les disciplines".
 * Controlled via checked/onChange.
 */
function Toggle({
  checked = false,
  onChange,
  label,
  className = "",
  ...rest
}) {
  const cls = ["ms-switch", checked ? "ms-switch--on" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    "aria-label": label,
    className: cls,
    onClick: () => onChange && onChange(!checked)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ms-switch__knob"
  }));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/EventsScreen.jsx
try { (() => {
/* Events — swipe-to-join feed. Swipe right = inscription directe (green flash
   + 3s "Annuler" snackbar), swipe left = passer. Plus a list-view toggle. */

function EventCard({
  ev,
  style,
  dragX = 0
}) {
  const {
    StatusPill
  } = window.DS;
  const joinOpacity = Math.max(0, Math.min(1, dragX / 90));
  const skipOpacity = Math.max(0, Math.min(1, -dragX / 90));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "var(--radius-2xl)",
      overflow: "hidden",
      background: "var(--surface-card)",
      border: "1px solid var(--hairline)",
      boxShadow: "var(--shadow-lg)",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    category: ev.cat,
    icon: ev.icon,
    src: ev.src,
    pos: ev.pos,
    height: "56%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14,
      top: 14,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 11px var(--font-sans)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--on-accent)",
      background: "var(--accent)",
      padding: "5px 10px",
      borderRadius: "var(--radius-pill)"
    }
  }, ev.type)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      top: 16,
      opacity: joinOpacity,
      border: "3px solid var(--status-open)",
      color: "var(--status-open)",
      padding: "4px 12px",
      borderRadius: 10,
      transform: "rotate(12deg)",
      font: "var(--fw-black) 18px var(--font-display)",
      letterSpacing: "0.04em"
    }
  }, "JE PARTICIPE"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      top: 16,
      opacity: skipOpacity,
      border: "3px solid var(--text-muted)",
      color: "var(--text-secondary)",
      padding: "4px 12px",
      borderRadius: 10,
      transform: "rotate(-12deg)",
      font: "var(--fw-black) 18px var(--font-display)",
      letterSpacing: "0.04em"
    }
  }, "PASSER")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 21px var(--font-sans)",
      lineHeight: 1.12
    }
  }, ev.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      color: "var(--text-secondary)",
      font: "var(--fw-medium) 14px var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "calendar",
    style: {
      width: 16,
      height: 16,
      color: "var(--text-muted)"
    }
  }), ev.date), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "map-pin",
    style: {
      width: 16,
      height: 16,
      color: "var(--text-muted)"
    }
  }), ev.place, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, ev.dist))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      color: "var(--text-muted)",
      font: "var(--fw-medium) 13px var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "user",
    style: {
      width: 15,
      height: 15
    }
  }), ev.org), ev.max ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-bold) 13px var(--font-mono)",
      color: "var(--text-secondary)"
    }
  }, ev.count, "/", ev.max, " places") : /*#__PURE__*/React.createElement(StatusPill, {
    tone: "open",
    label: "Places illimit\xE9es",
    size: "sm"
  }))));
}
const PHASES = [{
  phase: "live",
  light: "Ça se passe",
  bold: "maintenant",
  badge: "fist-badge-white.png"
}, {
  phase: "next",
  light: "Prochain event",
  bold: "à venir",
  badge: "fist-badge-black.png"
}, {
  phase: "mine",
  light: "Tes",
  bold: "events",
  badge: "fist-badge-black.png"
}, {
  phase: "past",
  light: "Events",
  bold: "passés",
  badge: "fist-badge-white.png"
}];
function MyEvents() {
  const {
    PhaseHeader
  } = window.DS;
  const all = [...EVENTS, ...EVENTS_EXTRA];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "4px 16px 100px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, PHASES.map(p => {
    const list = all.filter(e => e.phase === p.phase);
    const dark = p.phase === "next" || p.phase === "mine";
    return /*#__PURE__*/React.createElement(PhaseHeader, {
      key: p.phase,
      phase: p.phase,
      light: p.light,
      bold: p.bold,
      badge: A + p.badge,
      pattern: A + "pattern-goggles.png",
      count: list.length,
      compact: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, list.map(e => /*#__PURE__*/React.createElement("div", {
      key: e.id,
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        padding: 8,
        borderRadius: 12,
        background: dark ? "rgba(255,255,255,.55)" : "rgba(0,0,0,.22)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        overflow: "hidden",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Photo, {
      category: e.cat,
      icon: e.icon,
      src: e.src,
      dim: 0
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "700 14px var(--font-sans)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, e.title), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "500 12px var(--font-mono)",
        opacity: 0.8
      }
    }, e.date)), /*#__PURE__*/React.createElement(Ic, {
      n: "chevron-right",
      style: {
        width: 18,
        height: 18
      }
    })))));
  }));
}
function EventsScreen({
  onTab
}) {
  const {
    SegmentedControl,
    IconButton,
    StatusPill,
    Headline,
    PhaseHeader
  } = window.DS;
  const [view, setView] = React.useState("swipe");
  const [idx, setIdx] = React.useState(0);
  const [drag, setDrag] = React.useState(0);
  const [flash, setFlash] = React.useState(null); // "join" | "skip"
  const [snack, setSnack] = React.useState(false);
  const start = React.useRef(null);
  useLucide();
  const advance = dir => {
    setFlash(dir);
    if (dir === "join") {
      setSnack(true);
      setTimeout(() => setSnack(false), 3000);
    }
    setTimeout(() => {
      setIdx(i => (i + 1) % EVENTS.length);
      setDrag(0);
      setFlash(null);
    }, 280);
  };
  const onDown = e => {
    start.current = e.clientX;
    e.target.setPointerCapture?.(e.pointerId);
  };
  const onMove = e => {
    if (start.current != null) setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current == null) return;
    if (drag > 90) advance("join");else if (drag < -90) advance("skip");else setDrag(0);
    start.current = null;
  };
  const ev = EVENTS[idx];
  const next = EVENTS[(idx + 1) % EVENTS.length];
  const flyX = flash === "join" ? 520 : flash === "skip" ? -520 : drag;
  const rot = flyX / 22;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 16px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    light: "Events",
    bold: "autour de toi",
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 10px"
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    block: true,
    value: view,
    onChange: setView,
    options: [{
      value: "swipe",
      label: "Swipe",
      icon: /*#__PURE__*/React.createElement(Ic, {
        n: "layers"
      })
    }, {
      value: "list",
      label: "Liste",
      icon: /*#__PURE__*/React.createElement(Ic, {
        n: "list"
      })
    }, {
      value: "mine",
      label: "Mes events",
      icon: /*#__PURE__*/React.createElement(Ic, {
        n: "hand-metal"
      })
    }]
  })), view === "swipe" ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      padding: "8px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(EventCard, {
    ev: next,
    style: {
      transform: "scale(0.95) translateY(14px)",
      filter: "brightness(.8)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    onPointerDown: onDown,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: onUp,
    style: {
      position: "absolute",
      inset: 0,
      cursor: "grab",
      touchAction: "none",
      transform: `translateX(${flyX}px) rotate(${rot}deg)`,
      transition: flash || start.current == null ? "transform var(--dur-swipe) var(--ease-out)" : "none"
    }
  }, /*#__PURE__*/React.createElement(EventCard, {
    ev: ev,
    dragX: drag
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 104,
      display: "flex",
      justifyContent: "center",
      gap: 22,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => advance("skip"),
    "aria-label": "Passer",
    style: {
      width: 58,
      height: 58,
      borderRadius: "50%",
      border: "1px solid var(--border)",
      background: "var(--surface-card)",
      color: "var(--text-secondary)",
      cursor: "pointer",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "x",
    style: {
      width: 26,
      height: 26
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => advance("join"),
    "aria-label": "Je participe",
    style: {
      width: 66,
      height: 66,
      borderRadius: "50%",
      border: "none",
      background: "var(--status-open)",
      color: "var(--carbon-950)",
      cursor: "pointer",
      boxShadow: "var(--glow-open)"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "check",
    style: {
      width: 30,
      height: 30
    }
  })))) : view === "mine" ? /*#__PURE__*/React.createElement(MyEvents, null) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "4px 16px 100px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, EVENTS.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    style: {
      display: "flex",
      gap: 12,
      padding: 12,
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      border: "1px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    category: e.cat,
    icon: e.icon,
    src: e.src,
    pos: e.pos,
    dim: 0.1
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 11px var(--font-sans)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--red-400)"
    }
  }, e.type), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 15px var(--font-sans)",
      margin: "3px 0"
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) 12px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, e.date, " \xB7 ", e.dist))))), snack && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 96,
      zIndex: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 14px",
      borderRadius: "var(--radius-md)",
      background: "var(--carbon-700)",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 9,
      alignItems: "center",
      font: "var(--fw-semibold) 14px var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "check-circle-2",
    style: {
      width: 18,
      height: 18,
      color: "var(--status-open)"
    }
  }), "Tu participes \u2014 c'est not\xE9"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSnack(false),
    style: {
      background: "none",
      border: "none",
      color: "var(--accent)",
      font: "var(--fw-bold) 14px var(--font-sans)",
      cursor: "pointer"
    }
  }, "Annuler")), /*#__PURE__*/React.createElement(TabBar, {
    active: "events",
    onChange: onTab
  }));
}
window.EventsScreen = EventsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/EventsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/MapScreen.jsx
try { (() => {
/* Map — the home screen. Dark monochrome map, status-colored markers,
   floating search + discipline filters, tap a marker → preview sheet. */

function MapCanvas() {
  // Faux dark map: layered low-contrast "roads" + parcels over the void.
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--map-bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "-20%",
      backgroundImage: "linear-gradient(90deg, var(--map-road) 0 1.5px, transparent 1.5px)," + "linear-gradient(0deg, var(--map-road) 0 1.5px, transparent 1.5px)",
      backgroundSize: "120px 120px",
      opacity: 0.5,
      transform: "rotate(-18deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "-20%",
      backgroundImage: "linear-gradient(58deg, var(--map-road) 0 2.5px, transparent 2.5px)," + "linear-gradient(150deg, var(--map-road) 0 2.5px, transparent 2.5px)",
      backgroundSize: "260px 260px",
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "-10%",
      top: "44%",
      width: "55%",
      height: "42%",
      background: "var(--map-water)",
      borderRadius: "44% 56% 60% 40%",
      filter: "blur(2px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "4%",
      top: "16%",
      width: "40%",
      height: "26%",
      background: "var(--map-land)",
      borderRadius: "40% 50% 45% 55%"
    }
  }));
}
function MapScreen({
  onTab
}) {
  const {
    Marker,
    IconButton,
    DisciplineChip,
    StatusPill,
    BottomSheet,
    Button,
    Avatar
  } = window.DS;
  const [sel, setSel] = React.useState(null);
  const [filter, setFilter] = React.useState("all");
  useLucide();
  const spot = SPOTS.find(s => s.id === sel) || null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(MapCanvas, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "48%",
      top: "47%",
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "var(--map-self)",
      border: "2px solid #fff",
      boxShadow: "0 0 0 8px rgba(61,155,255,.18)",
      zIndex: 5
    }
  }), SPOTS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    style: {
      position: "absolute",
      left: s.x,
      top: s.y,
      zIndex: 6,
      transform: "translate(-50%,-50%)"
    }
  }, /*#__PURE__*/React.createElement(Marker, {
    type: "spot",
    tone: s.tone,
    selected: sel === s.id,
    onClick: () => setSel(s.id)
  }, /*#__PURE__*/React.createElement(Ic, {
    n: s.icon
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "56%",
      top: "47%",
      zIndex: 6,
      transform: "translate(-50%,-50%)"
    }
  }, /*#__PURE__*/React.createElement(Marker, {
    type: "event"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "flag"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "82%",
      top: "42%",
      zIndex: 6,
      transform: "translate(-50%,-50%)"
    }
  }, /*#__PURE__*/React.createElement(Marker, {
    type: "cluster",
    count: 8
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 200,
      background: "var(--scrim-top)",
      zIndex: 10,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      zIndex: 11
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "logo-script-red.png",
    alt: "Meetnshred",
    style: {
      height: 34,
      display: "block"
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    variant: "float",
    label: "Notifications"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "bell"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px",
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 48,
      padding: "0 14px",
      borderRadius: "var(--radius-pill)",
      color: "var(--text)",
      background: "rgba(26,32,35,.82)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "search",
    style: {
      width: 18,
      height: 18,
      color: "var(--text-muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--fw-medium) 15px var(--font-sans)",
      color: "var(--text-muted)"
    }
  }, "Chercher un spot ou un lieu"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "12px 16px 0",
      overflowX: "auto"
    }
  }, [["all", "Toutes", null], ["mx", "MX", "moto"], ["dh", "DH", "velo"], ["kite", "Kite", "eau"], ["ski", "Ski", "snow"]].map(([id, label, cat]) => /*#__PURE__*/React.createElement(DisciplineChip, {
    key: id,
    label: label,
    category: cat,
    selected: filter === id,
    onClick: () => setFilter(id),
    style: {
      flex: "none"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      bottom: 116,
      zIndex: 12,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "float",
    label: "Filtres"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "sliders-horizontal"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "float",
    label: "Me localiser"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "locate-fixed"
  }))), !spot && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: 104,
      transform: "translateX(-50%)",
      zIndex: 12,
      font: "var(--fw-semibold) 12px var(--font-sans)",
      color: "var(--text-secondary)",
      background: "rgba(15,19,20,.86)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      padding: "8px 14px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--border-subtle)",
      whiteSpace: "nowrap"
    }
  }, "5 spots \xB7 8 events autour de toi"), /*#__PURE__*/React.createElement(TabBar, {
    active: "map",
    onChange: onTab
  }), /*#__PURE__*/React.createElement(BottomSheet, {
    open: !!spot,
    onClose: () => setSel(null)
  }, spot && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    tone: spot.tone,
    label: spot.status,
    pulse: spot.tone === "open"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 19px var(--font-sans)",
      lineHeight: 1.15
    }
  }, spot.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) 13px var(--font-mono)",
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, spot.disc, " \xB7 ", spot.dist, " \xB7 ", spot.count, "/", spot.max, " places")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: "var(--radius-md)",
      flex: "none",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    category: spot.cat,
    icon: spot.icon,
    src: spot.src,
    dim: 0
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: () => onTab("spot")
  }, "Voir le spot"), /*#__PURE__*/React.createElement(IconButton, {
    variant: "surface",
    size: "lg",
    label: "Suivre"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "heart"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "surface",
    size: "lg",
    label: "Itin\xE9raire"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "navigation"
  }))))));
}
window.MapScreen = MapScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/MapScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ProfileScreen.jsx
try { (() => {
/* Rider profile — cover + avatar, level, disciplines, bio, and per-discipline
   equipment cards ("Machine" for a motard, "Board" for a rider). */

function GearCard({
  g
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--surface-card)",
      border: "1px solid var(--hairline)",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    category: g.cat,
    icon: g.icon,
    src: g.src,
    height: 120,
    dim: 0.15
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: 12,
      font: "var(--fw-bold) 10px var(--font-sans)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--on-accent)",
      background: "var(--accent)",
      padding: "4px 9px",
      borderRadius: "var(--radius-pill)"
    }
  }, g.kind), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14,
      bottom: 12,
      font: "var(--fw-bold) 17px var(--font-sans)",
      color: "var(--text)"
    }
  }, g.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px 16px"
    }
  }, g.fields.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) 11px var(--font-sans)",
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-label)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-semibold) 15px var(--font-sans)",
      color: "var(--text)",
      marginTop: 2
    }
  }, v)))));
}
function ProfileScreen({
  onTab
}) {
  const {
    Avatar,
    DisciplineChip,
    IconButton,
    Button,
    Liseret
  } = window.DS;
  useLucide();
  const r = RIDER;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 180,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    category: "urban",
    src: A + "photos/skatepark-venice.png",
    height: "100%",
    dim: 0.05
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      top: 50,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "float",
    label: "Partager"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "share-2"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "float",
    label: "R\xE9glages"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "settings"
  })))), /*#__PURE__*/React.createElement(Liseret, {
    src: A + "monogram-m-sticker.png",
    markSize: 36,
    align: "right"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 18px 110px",
      marginTop: -40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      border: "3px solid var(--bg)",
      borderRadius: "50%"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r.name,
    size: "xl",
    ring: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 6,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "300 24px/1 var(--font-display)",
      letterSpacing: "-0.015em"
    }
  }, "L\xE9a ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 900
    }
  }, "Marchand")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-medium) 13px var(--font-mono)",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, r.handle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      margin: "14px 0",
      color: "var(--text-secondary)",
      font: "var(--fw-medium) 13px var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "gauge",
    style: {
      width: 15,
      height: 15,
      color: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text)"
    }
  }, r.level)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "map-pin",
    style: {
      width: 15,
      height: 15
    }
  }), r.loc)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 16px",
      font: "var(--fw-regular) 15px/1.5 var(--font-sans)",
      color: "var(--text-secondary)"
    }
  }, r.bio), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 22
    }
  }, r.disciplines.map(d => /*#__PURE__*/React.createElement(DisciplineChip, {
    key: d.label,
    label: d.label,
    category: d.cat,
    selected: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Overline, null, "Mon mat\xE9riel"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--accent)",
      font: "var(--fw-bold) 13px var(--font-sans)",
      display: "flex",
      gap: 5,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "plus",
    style: {
      width: 15,
      height: 15
    }
  }), "Ajouter")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, r.gear.map(g => /*#__PURE__*/React.createElement(GearCard, {
    key: g.title,
    g: g
  })))), /*#__PURE__*/React.createElement(TabBar, {
    active: "profile",
    onChange: onTab
  }));
}
window.ProfileScreen = ProfileScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ProfileScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SpotScreen.jsx
try { (() => {
/* Spot detail — photo header, real-time status, disciplines, capacity,
   sessions sign-up, external payment link, follow. */

function SpotScreen({
  onTab
}) {
  const {
    StatusPill,
    Button,
    IconButton,
    ProgressBar,
    DisciplineChip,
    Avatar,
    Liseret
  } = window.DS;
  const [following, setFollowing] = React.useState(false);
  useLucide();
  const s = SPOTS[0]; // Moto Club de Bordeaux

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 290,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    category: s.cat,
    icon: s.icon,
    src: A + "photos/hero-mx.png",
    height: "100%",
    dim: 0.05
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      top: 50,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "float",
    label: "Retour",
    onClick: () => onTab("map")
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "arrow-left"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      top: 50,
      zIndex: 5,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "float",
    label: "Partager"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "share-2"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 16,
      left: "50%",
      transform: "translateX(-50%)",
      display: "none",
      gap: 6
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: i === 0 ? 18 : 6,
      height: 6,
      borderRadius: 999,
      background: i === 0 ? "var(--text)" : "rgba(255,255,255,.4)"
    }
  })))), /*#__PURE__*/React.createElement(Liseret, {
    src: A + "monogram-m-sticker.png",
    markSize: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 18px 160px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    tone: s.tone,
    label: s.status,
    pulse: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "300 27px/1.08 var(--font-display)",
      letterSpacing: "-0.015em"
    }
  }, "Moto Club ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 900
    }
  }, "de Bordeaux")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 8,
      color: "var(--text-muted)",
      font: "var(--fw-medium) 13px var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "map-pin",
    style: {
      width: 15,
      height: 15
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, s.dist)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "users",
    style: {
      width: 15,
      height: 15
    }
  }), "248 followers"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DisciplineChip, {
    label: "MX",
    category: "moto",
    selected: true
  }), /*#__PURE__*/React.createElement(DisciplineChip, {
    label: "Supermoto",
    category: "moto"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      border: "1px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Session du jour",
    value: s.count,
    max: s.max
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true
  }, "S'inscrire \xE0 la session")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      font: "var(--fw-medium) 12px var(--font-sans)",
      color: "var(--text-muted)",
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "credit-card",
    style: {
      width: 14,
      height: 14
    }
  }), "Paiement via HelloAsso \xB7 15 \u20AC non-adh\xE9rent")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, {
    style: {
      marginBottom: 8
    }
  }, "\xC0 propos"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--fw-regular) 15px/1.5 var(--font-sans)",
      color: "var(--text-secondary)"
    }
  }, "Terrain MX entretenu, arros\xE9 chaque matin de roulage. Piste principale + zone d\xE9butants. Ouvert aux non-adh\xE9rents le week-end. Casque et protection dorsale obligatoires.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, {
    style: {
      marginBottom: 10
    }
  }, "Riders inscrits \xB7 18"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, ["Léa Marchand", "Tom B", "Hugo D", "Sami K", "Noa R"].map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      marginLeft: i ? -10 : 0,
      border: "2px solid var(--bg)",
      borderRadius: "50%"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: "md"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10,
      font: "var(--fw-bold) 13px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "+13")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 84,
      padding: "10px 16px",
      display: "flex",
      gap: 10,
      background: "linear-gradient(to top, var(--bg) 60%, transparent)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: following ? "secondary" : "secondary",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Ic, {
      n: following ? "heart" : "heart"
    }),
    onClick: () => setFollowing(!following)
  }, following ? "Suivi" : "Suivre ce spot"), /*#__PURE__*/React.createElement(IconButton, {
    variant: "surface",
    size: "lg",
    label: "Itin\xE9raire"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "navigation"
  }))), /*#__PURE__*/React.createElement(TabBar, {
    active: "saved",
    onChange: onTab
  }));
}
window.SpotScreen = SpotScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SpotScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/WelcomeScreen.jsx
try { (() => {
/* Welcome / auth — heritage "Welcome to Meetnshred" + gestures, refreshed as a
   native onboarding: Apple / Google / email (spec auth-registration). */

function WelcomeScreen({
  onDone
}) {
  const {
    Button,
    Input
  } = window.DS;
  const [mode, setMode] = React.useState("intro"); // intro | email
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: mode === "intro" ? 430 : 230,
      flex: "none",
      transition: "height var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    category: "moto",
    src: A + "photos/mtb-rider.png",
    pos: "12% center",
    dim: 0.15
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 34,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "300 15px var(--font-sans)",
      color: "var(--white)"
    }
  }, "Bienvenue sur"), /*#__PURE__*/React.createElement("img", {
    src: A + "logo-script-red.png",
    alt: "Meetnshred",
    style: {
      width: mode === "intro" ? 280 : 200
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      background: "var(--accent)",
      flex: "none"
    }
  }), mode === "intro" ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "26px 20px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 18
    }
  }, ["shaka", "peace", "fist"].map(g => /*#__PURE__*/React.createElement("div", {
    key: g,
    style: {
      width: 62,
      height: 62,
      borderRadius: "50%",
      background: "var(--white)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "gesture-" + g + "-line.png",
    alt: "",
    style: {
      width: 46
    }
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: "center",
      font: "300 22px/1.2 var(--font-sans)",
      color: "var(--text)"
    }
  }, "Trouve les spots ouverts ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 900
    }
  }, "et roule avec ta crew")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Ic, {
      n: "apple"
    }),
    onClick: onDone
  }, "Continuer avec Apple"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Ic, {
      n: "chrome"
    }),
    onClick: onDone
  }, "Continuer avec Google"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(Ic, {
      n: "mail"
    }),
    onClick: () => setMode("email")
  }, "Avec mon email"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "24px 20px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "300 26px/1.1 var(--font-sans)"
    }
  }, "Cr\xE9e ton ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 900
    }
  }, "compte rider")), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "toi@email.com",
    icon: /*#__PURE__*/React.createElement(Ic, {
      n: "mail"
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Mot de passe",
    type: "password",
    placeholder: "8 caract\xE8res minimum",
    icon: /*#__PURE__*/React.createElement(Ic, {
      n: "lock"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    onClick: onDone
  }, "C'est parti"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    block: true,
    onClick: () => setMode("intro")
  }, "Retour"))));
}
window.WelcomeScreen = WelcomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/WelcomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app.jsx
try { (() => {
/* Meetnshred app — interactive shell. Welcome → tabs. */

function App() {
  const [tab, setTab] = React.useState("welcome");
  const go = t => setTab(t === "create" ? "events" : t);
  return /*#__PURE__*/React.createElement(PhoneFrame, null, tab === "welcome" && /*#__PURE__*/React.createElement(WelcomeScreen, {
    onDone: () => setTab("map")
  }), tab === "map" && /*#__PURE__*/React.createElement(MapScreen, {
    onTab: go
  }), tab === "events" && /*#__PURE__*/React.createElement(EventsScreen, {
    onTab: go
  }), (tab === "spot" || tab === "saved") && /*#__PURE__*/React.createElement(SpotScreen, {
    onTab: go
  }), tab === "profile" && /*#__PURE__*/React.createElement(ProfileScreen, {
    onTab: go
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/chrome.jsx
try { (() => {
/* Meet & Shred — UI kit shared chrome, mock data and helpers.
   Exposes everything on window for sibling babel scripts. */

const DS = window.MeetShredDesignSystem_e904a6;

/* Pure-React icon: a mask-image of the Lucide static SVG, tinted via background.
   No DOM mutation, so it survives React unmounts (screen switches, swipe cards). */
const LU = "https://unpkg.com/lucide-static@latest/icons/";
function Ic({
  n,
  style = {}
}) {
  const {
    color,
    width,
    height,
    ...rest
  } = style;
  const sz = width || height || 20;
  const url = `url("${LU}${n}.svg")`;
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      flex: "none",
      width: width || sz,
      height: height || sz,
      background: color || "currentColor",
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...rest
    }
  });
}

/* Kept for call-site compatibility; icons no longer need a post-render pass. */
function useLucide() {}

/* ---------- Photo placeholder ----------
   No real photos in the source repo — moody dark gradient + discipline glyph,
   treated to match the "dusk session, dust & spray" imagery direction. */
const PHOTO_GRADS = {
  moto: "linear-gradient(150deg,#241a14,#3a2a1d 55%,#0f1314)",
  velo: "linear-gradient(150deg,#16201a,#26331f 55%,#0f1314)",
  eau: "linear-gradient(150deg,#0e2230,#143a4a 55%,#0b1518)",
  snow: "linear-gradient(150deg,#1a2231,#2b3a52 55%,#0f1314)",
  urban: "linear-gradient(150deg,#241a2b,#3a2545 55%,#0f1314)",
  default: "linear-gradient(150deg,#1a2023,#28343a 55%,#0f1314)"
};
const A = "../../assets/";
function Photo({
  category = "default",
  icon,
  src,
  pos = "center",
  height = "100%",
  children,
  dim = 0.34,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height,
      overflow: "hidden",
      background: PHOTO_GRADS[category] || PHOTO_GRADS.default,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.5,
      backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
      backgroundSize: "4px 4px"
    }
  }), src && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: pos
    }
  }), icon && !src && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,.10)"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: icon,
    style: {
      width: 96,
      height: 96
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `linear-gradient(to top, rgba(9,11,12,${dim + 0.5}), transparent 60%)`
    }
  }), children);
}

/* ---------- Phone frame ---------- */
function PhoneFrame({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--carbon-950)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 390,
      height: 844,
      borderRadius: 46,
      background: "#000",
      padding: 10,
      boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 2px #1c2225",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: 38,
      overflow: "hidden",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: 124,
      height: 30,
      background: "#000",
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      zIndex: 60
    }
  }), children)));
}

/* ---------- Status bar ---------- */
function StatusBar({
  light = true
}) {
  const c = light ? "var(--text)" : "var(--text)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      flex: "none",
      color: c,
      font: "var(--fw-bold) 14px var(--font-mono)",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "signal",
    style: {
      width: 16,
      height: 16
    }
  }), /*#__PURE__*/React.createElement(Ic, {
    n: "wifi",
    style: {
      width: 16,
      height: 16
    }
  }), /*#__PURE__*/React.createElement(Ic, {
    n: "battery-full",
    style: {
      width: 20,
      height: 20
    }
  })));
}

/* ---------- Bottom tab bar ---------- */
const TABS = [{
  id: "map",
  icon: "map",
  label: "Carte"
}, {
  id: "events",
  icon: "layers",
  label: "Events"
}, {
  id: "create",
  icon: "plus",
  label: ""
}, {
  id: "saved",
  icon: "bookmark",
  label: "Spots"
}, {
  id: "profile",
  icon: "user",
  label: "Profil"
}];
function TabBar({
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 84,
      zIndex: 50,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-around",
      paddingTop: 10,
      background: "rgba(15,19,20,.86)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, TABS.map(t => {
    if (t.id === "create") {
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        onClick: () => onChange("create"),
        "aria-label": "Cr\xE9er",
        style: {
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          marginTop: -6,
          background: "var(--accent)",
          color: "var(--on-accent)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--glow-live)"
        }
      }, /*#__PURE__*/React.createElement(Ic, {
        n: "plus",
        style: {
          width: 26,
          height: 26
        }
      }));
    }
    const on = active === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange(t.id),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: 56,
        color: on ? "var(--accent)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Ic, {
      n: t.icon,
      style: {
        width: 23,
        height: 23
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--fw-semibold) 10px var(--font-sans)"
      }
    }, t.label));
  }));
}

/* ---------- Section overline ---------- */
function Overline({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--fw-bold) 11px var(--font-display)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      ...style
    }
  }, children);
}

/* ---------- Mock data ---------- */
const SPOTS = [{
  id: 1,
  name: "Moto Club de Bordeaux",
  cat: "moto",
  disc: "MX",
  icon: "bike",
  tone: "open",
  src: A + "photos/hero-mx.png",
  status: "Ouvert",
  dist: "12 km",
  count: 18,
  max: 30,
  x: "26%",
  y: "38%"
}, {
  id: 2,
  name: "Bike Park Hourtin",
  cat: "velo",
  disc: "DH",
  icon: "mountain",
  tone: "warn",
  src: A + "photos/bike-park-dh.png",
  status: "Dégradé",
  dist: "34 km",
  count: 9,
  max: 40,
  x: "62%",
  y: "30%"
}, {
  id: 3,
  name: "Spot Kite Lac de Carcans",
  cat: "eau",
  disc: "Kite",
  icon: "wind",
  tone: "info",
  status: "Refait",
  dist: "41 km",
  count: 6,
  max: 20,
  x: "44%",
  y: "58%"
}, {
  id: 4,
  name: "Cable Park Lacanau",
  cat: "eau",
  disc: "Wake",
  icon: "waves",
  tone: "open",
  src: A + "photos/wake-sunset.png",
  status: "Ouvert",
  dist: "47 km",
  count: 11,
  max: 16,
  x: "72%",
  y: "64%"
}, {
  id: 5,
  name: "Skatepark des Chartrons",
  cat: "urban",
  disc: "Skate",
  icon: "circle-dot",
  tone: "closed",
  status: "Fermé",
  dist: "8 km",
  count: 0,
  max: 50,
  src: A + "photos/skatepark-venice.png",
  x: "34%",
  y: "74%"
}];
const EVENTS = [{
  id: 11,
  title: "Social ride matinal",
  cat: "velo",
  disc: "Enduro VTT",
  icon: "mountain",
  type: "Social ride",
  date: "Sam. 21 juin · 09:00",
  phase: "mine",
  src: A + "photos/mtb-rider.png",
  pos: "12% center",
  place: "Bike Park Hourtin",
  dist: "34 km",
  org: "Léa M.",
  count: null,
  max: null,
  x: "58%",
  y: "44%"
}, {
  id: 12,
  title: "Roulage piste — niveau confirmé",
  cat: "moto",
  disc: "Moto piste",
  icon: "bike",
  type: "Track day",
  date: "Dim. 22 juin · 10:00",
  phase: "live",
  src: A + "photos/hero-mx.png",
  place: "Circuit de Mérignac",
  dist: "15 km",
  org: "ASM Racing",
  count: 24,
  max: 30,
  x: "30%",
  y: "52%"
}, {
  id: 13,
  title: "Session kite coucher de soleil",
  cat: "eau",
  disc: "Kite",
  icon: "wind",
  type: "Social ride",
  date: "Ven. 20 juin · 19:30",
  phase: "next",
  src: A + "photos/wake-sunset.png",
  place: "Lac de Carcans",
  dist: "41 km",
  org: "Hugo D.",
  count: 7,
  max: 12,
  x: "48%",
  y: "60%"
}];
const EVENTS_EXTRA = [{
  id: 14,
  title: "Freeride Vallée Blanche",
  cat: "snow",
  disc: "Freeride",
  icon: "snowflake",
  src: A + "photos/ski-freeride.png",
  type: "Social ride",
  date: "Sam. 14 fév. · 08:30",
  place: "Chamonix",
  dist: "—",
  org: "Noa R.",
  count: 6,
  max: 6,
  phase: "past"
}, {
  id: 15,
  title: "Session street Chartrons",
  cat: "urban",
  disc: "Skate",
  icon: "circle-dot",
  src: A + "photos/skatepark-venice.png",
  type: "Social ride",
  date: "Aujourd'hui · 18:00",
  place: "Skatepark des Chartrons",
  dist: "8 km",
  org: "Sami K.",
  count: 9,
  max: null,
  phase: "live"
}];
const RIDER = {
  name: "Léa Marchand",
  handle: "@lea.shreds",
  level: "Confirmé",
  loc: "Bordeaux, FR",
  bio: "MX le week-end, enduro VTT le reste du temps. Toujours partante pour un social ride dans le Médoc.",
  disciplines: [{
    label: "MX",
    cat: "moto"
  }, {
    label: "Enduro VTT",
    cat: "velo"
  }, {
    label: "DirtJump",
    cat: "velo"
  }],
  gear: [{
    title: "Ma YZ de piste",
    cat: "moto",
    icon: "bike",
    kind: "Machine",
    src: A + "photos/hero-mx.png",
    fields: [["Marque", "Yamaha"], ["Modèle", "YZ 250F"], ["Année", "2023"], ["Cylindrée", "250 cc"]]
  }, {
    title: "Le vélo du Médoc",
    cat: "velo",
    icon: "mountain",
    kind: "Vélo",
    src: A + "photos/mtb-rider.png",
    fields: [["Marque", "Santa Cruz"], ["Modèle", "Bronson"], ["Taille", "M"]]
  }]
};
Object.assign(window, {
  DS,
  A,
  Ic,
  useLucide,
  Photo,
  EVENTS_EXTRA,
  PhoneFrame,
  StatusBar,
  TabBar,
  Overline,
  SPOTS,
  EVENTS,
  RIDER
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/chrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Headline = __ds_scope.Headline;

__ds_ns.Liseret = __ds_scope.Liseret;

__ds_ns.PhaseHeader = __ds_scope.PhaseHeader;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BottomSheet = __ds_scope.BottomSheet;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardMedia = __ds_scope.CardMedia;

__ds_ns.DisciplineChip = __ds_scope.DisciplineChip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Marker = __ds_scope.Marker;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Toggle = __ds_scope.Toggle;

})();
