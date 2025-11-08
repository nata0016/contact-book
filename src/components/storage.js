const STORAGE_KEY = 'contact-book:data:v1'

const seed = [
    { id: crypto.randomUUID(), firstName: 'Amira', lastName: 'Benali', email: 'amira.benali@example.com', phone: '613-555-1010', address: 'Ottawa, ON', notes: 'Prefers email contact.' },
    { id: crypto.randomUUID(), firstName: 'Karim', lastName: 'Zeroual', email: 'karim.z@example.com', phone: '343-555-2020', address: 'Gatineau, QC', notes: 'Frequent client.' },
    { id: crypto.randomUUID(), firstName: 'Yassine', lastName: 'Ait Oulhakem', email: 'yassine.ait@example.com', phone: '613-555-3030', address: '75 Laurier Ave E, Ottawa, ON', notes: 'University of Ottawa contact.' },
    { id: crypto.randomUUID(), firstName: 'Leila', lastName: 'Saadi', email: 'leila.saadi@example.com', phone: '514-555-4040', address: 'Montreal, QC', notes: 'Interested in photography services.' },
    { id: crypto.randomUUID(), firstName: 'Omar', lastName: 'Haddad', email: 'omar.haddad@example.com', phone: '416-555-5050', address: 'Toronto, ON', notes: 'Prefers text messages.' },
    { id: crypto.randomUUID(), firstName: 'Sofia', lastName: 'Lamrani', email: 'sofia.lamrani@example.com', phone: '519-555-6060', address: 'London, ON', notes: 'Project manager, bilingual.' },
    { id: crypto.randomUUID(), firstName: 'Adam', lastName: 'Boucher', email: 'adam.boucher@example.com', phone: '438-555-7070', address: 'Montreal, QC', notes: 'Met at networking event.' },
    { id: crypto.randomUUID(), firstName: 'Nora', lastName: 'Ghali', email: 'nora.ghali@example.com', phone: '581-555-8080', address: 'Quebec City, QC', notes: 'Prefers calls in the afternoon.' },
    { id: crypto.randomUUID(), firstName: 'Hakim', lastName: 'El Fassi', email: 'hakim.elfassi@example.com', phone: '905-555-9090', address: 'Mississauga, ON', notes: 'Potential business partner.' },
    { id: crypto.randomUUID(), firstName: 'Amina', lastName: 'Rahmani', email: 'amina.rahmani@example.com', phone: '438-555-1111', address: 'Montreal, QC', notes: 'Interested in workshops.' },
    { id: crypto.randomUUID(), firstName: 'Ziad', lastName: 'Khalil', email: 'ziad.khalil@example.com', phone: '905-555-2222', address: 'Brampton, ON', notes: 'Follows up monthly.' },
    { id: crypto.randomUUID(), firstName: 'Rania', lastName: 'Boumediene', email: 'rania.boumediene@example.com', phone: '613-555-3333', address: 'Ottawa, ON', notes: 'University colleague.' }
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
