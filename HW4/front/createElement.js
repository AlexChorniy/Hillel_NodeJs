function createElement(elementName, attributes, content, listeners, parent, className, extraClass, dataAttributes) {

    const element = document.createElement(elementName);

    if (attributes) {
        for (let i = 0; i < attributes.length; i++) {
            element.setAttribute(attributes[i].key, attributes[i].value);
        }
    };
    if (dataAttributes) {
        element.setAttribute('data-index', dataAttributes);
    };
    if (content) {
        element.textContent = content;
    };
    if (listeners) {
        for (let i = 0; i < listeners.length; i++) {
            element.addEventListener(listeners[i].type, listeners[i].handler);
        }
    };
    if (className) {
        element.classList.add(className);
    };
    if (extraClass) {
        element.classList.add(extraClass);
    };

    parent.appendChild(element);

    return element;
}
