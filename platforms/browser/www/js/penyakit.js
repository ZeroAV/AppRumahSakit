var kodepyk;
var Application = {
	initPenyakit: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowPenyakit();
		})
		$(document).on('click', "#detail", function () {
			var kode = $(this).data('kode');
			$(document).on('pageinit', '#page-two', function () {
				Application.initShowDetailPenyakit(kode);
			})
		})
		$(document).on('pageinit', '#page-three', function () {
			console.log('initthree')
			$('#form_penyakit').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.addPenyakit();
				$('#form_penyakit').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});
			});
		})
		$(document).on('click', "#del_btn", function () {
			Application.deletePenyakit(kodepyk);
		})
		$(document).on('click', "#edit_btn", function () {
			$.mobile.changePage("#page-four");
			console.log('initfour')
			$('#eform_penyakit').submit(function (e) {
				e.preventDefault();
				console.log('submit');
				Application.editPenyakit(kodepyk);
				$('#eform_penyakit').ajaxComplete(function (e) {
					e.preventDefault();
					console.log('ajaxcom')
					return;
				});

			})
		})
	},

	initShowPenyakit: function () {
		$.ajax({
			// url: 'https://api.jsonbin.io/b/5dd3e9103da40e6f298c2ff8',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_penyakit.php',
			//url: 'http://localhost/rumahsakit/www/php/read_penyakit.php',
			type: 'get',
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				console.log(JSON.parse(dataObject));
				// return
				let data = JSON.parse(dataObject);
				var appendList = '';
				$('#list-pyk').empty();
				data.forEach(row => {
					appendList = '<li><a href=#page-two?kode="' +
						row.kode_penyakit + '" target="_self" id="detail" data-kode="' +
						row.kode_penyakit + '"><h2>' + row.nama_penyakit + '</h2><p>Kode: ' + row.kode_penyakit +
						'</p><p>Golongan: ' + row.golongan + '</p></a></li>';
					$('#list-pyk').append(appendList);
					$('#list-pyk').listview('refresh');
				})
			},

			failed: function (res) {
				console.log("halo")
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailPenyakit: function (kode) {
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
				data.forEach(row => {
					if (row.kode_penyakit == kode) {
						kodepyk = row.kode_penyakit;
						$('#p-kode_penyakit,#p-nama_penyakit,#p-golongan').empty();
						$('#p-kode_penyakit').append('<b>Kode Penyakit: </b>' + row.kode_penyakit);
						$('#p-nama_penyakit').append('<b>Nama Penyakit: </b>' + row.nama_penyakit);
						$('#p-golongan').append('<b>Golongan: </b>' + row.golongan);
					}
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	addPenyakit: function () {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/add_penyakit.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/add_penyakit.php',
			type: 'POST',
			async: 'true',
			data: {
				kode: $('#kode').val(),
				nama: $('#nama').val(),
				select_gol: $("select#select-gol option").filter(":selected").val()
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
				Application.initShowPenyakit();
			}
		})
	},

	deletePenyakit: function (pyk) {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/delete_penyakit.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/delete_penyakit.php',
			type: 'POST',
			async: 'true',
			data: {
				kode: pyk
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
				Application.initShowPenyakit();
			}
		})
	},

	/*initShowEditPenyakit: function (kode) {
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
				$('#enama').val("");
				$('#eselect-gol').empty();
				data.forEach(row => {
					if (row.kode_penyakit == kode) {
						kodepyk = row.kode_penyakit;
						$('#enama').attr('value', row.nama_penyakit);
						$('#eselect-gol').append($('<option>').text(row.golongan).attr('value', row.golongan));
					}
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},*/

	editPenyakit: function (pyk) {
		$.ajax({
			//url: 'http://localhost/rumahsakit/www/php/edit_penyakit.php',
			url: 'https://vast-cliffs-90191.herokuapp.com/php/edit_penyakit.php',
			type: 'POST',
			async: 'true',
			data: {
				kode: pyk,
				nama: $('#enama').val(),
				select_gol: $("select#eselect-gol option").filter(":selected").val()
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
				Application.initShowPenyakit();
			}
		})
	},
}