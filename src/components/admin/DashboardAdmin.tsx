import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  GraduationCap,
  School,
  BookOpen,
  MapPin,
  CalendarCheck,
  CheckCircle,
  Clock,
  Award,
  ChevronRight,
  TrendingUp,
  FileText,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export const DashboardAdmin: React.FC = () => {
  const { setActiveView, currentUser } = useApp();
  const [dataTab, setDataTab] = useState<'Guru' | 'Siswa' | 'Kelas' | 'Pengguna'>('Guru');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h2 className="text-lg font-bold text-slate-900">
              Selamat Datang, {currentUser.namaLengkap}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <strong>Admin / Operator</strong> Sistem Guru Piket MA Plus Ma'hadul Muta'allimin. Kelola data dengan baik untuk kelancaran tugas Guru Piket dan pengawasan Kepala Madrasah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('data-guru')}
            className="px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors"
          >
            Kelola Master Data
          </button>
          <button
            onClick={() => setActiveView('pengaturan-sistem')}
            className="px-3.5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            Pengaturan Sistem
          </button>
        </div>
      </div>

      {/* KPI 7 Stats Row (from screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 font-mono tabular-nums">48</p>
          <p className="text-[11px] text-slate-500 font-medium">Data Guru</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 font-mono tabular-nums">312</p>
          <p className="text-[11px] text-slate-500 font-medium">Data Siswa</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <School className="w-4 h-4" />
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 font-mono tabular-nums">12</p>
          <p className="text-[11px] text-slate-500 font-medium">Data Kelas</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 font-mono tabular-nums">21</p>
          <p className="text-[11px] text-slate-500 font-medium">Mata Pelajaran</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 font-mono tabular-nums">18</p>
          <p className="text-[11px] text-slate-500 font-medium">Ruang/Lokasi</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="text-xl font-black text-slate-900 font-mono tabular-nums">2</p>
            <span className="text-[9px] font-bold text-emerald-600">Sesuai Jadwal</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Guru Piket Hari Ini</p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="text-xl font-black text-slate-900 font-mono tabular-nums">100%</p>
            <span className="text-[9px] font-bold text-teal-600">Normal</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Sistem Aktif</p>
        </div>
      </div>

      {/* Middle Section: Bar Chart Rekap Data Utama, Donut Distribusi Siswa, Jadwal Guru Piket Hari Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Rekap Data Utama (Bar Chart) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Rekap Data Utama
              </h3>
              <p className="text-[11px] text-slate-400">Statistik data madrasah</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Guru
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Siswa
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span> Kelas
              </span>
            </div>
          </div>

          <div className="h-44 flex items-end justify-around gap-6 pt-6 pb-2 border-b border-slate-100">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700">48</span>
              <div className="w-16 bg-blue-600 rounded-t-lg transition-all" style={{ height: '40px' }}></div>
              <span className="text-[11px] font-bold text-slate-600">Guru</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700">312</span>
              <div className="w-16 bg-emerald-500 rounded-t-lg transition-all" style={{ height: '130px' }}></div>
              <span className="text-[11px] font-bold text-slate-600">Siswa</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700">12</span>
              <div className="w-16 bg-purple-600 rounded-t-lg transition-all" style={{ height: '18px' }}></div>
              <span className="text-[11px] font-bold text-slate-600">Kelas</span>
            </div>
          </div>
        </div>

        {/* Distribusi Siswa per Tingkat (Donut Chart) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Distribusi Siswa per Tingkat
            </h3>
            <p className="text-[11px] text-slate-400">Total 312 Siswa</p>

            <div className="relative w-32 h-32 mx-auto my-3 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="4.5" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4.5" strokeDasharray="33.3 66.7" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4.5" strokeDasharray="32.7 67.3" strokeDashoffset="-33.3" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="34.0 66.0" strokeDashoffset="-66.0" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-black text-slate-900 font-mono">312</span>
                <span className="block text-[9px] text-slate-400 font-semibold">Siswa</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Kelas X
              </span>
              <span className="font-mono font-bold text-slate-800">104 (33,3%)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Kelas XI
              </span>
              <span className="font-mono font-bold text-slate-800">102 (32,7%)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Kelas XII
              </span>
              <span className="font-mono font-bold text-slate-800">106 (34,0%)</span>
            </div>
          </div>
        </div>

        {/* Jadwal Guru Piket Hari Ini Card */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarCheck className="w-4 h-4 text-blue-600" />
                <span>Piket Hari Ini</span>
              </h3>
              <button
                onClick={() => setActiveView('jadwal-guru-piket')}
                className="text-[11px] text-blue-600 font-semibold hover:underline"
              >
                Lihat Jadwal
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-3 font-mono">Jumat, 4 September 2026</p>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <span className="text-xs font-bold text-slate-800">Zainal Arifin, S.Pd</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Bertugas
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <span className="text-xs font-bold text-slate-800">Ahmad Fauzan, S.Pd</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Bertugas
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-center mt-3">
            <p className="text-[11px] font-serif italic text-blue-900">
              "Dukung tugas Guru Piket dengan data yang akurat."
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards (8 cards from screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveView('data-guru')}
          className="p-3.5 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Data Guru</p>
              <p className="text-[10px] text-slate-400">Kelola guru & jabatan</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('data-siswa')}
          className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Data Siswa</p>
              <p className="text-[10px] text-slate-400">Kelola data madrasah</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('data-kelas')}
          className="p-3.5 bg-white border border-slate-200 hover:border-purple-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <School className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Data Kelas</p>
              <p className="text-[10px] text-slate-400">Kelas & wali kelas</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('jadwal-kbm')}
          className="p-3.5 bg-white border border-slate-200 hover:border-sky-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Jadwal KBM</p>
              <p className="text-[10px] text-slate-400">Atur jadwal pelajaran</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('jadwal-guru-piket')}
          className="p-3.5 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Jadwal Guru Piket</p>
              <p className="text-[10px] text-slate-400">Atur petugas piket</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('program-tugas-khusus')}
          className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Program Tugas Khusus</p>
              <p className="text-[10px] text-slate-400">Kelola program & peserta</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('kategori-pelanggaran')}
          className="p-3.5 bg-white border border-slate-200 hover:border-rose-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Kategori Pelanggaran</p>
              <p className="text-[10px] text-slate-400">Kelola jenis pelanggaran</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 transition-all" />
        </button>

        <button
          onClick={() => setActiveView('user-role')}
          className="p-3.5 bg-white border border-slate-200 hover:border-purple-400 rounded-2xl flex items-center justify-between text-left transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">User & Role</p>
              <p className="text-[10px] text-slate-400">Kelola pengguna sistem</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-all" />
        </button>
      </div>

      {/* Bottom Section: Data Terbaru Tabs & Kegiatan Admin Hari Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Data Terbaru Tabs */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Data Terbaru
            </h3>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-[11px] font-semibold">
              {(['Guru', 'Siswa', 'Kelas', 'Pengguna'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDataTab(tab)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    dataTab === tab ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs mt-2">
            {[
              { no: 1, nama: 'Zainal Arifin, S.Pd', jabatan: 'Guru', mapel: 'Matematika', status: 'Aktif' },
              { no: 2, nama: 'Rina Kartika, S.Pd', jabatan: 'Guru', mapel: 'IPA', status: 'Aktif' },
              { no: 3, nama: 'Ahmad Fauzan, S.Pd', jabatan: 'Wakil Kurikulum', mapel: 'Fisika', status: 'Aktif' },
              { no: 4, nama: 'Siti Rahma, S.Pd.I', jabatan: 'Wali Kelas', mapel: 'Al-Qur\'an Hadis', status: 'Aktif' },
              { no: 5, nama: 'M. Lutfi, S.Pd', jabatan: 'Guru', mapel: 'Bahasa Indonesia', status: 'Aktif' }
            ].map((row) => (
              <div key={row.no} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 w-3">{row.no}</span>
                  <div>
                    <p className="font-bold text-slate-800">{row.nama}</p>
                    <p className="text-[10px] text-slate-400">{row.jabatan} · {row.mapel}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kegiatan Admin Hari Ini */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Kegiatan Admin Hari Ini
            </h3>
            <button
              onClick={() => setActiveView('rekap-guru-piket')}
              className="text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs mt-2">
            {[
              { waktu: '08:12', aktivitas: 'Update data siswa', keterangan: 'Menambahkan 5 siswa baru' },
              { waktu: '08:45', aktivitas: 'Mengatur jadwal piket', keterangan: 'Jadwal September 2026' },
              { waktu: '09:10', aktivitas: 'Update jadwal KBM', keterangan: 'Perubahan jam-ke-3' },
              { waktu: '09:35', aktivitas: 'Menambah ruang', keterangan: 'Ruang Laboratorium' },
              { waktu: '10:05', aktivitas: 'Update kategori kendala', keterangan: 'Menambah 2 kategori' }
            ].map((act, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-500 text-[11px]">{act.waktu}</span>
                  <div>
                    <p className="font-bold text-slate-800">{act.aktivitas}</p>
                    <p className="text-[10px] text-slate-400">{act.keterangan}</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
