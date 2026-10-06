import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  GraduationCap,
  Calendar,
  AlertTriangle,
  Search,
  RotateCw,
  Info,
  Lightbulb,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { exportToXLSX } from '../../utils/excelHelper';

export const SiswaTerlambatView: React.FC = () => {
  const { siswaTerlambatList, alertSuccess } = useApp();
  const [filterKelas, setFilterKelas] = useState('Semua');
  const [filterJam, setFilterJam] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = siswaTerlambatList.filter((item) => {
    const matchKelas = filterKelas === 'Semua' || item.kelas === filterKelas;
    const matchJam = filterJam === 'Semua' || String(item.jamKe) === filterJam;
    const matchSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKelas && matchJam && matchSearch;
  });

  const handleExportXLSX = () => {
    const headers = ['No', 'Waktu Terlambat', 'Nama Siswa', 'Kelas', 'Jam Ke', 'Menit Terlambat', 'Alasan / Keterangan', 'Tindak Lanjut Piket', 'Status'];
    const rows = filteredData.map((item, idx) => [
      idx + 1,
      item.waktuTerlambat || '07:15',
      item.nama,
      item.kelas,
      `Jam Ke-${item.jamKe}`,
      item.menitTerlambat ? `${item.menitTerlambat} Menit` : '15 Menit',
      item.keterangan || '-',
      item.tindakan || 'Teguran & Pembinaan',
      'Selesai Ditangani'
    ]);

    exportToXLSX({
      filename: `Siswa_Terlambat_MAPLUS_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Siswa Terlambat',
      headers,
      data: rows,
      colWidths: [8, 16, 28, 12, 14, 16, 32, 28, 16]
    });

    alertSuccess(
      'Ekspor Excel Berhasil',
      'Data santri terlambat berhasil diekspor ke format Excel (.xlsx) dengan kolom sel terpisah rapi.'
    );
  };

  return (
    <div className="space-y-6">
      {/* 4 Stat Summary Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Terlambat */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
              ↑ +5 dari kemarin
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono tabular-nums">18</p>
          <p className="text-xs text-slate-500 font-medium">Total Siswa Terlambat Hari Ini</p>
        </div>

        {/* Jam Ke-1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
              66,7%
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono tabular-nums">12</p>
          <p className="text-xs text-slate-500 font-medium">Terlambat Jam Ke-1</p>
        </div>

        {/* Jam Ke-2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-mono">
              22,2%
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono tabular-nums">4</p>
          <p className="text-xs text-slate-500 font-medium">Terlambat Jam Ke-2</p>
        </div>

        {/* Jam Ke-3 dst */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded font-mono">
              11,1%
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono tabular-nums">2</p>
          <p className="text-xs text-slate-500 font-medium">Terlambat Jam Ke-3 dst.</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>04/09/2026</span>
        </div>

        <select
          value={filterKelas}
          onChange={(e) => setFilterKelas(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium"
        >
          <option value="Semua">Semua Kelas</option>
          <option value="XA">Kelas XA</option>
          <option value="XB">Kelas XB</option>
          <option value="XIA">Kelas XIA</option>
          <option value="XIIA">Kelas XIIA</option>
          <option value="XIIB">Kelas XIIB</option>
          <option value="XIIC">Kelas XIIC</option>
        </select>

        <select
          value={filterJam}
          onChange={(e) => setFilterJam(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium"
        >
          <option value="Semua">Semua Jam Ke</option>
          <option value="1">Jam Ke 1</option>
          <option value="2">Jam Ke 2</option>
          <option value="3">Jam Ke 3</option>
          <option value="4">Jam Ke 4</option>
          <option value="5">Jam Ke 5</option>
        </select>

        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, NIS, atau keterangan..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => {
            setFilterKelas('Semua');
            setFilterJam('Semua');
            setSearchQuery('');
          }}
          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors cursor-pointer"
          title="Reset Filter"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={handleExportXLSX}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          title="Ekspor Data Siswa Terlambat ke Excel (.xlsx) dengan kolom sel terpisah"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          <span>Export .xlsx</span>
        </button>
      </div>

      {/* Main Grid: Left Table & Right Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Daftar Siswa Terlambat
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total Data: {filteredData.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase">
                <tr>
                  <th className="py-3 px-3">No</th>
                  <th className="py-3 px-3">Nama Siswa</th>
                  <th className="py-3 px-3">Kelas</th>
                  <th className="py-3 px-3">Waktu Terlambat</th>
                  <th className="py-3 px-3">Jam Ke</th>
                  <th className="py-3 px-3">Keterangan</th>
                  <th className="py-3 px-3">Dicatat Oleh</th>
                  <th className="py-3 px-3">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{item.nama}</td>
                    <td className="py-3 px-3 font-semibold text-blue-600">{item.kelas}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">
                      {item.waktuTerlambat}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">
                      {item.jamKe}
                    </td>
                    <td className="py-3 px-3 text-slate-600">{item.keterangan}</td>
                    <td className="py-3 px-3 text-slate-700">{item.dicatatOleh}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.tindakan === 'Teguran'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : item.tindakan === 'Dicatat'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {item.tindakan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Menampilkan 1 - {filteredData.length} dari 18 data</span>
            <div className="flex items-center gap-1 font-mono font-bold">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                1
              </span>
              <span className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-700">
                2
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Rekap per Kelas & Rekap per Jam */}
        <div className="lg:col-span-4 space-y-4">
          {/* Rekap per Kelas Bar Progress */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Rekap per Kelas
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { kelas: 'XA', count: 3, max: 5 },
                { kelas: 'XB', count: 2, max: 5 },
                { kelas: 'XIA', count: 4, max: 5 },
                { kelas: 'XIB', count: 1, max: 5 },
                { kelas: 'XIIA', count: 3, max: 5 },
                { kelas: 'XIIB', count: 2, max: 5 },
                { kelas: 'XIIC', count: 1, max: 5 },
                { kelas: 'XII-IPA', count: 1, max: 5 },
                { kelas: 'XII-IPS', count: 1, max: 5 }
              ].map((k, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-14 font-bold text-slate-700 text-[11px]">{k.kelas}</span>
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-400 h-full rounded-full"
                      style={{ width: `${(k.count / k.max) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-mono font-bold text-slate-900 w-4 text-right">
                    {k.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rekap per Jam Ke */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Rekap per Jam Ke
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { jam: 'Jam Ke-1', count: 12, percent: '66,7%' },
                { jam: 'Jam Ke-2', count: 4, percent: '22,2%' },
                { jam: 'Jam Ke-3', count: 1, percent: '5,6%' },
                { jam: 'Jam Ke-4', count: 1, percent: '5,6%' },
                { jam: 'Jam Ke-5', count: 0, percent: '0%' },
                { jam: 'Jam Ke-6', count: 0, percent: '0%' }
              ].map((j, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-700">{j.jam}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {j.count} <span className="text-slate-400 text-[10px]">({j.percent})</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: j.percent }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Informasi Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Informasi:</span>
            </p>
            <ol className="text-[11px] text-slate-600 space-y-1 list-decimal list-inside leading-relaxed">
              <li>Data siswa terlambat diambil otomatis dari menu Pelanggaran Siswa.</li>
              <li>Tidak perlu melakukan input ulang pada menu ini.</li>
              <li>Gunakan filter untuk melihat rekap sesuai kebutuhan.</li>
              <li>Klik nama siswa pada tabel untuk melihat detail pelanggaran.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
