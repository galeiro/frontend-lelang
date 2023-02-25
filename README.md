# Clone Repository Frontend Web Lelang

## Clone Repo Lelang (Projek)

Clone Repo ini hanyalah repo yang memudahkan untuk menyelesaikan projek akhir yang di clone dari: <a href="https://github.com/Al-Ghozy03/admin-lelang-remake">github.com/Al-Ghozy03/admin-lelang-remake</a>.

## Cara Penggunaan

Copy Repo ini terlebih dahulu:

``` s
git clone https://github.com/galeiro/frontend-lelang.git
```

Ubah konfigurasi api di `src/api/api_service.js`, sesuaikan dengan dibawah:

dari:
``` s
export let base_url = "http://192.168.56.15:8000";
```

menjadi:
``` s
export let base_url = "http://localhost:8000";
```

Lalu install package:

``` s
npm i
```

Lalu start package:

``` s
npm start
```
