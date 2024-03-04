function setEmailFormAction(email) {
    var form = document.getElementById("emailForm");
    form.action = "http://localhost:3000/send-email";
  }
  
  function showFormPreview(formId) {
    var previewId = formId + "Preview";
    var previews = document.querySelectorAll(".form-preview");
    for (var i = 0; i < previews.length; i++) {
      previews[i].style.display = "none";
    }
    document.getElementById(previewId).style.display = "block";
    // Set the selected form value
    document.getElementById("selectedForm").value = formId;
  }
  
  function submitEmailForm(event) {
    event.preventDefault();
    var email = document.getElementById("userEmail").value;
    setEmailFormAction(email); // Set the form action with the user's email
    document.getElementById("emailForm").submit(); // Submit the form
  }
  