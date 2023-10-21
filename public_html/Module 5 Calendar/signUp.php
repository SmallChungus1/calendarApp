<?php
include 'includes/config.php';


?>

<?php
header("Content-Type: application/json");
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = $json_obj['username'];
$password = $json_obj['password'];
$passwordConfirm = $json_obj['password2'];

if($password != $passwordConfirm){
    // echo "<br>Error: Entered passwords does not match<br>";
    // echo "<form action = login.php><input type =\"submit\" value = \"Go Back\"></input></form>";
    echo json_encode(array(
        "success" => false,
        "message" => "Entered Passwords Do Not Match" + $password + $passwordConfirm
    ));
}else{

    $stmt = $mysqli->prepare("select userName, userPassword from users where userName='$username'");
    if(!$stmt){
        // printf("Query Prep Failed: %s<br>", $mysqli->error);
        echo json_encode(array(
            "success" => false,
            "message" => "Query Prep Search Failed"
        ));
        exit;
    }
}




$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if($row){
    echo json_encode(array(
        "success" => false,
        "message" => "Error: Username already exists" 
    ));
}else{
   
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $mysqli->prepare("insert into users (userName, userPassword) values (?, ?)");
    if(!$stmt){
        echo json_encode(array(
            "success" => false,
            "message" => "Query Insertion Prep Failed 1: " 
        ));
        // printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    
    $stmt->bind_param('ss', $username, $hashedPassword );
    if(!$stmt->execute())
    {echo json_encode(array(
        "success" => false,
        "message" => "Query Insert Failed with params 2: "
    ));
    }else{
        echo json_encode(array(
            "success" => true
        ));
        exit;
    }
    
    
}


$stmt->close();







?>