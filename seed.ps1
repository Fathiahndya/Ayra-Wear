$env:VITE_SUPABASE_URL = "https://ktftmztbkicelekujfmh.supabase.co"
$env:VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZnRtenRia2ljZWxla3VqZm1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MzE2NzIsImV4cCI6MjA4NzEwNzY3Mn0.HfqdvYlLMzwUIZKgCyDfBvPxl_eielNJQ1hrp_-SRho"

$headers = @{
    "apikey" = $env:VITE_SUPABASE_ANON_KEY
    "Authorization" = "Bearer $($env:VITE_SUPABASE_ANON_KEY)"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

Write-Host "Menghapus data lama..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "$($env:VITE_SUPABASE_URL)/rest/v1/products?id=not.eq.0" -Method Delete -Headers $headers

$products = @(
    # GAMIS WANITA
    @{
        name = "Gamis Ayra Premium Rose"
        price = 325000
        category = "Pakaian Wanita"
        image_url = "/images/gamis.png"
        description = "Gamis eksklusif dengan bahan Premium Silk yang memberikan efek kilau mewah namun tetap adem."
    },
    # GAMIS PRIA
    @{
        name = "Gamis Pria Al-Rayyan Jubbah"
        price = 245000
        category = "Pakaian Pria"
        image_url = "/images/gamis-pria.png"
        description = "Gamis pria model Jubbah/Thobe dengan potongan longgar yang elegan. Berbahan katun premium yang sejuk."
    },
    # KOKO DEWASA
    @{
        name = "Koko Kurta Al-Hakim Modern"
        price = 185000
        category = "Pakaian Pria"
        image_url = "/images/koko.png"
        description = "Baju koko kurta lengan panjang dengan bahan Cotton Toyobo Grade A."
    },
    # PECI
    @{
        name = "Peci Hitam Velvet Classic"
        price = 45000
        category = "Aksesoris"
        image_url = "/images/peci.png"
        description = "Peci klasik berbahan velvet lembut warna hitam pekat."
    },
    # MUKENA
    @{
        name = "Mukena Sutra Silk White"
        price = 275000
        category = "Aksesoris"
        image_url = "/images/mukena.png"
        description = "Mukena setelan atas bawah dengan bahan Sutra Silk yang sangat lembut."
    },
    # SAJADAH
    @{
        name = "Sajadah Velvet Signature"
        price = 85000
        category = "Aksesoris"
        image_url = "/images/sajadah.png"
        description = "Sajadah dengan bahan Velvet lembut. Memiliki motif timur tengah yang eksklusif."
    },
    # KERUDUNG / HIJAB
    @{
        name = "Hijab Voal Premium Lazercut"
        price = 65000
        category = "Aksesoris"
        image_url = "/images/hijab.png"
        description = "Hijab segiempat ukuran 110x110cm dengan bahan Voal Ultrafine."
    },
    # GAMIS ANAK
    @{
        name = "Gamis Anak Little Flower Pink"
        price = 165000
        category = "Anak"
        image_url = "/images/gamis-anak.png"
        description = "Gamis anak perempuan dengan bahan Katun Jepang yang sangat lembut."
    },
    # KOKO ANAK
    @{
        name = "Setelan Koko Anak Little Umar"
        price = 145000
        category = "Anak"
        image_url = "/images/koko-anak.png"
        description = "Setelan baju koko anak (atasan dan celana) dengan bahan Katun Madinah."
    }
)

$jsonBody = $products | ConvertTo-Json -Depth 5

Write-Host "Mengupdate database..." -ForegroundColor Cyan
$response = Invoke-RestMethod -Uri "$($env:VITE_SUPABASE_URL)/rest/v1/products" -Method Post -Headers $headers -Body $jsonBody

if ($response) {
    Write-Host "Berhasil dihapus produk Tunik, sekarang ada 9 produk." -ForegroundColor Green
} else {
    Write-Host "Gagal memperbarui database." -ForegroundColor Red
}
