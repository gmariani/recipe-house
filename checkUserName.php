<?php

include("connect.php");
$clientUserName = $_POST['UserName'];

function checkUserID($id)
{
    global $con;

    $sql = "SELECT userName FROM $GLOBALS[tbl_name] WHERE userName = '$id'";
    $result = mysqli_query($con, $sql);
    $count = mysqli_num_rows($result);
    if ($count == 0) return "true";
    return "false";
}

function init()
{
    if (isset($GLOBALS["clientUserName"])) {
        makeConnection();
        $isAvail = checkUserID($GLOBALS["clientUserName"]);
        print "isAvail=$isAvail";
    } else {
        print "msg=Required parameters missing.";
    }
}

init();
