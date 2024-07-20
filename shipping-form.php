<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['fullName'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $address = $_POST['address'];

    $productBrand = $_POST['productBrand'];
    $productPrice = $_POST['productPrice'];
    $productImage = $_POST['productImage'];

    $to = "waleedravian1122@gmail.com"; // Replace with the recipient's email address
    $subject = "New Purchase Request from $name";
    $from = "From: helloyou@g-oldatelier.se";

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= $from;

    // Email body
    $message = "Name: $name\n";
    $message .= "Phone: $phone\n";
    $message .= "Email: $email\n";
    $message .= "Shipping Address: $address\n\n";
    $message .= "Product Details:\n";
    $message .= "Brand: $productBrand\n";
    $message .= "Price: $productPrice\n";
    $message .= "Image: $productImage\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        header("Location: success.html");
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
