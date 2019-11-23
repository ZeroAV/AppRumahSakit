var nipdok;
var Application = {
	initDokter: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowDok();
		})
		$(document).on('click', "#detail", function () {
			var nip = $(this).data('nip');
			Application.initShowDetailDok(nip);
		})
		$(document).on('pageinit', '#page-three', function () {
			console.log('initthree')
			$('#form_dokter').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.addDok();
				$('#form_dokter').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});
			});
		})
		$(document).on('click', "#del_btn", function () {
			Application.deleteDok(nipdok);
		})
		$(document).on('click', "#edit_btn", function () {
			$.mobile.changePage("#page-four");
			$('#eform_dokter').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.editDok(nipdok);
				$('#eform_dokter').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});
			})
		})
	},

	initShowDok: function () {
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
				var appendList = '';
				$('#list-dok').empty();
				data.forEach(row => {
					appendList = '<li><a href=#page-two?nip="' +
						row.NIP + '" target="_self" id="detail" data-nip="' +
						row.NIP + '"><h2>' + row.nama + '</h2><p>NIP: ' + row.NIP +
						'</p><p>No. Telepon: ' + row.no_telp + '</p></a></li>';
					$('#list-dok').append(appendList);
					$('#list-dok').listview('refresh');
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailDok: function (nip) {
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
				data.forEach(row => {
					if (row.NIP == nip) {
						nipdok=row.NIP;
						$('#p-NIP,#p-nama,#p-jenis_kelamin,#p-alamat,#p-no_telp,#p-gaji_pokok').empty();
						$('#p-NIP').append('<b>NIP: </b>' + row.NIP);
						$('#p-nama').append('<b>Nama: </b>' + row.nama);
						$('#p-jenis_kelamin').append('<b>Jenis Kelamin: </b>' + row.jenis_kelamin);
						$('#p-alamat').append('<b>Alamat: </b>' + row.alamat);
						$('#p-no_telp').append('<b>No. Telepon: </b>' + row.no_telp);
						$('#p-gaji_pokok').append('<b>Gaji Pokok:</b> Rp.' + row.gaji_pokok);
					}
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	addDok: function () {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/add_dokter.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/add_dokter.php',
			type: 'POST',
			async: 'true',
			data: {
				nip: $('#nip').val(),
				nama: $('#nama').val(),
				select_jk: $("select#select-jk option").filter(":selected").val(),
				alamat: $('#alamat').val(),
				no_telp: $('#no_telp').val(),
				gaji_pokok: $('#gaji_pokok').val()
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
				Application.initShowDok();
			}
		})
	},

	deleteDok: function(n){
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/delete_dokter.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/delete_dokter.php',
			type: 'POST',
			async: 'true',
			data: {
				nip: n
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
				Application.initShowDok();
			}
		})
	},

	editDok: function (dok) {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/edit_dokter.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/edit_dokter.php',
			type: 'POST',
			async: 'true',
			data: {
				nip: dok,
				nama: $('#enama').val(),
				select_jk: $("select#eselect-jk option").filter(":selected").val(),
				alamat: $('#ealamat').val(),
				no_telp: $('#eno_telp').val(),
				gaji_pokok: $('#egaji_pokok').val()
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
				Application.initShowDok();
			}
		})
	},
}