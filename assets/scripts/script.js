$(function () {
  const mainContainer = document.querySelector('#main-container');
  const currentDay = document.querySelector('#currentDay');
  const clearButton = document.querySelector('.clearButton');

  function createHourBlock() {
    const hourBlockDiv = document.createElement('div');
    hourBlockDiv.classList.add('row', 'time-block');
    const hourDiv = document.createElement('div');
    hourDiv.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
    const textArea = document.createElement('textarea');
    textArea.classList.add('col-8', 'col-md-10', 'description');
    textArea.setAttribute('row', '3');
    const saveButton = document.createElement('button');
    saveButton.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
    saveButton.setAttribute('aria-label', 'save');
    const saveIcon = document.createElement('i');
    saveIcon.classList.add('fas', 'fa-save');
    saveIcon.setAttribute('aria-hidden', 'true');
    
    saveButton.appendChild(saveIcon);
    hourBlockDiv.appendChild(hourDiv);
    hourBlockDiv.appendChild(textArea);
    hourBlockDiv.appendChild(saveButton);

    return(hourBlockDiv);
  }

  function addHourBlockHTML() {
    let hourBlock;
    for (let i = 0; i < 24; i++) {
      hourBlock = createHourBlock();
      hourBlock.setAttribute('id', `hour-${i}`);
      const hourSlot = hourBlock.querySelector('div');
      hourSlot.textContent = dayjs().hour(i).format('hA');

      const inputArea = hourBlock.querySelector('textarea');
      if (i === dayjs().hour()) {
        inputArea.classList.add('present');
      } else if (i < dayjs().hour()) {
        inputArea.classList.add('past');
      } else {
        inputArea.classList.add('future');
      }

      mainContainer.appendChild(hourBlock);
    };
  }

  function handleClickSave() {
    const hourBlock = this.parentElement;
    const eventItem = hourBlock.querySelector('textarea').value;
    
    localStorage.setItem(hourBlock.id, eventItem);
  }
  
  function init() {
    const hourBlock = document.querySelectorAll('.time-block');

    hourBlock.forEach(function(hourBlock) {
      hourBlock.querySelector('textarea').value = localStorage.getItem(hourBlock.id);
      
    })
  }

  function clearEventItems() {
    const eventItems = mainContainer.querySelectorAll('textarea');
    eventItems.forEach(function(eventItem) {
      eventItem.value = '';
    })
    localStorage.clear();
  }

  currentDay.textContent = dayjs().format('dddd, MMMM D');

  addHourBlockHTML();
  
  init();

  const saveButtons = document.querySelectorAll('button.saveBtn');

  saveButtons.forEach(function(saveButton) {
    saveButton.addEventListener('click', handleClickSave,);
  });

  clearButton.addEventListener('click', clearEventItems);
});
