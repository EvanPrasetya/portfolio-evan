import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Download,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  Clock,
  Award,
  GraduationCap,
  Users,
  Menu,
  CheckCircle2,
  Eye,
} from 'lucide-react';

// Custom Social SVG Icons (GitHub, Instagram)
const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Hardware-Accelerated Scroll Reveal Component (Smooth 60fps Fade + Slide Up on Scroll)
const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [activeNav, setActiveNav] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [showCVModal, setShowCVModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [localTime, setLocalTime] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const cvFileUrl = '/CV - Alfarell Nabil Evan Prasetya.pdf';

  // Live Local Time WIB (Semarang, Indonesia)
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setLocalTime(formatter.format(now));
      } catch {
        const now = new Date();
        setLocalTime(now.toTimeString().slice(0, 8));
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Passive Scroll Progress Bar (Top Indicator for tangible scroll feedback)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lightweight IntersectionObserver for Active Section Indicator
  useEffect(() => {
    const sectionIds = ['profile', 'selected', 'credentials', 'career', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close Modals on Escape Key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (zoomedImage) setZoomedImage(null);
        else if (selectedProject) setSelectedProject(null);
        else if (selectedCertificate) setSelectedCertificate(null);
        else if (showCVModal) setShowCVModal(false);
        else if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomedImage, selectedProject, selectedCertificate, showCVModal, mobileMenuOpen]);

  // Navigasi Utama (Bahasa Indonesia + Kode Editorial)
  const navItems = [
    { id: 'profile', code: '01', label: 'PROFIL', href: '#profile' },
    { id: 'selected', code: '02', label: 'PROYEK', href: '#selected' },
    { id: 'credentials', code: '03', label: 'SERTIFIKAT', href: '#credentials' },
    { id: 'career', code: '04', label: 'PENDIDIKAN', href: '#career' },
    { id: 'contact', code: '05', label: 'KONTAK', href: '#contact' },
  ];

  // Spesialisasi & Keahlian (Sesuai dengan Projek Asli: WebGuard, Cobain AI Studio, Stand Chilla, CleanRide)
  const specializations = [
    {
      num: '01',
      title: 'FRONTEND & AI WEB APPLICATION',
      description:
        'Pengembangan antarmuka web modern yang interaktif, responsif, serta integrasi kemampuan Multimodal AI dan Real-Time Video AI pada aplikasi berbasis browser.',
      skills: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Vanilla JS',
        'Google Gemini API',
        'Decart AI SDK',
      ],
    },
    {
      num: '02',
      title: 'BACKEND & RESTFUL API ARCHITECTURE',
      description:
        'Perancangan arsitektur sistem client-server, pengembangan endpoint RESTful API berkinerja tinggi, keamanan pemindaian URL real-time, serta manajemen basis data relasional.',
      skills: [
        'Laravel 11',
        'PHP',
        'RESTful API',
        'MySQL',
        'VirusTotal API',
        'Database Design',
      ],
    },
    {
      num: '03',
      title: 'UI/UX DESIGN & DEVELOPMENT TOOLS',
      description:
        'Perancangan prototipe antarmuka pengguna (UI/UX), analisis sistem informasi terstruktur, pengujian endpoint API, serta manajemen kontrol versi.',
      skills: [
        'Figma UI/UX',
        'System Analysis',
        'Postman',
        'Git & GitHub',
        'VS Code',
        'Python',
      ],
    },
  ];

  // 4 Projek Portofolio Asli (WebGuard, Cobain AI Studio, Stand Chilla, CleanRide)
  const selectedProjects = [
    {
      id: 'webguard',
      number: '01',
      title: 'WebGuard: Real-Time URL Security Scanner',
      category: 'FULL-STACK WEB DEVELOPMENT',
      year: '2026',
      thumbnail: '/Screenshot 2026-11-13 152537.png',
      shortDesc:
        'Aplikasi keamanan web berbasis client-server untuk mendeteksi ancaman malware dan phishing pada tautan (URL) secara real-time terintegrasi API VirusTotal.',
      tags: ['React.js', 'Laravel 11', 'VirusTotal API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/EvanPrasetya',
      details: {
        problem:
          'API VirusTotal versi gratis sering menempatkan permintaan pemindaian baru ke dalam antrean (queued) yang memakan waktu hingga 30 detik, membuat pengalaman pengguna (UX) di frontend terasa lambat atau error.',
        solution:
          'Merombak arsitektur backend Laravel untuk memprioritaskan pengambilan data instan dari laporan terakhir (last analysis stats) yang sudah ada di database global, membuat waktu respons aplikasi terpangkas drastis dari 30 detik menjadi kurang dari 1 detik.',
        features: [
          'Instant Threat Detection: Menerjemahkan URL menjadi format Base64 di sisi backend untuk melakukan kueri langsung ke database VirusTotal tanpa waktu antrean.',
          'Dynamic UI State: Antarmuka beradaptasi otomatis dengan hasil pemindaian—menampilkan panel Hijau untuk tautan aman dan panel Merah jika terdeteksi ancaman.',
          'Premium Liquid Glass Design: Mengimplementasikan efek frosted glass ala iOS dengan pendaran cahaya (ambient glow) dinamis.',
          'Raw JSON Inspector: Menyediakan panel khusus bagi pengguna teknis untuk memeriksa struktur respons data mentah (JSON) dari API VirusTotal.',
        ],
      },
      gallery: [
        {
          src: '/Screenshot 2026-11-13 152537.png',
          caption: 'Halaman Utama & Input Pencarian URL Scanner',
        },
        {
          src: '/Screenshot 2026-11-13 152518.png',
          caption: 'Indikator Status Hijau: Tautan Terverifikasi Aman (0 Flagged)',
        },
        {
          src: '/Screenshot 2026-11-13 152419.png',
          caption: 'Indikator Status Merah: Peringatan Ancaman Malware Terdeteksi',
        },
        {
          src: '/Screenshot 2026-11-13 152800.png',
          caption: 'Panel Raw JSON Inspector untuk Analisis Respons API',
        },
      ],
    },
    {
      id: 'cobain-ai-studio',
      number: '02',
      title: 'Cobain AI Studio — Real-Time Virtual Try-On & Multimodal AI',
      category: 'AI & FULL-STACK WEB APP',
      year: '2026',
      thumbnail: '/Screenshot (140).png',
      shortDesc:
        'Aplikasi web interaktif berbasis Next.js App Router yang mengintegrasikan teknologi Real-Time Video AI (Decart AI SDK) untuk virtual try-on pakaian instan via kamera, didukung asisten cerdas Google Gemini dan generator gambar.',
      tags: ['Next.js', 'TypeScript', 'Decart AI SDK', 'Google Gemini API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/EvanPrasetya',
      details: {
        problem:
          'Belanja pakaian secara online sering menimbulkan keraguan kecocokan visual di tubuh pengguna, sementara pembuatan konsep visual outfit membutuhkan waktu dan keahlian desain khusus.',
        solution:
          'Membangun studio virtual berbasis Next.js dengan integrasi WebRTC, Cloudflare Tunnel, dan Decart AI SDK untuk mencoba pakaian secara real-time lewat kamera, dilengkapi asisten multimodal Google Gemini dan generator gambar lookbook instan.',
        features: [
          'Real-Time Virtual Try-On Studio: Mencoba berbagai koleksi pakaian dan aksesoris (kaos, hoodie, crewneck Stone Island, topi, hingga kacamata) secara langsung melalui kamera web dengan dukungan WebRTC dan Cloudflare Tunneling.',
          'Layering & Custom Upload System: Menumpuk beberapa item sekaligus (layering) atau mengunggah foto pakaian pribadi beserta detail warna untuk langsung dicoba di studio virtual.',
          'Multimodal AI Assistant & Chatbot: Asisten cerdas terintegrasi untuk menjawab pertanyaan umum, memberikan rekomendasi styling outfit, hingga membantu eksplorasi fashion.',
          'AI Image Generation & Studio Control: Generator gambar berbasis teks untuk menciptakan konsep visual baru serta pengaturan pencahayaan virtual (Ring Light/Flash) untuk mengoptimalkan tangkapan kamera.',
        ],
      },
      gallery: [
        {
          src: '/Screenshot (140).png',
          caption: 'Tampilan Utama Studio & Katalog Koleksi Pakaian',
        },
        {
          src: '/Screenshot (141).png',
          caption: 'Modal Upload Pakaian Sendiri dengan Deskripsi Detail Warna',
        },
        {
          src: '/Screenshot (142).png',
          caption: 'Hasil Real-Time Virtual Try-On di Kamera (Longsleeve Stussy)',
        },
        {
          src: '/Screenshot (143).png',
          caption: 'Panel Cobain AI Assistant (Mode Obrolan Pintar)',
        },
        {
          src: '/Screenshot (144).png',
          caption: 'Fitur AI Image Generation untuk Pembuatan Visual Instan',
        },
      ],
    },
    {
      id: 'standchilla',
      number: '03',
      title: 'Stand Chilla — E-Catalog & WhatsApp Commerce',
      category: 'FULL-STACK WEB DEVELOPMENT',
      year: '2026',
      thumbnail: '/Screenshot (91).png',
      shortDesc:
        'Platform katalog digital dan sistem pemesanan suvenir terintegrasi WhatsApp untuk toko ritel di kawasan wisata Klenteng Sam Poo Kong, Semarang.',
      tags: ['Laravel 11', 'MySQL', 'Vanilla JS', 'REST API'],
      githubUrl: 'https://github.com/EvanPrasetya',
      details: {
        problem:
          'Pemilik toko suvenir di area wisata kesulitan membagikan daftar harga terbaru dan ketersediaan stok kepada pelanggan jarak jauh maupun pengunjung saat toko sedang ramai.',
        solution:
          'Membangun aplikasi web katalog responsif dengan arsitektur decoupled (Laravel RESTful API + Frontend modern) dan fitur Floating Cart yang otomatis menyusun format pesanan ke WhatsApp.',
        features: [
          'RESTful API & Admin CRUD (Laravel 11 & MySQL): Memungkinkan pemilik toko memperbarui harga, menambah produk, dan mengatur status stok secara real-time.',
          'Dynamic Cart & WA Checkout: Kalkulasi subtotal belanja otomatis dengan konversi pesan pesanan siap kirim ke WhatsApp Business.',
          'Resilient Architecture & UX: Dilengkapi mekanisme local fallback data, integrasi rute lokasi toko, serta animasi scroll reveal.',
        ],
      },
      gallery: [
        {
          src: '/Screenshot (91).png',
          caption: 'Tampilan Hero Katalog Stand Chilla (Mode Layar Penuh)',
        },
        {
          src: '/Screenshot (90).png',
          caption: 'Tata Letak Tipografi & Navigasi Katalog Produk Suvenir',
        },
        {
          src: '/Screenshot (92).png',
          caption: 'Drawer Keranjang Suvenir Dinamis & Kalkulasi Estimasi Harga',
        },
        {
          src: '/Screenshot (93).png',
          caption: 'Dashboard Admin Laravel untuk Input & Manajemen Stok Suvenir',
        },
      ],
    },
    {
      id: 'cleanride',
      number: '04',
      title: 'CleanRide – Car Wash Booking System & API',
      category: 'FULL-STACK & BACKEND API',
      year: '2026',
      thumbnail: '/1.png',
      shortDesc:
        'Sistem reservasi layanan cuci kendaraan terintegrasi dengan alur pemesanan bertahap (multi-step booking), kalkulasi paket layanan, dan backend RESTful API Laravel.',
      tags: ['Laravel', 'PHP', 'MySQL', 'Postman', 'Tailwind CSS'],
      githubUrl: 'https://github.com/EvanPrasetya/CleanRide',
      details: {
        problem:
          'Pengelolaan antrean dan jadwal reservasi cuci kendaraan sering mengalami tumpang tindih akibat pencatatan manual dan ketiadaan validasi slot waktu.',
        solution:
          'Merancang antarmuka reservasi bertahap (multi-step modal) yang terhubung dengan backend Laravel RESTful API untuk memvalidasi pesanan, menghasilkan kode booking unik, dan mencatat status pembayaran.',
        features: [
          'Multi-Step Booking Flow: Antarmuka pemesanan 4 langkah terstruktur mulai dari pilih layanan, jadwal, data diri, hingga pembayaran.',
          'RESTful API & Validasi Backend: Penanganan transaksi melalui endpoint API Laravel dengan pengamanan Mass Assignment ($fillable).',
          'Kode Booking & Status Transaksi: Pembuatan kode reservasi otomatis serta halaman konfirmasi status pemesanan pelanggan.',
        ],
      },
      gallery: [
        { src: '/1.png', caption: 'Landing Page Utama & Informasi Layanan CleanRide' },
        { src: '/2.png', caption: 'Tahap 1: Pemilihan Paket Layanan & Kategori Ukuran Kendaraan' },
        { src: '/3.png', caption: 'Tahap 2: Penjadwalan Tanggal Kedatangan & Slot Jam Pencucian' },
        { src: '/4.png', caption: 'Tahap 3: Pengisian Data Pelanggan & Detail Nomor Polisi' },
        { src: '/5.png', caption: 'Tahap 4: Ringkasan Total Biaya & Pemilihan Metode Pembayaran' },
        {
          src: '/6.png',
          caption: 'Halaman Konfirmasi Pesanan Berhasil & Status Menunggu Pembayaran',
        },
      ],
    },
  ];

  // 3 Sertifikat Asli HIMMATISI
  const credentialsList = [
    {
      id: 'sertif-tisi-insight-2026',
      code: '1348/USM.H4.FTIK/I/2026',
      title: 'Anggota Divisi Media — TISI INSIGHT 2026',
      role: 'Anggota Divisi Media (Kepanitiaan Seminar)',
      organization: 'HIMMATISI · FTIK Universitas Semarang',
      date: '29 September 2026',
      year: '2026',
      category: 'SERTIFIKAT KEPANITIAAN ORGANISASI',
      previewImage: '/sertif-tisi-insight-2026.png',
      description:
        'Diberikan kepada Alfarell Nabil Evan Prasetya sebagai bentuk penghargaan atas dedikasi, tanggung jawab, dan peran aktifnya sebagai Anggota Divisi Media dalam mendukung kelancaran dan keberhasilan kegiatan seminar TISI INSIGHT 2026 yang diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi (HIMMATISI) FTIK Universitas Semarang.',
    },
    {
      id: 'sertif-solidarity-2026',
      code: '349/USM.H4.FTIK/I/2026',
      title: 'HIMMATISI One Night Solidarity — CTRL+S',
      role: 'Peserta Kegiatan Organisasi HIMMATISI',
      organization: 'HIMMATISI · FTIK Universitas Semarang',
      date: '12–13 Januari 2026',
      year: '2026',
      category: 'SERTIFIKAT APRESIASI ORGANISASI',
      previewImage: '/sertif-himmatisi-solidarity-2026.jpg',
      description:
        'Sertifikat Apresiasi diberikan kepada Alfarell Nabil Evan Prasetya sebagai peserta kegiatan HIMMATISI One Night Solidarity dengan tema "CTRL+S : Save the Moment and Solidarity" pada 12–13 Januari 2026 di Promas Greenland.',
    },
    {
      id: 'sertif-kuliah-umum-2024',
      code: '1039/USM.H4.FTIK/I/2024',
      title: 'Kuliah Umum & Sarasehan Teknologi Informasi',
      role: 'Peserta Kegiatan Akademik & Himpunan',
      organization: 'HIMMATISI · FTIK Universitas Semarang',
      date: '12 Oktober 2024',
      year: '2024',
      category: 'SERTIFIKAT KEGIATAN HIMPUNAN',
      previewImage: '/sertif-kuliah-umum-2024.jpg',
      description:
        'Sertifikat diberikan kepada Alfarell Nabil Evan Prasetya sebagai Peserta dalam kegiatan Kuliah Umum dan Sarasehan yang diselenggarakan oleh Himpunan Mahasiswa Jurusan Teknologi Informasi (HIMMATISI) Fakultas Teknologi Informasi dan Komunikasi Universitas Semarang pada 12 Oktober 2024.',
    },
  ];

  const handlePrevCert = () => {
    setActiveCertIndex((prev) => (prev === 0 ? credentialsList.length - 1 : prev - 1));
  };

  const handleNextCert = () => {
    setActiveCertIndex((prev) => (prev === credentialsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#0A1424] text-[#F1F5F9] font-sans antialiased selection:bg-[#3B82F6] selection:text-white relative overflow-x-hidden">
      {/* 01. HEADER & STICKY NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1424]/95 backdrop-blur-md border-b border-[#263B59]/80 transition-colors">
        {/* Top Smooth Scroll Progress Indicator Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#101E33] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-transform duration-150 ease-out origin-left"
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: EVAN.PRASETYA Logo */}
          <a
            href="#profile"
            className="group flex items-center gap-2 focus:outline-none select-none"
          >
            <span className="font-display font-extrabold text-[18px] sm:text-[22px] tracking-[-0.03em] text-[#F1F5F9] flex items-center">
              <span>EVAN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] inline-block mx-1 shadow-[0_0_10px_#3B82F6]" />
              <span className="text-[#60A5FA]">PRASETYA</span>
            </span>
          </a>

          {/* Center: Numbered Editorial Navigation (Visible from md / 768px and up, no need to zoom) */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center divide-x divide-[#263B59]/60 border border-[#263B59]/70 bg-[#101E33]/80"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`relative px-3 lg:px-4 xl:px-5 py-2 font-mono text-[10px] lg:text-[11px] font-semibold tracking-[0.15em] transition-colors duration-200 ${isActive
                    ? 'text-[#F1F5F9] bg-[#152640]'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#152640]/50'
                    }`}
                >
                  <span className="text-[#38BDF8] mr-1">[{item.code}</span>
                  <span>{item.label}]</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Availability Indicator & Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#263B59] bg-[#101E33]/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
              </span>
              <span className="font-mono text-[9px] lg:text-[10px] font-bold tracking-[0.14em] uppercase text-[#F1F5F9]">
                TERSEDIA MAGANG
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-[#263B59] bg-[#101E33] text-[#F1F5F9] hover:border-[#3B82F6] transition-colors cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Android / Phone View) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#263B59] bg-[#0A1424]/98 backdrop-blur-lg px-5 py-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#263B59]/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-[#38BDF8]">
                  TERSEDIA UNTUK MAGANG &amp; PROYEK
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 divide-y divide-[#263B59]/40">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 font-mono text-xs font-bold tracking-[0.18em] text-[#F1F5F9] active:text-[#38BDF8] flex items-center justify-between"
                >
                  <span>
                    <span className="text-[#38BDF8] mr-2">[{item.code}</span>
                    {item.label}]
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8]" />
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          SOCIAL RAIL & QUICK ACCESS BAR:
          - Desktop & Tablet (md+): ALWAYS VISIBLE on the left side at 100% zoom, 90% zoom, or 110% zoom!
          - Android / Mobile (< md): ALWAYS VISIBLE as a sleek bottom bar so it works everywhere consistently!
         ===================================================================== */}
      {/* Desktop / Laptop / Tablet Left Rail (Always Visible on md and up, no xl restriction!) */}
      <aside
        aria-label="Tautan Cepat Sosial & CV"
        className="fixed left-2.5 sm:left-3.5 lg:left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3.5 select-none"
      >
        <div className="w-px h-10 bg-[#263B59]" />
        <a
          href="https://github.com/EvanPrasetya"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub — EvanPrasetya"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com/evnsss__"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram — @evnsss__"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
        <a
          href="mailto:evansprasetyaa@gmail.com"
          title="Email — evansprasetyaa@gmail.com"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5"
        >
          <Mail className="w-4 h-4" />
        </a>
        <button
          type="button"
          onClick={() => setShowCVModal(true)}
          title="Preview CV"
          className="w-9 h-9 border border-[#263B59] bg-[#101E33]/95 backdrop-blur-sm hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
        </button>
        <div className="w-px h-10 bg-[#263B59]" />
      </aside>

      {/* Android & Mobile Floating Quick-Access Dock (Always Visible on Mobile Screens < md) */}
      <aside
        aria-label="Menu Cepat Mobile & Android"
        className="md:hidden fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 bg-[#0A1424]/95 backdrop-blur-md border border-[#263B59] shadow-[0_12px_32px_rgba(0,0,0,0.75)]">
          <a
            href="https://github.com/EvanPrasetya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 border border-[#263B59] bg-[#101E33] active:bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/evnsss__"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 border border-[#263B59] bg-[#101E33] active:bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:evansprasetyaa@gmail.com"
            aria-label="Email"
            className="w-9 h-9 border border-[#263B59] bg-[#101E33] active:bg-[#3B82F6] text-[#F1F5F9] flex items-center justify-center"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setShowCVModal(true)}
            className="h-9 px-3 border border-[#3B82F6] bg-[#152640] active:bg-[#3B82F6] text-[#F1F5F9] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>CV</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT (With left padding on md+ so the persistent social rail never overlaps content) */}
      <main className="relative z-10 pt-16 sm:pt-20 pb-20 md:pb-0">
        {/* =====================================================================
            01. HERO — PROFIL (EDITORIAL ASYMMETRIC COMPOSITION WITH PORTRAIT)
           ===================================================================== */}
        <section
          id="profile"
          aria-label="Bagian Hero Profil"
          className="relative w-full bg-[#0A1424] border-b border-[#263B59] editorial-grid-bg overflow-hidden"
        >
          {/* Subtle Static Ambient Blue Lighting */}
          <div
            className="pointer-events-none absolute top-1/4 right-[10%] w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(56, 189, 248, 0.06) 50%, transparent 75%)',
            }}
          />

          {/* Giant Editorial Background Watermark Typography */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-[12%] sm:top-[14%] inset-x-0 flex justify-center overflow-hidden z-0"
          >
            <span className="font-display font-black uppercase tracking-[-0.04em] leading-none whitespace-nowrap text-[46px] sm:text-[96px] md:text-[130px] lg:text-[175px] text-blue-glow-shine">
              EVAN PRASETYA
            </span>
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12 pt-6 sm:pt-12 pb-14 sm:pb-16 lg:pb-24">
            {/* Top Editorial Meta Strip */}
            <ScrollReveal>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 lg:mb-14 border-b border-[#263B59]/80">
                <div className="font-mono text-[10px] sm:text-[12px] font-bold tracking-[0.22em] uppercase text-[#38BDF8]">
                  [ 01 . PROFIL ]
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#94A3B8]">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>TERSEDIA UNTUK MAGANG &amp; PROYEK</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Main Editorial Hero Grid: Left Typography + Right Large Portrait Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              {/* Left Column (7 Cols) */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
                <ScrollReveal delay={80}>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="inline-flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#60A5FA]">
                      <span>Mahasiswa Sistem Informasi</span>
                      <span className="text-[#263B59]">/</span>
                      <span className="text-[#94A3B8]">Full-Stack Web Developer · UI/UX</span>
                    </div>

                    <h1 className="font-display font-black text-[36px] sm:text-[56px] lg:text-[74px] leading-[0.95] tracking-[-0.03em] uppercase text-[#F1F5F9]">
                      EVAN{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F5F9] via-[#60A5FA] to-[#3B82F6]">
                        PRASETYA
                      </span>
                    </h1>
                  </div>
                </ScrollReveal>

                {/* Main Editorial Statement */}
                <ScrollReveal delay={150}>
                  <div className="border-l-2 border-[#3B82F6] pl-4 sm:pl-6 py-1">
                    <p className="font-display font-bold text-[20px] sm:text-[28px] lg:text-[34px] leading-[1.18] tracking-[-0.02em] text-[#F1F5F9]">
                      &ldquo;Dari ide menjadi{' '}
                      <span className="italic font-normal text-[#38BDF8]">solusi digital.</span>
                      &rdquo;
                    </p>
                  </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay={220}>
                  <p className="text-[14px] sm:text-[16px] leading-[1.75] text-[#94A3B8] max-w-[640px]">
                    Saya Alfarell Nabil Evan Prasetya, mahasiswa Sistem Informasi Universitas
                    Semarang yang berfokus pada pengembangan aplikasi web Full-Stack (Laravel,
                    React, &amp; Next.js), perancangan UI/UX interaktif, pengelolaan basis data
                    MySQL, serta analisis sistem yang terstruktur.
                  </p>
                </ScrollReveal>

                {/* Primary Hero Actions */}
                <ScrollReveal delay={280}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                    <a
                      href="#selected"
                      className="inline-flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 sm:py-4 transition-colors duration-200"
                    >
                      <span>LIHAT PROYEK SAYA</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowCVModal(true)}
                      className="inline-flex items-center justify-center gap-3 border border-[#263B59] bg-[#101E33] hover:border-[#60A5FA] hover:bg-[#152640] text-[#F1F5F9] font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 sm:py-4 transition-colors duration-200 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#38BDF8]" />
                      <span>PREVIEW CV</span>
                    </button>
                  </div>
                </ScrollReveal>

                {/* Three Highlight Metrics (01, 02, 03) */}
                <ScrollReveal delay={340}>
                  <div className="pt-6 border-t border-[#263B59] grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="border border-[#263B59] bg-[#101E33]/90 p-4 hover:border-[#3B82F6] transition-colors">
                      <div className="font-mono text-[11px] font-bold text-[#38BDF8] tracking-widest">
                        [01]
                      </div>
                      <div className="font-display font-bold text-[14px] sm:text-[15px] text-[#F1F5F9] mt-1">
                        Mahasiswa Sistem Informasi
                      </div>
                      <div className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mt-0.5">
                        UNIVERSITAS SEMARANG (IPK 3.75)
                      </div>
                    </div>

                    <div className="border border-[#263B59] bg-[#101E33]/90 p-4 hover:border-[#3B82F6] transition-colors">
                      <div className="font-mono text-[11px] font-bold text-[#38BDF8] tracking-widest">
                        [02]
                      </div>
                      <div className="font-display font-bold text-[14px] sm:text-[15px] text-[#F1F5F9] mt-1">
                        Full-Stack &amp; UI/UX
                      </div>
                      <div className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mt-0.5">
                        LARAVEL · REACT · NEXT.JS
                      </div>
                    </div>

                    <div className="border border-[#263B59] bg-[#101E33]/90 p-4 hover:border-[#3B82F6] transition-colors">
                      <div className="font-mono text-[11px] font-bold text-[#38BDF8] tracking-widest">
                        [03]
                      </div>
                      <div className="font-display font-bold text-[14px] sm:text-[15px] text-[#F1F5F9] mt-1">
                        Siap Magang &amp; Kolaborasi
                      </div>
                      <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider mt-0.5">
                        TERSEDIA SAAT INI ●
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column (5 Cols): Large Editorial Portrait Composition (Responsive on Android & Desktop) */}
              <div className="lg:col-span-5 order-1 lg:order-2 max-w-md mx-auto lg:max-w-none w-full">
                <ScrollReveal delay={120}>
                  <div className="relative border border-[#263B59] bg-[#101E33] overflow-hidden group">
                    {/* Top Technical Frame Header */}
                    <div className="px-4 py-2.5 sm:py-3 border-b border-[#263B59] bg-[#0A1424]/90 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#94A3B8]">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                        <span>PORTRAIT // EVAN.PRASETYA</span>
                      </span>
                      <span className="text-[#38BDF8]">USM · FTIK</span>
                    </div>

                    {/* Editorial Portrait Stage */}
                    <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-[#152640] via-[#101E33] to-[#0A1424] flex items-end justify-center overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, #263B59 1px, transparent 1px), linear-gradient(to bottom, #263B59 1px, transparent 1px)',
                          backgroundSize: '48px 48px',
                        }}
                      />
                      <div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-72 h-60 sm:h-72 rounded-full pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(59, 130, 246, 0.32) 0%, transparent 70%)',
                        }}
                      />

                      {/* Corner Brackets */}
                      <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#60A5FA]/60 z-20" />
                      <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#60A5FA]/60 z-20" />
                      <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#60A5FA]/60 z-20" />
                      <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#60A5FA]/60 z-20" />

                      {/* User's Actual Cutout Portrait */}
                      <img
                        src="/evan-cutout.png"
                        alt="Alfarell Nabil Evan Prasetya — Mahasiswa Sistem Informasi Universitas Semarang"
                        className="relative z-10 w-[88%] h-[92%] object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-[0_20px_40px_rgba(5,10,20,0.85)]"
                        onError={(e) => {
                          e.currentTarget.src = '/evan-profile.jpg';
                        }}
                      />

                      {/* Bottom Editorial Fade Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A1424] via-[#0A1424]/75 to-transparent z-10 pointer-events-none" />

                      {/* Bottom Overlay Caption */}
                      <div className="absolute bottom-3.5 inset-x-4 sm:inset-x-5 z-20 flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#38BDF8]">
                            S1 SISTEM INFORMASI
                          </p>
                          <p className="font-display font-extrabold text-sm sm:text-base text-[#F1F5F9] tracking-tight truncate">
                            ALFARELL NABIL EVAN PRASETYA
                          </p>
                        </div>
                        <span className="font-mono text-[9px] sm:text-[10px] px-2 py-1 border border-[#263B59] bg-[#0A1424]/90 text-[#94A3B8] shrink-0">
                          SEMARANG, ID
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            01B. TENTANG SAYA & SPESIALISASI KEAHLIAN
           ===================================================================== */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="relative w-full bg-[#101E33] border-b border-[#263B59] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
          {/* Large Background Editorial Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-6 right-4 sm:right-10 font-display font-black text-[clamp(4rem,15vw,18rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.025] leading-none z-0"
          >
            PROFIL
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column (5 Cols): Section Label, Heading, Structured Metadata, Download CV */}
              <div className="lg:col-span-5 flex flex-col">
                <ScrollReveal>
                  <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-3">
                    [ 01 . PROFIL ]
                  </div>
                  <h2
                    id="about-heading"
                    className="font-display font-black text-[36px] sm:text-[50px] lg:text-[62px] leading-[0.95] tracking-tight uppercase text-[#F1F5F9] mb-8 sm:mb-10"
                  >
                    TENTANG <span className="italic font-normal text-[#60A5FA]">SAYA</span>
                  </h2>
                </ScrollReveal>

                {/* Editorial Profile Metadata Grid */}
                <ScrollReveal delay={100}>
                  <div className="space-y-5 sm:space-y-6 border-l-2 border-[#3B82F6] pl-4 sm:pl-6 mb-8 sm:mb-10">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        NAMA LENGKAP
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#F1F5F9] tracking-wide">
                        Alfarell Nabil Evan Prasetya
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        PENDIDIKAN
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#F1F5F9] tracking-wide">
                        Universitas Semarang (IPK 3.75 / 4.00)
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        FOKUS &amp; SPESIALISASI
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#38BDF8] tracking-wide">
                        SISTEM INFORMASI · FULL-STACK WEB DEVELOPER
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] mb-1">
                        STATUS SAAT INI
                      </p>
                      <p className="font-mono text-[13px] sm:text-[14px] font-bold text-[#F1F5F9] tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />
                        <span>TERSEDIA UNTUK MAGANG &amp; KOLABORASI</span>
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Download CV & Preview CV Buttons */}
                <ScrollReveal delay={180}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={cvFileUrl}
                      download="CV - Alfarell Nabil Evan Prasetya.pdf"
                      className="inline-flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] transition-colors duration-200 font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 sm:py-4"
                    >
                      <span>UNDUH CV</span>
                      <Download className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowCVModal(true)}
                      className="inline-flex items-center justify-center gap-2.5 border border-[#263B59] bg-[#0A1424] hover:border-[#60A5FA] text-[#F1F5F9] transition-colors duration-200 font-mono text-[11px] font-bold tracking-[0.18em] uppercase px-6 py-3.5 sm:py-4 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#38BDF8]" />
                      <span>LIHAT PDF CV</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column (7 Cols): Description & 3 Specialization Blocks */}
              <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10">
                <ScrollReveal delay={120}>
                  <div className="border-b border-[#263B59] pb-6 sm:pb-8">
                    <p className="text-[15px] sm:text-[19px] leading-[1.75] text-[#F1F5F9] font-normal">
                      &ldquo;Saat ini saya menempuh pendidikan S1 Sistem Informasi di Universitas
                      Semarang (USM). Saya berpengalaman merancang arsitektur backend RESTful API
                      menggunakan Laravel, membangun antarmuka web modern dan aplikatif dengan
                      React.js, Next.js, serta Tailwind CSS, mengelola basis data relasional MySQL,
                      hingga merancang prototipe UI/UX di Figma.&rdquo;
                    </p>
                  </div>
                </ScrollReveal>

                {/* Three Specialization Blocks (01, 02, 03) */}
                <div className="space-y-5">
                  <ScrollReveal delay={180}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                        KEAHLIAN TEKNIS &amp; TEKNOLOGI UTAMA
                      </span>
                      <span className="font-mono text-[11px] text-[#38BDF8]">01 — 03</span>
                    </div>
                  </ScrollReveal>

                  <div className="divide-y divide-[#263B59] border-t border-b border-[#263B59]">
                    {specializations.map((spec, sIdx) => (
                      <ScrollReveal key={spec.num} delay={200 + sIdx * 90}>
                        <div className="py-6 sm:py-7 group transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2.5">
                            <div className="flex items-baseline gap-2.5">
                              <span className="font-mono text-[12px] font-bold text-[#38BDF8] tracking-widest shrink-0">
                                {spec.num} —
                              </span>
                              <h3 className="font-display font-extrabold text-[17px] sm:text-[21px] tracking-tight uppercase text-[#F1F5F9] group-hover:text-[#60A5FA] transition-colors">
                                {spec.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-[13px] sm:text-[14px] text-[#94A3B8] leading-relaxed mb-4 max-w-2xl">
                            {spec.description}
                          </p>

                          {/* Elegant Text Labels matching the user's actual projects */}
                          <div className="flex flex-wrap items-center gap-y-2">
                            {spec.skills.map((skill, idx) => (
                              <React.Fragment key={skill}>
                                <span className="font-mono text-[11px] sm:text-[13px] font-semibold tracking-wider text-[#F1F5F9] group-hover:text-[#38BDF8] transition-colors">
                                  {skill}
                                </span>
                                {idx < spec.skills.length - 1 && (
                                  <span className="mx-2.5 sm:mx-3 text-[#263B59] font-mono">/</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDITORIAL TYPOGRAPHY MARQUEE STRIP */}
        <section
          aria-label="Marquee Teknologi"
          className="relative w-full overflow-hidden bg-[#0A1424] border-b border-[#263B59] py-6 sm:py-9 select-none"
        >
          <div className="animate-editorial-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {[
                  'LARAVEL 11',
                  'REACT.JS',
                  'NEXT.JS',
                  'TAILWIND CSS',
                  'MYSQL DATABASE',
                  'RESTFUL API',
                  'TYPESCRIPT',
                  'FIGMA UI/UX',
                ].map((item, idx) => (
                  <span key={`${dup}-${idx}`} className="flex items-center shrink-0">
                    <span className="font-display font-black text-[clamp(1.75rem,5vw,4.25rem)] uppercase leading-none tracking-tight text-[#F1F5F9]/15 hover:text-[#F1F5F9] transition-colors duration-200">
                      {item}
                    </span>
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#3B82F6] mx-5 sm:mx-9 inline-block shadow-[0_0_10px_#3B82F6]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            02. PROYEK UNGGULAN (4 PROYEK ASLI: WEBGUARD, COBAIN AI, STAND CHILLA, CLEANRIDE)
           ===================================================================== */}
        <section
          id="selected"
          aria-labelledby="selected-heading"
          className="relative w-full bg-[#0A1424] border-b border-[#263B59] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
          {/* Background Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-8 right-4 sm:right-10 font-display font-black text-[clamp(4rem,15vw,18rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.02] leading-none z-0"
          >
            PROYEK
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            {/* Section Header */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 lg:mb-20 gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#263B59]">
                <div>
                  <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-2.5">
                    [ 02 . PROYEK ]
                  </div>
                  <h2
                    id="selected-heading"
                    className="font-display font-black text-[36px] sm:text-[52px] lg:text-[68px] leading-[0.95] tracking-tight uppercase text-[#F1F5F9]"
                  >
                    PILIHAN <span className="italic font-normal text-[#60A5FA]">KARYA</span>
                  </h2>
                </div>
                <p className="text-[13px] sm:text-[15px] leading-[1.7] text-[#94A3B8] max-w-[440px]">
                  Kumpulan pengembangan arsitektur sistem dan aplikasi web Full-Stack. Klik pada
                  kartu proyek untuk melihat studi kasus, fitur, dan galeri dokumentasi lengkap.
                </p>
              </div>
            </ScrollReveal>

            {/* Large Editorial Project Layout (2-Column Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {selectedProjects.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 100}>
                  <article
                    onClick={() => setSelectedProject(project)}
                    className="group relative h-full border border-[#263B59] bg-[#101E33] hover:border-[#3B82F6] transition-colors duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
                  >
                    {/* Top Meta Bar */}
                    <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#263B59] bg-[#0A1424]/70 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <span className="font-mono text-[11px] sm:text-[12px] font-bold text-[#38BDF8] tracking-widest shrink-0">
                          [{project.number}]
                        </span>
                        <span className="text-[#263B59] shrink-0">/</span>
                        <span className="font-mono text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8] truncate">
                          {project.category}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8] shrink-0">
                        {project.year}
                      </span>
                    </div>

                    {/* Large Project Screenshot */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#263B59] bg-[#070E1A]">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1424] via-transparent to-transparent opacity-65" />
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-[#0A1424]/90 border border-[#263B59] font-mono text-[9px] sm:text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider">
                        {project.gallery.length} DOKUMENTASI FOTO
                      </div>
                    </div>

                    {/* Editorial Project Details */}
                    <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-5 sm:space-y-6">
                      <div className="space-y-2.5 sm:space-y-3">
                        <p className="font-mono text-[10px] sm:text-[11px] font-bold text-[#60A5FA] tracking-[0.12em] uppercase">
                          {project.tags.join('  ·  ')}
                        </p>
                        <h3 className="font-display font-black text-[20px] sm:text-[26px] leading-[1.15] tracking-tight text-[#F1F5F9] group-hover:text-[#38BDF8] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[13px] sm:text-[15px] text-[#94A3B8] leading-[1.7]">
                          {project.shortDesc}
                        </p>
                      </div>

                      {/* View Case Study Action & GitHub Link */}
                      <div className="pt-4 border-t border-[#263B59]/70 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#F1F5F9] group-hover:text-[#38BDF8] transition-colors">
                          <span>BUKA DETAIL &amp; DOKUMENTASI</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Lihat Repositori GitHub"
                          className="p-2 border border-[#263B59] bg-[#0A1424] hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#94A3B8] hover:text-[#0A1424] transition-colors shrink-0"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Bottom Blue Highlight Line on Hover */}
                    <div className="h-[2px] w-full bg-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            03. SERTIFIKAT & KREDENSIAL (3 SERTIFIKAT ASLI HIMMATISI)
           ===================================================================== */}
        <section
          id="credentials"
          aria-labelledby="credentials-heading"
          className="relative w-full bg-[#101E33] border-b border-[#263B59] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
          {/* Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-8 right-4 sm:right-10 font-display font-black text-[clamp(3.5rem,13vw,16rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.02] leading-none z-0"
          >
            SERTIFIKAT
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            {/* Section Header */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 lg:mb-16 gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#263B59]">
                <div>
                  <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-2.5">
                    [ 03 . SERTIFIKAT ]
                  </div>
                  <h2
                    id="credentials-heading"
                    className="font-display font-black text-[34px] sm:text-[50px] lg:text-[64px] leading-[0.95] tracking-tight uppercase text-[#F1F5F9]"
                  >
                    SERTIFIKAT &amp;{' '}
                    <span className="italic font-normal text-[#60A5FA]">APRESIASI</span>
                  </h2>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevCert}
                    className="w-10 h-10 sm:w-11 sm:h-11 border border-[#263B59] bg-[#0A1424] hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#F1F5F9] hover:text-[#0A1424] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Sertifikat Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextCert}
                    className="w-10 h-10 sm:w-11 sm:h-11 border border-[#263B59] bg-[#0A1424] hover:bg-[#3B82F6] hover:border-[#60A5FA] text-[#F1F5F9] hover:text-[#0A1424] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Sertifikat Berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* 3 Authentic HIMMATISI Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {credentialsList.map((cred, index) => {
                const isFocused = index === activeCertIndex;
                return (
                  <ScrollReveal key={cred.id} delay={index * 100}>
                    <div
                      onClick={() => {
                        setActiveCertIndex(index);
                        setSelectedCertificate(cred);
                      }}
                      className={`group h-full border p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${isFocused
                        ? 'bg-[#152640] border-[#3B82F6] shadow-[0_16px_40px_rgba(5,10,20,0.65)]'
                        : 'bg-[#0A1424] border-[#263B59] hover:border-[#60A5FA]'
                        }`}
                    >
                      <div>
                        {/* Top Issuing Organization & Year */}
                        <div className="flex items-center justify-between border-b border-[#263B59] pb-3.5 mb-4 gap-2">
                          <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#38BDF8] truncate">
                            {cred.organization}
                          </span>
                          <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8] shrink-0">
                            {cred.year}
                          </span>
                        </div>

                        {/* Authentic Certificate Image Preview */}
                        <div className="relative w-full aspect-[4/3] bg-[#070E1A] border border-[#263B59] overflow-hidden my-2">
                          <img
                            src={cred.previewImage}
                            alt={cred.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1424]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#F1F5F9] bg-[#0A1424]/90 border border-[#3B82F6] px-2.5 py-1">
                              KLIK UNTUK PERBESAR
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Title, Role & View Certificate Action */}
                      <div className="mt-4 pt-4 border-t border-[#263B59]/60 space-y-3.5">
                        <div>
                          <span className="font-mono text-[9px] sm:text-[10px] text-[#60A5FA] uppercase tracking-widest block mb-1">
                            {cred.category} · {cred.date}
                          </span>
                          <h3 className="font-display font-extrabold text-[16px] sm:text-[18px] leading-snug text-[#F1F5F9] group-hover:text-[#38BDF8] transition-colors">
                            {cred.title}
                          </h3>
                          <p className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8] mt-1">
                            No: {cred.code}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#F1F5F9] group-hover:text-[#38BDF8] flex items-center gap-1.5">
                            <span>LIHAT SERTIFIKAT</span>
                            <span>↗</span>
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                            TERVERIFIKASI ✓
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            04. PENDIDIKAN & PENGALAMAN ORGANISASI (TERMASUK SERTIFIKAT HIMMATISI)
           ===================================================================== */}
        <section
          id="career"
          aria-labelledby="career-heading"
          className="relative w-full bg-[#0A1424] border-b border-[#263B59] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
          {/* Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-8 right-4 sm:right-10 font-display font-black text-[clamp(3.5rem,13vw,16rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.02] leading-none z-0"
          >
            PENDIDIKAN
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            {/* Section Header */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 lg:mb-20 gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#263B59]">
                <div>
                  <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-2.5">
                    [ 04 . REKAM JEJAK ]
                  </div>
                  <h2
                    id="career-heading"
                    className="font-display font-black text-[34px] sm:text-[50px] lg:text-[64px] leading-[0.95] tracking-tight uppercase text-[#F1F5F9]"
                  >
                    PENDIDIKAN &amp;{' '}
                    <span className="italic font-normal text-[#60A5FA]">ORGANISASI</span>
                  </h2>
                </div>
                <p className="text-[13px] sm:text-[15px] leading-[1.7] text-[#94A3B8] max-w-[440px]">
                  Latar belakang akademik Program Studi S1 Sistem Informasi serta keterlibatan aktif
                  dan dokumentasi sertifikat di organisasi HIMMATISI Universitas Semarang.
                </p>
              </div>
            </ScrollReveal>

            {/* Editorial Timeline Grid: Academic Background & Organizational Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14">
              {/* Left Column (5 Cols): LATAR BELAKANG AKADEMIK */}
              <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
                <ScrollReveal delay={80}>
                  <div className="pb-3 border-b border-[#263B59] flex items-center justify-between">
                    <h3 className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>LATAR BELAKANG PENDIDIKAN</span>
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8]">
                      2024 — SEKARANG
                    </span>
                  </div>

                  <div className="mt-4 border border-[#263B59] bg-[#101E33] p-5 sm:p-8 hover:border-[#3B82F6] transition-colors space-y-5 sm:space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#38BDF8] px-3 py-1 bg-[#152640] border border-[#263B59]">
                        2024 — SEKARANG
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-emerald-400">
                        MAHASISWA AKTIF
                      </span>
                    </div>

                    <div>
                      <h4 className="font-display font-black text-[22px] sm:text-[28px] uppercase text-[#F1F5F9] tracking-tight">
                        UNIVERSITAS SEMARANG (USM)
                      </h4>
                      <p className="font-mono text-[12px] sm:text-[13px] font-bold text-[#60A5FA] uppercase tracking-wider mt-1">
                        S1 Sistem Informasi · Fakultas Teknologi Informasi dan Komunikasi
                      </p>
                      <p className="text-[13px] text-[#94A3B8] mt-2 leading-relaxed">
                        Mempelajari pengembangan aplikasi web Full-Stack, perancangan basis data
                        relasional, rekayasa sistem informasi, analisis kebutuhan sistem, serta
                        perancangan antarmuka UI/UX.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#263B59] grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
                          IPK AKADEMIK
                        </span>
                        <span className="font-display font-extrabold text-xl sm:text-2xl text-[#F1F5F9]">
                          3.75 <span className="text-xs font-mono text-[#38BDF8]">/ 4.00</span>
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
                          PENDIDIKAN SEBELUMNYA
                        </span>
                        <span className="font-display font-bold text-xs sm:text-sm text-[#F1F5F9] mt-1 block">
                          SMAN 06 Semarang
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column (7 Cols): PENGALAMAN ORGANISASI HIMMATISI + GALERI SERTIFIKAT */}
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                <ScrollReveal delay={160}>
                  <div className="pb-3 border-b border-[#263B59] flex items-center justify-between">
                    <h3 className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#38BDF8] flex items-center gap-2">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>PENGALAMAN ORGANISASI</span>
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8]">
                      UNIVERSITAS SEMARANG
                    </span>
                  </div>

                  <div className="mt-4 border border-[#263B59] bg-[#101E33] p-5 sm:p-8 hover:border-[#3B82F6] transition-colors space-y-5 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#263B59]">
                      <div>
                        <h4 className="font-display font-black text-[22px] sm:text-[30px] uppercase text-[#F1F5F9] tracking-tight">
                          HIMMATISI USM
                        </h4>
                        <p className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#60A5FA] mt-0.5">
                          Himpunan Mahasiswa Teknologi Informasi dan Sistem Informasi
                        </p>
                      </div>
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#38BDF8] tracking-widest uppercase shrink-0">
                        FTIK · USM
                      </span>
                    </div>

                    {/* Jabatan & Periode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 bg-[#0A1424]/70 border border-[#263B59] p-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1">
                          DIVISI &amp; PERAN
                        </span>
                        <span className="font-mono text-[12px] sm:text-[13px] font-bold text-[#F1F5F9]">
                          Anggota Divisi Komunikasi &amp; Informasi (Kominfo) / Media
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1">
                          PERIODE AKTIF
                        </span>
                        <span className="font-mono text-[12px] sm:text-[13px] font-bold text-[#38BDF8]">
                          2024 — SEKARANG
                        </span>
                      </div>
                    </div>

                    {/* Tanggung Jawab & Kontribusi */}
                    <div className="space-y-3">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                        TANGGUNG JAWAB &amp; KONTRIBUSI
                      </div>
                      <div className="space-y-2.5">
                        {[
                          'Mengelola publikasi informasi, dokumentasi kegiatan, dan konten media sosial resmi untuk menjangkau mahasiswa jurusan.',
                          'Berperan aktif sebagai Anggota Divisi Media dalam menyukseskan kegiatan seminar TISI INSIGHT 2026.',
                          'Merancang aset visual dan desain grafis untuk kebutuhan publikasi program kerja serta acara departemen.',
                          'Berkolaborasi dengan tim lintas divisi dalam menyukseskan agenda tahunan, Kuliah Umum & Sarasehan, serta HIMMATISI One Night Solidarity.',
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-[13px] sm:text-[14px] text-[#94A3B8]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lampiran Sertifikat Organisasi HIMMATISI Langsung di Dalam Kartu HIMMATISI */}
                    <div className="pt-5 border-t border-[#263B59] space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#38BDF8] flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          <span>DOKUMENTASI SERTIFIKAT HIMMATISI (3 SERTIFIKAT)</span>
                        </span>
                        <span className="font-mono text-[10px] text-[#94A3B8]">
                          KLIK UNTUK MEMPERBESAR
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {credentialsList.map((cert) => (
                          <div
                            key={cert.id}
                            onClick={() => setSelectedCertificate(cert)}
                            className="group/cert border border-[#263B59] bg-[#0A1424] hover:border-[#38BDF8] transition-colors cursor-pointer overflow-hidden flex flex-col justify-between"
                          >
                            <div className="aspect-[4/3] w-full overflow-hidden bg-[#070E1A] relative">
                              <img
                                src={cert.previewImage}
                                alt={cert.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-2.5 border-t border-[#263B59]">
                              <p className="font-mono text-[9px] text-[#38BDF8] uppercase truncate">
                                {cert.date}
                              </p>
                              <p className="font-display font-bold text-[11px] text-[#F1F5F9] leading-snug line-clamp-2 mt-0.5 group-hover/cert:text-[#60A5FA]">
                                {cert.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            05. KONTAK & KOLABORASI
           ===================================================================== */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative w-full bg-[#0A1424] border-b border-[#263B59] pt-16 sm:pt-24 lg:pt-36 pb-16 sm:pb-24 overflow-hidden"
        >
          {/* Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-8 right-4 sm:right-10 font-display font-black text-[clamp(4rem,15vw,18rem)] uppercase tracking-tighter text-[#F1F5F9]/[0.02] leading-none z-0"
          >
            KONTAK
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12">
            <ScrollReveal>
              <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#38BDF8] uppercase mb-4 sm:mb-6">
                [ 05 . HUBUNGI SAYA ]
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end mb-12 sm:mb-16 lg:mb-24">
                <div className="lg:col-span-8">
                  <h2
                    id="contact-heading"
                    className="font-display font-black text-[36px] sm:text-[62px] lg:text-[88px] leading-[0.95] tracking-[-0.03em] uppercase text-[#F1F5F9]"
                  >
                    MARI BERDISKUSI <br />
                    <span className="italic font-normal text-[#60A5FA]">&amp; BERKOLABORASI.</span>
                  </h2>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[14px] sm:text-[16px] leading-[1.75] text-[#94A3B8]">
                    Tertarik dengan cara saya membangun arsitektur aplikasi atau ingin berkolaborasi
                    dalam sebuah proyek maupun program magang? Jangan ragu untuk menghubungi saya.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Minimal Contact Information Grid */}
            <ScrollReveal delay={120}>
              <div className="border-t border-[#263B59] pt-10 sm:pt-12 lg:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
                {/* Column 1 (4 Cols): Social Links */}
                <div className="md:col-span-4 flex flex-col">
                  <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase mb-4 sm:mb-6">
                    MEDIA SOSIAL &amp; REPOSITORI
                  </h3>
                  <div className="flex flex-col divide-y divide-[#263B59]/60 border-t border-b border-[#263B59]/60">
                    <a
                      href="https://github.com/EvanPrasetya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-bold text-[14px] sm:text-[16px] uppercase tracking-wider text-[#94A3B8] hover:text-[#F1F5F9] py-3.5 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <GithubIcon className="w-4 h-4 text-[#60A5FA]" />
                        <span>GITHUB</span>
                      </span>
                      <span className="font-mono text-xs text-[#94A3B8] group-hover:text-[#38BDF8]">
                        github.com/EvanPrasetya ↗
                      </span>
                    </a>

                    <a
                      href="https://instagram.com/evnsss__"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-bold text-[14px] sm:text-[16px] uppercase tracking-wider text-[#94A3B8] hover:text-[#F1F5F9] py-3.5 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <InstagramIcon className="w-4 h-4 text-[#60A5FA]" />
                        <span>INSTAGRAM</span>
                      </span>
                      <span className="font-mono text-xs text-[#94A3B8] group-hover:text-[#38BDF8]">
                        @evnsss__ ↗
                      </span>
                    </a>

                    <a
                      href="mailto:evansprasetyaa@gmail.com"
                      className="font-display font-bold text-[14px] sm:text-[16px] uppercase tracking-wider text-[#94A3B8] hover:text-[#F1F5F9] py-3.5 flex items-center justify-between group transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#60A5FA]" />
                        <span>EMAIL</span>
                      </span>
                      <span className="font-mono text-xs text-[#94A3B8] group-hover:text-[#38BDF8]">
                        evansprasetyaa@gmail.com ↗
                      </span>
                    </a>
                  </div>
                </div>

                {/* Column 2 (5 Cols): Contact Details & Availability */}
                <div className="md:col-span-5 flex flex-col">
                  <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase mb-4 sm:mb-6">
                    INFORMASI KONTAK LANGSUNG
                  </h3>
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1">
                        EMAIL LANGSUNG
                      </span>
                      <a
                        href="mailto:evansprasetyaa@gmail.com?subject=Diskusi%20Proyek%20%2F%20Tawaran%20Kolaborasi%20-%20Portfolio%20Evan"
                        className="font-display font-extrabold text-[17px] sm:text-[22px] text-[#F1F5F9] hover:text-[#38BDF8] transition-colors tracking-tight block break-all"
                      >
                        evansprasetyaa@gmail.com
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-1">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1">
                          KETERSEDIAAN
                        </span>
                        <p className="font-mono text-[12px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>TERBUKA UNTUK MAGANG</span>
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] block mb-1">
                          DOMISILI
                        </span>
                        <p className="font-mono text-[12px] sm:text-[13px] font-bold text-[#F1F5F9] tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>SEMARANG, INDONESIA</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3 (3 Cols): Local Time WIB */}
                <div className="md:col-span-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#38BDF8] uppercase mb-2">
                      WAKTU LOKAL
                    </h3>
                    <span className="font-mono text-[11px] text-[#94A3B8] tracking-wider block mb-3 sm:mb-4">
                      SEMARANG, ID (WIB)
                    </span>
                    <div className="flex items-baseline gap-2.5 py-3 px-4 sm:py-3.5 sm:px-5 border border-[#263B59] bg-[#101E33] w-fit">
                      <Clock className="w-4 h-4 text-[#38BDF8] self-center mr-1" />
                      <span className="font-display font-black text-[24px] sm:text-[32px] tracking-tight text-[#F1F5F9] tabular-nums">
                        {localTime || '12:00:00'}
                      </span>
                      <span className="font-mono font-bold text-[12px] text-[#38BDF8] tracking-wider">
                        WIB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* =====================================================================
          06. FOOTER
         ===================================================================== */}
      <footer className="w-full bg-[#0A1424] text-[#F1F5F9] border-t border-[#263B59]/80 relative z-20 pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:pl-16 lg:pl-20 lg:pr-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
            <span className="font-display font-extrabold text-sm tracking-tight text-[#F1F5F9]">
              EVAN<span className="text-[#3B82F6]">.</span>PRASETYA
            </span>
            <span className="text-[#263B59] hidden sm:inline">|</span>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
              © 2026 Alfarell Nabil Evan Prasetya. Hak Cipta Dilindungi.
            </p>
          </div>
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#94A3B8]">
            SISTEM INFORMASI · UNIVERSITAS SEMARANG
          </p>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: DETAIL PROYEK & GALERI DOKUMENTASI ASLI
         ===================================================================== */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[70] bg-[#060C17]/85 backdrop-blur-md overflow-y-auto p-3 sm:p-8 flex items-start justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl border border-[#263B59] bg-[#101E33] my-auto overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#0A1424] border-b border-[#263B59] px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#38BDF8] uppercase tracking-widest truncate">
                  <span>[PROYEK {selectedProject.number}]</span>
                  <span>·</span>
                  <span className="truncate">{selectedProject.category}</span>
                </div>
                <h3 className="font-display font-black text-base sm:text-2xl text-[#F1F5F9] mt-0.5 truncate">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-3 sm:px-4 py-2 border border-[#263B59] bg-[#101E33] hover:border-[#3B82F6] text-[#F1F5F9] font-mono text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shrink-0"
                aria-label="Tutup Modal"
              >
                <span className="hidden sm:inline">TUTUP</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8 space-y-8 sm:space-y-10">
              {/* Tech Stack Strip & GitHub Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#263B59]">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#263B59] bg-[#0A1424] font-mono text-[11px] sm:text-xs font-semibold text-[#38BDF8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>SOURCE CODE GITHUB</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Tantangan (Problem), Solusi (Solution), & Fitur Utama */}
              {selectedProject.details && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="border border-[#263B59] bg-[#0A1424]/70 p-4 sm:p-5 space-y-2">
                      <h4 className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                        TANTANGAN (PROBLEM)
                      </h4>
                      <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
                        {selectedProject.details.problem}
                      </p>
                    </div>
                    <div className="border border-[#263B59] bg-[#0A1424]/70 p-4 sm:p-5 space-y-2">
                      <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        SOLUSI (SOLUTION)
                      </h4>
                      <p className="text-[#F1F5F9] text-xs sm:text-sm leading-relaxed">
                        {selectedProject.details.solution}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider border-b border-[#263B59] pb-2">
                      FITUR UTAMA &amp; ARSITEKTUR
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {selectedProject.details.features.map((feat, idx) => {
                        const parts = feat.split(': ');
                        return (
                          <div
                            key={idx}
                            className="border border-[#263B59] bg-[#0A1424]/50 p-4 space-y-1.5"
                          >
                            <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold">
                              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                              <span>{parts[0]}</span>
                            </div>
                            <p className="text-[#94A3B8] text-xs leading-relaxed pl-6">
                              {parts[1] || parts[0]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Galeri Dokumentasi Sistem */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="space-y-4 sm:space-y-5 pt-4 border-t border-[#263B59]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#F1F5F9]">
                      DOKUMENTASI SISTEM ({selectedProject.gallery.length} TANGKAPAN LAYAR)
                    </h4>
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8]">
                      Klik gambar untuk memperbesar
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {selectedProject.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setZoomedImage(img)}
                        className="group border border-[#263B59] bg-[#0A1424] hover:border-[#3B82F6] transition-colors cursor-pointer overflow-hidden flex flex-col justify-between"
                      >
                        <div className="aspect-video w-full overflow-hidden bg-[#050A14] relative">
                          <img
                            src={img.src}
                            alt={img.caption}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-[#0A1424]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-4 py-1.5 bg-[#0A1424] border border-[#38BDF8] font-mono text-xs font-bold text-[#F1F5F9]">
                              PERBESAR GAMBAR
                            </span>
                          </div>
                        </div>
                        <div className="p-3 sm:p-3.5 border-t border-[#263B59] flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#38BDF8] shrink-0">
                            [0{idx + 1}]
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-[#F1F5F9] leading-snug">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: PREVIEW SERTIFIKAT HIMMATISI (DENGAN GAMBAR SERTIFIKAT ASLI)
         ===================================================================== */}
      {selectedCertificate && (
        <div
          onClick={() => setSelectedCertificate(null)}
          className="fixed inset-0 z-[75] bg-[#060C17]/90 backdrop-blur-md p-3 sm:p-8 overflow-y-auto flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl border border-[#3B82F6] bg-[#101E33] overflow-hidden shadow-2xl my-auto"
          >
            <div className="px-4 sm:px-6 py-4 bg-[#0A1424] border-b border-[#263B59] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#38BDF8] block truncate">
                  {selectedCertificate.category} · {selectedCertificate.date}
                </span>
                <h3 className="font-display font-black text-base sm:text-xl text-[#F1F5F9] mt-0.5 truncate">
                  {selectedCertificate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="px-3 py-1.5 border border-[#263B59] bg-[#101E33] text-[#F1F5F9] hover:border-[#3B82F6] font-mono text-xs font-bold cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span className="hidden sm:inline">TUTUP</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
              {/* Gambar Sertifikat Asli */}
              <div className="border border-[#263B59] bg-[#070E1A] overflow-hidden flex items-center justify-center max-h-[65vh]">
                <img
                  src={selectedCertificate.previewImage}
                  alt={selectedCertificate.title}
                  className="w-full h-auto max-h-[63vh] object-contain"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 bg-[#0A1424] border border-[#263B59] p-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">PENYELENGGARA</span>
                  <span className="text-[#F1F5F9] font-bold">
                    {selectedCertificate.organization}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">NOMOR SERTIFIKAT</span>
                  <span className="text-[#38BDF8] font-bold">{selectedCertificate.code}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">TANGGAL PELAKSANAAN</span>
                  <span className="text-[#F1F5F9] font-bold">{selectedCertificate.date}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {selectedCertificate.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: LIGHTBOX ZOOM GAMBAR PENUH
         ===================================================================== */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-[80] bg-[#060C17]/95 backdrop-blur-md p-3 sm:p-8 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="max-w-5xl w-full space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-xs sm:text-sm font-bold text-[#F1F5F9] truncate">
                {zoomedImage.caption}
              </p>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="px-3 sm:px-4 py-1.5 border border-[#263B59] bg-[#101E33] font-mono text-xs text-[#F1F5F9] cursor-pointer shrink-0"
              >
                TUTUP [ESC]
              </button>
            </div>
            <div className="border border-[#263B59] bg-[#0A1424] max-h-[82vh] overflow-hidden flex items-center justify-center">
              <img
                src={zoomedImage.src}
                alt={zoomedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: PREVIEW CV PDF INTERAKTIF
         ===================================================================== */}
      {showCVModal && (
        <div
          onClick={() => setShowCVModal(false)}
          className="fixed inset-0 z-[75] bg-[#060C17]/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[88vh] border border-[#263B59] bg-[#101E33] flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#263B59] bg-[#0A1424] flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#38BDF8] block">
                  PREVIEW CURRICULUM VITAE // EVAN PRASETYA
                </span>
                <h3 className="font-display font-bold text-sm sm:text-lg text-[#F1F5F9] truncate">
                  CV - Alfarell Nabil Evan Prasetya.pdf
                </h3>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={cvFileUrl}
                  download="CV - Alfarell Nabil Evan Prasetya.pdf"
                  className="px-3 sm:px-4 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-[#0A1424] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>UNDUH PDF</span>
                </a>
                <a
                  href={cvFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex px-4 py-2 border border-[#263B59] bg-[#101E33] hover:border-[#60A5FA] text-[#F1F5F9] font-mono text-[11px] uppercase tracking-wider items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>TAB BARU</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowCVModal(false)}
                  className="p-2 border border-[#263B59] bg-[#101E33] text-[#F1F5F9] hover:border-[#3B82F6] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#0A1424] w-full h-full">
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
