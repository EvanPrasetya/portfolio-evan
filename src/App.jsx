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

  // Data Projek Portofolio yang Disatukan
  const projects = [
     {
      id: 'webguard',
      title: "WebGuard: Real-Time URL Security Scanner",
      category: "Full-Stack Web Development",
      year: "2026",
      thumbnail: "/Screenshot 2026-11-13 152537.png", 
      shortDesc: "Aplikasi keamanan web berbasis client-server untuk mendeteksi ancaman malware dan phishing pada tautan (URL) secara real-time terintegrasi API VirusTotal.",
      tags: ["React.js", "Laravel 11", "VirusTotal API", "Tailwind CSS"],
      githubUrl: "https://github.com/EvanPrasetya", // Sesuaikan URL
      details: {
        problem: "API VirusTotal versi gratis sering menempatkan permintaan pemindaian baru ke dalam antrean (queued) yang memakan waktu hingga 30 detik, membuat pengalaman pengguna (UX) di frontend terasa lambat atau error.",
        solution: "Merombak arsitektur backend Laravel untuk memprioritaskan pengambilan data instan dari laporan terakhir (last analysis stats) yang sudah ada di database global, membuat waktu respons aplikasi terpangkas drastis dari 30 detik menjadi kurang dari 1 detik.",
        features: [
          "Instant Threat Detection: Menerjemahkan URL menjadi format Base64 di sisi backend untuk melakukan kueri langsung ke database VirusTotal, menghasilkan respons deteksi tanpa waktu antrean (zero-queue delay).",
          "Dynamic UI State: Antarmuka secara cerdas beradaptasi dengan hasil pemindaian—menampilkan panel berwarna merah (Peringatan) jika terdeteksi ancaman, dan panel hijau (Aman) untuk tautan bersih.",
          "Premium Liquid Glass Design: Mengimplementasikan efek frosted glass tebal ala antarmuka iOS dengan pendaran cahaya (ambient glow) yang dinamis, memastikan keterbacaan teks tetap optimal.",
           "Raw JSON Inspector: Menyediakan panel tersembunyi bagi pengguna teknis untuk melihat respons data mentah (JSON) dari API, dengan pewarnaan syntax (merah/hijau) yang menyesuaikan dengan status keamanan tautan."
        ]
      },
      gallery: [
        { src: "/Screenshot 2026-11-13 152537.png", caption: "Landing Page dengan Input URL Scanner" },
        { src: "/Screenshot 2026-11-13 152518.png", caption: "Dynamic UI: Status Tautan Aman (Hijau)" },
        { src: "/Screenshot 2026-11-13 152419.png", caption: "Dynamic UI: Status Ancaman Terdeteksi (Merah)" },
        { src: "/Screenshot 2026-11-13 152800.png", caption: "Raw JSON Inspector Panel" }
      ]
    },
    {
      id: 'standchilla',
      title: "Stand Chilla — E-Catalog & Commerce",
      category: "Full-Stack Web Development",
      year: "2026",
      thumbnail: "/Screenshot (91).png",
      shortDesc: "Platform katalog digital dan sistem pemesanan suvenir terintegrasi WhatsApp untuk toko ritel di kawasan wisata Sam Poo Kong, Semarang.",
      tags: ["Laravel 11", "MySQL", "Vanilla JS", "REST API"],
      githubUrl: "https://github.com/EvanPrasetya",
      details: {
        problem: "Pemilik toko kesulitan membagikan daftar harga terbaru dan ketersediaan stok kepada pelanggan secara real-time saat toko sedang ramai.",
        solution: "Membangun aplikasi web katalog responsif (Laravel RESTful API + Frontend modern) dengan fitur Floating Cart yang otomatis menyusun pesanan ke WhatsApp.",
        features: [
          "RESTful API & Admin CRUD (Laravel 11 & MySQL): Memungkinkan pemilik toko memperbarui harga dan stok secara real-time.",
          "Dynamic Cart & WA Checkout: Kalkulasi subtotal otomatis dengan konversi pesan siap kirim ke WhatsApp Business.",
          "Resilient Architecture: Dilengkapi peta koordinat Google Maps dan animasi antarmuka yang modern."
        ]
      },
      gallery: [
        { src: "/Screenshot (91).png", caption: "Landing Page bertema Barongsai" },
        { src: "/Screenshot (90).png", caption: "Integrasi Navigasi Peta Lokasi" },
        { src: "/Screenshot (92).png", caption: "Dynamic Cart & Subtotal Calculation" },
        { src: "/Screenshot (93).png", caption: "Panel Admin & Manajemen Stok" }
      ]
    },
    {
      id: 'cleanride',
      title: "CleanRide – Car Wash Booking API",
      category: "Backend RESTful API",
      year: "2026",
      thumbnail: "/1.png",
      shortDesc: "Sistem pemesanan layanan cuci kendaraan berbasis Laravel API dengan fitur generate kode booking otomatis dan simulasi pembayaran.",
      tags: ["Laravel", "PHP", "MySQL", "Postman", "Laragon"],
      githubUrl: "https://github.com/EvanPrasetya/CleanRide",
      details: {
        problem: "Pengelolaan jadwal reservasi cuci kendaraan yang sering tumpang tindih karena pencatatan masih dilakukan secara manual.",
        solution: "Membangun arsitektur backend yang solid untuk memvalidasi setiap request pemesanan dan mengatur jadwal berdasarkan ketersediaan.",
        features: [
          "Routing API Terstruktur: Penanganan endpoint POST /api/v1/bookings.",
          "Mass Assignment Protection: Pengamanan pengisian data menggunakan model $fillable.",
          "API Resource: Transformasi output data ke dalam format JSON yang terstandarisasi."
        ]
      },
      gallery: [
        { src: "/1.png", caption: "Landing Page Layanan" },
        { src: "/2.png", caption: "Form Pemilihan Jadwal" },
        { src: "/3.png", caption: "Pengujian Payload di Postman" },
        { src: "/4.png", caption: "Struktur Migrasi Database" },
        { src: "/5.png", caption: "Konfigurasi Eloquent Model" },
        { src: "/6.png", caption: "Simulasi Pembayaran" },
        { src: "/7.png", caption: "Implementasi CRUD & API Resource" }
      ]
    },
  ];
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navbar Permanen (Fixed & Rapi) */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07090e]/60 border-b border-white/5 transition-all">
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
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Tombol Navbar Liquid Glass Secondary */}
            <a 
              href="https://github.com/EvanPrasetya" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:block px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-white text-sm font-medium transition-all hover:bg-white/10 active:scale-95"
            >
              GitHub
            </a>
            {/* Tombol Navbar Liquid Glass Primary */}
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-full bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] shadow-lg shadow-indigo-500/20 text-white text-sm font-semibold transition-all hover:bg-indigo-500/40 active:scale-95"
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
              Software Engineering Student • Universitas Semarang
            </div>
            {/* Teks Identitas */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Hi, I'm <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Alfarell Nabil Evan Prasetya</span>
            </h1>
          </FadeInSection>
          
          <FadeInSection delay="100ms">
            <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed mx-auto">
              Berawal dari rasa penasaran terhadap kode, kini berfokus mengembangkan arsitektur RESTful API Laravel, perancangan database MySQL, dan antarmuka web modern yang bersih serta fungsional.
            </p>
          </FadeInSection>

          <FadeInSection delay="200ms">
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {/* Tombol Hero Liquid Glass Primary */}
              <a href="#portfolio" className="px-8 py-3.5 rounded-full bg-indigo-500/30 backdrop-blur-lg border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(79,70,229,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold text-sm transition-all hover:bg-indigo-500/40 hover:scale-105 active:scale-95">
                Lihat Karya Saya
              </a>
              {/* Tombol Hero Liquid Glass Secondary */}
              <a href="mailto:email@anda.com" className="px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-white font-semibold text-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95">
                Kirim Email
              </a>
            </div>
          </FadeInSection>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-sm font-bold text-indigo-400 tracking-widest uppercase">Tentang Saya</h2>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Junior Full-Stack Web Developer berbasis di Semarang.
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                  Saat ini menempuh pendidikan di Universitas Semarang (USM). Saya menyukai struktur kode yang rapi dan logis. Spesialisasi saya berada pada ekosistem Laravel (PHP) untuk mengelola logika server dan database MySQL, digabungkan dengan antarmuka JavaScript modern yang interaktif.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4 text-sm text-slate-300 font-medium">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">Laravel & REST API</div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">MySQL & Migrations</div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">Vanilla JS & React</div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">API Testing (Postman)</div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col justify-center items-center text-center backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <span className="text-4xl font-black text-white">4+</span>
                  <span className="text-sm text-slate-400 mt-2">Projek Portofolio</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex flex-col justify-center items-center text-center backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <span className="text-4xl font-black text-white">15+</span>
                  <span className="text-sm text-slate-400 mt-2">Modul Sistem</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-6 rounded-3xl col-span-2 flex justify-between items-center backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <div>
                    <h4 className="text-white font-bold">Mahasiswa Aktif</h4>
                    <p className="text-sm text-slate-400 mt-1">Universitas Semarang (USM)</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                    USM
                  </div>
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
                Kumpulan pengembangan arsitektur sistem dan antarmuka web. Klik proyek untuk melihat studi kasus dan dokumentasi lengkap.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <FadeInSection key={proj.id} delay={`${idx * 100}ms`}>
                <div 
                  className="group bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer h-full flex flex-col backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:shadow-lg hover:shadow-indigo-500/10"
                  onClick={() => setSelectedProject(proj)}
                >
                  <div className="h-56 sm:h-64 overflow-hidden relative border-b border-white/5">
                    <img 
                      src={proj.thumbnail} 
                      alt={proj.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white text-xs font-semibold">
                        Buka Detail Proyek
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{proj.category}</span>
                        <span className="text-xs text-slate-500 font-medium">{proj.year}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{proj.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {proj.shortDesc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-xs px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-slate-300">
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
              <h2 className="text-3xl font-bold text-white">Mari Berdiskusi</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                Tertarik dengan cara saya membangun arsitektur aplikasi atau ingin berkolaborasi dalam sebuah proyek? Jangan ragu untuk menghubungi saya.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                {/* Tombol Contact Liquid Glass Primary */}
                <a 
                  href="mailto:email@anda.com" 
                  className="px-8 py-3.5 rounded-full bg-indigo-500/30 backdrop-blur-lg border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(79,70,229,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold text-sm transition-all hover:bg-indigo-500/40 hover:scale-105 active:scale-95"
                >
                  Kirim Pesan Email
                </a>
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
        © 2026 Alfarell Nabil Evan Prasetya. All rights reserved.
      </footer>

      {/* MODAL DETAIL PROJECT & GALLERY */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div 
              className="bg-[#0b0e14]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="sticky top-0 bg-[#0b0e14]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{selectedProject.category}</div>
                  <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
                </div>
                {/* Tombol Tutup Liquid Glass */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] text-white font-medium text-sm transition-all hover:bg-white/20 active:scale-95"
                >
                  Tutup
                </button>
              </div>

              {/* Konten Modal */}
              <div className="p-6 sm:p-8 space-y-12">
                
                {selectedProject.details && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-white uppercase border-b border-white/10 pb-2">Problem</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{selectedProject.details.problem}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-white uppercase border-b border-white/10 pb-2">Solution</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{selectedProject.details.solution}</p>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <h4 className="text-sm font-bold text-white uppercase border-b border-white/10 pb-2">Key Features</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedProject.details.features.map((feat, idx) => {
                          const parts = feat.split(': ');
                          return (
                            <li key={idx} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                              <strong className="block text-white text-sm mb-1">{parts[0]}</strong>
                              <span className="text-slate-400 text-xs leading-relaxed">{parts[1] || parts[0]}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}

                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-white uppercase border-b border-white/10 pb-2">Dokumentasi Sistem</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {selectedProject.gallery.map((img, idx) => (
                        <div key={idx} className="space-y-3">
                          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                            <img src={img.src} alt={img.caption} className="w-full object-cover" />
                          </div>
                          <p className="text-center text-xs font-medium text-slate-400">
                            {idx + 1}. {img.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center pt-8">
                  {/* Tombol GitHub Modal Liquid Glass */}
                   <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block px-8 py-3.5 rounded-full bg-indigo-500/30 backdrop-blur-lg border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(79,70,229,0.2)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] text-white font-semibold text-sm transition-all hover:bg-indigo-500/40 hover:scale-105 active:scale-95"
                  >
                    Lihat Source Code
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}