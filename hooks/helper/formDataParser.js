export function formDataParser(data) {
    const formData = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    return formData;
}