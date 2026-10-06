import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  CheckCircle2,
  Calendar,
  User,
  Clock,
  Printer,
  FileDown,
  FileCheck,
  AlertCircle,
  Eye,
  Check
} from 'lucide-react';

export const KirimLaporanKepalaView: React.FC = () => {
  const { currentUser, submitPiketReportToKepala, setActiveView, confirmAction, alertSuccess } = useApp();
  const [catatan, setCatatan] = useState(
    'Kegiatan KBM berjalan dengan tertib. Terdapat beberapa guru yang tidak masuk dan telah diberikan guru pengganti. Beberapa siswa terlambat dan telah diberikan pembinaan. Terdapat 2 kendala fasilitas yang masih dalam proses tindak lanjut.'
  );
  const [isSent, setIsSent] = useState(false);

  const handleSendReport = () => {
    confirmAction({
      title: 'Kirim Laporan Resmi ke Kepala?',
      message: 'Apakah Anda yakin seluruh rekaman piket hari ini telah lengkap dan siap dikirimkan ke Kepala Madrasah untuk verifikasi?',
      confirmText: 'Ya, Kirim Sekarang',
      onConfirm: () => {
        submitPiketReportToKepala(catatan);
        setIsSent(true);
        alertSuccess('Laporan Terkirim', 'Laporan guru piket harian berhasil dikirim ke Kepala Madrasah.');
      }
    });
  };

  return (
    <div className="space-y-6">
      {isSent && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-900 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Laporan Berhasil Terkirim ke Kepala Madrasah!</h4>
              <p className="text-xs text-emerald-800">
                Laporan guru piket harian telah masuk ke portal Kepala Madrasah (Dr. H. Syahrul Mushtofa, M.Pd) untuk ditinjau dan diverifikasi.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800"
          >
            Kembali ke Dashboard
          </button>
        </div>
      )}

      {/* Main Grid: Left Preparation & Right Official Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Report Info, Summary, Chronology, Checklist */}
        <div className="lg:col-span-7 space-y-5">
          {/* Informasi Laporan Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Informasi Laporan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Tanggal Laporan: <strong>Jumat, 4 September 2026</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Guru Piket: <strong>{currentUser.namaLengkap}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Status: <strong className="text-emerald-600">Siap Dikirim</strong></span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Semua tugas piket telah diselesaikan. Laporan komprehensif dapat langsung dikirim ke Kepala Madrasah.
                </p>
              </div>
            </div>
          </div>

          {/* Ringkasan Kegiatan Hari Ini (9 KPI Grid) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ringkasan Kegiatan Hari Ini
            </h3>

            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <p className="text-base font-black text-blue-900 font-mono">12 / 12</p>
                <p className="text-[11px] text-blue-700">Kelas Dimonitor</p>
              </div>
              <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
                <p className="text-base font-black text-red-900 font-mono">3</p>
                <p className="text-[11px] text-red-700">Guru Tidak Masuk</p>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <p className="text-base font-black text-amber-900 font-mono">2</p>
                <p className="text-[11px] text-amber-700">Guru Pengganti</p>
              </div>
              <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
                <p className="text-base font-black text-red-900 font-mono">12</p>
                <p className="text-[11px] text-red-700">Siswa Tidak Masuk</p>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <p className="text-base font-black text-amber-900 font-mono">8</p>
                <p className="text-[11px] text-amber-700">Siswa Terlambat</p>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <p className="text-base font-black text-emerald-900 font-mono">5</p>
                <p className="text-[11px] text-emerald-700">Siswa Tugas Khusus</p>
              </div>
              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                <p className="text-base font-black text-rose-900 font-mono">4</p>
                <p className="text-[11px] text-rose-700">Pelanggaran Siswa</p>
              </div>
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <p className="text-base font-black text-indigo-900 font-mono">6</p>
                <p className="text-[11px] text-indigo-700">Izin Keluar Kelas</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-base font-black text-slate-900 font-mono">2</p>
                <p className="text-[11px] text-slate-700">Kendala Dilaporkan</p>
              </div>
            </div>
          </div>

          {/* Kronologi Kegiatan Guru Piket */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Kegiatan Guru Piket (Kronologi)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">Waktu</th>
                    <th className="py-2.5 px-3">Kegiatan</th>
                    <th className="py-2.5 px-3">Detail</th>
                    <th className="py-2.5 px-3">Menu Terkait</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { no: 1, waktu: '07:05', kegiatan: 'Monitoring KBM', detail: 'Kelas XA - Jam Ke-1', menu: 'Monitoring KBM', viewId: 'monitoring-kbm' },
                    { no: 2, waktu: '07:08', kegiatan: 'Monitoring KBM', detail: 'Kelas XB - Jam Ke-1', menu: 'Monitoring KBM', viewId: 'monitoring-kbm' },
                    { no: 3, waktu: '07:12', kegiatan: 'Pendataan siswa', detail: 'Mencatat siswa tidak masuk', menu: 'Siswa Tidak Masuk', viewId: 'siswa-tidak-masuk' },
                    { no: 4, waktu: '07:20', kegiatan: 'Penetapan guru pengganti', detail: '2 guru pengganti ditetapkan', menu: 'Tugas Guru Izin', viewId: 'tugas-guru-izin' },
                    { no: 5, waktu: '07:45', kegiatan: 'Monitoring KBM', detail: 'Kelas XI - Jam Ke-2', menu: 'Monitoring KBM', viewId: 'monitoring-kbm' },
                    { no: 6, waktu: '08:15', kegiatan: 'Pemeriksaan siswa tugas khusus', detail: '5 siswa (Tahfidz, Kesehatan, dll)', menu: 'Siswa Tugas Khusus', viewId: 'siswa-tugas-khusus' },
                    { no: 7, waktu: '09:10', kegiatan: 'Pencatatan pelanggaran siswa', detail: '4 pelanggaran', menu: 'Pelanggaran Siswa', viewId: 'pelanggaran-siswa' },
                    { no: 8, waktu: '10:00', kegiatan: 'Penanganan izin keluar siswa', detail: '6 siswa izin keluar', menu: 'Izin Keluar Kelas', viewId: 'izin-keluar-kelas' },
                    { no: 9, waktu: '10:05', kegiatan: 'Pelaporan kendala', detail: '2 kendala fasilitas', menu: 'Lapor Kendala', viewId: 'lapor-kendala' }
                  ].map((row) => (
                    <tr key={row.no} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono text-slate-400">{row.no}</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-700">{row.waktu}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{row.kegiatan}</td>
                      <td className="py-2 px-3 text-slate-600">{row.detail}</td>
                      <td className="py-2 px-3">
                        <button
                          type="button"
                          onClick={() => setActiveView(row.viewId)}
                          className="text-[10px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer transition-colors border border-blue-200"
                          title={`Buka menu ${row.menu}`}
                        >
                          {row.menu} →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Catatan Guru Piket Hari Ini */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              Catatan Guru Piket Hari Ini
            </label>
            <textarea
              rows={3}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white font-medium"
            />
            <div className="flex justify-end text-[10px] text-slate-400">
              {catatan.length}/500
            </div>
          </div>

          {/* Checklist Sebelum Dikirim */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Checklist Sebelum Dikirim
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                'Monitoring KBM minimal 1 kali di setiap kelas',
                'Data guru tidak masuk sudah dicatat',
                'Data siswa tidak masuk sudah dicatat',
                'Data siswa terlambat sudah dicatat',
                'Pelanggaran siswa sudah dicatat',
                'Izin keluar siswa sudah dicatat',
                'Kendala sudah dicatat',
                'Catatan akhir sudah diisi'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Pratinjau Cetak</span>
            </button>
            <button
              onClick={handleSendReport}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 uppercase tracking-wide transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Laporan ke Kepala</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Pratinjau Surat Resmi Laporan Guru Piket Harian */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-md space-y-5 text-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pratinjau Surat Resmi
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
                title="Cetak"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Letterhead (KOP SURAT) */}
          <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
            <div className="w-12 h-12 mx-auto mb-1">
              <img
                src="/src/assets/images/madrasah_logo_1791093665342.jpg"
                alt="Logo Madrasah"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-sm font-black tracking-wide uppercase">
              MA PLUS MA'HADUL MUTA'ALLIMIN
            </h2>
            <p className="text-[10px] text-slate-600">
              Jl. Raya Pleret, Bantul, D.I. Yogyakarta · Telp. (0274) 123456
            </p>
            <div className="pt-2">
              <h3 className="text-xs font-extrabold underline tracking-wider uppercase">
                LAPORAN GURU PIKET HARIAN
              </h3>
              <p className="text-[10px] font-medium text-slate-500 font-mono">
                Jumat, 4 September 2026
              </p>
            </div>
          </div>

          {/* Official Letter Body */}
          <div className="space-y-4 text-[11px] leading-relaxed">
            {/* I. Identitas */}
            <div>
              <p className="font-bold uppercase tracking-wider mb-1">I. IDENTITAS</p>
              <div className="grid grid-cols-2 gap-1 text-slate-700 pl-2">
                <span>Tanggal</span>
                <span className="font-semibold">: Jumat, 4 September 2026</span>
                <span>Guru Piket</span>
                <span className="font-semibold">: {currentUser.namaLengkap}</span>
                <span>Jabatan</span>
                <span className="font-semibold">: Guru Piket</span>
                <span>Status</span>
                <span className="font-semibold text-emerald-700">: Lengkap & Terverifikasi</span>
              </div>
            </div>

            {/* II. Ringkasan Kegiatan */}
            <div>
              <p className="font-bold uppercase tracking-wider mb-1">II. RINGKASAN KEGIATAN</p>
              <table className="w-full text-left border border-slate-300 text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 font-bold">
                    <th className="p-1 text-center w-6">No</th>
                    <th className="p-1">Aktivitas</th>
                    <th className="p-1 text-right w-16">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  <tr><td className="p-1 text-center">1</td><td className="p-1 font-sans">Kelas dimonitor</td><td className="p-1 text-right font-bold">12 / 12</td></tr>
                  <tr><td className="p-1 text-center">2</td><td className="p-1 font-sans">Guru tidak masuk</td><td className="p-1 text-right font-bold">3</td></tr>
                  <tr><td className="p-1 text-center">3</td><td className="p-1 font-sans">Guru pengganti</td><td className="p-1 text-right font-bold">2</td></tr>
                  <tr><td className="p-1 text-center">4</td><td className="p-1 font-sans">Siswa tidak masuk</td><td className="p-1 text-right font-bold">12</td></tr>
                  <tr><td className="p-1 text-center">5</td><td className="p-1 font-sans">Siswa terlambat</td><td className="p-1 text-right font-bold">8</td></tr>
                  <tr><td className="p-1 text-center">6</td><td className="p-1 font-sans">Siswa tugas khusus</td><td className="p-1 text-right font-bold">5</td></tr>
                  <tr><td className="p-1 text-center">7</td><td className="p-1 font-sans">Pelanggaran siswa</td><td className="p-1 text-right font-bold">4</td></tr>
                  <tr><td className="p-1 text-center">8</td><td className="p-1 font-sans">Izin keluar kelas</td><td className="p-1 text-right font-bold">6</td></tr>
                  <tr><td className="p-1 text-center">9</td><td className="p-1 font-sans">Kendala dilaporkan</td><td className="p-1 text-right font-bold">2</td></tr>
                </tbody>
              </table>
            </div>

            {/* III. Catatan Guru Piket */}
            <div>
              <p className="font-bold uppercase tracking-wider mb-1">III. CATATAN GURU PIKET</p>
              <p className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700 italic">
                "{catatan}"
              </p>
            </div>

            {/* Signatures */}
            <div className="pt-4 grid grid-cols-2 gap-4 text-center text-[10px]">
              <div>
                <p>Mengetahui,</p>
                <p className="font-bold">Kepala Madrasah</p>
                <div className="h-12 flex items-center justify-center font-serif italic text-slate-400">
                  (Tanda Tangan Digital)
                </div>
                <p className="font-bold underline">Dr. H. Syahrul Mushtofa, M.Pd</p>
              </div>

              <div>
                <p>Bantul, 4 September 2026</p>
                <p className="font-bold">Guru Piket</p>
                <div className="h-12 flex items-center justify-center font-serif italic text-blue-700 font-bold text-sm">
                  Zainal Arifin
                </div>
                <p className="font-bold underline">{currentUser.namaLengkap}</p>
              </div>
            </div>

            <div className="pt-3 text-center border-t border-slate-200">
              <p className="text-[10px] font-serif italic text-slate-500">
                "Ikhlas Beramal, Cerdas dalam Tugas, Tertib untuk Madrasah"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
