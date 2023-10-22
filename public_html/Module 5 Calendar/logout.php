<?php
include 'includes/config.php';

?>

<?php
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$passedInUser = $json_obj['username'];

header("Content-Type: application/json");
session_start();

if ($passedInUser !== $_SESSION['currUser']){
    echo json_encode(array(
        "success" => false,
        "message" => "Warning: session user and passed in user does not match!"
    ));
    exit;
}
unset($_SESSION['currUser']);
unset($_SESSION['LoggedIn']);
if(session_destroy()){
    echo json_encode(array(
        "success" => true,
        "message" => "User logged out successfully"
    ));
    exit;
}
?>