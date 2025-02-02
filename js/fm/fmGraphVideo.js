const FMGraphVideo = {
    arrayBuffer: file => FMGraphVideo._type(file, "readAsArrayBuffer"),
    dataURL: file => FMGraphVideo._type(file, "readAsDataURL"),
    _type: (file, method) => new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onerror = reject;
        fileReader.onload = FMGraphVideo._onLoadOk.bind(this, resolve, fileReader);
        fileReader[method](file);
    }),
    _onLoadOk: (callback, fileReader) => callback(fileReader.result)
};