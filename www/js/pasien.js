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
			url: 'https://secret-ocean-63858.herokuapp.com/read_pasien.php',
			type: 'get',
			beforeSend: function(){
				$.mobile.loading('show',{
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function(dataObject){
				let data = JSON.parse(dataObject);
				var appendList = '';
				data.forEach(row=>{
					appendList= '<li><a href=#page-two?id="'+
					row.ID+'" target="_self" id="detail" data-id="'+
					row.ID+'"><h2>'+row.nama_pasien+'</h2><p>ID: '+row.ID+
					'</p><p>No. Telepon: '+row.no_telp+'</p></a></li>';
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
			url: 'https://secret-ocean-63858.herokuapp.com/read_pasien.php',
			type: 'get',
			beforeSend: function(){
				$.mobile.loading('show',{
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function(dataObject){
				let data = JSON.parse(dataObject);
				data.forEach(row=>{
					if(row.ID==id){
						$('#p-ID,#p-nama_pasien,#p-jenis_kelamin,#p-alamat,#p-no_telp, #p-umur, #p-berat_badan,#p-tinggi_badan,#p-golongan_darah').empty();
						$('#p-ID').append('<b>NIP: </b>'+row.ID);
						$('#p-nama_pasien').append('<b>Nama: </b>'+row.nama_pasien);
						$('#p-jenis_kelamin').append('<b>Jenis Kelamin: </b>'+row.jenis_kelamin);
						$('#p-alamat').append('<b>Alamat: </b>'+row.alamat);
						$('#p-no_telp').append('<b>No. Telepon: </b>'+row.no_telp);
						$('#p-umur').append('<b>Umur: </b>'+row.umur)+' tahun';
						$('#p-berat_badan').append('<b>Berat Badan: </b> Rp.'+row.berat_badan)+' kg';
						$('#p-tinggi_badan').append('<b>Tinggi Badan: </b>'+row.alamat)+' cm';
						$('#p-golongan_darah').append('<b>Golongan Darah: </b>'+row.golongan_darah);
					}
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	}
}