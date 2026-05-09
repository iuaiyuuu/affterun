import { toPng } from 'html-to-image';

export async function exportPoster(elementId, fileName = 'affterun-poster.png') {
  try {
    const node = document.getElementById(elementId);
    if (!node) throw new Error("Element not found");

    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 1,
      style: {
        transform: 'scale(1)',
        margin: '0',
        boxShadow: 'none'
      }
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    
    return true;
  } catch (error) {
    console.error('Oops, something went wrong!', error);
    return false;
  }
}
