enum LocalStorageUserPreferencesKey {
  Theme = 'theme',
}

const set = (key: LocalStorageUserPreferencesKey, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getString = (key: LocalStorageUserPreferencesKey): string | null => localStorage.getItem(key)
const getNumber = (key: LocalStorageUserPreferencesKey): number | null => {
  const item = localStorage.getItem(key)

  return item ? Number.parseInt(item) : null
}
const get = <T>(key: LocalStorageUserPreferencesKey): T | null => {
  const item = localStorage.getItem(key)

  return item ? JSON.parse(item) : null
}

const remove = (key: string) => {
  localStorage.removeItem(key)
}

export default {
  set,
  get,
  getString,
  getNumber,
  remove,
  LocalStorageUserPreferencesKey,
}
