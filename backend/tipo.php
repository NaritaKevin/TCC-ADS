<?php

class Tipo {
    private $pdo;
    //CONEXAO COM O BANCO DE DADOS
    public function __construct($dbname, $host, $user, $senha)
    {
        try {
            $this->pdo = new PDO("mysql:dbname=".$dbname.";host=".$host,$user,$senha);
        } 
        catch (PDOException $e) {
            echo "erro com banco de dados:".$e->getMessage();
            exit();
        }
        catch (Exception $e) {
            echo "erro generico".$e->getMessage();
            exit();
        }

    }

    public function buscarTipo(){
        $res = [];

        $cmd = $this->pdo->query("SELECT * from tipos");

        $res = $cmd->fetchAll(PDO::FETCH_ASSOC);

        return $res;

    }


}

?>