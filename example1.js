const calculatePrice = (basePrice) => {
  const tax = basePrice * 0.08;
  basePrice + tax;
}

const total = calculatePrice(100);
console.log(total);
console.log(tax);

// Functions will always return a value
// There are implicit and explicit return methods
// If a function doesn't have an explicit return method, it will implicitly return undefined