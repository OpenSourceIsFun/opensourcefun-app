export function convertToCSV(objArray: object[] | string) {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index] || '';
    }

    str += line + '\r\n';
  }

  return str;
}

export function csvToArray(csv: string, delimiter = ',') {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const replacedStr = csv.replace(/\r\n/g, '\n').replace(/;/g, ',');
  const headers = replacedStr
    .slice(0, replacedStr.indexOf('\n'))
    .split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = replacedStr.slice(replacedStr.indexOf('\n') + 1).split('\n');

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  // return the array
  return rows.map((row) => {
    const values = row.split(delimiter);
    return headers.reduce(
      (object: { [key: string]: string }, header, index) => {
        object[header.trim()] = values[index];
        return object;
      },
      {},
    );
  });
}
