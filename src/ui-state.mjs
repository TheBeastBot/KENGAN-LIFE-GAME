export function createDropdownStateController({ storage, storageKey, defaults = {} }) {
  let saved = {};
  try {
    saved = JSON.parse(storage?.getItem(storageKey) ?? '{}') ?? {};
  } catch {
    saved = {};
  }

  function persist() {
    storage?.setItem(storageKey, JSON.stringify(saved));
  }

  return {
    isOpen(id) {
      if (Object.prototype.hasOwnProperty.call(saved, id)) return Boolean(saved[id]);
      return Boolean(defaults[id]);
    },
    toggle(id) {
      saved[id] = !this.isOpen(id);
      persist();
      return saved[id];
    },
  };
}

export function captureElementScroll(element) {
  const key = element?.dataset?.scrollKey;
  if (!key) return null;
  return {
    key,
    scrollTop: Math.max(0, Number(element.scrollTop) || 0),
  };
}

export function restoreElementScroll(root, snapshot) {
  if (!snapshot?.key || !root?.querySelector) return false;
  const element = root.querySelector(`[data-scroll-key="${snapshot.key}"]`);
  if (!element) return false;
  element.scrollTop = snapshot.scrollTop;
  return true;
}
