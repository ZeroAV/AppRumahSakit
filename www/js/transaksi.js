var notrx;
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
		$(document).on('pageinit', '#page-three', function () {
			console.log('initthree')
			Application.initShowTrxChoices();
			$('#form_transaksi').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.addTrx();
				$('#form_transaksi').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});
			});
		})
		$(document).on('click', "#del_btn", function () {
			Application.deleteTrx(notrx);
		})
		$(document).on('click', "#edit_btn", function () {
			$.mobile.changePage("#page-four");
			Application.initShowTrxChoicesEdit();
			$('#eform_transaksi').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.editTrx(notrx);
				$('#eform_transaksi').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});
			})
		})
	},

	initShowTrx: function () {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/read_transaksi.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_transaksi.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				var appendList = '';
				$('#list-trx').empty();
				data.forEach(row => {
					appendList = '<li><a href=#page-two?no="' +
						row.no_transaksi + '" target="_self" id="detail" data-no="' +
						row.no_transaksi + '"><h2>' + row.no_transaksi + '</h2><p>ID Pasien: ' + row.id_pasien +
						'</p><p>NIP Dokter: ' + row.nip_dokter + '</p></a></li>';
					$('#list-trx').append(appendList);
					$('#list-trx').listview('refresh');
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailTrx: function (no) {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/read_transaksi.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_transaksi.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				var no_transaksi, id_pasien, nama_pasien, nip_dokter, nama_dokter, kode_penyakit, nama_penyakit, biaya_perawatan;
				let data = JSON.parse(dataObject);
				data.forEach(row => {
					if (row.no_transaksi == no) {
						no_transaksi = row.no_transaksi;
						notrx = no_transaksi;
						id_pasien = row.id_pasien;
						nip_dokter = row.nip_dokter;
						kode_penyakit = row.kode_penyakit;
						biaya_perawatan = row.biaya_perawatan;
						nama_pasien = row.nama_pasien;
						nama_dokter = row.nama;
						nama_penyakit = row.nama_penyakit;
					}
				})
				$('#p-no_transaksi,#p-id_pasien,#p-nama_pasien,#p-nip_dokter,#p-nama_dokter,#p-kode_penyakit,#p-nama_penyakit,#p-nama_dokter,#p-biaya_perawatan').empty();
				$('#p-no_transaksi').append('<b>No. Transaksi: </b>' + no_transaksi);
				$('#p-id_pasien').append('<b>ID Pasien: </b>' + id_pasien);
				$('#p-nama_pasien').append('<b>Nama Pasien: </b>' + nama_pasien);
				$('#p-nip_dokter').append('<b>NIP Dokter: </b>' + nip_dokter);
				$('#p-nama_dokter').append('<b>Nama Dokter: </b>' + nama_dokter);
				$('#p-kode_penyakit').append('<b>Kode Penyakit: </b>' + kode_penyakit);
				$('#p-nama_penyakit').append('<b>Nama Penyakit: </b>' + nama_penyakit);
				$('#p-biaya_perawatan').append('<b>Biaya perawatan: </b>Rp. ' + biaya_perawatan);
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowTrxChoices: function () {
		Application.initShowTrxChoicesPsn();
		Application.initShowTrxChoicesDok();
		Application.initShowTrxChoicesPyk();
	},

	initShowTrxChoicesDok: function () {
		$.ajax({
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_dokter.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				$('#select-dok').empty();
				data.forEach(row => {
					$('#select-dok').append($('<option>').text(row.NIP).attr('value', row.NIP));
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowTrxChoicesPsn: function () {
		$.ajax({
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_pasien.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				$('#select-psn').empty();
				data.forEach(row => {
					$('#select-psn').append($('<option>').text(row.ID).attr('value', row.ID));
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowTrxChoicesPyk: function () {
		$.ajax({
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_penyakit.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				$('#select-pyk').empty();
				data.forEach(row => {
					$('#select-pyk').append($('<option>').text(row.kode_penyakit).attr('value', row.kode_penyakit));
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowTrxChoicesEdit: function () {
		Application.initShowTrxChoicesPsnE();
		Application.initShowTrxChoicesDokE();
		Application.initShowTrxChoicesPykE();
	},

	initShowTrxChoicesDokE: function () {
		$.ajax({
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_dokter.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				$('#eselect-dok').empty();
				data.forEach(row => {
					$('#eselect-dok').append($('<option>').text(row.NIP).attr('value', row.NIP));
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowTrxChoicesPsnE: function () {
		$.ajax({
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_pasien.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				$('#eselect-psn').empty();
				data.forEach(row => {
					$('#eselect-psn').append($('<option>').text(row.ID).attr('value', row.ID));
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowTrxChoicesPykE: function () {
		$.ajax({
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_penyakit.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				$('#eselect-pyk').empty();
				data.forEach(row => {
					$('#eselect-pyk').append($('<option>').text(row.kode_penyakit).attr('value', row.kode_penyakit));
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	addTrx: function () {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/add_transaksi.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/add_transaksi.php',
			type: 'POST',
			async: 'true',
			data: {
				no: $('#no').val(),
				psn: $("select#select-psn option").filter(":selected").val(),
				dok: $("select#select-dok option").filter(":selected").val(),
				pyk: $("select#select-pyk option").filter(":selected").val(),
				biaya: $('#biaya').val()
			},
			beforeSend: function () {
				console.log("beforesend");
				$.mobile.loading('show', {
					text: 'Adding data...',
					textVisible: true
				});
			},

			success: function () {
				console.log("succ");
				$.mobile.changePage("#page-one");
			},

			error: function (request, error) {
				console.log("error");
				alert('Network error has occurred please try again!');
			},

			failed: function () {
				console.log("salah");
			},

			complete: function () {
				console.log("com");
				$.mobile.loading('hide');
				Application.initShowTrx();
			}
		})
	},

	deleteTrx: function (notrx) {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/delete_transaksi.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/delete_transaksi.php',
			type: 'POST',
			async: 'true',
			data: {
				no: notrx
			},
			beforeSend: function () {
				console.log("beforesend");
				$.mobile.loading('show', {
					text: 'Deleting data...',
					textVisible: true
				});
			},

			success: function () {
				console.log("succ");
				$.mobile.changePage("#page-one");
			},

			error: function (request, error) {
				console.log("error");
				alert('Network error has occurred please try again!');
			},

			failed: function () {
				console.log("salah");
			},

			complete: function () {
				console.log("com");
				$.mobile.loading('hide');
				Application.initShowTrx();
			}
		})
	},

	editTrx: function (no) {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/edit_transaksi.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/edit_transaksi.php',
			type: 'POST',
			async: 'true',
			data: {
				no: no,
				psn: $("select#eselect-psn option").filter(":selected").val(),
				dok: $("select#eselect-dok option").filter(":selected").val(),
				pyk: $("select#eselect-pyk option").filter(":selected").val(),
				biaya: $('#ebiaya').val()
			},
			beforeSend: function () {
				console.log("beforesend");
				$.mobile.loading('show', {
					text: 'Editing data...',
					textVisible: true
				});
			},

			success: function () {
				console.log("succ");
				$.mobile.changePage("#page-one");
			},

			error: function (request, error) {
				console.log("error");
				alert('Network error has occurred please try again!');
			},

			failed: function () {
				console.log("salah");
			},

			complete: function () {
				console.log("com");
				$.mobile.loading('hide');
				Application.initShowTrx();
			}
		})
	},
}