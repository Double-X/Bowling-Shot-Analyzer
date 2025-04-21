const FMFile = {
    arrayBuffer: file => FMFile._type(file, "readAsArrayBuffer"),
    dataURL: file => FMFile._type(file, "readAsDataURL"),
    _type: (file, method) => new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onerror = reject;
        fileReader.onload = () => resolve(fileReader.result);
        fileReader[method](file);
    })
};