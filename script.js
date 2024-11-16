let startTime, endTime;
let testText = "";  // Initially empty, will be set by the user

function setTestText() {
  // Get the text from the user input and set it as the test text
  testText = document.getElementById("userText").value.trim();
  
  // Display the custom sentence or question for the user to type
  if (testText === "") {
    alert("Please enter a sentence or question!");
  } else {
    document.getElementById("test-text").innerText = testText;
  }
}

function startTest() {
  // Ensure the test text has been set
  if (testText === "") {
    alert("Please set the test text first!");
    return;
  }

  document.getElementById("typing-area").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("suggestion").innerText = "";
  document.getElementById("typing-area").disabled = false;
  document.getElementById("typing-area").focus();
  startTime = new Date();
}

function submitTest() {
  // Check the typed text and calculate the result
  const userText = document.getElementById("typing-area").value.trim();
  endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000; // in seconds
  const wordCount = userText.split(" ").filter(word => word).length;
  const speed = Math.round((wordCount / timeTaken) * 60); // words per minute
  const isCorrect = userText === testText;

  // Display result based on correctness
  document.getElementById("result").innerText = isCorrect
    ? `✅ Your typing speed is ${speed} WPM.`
    : `❌ Text doesn't match. Please try again.`;

  // Provide a suggestion/question based on the test result
  const suggestion = isCorrect 
    ? "Well done! Want to improve further?" 
    : "Try again! Would you like some typing tips?";
  document.getElementById("suggestion").innerText = suggestion;

  // Clear the textarea after submitting
  document.getElementById("typing-area").value = "";
  document.getElementById("typing-area").disabled = true;  // Disable the text area to prevent further typing
}

// Submit on Enter key press
document.getElementById("typing-area").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();  // Prevent default Enter behavior (like adding a new line)
    submitTest();  // Submit the test
  }
});
