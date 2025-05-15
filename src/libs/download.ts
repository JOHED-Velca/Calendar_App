export function downloadFromBase64(base64Data: string, filename: string) {
  // Convert base64 string to Blob
  const blob = base64ToBlob(base64Data);
  if (!blob) {
    console.error('Unable to create Blob object');
    return;
  }

  // Create a hidden <a> element for downloading
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  // Create a URL using the Blob object and set it as the href attribute of the <a> element
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;

  // Trigger a click event on the <a> element to start downloading
  a.click();

  // Cleaning
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Helper function: Convert a Base64 string to a Blob object
function base64ToBlob(base64: string): Blob | null {
  // Regular expression to split data types and Base64 data
  const parts = base64.match(/^data:(.+);base64,(.+)$/);
  if (parts === null) {
    return null;
  }

  const contentType = parts[1];
  const raw = window.atob(parts[2]);
  const rawLength = raw.length;
  const array = new Uint8Array(rawLength);

  // Convert characters to bytes
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return new Blob([array], { type: contentType });
}
