import React, { useState, useEffect, useRef } from 'react';

// Komponen Animasi Scroll (Fade In Up)
const FadeInSection = ({ children, delay = '0ms' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // ---> TAMBAHKAN STATE INI DI SINI <---
  const [showCVModal, setShowCVModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const cvFileUrl = "/CV - Alfarell Nabil Evan Prasetya.pdf";
  // ... (lanjutan kode projects Anda)

  // Data Projek Portofolio dengan Caption yang Sudah Disesuaikan dengan Gambar Asli
  const projects = [
    {
      id: 'webguard',
      title: "WebGuard: Real-Time URL Security Scanner",
      category: "Full-Stack Web Development",
      year: "2026",
      thumbnail: "/Screenshot 2026-11-13 152537.png", 
      shortDesc: "Aplikasi keamanan web berbasis client-server untuk mendeteksi ancaman malware dan phishing pada tautan (URL) secara real-time terintegrasi API VirusTotal.",
      tags: ["React.js", "Laravel 11", "VirusTotal API", "Tailwind CSS"],
      githubUrl: "https://github.com/EvanPrasetya",
      details: {
        problem: "API VirusTotal versi gratis sering menempatkan permintaan pemindaian baru ke dalam antrean (queued) yang memakan waktu hingga 30 detik, membuat pengalaman pengguna (UX) di frontend terasa lambat atau error.",
        solution: "Merombak arsitektur backend Laravel untuk memprioritaskan pengambilan data instan dari laporan terakhir (last analysis stats) yang sudah ada di database global, membuat waktu respons aplikasi terpangkas drastis dari 30 detik menjadi kurang dari 1 detik.",
        features: [
          "Instant Threat Detection: Menerjemahkan URL menjadi format Base64 di sisi backend untuk melakukan kueri langsung ke database VirusTotal tanpa waktu antrean.",
          "Dynamic UI State: Antarmuka beradaptasi otomatis dengan hasil pemindaian—menampilkan panel Hijau untuk tautan aman dan panel Merah jika terdeteksi ancaman.",
          "Premium Liquid Glass Design: Mengimplementasikan efek frosted glass ala iOS dengan pendaran cahaya (ambient glow) dinamis.",
          "Raw JSON Inspector: Menyediakan panel khusus bagi pengguna teknis untuk memeriksa struktur respons data mentah (JSON) dari API VirusTotal."
        ]
      },
      gallery: [
        { src: "/Screenshot 2026-11-13 152537.png", caption: "Halaman Utama & Input Pencarian URL Scanner" },
        { src: "/Screenshot 2026-11-13 152518.png", caption: "Indikator Status Hijau: Tautan Terverifikasi Aman (0 Flagged)" },
        { src: "/Screenshot 2026-11-13 152419.png", caption: "Indikator Status Merah: Peringatan Ancaman Malware Terdeteksi" },
        { src: "/Screenshot 2026-11-13 152800.png", caption: "Panel Raw JSON Inspector untuk Analisis Respons API" }
      ]
    },

{
      id: 'cobain-ai-studio',
      title: "Cobain AI Studio — Real-Time Virtual Try-On & Multimodal AI",
      category: "AI & Full-Stack Web App",
      year: "2026",
      thumbnail: "Screenshot (140).png",
      shortDesc: "Aplikasi web interaktif berbasis Next.js App Router yang mengintegrasikan teknologi Real-Time Video AI (Decart AI SDK) untuk virtual try-on pakaian instan via kamera, didukung asisten cerdas Google Gemini dan generator gambar.",
      tags: ["Next.js", "TypeScript", "Decart AI SDK", "Google Gemini API", "Tailwind CSS"],
      githubUrl: "https://github.com/EvanPrasetya",
      details: {
        problem: "Belanja pakaian secara online sering menimbulkan keraguan kecocokan visual di tubuh pengguna, sementara pembuatan konsep visual outfit membutuhkan waktu dan keahlian desain khusus.",
        solution: "Membangun studio virtual berbasis Next.js dengan integrasi WebRTC, Cloudflare Tunnel, dan Decart AI SDK untuk mencoba pakaian secara real-time lewat kamera, dilengkapi asisten multimodal Google Gemini dan generator gambar lookbook instan.",
        features: [
          "Real-Time Virtual Try-On Studio: Mencoba berbagai koleksi pakaian dan aksesoris (kaos, hoodie, crewneck Stone Island, topi, hingga kacamata) secara langsung melalui kamera web dengan dukungan WebRTC dan Cloudflare Tunneling.",
          "Layering & Custom Upload System: Menumpuk beberapa item sekaligus (layering) atau mengunggah foto pakaian pribadi beserta detail warna untuk langsung dicoba di studio virtual.",
          "Multimodal AI Assistant & Chatbot: Asisten cerdas terintegrasi untuk menjawab pertanyaan umum, memberikan rekomendasi styling outfit, hingga membantu eksplorasi fashion.",
          "AI Image Generation & Studio Control: Generator gambar berbasis teks untuk menciptakan konsep visual baru serta pengaturan pencahayaan virtual (Ring Light/Flash) untuk mengoptimalkan tangkapan kamera."
        ]
      },
      gallery: [
        { src: "Screenshot (140).png", caption: "Tampilan Utama Studio & Katalog Koleksi Pakaian" },
        { src: "Screenshot (141).png", caption: "Modal Upload Pakaian Sendiri dengan Deskripsi Detail Warna" },
        { src: "Screenshot (142).png", caption: "Hasil Real-Time Virtual Try-On di Kamera (Longsleeve Stussy)" },
        { src: "Screenshot (143).png", caption: "Panel Cobain AI Assistant (Mode Obrolan Pintar)" },
        { src: "Screenshot (144).png", caption: "Fitur AI Image Generation untuk Pembuatan Visual Instan" }
      ]
    },

    {
      id: 'standchilla',
      title: "Stand Chilla — E-Catalog & WhatsApp Commerce",
      category: "Full-Stack Web Development",
      year: "2026",
      thumbnail: "/Screenshot (91).png",
      shortDesc: "Platform katalog digital dan sistem pemesanan suvenir terintegrasi WhatsApp untuk toko ritel di kawasan wisata Klenteng Sam Poo Kong, Semarang.",
      tags: ["Laravel 11", "MySQL", "Vanilla JS", "REST API"],
      githubUrl: "https://github.com/EvanPrasetya",
      details: {
        problem: "Pemilik toko suvenir di area wisata kesulitan membagikan daftar harga terbaru dan ketersediaan stok kepada pelanggan jarak jauh maupun pengunjung saat toko sedang ramai.",
        solution: "Membangun aplikasi web katalog responsif dengan arsitektur decoupled (Laravel RESTful API + Frontend modern) dan fitur Floating Cart yang otomatis menyusun format pesanan ke WhatsApp.",
        features: [
          "RESTful API & Admin CRUD (Laravel 11 & MySQL): Memungkinkan pemilik toko memperbarui harga, menambah produk, dan mengatur status stok secara real-time.",
          "Dynamic Cart & WA Checkout: Kalkulasi subtotal belanja otomatis dengan konversi pesan pesanan siap kirim ke WhatsApp Business.",
          "Resilient Architecture & UX: Dilengkapi mekanisme local fallback data, integrasi rute lokasi toko, serta animasi scroll reveal."
        ]
      },
      gallery: [
        { src: "/Screenshot (91).png", caption: "Tampilan Hero Katalog Stand Chilla (Mode Layar Penuh)" },
        { src: "/Screenshot (90).png", caption: "Tata Letak Tipografi & Navigasi Katalog Produk Suvenir" },
        { src: "/Screenshot (92).png", caption: "Drawer Keranjang Suvenir Dinamis & Kalkulasi Estimasi Harga" },
        { src: "/Screenshot (93).png", caption: "Dashboard Admin Laravel untuk Input & Manajemen Stok Suvenir" }
      ]
    },
    {
      id: 'cleanride',
      title: "CleanRide – Car Wash Booking System & API",
      category: "Full-Stack & Backend API",
      year: "2026",
      thumbnail: "/1.png",
      shortDesc: "Sistem reservasi layanan cuci kendaraan terintegrasi dengan alur pemesanan bertahap (multi-step booking), kalkulasi paket layanan, dan backend RESTful API Laravel.",
      tags: ["Laravel", "PHP", "MySQL", "Postman", "Tailwind CSS"],
      githubUrl: "https://github.com/EvanPrasetya/CleanRide",
      details: {
        problem: "Pengelolaan antrean dan jadwal reservasi cuci kendaraan sering mengalami tumpang tindih akibat pencatatan manual dan ketiadaan validasi slot waktu.",
        solution: "Merancang antarmuka reservasi bertahap (multi-step modal) yang terhubung dengan backend Laravel RESTful API untuk memvalidasi pesanan, menghasilkan kode booking unik, dan mencatat status pembayaran.",
        features: [
          "Multi-Step Booking Flow: Antarmuka pemesanan 4 langkah terstruktur mulai dari pilih layanan, jadwal, data diri, hingga pembayaran.",
          "RESTful API & Validasi Backend: Penanganan transaksi melalui endpoint API Laravel dengan pengamanan Mass Assignment ($fillable).",
          " Kode Booking & Status Transaksi: Pembuatan kode reservasi otomatis serta halaman konfirmasi status pemesanan pelanggan."
        ]
      },
      gallery: [
        { src: "/1.png", caption: "Landing Page Utama & Informasi Layanan CleanRide" },
        { src: "/3.png", caption: "Tahap 1: Pemilihan Paket Layanan & Kategori Ukuran Kendaraan" },
        { src: "/4.png", caption: "Tahap 2: Pengisian Data Pelanggan & Detail Nomor Polisi" },
        { src: "/5.png", caption: "Tahap 3: Penjadwalan Tanggal Kedatangan & Slot Jam Pencucian" },
        { src: "/6.png", caption: "Tahap 4: Ringkasan Total Biaya & Pemilihan Metode Pembayaran" },
        { src: "/2.png", caption: "Halaman Konfirmasi Pesanan Berhasil & Status Menunggu Pembayaran" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navbar Permanen (Fixed & Rapi) */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07090e]/70 border-b border-white/5 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a href="#home" className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm text-white font-black shadow-lg shadow-indigo-500/20">
              E
            </div>
            <span>Evan<span className="text-indigo-400">Prasetya.</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <button 
              onClick={() => setShowCVModal(true)} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Resume / CV
            </button>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Tombol Preview CV di Navbar */}
            <button 
              onClick={() => setShowCVModal(true)}
              className="hidden sm:block px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-white text-xs sm:text-sm font-medium transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
            >
              Lihat CV
            </button>
            {/* Tombol Navbar Liquid Glass Primary */}
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-full bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] shadow-lg shadow-indigo-500/20 text-white text-xs sm:text-sm font-semibold transition-all hover:bg-indigo-500/40 active:scale-95"
            >
              Hubungi Saya
            </a>
          </div>
          
        </div>
      </header>

      {/* Kontainer Utama */}
      <main className="relative z-10 pt-32 pb-24 space-y-32">
        
        {/* HERO SECTION */}
        <section id="home" className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
          <FadeInSection>
            <div className="inline-block px-4 py-2 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-4">
              Information Systems Student • Universitas Semarang
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Hi, I'm <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Alfarell Nabil Evan Prasetya</span>
            </h1>
          </FadeInSection>
          
          <FadeInSection delay="100ms">
            <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed mx-auto">
              Berfokus pada pengembangan aplikasi web Full-Stack (Laravel & React), perancangan UI/UX interaktif, pengelolaan basis data MySQL, serta analisis sistem yang terstruktur.
            </p>
          </FadeInSection>

          <FadeInSection delay="200ms">
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {/* Tombol Hero Liquid Glass Primary */}
              <a 
                href="#portfolio" 
                className="px-8 py-3.5 rounded-full bg-indigo-500/30 backdrop-blur-lg border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(79,70,229,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold text-sm transition-all hover:bg-indigo-500/40 hover:scale-105 active:scale-95"
              >
                Lihat Karya Saya
              </a>
              {/* Tombol Buka Preview CV */}
              <button 
                onClick={() => setShowCVModal(true)} 
                className="px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] text-white font-semibold text-sm transition-all hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Preview CV Saya
              </button>
              {/* Tombol Hero Liquid Glass Email */}
              <a 
                href="mailto:evansprasetyaa@gmail.com" 
                className="px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-slate-200 font-semibold text-sm transition-all hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
              >
                Kirim Email
              </a>
            </div>
          </FadeInSection>
        </section>

        {/* ABOUT & CV BANNER SECTION */}
        <section id="about" className="max-w-6xl mx-auto px-6 space-y-8">
          <FadeInSection>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-sm font-bold text-indigo-400 tracking-widest uppercase">Tentang Saya</h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Mahasiswa Sistem Informasi & Full-Stack Web Developer di Semarang.
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                  Saat ini menempuh pendidikan S1 Sistem Informasi di Universitas Semarang (USM). Berpengalaman merancang backend RESTful API menggunakan Laravel, membangun antarmuka modern dengan React dan Tailwind CSS, merancang prototipe UI/UX di Figma, serta mengolah data menggunakan Python.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-4 text-sm text-slate-300 font-medium">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">Laravel & RESTful API</div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">React.js & Tailwind CSS</div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">MySQL & Database Design</div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">UI/UX Figma & System Analysis</div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col justify-center items-center text-center backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <span className="text-4xl font-black text-white">3.75</span>
                  <span className="text-sm text-slate-400 mt-2">IPK Akademik (USM)</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col justify-center items-center text-center backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <span className="text-4xl font-black text-white">3+</span>
                  <span className="text-sm text-slate-400 mt-2">Proyek Aplikasi & Sistem</span>
                </div>

                {/* Kartu Interaktif Buka CV */}
                <div 
                  onClick={() => setShowCVModal(true)}
                  className="bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-cyan-500/15 border border-indigo-400/25 hover:border-indigo-400/50 p-6 rounded-3xl col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-pointer transition-all group"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">Curriculum Vitae</span>
                    <h4 className="text-white font-bold text-lg mt-0.5 group-hover:text-indigo-200 transition-colors">
                      CV - Alfarell Nabil Evan Prasetya
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Klik untuk melihat preview dokumen CV lengkap atau mengunduh PDF.
                    </p>
                  </div>
                  <span className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] text-white text-xs font-semibold shrink-0 group-hover:bg-white/20 transition-all">
                    Buka Preview CV
                  </span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="max-w-6xl mx-auto px-6 space-y-12">
          <FadeInSection>
            <div className="text-center space-y-4">
              <h2 className="text-sm font-bold text-indigo-400 tracking-widest uppercase">Portofolio</h2>
              <h3 className="text-3xl font-bold text-white">Pilihan Proyek & Karya</h3>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Kumpulan pengembangan arsitektur sistem dan antarmuka web. Klik pada kartu proyek untuk melihat studi kasus dan dokumentasi gambar yang telah dirapikan.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <FadeInSection key={proj.id} delay={`${idx * 100}ms`}>
                <div 
                  className="group bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer h-full flex flex-col backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-lg hover:shadow-indigo-500/10"
                  onClick={() => setSelectedProject(proj)}
                >
                  <div className="aspect-video w-full overflow-hidden relative border-b border-white/5 bg-[#05070b]">
                    <img 
                      src={proj.thumbnail} 
                      alt={proj.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white text-xs font-semibold">
                        Buka Detail & Dokumentasi ({proj.gallery.length} Foto)
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{proj.category}</span>
                        <span className="text-xs text-slate-500 font-medium">{proj.year}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {proj.shortDesc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-4xl mx-auto px-6 pb-12">
          <FadeInSection>
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 sm:p-12 text-center space-y-8 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-white">Mari Berdiskusi</h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                  Tertarik dengan cara saya membangun arsitektur aplikasi atau ingin berkolaborasi dalam sebuah proyek maupun program magang? Jangan ragu untuk menghubungi saya.
                </p>
                <p className="text-xs sm:text-sm text-indigo-300 font-medium pt-1">
                  Email langsung: <a href="mailto:evansprasetyaa@gmail.com" className="underline hover:text-white transition-colors">evansprasetyaa@gmail.com</a>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                {/* Tombol Contact Liquid Glass Primary - Langsung mengarah ke evansprasetyaa@gmail.com */}
                <a 
                  href="mailto:evansprasetyaa@gmail.com?subject=Diskusi%20Proyek%20%2F%20Tawaran%20Kolaborasi%20-%20Portfolio%20Evan" 
                  className="px-8 py-3.5 rounded-full bg-indigo-500/30 backdrop-blur-lg border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(79,70,229,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold text-sm transition-all hover:bg-indigo-500/40 hover:scale-105 active:scale-95"
                >
                  Kirim Pesan Email
                </a>
                {/* Tombol Buka CV di Contact */}
                <button 
                  onClick={() => setShowCVModal(true)}
                  className="px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-white font-semibold text-sm transition-all hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Lihat CV Saya
                </button>
                {/* Tombol Contact Liquid Glass Secondary */}
                <a 
                  href="https://github.com/EvanPrasetya" 
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-white font-semibold text-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
                >
                  Kunjungi GitHub
                </a>
              </div>
            </div>
          </FadeInSection>
        </section>

      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
        © 2026 Alfarell Nabil Evan Prasetya • evansprasetyaa@gmail.com
      </footer>

      {/* MODAL 1: DETAIL PROJECT & GALERI RAPI */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div 
              className="bg-[#0b0e14]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{selectedProject.category}</div>
                  <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] text-white font-medium text-sm transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
                >
                  Tutup
                </button>
              </div>

              {/* Konten Modal */}
              <div className="p-6 sm:p-8 space-y-12">
                
                {selectedProject.details && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Tantangan (Problem)</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.details.problem}</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Solusi (Solution)</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.details.solution}</p>
                    </div>
                    <div className="md:col-span-2 space-y-4 pt-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                        Fitur Utama & Arsitektur
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedProject.details.features.map((feat, idx) => {
                          const parts = feat.split(': ');
                          return (
                            <li key={idx} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                              <strong className="block text-white text-sm mb-1">{parts[0]}</strong>
                              <span className="text-slate-400 text-xs leading-relaxed block">{parts[1] || parts[0]}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Galeri Dokumentasi yang Sudah Dirapikan */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Dokumentasi Sistem ({selectedProject.gallery.length} Tangkapan Layar)
                      </h4>
                      <span className="text-xs text-slate-400">Klik gambar untuk memperbesar</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {selectedProject.gallery.map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setZoomedImage(img)}
                          className="group bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
                        >
                          <div className="aspect-video w-full overflow-hidden bg-[#05070b] relative">
                            <img 
                              src={img.src} 
                              alt={img.caption} 
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="px-4 py-1.5 rounded-full bg-black/70 border border-white/20 text-white text-xs font-medium">
                                Perbesar Gambar
                              </span>
                            </div>
                          </div>
                          <div className="p-4 border-t border-white/5 flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                              {img.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center pt-4">
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block px-8 py-3.5 rounded-full bg-indigo-500/30 backdrop-blur-lg border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(79,70,229,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold text-sm transition-all hover:bg-indigo-500/40 hover:scale-105 active:scale-95"
                  >
                    Lihat Source Code di GitHub
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LIGHTBOX ZOOM GAMBAR PENUH */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div 
            className="max-w-6xl w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2">
              <p className="text-sm sm:text-base font-semibold text-white">{zoomedImage.caption}</p>
              <button 
                onClick={() => setZoomedImage(null)}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 cursor-pointer"
              >
                Tutup
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black max-h-[82vh] flex items-center justify-center">
              <img 
                src={zoomedImage.src} 
                alt={zoomedImage.caption} 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PREVIEW CV INTERAKTIF */}
      {showCVModal && (
        <div 
          className="fixed inset-0 z-[65] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowCVModal(false)}
        >
          <div 
            className="bg-[#0b0e14]/95 border border-white/15 rounded-[2rem] w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal CV */}
            <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0b0e14]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Preview Curriculum Vitae</span>
                <h3 className="text-base sm:text-lg font-bold text-white">CV - Alfarell Nabil Evan Prasetya.pdf</h3>
              </div>

              <div className="flex items-center gap-3">
                <a 
                  href={cvFileUrl} 
                  download="CV - Alfarell Nabil Evan Prasetya.pdf"
                  className="px-4 py-2 rounded-full bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white text-xs font-semibold hover:bg-indigo-500/40 transition-all"
                >
                  Unduh PDF
                </a>
                <a 
                  href={cvFileUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-slate-200 text-xs font-medium hover:bg-white/10 transition-all"
                >
                  Buka Tab Baru
                </a>
                <button 
                  onClick={() => setShowCVModal(false)}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Iframe PDF Viewer */}
            <div className="flex-1 bg-[#121620] w-full h-full">
              <iframe 
                src={cvFileUrl} 
                title="CV Alfarell Nabil Evan Prasetya" 
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}