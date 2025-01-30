const FMVideo = {
    arrayBuffer: file => new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onerror = reject;
        fileReader.onload = FMVideo._onLoadOk.bind(this, resolve, fileReader);
        fileReader.readAsArrayBuffer(file);
    }),
    _onLoadOk: (callback, fileReader) => callback(fileReader.result)
};