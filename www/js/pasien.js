var Application = {
	initPasien: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowPsn();
		})
		$(document).on('click', "#detail", function () {
			var id = $(this).data('id');
			Application.initShowDetailPsn(id);
		})
	},

	initShowPsn: function () {
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
				dataObject.pasien.forEach(dataObject=>{
					appendList= '<li><a href=#page-two?id="'+
					dataObject.ID+'" target="_self" id="detail" data-id="'+
					dataObject.ID+'"><h2>'+dataObject.nama_pasien+'</h2><p>ID: '+dataObject.ID+
					'</p><p>No. Telepon: '+dataObject.no_telp+'</p></a></li>';
					$('#list-psn').append(appendList);
					$('#list-psn').listview('refresh');
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailPsn: function (id) {
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
				dataObject.pasien.forEach(dataObject=>{
					if(dataObject.ID==id){
						$('#p-ID,#p-nama_pasien,#p-jenis_kelamin,#p-alamat,#p-no_telp, #p-umur, #p-berat_badan,#p-tinggi_badan,#p-golongan_darah').empty();
						$('#p-ID').append('<b>NIP: </b>'+dataObject.ID);
						$('#p-nama_pasien').append('<b>Nama: </b>'+dataObject.nama_pasien);
						$('#p-jenis_kelamin').append('<b>Jenis Kelamin: </b>'+dataObject.jenis_kelamin);
						$('#p-alamat').append('<b>Alamat: </b>'+dataObject.alamat);
						$('#p-no_telp').append('<b>No. Telepon: </b>'+dataObject.no_telp);
						$('#p-umur').append('<b>Umur: </b>'+dataObject.umur)+' tahun';
						$('#p-berat_badan').append('<b>Berat Badan: </b> Rp.'+dataObject.berat_badan)+' kg';
						$('#p-tinggi_badan').append('<b>Tinggi Badan: </b>'+dataObject.alamat)+' cm';
						$('#p-golongan_darah').append('<b>Golongan Darah: </b>'+dataObject.golongan_darah);
					}
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	}
}