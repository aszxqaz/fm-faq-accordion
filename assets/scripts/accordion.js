const C_PARENT = "accordion";
const C_ITEM = "accordion-item";
const C_CONTENT = "accordion-content";
const C_TRIGGER = "accordion-trigger";
const C_ACTIVE = "active";

const cl = (className) => `.${className}`;

const S_PARENT = cl(C_PARENT);
const S_ITEM = cl(C_ITEM);
const S_ACTIVE = cl(C_ACTIVE);
const S_ACTIVE_ITEM = `${S_ITEM}${S_ACTIVE}`;
const S_ITEM_CONTENT = cl(C_CONTENT);
const S_TRIGGER = cl(C_TRIGGER);

const accordion = document.querySelector(S_PARENT);
const isSingleMode = () => accordion.getAttribute("data-single-mode") == "true";

window.addEventListener("DOMContentLoaded", () => {
  init();
  accordion.addEventListener("click", accordionEventListener);
});

// fns

function init() {
  accordion.querySelectorAll(S_ACTIVE_ITEM).forEach((activeItem) => {
    const content = activeItem.querySelector(S_ITEM_CONTENT);
    const transition = content.style.transition;
    content.style.transition = "none";
    content.style.maxHeight = content.scrollHeight + "px";
    content.scrollHeight; // reflow
    content.style.transition = transition;
  });
}

function toggleItem(item) {
  const isNowActive = item.classList.toggle(C_ACTIVE);
  item.querySelector(S_TRIGGER).setAttribute("aria-expanded", isNowActive);
  const content = item.querySelector(S_ITEM_CONTENT);
  content.setAttribute("aria-hidden", !isNowActive);
  content.style.maxHeight = isNowActive ? content.scrollHeight + "px" : null;
}

function accordionEventListener(e) {
  const trigger = e.target.closest(S_TRIGGER);
  if (!trigger) return;
  const parentItem = trigger.closest(S_ITEM);
  if (isSingleMode()) {
    const activeItem = accordion.querySelector(S_ACTIVE_ITEM);
    if (activeItem) {
      toggleItem(activeItem);
      if (activeItem == parentItem) return;
    }
  }
  toggleItem(parentItem);
}
