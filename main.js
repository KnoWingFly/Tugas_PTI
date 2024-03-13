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
                        <td> <button type="button" class="btn btn-primary editButton" data-index="${i}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                            Ubah
                            </button>  
                            <button type="button" class="btn btn-danger deleteButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
                            </svg>
                            Hapus
                            </button>
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
