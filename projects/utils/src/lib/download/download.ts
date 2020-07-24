

export function downloadJson(data: object, fileName: string) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'text/json;charset=utf-8;' });
    return downloadBlob(blob, fileName);
}


export function downloadBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    downloadUrl(url, fileName);
}


export function downloadUrl(url: string, fileName: string) {
    // window.open(url) doesn't work here. Instead, we create a temporary link item and simulate a click on it.
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}