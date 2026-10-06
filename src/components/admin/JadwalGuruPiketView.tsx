import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JadwalGuruPiket } from '../../types';
import {
  CalendarCheck,
  Users,
  Shield,
  Clock,
  Plus,
  Edit2,
  Calendar,
  CheckCircle2,
  Check,
  FileSpreadsheet,
  X,
  Trash2,
  Sparkles
} from 'lucide-react';
import { exportToXLSX } from '../../utils/excelHelper';

export const JadwalGuruPiketView: React.FC = () => {
  const {
    jadwalGuruPiketList,
    guruList,
    addJadwalPiket,
    updateJadwalPiket,
    deleteJadwalPiket,
    confirmAction,
    alertSuccess
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingPiket, setEditingPiket] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    hari: string;
    koordinator: string;
    anggota: string[];
    jamMulai: string;
    jamSelesai: string;
    fokusTugas: string;
  }>({
    hari: 'Senin',
    koordinator: 'Zainal Arifin, S.Pd',
    anggota: ['Ahmad Setiawan, S.Pd', 'Siti Fatimah, S.Pd'],
    jamMulai: '06:45',
    jamSelesai: '14:30',
    fokusTugas: 'Penyambutan santri di gerbang, presensi KBM jam 1-8, izin keluar & distribusi MBG'
  });

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const handleOpenAddModal = () => {
    setEditingPiket(null);
    setFormData({
      hari: 'Senin',
      koordinator: guruList[0]?.nama || 'Zainal Arifin, S.Pd',
      anggota: [guruList[1]?.nama || 'Ahmad Setiawan, S.Pd', guruList[2]?.nama || 'Siti Fatimah, S.Pd'],
      jamMulai: '06:45',
      jamSelesai: '14:30',
      fokusTugas: 'Penyambutan santri, monitoring KBM, penanganan izin & porsi MBG'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (piket: any) => {
    setEditingPiket(piket);
    const existingAnggota: string[] = piket.anggota || [piket.guruPiket1, piket.guruPiket2].filter(Boolean);
    const coord: string = piket.koordinator || piket.guruPiket1 || (guruList[0]?.nama || 'Zainal Arifin, S.Pd');
    setFormData({
      hari: piket.hari || 'Senin',
      koordinator: coord,
      anggota: existingAnggota.length > 0 ? existingAnggota : [coord],
      jamMulai: piket.jamMulai || '06:45',
      jamSelesai: piket.jamSelesai || '14:30',
      fokusTugas: piket.fokusTugas || 'Penyambutan santri, monitoring KBM, penanganan izin & porsi MBG'
    });
    setShowModal(true);
  };

  const handleToggleAnggota = (nama: string) => {
    setFormData((prev) => {
      const exists = prev.anggota.includes(nama);
      if (exists) {
        return { ...prev, anggota: prev.anggota.filter((a) => a !== nama) };
      } else {
        return { ...prev, anggota: [...prev.anggota, nama] };
      }
    });
  };

  const handleSavePiket = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPiket) {
      updateJadwalPiket(editingPiket.id, {
        hari: formData.hari,
        koordinator: formData.koordinator,
        guruPiket1: formData.koordinator,
        guruPiket2: formData.anggota[0] || formData.koordinator,
        anggota: formData.anggota,
        jamMulai: formData.jamMulai,
        jamSelesai: formData.jamSelesai,
        fokusTugas: formData.fokusTugas
      });
      alertSuccess(
        'Jadwal Piket Diperbarui',
        `Tim piket hari ${formData.hari} telah diperbarui dengan koordinator ${formData.koordinator}.`
      );
    } else {
      addJadwalPiket({
        hari: formData.hari,
        koordinator: formData.koordinator,
        guruPiket1: formData.koordinator,
        guruPiket2: formData.anggota[0] || formData.koordinator,
        anggota: formData.anggota,
        jamMulai: formData.jamMulai,
        jamSelesai: formData.jamSelesai,
        fokusTugas: formData.fokusTugas
      });
      alertSuccess(
        'Jadwal Piket Ditambahkan',
        `Jadwal penugasan piket hari ${formData.hari} berhasil didaftarkan ke sistem madrasah.`
      );
    }

    setShowModal(false);
  };

  const handleDeletePiket = (piket: any) => {
    confirmAction({
      title: 'Hapus Jadwal Piket',
      message: `Hapus penugasan piket untuk hari ${piket.hari}?`,
      confirmText: 'Ya, Hapus',
      isDanger: true,
      onConfirm: () => {
        deleteJadwalPiket(piket.id);
        alertSuccess('Jadwal Piket Dihapus', `Jadwal piket hari ${piket.hari} telah dihapus.`);
      }
    });
  };

  const handleExportXLSX = () => {
    const headers = ['No', 'Hari Piket', 'Koordinator Piket', 'Anggota Tim Piket', 'Jam Bertugas', 'Fokus Tugas Harian', 'Status'];
    const rows = jadwalGuruPiketList.map((piket: any, idx: number) => {
      const anggotaList: string[] = piket.anggota || [piket.guruPiket1, piket.guruPiket2].filter(Boolean);
      const koordinatorNama: string = piket.koordinator || piket.guruPiket1 || 'Zainal Arifin, S.Pd';
      return [
        idx + 1,
        piket.hari,
        koordinatorNama,
        anggotaList.join(', '),
        `${piket.jamMulai || '06:45'} - ${piket.jamSelesai || '14:30'}`,
        piket.fokusTugas || 'Penyambutan santri, Presensi KBM, Izin Keluar & MBG',
        'Aktif Semester Genap 2026'
      ];
    });

    exportToXLSX({
      filename: `Jadwal_Guru_Piket_MAPLUS_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Jadwal Guru Piket',
      headers,
      data: rows,
      colWidths: [8, 16, 28, 36, 20, 42, 22]
    });

    alertSuccess(
      'Ekspor Excel Berhasil',
      'Jadwal piket mingguan madrasah berhasil diekspor ke format Excel (.xlsx) dengan kolom sel terpisah rapi.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#064E3B] to-[#0B1528] rounded-3xl p-6 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Manajemen Tim Piket Madrasah
          </span>
          <h2 className="text-xl sm:text-2xl font-black">Jadwal Rotasi Petugas Guru Piket Harian</h2>
          <p className="text-emerald-100 text-xs mt-1 max-w-xl leading-relaxed">
            Petugas guru piket bertugas menyambut santri di gerbang, memonitor ketepatan waktu KBM di tiap kelas,
            mengelola izin keluar, dan mendistribusikan porsi Makan Bergizi Gratis (MBG).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportXLSX}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-2 transition-colors border border-emerald-600/60"
            title="Ekspor Jadwal Piket ke Excel (.xlsx) dengan kolom sel terpisah"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
            <span>Export .xlsx</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Atur Jadwal Piket</span>
          </button>
        </div>
      </div>

      {/* Week Grid of Duty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jadwalGuruPiketList.map((piket: any) => {
          const isToday = piket.hari === 'Jumat';
          const anggotaList: string[] = piket.anggota || [piket.guruPiket1, piket.guruPiket2].filter(Boolean);
          const koordinatorNama: string = piket.koordinator || piket.guruPiket1 || 'Zainal Arifin, S.Pd';

          return (
            <div
              key={piket.id}
              className={`bg-white rounded-3xl border transition-all shadow-2xs overflow-hidden flex flex-col justify-between ${
                isToday ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200'
              }`}
            >
              <div>
                <div className={`px-5 py-3.5 flex items-center justify-between ${
                  isToday ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white' : 'bg-slate-50 text-slate-800 border-b border-slate-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className={`w-5 h-5 ${isToday ? 'text-amber-300' : 'text-emerald-700'}`} />
                    <span className="font-bold text-sm sm:text-base">Hari {piket.hari}</span>
                  </div>
                  {isToday ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 uppercase tracking-wider">
                      Tugas Hari Ini
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400">
                      Shift Pagi
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  {/* Koordinator */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-700" />
                      Koordinator Piket
                    </div>
                    <div className="font-black text-slate-900 text-sm">{koordinatorNama}</div>
                  </div>

                  {/* Anggota Petugas */}
                  <div>
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      Anggota Tim Piket ({anggotaList.length})
                    </div>
                    <ul className="space-y-1.5">
                      {anggotaList.map((nama: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{nama}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lokasi Pos & Waktu */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {piket.jamMulai || '06:45'} - {piket.jamSelesai || '14:30'}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-slate-600 font-medium text-[11px]">
                      Pos Piket Utama
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeletePiket(piket)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Hapus Penugasan Piket Hari Ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEditModal(piket)}
                  className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Ubah / Atur Petugas</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Atur Petugas Piket Manual */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingPiket ? `Atur Petugas Piket Hari ${formData.hari}` : 'Tambah Jadwal Guru Piket'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Pilih koordinator dan anggota tim piket yang bertugas
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePiket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hari Bertugas <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.hari}
                  onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  required
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      Hari {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Koordinator Tim Piket <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.koordinator}
                  onChange={(e) => setFormData({ ...formData, koordinator: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  required
                >
                  {guruList.map((g) => (
                    <option key={g.id} value={g.nama}>
                      {g.nama} ({g.mapelUtama || 'Guru'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Anggota Tim Piket ({formData.anggota.length} Terpilih) <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-slate-400 font-normal">Klik untuk memilih</span>
                </label>
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-50 space-y-1">
                  {guruList.map((g) => {
                    const isSelected = formData.anggota.includes(g.nama);
                    return (
                      <div
                        key={g.id}
                        onClick={() => handleToggleAnggota(g.nama)}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-950 font-bold'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="rounded accent-emerald-600"
                          />
                          <span>{g.nama}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal">{g.mapelUtama || 'Guru'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jam Mulai Piket
                  </label>
                  <input
                    type="time"
                    value={formData.jamMulai}
                    onChange={(e) => setFormData({ ...formData, jamMulai: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jam Selesai Piket
                  </label>
                  <input
                    type="time"
                    value={formData.jamSelesai}
                    onChange={(e) => setFormData({ ...formData, jamSelesai: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fokus Tugas / Catatan Piket
                </label>
                <textarea
                  rows={2}
                  value={formData.fokusTugas}
                  onChange={(e) => setFormData({ ...formData, fokusTugas: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-700/25 cursor-pointer"
                >
                  Simpan Jadwal Piket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
