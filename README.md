Lessons learnt when making website:

1. const variables kan have a function as a value so that the value can change each time it is defined/read, but the variable can't be reassigned.
2. querySelector, getElementById, etc. returns an object element. The console just displays it differently sometimes.
3. A document mock is used for testing in environments without a document object.
4. JS converts data-attributes written in kebab-case to camelCase. For example: data-row-index in the html must be element.rowIndex in the JS file.