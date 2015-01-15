/*

EasyForm - | 2015-01-16
A easy custom simple contact form jQuery plugin

Author: Giuliano Stedile


*/


(function($){

	$.fn.easyform = function(options){

		var defaults = {
			'token'      : '',     // Token obrigatório.
			'secret'     : '',     // Secret obrigatório.
			'lang'       : 'pt',   // Determina o idioma do plugin (en, pt) Defaults = en
			'modal'      : false,  // Fetermina se o formulário será modal ou inserido em outro elemento
			'nameButtonModal' : 'Press to open form',   // Se 'modal' for 'true', nameButtonModel determina o nome do botão
			'urlRequest' : 'http://linkderecebimento.com.br',   // URL obrigatória que receberá a requisição POST retornando HTTP 200 para sucesso e HTTP 500 para erro

			'title'      : 'Form',

			'fields' : {
				'estado' : '',  // Array com os UFs a serem utilizados no select, por default mostra todos os estados ex.: ['PR', 'SC', 'RS']
				'nivel'  : ''   // Array obrigatório com os níveis a serem utilizados no select Ex.: ['Iniciante', 'Intermediário', 'Avançado', 'Ninja']
			}
		}

		var settings = $.extend( {}, defaults, options );

		var lang = {};
		switch (settings.lang){
			case 'en':
				lang.titleCampoNome = 'Name:';
				lang.phCampoNome = 'Type your full name...';

				lang.titleCampoEmail = 'E-mail:';
				lang.phCampoEmail = 'Ex.: antonio@hotmail.com';

				lang.titleSelectEstado = 'State:';

				lang.titleSelectNivel = 'Level:';

				lang.nBtnSubmit = 'Submit';
				lang.txtDica = '* Required fields.';
				break;


			case 'pt':
				lang.titleCampoNome = 'Nome:';
				lang.phCampoNome = 'Digite seu nome completo...';

				lang.titleCampoEmail = 'E-mail:';
				lang.phCampoEmail = 'Ex.: antonio@hotmail.com';

				lang.titleSelectEstado = 'Estado (UF):';

				lang.titleSelectNivel = 'Nível:';

				lang.nCampoNome = 'Name:';

				lang.nBtnSubmit = 'Enviar';
				lang.txtDica = '* Campos obrigatórios.';
				break;
		}




		return this.each(function(){

			if( !settings.token || settings.token == '' ){
				$(this).html('<div class="alert alert-error ef-error clearfix">Error ef-0001: Token unspecified.</div>');
				return false;
			}
			if( !settings.secret || settings.secret == '' ){
				$(this).html('<div class="alert alert-error ef-error clearfix">Error ef-0002: Secret unspecified.</div>');
				return false;
			}
			if( !settings.urlRequest || settings.urlRequest == '' ){
				$(this).html('<div class="alert alert-error ef-error clearfix">Error ef-0003: urlRequest unspecified.</div>');
				return false;
			}

			if( settings.modal == true ){

				$('#integration_form').replaceWith( '<a href="#ef-modal" id="integration_form" role="button" class="btn btn-primary" data-toggle="modal">'+settings.nameButtonModal+'</a> <div id="ef-modal" class="modal hide fade"> <div class="modal-header"> &nbsp; <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div> <div class="modal-body">'+initLayout()+'</div> </div>' );

				
			}else{
				$(this).html(initLayout());
			}

		});

		function initLayout(){

			var contentLayout = '<form class="ef-form"> <fieldset class="ef-fieldset">';

			contentLayout += '<legend class="ef-legend-fieldset">'+settings.title+'</legend>';


			contentLayout += '<div class="pull-left clearfix"> <div class="controls"> <label class="ef-label-campo">'+lang.titleCampoNome+' *</label> <input class="span5 ef-input-nome" type="text" name="nome" placeholder="'+lang.phCampoNome+'"> </div>';

			contentLayout += '<div class="controls"> <label class="ef-label-campo">'+lang.titleCampoEmail+' *</label> <input class="span5 ef-input-email" type="email" name="email" placeholder="'+lang.phCampoEmail+'"> </div>';

			if( settings.fields.estado || settings.fields.estado != '' ){
				contentLayout += '<div class="controls pull-left ef-mg-right"> <label class="ef-label-campo" for="ef-selectStates">'+lang.titleSelectEstado+'</label> <select class="span2 ef-select-estados" id="ef-selectStates">';
					var estados = settings.fields.estado;
					for (var i in estados){
						contentLayout += '<option value="'+estados[i]+'">'+estados[i]+'</option>';
					}
				contentLayout += '</select> </div>';
			}

			if( settings.fields.nivel || settings.fields.nivel != '' ){
				contentLayout += '<div class="controls pull-left"> <label class="ef-label-campo" for="ef-selectLevels">'+lang.titleSelectNivel+'</label> <select class="span2 ef-select-niveis" id="ef-selectLevels">';
					var niveis = settings.fields.nivel;
					for (var i in niveis){
						contentLayout += '<option value="'+niveis[i]+'">'+niveis[i]+'</option>';
					}
				contentLayout += '</select> </div>';
			}

			contentLayout += '<button type="submit" class="btn btn-success pull-right ef-btn-submit clearfix">'+lang.nBtnSubmit+'</button> <br> <span class="help-block ef-dica">* Campos obrigatórios.</span> </div>';


			contentLayout += '</fieldset> </form>';

			return contentLayout;

		}

	};

})(jQuery);



