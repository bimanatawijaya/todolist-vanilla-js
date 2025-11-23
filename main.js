document.addEventListener('DOMContentLoaded', function(){
    displayPageItems(currenPage);
    paginationAction()
})

var arrayData = localStorage.getItem('setValue') ?? [];

var button = document.getElementById('btn1');
var updateBtn = document.getElementById('btn2');
var backBtn = document.getElementById('back');
var formData = document.getElementById('formData');

var listPekerjaan = document.getElementById('listPekerjaan')
var descPekerjaan = document.getElementById('descPekerjaan')
var tagPekerjaan = document.getElementById('tagPekerjaan')

updateBtn.style.display = 'none';
backBtn.style.display = 'none';

button.addEventListener('click', function () {
    // tampung kedalam array dengan object
    var objData = {
        'listPekrjaan': listPekerjaan.value,
        'descPekerjaan': descPekerjaan.value,
        'tagPekerjaan': tagPekerjaan.value
    }

    if (arrayData.length == 0) {
        arrayData.push(objData);
    } else {
        arrayData = JSON.parse(arrayData);
        arrayData.push(objData);
    }

    localStorage.setItem('setValue', JSON.stringify(arrayData))

    listPekerjaan.value = ''
    descPekerjaan.value = ''
    tagPekerjaan.value = ''

    alert('Success!')
    location.reload();
})

const showData = () => {
    const data = JSON.parse(localStorage.getItem('setValue'));
    const dataList = document.getElementById('item_list_task');
    var tagPekerjaan = ''
    data.map((item, index) => {
        switch(item.tagPekerjaan){
            case 'new':
                tagPekerjaan = 'New'
                colorBadge = 'badge-primary'
                break;
            case 'ongoing':
                tagPekerjaan = 'On Going'
                colorBadge = 'badge-info'
                break;
            case 'done':
                tagPekerjaan = 'success'
                colorBadge = 'badge-success'
                break;
        }

       var listData = "<div class='list_data'>"
        + "<div class='itemContent'>"
            + "<span class='" + colorBadge + "'>" + tagPekerjaan + "</span>"
            + "<h2>" + item.listPekrjaan + "</h2>"
            + "<p> 2020-02-10 </p>"
        + "</div>"

        + "<div class='itemAction'>"
            + "<button onclick='detailList(" + index + ")' class='btn-detail'>Show Detail</button>"
            + "<button onclick='hapusAction(" + index + ")' class='btn-danger'>Delete</button>"
            + "<button onclick='editAction(" + index + ")' class='btn-info'>Edit</button>"
        + "</div>"

        + "</div>"

        dataList.innerHTML += listData
    })
}

// set modal
const modal = document.getElementById('myModal');

var modalContent = '';
const detailList = (id) => {
    modal.style.display = "block";
    // ambil data dari local storage
    const data = JSON.parse(localStorage.getItem('setValue'))[id];
    modal.innerHTML = "<div class='modal-content'>"
    + "<span onclick='closeButton()' id='close-button'>&times;</span>"
    + "<h2>Detail Text</h2>"
    + "<p><b>Task</b> : " + data.listPekrjaan + "</p>"
    + "<p><b>Deskripsi</b> :<br> " + data.descPekerjaan + "</p>"
    + "</div>"
}

function closeButton(){
    modal.style.display = "none";
}

function hapusAction(id){
    if(confirm('Are you sure for delete this data ?')){
        const data = JSON.parse(localStorage.getItem('setValue'));
        data.splice(id, 1);
        localStorage.setItem('setValue', JSON.stringify(data));
        location.reload();
    }else{
        return false
    }
}

function editAction(id){
    button.style.display = 'none';
    updateBtn.style.display = 'block';
    backBtn.style.display = 'block';

    // hapus element input hidden jika ada
    const cekInputHiddenElement = document.getElementById('inputHidden')
    if(cekInputHiddenElement){
        cekInputHiddenElement.remove()
    }
    
    // jika sudah terhapus buat kembali dengan element baru (sesuai index dipilih)
    const updateData = document.createElement('input')
    updateData.setAttribute('type', 'hidden')
    updateData.setAttribute('name', 'id')
    updateData.setAttribute('id', 'inputHidden')
    updateData.setAttribute('value', id)
    formData.append(updateData)
    
    const data = JSON.parse(localStorage.getItem('setValue'));
    listPekerjaan.value = data[id].listPekrjaan
    descPekerjaan.value = data[id].descPekerjaan
    tagPekerjaan.value = data[id].tagPekerjaan  
}

updateBtn.addEventListener('click', function(){
    if(confirm('Are you sure for update this data ?')){
        const data = JSON.parse(arrayData);
        const id = document.querySelector('input[name="id"]').value
        
        data[id] = {
            'listPekrjaan': listPekerjaan.value,
            'descPekerjaan': descPekerjaan.value,
            'tagPekerjaan': tagPekerjaan.value
        }

        localStorage.setItem('setValue', JSON.stringify(data))
        listPekerjaan.value = ''
        descPekerjaan.value = ''
        tagPekerjaan.value = ''

        alert('Success!')
        location.reload();
    }
});

// pagination

const dataPagination = JSON.parse(arrayData);
const itemPerPage = 3;
let currenPage = 1;
const totalPage = Math.ceil(dataPagination.length / itemPerPage);

function displayPageItems(pageNumber) {
    const startindex = (pageNumber - 1) * itemPerPage;
    const endindex = startindex + itemPerPage;
    const itemToDisplay = dataPagination.slice(startindex, endindex);
    
    const container = document.getElementById('container-pagination');
    container.innerHTML = '';
  
    itemToDisplay.forEach((item, index) => {
        let tagPekerjaan = ''
        let colorBadge = ''
        switch(item.tagPekerjaan){
            case 'new':
                tagPekerjaan = 'New'
                colorBadge = 'badge-primary'
                break;
            case 'ongoing':
                tagPekerjaan = 'On Going'
                colorBadge = 'badge-info'
                break;
            case 'done':
                tagPekerjaan = 'success'
                colorBadge = 'badge-success'
                break;
        }

       var listData = "<div class='list_data'>"
        + "<div class='itemContent'>"
            + "<span class='" + colorBadge + "'>" + tagPekerjaan + "</span>"
            + "<h2>" + item.listPekrjaan + "</h2>"
            + "<p> 2020-02-10 </p>"
        + "</div>"

        + "<div class='itemAction'>"
            + "<button onclick='detailList(" + index + ")' class='btn-detail'>Show Detail</button>"
            + "<button onclick='hapusAction(" + index + ")' class='btn-danger'>Delete</button>"
            + "<button onclick='editAction(" + index + ")' class='btn-info'>Edit</button>"
        + "</div>"

        + "</div>"

        container.insertAdjacentHTML('beforeend', listData)
    });
}

function navigatePage(newPage){
    if(newPage >= 1 && newPage <= totalPage){
        currenPage = newPage
        displayPageItems(currenPage);
        paginationAction();
    }
}

function paginationAction(){
    const paginationList = document.getElementById('pagination-controls');
    paginationList.innerHTML = '';

    const prevButton = document.createElement('button')
    prevButton.textContent = 'Prev'
    // Logika Prev: Disabled hanya jika berada di halaman pertama (index 0)
    if(currenPage === 1){ // Menggunakan <= 0
        prevButton.disabled = true;
        prevButton.className = 'buttonDisabled';
    }else{
        prevButton.disabled = false; // Pastikan ini diset jika tidak disabled
        prevButton.className = 'prevButton';
    }

    prevButton.onclick = () => navigatePage(currenPage - 1);
    paginationList.appendChild(prevButton);

    const nextButton = document.createElement('button')
    nextButton.textContent = 'Next'
    if (currenPage >= totalPage) { 
        nextButton.disabled = true;
        nextButton.className = 'buttonDisabled'; // Gunakan kelas disabled yang sama
    } else {
        nextButton.disabled = false;
        nextButton.className = 'nextButton';
    }
    nextButton.onclick = () => navigatePage(currenPage + 1);
    paginationList.appendChild(nextButton);
}