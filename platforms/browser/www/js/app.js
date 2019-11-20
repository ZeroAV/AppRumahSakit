var Application = {
	initDokter: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowDok();
		})
		$(document).on('click', "#detail-dok", function () {
			var nip = $(this).data('nip');
			Application.initShowDetailDok(nip);
		})
	},

	initShowDok: function () {
		$.ajax({
			url: 'https://api.myjson.com/bins/1039bu',
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
					appendList= '<li><a href=#page-two?id="'+
					dataObject.NIP+'" target="_self" id="detail-dok" data-nip="'+
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
			url: 'https://api.myjson.com/bins/1039bu',
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