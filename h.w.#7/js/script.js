//�������, ������� ��������� ������� � ��������� � ���������� ���������

function sum() {
  return [].reduce.call(arguments, function(a, b) {
    return a + b;
  });
}

function mul() {
  return [].reduce.call(arguments, function(a, b) {
    return a * b;
  });
}

function sub() {
  return [].reduce.call(arguments, function(a, b) {
    return a - b;
  });
}

function div() {
  return [].reduce.call(arguments, function(a, b) {
    return a / b;
  });
}

function applyAll(func) {
  return func.apply(this, [].slice.call(arguments, 1));
}
alert(applyAll(sum, 8, 4, 2));
alert(applyAll(mul, 8, 4, 2));
alert(applyAll(sub, 8, 4, 2));
alert(applyAll(div, 8, 4, 2));


//������� ���������

let ask = +prompt('������� ����� ���������', '5')

function fibonacci(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  };
  return b;
};

alert(fibonacci(ask));