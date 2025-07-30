function Animal() {}
Animal.prototype.eat = function () {
  console.log("Eating");
};

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);

const d = new Dog();
d.eat(); // Output: Eating
