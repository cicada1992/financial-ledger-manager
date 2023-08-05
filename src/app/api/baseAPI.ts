namespace BaseAPI {
  export function getList(list: Array<string>) {
    localStorage.get('list');
  }

  export function setList(list: Array<string>) {
    localStorage.set('list', list);
  }
}

export default BaseAPI;
