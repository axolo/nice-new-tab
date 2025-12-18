const CONFIG_KEY = 'nice-new-tab'

export function get() {
    const defaultConfig = {
      search: 'https://cn.bing.com/search?q=',
      links: []
    }
    const config = JSON.parse(localStorage.getItem(CONFIG_KEY))
    return { ...defaultConfig, ...config }
  }
export function set(config) {
  let old = get()
  config = { ...old, ...config }
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
  return config
}

export default {
  get,
  set
}
