$(document).ready(function() {
    var data = [
        {"NIM" : "00000000001", "nama": "Admin", "alamat": "Tangerang"},
    ];

    function updatetable(data){
        var table = $("#tablebody");
        table.empty(); 

        for(var i=0; i < data.length; i++){
            var item = data[i];
            var row = `<tr>
                        <td>${item.NIM}</td>
                        <td>${item.nama}</td>
                        <td>${item.alamat}</td>
                        <td> <button type="button" class="btn btn-primary editButton" data-index="${i}">Ubah</button>  
                             <button type="button" class="btn btn-danger deleteButton">Hapus</button>
                        </td>
                        </tr>`;
            table.append(row);
        }
    }

    $('#addButton').click(function() {
        var NIM = $('#inputNIM').val().trim();
        var nama = $('#inputnama').val().trim();
        var alamat = $('#inputalamat').val().trim();

        if(!NIM || !nama || !alamat){
            alert('Tolong isi semua form');
            return;
        }

        data.push({NIM: NIM, nama: nama, alamat: alamat});
        updatetable(data); 

        $('#inputNIM').val('');
        $('#inputnama').val('');
        $('#inputalamat').val('');
    });

    $('body').on('click', '.deleteButton', function(){
        var index = $(this).closest('tr').index(); 
        data.splice(index, 1);
        updatetable(data); 
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

        data[indexToEdit].NIM = $('#NIM').val().trim();; 
        data[indexToEdit].nama = $('#nama').val().trim();;
        data[indexToEdit].alamat = $('#alamat').val().trim();

        if(!data[indexToEdit].NIM || !data[indexToEdit].nama || !data[indexToEdit].alamat){
            alert('Tolong jangan kosongkan data');
            return;
        }

        $('#editModal').modal('hide');
        updatetable(data);
    });


    updatetable(data);
});
