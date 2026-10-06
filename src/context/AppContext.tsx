import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserAccount,
  Guru,
  Siswa,
  Kelas,
  MataPelajaran,
  RuangLokasi,
  JadwalKBM,
  JadwalGuruPiket,
  GuruTidakMasukItem,
  MonitoringKBMRecord,
  SiswaTerlambatData,
  IzinKeluarData,
  SiswaTugasKhususData,
  PelanggaranSiswaData,
  LaporKendalaData,
  LaporanGuruPiketData,
  PengumumanData
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_GURU,
  INITIAL_SISWA,
  INITIAL_KELAS,
  INITIAL_MAPEL,
  INITIAL_RUANG,
  INITIAL_JADWAL_KBM,
  INITIAL_JADWAL_PIKET,
  INITIAL_GURU_TIDAK_MASUK,
  INITIAL_MONITORING_KBM,
  INITIAL_SISWA_TIDAK_MASUK,
  INITIAL_SISWA_TERLAMBAT,
  INITIAL_IZIN_KELUAR,
  INITIAL_TUGAS_KHUSUS,
  INITIAL_PELANGGARAN,
  INITIAL_KENDALA,
  INITIAL_LAPORAN_PIKET,
  INITIAL_PENGUMUMAN
} from '../data/mockData';
import { GlobalModalPopup, PopupConfig } from '../components/common/GlobalModalPopup';

interface AppContextType {
  currentUser: UserAccount;
  setCurrentUser: (user: UserAccount) => void;
  users: UserAccount[];
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  activeTabSub: string;
  setActiveTabSub: (tab: string) => void;
  isPublicReportOpen: boolean;
  setIsPublicReportOpen: (open: boolean) => void;

  // Real data state
  gurus: Guru[];
  guruList: Guru[];
  setGurus: React.Dispatch<React.SetStateAction<Guru[]>>;
  siswas: Siswa[];
  siswaList: Siswa[];
  setSiswas: React.Dispatch<React.SetStateAction<Siswa[]>>;
  userList: UserAccount[];
  kelasList: Kelas[];
  setKelasList: React.Dispatch<React.SetStateAction<Kelas[]>>;
  mapelList: MataPelajaran[];
  setMapelList: React.Dispatch<React.SetStateAction<MataPelajaran[]>>;
  ruangList: RuangLokasi[];
  setRuangList: React.Dispatch<React.SetStateAction<RuangLokasi[]>>;
  jadwalKBMList: JadwalKBM[];
  setJadwalKBMList: React.Dispatch<React.SetStateAction<JadwalKBM[]>>;
  jadwalPiketList: JadwalGuruPiket[];
  jadwalGuruPiketList: JadwalGuruPiket[];
  setJadwalPiketList: React.Dispatch<React.SetStateAction<JadwalGuruPiket[]>>;
  guruTidakMasukList: GuruTidakMasukItem[];
  setGuruTidakMasukList: React.Dispatch<React.SetStateAction<GuruTidakMasukItem[]>>;
  monitoringKBMList: MonitoringKBMRecord[];
  setMonitoringKBMList: React.Dispatch<React.SetStateAction<MonitoringKBMRecord[]>>;
  siswaTidakMasukList: any[];
  setSiswaTidakMasukList: React.Dispatch<React.SetStateAction<any[]>>;
  siswaTerlambatList: SiswaTerlambatData[];
  setSiswaTerlambatList: React.Dispatch<React.SetStateAction<SiswaTerlambatData[]>>;
  izinKeluarList: IzinKeluarData[];
  setIzinKeluarList: React.Dispatch<React.SetStateAction<IzinKeluarData[]>>;
  tugasKhususList: SiswaTugasKhususData[];
  setTugasKhususList: React.Dispatch<React.SetStateAction<SiswaTugasKhususData[]>>;
  pelanggaranList: PelanggaranSiswaData[];
  setPelanggaranList: React.Dispatch<React.SetStateAction<PelanggaranSiswaData[]>>;
  kendalaList: LaporKendalaData[];
  setKendalaList: React.Dispatch<React.SetStateAction<LaporKendalaData[]>>;
  laporanPiketList: LaporanGuruPiketData[];
  laporanList: any[];
  setLaporanPiketList: React.Dispatch<React.SetStateAction<LaporanGuruPiketData[]>>;
  pengumumanList: PengumumanData[];
  setPengumumanList: React.Dispatch<React.SetStateAction<PengumumanData[]>>;
  madrasahInfo: any;
  setMadrasahInfo: (info: any) => void;

  // Actions
  switchRole: (role: 'Administrator' | 'Guru Piket' | 'Kepala Madrasah') => void;
  assignSubstituteTeacher: (itemId: string, jamKe: number, kelas: string, substituteTeacher: string, notes?: string) => void;
  markSiswaReturned: (izinId: string) => void;
  markTugasKhususReturned: (tkId: string) => void;
  addKendala: (kendala: Partial<LaporKendalaData>) => void;
  addPelanggaran: (pelanggaran: Partial<PelanggaranSiswaData>) => void;
  addIzinKeluar: (izin: Partial<IzinKeluarData>) => void;
  addGuruTidakMasuk: (report: Partial<GuruTidakMasukItem>) => void;
  submitPiketReportToKepala: (notes: string) => void;
  verifyPiketReportByKepala: (reportId: string, status: 'Diterima' | 'Ditolak', catatan: string) => void;
  addGuru: (guru: any) => void;
  updateGuru: (id: string, guru: any) => void;
  deleteGuru: (id: string) => void;
  addSiswa: (siswa: any) => void;
  updateSiswa: (id: string, siswa: any) => void;
  deleteSiswa: (id: string) => void;
  addKelas: (kelas: any) => void;
  updateKelas: (id: string, kelas: any) => void;
  deleteKelas: (id: string) => void;
  addMapel: (mapel: any) => void;
  updateMapel: (id: string, mapel: any) => void;
  deleteMapel: (id: string) => void;
  addRuang: (ruang: any) => void;
  updateRuang: (id: string, ruang: any) => void;
  deleteRuang: (id: string) => void;
  addJadwalKBM: (data: Partial<JadwalKBM>) => void;
  updateJadwalKBM: (id: string, data: Partial<JadwalKBM>) => void;
  deleteJadwalKBM: (id: string) => void;
  addJadwalPiket: (data: Partial<JadwalGuruPiket>) => void;
  updateJadwalPiket: (id: string, data: Partial<JadwalGuruPiket>) => void;
  deleteJadwalPiket: (id: string) => void;
  addUser: (user: any) => void;
  updateUser: (id: string, user: any) => void;
  deleteUser: (id: string) => void;
  addSiswaTidakMasuk: (data: any) => void;
  saveMonitoringKBM: (record: Partial<MonitoringKBMRecord> & { kelas: string; jamKe: number }) => void;
  confirmTeacherKBMArrival: (recordId: string, payload: {
    fotoBuktiKelas: string;
    catatan?: string;
    waktuKonfirmasiHadir?: string;
    menitTerlambat?: number;
    kelas?: string;
    jamKe?: number;
    guruNama?: string;
    mapel?: string;
  }) => void;
  updateKendalaStatus: (id: string, status: any, tindakLanjut?: string) => void;
  updateLaporanStatus: (id: string, status: any, catatan?: string) => void;
  addPengumuman: (p: any) => void;

  // Global Popup & Confirmation System
  popupConfig: PopupConfig | null;
  showPopup: (config: PopupConfig) => void;
  closePopup: () => void;
  confirmAction: (options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
    onConfirm: () => void;
  }) => void;
  alertSuccess: (title: string, message: string) => void;
  alertError: (title: string, message: string) => void;
  alertInfo: (title: string, message: string) => void;

  // Authentication & Security
  login: (username: string, password: string) => { success: boolean; message: string; user?: UserAccount };
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  // Default to Guru Piket (Zainal Arifin) as featured on key screens, can switch freely!
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[1]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [activeTabSub, setActiveTabSub] = useState<string>('all');
  const [isPublicReportOpen, setIsPublicReportOpen] = useState<boolean>(false);
  const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null);

  const [gurus, setGurus] = useState<Guru[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_guru_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_GURU;
  });

  const [siswas, setSiswas] = useState<Siswa[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_siswa_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SISWA;
  });

  const [kelasList, setKelasList] = useState<Kelas[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_kelas_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_KELAS;
  });

  const [mapelList, setMapelList] = useState<MataPelajaran[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_mapel_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MAPEL;
  });

  const [ruangList, setRuangList] = useState<RuangLokasi[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_ruang_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_RUANG;
  });

  const [jadwalKBMList, setJadwalKBMList] = useState<JadwalKBM[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_jadwal_kbm');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_JADWAL_KBM;
  });

  const [jadwalPiketList, setJadwalPiketList] = useState<JadwalGuruPiket[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_jadwal_piket');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_JADWAL_PIKET;
  });

  const [guruTidakMasukList, setGuruTidakMasukList] = useState<GuruTidakMasukItem[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_guru_tidak_masuk');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_GURU_TIDAK_MASUK;
  });

  const [monitoringKBMList, setMonitoringKBMList] = useState<MonitoringKBMRecord[]>(() => {
    try {
      const saved = localStorage.getItem('maplus_monitoring_kbm');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MONITORING_KBM;
  });
  const [siswaTidakMasukList, setSiswaTidakMasukList] = useState<any[]>(INITIAL_SISWA_TIDAK_MASUK);
  const [siswaTerlambatList, setSiswaTerlambatList] = useState<SiswaTerlambatData[]>(INITIAL_SISWA_TERLAMBAT);
  const [izinKeluarList, setIzinKeluarList] = useState<IzinKeluarData[]>(INITIAL_IZIN_KELUAR);
  const [tugasKhususList, setTugasKhususList] = useState<SiswaTugasKhususData[]>(INITIAL_TUGAS_KHUSUS);
  const [pelanggaranList, setPelanggaranList] = useState<PelanggaranSiswaData[]>(INITIAL_PELANGGARAN);
  const [kendalaList, setKendalaList] = useState<LaporKendalaData[]>(INITIAL_KENDALA);
  const [laporanPiketList, setLaporanPiketList] = useState<LaporanGuruPiketData[]>(INITIAL_LAPORAN_PIKET);
  const [pengumumanList, setPengumumanList] = useState<PengumumanData[]>(INITIAL_PENGUMUMAN);

  // Auto-sync persistent datasets to localStorage
  useEffect(() => {
    try { localStorage.setItem('maplus_guru_list', JSON.stringify(gurus)); } catch {}
  }, [gurus]);

  useEffect(() => {
    try { localStorage.setItem('maplus_siswa_list', JSON.stringify(siswas)); } catch {}
  }, [siswas]);

  useEffect(() => {
    try { localStorage.setItem('maplus_kelas_list', JSON.stringify(kelasList)); } catch {}
  }, [kelasList]);

  useEffect(() => {
    try { localStorage.setItem('maplus_mapel_list', JSON.stringify(mapelList)); } catch {}
  }, [mapelList]);

  useEffect(() => {
    try { localStorage.setItem('maplus_ruang_list', JSON.stringify(ruangList)); } catch {}
  }, [ruangList]);

  useEffect(() => {
    try { localStorage.setItem('maplus_jadwal_kbm', JSON.stringify(jadwalKBMList)); } catch {}
  }, [jadwalKBMList]);

  useEffect(() => {
    try { localStorage.setItem('maplus_jadwal_piket', JSON.stringify(jadwalPiketList)); } catch {}
  }, [jadwalPiketList]);

  useEffect(() => {
    try { localStorage.setItem('maplus_guru_tidak_masuk', JSON.stringify(guruTidakMasukList)); } catch {}
  }, [guruTidakMasukList]);

  // Sync monitoring state across browser tabs & devices in realtime
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'maplus_monitoring_kbm' && e.newValue) {
        try {
          setMonitoringKBMList(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'maplus_jadwal_kbm' && e.newValue) {
        try {
          setJadwalKBMList(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'maplus_jadwal_piket' && e.newValue) {
        try {
          setJadwalPiketList(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Switch role helper
  const switchRole = (role: 'Administrator' | 'Guru Piket' | 'Kepala Madrasah') => {
    const userFound = users.find(u => u.role === role);
    if (userFound) {
      setCurrentUser(userFound);
      setActiveView('dashboard');
    }
  };

  // Assign substitute teacher (inval) with cross-system integration to Monitoring KBM
  const assignSubstituteTeacher = (
    itemId: string,
    jamKe: number,
    kelas: string,
    substituteTeacher: string,
    notes?: string
  ) => {
    // 1. Update guruTidakMasukList
    setGuruTidakMasukList(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedJadwal = item.jadwalTerdampak.map(j => {
          if (j.jamKe === jamKe && j.kelas === kelas) {
            return {
              ...j,
              guruPengganti: substituteTeacher,
              status: 'Ditetapkan' as const,
              catatan: notes || j.catatan
            };
          }
          return j;
        });
        const unassigned = updatedJadwal.filter(j => j.status === 'Belum Ada').length;
        return {
          ...item,
          jadwalTerdampak: updatedJadwal,
          belumAdaPengganti: unassigned
        };
      }
      return item;
    }));

    // 2. Direct integration into monitoringKBMList so Guru Piket and Kepala immediately see the substitute teacher!
    setMonitoringKBMList(prev => {
      let found = false;
      const updated = prev.map(rec => {
        if (rec.kelas === kelas && Number(rec.jamKe) === Number(jamKe)) {
          found = true;
          return {
            ...rec,
            guruPengganti: substituteTeacher,
            statusGuru: `Didampingi Inval (${substituteTeacher})`,
            catatan: notes ? `${rec.catatan ? rec.catatan + ' | ' : ''}Guru Inval: ${substituteTeacher} (${notes})` : rec.catatan
          };
        }
        return rec;
      });

      if (!found) {
        const newRecord: MonitoringKBMRecord = {
          id: `mk-${Date.now()}`,
          jamKe,
          waktu: '07:00 - 07:45',
          kelas,
          mapel: 'KBM Terjadwal',
          guruJadwal: 'Guru Izin',
          guruPengganti: substituteTeacher,
          statusGuru: `Didampingi Inval (${substituteTeacher})`,
          kondisiPembelajaran: 'Berlangsung dengan baik',
          kondisiSiswa: 'Tertib',
          waktuCek: '07:15',
          statusIsi: 'Sudah diisi' as const,
          catatan: notes ? `Guru Inval: ${substituteTeacher} (${notes})` : `Guru Inval: ${substituteTeacher}`
        };
        const res = [newRecord, ...updated];
        try { localStorage.setItem('maplus_monitoring_kbm', JSON.stringify(res)); } catch {}
        return res;
      }

      try { localStorage.setItem('maplus_monitoring_kbm', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const markSiswaReturned = (izinId: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setIzinKeluarList(prev => prev.map(item => {
      if (item.id === izinId) {
        return {
          ...item,
          status: 'Kembali',
          waktuKembali: timeStr
        };
      }
      return item;
    }));
  };

  const markTugasKhususReturned = (tkId: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setTugasKhususList(prev => prev.map(item => {
      if (item.id === tkId) {
        return {
          ...item,
          statusHariIni: 'Selesai (Tepat Waktu)',
          kembali: timeStr
        };
      }
      return item;
    }));
  };

  const addKendala = (newKendala: Partial<LaporKendalaData>) => {
    const item: LaporKendalaData = {
      id: `knd-${Date.now()}`,
      no: kendalaList.length + 1,
      noTiket: `#KND-2026-00${kendalaList.length + 1}`,
      tanggalWaktu: '04/09/2026 09:15',
      kategori: newKendala.kategori || 'Fasilitas',
      judulKendala: newKendala.judulKendala || 'Kendala baru',
      lokasi: newKendala.lokasi || 'Area Madrasah',
      pelapor: currentUser.namaLengkap,
      status: 'Perlu Tindak Lanjut',
      prioritas: newKendala.prioritas || 'Normal',
      deskripsi: newKendala.deskripsi || '',
      fotoUrls: newKendala.fotoUrls || [],
      tujukanKepada: newKendala.tujukanKepada,
      riwayatTindakLanjut: [
        { waktu: '04 Sep 2026 09:15', keterangan: `Laporan dibuat oleh ${currentUser.namaLengkap}`, oleh: currentUser.namaLengkap }
      ]
    };
    setKendalaList(prev => [item, ...prev]);
  };

  const addPelanggaran = (newPel: Partial<PelanggaranSiswaData>) => {
    const item: PelanggaranSiswaData = {
      id: `p-${Date.now()}`,
      no: pelanggaranList.length + 1,
      nis: newPel.nis || '1234567890',
      waktu: '09:15',
      nama: newPel.nama || 'Siswa',
      kelas: newPel.kelas || 'XA',
      jenisPelanggaran: newPel.jenisPelanggaran || 'Terlambat',
      tingkat: newPel.tingkat || 'Ringan',
      poin: newPel.poin || 5,
      keterangan: newPel.keterangan || '',
      dicatatOleh: currentUser.namaLengkap,
      tindakan: newPel.tindakan || 'Teguran',
      buktiFotoUrl: newPel.buktiFotoUrl,
      tanggal: '04/09/2026'
    };
    setPelanggaranList(prev => [item, ...prev]);
  };

  const addIzinKeluar = (newIzin: Partial<IzinKeluarData>) => {
    const item: IzinKeluarData = {
      id: `ik-${Date.now()}`,
      no: izinKeluarList.length + 1,
      nama: newIzin.nama || 'Siswa',
      kelas: newIzin.kelas || 'XA',
      tujuan: newIzin.tujuan || 'Ke Puskesmas',
      jenisIzin: newIzin.jenisIzin || 'Izin Keluar',
      waktuKeluar: newIzin.waktuKeluar || '09:15',
      estimasiKembali: newIzin.estimasiKembali || '10:30',
      durasi: '1j 15m',
      status: 'Masih Keluar',
      dicatatOleh: currentUser.namaLengkap,
      tanggal: '04/09/2026',
      keterangan: newIzin.keterangan,
      noHp: newIzin.noHp,
      pendamping: newIzin.pendamping
    };
    setIzinKeluarList(prev => [item, ...prev]);
  };

  const addGuruTidakMasuk = (report: Partial<GuruTidakMasukItem>) => {
    const newItem: GuruTidakMasukItem = {
      id: `gtm-${Date.now()}`,
      tanggal: 'Jumat, 4 September 2026',
      guruNama: report.guruNama || 'Guru Madrasah',
      alasan: report.alasan || 'Sakit',
      keterangan: report.keterangan || '',
      totalJadwal: report.jadwalTerdampak?.length || 1,
      belumAdaPengganti: report.jadwalTerdampak?.length || 1,
      jadwalTerdampak: report.jadwalTerdampak || []
    };
    setGuruTidakMasukList(prev => [newItem, ...prev]);
  };

  const submitPiketReportToKepala = (notes: string) => {
    const newReport: LaporanGuruPiketData = {
      id: `lp-${Date.now()}`,
      no: laporanPiketList.length + 1,
      tanggal: '4 Sep 2026',
      hari: 'Jum\'at',
      guruPiket: currentUser.namaLengkap,
      shift: 'Pagi',
      waktuKirim: '4 Sep 2026 11:30',
      ringkasan: `Laporan guru piket harian oleh ${currentUser.namaLengkap}. KBM berlangsung lancar.`,
      status: 'Menunggu',
      kelasDimonitor: '12 / 12',
      guruTidakMasukCount: guruTidakMasukList.length,
      guruPenggantiCount: 2,
      siswaTidakMasukCount: 12,
      siswaTerlambatCount: siswaTerlambatList.length,
      siswaTugasKhususCount: tugasKhususList.length,
      pelanggaranCount: pelanggaranList.length,
      izinKeluarCount: izinKeluarList.length,
      kendalaCount: kendalaList.length,
      catatanGuruPiket: notes || 'Kegiatan KBM dan ketertiban madrasah berjalan sesuai ketentuan.',
      kronologi: [
        { waktu: '07:05', kegiatan: 'Monitoring KBM', detail: 'Kelas XA - Jam Ke-1', menuTerkait: 'Monitoring KBM' },
        { waktu: '07:12', kegiatan: 'Pendataan siswa', detail: 'Mencatat siswa tidak masuk', menuTerkait: 'Siswa Tidak Masuk' },
        { waktu: '07:20', kegiatan: 'Penetapan guru pengganti', detail: 'Guru pengganti ditetapkan', menuTerkait: 'Tugas Guru Izin' },
        { waktu: '09:10', kegiatan: 'Pencatatan pelanggaran', detail: 'Pencatatan pelanggaran siswa', menuTerkait: 'Pelanggaran Siswa' },
        { waktu: '10:05', kegiatan: 'Pelaporan kendala', detail: 'Pelaporan kendala sarpras', menuTerkait: 'Lapor Kendala' }
      ]
    };
    setLaporanPiketList(prev => [newReport, ...prev]);
  };

  const [madrasahInfo, setMadrasahInfo] = useState({
    nama: "MA PLUS Ma'hadul Muta'allimin",
    slogan: 'Ikhlas Beramal, Cerdas dalam Tugas, Tertib untuk Madrasah',
    nsm: '131232050012',
    npsn: '69982415',
    akreditasi: 'A (Unggul)',
    alamat: 'Jl. Pesantren No. 12, Tarogong Kaler, Kabupaten Garut, Jawa Barat',
    telepon: '(0262) 234567',
    email: 'info@maplusmahadulmutaallimin.sch.id',
    website: 'maplusmahadulmutaallimin.sch.id',
    kepalaMadrasah: 'Drs. H. M. Fauzan, M.Pd.I',
    nipKepala: '19740510 199903 1 002',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150'
  });

  const addGuru = (guru: any) => setGurus(prev => [guru, ...prev]);
  const updateGuru = (id: string, guru: any) =>
    setGurus(prev => prev.map(g => (g.id === id ? { ...g, ...guru } : g)));
  const deleteGuru = (id: string) => setGurus(prev => prev.filter(g => g.id !== id));

  const addSiswa = (siswa: any) => setSiswas(prev => [siswa, ...prev]);
  const updateSiswa = (id: string, siswa: any) =>
    setSiswas(prev => prev.map(s => (s.id === id ? { ...s, ...siswa } : s)));
  const deleteSiswa = (id: string) => setSiswas(prev => prev.filter(s => s.id !== id));

  const addKelas = (kelas: any) => {
    const newItem: Kelas = {
      id: kelas.id || `k-${Date.now()}`,
      nama: kelas.nama,
      tingkat: kelas.tingkat || 'X',
      waliKelas: kelas.waliKelas || 'Belum Ditentukan',
      jumlahSiswa: Number(kelas.jumlahSiswa) || 30,
      kapasitas: Number(kelas.kapasitas) || 32,
      ruang: kelas.ruang || 'Ruang Teori'
    };
    setKelasList(prev => [newItem, ...prev]);
  };

  const updateKelas = (id: string, kelas: any) =>
    setKelasList(prev => prev.map(k => (k.id === id ? { ...k, ...kelas } : k)));

  const deleteKelas = (id: string) => setKelasList(prev => prev.filter(k => k.id !== id));

  const addMapel = (mapel: any) => {
    const newItem: MataPelajaran = {
      id: mapel.id || `m-${Date.now()}`,
      kode: mapel.kode || `MP-${Math.floor(100 + Math.random() * 900)}`,
      nama: mapel.nama,
      kelompok: mapel.kelompok || 'Kelompok A (Umum)',
      jamPekan: Number(mapel.jamPekan) || 2,
      kkm: Number(mapel.kkm) || 75
    };
    setMapelList(prev => [newItem, ...prev]);
  };

  const updateMapel = (id: string, mapel: any) =>
    setMapelList(prev => prev.map(m => (m.id === id ? { ...m, ...mapel } : m)));

  const deleteMapel = (id: string) => setMapelList(prev => prev.filter(m => m.id !== id));

  const addRuang = (ruang: any) => {
    const newItem: RuangLokasi = {
      id: ruang.id || `r-${Date.now()}`,
      kode: ruang.kode || `R-${Math.floor(10 + Math.random() * 90)}`,
      nama: ruang.nama,
      gedung: ruang.gedung || 'Gedung Utama',
      kapasitas: Number(ruang.kapasitas) || 32,
      kondisi: ruang.kondisi || 'Baik',
      tipe: ruang.tipe || 'Ruang Kelas Teori'
    };
    setRuangList(prev => [newItem, ...prev]);
  };

  const updateRuang = (id: string, ruang: any) =>
    setRuangList(prev => prev.map(r => (r.id === id ? { ...r, ...ruang } : r)));

  const deleteRuang = (id: string) => setRuangList(prev => prev.filter(r => r.id !== id));

  const addJadwalKBM = (data: Partial<JadwalKBM>) => {
    const newItem: JadwalKBM = {
      id: data.id || `jk-${Date.now()}`,
      hari: data.hari || 'Senin',
      jamKe: data.jamKe || 1,
      waktuMulai: data.waktuMulai || '07:00',
      waktuSelesai: data.waktuSelesai || '07:45',
      kelas: data.kelas || 'XA',
      mapel: data.mapel || 'Mata Pelajaran',
      guru: data.guru || data.guruPengajar || 'Guru Pengajar',
      guruPengajar: data.guruPengajar || data.guru || 'Guru Pengajar',
      ruang: data.ruang || 'Ruang Kelas',
      status: 'Aktif'
    };
    setJadwalKBMList(prev => [newItem, ...prev]);
  };

  const updateJadwalKBM = (id: string, data: Partial<JadwalKBM>) => {
    setJadwalKBMList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              ...data,
              guru: data.guru || data.guruPengajar || item.guru,
              guruPengajar: data.guruPengajar || data.guru || item.guruPengajar
            }
          : item
      )
    );
  };

  const deleteJadwalKBM = (id: string) => {
    setJadwalKBMList(prev => prev.filter(item => item.id !== id));
  };

  const addJadwalPiket = (data: Partial<JadwalGuruPiket>) => {
    const newItem: any = {
      id: data.id || `jp-${Date.now()}`,
      hari: data.hari || 'Senin',
      koordinator: data.koordinator || 'Zainal Arifin, S.Pd',
      guruPiket1: data.koordinator || 'Zainal Arifin, S.Pd',
      guruPiket2: (data.anggota && data.anggota[0]) || 'Ahmad Setiawan, S.Pd',
      anggota: data.anggota || ['Ahmad Setiawan, S.Pd', 'Siti Fatimah, S.Pd'],
      jamMulai: data.jamMulai || '06:45',
      jamSelesai: data.jamSelesai || '14:30',
      fokusTugas: data.fokusTugas || 'Penyambutan santri, Presensi KBM, Izin Keluar & MBG',
      status: 'Aktif'
    };
    setJadwalPiketList(prev => {
      const filtered = prev.filter(p => p.hari !== data.hari);
      return [...filtered, newItem];
    });
  };

  const updateJadwalPiket = (id: string, data: Partial<JadwalGuruPiket>) => {
    setJadwalPiketList(prev =>
      prev.map(item =>
        item.id === id || item.hari === data.hari
          ? {
              ...item,
              ...data,
              guruPiket1: data.koordinator || item.koordinator || item.guruPiket1,
              koordinator: data.koordinator || item.koordinator
            }
          : item
      )
    );
  };

  const deleteJadwalPiket = (id: string) => {
    setJadwalPiketList(prev => prev.filter(item => item.id !== id));
  };

  const addUser = (newUser: any) => {
    setUsers(prev => [newUser, ...prev]);
  };

  const updateUser = (id: string, updatedUser: any) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updatedUser } : u)));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Global Popup Implementation
  const showPopup = (config: PopupConfig) => {
    setPopupConfig(config);
  };

  const closePopup = () => {
    setPopupConfig(null);
  };

  const confirmAction = ({
    title,
    message,
    confirmText,
    cancelText,
    isDanger = false,
    onConfirm
  }: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
    onConfirm: () => void;
  }) => {
    setPopupConfig({
      type: isDanger ? 'delete' : 'confirm',
      title,
      message,
      confirmText: confirmText || (isDanger ? 'Ya, Hapus Data' : 'OK, Lanjutkan'),
      cancelText: cancelText || 'Batal',
      showCancel: true,
      onConfirm
    });
  };

  const alertSuccess = (title: string, message: string) => {
    setPopupConfig({
      type: 'success',
      title,
      message,
      confirmText: 'OK, Selesai',
      showCancel: false
    });
  };

  const alertError = (title: string, message: string) => {
    setPopupConfig({
      type: 'error',
      title,
      message,
      confirmText: 'Tutup',
      showCancel: false
    });
  };

  const alertInfo = (title: string, message: string) => {
    setPopupConfig({
      type: 'info',
      title,
      message,
      confirmText: 'Mengerti',
      showCancel: false
    });
  };

  // Secure Authentication Engine
  const login = (usernameInput: string, passwordInput: string) => {
    const cleanUser = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // Find account by username, email, or role keywords
    const matchedUser = users.find(u => {
      const uName = u.username.toLowerCase();
      const uEmail = u.email.toLowerCase();
      if (uName === cleanUser || uEmail === cleanUser) return true;
      if (cleanUser === 'admin' && (uName === 'ahmad' || u.role === 'Administrator')) return true;
      if (cleanUser === 'kepala' && (uName === 'kepala' || u.role === 'Kepala Madrasah')) return true;
      if (cleanUser === 'piket' && (uName === 'zainal' || u.role === 'Guru Piket')) return true;
      return false;
    });

    if (!matchedUser) {
      return {
        success: false,
        message: 'Username / NIP tidak terdaftar dalam sistem madrasah. Silakan periksa kembali akun Anda.'
      };
    }

    const expectedPassword = matchedUser.password || (
      matchedUser.role === 'Administrator' ? 'admin123' :
      matchedUser.role === 'Kepala Madrasah' ? 'kepala123' :
      'piket123'
    );

    if (cleanPass !== expectedPassword) {
      return {
        success: false,
        message: `Kata sandi (password) salah untuk akun "${matchedUser.namaLengkap}". Pastikan memasukkan kata sandi yang valid.`
      };
    }

    setCurrentUser(matchedUser);
    setIsLoggedIn(true);
    setActiveView('dashboard');
    return {
      success: true,
      message: `Login berhasil! Selamat bertugas di MA PLUS Ma'hadul Muta'allimin.`,
      user: matchedUser
    };
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addSiswaTidakMasuk = (data: any) => {
    setSiswaTidakMasukList(prev => [data, ...prev]);
  };

  const saveMonitoringKBM = (data: Partial<MonitoringKBMRecord> & { kelas: string; jamKe: number }) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMonitoringKBMList(prev => {
      let updated: MonitoringKBMRecord[];
      const existingIdx = prev.findIndex(item => item.kelas === data.kelas && Number(item.jamKe) === Number(data.jamKe));
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          ...data,
          waktuCek: timeStr,
          statusIsi: 'Sudah diisi'
        };
      } else {
        const newItem: MonitoringKBMRecord = {
          id: data.id || `mk-${Date.now()}`,
          jamKe: data.jamKe,
          waktu: data.waktu || '07:00 - 07:45',
          kelas: data.kelas,
          mapel: data.mapel || 'Matematika',
          guruJadwal: data.guruJadwal || 'Ahmad Setiawan, S.Pd',
          guruPengganti: data.guruPengganti,
          statusGuru: data.statusGuru || 'Hadir Tepat Waktu',
          kondisiPembelajaran: data.kondisiPembelajaran || 'Berlangsung dengan baik',
          kondisiSiswa: data.kondisiSiswa || 'Tertib',
          catatan: data.catatan || '',
          waktuCek: timeStr,
          statusIsi: 'Sudah diisi',
          notifikasiPeringatanTerkirim: data.notifikasiPeringatanTerkirim,
          waktuKirimPeringatan: data.waktuKirimPeringatan,
          pesanPeringatan: data.pesanPeringatan,
          menitTerlambat: data.menitTerlambat
        };
        updated = [newItem, ...prev];
      }

      try {
        localStorage.setItem('maplus_monitoring_kbm', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const confirmTeacherKBMArrival = (recordId: string, payload: {
    fotoBuktiKelas: string;
    catatan?: string;
    waktuKonfirmasiHadir?: string;
    menitTerlambat?: number;
    kelas?: string;
    jamKe?: number;
    guruNama?: string;
    mapel?: string;
  }) => {
    const now = new Date();
    const timeStr = payload.waktuKonfirmasiHadir || `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const minutesLate = payload.menitTerlambat ?? 15;

    setMonitoringKBMList(prev => {
      let found = false;
      const updated = prev.map(rec => {
        const isMatch =
          rec.id === recordId ||
          (payload.kelas && rec.kelas === payload.kelas && payload.jamKe && Number(rec.jamKe) === Number(payload.jamKe));

        if (isMatch) {
          found = true;
          return {
            ...rec,
            dikonfirmasiGuru: true,
            waktuKonfirmasiHadir: timeStr,
            menitTerlambat: minutesLate,
            fotoBuktiKelas: payload.fotoBuktiKelas,
            catatanKonfirmasiGuru: payload.catatan,
            statusGuru: `Hadir Terlambat (${minutesLate} Menit) - Terverifikasi Foto`,
            statusIsi: 'Sudah diisi' as const
          };
        }
        return rec;
      });

      let finalResult = updated;
      if (!found && payload.kelas) {
        const newRecord: MonitoringKBMRecord = {
          id: recordId || `mk-${Date.now()}`,
          jamKe: payload.jamKe || 1,
          waktu: '07:00 - 07:45',
          kelas: payload.kelas,
          mapel: payload.mapel || 'Mata Pelajaran',
          guruJadwal: payload.guruNama || 'Guru Pengajar',
          statusGuru: `Hadir Terlambat (${minutesLate} Menit) - Terverifikasi Foto`,
          statusIsi: 'Sudah diisi' as const,
          kondisiPembelajaran: 'Berlangsung dengan baik',
          kondisiSiswa: 'Tertib',
          catatan: payload.catatan || 'Dikonfirmasi mandiri oleh guru dengan bukti foto',
          waktuCek: timeStr,
          dikonfirmasiGuru: true,
          waktuKonfirmasiHadir: timeStr,
          fotoBuktiKelas: payload.fotoBuktiKelas,
          catatanKonfirmasiGuru: payload.catatan,
          menitTerlambat: minutesLate
        };
        finalResult = [newRecord, ...updated];
      }

      try {
        localStorage.setItem('maplus_monitoring_kbm', JSON.stringify(finalResult));
      } catch {}

      return finalResult;
    });
  };

  const updateKendalaStatus = (id: string, status: any, tindakLanjut?: string) => {
    setKendalaList(prev =>
      prev.map(k => (k.id === id ? { ...k, status, tindakLanjutNote: tindakLanjut } : k))
    );
  };

  const updateLaporanStatus = (id: string, status: any, catatan?: string) => {
    setLaporanPiketList(prev =>
      prev.map(l => (l.id === id ? { ...l, status, catatanKepala: catatan } : l))
    );
  };

  const addPengumuman = (p: any) => {
    const item: PengumumanData = {
      id: p.id || `p-${Date.now()}`,
      no: pengumumanList.length + 1,
      tanggalTerbit: p.tanggal || '04 Sep 2026',
      judul: p.judul,
      isi: p.isi,
      targetPenerima: [p.target || 'Semua'],
      status: 'Terkirim',
      terkirimCount: 42,
      dibacaCount: 38,
      dibacaPersen: 90,
      kirimWa: true
    };
    setPengumumanList(prev => [item, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        isLoggedIn,
        setIsLoggedIn,
        activeView,
        setActiveView,
        activeTabSub,
        setActiveTabSub,
        isPublicReportOpen,
        setIsPublicReportOpen,
        gurus,
        guruList: gurus,
        setGurus,
        siswas,
        siswaList: siswas,
        setSiswas,
        userList: users,
        kelasList,
        setKelasList,
        mapelList,
        setMapelList,
        ruangList,
        setRuangList,
        jadwalKBMList,
        setJadwalKBMList,
        jadwalPiketList,
        jadwalGuruPiketList: jadwalPiketList,
        setJadwalPiketList,
        guruTidakMasukList,
        setGuruTidakMasukList,
        monitoringKBMList,
        setMonitoringKBMList,
        siswaTidakMasukList,
        setSiswaTidakMasukList,
        siswaTerlambatList,
        setSiswaTerlambatList,
        izinKeluarList,
        setIzinKeluarList,
        tugasKhususList,
        setTugasKhususList,
        pelanggaranList,
        setPelanggaranList,
        kendalaList,
        setKendalaList,
        laporanPiketList,
        laporanList: laporanPiketList,
        setLaporanPiketList,
        pengumumanList,
        setPengumumanList,
        madrasahInfo,
        setMadrasahInfo,
        switchRole,
        assignSubstituteTeacher,
        markSiswaReturned,
        markTugasKhususReturned,
        addKendala,
        addPelanggaran,
        addIzinKeluar,
        addGuruTidakMasuk,
        submitPiketReportToKepala,
        verifyPiketReportByKepala: (reportId: string, status: 'Diterima' | 'Ditolak', catatan: string) => {
          setLaporanPiketList(prev => prev.map(rep => {
            if (rep.id === reportId) {
              return {
                ...rep,
                status,
                catatanKepala: catatan,
                tanggalVerifikasi: '4 Sep 2026 14:15',
                tandaTanganKepala: status === 'Diterima'
              };
            }
            return rep;
          }));
        },
        addGuru,
        updateGuru,
        deleteGuru,
        addSiswa,
        updateSiswa,
        deleteSiswa,
        addKelas,
        updateKelas,
        deleteKelas,
        addMapel,
        updateMapel,
        deleteMapel,
        addRuang,
        updateRuang,
        deleteRuang,
        addJadwalKBM,
        updateJadwalKBM,
        deleteJadwalKBM,
        addJadwalPiket,
        updateJadwalPiket,
        deleteJadwalPiket,
        addUser,
        updateUser,
        deleteUser,
        addSiswaTidakMasuk,
        saveMonitoringKBM,
        confirmTeacherKBMArrival,
        updateKendalaStatus,
        updateLaporanStatus,
        addPengumuman,
        popupConfig,
        showPopup,
        closePopup,
        confirmAction,
        alertSuccess,
        alertError,
        alertInfo,
        login,
        logout
      }}
    >
      {children}
      <GlobalModalPopup config={popupConfig} onClose={closePopup} />
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
