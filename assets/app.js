let piData, output;
// let numDig = 100;
const numbers = Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

//take all digits and output
makeTable();
//click event for data retrieval/API with async function
$("#submit").on("click", function() {
  $("document").refresh();
  let holder = $("#userInput").val();
  let numDig = parseInt(holder, 10);

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
  getPI(numDig).then(data => {
    piData = data;
    countDigits(piData);
  });
});

//function that takes return data and puts in an array to display to DOM and count occurences with a call to elCount
function countDigits(piData) {
  const temp = piData.split("");

  const piArr = temp.map(el => {
    return parseInt(el, 10);
  });
  //filter out the decimal point
  const newPIArr = piArr.filter(item => isNaN(item) === false);
  const output = elCount(newPIArr);
  const dataLine = $("#dataLine");

  output[0].forEach(item => {
    const result = $("<td>").html(item);
    result.attr("class", "occTab")
    dataLine.append(result);
  });
}

/*function that counts the occurences by sorting the array and creating two new arrays 
based on conditional statement (compares the previous to current arr[i])*/
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

//makes the initial table to receive the data arrays
function makeTable() {
  const titleLine = $("#titleLine");
  numbers.forEach(number => {
    const title = $("<td>").html(number);
    titleLine.append(title);
  });
}
