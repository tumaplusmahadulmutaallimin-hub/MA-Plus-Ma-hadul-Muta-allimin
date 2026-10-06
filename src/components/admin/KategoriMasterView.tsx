import React, { useState } from 'react';
import {
  Tag,
  AlertOctagon,
  AlertTriangle,
  Award,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface KategoriMasterViewProps {
  initialType?: 'tugas-khusus' | 'pelanggaran' | 'kendala';
}

export const KategoriMasterView: React.FC<KategoriMasterViewProps> = ({
  initialType = 'tugas-khusus'
}) => {
  const { alertSuccess } = useApp();
  const [activeTab, setActiveTab] = useState<'tugas-khusus' | 'pelanggaran' | 'kendala'>(initialType);

  const kategoriTugasKhusus = [
    { id: '1', nama: 'Tim Distribusi MBG', jenis: 'Tetap Harian', jam: '11:30 - 12:45', kuota: 12, keterangan: 'Membantu pembagian makan bergizi gratis di madrasah' },
    { id: '2', nama: 'Pengurus OSIS / MPK', jenis: 'Organisasi', jam: 'Kondisional', kuota: 24, keterangan: 'Kegiatan rapat dan koordinasi agenda madrasah' },
    { id: '3', nama: 'Petugas Upacara / Paskibra', jenis: 'Kepanitiaan', jam: '06:30 - 07:45', kuota: 18, keterangan: 'Latihan dan persiapan upacara bendera hari Senin' },
    { id: '4', nama: 'Tim Palang Merah Remaja (PMR)', jenis: 'Kesehatan', jam: 'Siaga', kuota: 8, keterangan: 'Piket posko kesehatan UKS madrasah' },
    { id: '5', nama: 'Duta Madrasah & Perlombaan', jenis: 'Insidental', jam: 'Dispensasi', kuota: 6, keterangan: 'Mewakili madrasah dalam olimpiade/kompetisi luar' }
  ];

  const kategoriPelanggaran = [
    { id: '1', pasal: 'A-01', nama: 'Keterlambatan Hadir Masuk Madrasah', tingkat: 'Ringan', poin: 2, sanksi: 'Teguran lisan & pencatatan piket' },
    { id: '2', pasal: 'A-02', nama: 'Atribut Seragam Tidak Lengkap (Kopyah/Dasi/Sepatu)', tingkat: 'Ringan', poin: 3, sanksi: 'Penertiban di gerbang' },
    { id: '3', pasal: 'B-01', nama: 'Meninggalkan Kelas / KBM Tanpa Izin Surat', tingkat: 'Sedang', poin: 5, sanksi: 'Pemanggilan oleh Guru BK' },
    { id: '4', pasal: 'B-02', nama: 'Membawa / Memainkan Gadget Tanpa Izin Guru', tingkat: 'Sedang', poin: 5, sanksi: 'Penyitaan HP selama 3 hari' },
    { id: '5', pasal: 'C-01', nama: 'Merokok / Vape di Lingkungan Madrasah', tingkat: 'Berat', poin: 25, sanksi: 'Pemanggilan orang tua & skorsing 3 hari' },
    { id: '6', pasal: 'C-02', nama: 'Perkelahian / Intimidasi Antar Santri', tingkat: 'Berat', poin: 50, sanksi: 'Skorsing 7 hari & perjanjian bermaterai' }
  ];

  const kategoriKendala = [
    { id: '1', nama: 'Fasilitas & Kelistrikan', unit: 'Sarpras', prioritas: 'Tinggi', contoh: 'Lampu mati, MCB turun, proyektor rusak' },
    { id: '2', nama: 'Kebersihan & Sanitasi', unit: 'Kebersihan', prioritas: 'Sedang', contoh: 'Toilet kotor, tempat sampah penuh, keran bocor' },
    { id: '3', nama: 'KBM & Kekosongan Guru', unit: 'Kurikulum', prioritas: 'Tinggi', contoh: 'Guru berhalangan tanpa modul tugas' },
    { id: '4', nama: 'Keamanan Lingkungan', unit: 'Satpam / Pos', prioritas: 'Mendesak', contoh: 'Tamu mencurigakan, kebisingan sekitar' },
    { id: '5', nama: 'Katering Makanan MBG', unit: 'Koordinator MBG', prioritas: 'Tinggi', contoh: 'Porsi kurang, keterlambatan pengiriman box' }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('tugas-khusus')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'tugas-khusus'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          Kategori Tugas Khusus
        </button>
        <button
          onClick={() => setActiveTab('pelanggaran')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'pelanggaran'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          Bobot Poin Pelanggaran Tatib
        </button>
        <button
          onClick={() => setActiveTab('kendala')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'kendala'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Kategori Kendala Sarpras & KBM
        </button>
      </div>

      {activeTab === 'tugas-khusus' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">
              Daftar penugasan khusus siswa yang mendapatkan dispensasi waktu KBM resmi dari madrasah.
            </p>
            <button
              onClick={() => alertSuccess('Program Tugas Khusus Baru', 'Formulir penambahan program penugasan khusus siswa telah dibuka.')}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              + Program Baru
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nama Program Tugas Khusus</th>
                  <th className="py-3 px-4">Jenis Program</th>
                  <th className="py-3 px-4">Waktu Tugas</th>
                  <th className="py-3 px-4 text-center">Kuota Anggota</th>
                  <th className="py-3 px-4">Keterangan</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {kategoriTugasKhusus.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-bold text-slate-800">{t.nama}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {t.jenis}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600">{t.jam}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">{t.kuota} Siswa</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{t.keterangan}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="p-1 text-slate-400 hover:text-amber-600 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'pelanggaran' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">
              Standar Operasional Prosedur bobot sanksi dan akumulasi poin tatib madrasah.
            </p>
            <button
              onClick={() => alertSuccess('Pasal Tata Tertib Baru', 'Formulir penambahan pasal pelanggaran dan bobot sanksi santri telah dibuka.')}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              + Pasal Pelanggaran Baru
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-20">Pasal</th>
                  <th className="py-3 px-4">Jenis Pelanggaran</th>
                  <th className="py-3 px-4">Tingkatan</th>
                  <th className="py-3 px-4 text-center">Bobot Poin</th>
                  <th className="py-3 px-4">Tindakan / Sanksi Disiplin</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {kategoriPelanggaran.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-slate-500">{p.pasal}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{p.nama}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        p.tingkat === 'Ringan'
                          ? 'bg-blue-100 text-blue-800'
                          : p.tingkat === 'Sedang'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.tingkat}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-sm text-rose-600">+{p.poin}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{p.sanksi}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="p-1 text-slate-400 hover:text-amber-600 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'kendala' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">
              Klasifikasi masalah dan eskalasi unit penanggung jawab penanganan fasilitas madrasah.
            </p>
            <button
              onClick={() => alertSuccess('Kategori Kendala Baru', 'Formulir penambahan klasifikasi kendala sarana prasarana madrasah telah dibuka.')}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              + Kategori Kendala Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kategoriKendala.map((k) => (
              <div key={k.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">{k.nama}</h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    k.prioritas === 'Mendesak'
                      ? 'bg-rose-100 text-rose-800'
                      : k.prioritas === 'Tinggi'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {k.prioritas}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="text-slate-400">Unit PIC Penanggung Jawab:</div>
                  <div className="font-semibold text-slate-800">{k.unit}</div>
                  <div className="text-slate-400 pt-1">Contoh Masalah:</div>
                  <div className="text-slate-600 bg-slate-50 p-2 rounded">{k.contoh}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
