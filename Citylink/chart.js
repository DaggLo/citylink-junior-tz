const render = (state, formEl, inputEl, tableEl) => {
  const tableContent = state
    .map((e) => {
      const { id, name, score } = e;
      return `
        <tr>
          <th scope="row">${id}</th>
          <td>${name}</td>
          <td>${score}</td>
        </tr>`;
    })
    .join('');

  const table = `
    <table class="table">
      <thead>
        <tr data-table-part="header">
          <th scope="col" class="header_cell">ID</th>
          <th scope="col" class="header_cell">Имя</th>
          <th scope="col" class="header_cell">Очки</th>
        </tr>
      </thead>
      <tbody>${tableContent}</tbody>
    </table>`;

  formEl.reset();
  inputEl.focus();
  tableEl.innerHTML = table.trim(); // eslint-disable-line

  const onRenderEvent = new CustomEvent('onRender');
  formEl.dispatchEvent(onRenderEvent);
};

(() => {
  const state = [];

  const formEl = document.querySelector('form');
  const inputEl = document.querySelector('input');
  const tableEl = document.querySelector('#competitorsTable');

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const competitors = data.get('competitors');

    try {
      if (!competitors) {
        throw new Error('Нужно ввести имена участников через запятую" (доступны только кириллические буквы и запятая).');
      }

      competitors
        .split(',')
        .forEach((item) => {
          state.push({
            id: state.length + 1,
            name: item.trim(),
            score: Math.floor(Math.random() * 1000),
          });
        });

      render(state, formEl, inputEl, tableEl);
    } catch (error) {
      const { message } = error;
      const emptyInputEvent = new CustomEvent('emptyInputEvent', {
        detail: { message },
      });
      document.dispatchEvent(emptyInputEvent);
    }
  });

  formEl.addEventListener('onRender', () => {
    const tableHeader = document.querySelector('[data-table-part="header"]');
    Array
      .from(tableHeader.children)
      .forEach((item, i) => {
        item.addEventListener('click', () => {
          switch (i) {
            case 0:
              state.sort((a, b) => a.id - b.id);
              break;

            case 1:
              state.sort((a, b) => a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' }));
              break;

            case 2:
              state.sort((a, b) => b.score - a.score);
              break;

            default:
              throw new Error('Sorting failed.');
          }

          render(state, formEl, inputEl, tableEl);
        });
      });
  });

  inputEl.focus();
})();
