class Storage {
  constructor(options = {}) {
    this.prefix = options.prefix || 'nice-new-tab-'
    this.local = options.local || !chrome?.storage?.sync
  }

  async get(key) {
    key = this.prefix + key
    if (this.local) {
      return JSON.parse(localStorage.getItem(key))
    }
    const settings = await chrome.storage.sync.get([key])
    return settings[key]
  }

  async set(key, value) {
    key = this.prefix + key
    if (this.local) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      await chrome.storage.sync.set({ [key]: value })
    }
    return value
  }

  remove(key) {
    key = this.prefix + key
    return this.local
      ? chrome.storage.sync.remove(key)
      : localStorage.removeItem(key)
  }

  clear() {
    return this.local
      ? localStorage.clear()
      : chrome.storage.sync.clear()
  }

  getKeys() {
    if (this.local) {
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i))
      }
      return keys
    }
    return chrome.storage.sync.getKeys()
  }
}

export default Storage
