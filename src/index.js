const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.shoeBackground');
const calculate = document.querySelector('.priceBtn');

let prevColor = 'blue';
let animationEnd = true;

function changeSize() {
  sizes.forEach(size => size.classList.remove('active'));
  this.classList.add('active');
}

function changeColor() {
  if (!animationEnd) return;
  const primary = this.getAttribute('primary');
  const color = this.getAttribute('color');
  const shoe = document.querySelector(`.shoe[color='${color}']`);
  const gradient = document.querySelector(`.gradient[color='${color}']`);
  const prevGradient = document.querySelector(
    `.gradient[color='${prevColor}']`
  );

  if (color === prevColor) return;

  colors.forEach(c => c.classList.remove('active'));
  this.classList.add('active');

  document.documentElement.style.setProperty('--primary', primary);

  shoes.forEach(s => s.classList.remove('show'));
  shoe.classList.add('show');

  gradients.forEach(g => g.classList.remove('first', 'second'));
  gradient.classList.add('first');
  prevGradient.classList.add('second');

  prevColor = color;
  animationEnd = false;

  gradient.addEventListener('animationend', () => {
    animationEnd = true;
  });
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));

const x = window.matchMedia('(max-width: 1000px)');

function changeHeight() {
  if (x.matches) {
    const shoeHeight = shoes[0].offsetHeight;
    shoeBg.style.height = `${shoeHeight * 0.9}px`;
  } else {
    shoeBg.style.height = '475px';
  }

  return;
}

window.addEventListener('resize', changeHeight);

document.querySelector('.buy').addEventListener('click', () => {
  event.preventDefault();
  const number = parseInt(calculate.textContent) + 1;
  calculate.textContent = number;
});
