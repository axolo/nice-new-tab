const CONFIG_KEY = 'nice-new-tab'

export default {
  get() {
    const config = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}')
    return config
  },
  set(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
    return config
  }
}
