var Application = {
	initDokter: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowDok();
		})
		$(document).on('click', "#detail", function () {
			var nip = $(this).data('nip');
			Application.initShowDetailDok(nip);
		})
		$('#form_dokter').validate({
			rules: {
				nip: {
					required: true
				},
				nama: {
					required: true
				},
				alamat: {
					required: true
				},
				no_telp: {
					required: true
				},
				gaji_pokok: {
					required: true
				}
			},
			messages: {
				nip: {
					required: "Masukkan NIP anda"
				},
				nama: {
					required: "Masukkan nama anda"
				},
				alamat: {
					required: "Masukkan alamat anda"
				},
				no_telp: {
					required: "Masukkan no. telepon anda"
				},
				gaji_pokok: {
					required: "Masukkan gaji pokok anda"
				}
			},
			errorPlacement: function (error, element) {
				error.appendTo(element.parent().prev());
			},
			submitHandler: function (form) {
				$(':mobile-pagecontainer').pagecontainer('change', '#success', {
					reload: false
				});
				return false;
			}
		})
	},

	initShowDok: function () {
		$.ajax({
			url: 'https://api.jsonbin.io/b/5dd3ead22e22356f234e3d7f',
			type: 'get',
			beforeSend: function(){
				$.mobile.loading('show',{
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function(dataObject){
				var appendList = '';
				dataObject.dokter.forEach(dataObject=>{
					appendList= '<li><a href=#page-two?nip="'+
					dataObject.NIP+'" target="_self" id="detail" data-nip="'+
					dataObject.NIP+'"><h2>'+dataObject.nama+'</h2><p>NIP: '+dataObject.NIP+
					'</p><p>No. Telepon: '+dataObject.no_telp+'</p></a></li>';
					$('#list-dok').append(appendList);
					$('#list-dok').listview('refresh');
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailDok: function (nip) {
		$.ajax({
			url: 'https://api.jsonbin.io/b/5dd3ead22e22356f234e3d7f',
			type: 'get',
			beforeSend: function(){
				$.mobile.loading('show',{
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function(dataObject){
				dataObject.dokter.forEach(dataObject=>{
					if(dataObject.NIP==nip){
						$('#p-NIP,#p-nama,#p-jenis_kelamin,#p-alamat,#p-no_telp,#p-gaji_pokok').empty();
						$('#p-NIP').append('<b>NIP: </b>'+dataObject.NIP);
						$('#p-nama').append('<b>Nama: </b>'+dataObject.nama);
						$('#p-jenis_kelamin').append('<b>Jenis Kelamin: </b>'+dataObject.jenis_kelamin);
						$('#p-alamat').append('<b>Alamat: </b>'+dataObject.alamat);
						$('#p-no_telp').append('<b>No. Telepon: </b>'+dataObject.no_telp);
						$('#p-gaji_pokok').append('<b>Gaji Pokok:</b> Rp.'+dataObject.gaji_pokok);
					}
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	}
}