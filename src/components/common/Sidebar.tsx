import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  BookOpen,
  MapPin,
  Calendar,
  CalendarCheck,
  Award,
  Tag,
  AlertOctagon,
  AlertTriangle,
  UserCheck,
  FileSpreadsheet,
  Settings,
  LogOut,
  Clock,
  UserX,
  DoorOpen,
  ClipboardList,
  Send,
  CheckCircle2,
  FileCheck,
  Megaphone,
  BarChart3,
  Building2,
  Shield,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentUser, activeView, setActiveView, setIsLoggedIn, switchRole } = useApp();

  // Menu configurations for each role
  const guruPiketSections = [
    {
      title: 'UTAMA',
      items: [
        { id: 'dashboard', label: 'Dashboard Piket', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MONITORING & PENCATATAN',
      items: [
        { id: 'tugas-guru-izin', label: 'Tugas Guru Izin', icon: ClipboardList, badge: '3' },
        { id: 'monitoring-kbm', label: 'Monitoring KBM', icon: BookOpen },
        { id: 'absensi-siswa', label: 'Input Absensi Siswa', icon: CalendarCheck },
        { id: 'siswa-tidak-masuk', label: 'Siswa Tidak Masuk', icon: UserX },
        { id: 'siswa-terlambat', label: 'Siswa Terlambat', icon: Clock },
        { id: 'izin-keluar-kelas', label: 'Izin Keluar Kelas', icon: DoorOpen },
        { id: 'siswa-tugas-khusus', label: 'Siswa Tugas Khusus', icon: Award },
        { id: 'pelanggaran-siswa', label: 'Pelanggaran Siswa', icon: AlertOctagon },
        { id: 'lapor-kendala', label: 'Lapor Kendala', icon: AlertTriangle }
      ]
    },
    {
      title: 'PELAPORAN & REKAP',
      items: [
        { id: 'rekap-hari-ini', label: 'Rekap Presensi Harian', icon: FileSpreadsheet },
        { id: 'kirim-laporan-kepala', label: 'Kirim Laporan ke Kepala', icon: Send }
      ]
    }
  ];

  const adminSections = [
    {
      title: 'UTAMA',
      items: [
        { id: 'dashboard', label: 'Dashboard Admin', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MASTER DATA',
      items: [
        { id: 'data-guru', label: 'Data Guru & Pegawai', icon: Users },
        { id: 'data-siswa', label: 'Data Siswa & MBG', icon: GraduationCap },
        { id: 'data-kelas', label: 'Data Rombel & Kelas', icon: School },
        { id: 'data-mapel', label: 'Mata Pelajaran', icon: BookOpen },
        { id: 'data-ruang', label: 'Ruang & Fasilitas', icon: MapPin },
        { id: 'jadwal-kbm', label: 'Jadwal KBM Mingguan', icon: Calendar },
        { id: 'jadwal-guru-piket', label: 'Jadwal Guru Piket', icon: CalendarCheck }
      ]
    },
    {
      title: 'KATEGORI & PROGRAM',
      items: [
        { id: 'program-tugas-khusus', label: 'Program Tugas Khusus', icon: Award },
        { id: 'kategori-tugas-khusus', label: 'Kategori Tugas Khusus', icon: Tag },
        { id: 'kategori-pelanggaran', label: 'Kategori Pelanggaran', icon: AlertOctagon },
        { id: 'kategori-kendala', label: 'Kategori Kendala', icon: AlertTriangle }
      ]
    },
    {
      title: 'PENGGUNA & LAPORAN',
      items: [
        { id: 'user-role', label: 'User & Manajemen Akun', icon: UserCheck },
        { id: 'rekap-guru-piket', label: 'Rekap Kinerja Piket', icon: FileSpreadsheet },
        { id: 'rekap-siswa', label: 'Rekap Presensi Siswa', icon: GraduationCap },
        { id: 'laporan-kepala', label: 'Arsip Laporan Kepala', icon: FileCheck },
        { id: 'pengaturan-sistem', label: 'Pengaturan Sistem', icon: Settings }
      ]
    }
  ];

  const kepalaSections = [
    {
      title: 'UTAMA',
      items: [
        { id: 'dashboard', label: 'Dashboard Eksekutif', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MONITORING & EVALUASI',
      items: [
        { id: 'monitoring-guru', label: 'Monitoring Guru', icon: Users },
        { id: 'monitoring-siswa', label: 'Monitoring Siswa', icon: GraduationCap },
        { id: 'monitoring-kbm-kepala', label: 'Monitoring KBM Aktif', icon: BookOpen },
        { id: 'laporan-guru-piket-kepala', label: 'Verifikasi Laporan Piket', icon: FileCheck, badge: 'Perlu TTD' },
        { id: 'kendala-tindak-lanjut-kepala', label: 'Disposisi Kendala', icon: AlertTriangle },
        { id: 'rekap-absensi-kepala', label: 'Rekapitulasi Presensi', icon: FileSpreadsheet },
        { id: 'rekap-statistik-kepala', label: 'Statistik & Analisis', icon: BarChart3 },
        { id: 'pengumuman-kepala', label: 'Pusat Pengumuman', icon: Megaphone }
      ]
    }
  ];

  const sections =
    currentUser.role === 'Administrator'
      ? adminSections
      : currentUser.role === 'Kepala Madrasah'
      ? kepalaSections
      : guruPiketSections;

  return (
    <aside className="w-64 bg-gradient-to-b from-[#062117] via-[#08281D] to-[#04160F] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-emerald-950/80 shadow-xl select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-emerald-900/60 bg-black/15">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-500/30 p-1 flex items-center justify-center shadow-md shadow-emerald-950/40 shrink-0">
            <img
              src="/src/assets/images/madrasah_logo_1791093665342.jpg"
              alt="MA PLUS Logo"
              className="w-full h-full object-contain rounded-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <Building2 className="w-6 h-6 text-amber-400 hidden only:block" />
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-wide font-sans">MA PLUS</span>
              <span className="text-[9px] font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 tracking-wider">
                UNGGUL
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 font-medium truncate">Ma'hadul Muta'allimin</p>
          </div>
        </div>

        {/* Academic year indicator */}
        <div className="mt-3 px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-800/40 flex items-center justify-between text-[10px]">
          <span className="text-emerald-300/90 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            TA 2026/2027
          </span>
          <span className="text-amber-300/80 font-semibold">Semester Gasal</span>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4.5 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {sec.title && (
              <p className="px-3 text-[10px] font-bold tracking-widest text-emerald-400/80 uppercase">
                {sec.title}
              </p>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                const badge = (item as any).badge;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-950/50 border-l-3 border-amber-400 pl-2.5'
                        : 'text-slate-300 hover:bg-emerald-900/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-amber-300' : 'text-emerald-400/70 group-hover:text-emerald-300'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold shrink-0 ${
                        isActive
                          ? 'bg-amber-400 text-emerald-950'
                          : 'bg-emerald-800/80 text-emerald-200 border border-emerald-700/50'
                      }`}>
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Card in Sidebar Bottom */}
      <div className="p-3 border-t border-emerald-900/60 bg-black/25">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0 border border-emerald-400/30">
              {currentUser.role === 'Administrator' ? 'AS' : currentUser.role === 'Guru Piket' ? 'ZA' : 'SM'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {currentUser.namaLengkap}
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <p className="text-[10px] text-amber-300/90 font-medium truncate">
                  {currentUser.role}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="p-1.5 text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors shrink-0"
            title="Keluar dari Sistem"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Madrasah Arabic Motto */}
        <div className="mt-2.5 pt-2 text-center border-t border-emerald-900/40">
          <p className="text-[10px] text-amber-200/90 font-serif italic tracking-wide px-1">
            "Ikhlas Beramal, Cerdas dalam Tugas, Tertib untuk Madrasah"
          </p>
          <p className="text-[9px] text-emerald-400/60 mt-0.5 font-mono">
            MA PLUS Ma'hadul Muta'allimin · 2026
          </p>
        </div>
      </div>
    </aside>
  );
};
