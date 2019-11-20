var Application = {
	initTrx: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowTrx();
			Application.initShowTrxChoices();
		})
		$(document).on('click', "#detail", function () {
			var no = $(this).data('no');
			Application.initShowDetailTrx(no);
		})

	},

	initShowTrx: function () {
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
				dataObject.transaksi.forEach(dataObject=>{
					appendList= '<li><a href=#page-two?no="'+
					dataObject.no_transaksi+'" target="_self" id="detail" data-no="'+
					dataObject.no_transaksi+'"><h2>'+dataObject.no_transaksi+'</h2><p>ID Pasien: '+dataObject.id_pasien+
					'</p><p>NIP Dokter: '+dataObject.nip_dokter+'</p></a></li>';
					$('#list-trx').append(appendList);
					$('#list-trx').listview('refresh');
				})
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailTrx: function (no) {
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
				var no_transaksi, id_pasien, nama_pasien, nip_dokter, nama_dokter, kode_penyakit, nama_penyakit, biaya_perawatan;
				dataObject.transaksi.forEach(dataObject=>{
					if(dataObject.no_transaksi==no){
						no_transaksi = dataObject.no_transaksi;
						id_pasien = dataObject.id_pasien;
						nip_dokter = dataObject.nip_dokter;
						kode_penyakit = dataObject.kode_penyakit;
						biaya_perawatan = dataObject.biaya_perawatan;
					}
				})
				dataObject.pasien.forEach(dataObject=>{
					if(dataObject.ID==id_pasien){
						nama_pasien = dataObject.nama_pasien;
					}
				})
				dataObject.dokter.forEach(dataObject=>{
					if(dataObject.NIP==nip_dokter){
						nama_dokter = dataObject.nama;
					}
				})
				dataObject.penyakit.forEach(dataObject=>{
					if(dataObject.kode_penyakit==kode_penyakit){
						nama_penyakit = dataObject.nama_penyakit;
					}
					
				})
				$('#p-no_transaksi,#p-id_pasien,#p-nama_pasien,#p-nip_dokter,#p-nama_dokter,#p-kode_penyakit,#p-nama_dokter,#p-biaya_perawatan').empty();
				$('#p-no_transaksi').append('<b>No. Transaksi: </b>'+no_transaksi);
				$('#p-id_pasien').append('<b>ID Pasien: </b>'+id_pasien);
				$('#p-nama_pasien').append('<b>Nama Pasien: </b>'+nama_pasien);
				$('#p-nip_dokter').append('<b>NIP Dokter: </b>'+nip_dokter);
				$('#p-nama_dokter').append('<b>Nama Dokter: </b>'+nama_dokter);
				$('#p-kode_penyakit').append('<b>Kode Penyakit: </b>'+kode_penyakit);
				$('#p-nama_penyakit').append('<b>Nama Penyakit: </b>'+nama_penyakit);
				$('#p-biaya_perawatan').append('<b>Biaya perawatan: </b>Rp. '+biaya_perawatan);
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	},
	
	initShowTrxChoices: function () {
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
				var pasien, dokter, penyakit;
				$('#select-psn,#select-dok,#select-pyk').empty();
				dataObject.pasien.forEach(dataObject=>{
					$('#select-psn').append($('<option>').text(dataObject.ID).attr('value', dataObject.ID));
				})
				dataObject.dokter.forEach(dataObject=>{
					$('#select-dok').append($('<option>').text(dataObject.NIP).attr('value', dataObject.NIP));
				})
				dataObject.penyakit.forEach(dataObject=>{
					$('#select-pyk').append($('<option>').text(dataObject.kode_penyakit).attr('value', dataObject.kode_penyakit));
				})
				
			},
			
			complete: function(){
				$.mobile.loading('hide');
			}
		});
	},
}