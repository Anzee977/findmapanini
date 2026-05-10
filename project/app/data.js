// FindMyPanini — France 2026 squad mock
// 20 cards for "FRA" team: 1 badge, 1 team photo, 18 players
// Position colors used for sticker borders/accents

window.FMP_DATA = (function () {
  const FRANCE = {
    code: "FRA",
    name: "France",
    nick: "Les Bleus",
    flag: ["#0055A4", "#FFFFFF", "#EF4135"],
    pageStart: 86, // album page where team starts
    cards: [
      // n=card slot in album (matches sticker number FRA1..FRA20)
      { n: 1,  type: "badge",  title: "Écusson",        sub: "FFF",        kit: "primary" },
      { n: 2,  type: "team",   title: "Équipe France",  sub: "Team photo", kit: "primary" },
      { n: 3,  type: "player", role: "GK",  name: "Mike Maignan",       num: 16, age: 30, caps: 31 },
      { n: 4,  type: "player", role: "GK",  name: "Brice Samba",        num: 23, age: 32, caps: 5  },
      { n: 5,  type: "player", role: "DF",  name: "Jules Koundé",       num: 5,  age: 27, caps: 39 },
      { n: 6,  type: "player", role: "DF",  name: "William Saliba",     num: 17, age: 25, caps: 22 },
      { n: 7,  type: "player", role: "DF",  name: "Dayot Upamecano",    num: 4,  age: 27, caps: 27 },
      { n: 8,  type: "player", role: "DF",  name: "Ibrahima Konaté",    num: 14, age: 27, caps: 18 },
      { n: 9,  type: "player", role: "DF",  name: "Theo Hernandez",     num: 22, age: 28, caps: 36 },
      { n: 10, type: "player", role: "DF",  name: "Lucas Hernandez",    num: 21, age: 30, caps: 39 },
      { n: 11, type: "player", role: "DF",  name: "Benjamin Pavard",    num: 2,  age: 30, caps: 53 },
      { n: 12, type: "player", role: "MF",  name: "Aurélien Tchouaméni",num: 8,  age: 26, caps: 36 },
      { n: 13, type: "player", role: "MF",  name: "Eduardo Camavinga",  num: 6,  age: 23, caps: 25 },
      { n: 14, type: "player", role: "MF",  name: "Adrien Rabiot",      num: 12, age: 31, caps: 53 },
      { n: 15, type: "player", role: "MF",  name: "Antoine Griezmann",  num: 7,  age: 35, caps: 137},
      { n: 16, type: "player", role: "MF",  name: "Youssouf Fofana",    num: 13, age: 27, caps: 14 },
      { n: 17, type: "player", role: "FW",  name: "Kylian Mbappé",      num: 10, age: 27, caps: 88, captain: true, star: true },
      { n: 18, type: "player", role: "FW",  name: "Ousmane Dembélé",    num: 11, age: 29, caps: 56 },
      { n: 19, type: "player", role: "FW",  name: "Marcus Thuram",      num: 15, age: 28, caps: 22 },
      { n: 20, type: "player", role: "FW",  name: "Randal Kolo Muani",  num: 9,  age: 27, caps: 31 },
    ]
  };

  const ROLE_COLOR = {
    GK: "#FBC531",
    DF: "#2D6BFF",
    MF: "#0F5132",
    FW: "#FF3D2E",
  };

  // Default ownership state for the album mock — feel realistic, ~55% complete
  const OWNED = new Set([1, 2, 3, 5, 6, 9, 11, 12, 14, 17, 18, 20, 16]);
  // Cards we have multiples of (doublons)
  const DUPES = { 5: 2, 12: 3, 17: 2 };
  // Wishlist
  const WISH  = new Set([10, 15, 19]);

  const TEAMS = [
    { code: "ARG", name: "Argentine",  flag: ["#75AADB","#FFFFFF","#75AADB"], owned: 14, total: 20 },
    { code: "BRA", name: "Brésil",      flag: ["#FEDF00","#009C3B","#002776"], owned: 9,  total: 20 },
    { code: "FRA", name: "France",      flag: ["#0055A4","#FFFFFF","#EF4135"], owned: 13, total: 20 },
    { code: "ESP", name: "Espagne",     flag: ["#AA151B","#F1BF00","#AA151B"], owned: 6,  total: 20 },
    { code: "ENG", name: "Angleterre",  flag: ["#FFFFFF","#CF142B","#FFFFFF"], owned: 4,  total: 20 },
    { code: "GER", name: "Allemagne",   flag: ["#000000","#DD0000","#FFCC00"], owned: 11, total: 20 },
    { code: "POR", name: "Portugal",    flag: ["#006600","#FF0000","#FFCC00"], owned: 8,  total: 20 },
    { code: "NED", name: "Pays-Bas",    flag: ["#AE1C28","#FFFFFF","#21468B"], owned: 2,  total: 20 },
    { code: "BEL", name: "Belgique",    flag: ["#000000","#FAE042","#ED2939"], owned: 7,  total: 20 },
    { code: "USA", name: "États-Unis",  flag: ["#3C3B6E","#FFFFFF","#B22234"], owned: 17, total: 20 },
    { code: "MEX", name: "Mexique",     flag: ["#006847","#FFFFFF","#CE1126"], owned: 12, total: 20 },
    { code: "CAN", name: "Canada",      flag: ["#D52B1E","#FFFFFF","#D52B1E"], owned: 3,  total: 20 },
  ];

  const TOTAL_CARDS = 720; // realistic 2026 album size
  const TOTAL_OWNED = 312; // ~43%

  return { FRANCE, ROLE_COLOR, OWNED, DUPES, WISH, TEAMS, TOTAL_CARDS, TOTAL_OWNED };
})();
