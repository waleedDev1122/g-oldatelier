<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['fullName'];
    $phone = $_POST['phoneNumber'];
    $email = $_POST['email'];
    $message_text = $_POST['message'];
    $attachments = $_FILES['attachments'];

    $to = "waleedravian1122@gmail.com"; // Replace with the recipient's email address
    $subject = "Email with Attachments from $name";
    $from = "From: $email";

    // Create a boundary string
    $boundary = md5("random");

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n";
    $headers .= $from;

    // Email body
    $message = "--$boundary\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= chunk_split(base64_encode("Name: $name\nPhone: $phone\nEmail: $email\nMessage: $message_text"));

    // Process each file
    for ($i = 0; $i < count($attachments['name']); $i++) {
        if ($attachments['error'][$i] === UPLOAD_ERR_OK) {
            $file_tmp_name = $attachments['tmp_name'][$i];
            $file_name = $attachments['name'][$i];
            $file_size = $attachments['size'][$i];
            $file_type = $attachments['type'][$i];

            // Read the file content
            $handle = fopen($file_tmp_name, "r");
            $content = fread($handle, $file_size);
            fclose($handle);

            // Encode the content in base64
            $encoded_content = chunk_split(base64_encode($content));

            // Attachment
            $message .= "--$boundary\r\n";
            $message .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
            $message .= $encoded_content;
        } else {
            echo "Error uploading file.";
            exit;
        }
    }

    // End boundary
    $message .= "--$boundary--";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
