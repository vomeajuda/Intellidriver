const { soma, soma3 } = require('../soma')

test('Soma 1 + 2 o resultado tem que ser 3', function() {
    expect(soma(1,2)).toBe(3);
})

test('Soma 1 + 2 + 3 o resultado tem que ser 6', function() {
    expect(soma3(3,2,1)).toBe(6);
})