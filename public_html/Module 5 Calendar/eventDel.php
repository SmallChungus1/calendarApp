<?php
include 'includes/config.php';
session_start();

?>

<?php

header("Content-Type: application/json");
//check for xss attack
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = htmlentities($json_obj['username']);
$csrfToken = htmlentities($json_obj['eventToken']);
$eventID = htmlentities($json_obj['eventID']);
$eventTitle = htmlentities($json_obj['eventTitle']);

if (!hash_equals($_SESSION["token"] ,$csrfToken)){
    echo json_encode(array(
        "success" => false,
        "message" => "Error: Did not pass CSRF Security Check"
    ));
    exit;
}


if($username !== $_SESSION["currUser"]){
    echo json_encode(array(
        "success" => false,
        "message" => "Warning: identity of user passed in vs identity of session user is different, ".$username
    ));
    exit;
}else{

    $stmt = $mysqli->prepare("delete from events where eventID=? and owner=?");
    $stmt->bind_param('is', $eventID,$username);

    if(!$stmt){
        echo json_encode(array(
            "success" => false,
            "message" => "Query Prep for deleting event failed:  ".$mysqli->error
        ));
        exit;
    }else{
       if( $stmt->execute()){
            echo json_encode(array(
                "success" => true,
                "message" => "Successfully deleted the event: ".$eventTitle
            ));
            exit;
       }else{
            echo json_encode(array(
                "success" => false,
                "message" => "Error-could not delete event:  ".$mysqli->error
            ));
            exit;
       }
    }

   
    $stmt->close();

}


?>