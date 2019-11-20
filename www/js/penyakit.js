var Application = {
	initPenyakit: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowPenyakit();
		})
		$(document).on('click', "#detail", function () {
			var kode = $(this).data('kode');
			Application.initShowDetailPenyakit(kode);
		})
	},

	initShowPenyakit: function () {
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
				dataObject.penyakit.forEach(dataObject=>{
					appendList= '<li><a href=#page-two?kode="'+
					dataObject.kode_penyakit+'" target="_self" id="detail" data-kode="'+
					dataObject.kode_penyakit+'"><h2>'+dataObject.nama_penyakit+'</h2><p>Kode: '+dataObject.kode_penyakit+
					'</p><p>Golongan: '+dataObject.golongan+'</p></a></li>';
					$('#list-pyk').append(appendList);
					$('#list-pyk').listview('refresh');
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailPenyakit: function (kode) {
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
				dataObject.penyakit.forEach(dataObject=>{
					if(dataObject.kode_penyakit==kode){
						$('#p-kode_penyakit,#p-nama_penyakit,#p-golongan').empty();
						$('#p-kode_penyakit').append('<b>Kode Penyakit: </b>'+dataObject.kode_penyakit);
						$('#p-nama_penyakit').append('<b>Nama Penyakit: </b>'+dataObject.nama_penyakit);
						$('#p-golongan').append('<b>Jenis Kelamin: </b>'+dataObject.golongan);
					}
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	}
}