var data = [
    {"NIM" : "00000000001", "nama": "Admin", "Alamat": "Tangerang"},
];

function updatetable(data){
    var table = document.getElementById("tablebody");
    table.innerHTML = ""; 

    for(var i=0; i < data.length; i++){
        var item = data[i];
        var row = `<tr>
                    <td>${item.NIM}</td>
                    <td>${item.nama}</td>
                    <td>${item.Alamat}</td>
                    <td><button type="button" class="btn btn-primary editButton" data-index="${i}">Ubah</button>  <button type="button" class="btn btn-danger deleteButton">Hapus</button></td>
                    </tr>`;
        table.innerHTML += row;
    }
}

var currentIndex; 

$(document).ready(function(){
    $('body').on('click', '.editButton', function(){
        currentIndex = $(this).data('index'); 
        var item = data[currentIndex];

        $('#NIM').val(item.NIM);
        $('#Nama').val(item.nama);
        $('#alamat').val(item.Alamat);
        $('#editModal').modal('show');
    });

    $('.btn-primary').click(function() {
        data[currentIndex].NIM = $('#NIM').val(); 
        data[currentIndex].nama = $('#Nama').val();
        data[currentIndex].Alamat = $('#alamat').val();
        $('#editModal').modal('hide');
        updatetable(data); 
    });
   
    $('body').on('click', '.deleteButton', function(){
        var index = $(this).closest('tr').index(); 
        data.splice(index, 1);
        updatetable(data); 
    });
});


updatetable(data);
