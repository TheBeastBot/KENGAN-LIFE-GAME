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
