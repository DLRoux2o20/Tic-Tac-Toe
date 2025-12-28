Lessons learnt when making website:

1. const variables can have a function as a value so that the value can change each time it is defined/read, but the variable can't be reassigned.
2. querySelector, getElementById, etc. returns an object element. The console just displays it differently sometimes.
3. A document mock is used for testing in environments without a document object.
4. JS converts data-attributes written in kebab-case to camelCase. For example: data-row-index in the html must be element.dataset.rowIndex in the JS file.
5. Use event.currentTarget to get the element that has the event listener. Useful for when they can possibly click a child element when you need the parent one.