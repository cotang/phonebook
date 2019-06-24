export default class FakeService {
  _apiBase = 'http://localhost:3004/phones';

  getPhonebook = async() => {
    const res = await fetch(`${this._apiBase}`);
    if (!res.ok) {
      throw new Error('Can not get phonebook');
    }
    return await res.json();
  }

  createPerson = async(item) => {
    const res = await fetch(`${this._apiBase}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!res.ok) {
      throw new Error('Can not create person');
    }
    return await res.json();
  }

  deletePerson = async(id) => {
    const res = await fetch(`${this._apiBase}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      throw new Error('Can not delete person');
    }
    return await res.json();
  }

  updatePerson = async(item) => {
    const id = item.id;
    const res = await fetch(`${this._apiBase}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!res.ok) {
      throw new Error('Can not update person');
    }
    return await res.json();
  }
}
