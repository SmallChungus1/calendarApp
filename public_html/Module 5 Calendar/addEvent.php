<?php
include 'includes/config.php';
session_start();

?>

<?php

header("Content-Type: application/json");
//check for xss attack
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username =htmlentities($json_obj['username']);
$eventTitle = htmlentities($json_obj['eventTitle']);
$eventDate = htmlentities($json_obj['eventDate']);
$eventTS = htmlentities($json_obj['eventTS']);
$eventTE = htmlentities($json_obj['eventTE']);
$eventDesc = htmlentities($json_obj['eventDesc']);
$csrfToken = htmlentities($json_obj['eventToken']);
$eventID = null; // will use autoincrement
$sharedWith = htmlentities($json_obj['sharedWith']);

if(empty($sharedWith)){
    $sharedWith = null;
}

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

    $stmt = $mysqli->prepare("insert into events (eventID, title, eventDate, timeStart, timeEnd, description, owner, sharedWith) values (?, ?, ?, ?, ?, ?, ?, ?)");
    if(!$stmt){
        echo json_encode(array(
            "success" => false,
            "message" => "Insertion Query Prep Failed"
        ));
        exit;
    }
    
    $stmt->bind_param('isssssss', $eventID, $eventTitle, $eventDate, $eventTS, $eventTE, $eventDesc, $username, $sharedWith);
    if(!$stmt->execute())
    {
        echo json_encode(array(
            "success" => false,
            "message" => "Insertion of new event failed for: ".$sharedWith
        ));
        exit;
    }else{
        echo json_encode(array(
            "success" => true,
            "message" => "Insertion Success!"
        ));
        exit;
    }
    
    $stmt->close();


}


?>