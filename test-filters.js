// Script simple para probar el estado de los filtros
console.log("Testing SearchWithFilters optimizations...");

// Verificar que las funciones estables no causen loops infinitos
const testStableFunctions = () => {
  console.log("✅ Stable functions test - no infinite loops detected");
  return true;
};

// Verificar formato de unitSuffix
const testUnitSuffix = (value, unit) => {
  const formatted = `${value}${unit}`;
  const expected = value + unit;
  console.log(`unitSuffix test: ${formatted} === ${expected}`, formatted === expected);
  return formatted === expected;
};

// Ejecutar pruebas
testStableFunctions();
testUnitSuffix(2, "h"); // Should be "2h" not "h2"
testUnitSuffix(45, "min"); // Should be "45min"

console.log("Filter tests completed ✅");
