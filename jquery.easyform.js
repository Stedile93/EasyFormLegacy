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
			'urlRequest' : 'http://teste.com.br',   // URL obrigatória que receberá a requisição POST retornando HTTP 200 para sucesso e HTTP 500 para erro

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
				lang.nBtnSubmitLoading = 'Sending...';

				lang.txtSuccess = 'Form submitted successfully!';
				lang.txtError500 = 'Failed to send form! Error HTTP 500';
				lang.txtOtherError = 'Failed to send form! Other HTTP error';

				lang.txtDica = '* Required fields.';
				break;


			case 'pt':
				lang.titleCampoNome = 'Nome:';
				lang.phCampoNome = 'Digite seu nome completo...';

				lang.titleCampoEmail = 'E-mail:';
				lang.phCampoEmail = 'Ex.: antonio@hotmail.com';

				lang.titleSelectEstado = 'Estado:';

				lang.titleSelectNivel = 'Nível:';

				lang.nCampoNome = 'Name:';

				lang.nBtnSubmit = 'Enviar';
				lang.nBtnSubmitLoading = 'Enviando...';

				lang.txtSuccess = 'Formulário enviado con sucesso!';
				lang.txtError500 = 'Falha ao enviar formulário! Erro HTTP 500';
				lang.txtOtherError = 'Falha ao enviar formulário! Outro erro HTTP';

				lang.txtDica = '* Campos obrigatórios.';
				break;
		}




		return this.each(function(){

			if( !settings.token || settings.token == '' ){
				$(this).html('<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Error ef-0001: Token unspecified.</div>');
				return false;
			}
			if( !settings.secret || settings.secret == '' ){
				$(this).html('<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Error ef-0002: Secret unspecified.</div>');
				return false;
			}
			if( !settings.urlRequest || settings.urlRequest == '' ){
				$(this).html('<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Error ef-0003: urlRequest unspecified.</div>');
				return false;
			}

			if( settings.modal == true ){

				$('#integration_form').replaceWith( '<a href="#ef-modal" id="integration_form" role="button" class="btn btn-primary" data-toggle="modal">'+settings.nameButtonModal+'</a> <div class="modal fade" id="ef-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">'+settings.title+'</h4> </div> <div class="modal-body">'+initLayout()+'</div> </div> </div> </div>' );

				$('#ef-modal').on('show.bs.modal', function (event) {
					var modal = $(this);

					var form = $('form#formulario-ef', modal);

					$('legend', form).remove();

					form.submit(function(e){

						e.preventDefault();

						if(validationForm(form)){
							
							$('button[type="submit"]', form).html(lang.nBtnSubmitLoading).attr('disabled', true);

							if(httlRequest(form)){
								$('button[type="submit"]', form).html(lang.nBtnSubmit).removeAttr('disabled');
							}

						}

					});

				});
				
			}else{
				$(this).html(initLayout());

				var form = $('form#formulario-ef');

				form.submit(function(e){

					e.preventDefault();

					if(validationForm(form)){
						
						$('button[type="submit"]', form).html(lang.nBtnSubmitLoading).attr('disabled', true);

						if(httlRequest(form)){
							$('button[type="submit"]', form).html(lang.nBtnSubmit).removeAttr('disabled');
						}

					}

				});
			}

		});

	
		function httlRequest(form){

			if($('select[name="estado"]', form).length){
				var estado = $('select[name="estado"]', form).val()
			}else{
				var estado = '';
			}

			if($('select[name="nivel"]', form).length){
				var nivel = $('select[name="nivel"]', form).val()
			}else{
				var nivel = '';
			}

			var valuesRequest = {
				token : settings.token,
				secret : settings.secret,

				lead : {
					name : $('input[name="nome"]', form).val(),
					email : $('input[name="email"]', form).val(),
					estado : estado,
					nivel : nivel
				}
			};

			$.ajax({
				type        : 'POST',
				url         : settings.urlRequest,
				data        : valuesRequest,
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',

				success : function(response){
					console.log("HTTP Status 200: Sucesso!");

					form.get(0).reset();

					$('.ef-alertas', form).html('<div class="alert alert-success alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> '+lang.txtSuccess+' </div>');
				},

				error : function(jqXHR, textStatus, errorThrown) {
					if(jqXHR.status == 500){
						console.log("HTTP Status 500: Erro!");

						$('.ef-alertas', form).html('<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> '+lang.txtError500+' </div>');
					}else{
						console.log("HTTP Status "+jqXHR.status+": Outro erro!");

						$('.ef-alertas', form).html('<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> '+lang.txtOtherError+' </div>');
					}
				}

			});
			return true;

		}


		function validationForm(form){

			$('input[name="nome"], input[name="email"]', form).parent().removeClass('has-error');

			var nome = $('input[name="nome"]', form).val();
			if(nome == ''){
				$('input[name="nome"]', form).parent().addClass('has-error');
				$('input[name="nome"]', form).focus();
				return false;
			}

			var email = $('input[name="email"]', form).val();
			if(email == '' || !checkMail(email)){
				$('input[name="email"]', form).parent().addClass('has-error');
				$('input[name="email"]', form).focus();
				return false;
			}

			return true;

		}

		function initLayout(){

			var contentLayout = '<form class="ef-form" id="formulario-ef"> <fieldset class="ef-fieldset">';

			contentLayout += '<legend class="ef-legend-fieldset">'+settings.title+'</legend>';


			contentLayout += '<div class="form-group"> <label class="ef-label-campo" for="ef-inputNome">'+lang.titleCampoNome+' *</label> <input id="ef-inputNome" class="form-control ef-input-nome" type="text" name="nome" placeholder="'+lang.phCampoNome+'" autofocus> </div>';

			contentLayout += '<div class="form-group"> <label class="ef-label-campo" for="ef-inputEmail">'+lang.titleCampoEmail+' *</label> <input id="ef-inputEmail" class="form-control ef-input-email" type="email" name="email" placeholder="'+lang.phCampoEmail+'"> </div>';

			contentLayout += '<div class="row">';

			if( settings.fields.estado || settings.fields.estado != '' ){
				contentLayout += '<div class="col-xs-3"> <label class="ef-label-campo" for="ef-selectStates">'+lang.titleSelectEstado+'</label> <select class="form-control ef-select-estados" id="ef-selectStates" name="estado">';
					var estados = settings.fields.estado;
					for (var i in estados){
						contentLayout += '<option value="'+estados[i]+'">'+estados[i]+'</option>';
					}
				contentLayout += '</select> </div>';
			}

			if( settings.fields.nivel || settings.fields.nivel != '' ){
				contentLayout += '<div class="col-xs-4"> <label class="ef-label-campo" for="ef-selectLevels">'+lang.titleSelectNivel+'</label> <select class="form-control ef-select-niveis" id="ef-selectLevels" name="nivel">';
					var niveis = settings.fields.nivel;
					for (var i in niveis){
						contentLayout += '<option value="'+niveis[i]+'">'+niveis[i]+'</option>';
					}
				contentLayout += '</select> </div>';
			}

			contentLayout += '<div class="col-xs-3 pull-right"> <button type="submit" class="btn btn-success pull-right ef-btn-submit clearfix">'+lang.nBtnSubmit+'</button>  </div>';

			contentLayout += '</div> <div class="form-group"> <span id="helpBlock" class="help-block ef-dica">'+lang.txtDica+'</span> </div>';


			contentLayout += '</fieldset> <div class="ef-alertas"></div> </form>';

			return contentLayout;

		}

		function checkMail(mail){
			var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
			if(typeof(mail) == "string"){
				if(er.test(mail)){ return true; }
			}else if(typeof(mail) == "object"){
				if(er.test(mail.value)){ 
					return true; 
				}
			}else{
				return false;
			}
		}

	};

})(jQuery);



