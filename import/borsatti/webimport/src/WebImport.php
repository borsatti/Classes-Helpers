<?php namespace WebImport;
require '../../../vendor/autoload.php';


use PHPExcel_IOFactory;

Class WebImport
{
	/**
	 * Variavel contendo o valor do excel
	 * @var array
	 */
	
	protected $dados;

	/**
	 * Quantidade de colunas do arquivo
	 * @var integer
	 */
	
	protected $tabs;

	/**
	 * QUantidade de registros do arquivo
	 * @var integer
	 */
	
	protected $rows;

	/**
	 * Array contando as letras do alfabeto
	 * @var array
	 */
	protected $alfabeto = [1 => 'A', 2 => 'B', 3 => 'C', 4 => 'D', 5 => 'E', 6 => 'F', 7 => 'G', 8 => 'H', 9 => 'I', 10 => 'J', 11 => 'K', 12 => 'L', 13 => 'M', 14 => 'N', 15 => 'O', 16 => 'P', 17 => 'Q', 18 => 'R', 19 => 'S', 20 => 'T', 21 => 'U', 22 => 'V', 23 => 'W', 25 => 'Y', 26 => 'Z'];

	/**
	 * Variavel que guarda o conteudo html.
	 * @var string
	 */
	protected $html;

	/**
	 * Função construc, faz a leitura do arquivo e seta o conteudo no $dados
	 * @param string $arquivo Arquivo a ser lido pela classe.*
	 * @return  $this
	 */	
	
	public function __construct($arquivo, $secao) 
	{
		$excelReader = PHPExcel_IOFactory::createReaderForFile($arquivo);
		$excelReader->setReadDataOnly();		
		$excelObj = $excelReader->load($arquivo);
		$return = $excelObj->getActiveSheet()->toArray(null, true,true,true);
		$this->tabs = sizeof($return[2]);
		$this->rows = sizeof($return);
		$this->dados = $return;
		$this->html = $this->create($secao);
	}

 	/**
 	 * Função que cria a tabela de importação e define as regras do conjunto a ser importado
 	 * @param  string $section Seção do sistema que será feita a importação
 	 * @return string         Html da tabela
 	 */
	private function create($section) 
	{
		$fields = [];
		$contadorTabs = 0;
		$conteudoCombo = '';
		$html = '';

		/**
		 * Define qual conjunto de regras vai usar
		 */
		
		if ($section == 'clientes') {

			$fields = [
				'1' => ['name' => 'id', 'title' => 'ID', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'2' => ['name' => 'nome', 'title' => 'Nome', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'3' => ['name' => 'usuario', 'title' => 'Usuário', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'4' => ['name' => 'senha', 'title' => 'Senha', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'5' => ['name' => 'tipo', 'title' => 'Tipo de pessoa', 'required' => true, 'validation' => 'blank', 'combo' => true, 'showFields' => ['fisica' => ['cpf', 'rg'], 'juridica' => ['cnpj', 'ie', 'im']], 'values' => array('fisica' => 'Pessoa Física', 'juridica' => 'Pessoa Jurídica'), 'width' => '160'],
				'6' => ['name' => 'cpf', 'title' => 'CPF', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'7' => ['name' => 'rg', 'title' => 'RG', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'8' => ['name' => 'email', 'title' => 'E-mail', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'9' => ['name' => 'data_nascimento', 'title' => 'Data de nascimento', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'10' => ['name' => 'data_cadastro', 'title' => 'Data de cadastro', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'11' => ['name' => 'cliente_desde', 'title' => 'Cliente desde', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'12' => ['name' => 'genero', 'title' => 'Gêneros', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'13' => ['name' => 'cnpj', 'title' => 'CNPJ', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'14' => ['name' => 'im', 'title' => 'Inscrição Municipal', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'15' => ['name' => 'ie', 'title' => 'Inscrição Estadual', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'16' => ['name' => 'razao_social', 'title' => 'Razão social', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'17' => ['name' => 'nome_fantasia', 'title' => 'Nome fantasia', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'18' => ['name' => 'observacao', 'title' => 'Observação', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'19' => ['name' => 'endereco', 'title' => 'Endereço', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'20' => ['name' => 'numero', 'title' => 'Número', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'21' => ['name' => 'bairro', 'title' => 'Bairro', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'22' => ['name' => 'cidade', 'title' => 'Cidade', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'23' => ['name' => 'estado', 'title' => 'Estado', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'24' => ['name' => 'complemento', 'title' => 'Complemento', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'25' => ['name' => 'cep', 'title' => 'CEP', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'26' => ['name' => 'ativo', 'title' => 'Ativo', 'required' => true, 'validation' => 'blank', 'width' => '160'],
				'27' => ['name' => 'interessados', 'title' => 'Interessados', 'required' => true, 'validation' => 'blank', 'width' => '160'],
			];

		}

		foreach ($fields as $field) {
			$conteudoCombo .= '<option value="'.$field['name'].'">'.$field['title'].'</option>';
		}

		$html .= "<table border='true'>";
		$html .= "<th width='30'>X</th>";

		/**
		 * Colunas das tabela
		 */
		
		for ($t = 1; $t <= $this->tabs; $t++) {

			$html .= "<th align='center' position='".$t."' width='100'> <a href='javascript:ScpImport.forms.removeColumn(".$t.");'>X</a> <a href='javascript:ScpImport.forms.trade(".$t.");'>T</a> <a href='javascript:ScpImport.forms.cleanAll(".$t.");'>L</a> <a href='javascript:ScpImport.validation.valid(".$t.");'>V</a> <select onchange='ScpImport.forms.selectedHeader(this,".$t.")' headers='1' style='width:180px;' name='field[]' position='".$t."' class='field_".$t." form-control headers-combo'><option value=''>Selecione</option>".$conteudoCombo."</select></th>";

		}

		$html .= "<tbody>";

			/**
			 * Linhas da tabela com os valores
			 */
			
			for ($l = 1; $l <= $this->rows ; $l++) {

				$html .= "<tr line='".$l."'>";

					$html .= "<td line='".$l."' align='center'> <a href='javascript:ScpImport.forms.removeField(".$l.");'>X</a> </td>";						
					for ($t = 1; $t <= $this->tabs; $t++) {
						$html .= "<td position='".$t."' line='".$l."'> <input type='text' class='form-control' position='".$t."' line='".$l."' value='".trim($this->dados[$l][$this->alfabeto[$t]])."'> </td>";
					}
					
				$html .= "</tr>";

			}

		$html .= "</tbody>";
		$html .= "</table>";

		return $html;
	}

	/**
	 * Função que mostra a tabela
	 */
	public function show() 
	{
		return $this->html;
	}

}

////////////////////////////////////////////////////////////////////////// HTML ////////////////////////////////////////////////////////////////////////////////////

echo "<doctype !HTML>";
echo "<html>";
	echo "<head>";
		echo "<meta charset='utf8'>";

		echo "<link href='css.css' rel='stylesheet' />";
		echo "<link href='lib/css/bootstrap.min.css' rel='stylesheet' />";

		echo "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>";
		echo "<script src='funcoes.js'></script>";
		echo "<script src='lib/js/bootstrap.min.js'></script>";
		echo "<script src='bootbox.js'></script>";


		

	echo "</head>";
	echo "<body>";
		$im = new WebImport('Clientes.xls', 'clientes');
		echo $im->show();
		echo "<input type='button' value='Importar' onClick='ScpImport.forms.validation()'>";
	echo "</body>";
echo "</html>";
