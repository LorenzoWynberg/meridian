import { ConversionError, convert, format, unitsFor } from '@meridian/core';
import type { Dimension } from '@meridian/core';

const DIMENSIONS: Dimension[] = ['length', 'mass', 'temperature'];

let instance = 0;

function option(value: string, text: string): HTMLOptionElement {
  const o = document.createElement('option');
  o.value = value;
  o.textContent = text;
  return o;
}

function field(labelText: string, control: HTMLElement): HTMLDivElement {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = control.id;
  label.textContent = labelText;
  wrap.append(label, control);
  return wrap;
}

/** Renders the converter form into `root` and wires its behaviour. */
export function mountConverter(root: HTMLElement): void {
  const uid = `mc${instance++}`;
  const id = (name: string) => `${uid}-${name}`;

  const form = document.createElement('form');
  form.noValidate = true;

  const value = document.createElement('input');
  value.id = id('value');
  value.type = 'text';
  value.inputMode = 'decimal';
  value.autocomplete = 'off';

  const dimension = document.createElement('select');
  dimension.id = id('dimension');
  for (const d of DIMENSIONS) dimension.append(option(d, d));

  const from = document.createElement('select');
  from.id = id('from');
  const to = document.createElement('select');
  to.id = id('to');

  const swap = document.createElement('button');
  swap.type = 'button';
  swap.className = 'swap';
  swap.textContent = 'Swap units';

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'primary';
  submit.textContent = 'Convert';

  const error = document.createElement('p');
  error.id = id('value-error');
  error.className = 'error';
  error.setAttribute('role', 'alert');
  error.hidden = true;

  const live = document.createElement('div');
  live.className = 'result';
  live.setAttribute('aria-live', 'polite');
  const output = document.createElement('output');
  output.htmlFor.add(value.id, from.id, to.id);
  live.append(output);

  const row = document.createElement('div');
  row.className = 'row';
  row.append(field('Value', value), field('From', from), field('To', to));

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.append(swap, submit);

  form.append(field('Dimension', dimension), row, error, actions, live);
  root.replaceChildren(form);

  function fillUnits(): void {
    const units = unitsFor(dimension.value as Dimension);
    for (const select of [from, to]) {
      select.replaceChildren(...units.map((u) => option(u.symbol, `${u.symbol} (${u.name})`)));
    }
    from.value = units[0]?.symbol ?? '';
    to.value = units[1]?.symbol ?? '';
  }

  function showError(message: string): void {
    error.textContent = message;
    error.hidden = false;
    value.setAttribute('aria-invalid', 'true');
    value.setAttribute('aria-describedby', error.id);
    output.textContent = '';
  }

  function clearError(): void {
    error.textContent = '';
    error.hidden = true;
    value.removeAttribute('aria-invalid');
    value.removeAttribute('aria-describedby');
  }

  function recompute(): void {
    const trimmed = value.value.trim();
    clearError();
    if (trimmed === '') {
      output.textContent = '';
      return;
    }
    const n = Number(trimmed.replace(',', '.'));
    if (!Number.isFinite(n)) {
      showError('Enter a number, for example 10 or 3.5.');
      return;
    }
    try {
      output.textContent = format(convert(n, from.value, to.value));
    } catch (e) {
      if (e instanceof ConversionError) showError(e.message);
      else throw e;
    }
  }

  dimension.addEventListener('change', () => {
    fillUnits();
    recompute();
  });
  swap.addEventListener('click', () => {
    [from.value, to.value] = [to.value, from.value];
    recompute();
  });
  value.addEventListener('input', recompute);
  from.addEventListener('change', recompute);
  to.addEventListener('change', recompute);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    recompute();
  });

  dimension.value = 'length';
  fillUnits();
  from.value = 'km';
  to.value = 'mi';
}
