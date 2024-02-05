<?php

include("connect.php");
$tbl_name = "inbox"; // Table name
$msgId = $_POST['id'];

function eraseRecipe($id)
{
    global $con;
    $sql = "DELETE FROM inbox WHERE id = '$id'";
    $result = mysqli_query($con, $sql);
    if (!$result) return "false";
    return "true";
}

function init()
{
    if (isset($GLOBALS["msgId"])) {
        makeConnection();
        $saveResult = eraseRecipe($GLOBALS["msgId"]);
        print "success=$saveResult";
    } else {
        print "msg=Required parameters missing.";
    }
}

init();
