window.onload = function() {
    var myModal = new bootstrap.Modal(document.getElementById('userNameModal'), {});
    myModal.show();

    document.getElementById('saveButton').addEventListener('click', function() {
      var userName = document.getElementById('userName').value;
      document.getElementById('greeting').textContent = 'Hello, ' + userName;
      myModal.hide();
    });
  }
$(document).ready(function () {

    var data = [
        { "NIM": "00000000001", "nama": "Admin1", "alamat": "Tangerang1" },
        { "NIM": "00000000002", "nama": "Admin2", "alamat": "Tangerang2" },
        { "NIM": "00000000003", "nama": "Admin3", "alamat": "Tangerang3" },
        { "NIM": "00000000004", "nama": "Admin4", "alamat": "Tangerang4" },
        { "NIM": "00000000005", "nama": "Admin5", "alamat": "Tangerang5" },
        { "NIM": "00000000006", "nama": "Admin6", "alamat": "Tangerang6" },
        { "NIM": "00000000007", "nama": "Admin7", "alamat": "Tangerang7" },
        { "NIM": "00000000008", "nama": "Admin8", "alamat": "Tangerang8" },
        { "NIM": "00000000009", "nama": "Admin9", "alamat": "Tangerang9" },
        { "NIM": "00000000010", "nama": "Admin10", "alamat": "Tangerang10" },
        { "NIM": "00000000011", "nama": "Admin11", "alamat": "Tangerang11" },
        { "NIM": "00000000012", "nama": "Admin12", "alamat": "Tangerang12" },
        { "NIM": "00000000013", "nama": "Admin13", "alamat": "Tangerang13" },
        { "NIM": "00000000014", "nama": "Admin14", "alamat": "Tangerang14" },
        { "NIM": "00000000015", "nama": "Admin15", "alamat": "Tangerang15" },
    ];

    /*----------------------------------------------------------------Alert Functions----------------------------------------------------------------*/
    function hideAllAlerts() {
        $('#myAlert').hide();
        $('#myWarningAlert').hide();
        $('#myWarningAlert1').hide();
    }
    
    function showAlert() {
        hideAllAlerts();
        $('#myAlert').show();
        alertTime = new Date();
        setTimeout(function() {
            $('#myAlert').hide();
        }, 5000);
    }
    
    function showWarningAlert() {
        hideAllAlerts();
        $('#myWarningAlert1').show();
        warningAlertTime = new Date();
        setTimeout(function() {
            $('#myWarningAlert1').hide();
        }, 5000); 
    }
    
    function showWarningAlert1() {
        hideAllAlerts();
        $('#myWarningAlert').show();
        warningAlertTime = new Date();
        setTimeout(function() {
            $('#myWarningAlert').hide();
        }, 5000); 
    }    
    /*----------------------------------------------------------------Add table Functions----------------------------------------------------------------*/
    var table = $("#datatable").DataTable({
        data: data,
        responsive: true,
        columns: [
            { data: 'NIM' },
            { data: 'nama' },
            { data: 'alamat' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return '<button type="button" class="btn btn-primary editButton" data-index="'
                        + meta.row + '"><img src="Asset/pencil-square.svg" style="filter: invert(1);"/><span class="d-none d-sm-inline"> Ubah</span></button>' + "     " +
                        '<button type="button" class="btn btn-danger deleteButton" data-index="' + meta.row + '"><img src="Asset/eraser-fill.svg" style="filter: invert(1);"/><span class="d-none d-sm-inline"> Hapus</span></button>';
                }
            }
        ],
        dom: 'ltrip'
    });

    $('#addButton').click(function () {
        var NIM = $('#inputNIM').val().trim();
        var nama = $('#inputnama').val().trim();
        var alamat = $('#inputalamat').val().trim();
    
        if (!NIM || !nama || !alamat) {
            showWarningAlert();
            return;
        }
    
        data.push({ NIM: NIM, nama: nama, alamat: alamat });
        table.clear().rows.add(data).draw();
        showAlert();
    
        $('#inputNIM').val('');
        $('#inputnama').val('');
        $('#inputalamat').val('');
    });
    /*----------------------------------------------------------------Edit & Delete Functions----------------------------------------------------------------*/
    $('body').on('click', '.deleteButton', function () {
        var index = $(this).data('index');
        data.splice(index, 1);
        table.clear().rows.add(data).draw();
    });

    var indexToEdit;

    $('body').on('click', '.editButton', function () {
        indexToEdit = $(this).data('index');
        var item = data[indexToEdit];

        $('#NIM').val(item.NIM);
        $('#nama').val(item.nama);
        $('#alamat').val(item.alamat);
        $('#editModal').modal('show');
    });

    /*----------------------------------------------------------------Save Edit data Functions----------------------------------------------------------------*/
    $('#savedata').click(function () {
        var item = data[indexToEdit];
    
        item.nama = $('#nama').val().trim();
        item.alamat = $('#alamat').val().trim();
    
        if (!item.NIM || !item.nama || !item.alamat) {
            showWarningAlert1();
            return;
        }
        $('#deletealert').hide();
        $('#updatealert').show();
        setTimeout(function() {
            $('#updatealert').hide();
        }, 5000);
    
        $('#editModal').modal('hide');
        table.clear().rows.add(data).draw();
    });

    $('#datatable tbody').on('click', '.deleteButton', function () {
        $('#updatealert').hide();
        $('#deletealert').show();
        setTimeout(function() {
            $('#deletealert').hide();
        }, 5000); 
    });

    /*----------------------------------------------------------------Time Functions----------------------------------------------------------------*/
    function Time() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();

        var period = "";

        if (h > 12) {
            h = h;
        }
        else if (h == 0) {
            h = 12;
        }

        h = update(h);
        m = update(m);
        s = update(s);

        document.getElementById('clock').innerText = h + " : " + m + " : " + s  + period;

        setTimeout(Time, 1000);
    }

    function update(t) {
        if (t < 10) {
            return "0" + t;
        }
        else {
            return t;
        }
    }

    Time();
});