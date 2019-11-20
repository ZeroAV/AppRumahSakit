var Application = {
	initDokter: function () {
		$(window).load('pageinit', '#page-one', function () {
			Application.initShowDok();
		})
		$(document).on('click', "#detail", function () {
			var nip = $(this).data('nip');
			Application.initShowDetailDok(nip);
		})
		/*var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
		if (activePage.attr('id') === 'page-three') {
			$(document).on('click', '#submit', function () { // catch the form's submit event
				if ($('#nip').val().length > 0 && $('#nama').val().length > 0 && $('#alamat').val().length > 0 && $('#no_telp').val().length > 0 && $('#gaji_pokok').val().length > 0) {
					Application.addDokter();
				} else {
					alert('Please fill all necessary fields');
				}
				return false; // cancel original event to prevent form submitting
			});
		} else if(activePage.attr('id') === 'page-two'){
			$(document).on('click', '#del_btn', function () {
				Application.deleteDokter();
			});
		}
		$('#form_dokter').validate({
			rules: {
				nip: {
					required: true
				},
				nama: {
					required: true
				},
				alamat: {
					required: true
				},
				no_telp: {
					required: true
				},
				gaji_pokok: {
					required: true
				}
			},
			messages: {
				nip: {
					required: "Masukkan NIP anda"
				},
				nama: {
					required: "Masukkan nama anda"
				},
				alamat: {
					required: "Masukkan alamat anda"
				},
				no_telp: {
					required: "Masukkan no. telepon anda"
				},
				gaji_pokok: {
					required: "Masukkan gaji pokok anda"
				}
			},
			errorPlacement: function (error, element) {
				error.appendTo(element.parent().prev());
			},
			submitHandler: function (form) {
				$(':mobile-pagecontainer').pagecontainer('change', '#success', {
					reload: false
				});
				return false;
			}
		})*/
	},

	initShowDok: function () {
		$.ajax({
			url: 'https://vast-cliffs-90191.herokuapp.com/php/read_dokter.php',
			type: 'get',
			headers: { "Accept-Encoding": "gzip" },
			beforeSend: function () {
				$.mobile.loading('show', {
					text: 'Please wait while retrieving data...',
					textVisible: true
				});
			},

			success: function (dataObject) {
				let data = JSON.parse(dataObject);
				var appendList = '';
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
			headers: { "Accept-Encoding": "gzip" },
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
						$('#p-NIP,#p-nama,#p-jenis_kelamin,#p-alamat,#p-no_telp,#p-gaji_pokok').empty();
						$('#p-NIP').append('<b>NIP: </b>' + row.NIP);
						$('#p-nama').append('<b>Nama: </b>' + row.nama);
						$('#p-jenis_kelamin').append('<b>Jenis Kelamin: </b>' + row.jenis_kelamin);
						$('#p-alamat').append('<b>Alamat: </b>' + row.alamat);
						$('#p-no_telp').append('<b>No. Telepon: </b>' + row.no_telp);
						$('#p-gaji_pokok').append('<b>Gaji Pokok:</b> Rp.' + row.gaji_pokok);
						$('#edit').append('<a href=php/edit_dokter.php?nip='+row.NIP+' class="ui-btn ui-icon-edit ui-btn-icon-left" id="edit_btn">Edit</a>');
						$('#delete').append('<a href=php/delete_dokter.php?nip='+row.NIP+' class="ui-btn ui-icon-delete ui-btn-icon-left" id="del_btn">Delete</a>');
					}
				})
			},

			complete: function () {
				$.mobile.loading('hide');
			}
		});
	},

	addDokter: function(){
		
	},

	deleteDokter: function(){
		
	}
}