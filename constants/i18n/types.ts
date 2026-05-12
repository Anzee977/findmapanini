export type LangCode = 'en' | 'fr' | 'nl' | 'es' | 'de' | 'it' | 'pt';

export interface T {
  // Tabs
  tabHome: string; tabAlbum: string; tabScan: string; tabList: string;
  // Home
  homeSubtitle: string;
  homeScan: string; homeScanSub: string;
  homeAlbum: string; homeAlbumSub: string;
  homeWishlist: string; homeWishlistSub: string;
  homeDupes: string; homeDupesSub: string;
  homeRecent: string; homeScanBtn: string; homeStickersLabel: string;
  // Teams
  teamsTitle: string; teamsSearch: string;
  teamsSpecialBanner: string; teamsSpecialSub: string;
  unitTeams: string;
  // Filters (album + special)
  filterAll: string; filterMissing: string; filterDupes: string; filterWishlist: string;
  // Scan
  scanCamera: string; scanPhoto: string; scanNumber: string; scanPlayer: string;
  scanHintFree: string; scanHintApi: string; scanHintNone: string;
  scanGalleryTitle: string; scanGallerySub: string;
  scanGalleryBtn: string; scanGalleryLoading: string;
  scanGalleryFreeNote: string; scanGalleryNoneNote: string;
  scanPlayerTitle: string; scanPlayerPlaceholder: string;
  scanPlayerEmpty: string; scanPlayerMin: string;
  scanManualTitle: string;
  scanTeamCode: string; scanTeamPlaceholder: string;
  scanStickerNum: string; scanStickerPlaceholder: string;
  scanIdentify: string; scanAnalyzing: string;
  scanPermTitle: string; scanPermSub: string; scanPermBtn: string;
  // Scan result
  resultTitle: string; resultSummary: string; result3d: string;
  resultStick: string; resultAddDupe: string; resultNewScan: string;
  resultAlready: string; resultNotFound: string; resultBack: string;
  result3dSub: string;
  // Wishlist
  wishlistTitle: string; wishlistEmpty: string; wishlistEmptySub: string;
  dupesEmpty: string; dupesEmptySub: string;
  // Special
  specialTitle: string; specialSub: string; specialNotFound: string;
  // Common
  commonNotFound: string;
  // Language selector
  langTitle: string;
}

export interface Language {
  code: LangCode;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English',    flag: '🇬🇧' },
  { code: 'fr', name: 'Français',   flag: '🇫🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'es', name: 'Español',    flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch',    flag: '🇩🇪' },
  { code: 'it', name: 'Italiano',   flag: '🇮🇹' },
  { code: 'pt', name: 'Português',  flag: '🇵🇹' },
];
