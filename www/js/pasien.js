var idpsn;
var Application = {
	initPasien: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowPsn();
		})
		$(document).on('click', "#detail", function () {
			var id = $(this).data('id');
			Application.initShowDetailPsn(id);
		})
		$(document).on('pageinit', '#page-three', function () {
			console.log('initthree')
			$('#form_pasien').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.addPsn();
				$('#form_pasien').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});
			});
		})
		$(document).on('click', "#del_btn", function () {
			Application.deletePsn(idpsn);
		})
		$(document).on('click', "#edit_btn", function () {
			$.mobile.changePage("#page-four");
			$('#eform_pasien').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.editPsn(idpsn);
				$('#eform_pasien').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});
			})
		})
	},

	initShowPsn: function () {
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
				var appendList = '';
				$('#list-psn').empty();
				data.forEach(row => {
					appendList = '<li><a href=#page-two?id="' +
						row.ID + '" target="_self" id="detail" data-id="' +
						row.ID + '"><h2>' + row.nama_pasien + '</h2><p>ID: ' + row.ID +
						'</p><p>No. Telepon: ' + row.no_telp + '</p></a></li>';
					$('#list-psn').append(appendList);
					$('#list-psn').listview('refresh');
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailPsn: function (id) {
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
				data.forEach(row => {
					if (row.ID == id) {
						idpsn=row.ID
						$('#p-ID,#p-nama_pasien,#p-jenis_kelamin,#p-alamat,#p-no_telp, #p-umur, #p-berat_badan,#p-tinggi_badan,#p-golongan_darah').empty();
						$('#p-ID').append('<b>ID Pasien: </b>' + row.ID);
						$('#p-nama_pasien').append('<b>Nama: </b>' + row.nama_pasien);
						$('#p-jenis_kelamin').append('<b>Jenis Kelamin: </b>' + row.jenis_kelamin);
						$('#p-alamat').append('<b>Alamat: </b>' + row.alamat);
						$('#p-no_telp').append('<b>No. Telepon: </b>' + row.no_telp);
						$('#p-umur').append('<b>Umur: </b>' + row.umur) + ' tahun';
						$('#p-berat_badan').append('<b>Berat Badan: </b>' + row.berat_badan + ' kg');
						$('#p-tinggi_badan').append('<b>Tinggi Badan: </b>' + row.tinggi_badan + ' cm');
						$('#p-golongan_darah').append('<b>Golongan Darah: </b>' + row.golongan_darah);
					}
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	addPsn: function () {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/add_pasien.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/add_pasien.php',
			type: 'POST',
			async: 'true',
			data: {
				nama: $('#nama').val(),
				select_jk: $("select#select-jk option").filter(":selected").val(),
				alamat: $('#alamat').val(),
				no_telp: $('#no_telp').val(),
				umur: $('#umur').val(),
				bb: $('#bb').val(),
				tb: $('#tb').val(),
				gd: $("select#select-gd option").filter(":selected").val()
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
				Application.initShowPsn();
			}
		})
	},
	deletePsn: function(idpsn){
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/delete_pasien.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/delete_pasien.php',
			type: 'POST',
			async: 'true',
			data: {
				id: idpsn
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
				Application.initShowPsn();
			}
		})
	},

	editPsn: function (psn) {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/edit_pasien.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/edit_pasien.php',
			type: 'POST',
			async: 'true',
			data: {
				id: psn,
				nama: $('#enama').val(),
				select_jk: $("select#eselect-jk option").filter(":selected").val(),
				alamat: $('#ealamat').val(),
				no_telp: $('#eno_telp').val(),
				umur: $('#eumur').val(),
				bb: $('#ebb').val(),
				tb: $('#etb').val(),
				gd: $("select#eselect-gd option").filter(":selected").val()
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
				Application.initShowPsn();
			}
		})
	},
}