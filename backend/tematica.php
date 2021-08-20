<?php

    class Tematica
    {
         private $tem;
         public function __construct($dbname, $host, $user,$senha)
         {

            try 
            {
                $this->tem = new PDO("mysql:dbname=".$dbname.";host=".$host,$user,$senha);
            } 
            catch (PDOException $e) 
            {
                echo "erro com banco de dados:".$e->getMessage();
                exit();
            }
            catch (Exception $e)
             {
                echo "erro generico".$e->getMessage();
                exit();
            }
         }

         public function BuscarTematica()
         {
            $sql = "SELECT * FROM tematicas t JOIN disciplinas d ON t.temDisciplinaID = d.disID ";
            $pdo = $this->tem->query($sql);
            $res = $pdo->fetchAll(PDO::FETCH_ASSOC);
            return $res;
         }

    }


?>