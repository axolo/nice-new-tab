export default (key, value) => chrome?.i18n?.getMessage(key) || value || key
