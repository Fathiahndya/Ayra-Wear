# Ayra-Wear 
graph TD
    %% Alur Utama
    A[Pilih Produk, Ukuran & Warna] --> B{Cek Stok di Supabase}
    
    B -- Habis --> C[Notifikasi Stok Kosong]
    C --> A
    
    B -- Ada --> D[Hitung Total & AI Audit]
    D --> E[Pembayaran & Simpan ke Tabel Sales]
    E --> F[Update Stok & Cetak Struk]
    F --> G([Transaksi Selesai])

    %% Styling Warna (Blush Pink, Warm Cream, Dusty Rose, Dark Brown)
    style A fill:#FFD1DC,stroke:#3E2723,color:#3E2723
    style B fill:#FDF5E6,stroke:#3E2723,color:#3E2723
    style C fill:#B76E79,stroke:#3E2723,color:#fff
    style D fill:#FFD1DC,stroke:#3E2723,color:#3E2723
    style E fill:#FFD1DC,stroke:#3E2723,color:#3E2723
    style F fill:#FFD1DC,stroke:#3E2723,color:#3E2723
    style G fill:#B76E79,stroke:#3E2723,color:#fff
