import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  BookOpen,
  Bell,
  ChevronRight,
  UserCheck,
  Shield,
  Award,
  CheckCircle,
  AlertTriangle,
  FileText,
  Sparkles,
  Printer,
  ChevronDown,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  breadcrumbs?: string[];
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  icon,
  breadcrumbs
}) => {
  const { currentUser, activeView, switchRole, setIsLoggedIn } = useApp();

  const displayTitle =
    title ||
    (activeView === 'dashboard'
      ? 'Dashboard'
      : activeView
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '));

  const displayBreadcrumbs = breadcrumbs || ['Madrasah', currentUser?.role || 'Guru Piket', displayTitle];
  const [time, setTime] = useState<string>('09:15:22');
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  useEffect(() => {
    let seconds = 22;
    let minutes = 15;
    let hours = 9;

    const interval = setInterval(() => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours = (hours + 1) % 24;
        }
      }
      setTime(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Quotes matching screenshots & Islamic wisdom
  const quotes: Record<string, string> = {
    'Data Guru': '"Guru hebat, madrasah bermartabat, generasi berkualitas."',
    'Data Siswa': '"Setiap siswa adalah amanah, mari kelola data dengan penuh tanggung jawab."',
    'Data Kelas': '"Kelas yang tertata, mencetak generasi yang luar biasa."',
    'Data Mata Pelajaran': '"Ilmu adalah cahaya, dan setiap mata pelajaran adalah jalan menuju kebaikan."',
    'Data Ruang/Lokasi': '"Lingkungan yang tertata mendukung proses belajar yang lebih baik."',
    'Jadwal KBM': '"Waktu yang teratur melahirkan generasi yang unggul."',
    'Jadwal Guru Piket': '"Tugas piket adalah bagian dari ibadah, karena menjaga lingkungan madrasah adalah menjaga amanah."',
    'Program Tugas Khusus': '"Setiap tugas adalah amanah, setiap amanah adalah jalan menuju kemuliaan."',
    'Kategori Tugas Khusus': '"Kategorisasi yang baik, memudahkan pengelolaan dan pelaksanaan."',
    'Kategori Pelanggaran': '"Disiplin hari ini, karakter yang lebih baik esok hari."',
    'Kategori Kendala': '"Setiap kendala adalah kesempatan untuk mencari solusi yang lebih baik."',
    'User & Role': '"Orang yang tepat di posisi yang tepat, akan melahirkan hasil yang lebih baik."',
    'Monitoring KBM': '"Ketertiban hari ini, lahir dari kepedulian kita bersama."',
    'Siswa Tidak Masuk': '"Disiplin hari ini, masa depan yang lebih baik esok."',
    'Siswa Terlambat': '"Menghargai waktu adalah awal dari pembentukan akhlak mulia."',
    'Izin Keluar Kelas': '"Menjaga mereka adalah bagian dari amanah pendidikan."',
    'Siswa Tugas Khusus': '"Tugas yang diamanahkan adalah bagian dari pendidikan."',
    'Pelanggaran Siswa': '"Kedisiplinan hari ini adalah keberhasilan di masa depan."',
    'Lapor Kendala': '"Setiap kendala adalah peluang untuk perbaikan."',
    'Kirim Laporan ke Kepala': '"Setiap laporan yang jujur adalah bagian dari amanah."',
    'Pengumuman': '"Informasi yang baik, membangun langkah yang lebih baik."',
    'Dashboard': '"Data yang rapi, melahirkan madrasah yang tertib."'
  };

  const currentQuote =
    (title && quotes[title]) ||
    (displayTitle && quotes[displayTitle]) ||
    '"Ikhlas Beramal, Cerdas dalam Tugas, Tertib untuk Madrasah"';

  return (
    <header className="bg-white border-b border-slate-200/90 px-6 py-3.5 sticky top-0 z-30 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
        {/* Left: Breadcrumbs & Title */}
        <div className="flex flex-col gap-0.5">
          <nav className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            {displayBreadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                <span className={idx === displayBreadcrumbs.length - 1 ? 'text-emerald-700 font-bold' : 'hover:text-slate-600'}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>

          <div className="flex items-center gap-3 mt-0.5">
            {icon ? (
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100/80 flex items-center justify-center shadow-2xs">
                {icon}
              </div>
            ) : null}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{displayTitle}</h1>
                <span className="hidden sm:inline-block font-arabic text-xs text-emerald-800/80 font-normal">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
              </div>
              {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Right: Date/Clock Card, Quote Card, Notifications, User */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Live Date and Digital Clock with Hijri Date */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-amber-50/60 border border-emerald-200/70 rounded-xl shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="text-right leading-tight">
              <div className="flex items-center justify-end gap-1 text-[10px] font-semibold text-emerald-900">
                <span>Jum'at, 4 Sep 2026</span>
                <span className="text-amber-700">· 21 Rabi'ul Awwal 1448 H</span>
              </div>
              <span className="text-sm font-extrabold text-slate-800 tracking-wider tabular-nums font-mono">
                {time} <span className="text-[9px] font-bold text-emerald-700">WIB</span>
              </span>
            </div>
          </div>

          {/* Inspirational Quote Card */}
          <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 bg-amber-50/80 border border-amber-200/70 rounded-xl max-w-xs shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] font-serif italic text-amber-950 line-clamp-2 leading-tight">
              {currentQuote}
            </p>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowBellDropdown(!showBellDropdown)}
              className="relative p-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-2xs"
              title="Notifikasi Madrasah"
            >
              <Bell className="w-4.5 h-4.5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                3
              </span>
            </button>

            {showBellDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-slate-900">Notifikasi Madrasah</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    3 Baru
                  </span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3 hover:bg-emerald-50/40 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between">
                      <p className="font-bold text-slate-800">Guru Tidak Masuk Hari Ini</p>
                      <span className="text-[10px] text-slate-400">07:15</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Ahmad Fauzan, S.Pd (Sakit) - 3 jadwal perlu penetapan guru pengganti.</p>
                  </div>
                  <div className="p-3 hover:bg-emerald-50/40 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between">
                      <p className="font-bold text-slate-800">Laporan Kendala Fasilitas</p>
                      <span className="text-[10px] text-slate-400">08:12</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Proyektor Ruang Kelas XA tidak menyala, tiket #KND-2026-004.</p>
                  </div>
                  <div className="p-3 hover:bg-emerald-50/40 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between">
                      <p className="font-bold text-slate-800">Edaran ANBK 2026</p>
                      <span className="text-[10px] text-slate-400">2j lalu</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">Gladi bersih ANBK kelas XI dijadwalkan pekan depan di Lab Komputer.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-emerald-900/10 bg-gradient-to-r from-white to-emerald-50/40 hover:to-emerald-50 text-left transition-all shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-extrabold flex items-center justify-center text-xs shadow-xs border border-emerald-400/30">
                {currentUser.role === 'Administrator' ? 'AS' : currentUser.role === 'Guru Piket' ? 'ZA' : 'SM'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  {currentUser.namaLengkap}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 block leading-none">
                  {currentUser.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-extrabold flex items-center justify-center text-sm shadow-xs border border-emerald-400/30 shrink-0">
                    {currentUser.role === 'Administrator' ? 'AS' : currentUser.role === 'Guru Piket' ? 'ZA' : 'SM'}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.namaLengkap}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold truncate">
                      {currentUser.role}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="my-2.5 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1.5 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Hak Akses:</span>
                    <span className="font-bold text-slate-800">{currentUser.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status Sesi:</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Terotentikasi Aman
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Keamanan Akun:</span>
                    <span className="text-[10px] text-slate-500 font-mono">Privat & Terenkripsi</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">Ganti Akun?</span>
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      setIsLoggedIn(false);
                    }}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
