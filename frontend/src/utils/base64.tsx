export const base64ToFile = (base64: string, filename: string) => {
  const byteString = atob(base64.split(",")[1]);
  const mimeType = base64.match(/data:(.*?);base64/)?.[1] || "image/png";
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], filename, { type: mimeType });
};
