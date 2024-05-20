async function ImageToBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const data = new Promise((res, rej) => {
    reader.onload = () => res(reader.result);
    reader.onerror = (error) => rej(error);
  });

  return data;
}

export { ImageToBase64 };