$(document).ready(function() {

    var data = [
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
      { "NIM": "00000000001", "nama": "Admin", "alamat": "Tangerang" },
    ];

    var alertTime = new Date();

    function showAlert() {
        var x = document.getElementById("customAlert");
        x.style.display = "block";
        document.getElementById("alertTime").innerHTML = "Just now~";
        alertTime = new Date();
    }
    
    $(document).ready(function() {
        $('.alert').alert();
    });
    
    setInterval(function() {
        var now = new Date();
        var diff = Math.floor((now - alertTime) / 1000);
        if (diff < 60) {
            document.getElementById("alertTime").innerHTML = diff + " seconds ago~";
        } else {
            var minutes = Math.floor(diff / 60);
            document.getElementById("alertTime").innerHTML = minutes + " minutes ago~";
        }
    }, 5000);

    var table = $("#datatable").DataTable({
        data: data,
        columns: [
            { data: 'NIM' },
            { data: 'nama' },
            { data: 'alamat' },
            { 
                data: null,
                render: function ( data, type, row, meta ) {
                    return '<button type="button" class="btn btn-primary editButton" data-index="' + meta.row + '">Ubah</button>' + 
                           '<button type="button" class="btn btn-danger deleteButton" data-index="' + meta.row + '">Hapus</button>';
                }
            }
        ],
        dom: 'ltrip'
    });

    $('#addButton').click(function() {
        var NIM = $('#inputNIM').val().trim();
        var nama = $('#inputnama').val().trim();
        var alamat = $('#inputalamat').val().trim();
    
        if(!NIM || !nama || !alamat){
            alert('Tolong isi semua form');
            return;
        }
    
        data.push({NIM: NIM, nama: nama, alamat: alamat});
        table.clear().rows.add(data).draw();
        showAlert();
    
        $('#inputNIM').val('');
        $('#inputnama').val('');
        $('#inputalamat').val('');
    
    });

    $('body').on('click', '.deleteButton', function(){
        var index = $(this).data('index'); 
        data.splice(index, 1);
        table.clear().rows.add(data).draw();
    });
    

    $('.btn-warning').click(function() {
        $('#inputNIM').val('');
        $('#inputnama').val('');
        $('#inputalamat').val('');
    });

    var indexToEdit;  

    $('body').on('click', '.editButton', function(){
        indexToEdit = $(this).data('index');  
        var item = data[indexToEdit];
    
        $('#NIM').val(item.NIM);
        $('#nama').val(item.nama);
        $('#alamat').val(item.alamat);
        $('#editModal').modal('show');
    });
    
    $('#savedata').click(function(){
        var item = data[indexToEdit];  
    
        item.NIM = $('#NIM').val().trim(); 
        item.nama = $('#nama').val().trim();
        item.alamat = $('#alamat').val().trim();
    
        if(!item.NIM || !item.nama || !item.alamat){
            alert('Tolong jangan kosongkan data');
            return;
        }
    
        $('#editModal').modal('hide');
        table.clear().rows.add(data).draw();
    });
});