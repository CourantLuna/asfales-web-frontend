// Prueba de lógica de URL para LodgingSearchBar
// Este archivo es solo para testing y puede ser eliminado

function testBasePath(pathname) {
  // Lógica del nuevo basePath
  if (pathname === '/' || pathname === '/global-lodging-search') {
    return '/global-lodging-search';
  }
  
  if (pathname.endsWith('/lodgings')) {
    return pathname;
  }
  
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    return `/${pathSegments[0]}/lodgings`;
  }
  
  return '/lodgings';
}

function testFinalUrl(basePath, lodgingType, pathname, params = "param1=value1") {
  // Para páginas globales, no agregar lodgingType
  if (pathname === '/' || pathname === '/global-lodging-search') {
    return `${basePath}?${params}`;
  }
  
  // Para páginas específicas, agregar lodgingType si está disponible
  if (lodgingType) {
    // Evitar duplicar /lodgings si ya está en basePath
    const cleanBasePath = basePath.endsWith('/lodgings') 
      ? basePath.replace('/lodgings', '') 
      : basePath;
    return `${cleanBasePath}/lodgings/${lodgingType}?${params}`;
  }
  
  // Fallback: usar solo basePath
  return `${basePath}?${params}`;
}

// Test cases
const testCases = [
  { pathname: '/', lodgingType: 'hotels-and-resorts' },
  { pathname: '/global-lodging-search', lodgingType: 'hostels-and-guesthouses' },
  { pathname: '/hotels-and-resorts', lodgingType: 'hotels-and-resorts' },
  { pathname: '/hotels-and-resorts/lodgings', lodgingType: 'apartments-and-longstays' },
  { pathname: '/hostels-and-guesthouses', lodgingType: 'hostels-and-guesthouses' },
  { pathname: '/apartments', lodgingType: 'apartments-and-longstays' },
  { pathname: '/some-random-path', lodgingType: 'hotels-and-resorts' },
];

console.log('🧪 Testing URL Logic:');
console.log('='.repeat(50));

testCases.forEach((testCase, index) => {
  const { pathname, lodgingType } = testCase;
  const basePath = testBasePath(pathname);
  const finalUrl = testFinalUrl(basePath, lodgingType, pathname);
  
  console.log(`Test ${index + 1}:`);
  console.log(`  Input: pathname="${pathname}", lodgingType="${lodgingType}"`);
  console.log(`  BasePath: "${basePath}"`);
  console.log(`  Final URL: "${finalUrl}"`);
  console.log('');
});
