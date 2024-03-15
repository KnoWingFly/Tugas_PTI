$(document).ready(function() {

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
    var alertTime = new Date();

    function showAlert() {
        $('#myAlert').slideDown();
    }
    
    $(document).ready(function() {
        $('.closeBtn').on('click', function() {
            $(this).closest('.alert').slideUp();
        });
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
   /*----------------------------------------------------------------Add table Functions----------------------------------------------------------------*/
    var table = $("#datatable").DataTable({
        data: data,
        columns: [
            { data: 'NIM' },
            { data: 'nama' },
            { data: 'alamat' },
            { 
                data: null,
                render: function ( data, type, row, meta ) {
                    return '<button type="button" class="btn btn-primary editButton" data-index="'
                     + meta.row +'"><img src="asset/pencil-square.svg" style="filter: invert(1);"/> Ubah</button>' + "     " +
                    '<button type="button" class="btn btn-danger deleteButton" data-index="' + meta.row + '"><img src="asset/eraser-fill.svg" style="filter: invert(1);"/> Hapus</button>';
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
    
    $('.btn-warning').click(function() {
        $('#inputNIM').val('');
        $('#inputnama').val('');
        $('#inputalamat').val('');
    });

    /*----------------------------------------------------------------Edit & Delete Functions----------------------------------------------------------------*/
    $('body').on('click', '.deleteButton', function(){
        var index = $(this).data('index'); 
        data.splice(index, 1);
        table.clear().rows.add(data).draw();
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
    
    /*----------------------------------------------------------------Save Edit data Functions----------------------------------------------------------------*/
    $('#savedata').click(function(){
        var item = data[indexToEdit];  

        item.nama = $('#nama').val().trim();
        item.alamat = $('#alamat').val().trim();
    
        if(!item.NIM || !item.nama || !item.alamat){
            alert('Tolong jangan kosongkan data');
            return;
        }
    
        $('#editModal').modal('hide');
        table.clear().rows.add(data).draw();
    });


   /*----------------------------------------------------------------Time Functions----------------------------------------------------------------*/
    function Time(){
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();

        var period = "";

        if(h >= 12){
            period = "PM";
        }
        else{
            period = "AM";
        }

        if(h > 12){
            h = h - 12;
        }
        else if(h == 0){
            h = 12;
        }

        h = update(h);
        m = update(m);
        s = update(s);

        document.getElementById('clock').innerText = h + " : " + m + " : " + s + " : " + period;

        setTimeout(Time, 1000);
    }

    function update(t){
        if(t < 10){
            return "0" + t;
        }
        else {
            return t;
        }
    }

    Time();
});