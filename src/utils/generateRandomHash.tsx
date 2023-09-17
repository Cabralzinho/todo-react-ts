export const generateRandomHash = (tamanho = 128) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let sequencia = '';

  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    sequencia += caracteres.charAt(indiceAleatorio);
  }

  return sequencia;
}