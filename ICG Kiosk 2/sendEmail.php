<?php
// Check if the form data exists and is not empty
if (isset($_POST['selectedForm']) && isset($_POST['userEmail']) &&
 !empty($_POST['selectedForm']) && !empty($_POST['userEmail'])) {
    // Get form and email from POST request
    $form = $_POST['selectedForm'];
    $email = $_POST['userEmail'];

    // Construct the email
    $to = $email;
    $subject = 'Excuse Form ' . $form . ' Submission';
    $message = 'Please find attached the completed excuse form ' . $form . '.';
    $headers = 'From: your-email@example.com' . "\r\n" .
        'Reply-To: your-email@example.com' . "\r\n" .
        'Content-Type: multipart/mixed; boundary="boundary"';
    $boundary = uniqid('boundary');

    // Generate the email body with attachment
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "$message\r\n";
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: image/jpeg; name=\"form-$form.jpg\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment\r\n\r\n";
    $body .= chunk_split(base64_encode(file_get_contents("form-$form.jpg"))) . "\r\n";
    $body .= "--$boundary--";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    // Handle invalid or missing form data
    http_response_code(400);
    echo "Invalid form data. Please try again.";
}

