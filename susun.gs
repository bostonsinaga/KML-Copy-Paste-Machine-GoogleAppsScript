/*
  *** Konstruktor Data untuk KML Copy Paste Machine ***
  *dibuat oleh Boston Sinaga untuk Faiz Almakmun*

  CARA MENGGUNAKAN:

  -masukan berupa kode Array JSON yang didapat dari "https://bostonsinaga.github.io/"

  -cara input
    -(SINGLE)
      ->  masukkan kode pada "A4"
    -(PARTS / MULTIPLE) (terjadi apabila jumlah karakter kode melampau 50.000 karakter)
      ->  tulis tanda "*" pada "A4" untuk mengisyaratkan input majemuk
          kemudian masukkan potongan kode pada "A5", "A6", "An", ... (berurutan sebanyak jumlah potongan)

      UNTUK MELANJUTKAN DATA SILAHKAN MASUKKAN DATA PADA KOLOM 'A' DI BARIS LANJUTAN 
      KEMUDIAN GANTI NULAI 'SUPER_ROW' (LIHAT BARIS 24) MENJADI URUTAN BARUS TERSEBUT
      (pastikan dulu semua kolom pada baris itu kosong, karena data yang ada akan ditimpa)

  -pastikan seluruh kolom dan baris kosong
  -lalu jalankan script ini...
*/

const SUPER_ROW = 4 // nilai default adalah 4

const sheet = SpreadsheetApp.getActiveSheet();

function susun() {

  const startRow = SUPER_ROW, startCol = 1;
  let currentRow = startRow, currentCol = startCol;
  let data, text, isAvailable = true;

  const firstRange = sheet.getRange(startRow, startCol);
  const firstRangeDefault = () => {
    firstRange
      .clear()
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
  }
  text = firstRange.getValue();

  if (text == '*') { // multiple (
    text = '';
    firstRangeDefault();
    let rowN = startRow + 1;

    while (true) {
      const cell = sheet.getRange(rowN, startCol);
      if (cell.getValue() != '') {
        text += cell.getValue();
        cell
          .clear()
          .setHorizontalAlignment('center')
          .setVerticalAlignment('middle');
      }
      else {
        break;
      }
      rowN++;
    }

    data = JSON.parse(text);
  }
  else if (text != '') { // single
    data = JSON.parse(text);
    firstRangeDefault();
  }
  else {
    isAvailable = false;
    console.log('Data tidak ditemukan...');
  }
  
  if (isAvailable) {

    template();
  
    // cetak data
    for (let i = 0; i < data.length; i++) {
      if (data[i] == '=>') {
        currentCol++;
        currentRow = startRow;
      } else {
        sheet.getRange(currentRow, currentCol).setValue(data[i]);
        currentRow++;
      }
    }

    resize();
  }
}
