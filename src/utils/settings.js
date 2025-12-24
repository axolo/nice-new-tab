import storage from './storage'

class Settings {
  constructor(config) {
    this.config = {
      key: 'nice-new-tab',
      ...config
    }
  }

  async get() {
    const settings = {
      search: 'https://cn.bing.com/search?q=',
      links: []
    }

    const value = await storage.get(this.config.key)

    return {
      ...settings,
      ...value
    }
  }

  async set(value) {
    let settings = await this.get()

    value = {
      ...settings,
      ...value,
      updatedAt: Date.now()
    }

    await storage.set(this.config.key, value)

    return value
  }
}

export default Settings
