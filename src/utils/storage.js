export default {
  async get(key) {
    if (chrome?.storage?.sync) {
      const settings = await chrome.storage.sync.get([key])
      return settings[key]
    }
    return JSON.parse(localStorage.getItem(key))
  },
  async set(key, value) {
    if (chrome?.storage?.sync) {
      await chrome.storage.sync.set({ [key]: value })
      return value
    }
    localStorage.setItem(key, JSON.stringify(value))
    return value
  }
}
