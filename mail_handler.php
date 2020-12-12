<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
require_once('emailconfig.php');
require('PHPMailer/src/PHPMailer.php');
require('PHPMailer/src/Exception.php');
require('PHPMailer/src/SMTP.php');
$mail = new PHPMailer(true);

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

$name = $surname = $email = $phone = $message = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$name = test_input($_POST['name']);
	$surname = test_input($_POST['surname']);
	$email = test_input($_POST['email']);
	$phone = test_input($_POST['phone']);
	$message = test_input($_POST['message']);
}
	


try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'mail.omnisportfitness.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = EMAIL_USER;                     // SMTP username
    $mail->Password   = EMAIL_PASS;                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    //Recipients
    $mail->setFrom( $email, 'OSF Website');
    $mail->addAddress('info@omnisportfitness.com', 'Erik');     // Add a recipient
    $mail->addReplyTo($email, 'Mailer');

	// Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Contact from OSF website';
	$mail->Body    = $name.' '.$surname.' '.$email.' '.$phone.' '.$message;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

phpinfo();
?>
