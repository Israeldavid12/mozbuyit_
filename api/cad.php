<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=se, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Resultado da submisao</h1>

    </header>
    <main>
        <?php 
           $name = $_POST["name"];
           $sname = $_POST["sname"];

           echo "<p> Olá, $name $sname, prazer em conhecer-te.</p>";
        ?>
        <a href="javascript:history.go(-1)">Voltar a pagina anterior</a>
    </main>
</body>
</html>