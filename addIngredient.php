<html>

<head>
    <script type="text/javascript">
        function checkform() {
            if (addForm.name.value == "") {
                // something is wrong
                alert('Please enter a name');
                return false;
            }
            return true;
        }
    </script>
</head>

<body>
    <h1>Add Ingredient</h1>
    <form name='addForm' method='post' action='saveIng.php' onSubmit="return checkform()">
        <table>
            <tr>
                <td>* Name: <input type='text' name='name'></td>
            </tr>
            <tr>
                <td>Brand:<input type='text' name='brand'></td>
            </tr>
            <tr>
                <td>Description: <textarea rows="2" cols="20" name='desc'></textarea></td>
            </tr>
            <tr>
                <td>
                    <hr />
                </td>
            </tr>
            <tr>
                <td>Serving Size: <input type='text' name='serve_size'></td>
            </tr>
            <tr>
                <td>Amount per Serving</td>
            </tr>
            <tr>
                <td>Calories <input type='text' name='calories'> Calories from Fat <input type='text' name='calories_fat'></td>
            </tr>
            <tr>
                <td>
                    <hr />
                </td>
            </tr>
            <tr>
                <td>% Daily Value</td>
            </tr>
            <tr>
                <td>Total Fat <input type='text' name='total_fat'> 0%</td>
            </tr>
            <tr>
                <td>Monounsaturated Fat <input type='text' name='mono_fat'> 0%</td>
            </tr>
            <tr>
                <td>Polyunsaturated Fat <input type='text' name='poly_fat'> 0%</td>
            </tr>
            <tr>
                <td>Saturated Fat <input type='text' name='sat_fat'> 0%</td>
            </tr>
            <tr>
                <td>Trans Fat <input type='text' name='trans_fat'> 0%</td>
            </tr>
            <tr>
                <td>Cholesterol <input type='text' name='cholesterol'> 0%</td>
            </tr>
            <tr>
                <td>Sodium <input type='text' name='sodium'> 0%</td>
            </tr>
            <tr>
                <td>Potassium <input type='text' name='potass'> 0%</td>
            </tr>
            <tr>
                <td>Total Carbohydrate <input type='text' name='total_carb'> 0%</td>
            </tr>
            <tr>
                <td>Dietary Fiber <input type='text' name='diet_fiber'> 0%</td>
            </tr>
            <tr>
                <td>Sugars <input type='text' name='sugars'> 0%</td>
            </tr>
            <tr>
                <td>Other Carbohydrate <input type='text' name='other_carb'> 0%</td>
            </tr>
            <tr>
                <td>Protein <input type='text' name='protein'> 0%</td>
            </tr>
            <tr>
                <td>
                    <hr />
                </td>
            </tr>
            <tr>
                <td>Vitamin A <input type='text' name='vit_a'>%</td>
            </tr>
            <tr>
                <td>Vitamin C <input type='text' name='vit_c'>%</td>
            </tr>
            <tr>
                <td>Calcium <input type='text' name='calc'>%</td>
            </tr>
            <tr>
                <td>Iron <input type='text' name='iron'>%</td>
            </tr>
            <tr>
                <td>Vitamin D <input type='text' name='vit_d'>%</td>
            </tr>
            <tr>
                <td>Vitamin E <input type='text' name='vit_e'>%</td>
            </tr>
            <tr>
                <td>Vitamin K <input type='text' name='vit_k'>%</td>
            </tr>
            <tr>
                <td>Thiamin (Vitamin B1) <input type='text' name='thia'>%</td>
            </tr>
            <tr>
                <td>Riboflavin (Vitamin B2) <input type='text' name='ribo'>%</td>
            </tr>
            <tr>
                <td>Niacin (Vitamin B3) <input type='text' name='niacin'>%</td>
            </tr>
            <tr>
                <td>Vitamin B6 <input type='text' name='vit_b6'>%</td>
            </tr>
            <tr>
                <td>Folic Acid (Folate) <input type='text' name='folic'>%</td>
            </tr>
            <tr>
                <td>Vitamin B12 <input type='text' name='vit_b12'>%</td>
            </tr>
            <tr>
                <td>Biotin <input type='text' name='biotin'>%</td>
            </tr>
            <tr>
                <td>Pantothenic Acid <input type='text' name='panto'>%</td>
            </tr>
            <tr>
                <td>Phosphorus <input type='text' name='phosph'>%</td>
            </tr>
            <tr>
                <td>Iodine <input type='text' name='iodine'>%</td>
            </tr>
            <tr>
                <td>Magnesium <input type='text' name='magnesium'>%</td>
            </tr>
            <tr>
                <td>Zinc <input type='text' name='zinc'>%</td>
            </tr>
            <tr>
                <td>Selenium <input type='text' name='selenium'>%</td>
            </tr>
            <tr>
                <td>Copper <input type='text' name='copper'>%</td>
            </tr>
            <tr>
                <td>Manganese <input type='text' name='mang'>%</td>
            </tr>
            <tr>
                <td>Chromium <input type='text' name='chrom'>%</td>
            </tr>
            <tr>
                <td>Molybdenum <input type='text' name='moly'>%</td>
            </tr>
        </table>
        <input type="submit" value="Save"><input type="reset" value="Reset Form">
    </form>
    <br />
    <h1>Ingredient List</h1>
    <select>
        <?PHP
        $link = mysqli_connect("localhost", "USERNAME", "PASSWORD");
        mysqli_select_db($link, 'DBNAME');
        $result = mysqli_query($link, 'SELECT id, item FROM ingredients ORDER BY item ASC');
        while ($row = mysqli_fetch_assoc($result)) {
            echo '<option value="' . $row['id'] . '">' . $row['item'] . '</option>';
        }
        mysqli_close($link);
        ?>
    </select>
</body>

</html>