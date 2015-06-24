function isCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj.length != 14)
        return false;
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

/**
 * Substr count = php
 * @param  string haystack variavel com o valor
 * @param  string needle   o que quer encontrar
 * @return int Quantidade encontrada
 */
function substr_count(haystack, needle, offset, length) {

  var cnt = 0;

  haystack += '';
  needle += '';
  if (isNaN(offset)) {
    offset = 0;
  }
  if (isNaN(length)) {
    length = 0;
  }
  if (needle.length == 0) {
    return false;
  }
  offset--;

  while ((offset = haystack.indexOf(needle, offset + 1)) != -1) {
    if (length > 0 && (offset + needle.length) > length) {
      return false;
    }
    cnt++;
  }

  return cnt;
}

/**
 * Função para valida CPF
 * @param  string value CPF para fazer a validação
 * @return Boolean       Verdadeiro ou falso
 */
function isCPF(value){
	value = value.replace('.','');
    value = value.replace('.','');
    cpf = value.replace('-','');
    while(cpf.length < 11) cpf = "0"+ cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i=0; i<11; i++){
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0;} else { a[9] = 11-x;}
    b = 0;
    c = 11;
    for (y=0; y<10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
    return true;
}

/**
 * Verificar se é uma data BR valida
 * @param  string  value Data a ser validada
 * @return boolean       Vwrdadeiro ou Falso
 */
function isDateBR(value) {
	if(value.length!=10) return false;
    // verificando data
    var data        = value;
    var dia         = data.substr(0,2);
    var barra1      = data.substr(2,1);
    var mes         = data.substr(3,2);
    var barra2      = data.substr(5,1);
    var ano         = data.substr(6,4);
    if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false;
    if((mes==4||mes==6||mes==9||mes==11) && dia==31)return false;
    if(mes==2 && (dia>29||(dia==29 && ano%4!=0)))return false;
    if(ano < 1900)return false;
    return true;
}

/**
 * Verificar se é uma data com hora BR valida
 * @param  string  value Data a ser validada
 * @return boolean       Vwrdadeiro ou Falso
 */

function isDateTimeBR(value) {

	//contando chars
    if(value.length!=16) return false;
     // dividindo data e hora
    if(value.substr(10,1)!=' ') return false; // verificando se há espaço
    var arrOpcoes = value.split(' ');
    if(arrOpcoes.length!=2) return false; // verificando a divisão de data e hora
    // verificando data
    var data        = arrOpcoes[0];
    var dia         = data.substr(0,2);
    var barra1      = data.substr(2,1);
    var mes         = data.substr(3,2);
    var barra2      = data.substr(5,1);
    var ano         = data.substr(6,4);
    if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false;
    if ((mes==4||mes==6||mes==9||mes==11) && dia==31)return false;
    if (mes==2 && (dia>29||(dia==29 && ano%4!=0)))return false;
    // verificando hora
    var horario     = arrOpcoes[1];
    var hora        = horario.substr(0,2);
    var doispontos  = horario.substr(2,1);
    var minuto      = horario.substr(3,2);
    if(horario.length!=5||isNaN(hora)||isNaN(minuto)||hora>23||minuto>59||doispontos!=":")return false;
    return true;

}
	
var passouFisica = 0;
var passouJuridica = 0;

var ScpImport = {};

/**
 * Funções que manipulam as condições do form
 * @type Object
 */

ScpImport.forms = {

	/**
	 * Função destinada a remover uma linha da tabela de importação
	 * @param  integer linha linha a ser removida
	 */
	
	removeField : function(linha)
	{
		bootbox.confirm('Deseja remover a linha '+linha+'?', function(result) {
			if (result) {
				$("tr[line="+linha+"]").remove();
			}
		});
	},

	/**
	 * Função destinada a remover uma coluna da tabela de importação
	 * @param  integer coluna coluna a ser removida
	 */
	
	removeColumn : function(coluna)
	{
		bootbox.confirm('Deseja remover a coluna '+coluna+'?', function(result) {
			if (result) {
				$("[position="+coluna+"]").remove();
			}
		});
	},
	/**
	 * Função destinada fazer as validações para ser dado o prosseguimento da importação, se tiver erros, aponta.
	 */
	
	validation: function()
	{
		var emptyHeaders = 0;
		var emptyRequiredFields = 0;

		$("[headers=1]").each(function(index) {

			if ($(this).val() === '') {
				$(this).addClass('br');
				emptyHeaders++;
			} else if ($(this).val() !== '' && $(this).hasClass('br')) {
				$(this).removeClass('br');
			}

		});

		if (emptyHeaders > 0 || emptyRequiredFields > 0) {
			bootbox.alert('Existem campos para serem preenchidos');
		}
	},

	/**
	 * Função destinada a verificar se no ato da escolha do header ja tem outro header igual
	 * @param  obj opt É o this do select que esta sendo manipulado
	 */
	
	selectedHeader: function(opt, column)
	{
		var sometimes = 0;
		$("[headers=1]").each(function(index) {

			if (opt.value !== '') {

				if (opt.value == $(this).val()) {
					sometimes++;
				}

				if (sometimes > 1) {
					bootbox.alert('Já existe uma coluna com esse campo');
					$(opt).val('');
					return false;
				}

			}

		});

		ScpImport.validation.init(opt, column);
	},

	trade : function(column)
	{
		bootbox.dialog({
                title: "O que deseja substituir?",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<div class="col-md-6"> ' +
                    '<input id="buscar" name="buscar" type="text" placeholder="Buscar por" class="form-control input-md"> ' +
                    '</div> ' +
                    '<div class="col-md-6"> ' +
                    '<input id="trocar" name="trocar" type="text" placeholder="e trocar por" class="form-control input-md"> ' +
                    '</div> ' +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Substituir",
                        className: "btn-success",
                        callback: function () {

							var buscar = $('#buscar').val();
							var trocar = $('#trocar').val();
							if (trocar == '') {
								bootbox.alert("Você deve preencher o campo 'e trocar por'.");
								return false;
							}
                            
							ScpImport.utils.initTrade(column, buscar, trocar);

                        }
                    }
                }
            }
        );
	},

	cleanAll : function (column)
	{
		bootbox.confirm('Limpar todos os campos da coluna '+column+ '?', function(result) {
			if (result) {
				$('input[position='+column+']').each(function(index) {
					$(this).val('');
				});
			}
		});
	}

};

ScpImport.valores = {
	valor: function() {
		alert('go');
	}
};

ScpImport.validation = {

	valid : function (column) {

		$('select[position='+column+']').each(function(index) {
			if ($(this).val() == '') {
				bootbox.alert('Selecione um tipo para esse campo.');
				return false;
			}
			ScpImport.forms.selectedHeader(this, column);
		});

	},

	/**
	 * Iniciação da validação.
	 * @param  string funcao Validação a ser executada
	 * @param  int column Posição da coluna	 
	 */
	
	init: function (funcao,column)
	{
		if (funcao.value == 'id') {
			ScpImport.validation.id(column);
		} else if (funcao.value == 'nome') {
			ScpImport.validation.nome(column);
		} else if (funcao.value == 'usuario') {
			ScpImport.validation.usuario(column);
		} else if (funcao.value == 'email') {
			ScpImport.validation.email(column);
		} else if (funcao.value == 'cpf') {
			ScpImport.validation.cpf(column);
		} else if (funcao.value == 'data_nascimento') {
			ScpImport.validation.dataNascimento(column);
		} else if (funcao.value == 'data_cadastro') {
			ScpImport.validation.dataCadastro(column);
		} else if (funcao.value == 'cliente_desde') {
			ScpImport.validation.clienteDesde(column);
		} else if (funcao.value == 'rg') {
			ScpImport.validation.rg(column);
		} else if (funcao.value == 'genero') {
			ScpImport.validation.genero(column);
		} else if (funcao.value == 'tipo') {
			ScpImport.validation.tipo(column);
		} else if (funcao.value == 'im') {
			ScpImport.validation.im(column);
		} else if (funcao.value == 'ie') {
			ScpImport.validation.ie(column);
		} else if (funcao.value == 'cnpj') {
			ScpImport.validation.cnpj(column);
		} else if (funcao.value == 'endereco') {
			ScpImport.validation.endereco(column);
		} else if (funcao.value == 'numero') {
			ScpImport.validation.numero(column);
		} else if (funcao.value == 'cep') {
			ScpImport.validation.cep(column);
		} else if (funcao.value == 'bairro') {
			ScpImport.validation.bairro(column);
		} else if (funcao.value == 'cidade') {
			ScpImport.validation.cidade(column);
		} else if (funcao.value == 'estado') {
			ScpImport.validation.estado(column);
		}


	},

	/**
	 * Validação para ID
	 * @param  int column Posição da coluna
	 */
	
	id: function(column)
	{
		$('input[position='+column+']').each(function(index) {
			if ($(this).val() == '') {
				$(this).addClass('error');
			} else if (!$.isNumeric($(this).val()))  {
				$(this).addClass('error');
			} else {
				$(this).removeClass('error');
			}
		});
	},

	/**
	 * Validação para nome
	 * @param  int column Posição da coluna
	 */
	
	nome: function(column)
	{
		$('input[position='+column+']').each(function(index) {
			if ($(this).val() == '') {
				$(this).addClass('error');
			} else {
				$(this).removeClass('error');
			}
		});
	},

	/**
	 * Validação para usuario
	 * @param  int column Posição da coluna
	 */
	
	usuario: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			ScpImport.utils.clean(this, ' ');
			ScpImport.utils.clean(this, '/');
			ScpImport.utils.clean(this, '.');
			ScpImport.utils.clean(this, '@');
			ScpImport.utils.clean(this, ',');
			ScpImport.utils.retirarAcentos(this);

			if (!$(this).hasClass('text-lowercase')) {
				$(this).addClass('text-lowercase');
			}

			if ($(this).val() == '') {
				$(this).addClass('error');
			} else {
				$(this).removeClass('error');
			}
		});
	},

	/**
	 * Validação para e-mail
	 * @param  int column Posição da coluna
	 */
	
	email: function(column)
	{
		var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		$('input[position='+column+']').each(function(index) {
			if ($(this).val() != '') {
				if (!filtro.test($(this).val())) {
					$(this).addClass('error');
				}
			} else {
				$(this).removeClass('error');
			}
		});
	},

	/**
	 * Validação para CPF
	 * @param  int column Posição da coluna
	 */
	
	cpf: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			if ($(this).val() != '') {
				if (!isCPF($(this).val())) {
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
				}
			} else {
				$(this).removeClass('error');
			}

		});
	},

	/**
	 * Validação para CNPJ
	 * @param  int column Posição da coluna
	 */
	
	cnpj: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			if ($(this).val() != '') {
				if (!isCNPJ($(this).val())) {
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
				}
			} else {
				$(this).removeClass('error');
			}

		});
	},

	/**
	 * Validação para data de nascimento
	 * @param  int column Posição da coluna
	 */
	
	dataNascimento: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			ScpImport.utils.dateAmericanToBr(this);

			if ($(this).val() != '') {
				if (!isDateBR($(this).val())) {
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
				}
			} else {
				$(this).removeClass('error');
			}

		});
	},


	/**
	 * Validação para cliente desde
	 * @param  int column Posição da coluna
	 */
	
	clienteDesde: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			ScpImport.utils.dateAmericanToBr(this);
			
			if ($(this).val() == '') {
				$(this).addClass('error');
			} else if (!isDateBR($(this).val())) {
				$(this).addClass('error');
			} else {
				$(this).removeClass('error');
			}

		});
	},

	/**
	 * Validação para data de cadastro
	 * @param  int column Posição da coluna
	 */
	
	dataCadastro: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			if ($(this).val() == '') {
				$(this).addClass('error');
			} else if (!isDateTimeBR($(this).val())) {
				$(this).addClass('error');
			} else {
				$(this).removeClass('error');
			}

		});
	},

	/**
	 * Validação para data de cadastro
	 * @param  int column Posição da coluna
	 */
	
	genero: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			if ($(this).val() != '') {

				ScpImport.utils.clean(this, ' ');
				ScpImport.utils.generos(this);

				if (!$(this).hasClass('text-lowercase')) {
					$(this).addClass('text-lowercase');
				}

				if ($(this).val() != 'masculino' && $(this).val() != 'feminino') {
					$(this).addClass('error');
				}

			} else {

				$(this).removeClass('error');

			}

		});
	},

	/**
	 * Validação para RG
	 * @param  int column Posição da coluna
	 */
	
	rg: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			ScpImport.utils.clean(this, '-');
			ScpImport.utils.clean(this, '.');
			ScpImport.utils.clean(this, '/');		

			if ($(this).val() != '') {
				if (!$.isNumeric($(this).val()))  {
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
				}
			} else {
				$(this).removeClass('error');
			}	

		});
	},

	/**
	 * Validação para Inscrição Estadual
	 * @param  int column Posição da coluna
	 */
	
	ie: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			ScpImport.utils.clean(this, '-');
			ScpImport.utils.clean(this, '.');
			ScpImport.utils.clean(this, '/');		

			if ($(this).val() != '') {
				if (!$.isNumeric($(this).val()))  {
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
				}
			} else {
				$(this).removeClass('error');
			}	

		});
	},

	/**
	 * Validação para Inscrição Municipal
	 * @param  int column Posição da coluna
	 */
	
	im: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			ScpImport.utils.clean(this, '-');
			ScpImport.utils.clean(this, '.');
			ScpImport.utils.clean(this, '/');		

			if ($(this).val() != '') {
				if (!$.isNumeric($(this).val()))  {
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
				}
			} else {
				$(this).removeClass('error');
			}	

		});
	},

	/**
	 * Validação para Inscrição Municipal
	 * @param  int column Posição da coluna
	 */
	
	numero: function(column)
	{
		$('input[position='+column+']').each(function(index) {

			ScpImport.utils.clean(this, '-');
			ScpImport.utils.clean(this, '.');
			ScpImport.utils.clean(this, '/');		

			if ($(this).val() != '') {
				if (!$.isNumeric($(this).val()) || $(this).val() == 0)  {
					$(this).addClass('error');
				} else {
					$(this).removeClass('error');
				}
			} else {
				$(this).removeClass('error');
			}	

		});
	},

	/**
	 * Validação para Tipo de pessoa
	 * 
	 * @param  int column Posição da coluna
	 */
	
	tipo: function(column)
	{
		var pessoaFisica = 0;
		var pessoaJuridica = 0;
		$('input[position='+column+']').each(function(index) {
			
			if ($(this).val() == '') {

				$(this).addClass('error');

			} else if ($(this).val() != '') {

				ScpImport.utils.tipo(this);

				if ($(this).val() != 'Pessoa Física' && $(this).val() != 'Pessoa Jurídica') {
					$(this).addClass('error');
				} else {

					if ($(this).val() == 'Pessoa Física' && pessoaFisica == 0) {
						ScpImport.validation.verificaTipo('f');
						pessoaFisica = 1;
					}
					if ($(this).val() == 'Pessoa Jurídica' && pessoaJuridica == 0) {
						ScpImport.validation.verificaTipo('j');
						pessoaJuridica = 1;
					}

					$(this).removeClass('error');
				}

			}

		});
	},

	verificaTipo : function(tipo) {
		if (tipo == 'f') {
			var nome = 0;
			var genero = 0;
			var usuario = 0;
			var senha = 0;
			$('select[headers=1]').each(function(index) {
				if ($(this).val() == 'nome')
					nome = 1;
				else if ($(this).val() == 'genero')
					genero = 1;
				else if ($(this).val() == 'usuario')
					usuario = 1;
				else if ($(this).val() == 'senha')
					senha = 1;
			});

			if (nome != 1 || genero != 1 || usuario != 1 || senha != 1)
				passouFisica = 1;
			else
				passouFisica = 0;

		} else if (tipo == 'j') {
			var nome = 0;
			var usuario = 0;
			var senha = 0;
			$('select[headers=1]').each(function(index) {
				if ($(this).val() == 'nome')
					nome = 1;
				else if ($(this).val() == 'genero')
					genero = 1;
				else if ($(this).val() == 'usuario')
					usuario = 1;
				else if ($(this).val() == 'senha')
					senha = 1;
			});

			if (nome != 1 || usuario != 1 || senha != 1)
				passouJuridica = 1;
			else
				passouJuridica = 0;

		}
	}

};


ScpImport.utils = {

	clean : function(obj,letter)
	{

		var value = $(obj).val();
		
		for (var i = 0; i = substr_count(value, letter) ; i++) {
			value = value.replace(letter, '');
		}

		$(obj).val(value);
	},

	retirarAcentos : function (obj)
	{
		var palavra = $(obj).val();
		var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
		var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
		var nova='';

		for(var i=0;i<palavra.length;i++) {

			if (com_acento.search(palavra.substr(i,1))>=0) {

				nova+=sem_acento.substr(com_acento.search(palavra.substr(i,1)),1);

			} else {

				nova+=palavra.substr(i,1);

			}

		}

		$(obj).val(nova);

	},

	dateAmericanToBr : function(obj)
	{
		var data = $(obj).val();
		if (substr_count(data, '-') == 2) {
			data = data.split('-');
			data.reverse();
			data = data.join('/');
			$(obj).val(data);
		}
	},

	generos : function(obj)
	{
		var valor = $(obj).val();

		if (valor == 'masc' || valor == 'm' || valor == 'M' || valor == 'Masc') {
			$(obj).val('masculino');
		} else if (valor == 'fem' || valor == 'f' || valor == 'F' || valor == 'Fem') {
			$(obj).val('feminino');
		}

	},


	tipo : function(obj)
	{
		var valor = $(obj).val();

		if (valor == 'F' || valor == 'f' || valor == 'fis' || valor == 'Fis') {
			$(obj).val('Pessoa Física');
		} else if (valor == 'J' || valor == 'j' || valor == 'Jur' || valor == 'jur') {
			$(obj).val('Pessoa Jurídica');
		}

	},

	initTrade : function(column, search, trade) {

		var contador = 0;
		var valor;

		$('input[position='+column+']').each(function(index) {

			valor = $(this).val();
			
			if (search == '' && trade != '') {

				$(this).val(trade);
				contador++;

			} else if (search != '' && trade != '') {
				if (valor == search) {
					valor = valor.replace(search, trade);
					$(this).val(valor);
					contador++;
				}
			}

		});

		bootbox.dialog({
			message: contador + ' registros foram alterados.',
			buttons: {
				danger: {
					label: "Substituir novamente!",
					className: "btn-primary",
					callback: function() {
						bootbox.hideAll();
						ScpImport.forms.trade(column);
					}
				},
			success: {
				label: "OK",
				className: "btn-success",
				callback: function() {
					bootbox.hideAll();
					return true;
				}
			}
		}
		});

	}

};