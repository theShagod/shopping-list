

export function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    //element.style.display = 'none'; // was in demo but I am unsure why this is important for text documents
    //document.body.appendChild(element); // was in demo but I am unsure why this is important for text documents

    element.click(); //need to click because the element needs to get clicked for it to be activated.

    //document.body.removeChild(element); // was in demo but I am unsure why this is important for text documents
}
