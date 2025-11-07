const STORAGE_KEY = 'contact-book:data:v1'

const seed = [
  { id: crypto.randomUUID(), firstName: 'Amira', lastName: 'Benali', email: 'amira@example.com', phone: '613-555-1010', address: 'Ottawa', notes: '' },
  { id: crypto.randomUUID(), firstName: 'Karim', lastName: 'Zeroual', email: 'karim@example.com', phone: '343-555-2020', address: 'Gatineau', notes: '' },
]
export function getAll() {
  const raw = localStorage.getItem(STORAGE_KEY)
  let data = []
  try {
    data = raw ? JSON.parse(raw) : []
  } catch {
    data = []
  }
  if (!data.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return [...seed]
  }
  return data
}

export function saveAll(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

export function findById(id) {
  return getAll().find(c => c.id === id)
}

export function create(payload) {
  const contacts = getAll()
  const newContact = { id: crypto.randomUUID(), ...payload }
  contacts.push(newContact)
  saveAll(contacts)
  return newContact
}

export function update(id, payload) {
  const contacts = getAll()
  const index = contacts.findIndex(c => c.id === id)
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...payload, id }
    saveAll(contacts)
    return contacts[index]
  }
  return null
}

export function remove(id) {
  const next = getAll().filter(c => c.id !== id)
  saveAll(next)
}

export function sortByLastName(list) {
  return [...list].sort((a, b) => a.lastName.localeCompare(b.lastName))
}
