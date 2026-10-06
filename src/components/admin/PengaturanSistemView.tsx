import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building2,
  Clock,
  Shield,
  MessageSquare,
  Palette,
  Save,
  CheckCircle2,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { ImageUploader } from '../common/ImageUploader';

export const PengaturanSistemView: React.FC = () => {
  const { madrasahInfo, setMadrasahInfo, alertSuccess } = useApp();

  const [activeTab, setActiveTab] = useState<'identitas' | 'jam-kbm' | 'tatib' | 'whatsapp' | 'tema'>('identitas');
  const [formData, setFormData] = useState({ ...madrasahInfo });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMadrasahInfo(formData);
    setSavedSuccess(true);
    alertSuccess('Pengaturan Tersimpan', 'Informasi identitas madrasah, logo resmi, dan kop surat berhasil diperbarui!');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Pengaturan sistem berhasil disimpan dan diterapkan ke seluruh modul!
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('identitas')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'identitas'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Identitas Madrasah
        </button>
        <button
          onClick={() => setActiveTab('jam-kbm')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'jam-kbm'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          Waktu & Jam KBM
        </button>
        <button
          onClick={() => setActiveTab('tatib')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'tatib'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          Kriteria Poin & Tatib
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'whatsapp'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Integrasi WhatsApp Gateway
        </button>
        <button
          onClick={() => setActiveTab('tema')}
          className={`px-5 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'tema'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          Tampilan & Tema
        </button>
      </div>

      {/* Identitas Form */}
      {activeTab === 'identitas' && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <ImageUploader
              currentImage={formData.logo}
              onImageChange={(imgUrl) => setFormData({ ...formData, logo: imgUrl })}
              label="Logo Resmi Madrasah"
              sublabel="Klik untuk upload logo resmi (PNG/JPG). Logo digunakan pada kop surat, laporan resmi, dan kartu kendali madrasah."
              shape="square"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Madrasah</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Motto / Slogan</label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NSM (Nomor Statistik)</label>
              <input
                type="text"
                value={formData.nsm}
                onChange={(e) => setFormData({ ...formData, nsm: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NPSN</label>
              <input
                type="text"
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status Akreditasi</label>
              <input
                type="text"
                value={formData.akreditasi}
                onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Lembaga</label>
            <input
              type="text"
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kepala Madrasah</label>
              <input
                type="text"
                value={formData.kepalaMadrasah}
                onChange={(e) => setFormData({ ...formData, kepalaMadrasah: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Kepala Madrasah</label>
              <input
                type="text"
                value={formData.nipKepala}
                onChange={(e) => setFormData({ ...formData, nipKepala: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Simpan Identitas Madrasah
            </button>
          </div>
        </form>
      )}

      {/* Jam KBM */}
      {activeTab === 'jam-kbm' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h4 className="font-bold text-slate-800">Konfigurasi Jam KBM & Jadwal Pembelajaran</h4>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jam Masuk Piket</label>
              <input type="time" defaultValue="06:30" className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jam Masuk KBM</label>
              <input type="time" defaultValue="07:00" className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Durasi Jam Belajar</label>
              <input type="number" defaultValue={45} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Batas Telat Guru (Window)</label>
              <input type="number" defaultValue={15} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
          </div>
          <button
            onClick={() => alertSuccess('Waktu KBM Disimpan', 'Konfigurasi jadwal jam pembelajaran KBM dan batas toleransi keterlambatan berhasil diperbarui!')}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold cursor-pointer shadow-xs transition-colors"
          >
            Simpan Waktu KBM
          </button>
        </div>
      )}

      {/* WhatsApp */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h4 className="font-bold text-slate-800">Status Gateway Notifikasi WhatsApp</h4>
              <p className="text-xs text-slate-500">Notifikasi otomatis ke wali santri untuk absensi dan surat tugas.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              TERHUBUNG (ONLINE)
            </span>
          </div>

          <div className="space-y-3 max-w-lg text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Sender ID:</span>
              <span className="font-mono font-bold text-slate-700">+62 812-3456-7890 (MA PLUS Official)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Pesan Terkirim Hari Ini:</span>
              <span className="font-bold text-blue-700">12 Notifikasi Izin & Ketidakhadiran</span>
            </div>
          </div>
        </div>
      )}

      {/* Tema */}
      {activeTab === 'tema' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-bold text-slate-800">Palet Warna Madrasah</h4>
          <div className="flex gap-4">
            <div className="p-4 rounded-xl border border-blue-600 bg-blue-50 text-blue-900 text-xs font-bold text-center w-36">
              <div className="w-8 h-8 rounded-full bg-blue-700 mx-auto mb-2"></div>
              Biru Madrasah (Aktif)
            </div>
            <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-700 text-xs font-bold text-center w-36 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-emerald-700 mx-auto mb-2"></div>
              Hijau Kemenag
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
