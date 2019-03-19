
let piData, output;
const numbers = Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

//take all digits and output
makeTable();
//API call for pi to a 
async function getPI(numDig) {
  try {
    const response = await fetch(
      "https://api.pi.delivery/v1/pi?start=0&numberOfDigits=" + numDig
    );
    if (response.ok) {
      const data = await response.json();
      $("#piData").html(data.content);
      return data.content;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error.message);
  }
}
getPI(100).then(data => {
  piData = data;
  countDigits(piData);
});

function countDigits(piData) {
  const temp = piData.split("");
  
  const piArr = temp.map(el => {
    return parseInt(el, 10);
  });
  const newPIArr = piArr.filter(item => isNaN(item) === false);
  const output = elCount(newPIArr);
  const dataLine = $("#dataLine");

  output[0].forEach(item => {
    const result = $("<td>").html(item);
    dataLine.append(result);
  });
}
;

function elCount(arr) {
  var a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [b];
}

function makeTable() {
  const titleLine = $("#titleLine");
  numbers.forEach(number => {
    const title = $("<td>").html(number);
    titleLine.append(title);
  });
}
