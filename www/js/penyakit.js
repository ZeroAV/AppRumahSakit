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
		/*$(document).on('pageinit', '#page-three', function () {
			$('#form_penyakit').submit(function () {
				$.mobile.changePage("#page-one");
				$('#form_penyakit').ajaxComplete(function () {
					return;
				});
			});
			

		})*/
	},

	initShowPenyakit: function () {
		$.ajax({
			// url: 'https://api.jsonbin.io/b/5dd3e9103da40e6f298c2ff8',
			url: 'https://secret-ocean-63858.herokuapp.com/read_penyakit.php',
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
			url: 'https://secret-ocean-63858.herokuapp.com/read_penyakit.php',
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
						$('#p-kode_penyakit,#p-nama_penyakit,#p-golongan').empty();
						$('#p-kode_penyakit').append('<b>Kode Penyakit: </b>' + row.kode_penyakit);
						$('#p-nama_penyakit').append('<b>Nama Penyakit: </b>' + row.nama_penyakit);
						$('#p-golongan').append('<b>Jenis Kelamin: </b>' + row.golongan);
					}
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	/*addPenyakit: function () {
		$('#form_penyakit').submit(function () {
			$.ajax({
				url: 'http://localhost/rumahsakit/www/php/add_penyakit.php',
				//url: 'https://secret-ocean-63858.herokuapp.com/add_penyakit.php',
				type: 'post',
				async: 'true',
				data: {
					formData: $('#form_penyakit').serialize()
				},
				dataType: 'json',
				beforeSend: function () {
					$.mobile.loading('show', {
						text: 'Adding data...',
						textVisible: true
					});
				},

				success: function () {
					console.log($('#form_penyakit').serialize());
					$.mobile.changePage("#page-one");
					Application.initPenyakit();
				},

				error: function (request, error) {
					alert('Network error has occurred please try again!');
				},

				complete: function () {
					$.mobile.loading('hide');
				}
			});
		})

	}*/
}