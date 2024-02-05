<?PHP
header('Content-Type: text/xml');

class ajaxRequests
{
    private $link;
    private $query;
    private $result;

    public function __construct()
    {
        // Setup connection to database
        $this->link = mysqli_connect('localhost', 'USERNAME', 'PASSWORD') or die("<content><result>mysql connection failed</result></content>");
        mysqli_select_db($this->link, 'DBNAME') or die("<content><result>database selection failed</result></content>");
    }

    public function __destruct()
    {
        // Closing connection
        mysqli_close($this->link);
    }

    public function getRecipeAll()
    {
        // return all recipes
        $this->query = "SELECT * FROM recipehouse;";
        $this->result = mysqli_query($this->link, $this->query) or die("<content><result>query all failed</result></content>");
        $this->returnResults();
    }

    public function getRecipe($id)
    {
        // return recipes based on id
        $this->query = "SELECT * FROM recipehouse WHERE id=" . $id . ";";
        $this->result = mysqli_query($this->link, $this->query) or die("<content><result>query all failed</result></content>");
        $this->returnResults();
    }

    public function saveRecipe()
    {
        // save recipe
        // if id passed, save edits to given recipe
        // if no id passed, create new recipe
        $date = time();
        $recN = $_POST["recipeName"];
        $recC = $_POST["recipeCat"];
        $recM = $_POST["recipeMethod"];
        $recI = $_POST["recipeInst"];
        $recT = $_POST["recipeTime"];
        $recS = $_POST["recipeServe"];
        $i1_a = $_POST["ing1_amount"];
        $i1_p = $_POST["ing1_prep"];
        $i1_i = $_POST["ing1_item"];
        $i2_a = $_POST["ing2_amount"];
        $i2_p = $_POST["ing2_prep"];
        $i2_i = $_POST["ing2_item"];
        $i3_a = $_POST["ing3_amount"];
        $i3_p = $_POST["ing3_prep"];
        $i3_i = $_POST["ing3_item"];
        $i4_a = $_POST["ing4_amount"];
        $i4_p = $_POST["ing4_prep"];
        $i4_i = $_POST["ing4_item"];
        $this->query = "INSERT INTO recipehouse (";
        $this->query .= "recipeName, recipeCat, recipeMethod, recipeInst, recipeTime, recipeServe, ing1_amount, ing1_prep, ing1_item, ing2_amount, ing2_prep, ing2_item, ing3_amount, ing3_prep, ing3_item, ing4_amount, ing4_prep, ing4_item";
        $this->query .= ")	VALUES (";
        $this->query .= "'$recN','$recC','$recM','$recI','$recT','$recS','$i1_a','$i1_p','$i1_i','$i2_a','$i2_p','$i2_i','$i3_a','$i3_p','$i3_i','$i4_a','$i4_p','$i4_i'";
        $this->query .= ");";
        $this->result = mysqli_query($this->link, $this->query) or die("<content><result>failed</result></content>");

        echo "<content><result>success</result></content>";
    }

    private function returnResults()
    {
        echo "<root>";
        while ($row = mysqli_fetch_assoc($this->result)) {
            echo "<recipe title='" . $row['recipeName'] . "' category='" . $row['recipeCat'] . "' method='" . $row['recipeMethod'] . "' >";
            echo "<instructions>" . $row['recipeInst'] . "</instructions>";
            echo "<time>" . $row['recipeTime'] . "</time>";
            echo "<servings>" . $row['recipeServe'] . "</servings>";
            echo "<ingredients>";
            echo "<item amount='" . $row['ing1_amount'] . "' prepared='" . $row['ing1_prep'] . "' >" . $row['ing1_item'] . "</item>";
            echo "<item amount='" . $row['ing2_amount'] . "' prepared='" . $row['ing2_prep'] . "' >" . $row['ing2_item'] . "</item>";
            echo "<item amount='" . $row['ing3_amount'] . "' prepared='" . $row['ing3_prep'] . "' >" . $row['ing3_item'] . "</item>";
            echo "<item amount='" . $row['ing4_amount'] . "' prepared='" . $row['ing4_prep'] . "' >" . $row['ing4_item'] . "</item>";
            echo "</ingredients>";
            echo "</recipe>";
        }
        echo "</root>";
    }
}

$ajaxRequests = new ajaxRequests();

if (isset($_POST['action']) && $_POST['action'] == 'save') {
    $ajaxRequests->saveRecipe();
} else if (isset($_POST['action']) && $_POST['action'] == 'getAll') {
    $ajaxRequests->getRecipeAll();
} else if (isset($_POST['action']) && $_POST['action'] == 'get') {
    $ajaxRequests->getRecipe($_POST['id']);
}
