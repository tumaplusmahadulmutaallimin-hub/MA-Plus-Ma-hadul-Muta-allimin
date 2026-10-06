import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  CheckCircle,
  AlertOctagon,
  Clock,
  DoorOpen,
  Award,
  Calendar,
  ChevronRight,
  ClipboardList,
  AlertTriangle,
  FileSpreadsheet,
  Send,
  FileText,
  Utensils,
  Share2,
  Check,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const DashboardGuruPiket: React.FC = () => {
  const { setActiveView, alertSuccess } = useApp();
  const [copiedWa, setCopiedWa] = useState(false);

  // Real-time MBG (Makan Bergizi Gratis) calculation for the madrasah
  const totalSiswa = 312;
  const siswaHadir = 278;
  const siswaTidakMasuk = 12;
  const guruTendik = 24;
  const cadanganPorsi = 4;
  const totalPorsiMBG = siswaHadir + guruTendik + cadanganPorsi;

  const handleShareMBGWhatsApp = () => {
    const text = `*LAPORAN PORSI MAKAN BERGIZI GRATIS (MBG)*\n*MA PLUS MA'HADUL MUTA'ALLIMIN*\nHari/Tanggal: Jum'at, 4 September 2026\n\n- Siswa Hadir: ${siswaHadir} porsi\n- Guru & Tenaga Kependidikan: ${guruTendik} porsi\n- Cadangan: ${cadanganPorsi} porsi\n*TOTAL PORSI KATERING: ${totalPorsiMBG} PORSI*\n\nJadwal Distribusi: 11:45 WIB\nPetugas Piket: Zainal Arifin, S.Pd\nTerima kasih.`;
    navigator.clipboard?.writeText(text);
    setCopiedWa(true);
    alertSuccess('Laporan MBG Disalin', 'Laporan porsi Makan Bergizi Gratis berhasil disalin dan siap dikirim ke WhatsApp katering.');
    setTimeout(() => setCopiedWa(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Greeting Banner - Islamic Institutional Elegance */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F766E] rounded-3xl p-6 text-white shadow-xl shadow-emerald-950/20 relative overflow-hidden">
        {/* Subtle Decorative Star Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none flex items-center justify-end pr-6">
          <svg viewBox="0 0 100 100" className="w-64 h-64 text-amber-200 fill-current">
            <polygon points="50 0, 61.8 38.2, 100 38.2, 69.1 61.8, 80.9 100, 50 76.4, 19.1 100, 30.9 61.8, 0 38.2, 38.2 38.2" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-arabic text-sm text-amber-200/90 tracking-wide">
                السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </span>
              <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                Piket Shift Pagi
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Assalamu'alaikum, Zainal Arifin, S.Pd
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Selamat bertugas menjaga amanah, kedisiplinan, dan kelancaran kegiatan belajar mengajar di lingkungan <span className="font-semibold text-amber-200">MA PLUS Ma'hadul Muta'allimin</span> hari ini.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveView('absensi-siswa')}
              className="px-4 py-2.5 bg-emerald-900/60 hover:bg-emerald-900/80 text-emerald-100 rounded-xl text-xs font-bold transition-all border border-emerald-400/30 flex items-center gap-2 shadow-sm"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-300" />
              <span>Input Presensi Siswa</span>
            </button>

            <button
              onClick={() => setActiveView('monitoring-kbm')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-emerald-950 rounded-xl text-xs font-extrabold transition-all shadow-md shadow-amber-950/20 flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>Mulai Monitoring KBM</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI 6-Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Siswa */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400">12 Rombel</span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono tabular-nums">{totalSiswa}</p>
          <p className="text-xs text-slate-500 font-medium">Total Siswa Terdaftar</p>
        </div>

        {/* Hadir */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              89,1%
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2 font-mono tabular-nums">{siswaHadir}</p>
          <p className="text-xs text-slate-500 font-medium">Hadir di Kelas</p>
        </div>

        {/* Tidak Masuk */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-rose-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              3,8%
            </span>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2 font-mono tabular-nums">{siswaTidakMasuk}</p>
          <p className="text-xs text-slate-500 font-medium">Tidak Masuk (S/I/A)</p>
        </div>

        {/* Terlambat */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              4,8%
            </span>
          </div>
          <p className="text-2xl font-black text-amber-700 mt-2 font-mono tabular-nums">15</p>
          <p className="text-xs text-slate-500 font-medium">Siswa Terlambat</p>
        </div>

        {/* Izin Keluar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <DoorOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              2,6%
            </span>
          </div>
          <p className="text-2xl font-black text-slate-800 mt-2 font-mono tabular-nums">8</p>
          <p className="text-xs text-slate-500 font-medium">Izin Keluar Kampus</p>
        </div>

        {/* Tugas Khusus */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-sky-300 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
              Aktif
            </span>
          </div>
          <p className="text-2xl font-black text-slate-800 mt-2 font-mono tabular-nums">5</p>
          <p className="text-xs text-slate-500 font-medium">Tugas Khusus (STU)</p>
        </div>
      </div>

      {/* Program Makan Bergizi Gratis (MBG) Feature Card */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Program Makan Bergizi Gratis (MBG)
                </h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  Sinkron Otomatis
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kalkulasi porsi konsumsi makan siang madrasah berdasarkan presensi kehadiran real-time hari ini.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareMBGWhatsApp}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              {copiedWa ? <Check className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
              <span>{copiedWa ? 'Tersalin ke Clipboard!' : 'Kirim Porsi ke Vendor Katering'}</span>
            </button>
          </div>
        </div>

        {/* MBG Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[11px] font-semibold text-emerald-800">Siswa Hadir</span>
            <p className="text-xl font-black text-emerald-900 font-mono mt-1">{siswaHadir} Porsi</p>
            <span className="text-[10px] text-emerald-600">Sesuai absensi riil</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-600">Guru & Tendik</span>
            <p className="text-xl font-black text-slate-800 font-mono mt-1">{guruTendik} Porsi</p>
            <span className="text-[10px] text-slate-400">Pendidik & Staf</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-600">Porsi Cadangan</span>
            <p className="text-xl font-black text-slate-800 font-mono mt-1">{cadanganPorsi} Porsi</p>
            <span className="text-[10px] text-slate-400">Tamu & Buffer</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
            <span className="text-[11px] font-bold text-amber-900">Total Pesanan Katering</span>
            <p className="text-xl font-black text-amber-800 font-mono mt-1">{totalPorsiMBG} Porsi</p>
            <span className="text-[10px] text-amber-700 font-medium">Distribusi: 11:45 WIB</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Attendance Chart, Donut Breakdown, Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Attendance by Class (Bar Chart Representation) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Grafik Kehadiran Siswa Per Kelas
              </h3>
              <p className="text-[11px] text-slate-400">Persentase kehadiran per rombongan belajar</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hadir
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Absen
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Terlambat
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { kelas: 'X A', total: 28, hadir: 26, tidak: 2, terlambat: 1 },
              { kelas: 'X B', total: 30, hadir: 28, tidak: 2, terlambat: 2 },
              { kelas: 'X C', total: 29, hadir: 27, tidak: 2, terlambat: 0 },
              { kelas: 'XI A', total: 32, hadir: 29, tidak: 3, terlambat: 3 },
              { kelas: 'XI B', total: 31, hadir: 29, tidak: 2, terlambat: 1 },
              { kelas: 'XII A', total: 28, hadir: 26, tidak: 2, terlambat: 3 },
              { kelas: 'XII B', total: 27, hadir: 26, tidak: 1, terlambat: 2 },
              { kelas: 'XII IPS', total: 26, hadir: 24, tidak: 2, terlambat: 1 }
            ].map((row, idx) => {
              const hadirPercent = (row.hadir / row.total) * 100;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-slate-700 text-[11px]">{row.kelas}</span>
                  <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${hadirPercent}%` }}
                      className="bg-emerald-500 hover:bg-emerald-600 transition-all"
                      title={`Hadir: ${row.hadir}`}
                    ></div>
                    <div
                      style={{ width: `${(row.tidak / row.total) * 100}%` }}
                      className="bg-rose-500"
                      title={`Tidak Masuk: ${row.tidak}`}
                    ></div>
                    <div
                      style={{ width: `${(row.terlambat / row.total) * 100}%` }}
                      className="bg-amber-400"
                      title={`Terlambat: ${row.terlambat}`}
                    ></div>
                  </div>
                  <span className="w-16 text-right font-mono font-bold text-slate-700 text-[11px]">
                    {row.hadir}/{row.total} ({hadirPercent.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Breakdown */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Rekap Status Kehadiran
            </h3>
            <p className="text-[11px] text-slate-400">Total {totalSiswa} Siswa Terdaftar</p>

            <div className="relative w-36 h-36 mx-auto my-4 flex items-center justify-center">
              {/* Donut visual ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F5F9" strokeWidth="4.5" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#059669" strokeWidth="4.5" strokeDasharray="89.1 10.9" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E11D48" strokeWidth="4.5" strokeDasharray="3.8 96.2" strokeDashoffset="-89.1" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#D97706" strokeWidth="4.5" strokeDasharray="4.8 95.2" strokeDashoffset="-92.9" />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-black text-slate-900 font-mono">{totalSiswa}</span>
                <span className="block text-[10px] text-slate-400 font-semibold">Siswa</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Hadir
              </span>
              <span className="font-mono font-bold text-emerald-800">{siswaHadir} (89,1%)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span> Tidak Masuk
              </span>
              <span className="font-mono font-bold text-rose-700">{siswaTidakMasuk} (3,8%)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Terlambat
              </span>
              <span className="font-mono font-bold text-amber-700">15 (4,8%)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span> Izin Keluar
              </span>
              <span className="font-mono font-bold text-teal-800">8 (2,6%)</span>
            </div>
          </div>
        </div>

        {/* Information & Announcements */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Pengumuman Resmi
              </h3>
              <button
                onClick={() => setActiveView('pengumuman-kepala')}
                className="text-[11px] text-emerald-700 font-bold hover:underline"
              >
                Lihat Semua
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-2xl hover:border-emerald-200 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-bold text-emerald-700">Agenda Madrasah</span>
                  <span>2 jam lalu</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">Rapat Evaluasi KBM</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Senin, 7 September 2026 pukul 13.00 WIB di Ruang Rapat Pimpinan.
                </p>
              </div>

              <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-2xl hover:border-amber-200 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-bold text-amber-700">Pelaporan Piket</span>
                  <span>1 hari lalu</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">Pengumpulan Rekap Bulanan</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Batas rekapitulasi data Agustus sampai 5 September 2026.
                </p>
              </div>

              <div className="p-3 bg-slate-50/80 border border-slate-100 rounded-2xl hover:border-emerald-200 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-bold text-teal-700">KBM & Kurikulum</span>
                  <span>2 hari lalu</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">Pelaksanaan ANBK 2026</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Gladi bersih ANBK kelas XI berlangsung pekan depan di Lab Komputer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Shortcut Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveView('tugas-guru-izin')}
          className="p-4 bg-white border border-slate-200/90 hover:border-emerald-500 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ClipboardList className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Tugas Guru Izin</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Kelola kelas tertinggal</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('siswa-tidak-masuk')}
          className="p-4 bg-white border border-slate-200/90 hover:border-rose-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Siswa Tidak Masuk</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Rekap & Porsi MBG</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('siswa-terlambat')}
          className="p-4 bg-white border border-slate-200/90 hover:border-amber-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Siswa Terlambat</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Pantau pembinaan</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('izin-keluar-kelas')}
          className="p-4 bg-white border border-slate-200/90 hover:border-teal-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <DoorOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Izin Keluar Kelas</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Kelola izin keluar siswa</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('siswa-tugas-khusus')}
          className="p-4 bg-white border border-slate-200/90 hover:border-sky-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Award className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Siswa Tugas Khusus</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Tahfidz & Adiwiyata</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('pelanggaran-siswa')}
          className="p-4 bg-white border border-slate-200/90 hover:border-rose-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertOctagon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Pelanggaran Siswa</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Pencatatan kedisiplinan</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('lapor-kendala')}
          className="p-4 bg-white border border-slate-200/90 hover:border-amber-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Lapor Kendala</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Sarpras & madrasah</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('rekap-hari-ini')}
          className="p-4 bg-white border border-slate-200/90 hover:border-emerald-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FileSpreadsheet className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Rekap Hari Ini</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Ringkasan aktivitas</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Tables: Siswa Tidak Masuk, Siswa Terlambat, and Featured Kirim Laporan CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Siswa Tidak Masuk */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Siswa Tidak Masuk Hari Ini
            </h3>
            <button
              onClick={() => setActiveView('siswa-tidak-masuk')}
              className="text-[11px] text-emerald-700 font-bold hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              { no: 1, nama: 'Muhammad Ilham', kelas: 'XII-IPA', status: 'Tanpa Keterangan' },
              { no: 2, nama: 'Salma Aulia', kelas: 'XII-IPS', status: 'Sakit' },
              { no: 3, nama: 'Dimas Saputra', kelas: 'XIIB', status: 'Tanpa Keterangan' },
              { no: 4, nama: 'Nurul Hidayah', kelas: 'XIIA', status: 'Izin (Keluarga)' },
              { no: 5, nama: 'Fathan Rizky', kelas: 'XIB', status: 'Tanpa Keterangan' }
            ].map((s) => (
              <div key={s.no} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{s.nama}</p>
                  <p className="text-[11px] text-slate-400">Kelas {s.kelas}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  s.status === 'Sakit' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Siswa Terlambat */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Siswa Terlambat Hari Ini
            </h3>
            <button
              onClick={() => setActiveView('siswa-terlambat')}
              className="text-[11px] text-emerald-700 font-bold hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              { no: 1, nama: 'Ahmad Fauzan', kelas: 'XA', durasi: '12 menit' },
              { no: 2, nama: 'Nabila Putri', kelas: 'XB', durasi: '8 menit' },
              { no: 3, nama: 'Rafi Hidayat', kelas: 'XIA', durasi: '15 menit' },
              { no: 4, nama: 'Zahra Maulida', kelas: 'XIIA', durasi: '10 menit' },
              { no: 5, nama: 'Lailatul Fitri', kelas: 'XIIC', durasi: '7 menit' }
            ].map((s) => (
              <div key={s.no} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{s.nama}</p>
                  <p className="text-[11px] text-slate-400">Kelas {s.kelas}</p>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  {s.durasi}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Card: Kirim Laporan ke Kepala */}
        <div className="lg:col-span-4 bg-gradient-to-br from-emerald-900 via-emerald-950 to-[#041B12] text-white p-6 rounded-3xl border border-emerald-700/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Islamic corner watermark */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 pointer-events-none">
            <Building2 className="w-full h-full text-amber-300" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
                <Send className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-amber-200">
                Kirim Laporan ke Kepala
              </h3>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Kirim laporan rekap kegiatan piket hari ini secara komprehensif ke Kepala Madrasah untuk diverifikasi dan ditandatangani secara digital.
            </p>

            <div className="mt-4 p-3.5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10 flex items-center gap-3">
              <FileText className="w-6 h-6 text-amber-300 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Dossier Piket 4 Sep 2026</p>
                <p className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Siap Dikirim ke Kepala
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={() => setActiveView('kirim-laporan-kepala')}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:from-amber-500 text-emerald-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-950/30 transition-all flex items-center justify-center gap-2 tracking-wide uppercase"
            >
              <Send className="w-4 h-4" />
              <span>Buka Laporan & Selesaikan Tugas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
