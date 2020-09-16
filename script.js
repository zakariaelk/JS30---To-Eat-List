
  const addItems = document.querySelector('.add-items');
  let itemsList = document.querySelector('.plates');

  // Getting items from localstorage and if not available it will fallback into an empty array
  let items = JSON.parse(localStorage.getItem('items')) || [];



  function populateList(dishes, dishesList) {
    dishesList.innerHTML = dishes.map((item, i) => {
      return `<li>       
      <input type="checkbox" data-index=${i} id="item-${i}" ${ (item.done) ? 'checked' : "" }/>
      <label for="item-${i}">${ item.text } </label>
      </li>`
    }).join("");
  }


  function addValue(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;

    const item = {
      text,
      done: false
    }

    items.push(item);

    populateList(items, itemsList);

    localStorage.setItem('items', JSON.stringify(items));

    this.reset();

  }
  
  function toggleDone(e) {
    if(!e.target.matches('input')) return;
    console.log(e);

    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;

    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }


  addItems.addEventListener('submit', addValue);
  itemsList.addEventListener('click', toggleDone);

  populateList(items, itemsList);

