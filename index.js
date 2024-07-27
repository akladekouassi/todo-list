const main = () => {
  //add an eventListener to the from
  const form = document.querySelector('#itemForm'); // select form
  const itemInput = document.querySelector('#itemInput'); // select input box from form
  const itemList = document.querySelector('.item-list');
  const feedback = document.querySelector('.feedback');
  const addBtn = document.querySelector('#add-item');
  const clearButton = document.querySelector('#clear-list');

  let todoItems = [];

  // TODO: Handle item
  const handleItem = itemName => {
    const items = itemList.querySelectorAll('.item');

    items.forEach(item => {
      // ! To avoid the error of the item name being undefined
      if (
        item.querySelector('.item-name').textContent.trim().toLowerCase() ===
        itemName.trim().toLowerCase()
      ) {
        //TODO: Complete event listener
        handleCompleteItem(item);
        //TODO: Edit event listener
        handleEditItem(item, itemName);
        //TODO: Delete event listener
        handleDeleteItem(item);
      }
    });
  };

  const handleCompleteItem = item => {
    item.querySelector('.complete-item').addEventListener('click', function () {
      let itemText = item.querySelector('.item-name');
      let itemIndex = item.querySelector('.item-index');
      itemText.classList.toggle('completed');
      itemIndex.classList.toggle('completed');
      // CSS
      // Bootstrap classes
      itemText.classList.toggle('text-decoration-line-through');
      itemText.classList.toggle('text-secondary');
      itemIndex.classList.toggle('border-success-subtle');
      itemIndex.classList.toggle('text-secondary');

      if (itemText.classList.contains('completed')) {
        sendFeedback(`Item Completed`, 'green');
      }
    });
  };

  const handleEditItem = (item, itemName) => {
    item.querySelector('.edit-item').addEventListener('click', function () {
      addBtn.innerHTML = 'Edit Item';
      itemInput.value = itemName;
      itemList.removeChild(item);

      todoItems = todoItems.filter(item => {
        return item !== itemName;
      });
      setLocalStorage(todoItems);
    });
  };

  const handleDeleteItem = item => {
    item.querySelector('.delete-item').addEventListener('click', function () {
      if (confirm('Are you sure you want to delete this item?')) {
        itemList.removeChild(item);

        todoItems = todoItems.filter(function (item) {
          return item !== itemName;
        });
        setLocalStorage(todoItems);
        sendFeedback('Item deleted', 'danger');
      } else {
        return;
      }
    });
  };

  //TODO: Get List
  const getList = function (todoItems) {
    itemList.innerHTML = '';

    todoItems.forEach(function (item, index) {
      const html = `<div class="item my-3 d-flex justify-content-between align-items-center border-bottom border-primary-subtle">
          <div class="d-flex gap-1">
            <h6 class="item-index border border-primary-subtle  rounded p-1">${
              index + 1
            }</h6>
            <p class="item-name text-capitalize">${item}</p>
          </div>
          <div class="item-icons" >
            <i class="far fa-check-circle complete-item mx-2 item-icon text-primary"></i>
            <i class="far fa-edit edit-item mx-2 item-icon text-secondary"></i>
            <i class="far fa-times-circle delete-item item-icon text-danger"></i>
          </div>
      </div>`;

      itemList.insertAdjacentHTML('beforebegin', html);

      handleItem(item);
    });
  };

  //TODO: Get Local Storage
  const getLocalStorage = () => {
    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null) {
      todoItems = [];
    } else {
      todoItems = JSON.parse(todoStorage);
      getList(todoItems);
    }
  };

  //TODO: Set Local Storage
  const setLocalStorage = function (todoItems) {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  };

  // get local storage from page
  getLocalStorage();

  //TODO: add an item to the List, including to local storage
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const itemName = itemInput.value;

    if (itemName.length === 0) {
      sendFeedback('Please Enter Valid Value', 'danger');
    } else {
      addBtn.innerHTML = 'Add Item';
      todoItems.push(itemName);
      setLocalStorage(todoItems);
      getList(todoItems);
      sendFeedback('Item added to the list', 'success');
    }

    itemInput.value = '';
  });

  //TODO: clear all items from the list
  clearButton.addEventListener('click', function () {
    if (todoItems.length) {
      confirm('Are you sure you want to clear the list?')
        ? ((todoItems.length = 0), localStorage.clear(), getList(todoItems))
        : null;
    }
    return;
  });

  // TODO: Send feedback
  function sendFeedback(text, className) {
    feedback.classList.add('showItem', `alert-${className}`);
    feedback.innerHTML = text;
    setTimeout(function () {
      feedback.classList.remove('showItem', `alert-${className}`);
      feedback.innerHTML = 'Write value for item';
    }, 3000);
  }
};

main();
