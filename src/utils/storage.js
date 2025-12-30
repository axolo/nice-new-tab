/**
 * **存储类**
 *
 * 1. 支持 localStorage 和 chrome.storage.sync 两种存储方式，根据环境自动选择
 * 2. chrome.storage.sync 修改数据时，会 array 转换为 object，因此一律存储为 json 字符串
 */
class Storage {
  constructor(options = {}) {
    this.local = options.local || !chrome?.storage?.sync
  }

  async get(key) {
    if (this.local) {
      const value = localStorage.getItem(key)
      return value && JSON.parse(value)
    }
    const item = await chrome.storage.sync.get([key])
    const value = item[key]
    return value && JSON.parse(value)
  }

  async set(key, value) {
    const json = JSON.stringify(value)
    if (this.local) {
      localStorage.setItem(key, json)
    } else {
      await chrome.storage.sync.set({ [key]: json })
    }
    return value
  }

  remove(key) {
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
