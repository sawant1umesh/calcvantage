try {
  const res = await fetch('http://localhost:4321/');
  console.log('STATUS:', res.status);
} catch (e) {
  console.log('ERR:', e.message);
}
