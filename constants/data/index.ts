export type Position = 'GK' | 'DEF' | 'MF' | 'FW';

export interface Player {
  n: number;
  name: string;
  pos: Position;
  club?: string;
}

export interface Team {
  code: string;
  name: string;
  flag: string;
  colors: [string, string, string];
  group?: string;
  players: Player[];
}

const squad = (
  gk: [string, string?][],
  def: [string, string?][],
  mf: [string, string?][],
  fw: [string, string?][]
): Player[] => {
  const players: Player[] = [];
  let n = 1;
  gk.forEach(([name, club]) => players.push({ n: n++, name, pos: 'GK', ...(club ? { club } : {}) }));
  def.forEach(([name, club]) => players.push({ n: n++, name, pos: 'DEF', ...(club ? { club } : {}) }));
  mf.forEach(([name, club]) => players.push({ n: n++, name, pos: 'MF', ...(club ? { club } : {}) }));
  fw.forEach(([name, club]) => players.push({ n: n++, name, pos: 'FW', ...(club ? { club } : {}) }));
  return players;
};

export const ALL_TEAMS: Team[] = [
  // ── HOSTS ─────────────────────────────────────────────────────────────────
  {
    code: 'USA',
    name: 'États-Unis',
    flag: '🇺🇸',
    colors: ['#B22234', '#FFFFFF', '#3C3B6E'],
    players: squad(
      [['Matt Turner', 'Crystal Palace'], ['Zack Steffen', 'Colorado Rapids']],
      [['Sergino Dest', 'PSV'], ['Miles Robinson', 'FC Cincinnati'], ['Tim Ream', 'Charlotte FC'], ['Mark McKenzie', 'Genk'], ['Antonee Robinson', 'Fulham'], ['Joe Scally', 'Gladbach']],
      [['Tyler Adams', 'Bournemouth'], ['Weston McKennie', 'Juventus'], ['Yunus Musah', 'AC Milan'], ['Gio Reyna', 'Nottm Forest'], ['Luca de la Torre', 'Celta Vigo'], ['Malik Tillman', 'PSV']],
      [['Christian Pulisic', 'AC Milan'], ['Ricardo Pepi', 'PSV'], ['Josh Sargent', 'Norwich'], ['Brandon Vazquez', 'Monterrey'], ['Folarin Balogun', 'Monaco'], ['Caden Clark', 'RB Leipzig']]
    ),
  },
  {
    code: 'CAN',
    name: 'Canada',
    flag: '🇨🇦',
    colors: ['#FF0000', '#FFFFFF', '#FF0000'],
    players: squad(
      [['Maxime Crépeau', 'LA Galaxy'], ['James Pantemis', 'CF Montréal']],
      [['Alistair Johnston', 'Celtic'], ['Kamal Miller', 'Portland'], ['Derek Cornelius', 'FC Nantes'], ['Doneil Henry', 'Vancouver'], ['Richie Laryea', 'Nottm Forest'], ['Alphonso Davies', 'Bayern Munich']],
      [['Jonathan Osorio', 'Toronto FC'], ['Stephen Eustáquio', 'Porto'], ['Tajon Buchanan', 'Club Brugge'], ['Mark-Anthony Kaye', 'Toronto FC'], ['Liam Millar', 'FC Basel'], ['Samuel Piette', 'CF Montréal']],
      [['Cyle Larin', 'Mallorca'], ['Jonathan David', 'LOSC Lille'], ['Lucas Cavallini', 'Vancouver'], ['Junior Hoilett', 'MLS'], ['Theo Bair', 'Motherwell*'], ['Theo Corbeanu', 'Sheffield Wed']]
    ),
  },
  {
    code: 'MEX',
    name: 'Mexique',
    flag: '🇲🇽',
    colors: ['#006847', '#FFFFFF', '#CE1126'],
    players: squad(
      [['Guillermo Ochoa', 'America'], ['Luis Malagón', 'America']],
      [['Jorge Sánchez', 'Ajax'], ['César Montes', 'Monterrey'], ['Johan Vásquez', 'Genoa'], ['Gerardo Arteaga', 'Genk'], ['Jesús Gallardo', 'Monterrey'], ['Kevin Álvarez', 'Club America']],
      [['Héctor Herrera', 'LA Galaxy'], ['Edson Álvarez', 'West Ham'], ['Orbelín Pineda', 'AEK Athens'], ['Carlos Rodríguez', 'Cruz Azul'], ['Luis Romo', 'Monterrey'], ['Roberto Alvarado', 'Chivas']],
      [['Hirving Lozano', 'PSV'], ['Raúl Jiménez', 'Fulham'], ['Henry Martín', 'America'], ['Santiago Giménez', 'Feyenoord'], ['Alexis Vega', 'Chivas'], ['Uriel Antuna', 'Cruz Azul']]
    ),
  },
  // ── CONMEBOL ─────────────────────────────────────────────────────────────
  {
    code: 'ARG',
    name: 'Argentine',
    flag: '🇦🇷',
    colors: ['#74ACDF', '#FFFFFF', '#74ACDF'],
    players: squad(
      [['Emiliano Martínez', 'Aston Villa'], ['Franco Armani', 'River Plate']],
      [['Nicolás Otamendi', 'Benfica'], ['Cristian Romero', 'Tottenham'], ['Lisandro Martínez', 'Man United'], ['Nahuel Molina', 'Atlético Madrid'], ['Marcos Acuña', 'Sevilla'], ['Nicolás Tagliafico', 'Lyon']],
      [['Rodrigo De Paul', 'Atlético Madrid'], ['Leandro Paredes', 'Roma'], ['Enzo Fernández', 'Chelsea'], ['Alexis Mac Allister', 'Liverpool'], ['Giovani Lo Celso', 'Tottenham'], ['Guido Rodríguez', 'Betis']],
      [['Lionel Messi', 'Inter Miami'], ['Julián Álvarez', 'Atlético Madrid'], ['Lautaro Martínez', 'Inter Milan'], ['Angel Di María', 'Benfica'], ['Nicolás González', 'Juventus'], ['Paulo Dybala', 'Roma']]
    ),
  },
  {
    code: 'BRA',
    name: 'Brésil',
    flag: '🇧🇷',
    colors: ['#009C3B', '#FFDF00', '#002776'],
    players: squad(
      [['Alisson', 'Liverpool'], ['Ederson', 'Man City']],
      [['Danilo', 'Juventus'], ['Marquinhos', 'PSG'], ['Éder Militão', 'Real Madrid'], ['Gabriel Magalhães', 'Arsenal'], ['Wendell', 'Porto'], ['Alex Telles', 'Sevilla']],
      [['Casemiro', 'Man United'], ['Bruno Guimarães', 'Newcastle'], ['Lucas Paquetá', 'West Ham'], ['Gerson', 'Marseille'], ['Fabinho', 'Al-Ittihad'], ['Fred', 'Man United']],
      [['Vinicius Jr', 'Real Madrid'], ['Neymar', 'Al-Hilal'], ['Rodrygo', 'Real Madrid'], ['Raphinha', 'Barcelona'], ['Gabriel Jesus', 'Arsenal'], ['Richarlison', 'Tottenham']]
    ),
  },
  {
    code: 'URU',
    name: 'Uruguay',
    flag: '🇺🇾',
    colors: ['#75AADB', '#FFFFFF', '#75AADB'],
    players: squad(
      [['Sergio Rochet', 'Nacional'], ['Sebastian Sosa', 'Independiente']],
      [['Ronald Araújo', 'Barcelona'], ['José María Giménez', 'Atlético Madrid'], ['Sebastián Coates', 'Sporting CP'], ['Martín Cáceres', 'América'], ['Matías Viña', 'Sassuolo'], ['Nahitan Nández', 'Cagliari']],
      [['Lucas Torreira', 'Galatasaray'], ['Rodrigo Bentancur', 'Tottenham'], ['Nicolás De La Cruz', 'River Plate'], ['Matías Vecino', 'Lazio'], ['Federico Valverde', 'Real Madrid'], ['Manuel Ugarte', 'PSG']],
      [['Darwin Núñez', 'Liverpool'], ['Luis Suárez', 'Inter Miami'], ['Edinson Cavani', 'Boca Juniors'], ['Facundo Torres', 'Orlando City'], ['Maxi Gómez', 'Trabzonspor'], ['Brian Rodríguez', 'America']]
    ),
  },
  {
    code: 'COL',
    name: 'Colombie',
    flag: '🇨🇴',
    colors: ['#FCD116', '#003087', '#CE1126'],
    players: squad(
      [['David Ospina', 'Al-Qadsiah'], ['Camilo Vargas', 'Atlas']],
      [['Dávinson Sánchez', 'Galatasaray'], ['Yerry Mina', 'Valencia'], ['Stefan Medina', 'Monterrey'], ['William Tesillo', 'León'], ['Jorge Carrascal', 'Dynamo Moscow'], ['Daniel Muñoz', 'Crystal Palace']],
      [['James Rodríguez', 'Rayo Vallecano'], ['Mateus Uribe', 'Porto'], ['Wilmar Barrios', 'Zenit'], ['Juan Cuadrado', 'Inter Milan'], ['Gustavo Puerta', 'Bayer Leverkusen'], ['Richard Ríos', 'Palmeiras']],
      [['Luis Díaz', 'Liverpool'], ['Falcao', 'Rayo Vallecano'], ['Rafael Santos Borré', 'Eintracht'], ['Jhon Durán', 'Aston Villa'], ['Cucho Hernández', 'Columbus'], ['Jorman Campuzano', 'Boca']]
    ),
  },
  {
    code: 'ECU',
    name: 'Équateur',
    flag: '🇪🇨',
    colors: ['#FFD100', '#034EA2', '#EF3340'],
    players: squad(
      [['Hernán Galíndez', 'Aucas'], ['Alexander Domínguez', 'LDU Quito']],
      [['Byron Castillo', 'Liga de Quito'], ['Félix Torres', 'Santos Laguna'], ['Piero Hincapié', 'Bayer Leverkusen'], ['Diego Palacios', 'Portland'], ['Robert Arboleda', 'São Paulo'], ['Xavier Arreaga', 'Seattle']],
      [['Carlos Gruezo', 'Augsburg'], ['Moisés Caicedo', 'Chelsea'], ['Jeremy Sarmiento', 'Brighton'], ['Ángelo Preciado', 'Genk'], ['Jhegson Méndez', 'LA Galaxy'], ['Jordy Caicedo', 'Pachuca']],
      [['Enner Valencia', 'Fenerbahçe'], ['Michael Estrada', 'Cruz Azul'], ['Pervis Estupiñán', 'Brighton'], ['Leonardo Campana', 'Inter Miami'], ['Kevin Rodríguez', 'Ipswich'], ['Gonzalo Plata', 'Valladolid']]
    ),
  },
  {
    code: 'VEN',
    name: 'Venezuela',
    flag: '🇻🇪',
    colors: ['#CC0001', '#CF9C00', '#00247D'],
    players: squad(
      [['Wuilker Faríñez', 'Millonarios'], ['Rafael Romo', 'Guadalajara']],
      [['Alexander González', 'Al-Adalah*'], ['Jhon Chancellor', 'Metalist'], ['Rolf Feltscher', 'Los Angeles FC'], ['Miguel Navarro', 'Granada'], ['Mikel Villanueva', 'Caracas'], ['Jon Aramburu', 'Real Sociedad']],
      [['Yangel Herrera', 'Girona'], ['Tomás Rincón', 'Torino'], ['Yeferson Soteldo', 'Tigres'], ['Júnior Moreno', 'Detroit City'], ['Sergio Córdova', 'Mallorca'], ['Eduard Bello', 'Pachuca']],
      [['Darwin Machís', 'Granada'], ['Salomón Rondón', 'LA FC'], ['Josef Martínez', 'NYCFC'], ['Adalberto Peñaranda', 'Almería*'], ['Fernando Aristeguieta', 'OFI Crete*'], ['Eric Ramírez', 'Anderlecht']]
    ),
  },
  // ── UEFA ──────────────────────────────────────────────────────────────────
  {
    code: 'FRA',
    name: 'France',
    flag: '🇫🇷',
    colors: ['#002395', '#FFFFFF', '#ED2939'],
    players: squad(
      [['Mike Maignan', 'AC Milan'], ['Alphonse Areola', 'West Ham']],
      [['Benjamin Pavard', 'Inter Milan'], ['Raphaël Varane', 'Como'], ['William Saliba', 'Arsenal'], ['Dayot Upamecano', 'Bayern Munich'], ['Theo Hernandez', 'AC Milan'], ['Lucas Hernandez', 'PSG']],
      [['N\'Golo Kanté', 'Al-Ittihad'], ['Aurélien Tchouaméni', 'Real Madrid'], ['Adrien Rabiot', 'Marseille'], ['Antoine Griezmann', 'Atlético Madrid'], ['Eduardo Camavinga', 'Real Madrid'], ['Warren Zaïre-Emery', 'PSG']],
      [['Kylian Mbappé', 'Real Madrid'], ['Ousmane Dembélé', 'PSG'], ['Marcus Thuram', 'Inter Milan'], ['Randal Kolo Muani', 'PSG'], ['Kingsley Coman', 'Bayern Munich'], ['Bradley Barcola', 'PSG']]
    ),
  },
  {
    code: 'ENG',
    name: 'Angleterre',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    colors: ['#FFFFFF', '#CF1010', '#FFFFFF'],
    players: squad(
      [['Jordan Pickford', 'Everton'], ['Dean Henderson', 'Crystal Palace']],
      [['Kyle Walker', 'Man City'], ['John Stones', 'Man City'], ['Harry Maguire', 'Man United'], ['Marc Guehi', 'Crystal Palace'], ['Luke Shaw', 'Man United'], ['Kieran Trippier', 'Newcastle']],
      [['Declan Rice', 'Arsenal'], ['Jude Bellingham', 'Real Madrid'], ['Phil Foden', 'Man City'], ['Conor Gallagher', 'Atlético Madrid'], ['Kobbie Mainoo', 'Man United'], ['Trent Alexander-Arnold', 'Liverpool']],
      [['Harry Kane', 'Bayern Munich'], ['Bukayo Saka', 'Arsenal'], ['Marcus Rashford', 'Man United'], ['Ollie Watkins', 'Aston Villa'], ['Cole Palmer', 'Chelsea'], ['Anthony Gordon', 'Newcastle']]
    ),
  },
  {
    code: 'GER',
    name: 'Allemagne',
    flag: '🇩🇪',
    colors: ['#000000', '#DD0000', '#FFCE00'],
    players: squad(
      [['Manuel Neuer', 'Bayern Munich'], ['Marc-André ter Stegen', 'Barcelona']],
      [['Joshua Kimmich', 'Bayern Munich'], ['Antonio Rüdiger', 'Real Madrid'], ['Nico Schlotterbeck', 'Dortmund'], ['Jonathan Tah', 'Bayer Leverkusen'], ['David Raum', 'Leipzig'], ['Benjamin Henrichs', 'Leipzig']],
      [['Toni Kroos', 'Real Madrid'], ['İlkay Gündoğan', 'Barcelona'], ['Leon Goretzka', 'Bayern Munich'], ['Robert Andrich', 'Bayer Leverkusen'], ['Florian Wirtz', 'Bayer Leverkusen'], ['Jamal Musiala', 'Bayern Munich']],
      [['Kai Havertz', 'Arsenal'], ['Leroy Sané', 'Bayern Munich'], ['Thomas Müller', 'Bayern Munich'], ['Serge Gnabry', 'Bayern Munich'], ['Niclas Füllkrug', 'West Ham'], ['Chris Führich', 'Stuttgart']]
    ),
  },
  {
    code: 'ESP',
    name: 'Espagne',
    flag: '🇪🇸',
    colors: ['#AA151B', '#F1BF00', '#AA151B'],
    players: squad(
      [['David Raya', 'Arsenal'], ['Unai Simón', 'Athletic Bilbao']],
      [['Dani Carvajal', 'Real Madrid'], ['Aymeric Laporte', 'Al-Nassr'], ['Robin Le Normand', 'Atlético Madrid'], ['Nacho Fernández', 'Real Madrid'], ['Alejandro Grimaldo', 'Bayer Leverkusen'], ['Marc Cucurella', 'Chelsea']],
      [['Rodri', 'Man City'], ['Pedri', 'Barcelona'], ['Gavi', 'Barcelona'], ['Fabián Ruiz', 'PSG'], ['Mikel Merino', 'Arsenal'], ['Dani Olmo', 'Barcelona']],
      [['Álvaro Morata', 'AC Milan'], ['Ferran Torres', 'Barcelona'], ['Nico Williams', 'Athletic Bilbao'], ['Lamine Yamal', 'Barcelona'], ['Joselu', 'Al-Qadsiah'], ['Bryan Gil', 'Girona']]
    ),
  },
  {
    code: 'POR',
    name: 'Portugal',
    flag: '🇵🇹',
    colors: ['#006600', '#FF0000', '#006600'],
    players: squad(
      [['Rui Patrício', 'AS Roma'], ['Diogo Costa', 'Porto']],
      [['João Cancelo', 'Barcelona'], ['Pepe', 'Porto'], ['Rúben Dias', 'Man City'], ['Danilo Pereira', 'PSG'], ['Nuno Mendes', 'PSG'], ['Raphaël Guerreiro', 'Bayern Munich']],
      [['Bruno Fernandes', 'Man United'], ['João Palhinha', 'Bayern Munich'], ['Vitinha', 'PSG'], ['Bernardo Silva', 'Man City'], ['Rúben Neves', 'Al-Hilal'], ['João Neves', 'Benfica']],
      [['Cristiano Ronaldo', 'Al-Nassr'], ['Rafael Leão', 'AC Milan'], ['Diogo Jota', 'Liverpool'], ['Gonçalo Ramos', 'PSG'], ['Rafa Silva', 'Benfica'], ['Pedro Neto', 'Chelsea']]
    ),
  },
  {
    code: 'NED',
    name: 'Pays-Bas',
    flag: '🇳🇱',
    colors: ['#FF6600', '#FFFFFF', '#FF6600'],
    players: squad(
      [['Bart Verbruggen', 'Brighton'], ['Mark Flekken', 'Brentford']],
      [['Denzel Dumfries', 'Inter Milan'], ['Virgil van Dijk', 'Liverpool'], ['Stefan de Vrij', 'Inter Milan'], ['Nathan Aké', 'Man City'], ['Daley Blind', 'Girona'], ['Matthijs de Ligt', 'Man United']],
      [['Frenkie de Jong', 'Barcelona'], ['Ryan Gravenberch', 'Liverpool'], ['Tijjani Reijnders', 'AC Milan'], ['Teun Koopmeiners', 'Juventus'], ['Marten de Roon', 'Atalanta'], ['Georginio Wijnaldum', 'Roma']],
      [['Memphis Depay', 'Atlético Madrid'], ['Cody Gakpo', 'Liverpool'], ['Donyell Malen', 'Dortmund'], ['Steven Bergwijn', 'Ajax'], ['Wout Weghorst', 'Hoffenheim'], ['Xavi Simons', 'PSG']]
    ),
  },
  {
    code: 'BEL',
    name: 'Belgique',
    flag: '🇧🇪',
    colors: ['#000000', '#FFD90C', '#F31830'],
    players: squad(
      [['Thibaut Courtois', 'Real Madrid'], ['Simon Mignolet', 'Club Brugge']],
      [['Toby Alderweireld', 'Royal Antwerp'], ['Jan Vertonghen', 'Anderlecht'], ['Wout Faes', 'Leicester'], ['Timothy Castagne', 'Leicester'], ['Yannick Carrasco', 'Al-Qadsiah'], ['Thomas Meunier', 'Trabzonspor']],
      [['Kevin De Bruyne', 'Man City'], ['Axel Witsel', 'Atlético Madrid'], ['Youri Tielemans', 'Aston Villa'], ['Amadou Onana', 'Aston Villa'], ['Leandro Trossard', 'Arsenal'], ['Charles De Ketelaere', 'Atalanta']],
      [['Romelu Lukaku', 'Roma'], ['Eden Hazard', 'Retiré'], ['Michy Batshuayi', 'Fenerbahçe'], ['Lois Openda', 'Leipzig'], ['Johan Bakayoko', 'PSV'], ['Dodi Lukebakio', 'Sevilla']]
    ),
  },
  {
    code: 'ITA',
    name: 'Italie',
    flag: '🇮🇹',
    colors: ['#009246', '#FFFFFF', '#CE2B37'],
    players: squad(
      [['Gianluigi Donnarumma', 'PSG'], ['Alex Meret', 'Napoli']],
      [['Giovanni Di Lorenzo', 'Napoli'], ['Alessandro Bastoni', 'Inter Milan'], ['Francesco Acerbi', 'Inter Milan'], ['Giorgio Scalvini', 'Atalanta'], ['Leonardo Spinazzola', 'Roma'], ['Federico Dimarco', 'Inter Milan']],
      [['Jorginho', 'Arsenal'], ['Marco Verratti', 'Al-Arabi'], ['Nicolò Barella', 'Inter Milan'], ['Manuel Locatelli', 'Juventus'], ['Sandro Tonali', 'Newcastle'], ['Lorenzo Pellegrini', 'Roma']],
      [['Federico Chiesa', 'Liverpool'], ['Ciro Immobile', 'Besiktas'], ['Giacomo Raspadori', 'Napoli'], ['Matteo Retegui', 'Atalanta'], ['Moise Kean', 'Juventus'], ['Lorenzo Lucca', 'Udinese']]
    ),
  },
  {
    code: 'CRO',
    name: 'Croatie',
    flag: '🇭🇷',
    colors: ['#FF0000', '#FFFFFF', '#0000FF'],
    players: squad(
      [['Dominik Livaković', 'Fenerbahçe'], ['Ivica Ivušić', 'Osijek']],
      [['Josip Juranović', 'Union Berlin'], ['Dejan Lovren', 'Zenit'], ['Duje Ćaleta-Car', 'Southampton'], ['Joško Gvardiol', 'Man City'], ['Borna Sosa', 'Ajax'], ['Josip Stanišić', 'Bayer Leverkusen']],
      [['Luka Modrić', 'Al-Qadsiah'], ['Mateo Kovačić', 'Man City'], ['Marcelo Brozović', 'Al-Nassr'], ['Mario Pašalić', 'Atalanta'], ['Lovro Majer', 'Wolfsburg'], ['Nikola Vlašić', 'Torino']],
      [['Ivan Perišić', 'Hajduk Split'], ['Andrej Kramarić', 'Hoffenheim'], ['Bruno Petković', 'Dinamo Zagreb'], ['Marko Livaja', 'Hajduk Split'], ['Luka Ivanušec', 'Dinamo Zagreb'], ['Antonio Budimir', 'Osasuna']]
    ),
  },
  {
    code: 'SUI',
    name: 'Suisse',
    flag: '🇨🇭',
    colors: ['#FF0000', '#FFFFFF', '#FF0000'],
    players: squad(
      [['Yann Sommer', 'Inter Milan'], ['Gregor Kobel', 'Dortmund']],
      [['Silvan Widmer', 'Mainz'], ['Nico Elvedi', 'Gladbach'], ['Fabian Schär', 'Newcastle'], ['Manuel Akanji', 'Man City'], ['Ricardo Rodríguez', 'Torino'], ['Edimilson Fernandes', 'Mainz']],
      [['Granit Xhaka', 'Bayer Leverkusen'], ['Denis Zakaria', 'Monaco'], ['Rémy Benali', 'Nuremberg'], ['Remo Freuler', 'Nottm Forest'], ['Xherdan Shaqiri', 'Chicago Fire'], ['Michel Aebischer', 'Bologna']],
      [['Haris Seferović', 'Galatasaray'], ['Breel Embolo', 'Monaco'], ['Ruben Vargas', 'Augsburg'], ['Noah Okafor', 'AC Milan'], ['Zeki Amdouni', 'Burnley'], ['Dan Ndoye', 'Bologna']]
    ),
  },
  {
    code: 'AUT',
    name: 'Autriche',
    flag: '🇦🇹',
    colors: ['#ED2939', '#FFFFFF', '#ED2939'],
    players: squad(
      [['Patrick Pentz', 'Bayer Leverkusen'], ['Heinz Lindner', 'FC Basel']],
      [['Stefan Posch', 'Bologna'], ['Philipp Lienhart', 'Freiburg'], ['Kevin Danso', 'Lens'], ['Maximilian Wöber', 'Leeds'], ['Phillipp Mwene', 'PSV'], ['Andreas Ulmer', 'Salzburg']],
      [['David Alaba', 'Real Madrid'], ['Florian Grillitsch', 'Ajax'], ['Konrad Laimer', 'Bayern Munich'], ['Marcel Sabitzer', 'Dortmund'], ['Nicolas Seiwald', 'Leipzig'], ['Christoph Baumgartner', 'Leipzig']],
      [['Marko Arnautović', 'Inter Milan'], ['Michael Gregoritsch', 'Freiburg'], ['Sasa Kalajdzic', 'Wolves'], ['Patrick Wimmer', 'Wolfsburg'], ['Maximilian Entrup', 'Heidenheim'], ['Andreas Weimann', 'Wolfsburg']]
    ),
  },
  {
    code: 'SRB',
    name: 'Serbie',
    flag: '🇷🇸',
    colors: ['#C6363C', '#0C4076', '#FFFFFF'],
    players: squad(
      [['Predrag Rajković', 'Atletico Madrid'], ['Vanja Milinković-Savić', 'Torino']],
      [['Strahinja Pavlović', 'AC Milan'], ['Nikola Milenković', 'Nottm Forest'], ['Stefan Mitrović', 'Getafe'], ['Srđan Babić', 'Almería'], ['Filip Mladenović', 'Ferencváros'], ['Ivan Jurić', 'Southampton']],
      [['Sergej Milinković-Savić', 'Al-Hilal'], ['Nemanja Gudelj', 'Sevilla'], ['Sasa Lukić', 'Fulham'], ['Uroš Račić', 'Betis'], ['Andrija Živković', 'PAOK'], ['Filip Kostić', 'Juventus']],
      [['Aleksandar Mitrović', 'Al-Hilal'], ['Dušan Vlahović', 'Juventus'], ['Luka Jović', 'AC Milan'], ['Nemanja Radonjić', 'Torino'], ['Dušan Tadić', 'Fenerbahçe'], ['Marko Lazović', 'Hellas Verona']]
    ),
  },
  {
    code: 'DEN',
    name: 'Danemark',
    flag: '🇩🇰',
    colors: ['#C8102E', '#FFFFFF', '#C8102E'],
    players: squad(
      [['Kasper Schmeichel', 'Anderlecht'], ['Oliver Christensen', 'Fiorentina']],
      [['Joachim Andersen', 'Crystal Palace'], ['Simon Kjær', 'AC Milan'], ['Victor Nelsson', 'Galatasaray'], ['Jens Stryger Larsen', 'Trabzonspor'], ['Joakim Maehle', 'Wolfsburg'], ['Alexander Bah', 'Benfica']],
      [['Thomas Delaney', 'Anderlecht'], ['Pierre-Emile Højbjerg', 'PSG'], ['Christian Eriksen', 'Man United'], ['Mathias Jensen', 'Brentford'], ['Morten Hjulmand', 'Sporting CP'], ['Rasmus Kristensen', 'Roma']],
      [['Martin Braithwaite', 'Espanyol'], ['Andreas Cornelius', 'Copenhagen'], ['Yussuf Poulsen', 'Leipzig'], ['Kasper Dolberg', 'Nice'], ['Jonas Wind', 'Wolfsburg'], ['Rasmus Højlund', 'Man United']]
    ),
  },
  {
    code: 'SCO',
    name: 'Écosse',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    colors: ['#003078', '#FFFFFF', '#003078'],
    players: squad(
      [['Angus Gunn', 'Norwich'], ['Craig Gordon', 'Hearts']],
      [['Aaron Hickey', 'Brentford'], ['Grant Hanley', 'Norwich'], ['Scott McKenna', 'Nottm Forest'], ['Liam Cooper', 'Leeds'], ['Andrew Robertson', 'Liverpool'], ['Kieran Tierney', 'Arsenal']],
      [['John McGinn', 'Aston Villa'], ['Callum McGregor', 'Celtic'], ['Stuart Armstrong', 'Southampton'], ['Billy Gilmour', 'Brighton'], ['Scott McTominay', 'Napoli'], ['Kenny McLean', 'Norwich']],
      [['Che Adams', 'Southampton'], ['Lyndon Dykes', 'Millwall'], ['Ryan Christie', 'Bournemouth'], ['Liam Kelly', 'Marseille'], ['Jacob Brown', 'Stoke'], ['Lawrence Shankland', 'Hearts']]
    ),
  },
  {
    code: 'CZE',
    name: 'République Tchèque',
    flag: '🇨🇿',
    colors: ['#D7141A', '#FFFFFF', '#11457E'],
    players: squad(
      [['Jiří Pavlenka', 'Werder Bremen'], ['Tomáš Vaclík', 'Villarreal']],
      [['Vladimír Coufal', 'West Ham'], ['Ondřej Čelůstka', 'Trabzonspor'], ['Tomáš Holeš', 'Slavia Prague'], ['David Zima', 'Torino'], ['Jan Bořil', 'Slavia Prague'], ['Lukáš Masopust', 'Slavia Prague']],
      [['Tomáš Souček', 'West Ham'], ['Lukáš Provod', 'Slavia Prague'], ['Vladimír Darida', 'Hertha'], ['Alex Král', 'Spartak Moscow'], ['Antonín Barák', 'Fiorentina'], ['Lukáš Kalvach', 'Viktoria Plzeň']],
      [['Patrik Schick', 'Bayer Leverkusen'], ['Adam Hložek', 'Bayer Leverkusen'], ['Ondřej Lingr', 'Feyenoord'], ['Jan Kuchta', 'Slavia Prague'], ['Tomáš Chorý', 'Slavia Prague'], ['Ladislav Krejčí', 'Sparta Prague']]
    ),
  },
  {
    code: 'ROU',
    name: 'Roumanie',
    flag: '🇷🇴',
    colors: ['#002B7F', '#FCD116', '#CE1126'],
    players: squad(
      [['Florin Niță', 'Damac'], ['Horațiu Moldovan', 'Atletico Madrid']],
      [['Andrei Rațiu', 'Villarreal'], ['Dragoș Grigore', 'Al-Qadsiah'], ['Radu Drăgușin', 'Tottenham'], ['Ionuț Nedelcearu', 'Palermo'], ['Nicuşor Bancu', 'Universitatea Craiova'], ['Cristian Manea', 'CFR Cluj']],
      [['Marius Marin', 'Pisa'], ['Florin Tănase', 'PAOK'], ['Răzvan Marin', 'Empoli'], ['Nicolae Stanciu', 'Damac'], ['Dennis Man', 'Parma'], ['Darius Olaru', 'FCSB']],
      [['Denis Alibec', 'Farul Constanța'], ['George Pușcaș', 'Bari'], ['Valentin Mihăilă', 'Parma'], ['Florin Andone', 'Deportivo Coruña*'], ['Andrei Ivan', 'Universitatea Craiova'], ['Daniel Bîrligea', 'FCSB']]
    ),
  },
  // ── CAF ───────────────────────────────────────────────────────────────────
  {
    code: 'MAR',
    name: 'Maroc',
    flag: '🇲🇦',
    colors: ['#C1272D', '#006233', '#C1272D'],
    players: squad(
      [['Yassine Bounou', 'Al-Hilal'], ['Munir Mohamedi', 'Málaga']],
      [['Achraf Hakimi', 'PSG'], ['Romain Saïss', 'Besiktas'], ['Noussair Mazraoui', 'Man United'], ['Jawad El-Yamiq', 'Real Valladolid'], ['Adam Masina', 'Udinese'], ['Yahia Attiyat Allah', 'Wydad AC']],
      [['Sofyan Amrabat', 'Man United'], ['Azzedine Ounahi', 'Marseille'], ['Selim Amallah', 'Standard Liège'], ['Bilal El Khannouss', 'Genk'], ['Abdessamad Ezzalzouli', 'Osasuna'], ['Ilias Chair', 'QPR']],
      [['Hakim Ziyech', 'Galatasaray'], ['Youssef En-Nesyri', 'Fenerbahçe'], ['Soufiane Rahimi', 'Al-Ain'], ['Zakaria Aboukhlal', 'Toulouse'], ['Anass Zaroury', 'Burnley'], ['Ayoub El Kaabi', 'Olympiakos']]
    ),
  },
  {
    code: 'SEN',
    name: 'Sénégal',
    flag: '🇸🇳',
    colors: ['#00853F', '#FDEF42', '#E31B23'],
    players: squad(
      [['Edouard Mendy', 'Al-Ahli'], ['Alfred Gomis', 'Rennes']],
      [['Youssouf Sabaly', 'Betis'], ['Kalidou Koulibaly', 'Al-Hilal'], ['Abdou Diallo', 'Leipzig'], ['Moussa Niakhate', 'Nottm Forest'], ['Formose Mendy', 'Auxerre'], ['Ismail Jakobs', 'Monaco']],
      [['Gana Gueye', 'Everton'], ['Pape Matar Sarr', 'Tottenham'], ['Nampalys Mendy', 'Leicester'], ['Krepin Diatta', 'Monaco'], ['Moustapha Name', 'Nantes'], ['Pape Guèye', 'Marseille']],
      [['Sadio Mané', 'Al-Nassr'], ['Ismaïla Sarr', 'Crystal Palace'], ['Habib Diallo', 'Strasbourg'], ['Nicolas Jackson', 'Chelsea'], ['Bamba Dieng', 'Lorient'], ['Iliman Ndiaye', 'Everton']]
    ),
  },
  {
    code: 'EGY',
    name: 'Égypte',
    flag: '🇪🇬',
    colors: ['#CE1126', '#FFFFFF', '#000000'],
    players: squad(
      [['Mohamed El-Shenawy', 'Al-Ahly'], ['Ahmed El-Shenawy', 'Al-Zamalek']],
      [['Ahmed Hegazi', 'Al-Ittihad'], ['Ayman Ashraf', 'Al-Ahly'], ['Mohamed Abdelshafy', 'Zamalek'], ['Omar Gaber', 'FC Basel'], ['Ahmed Fatouh', 'Al-Ahly'], ['Mahmoud Hamdi', 'Pyramids']],
      [['Tarek Hamed', 'Pyramids'], ['Amr El Sulaya', 'Al-Ahly'], ['Hamdi Fathi', 'Al-Hilal'], ['Mohamed Elneny', 'Besiktas'], ['Ahmed El Sayed', 'Al-Zamalek'], ['Emam Ashour', 'Zamalek']],
      [['Mohamed Salah', 'Liverpool'], ['Omar Marmoush', 'Man City'], ['Mostafa Mohamed', 'Nantes'], ['Mahmoud Hassan Trezeguet', 'Trabzonspor'], ['Zizo', 'Zamalek'], ['Ahmed El Fotouh', 'Al-Ahly']]
    ),
  },
  {
    code: 'CMR',
    name: 'Cameroun',
    flag: '🇨🇲',
    colors: ['#007A5E', '#CE1126', '#FCD116'],
    players: squad(
      [['André Onana', 'Man United'], ['Devis Epassy', 'Abha']],
      [['Collins Fai', 'Al-Taai'], ['Michael Ngadeu', 'Charleroi'], ['Jérôme Ngom Mbekeli', 'Vitória SC'], ['Olivier Mbaizo', 'Philadelphia'], ['Nouhou Tolo', 'Seattle'], ['Enzo Ebosse', 'Udinese']],
      [['André-Frank Zambo Anguissa', 'Napoli'], ['Gaël Ondoua', 'Hannover'], ['Samuel Gouet', 'Levante'], ['Martin Hongla', 'Hellas Verona'], ['Jeando Fuchs', 'Paderborn'], ['Jean-Charles Castelletto', 'FC Nantes']],
      [['Vincent Aboubakar', 'Besiktas'], ['Karl Toko Ekambi', 'Lyon'], ['Stéphane Bahoken', 'Angers'], ['Bryan Mbeumo', 'Brentford'], ['Moumi Ngamaleu', 'YB'], ['Ignatius Ganago', 'Nantes']]
    ),
  },
  {
    code: 'GHA',
    name: 'Ghana',
    flag: '🇬🇭',
    colors: ['#006B3F', '#FCD116', '#EF3340'],
    players: squad(
      [['Lawrence Ati-Zigi', 'St Gallen'], ['Abdul Manaf Nurudeen', 'Kasimpasa']],
      [['Andy Yiadom', 'Reading'], ['Daniel Amartey', 'Leicester'], ['Jonathan Mensah', 'Columbus'], ['Baba Rahman', 'Reading'], ['Gideon Mensah', 'Lyon'], ['Alexander Djiku', 'Fenerbahçe']],
      [['Thomas Partey', 'Arsenal'], ['Mohammed Kudus', 'West Ham'], ['Daniel Kofi Kyereh', 'Freiburg'], ['Elisha Owusu', 'Gent'], ['Daniel Afriyie Barnieh', 'Basel'], ['Antoine Semenyo', 'Bournemouth']],
      [['Jordan Ayew', 'Crystal Palace'], ['André Ayew', 'Le Havre'], ['Richmond Boakye', 'Botev Plovdiv*'], ['Osman Bukari', 'Red Star Belgrade'], ['Felix Afena-Gyan', 'Frosinone'], ['Inaki Williams', 'Athletic Bilbao']]
    ),
  },
  {
    code: 'NGA',
    name: 'Nigeria',
    flag: '🇳🇬',
    colors: ['#008751', '#FFFFFF', '#008751'],
    players: squad(
      [['Francis Uzoho', 'Omonia'], ['Maduka Okoye', 'Watford']],
      [['Ola Aina', 'Nottm Forest'], ['William Troost-Ekong', 'Watford'], ['Chidozie Awaziem', 'Alanyaspor'], ['Semi Ajayi', 'West Brom'], ['Kenneth Omeruo', 'Kasimpasa'], ['Zaidu Sanusi', 'Porto']],
      [['Wilfred Ndidi', 'Leicester'], ['Alex Iwobi', 'Fulham'], ['Joe Aribo', 'Southampton'], ['Emmanuel Dennis', 'Nottm Forest'], ['Taiwo Awoniyi', 'Nottm Forest'], ['Frank Onyeka', 'Brentford']],
      [['Victor Osimhen', 'Galatasaray'], ['Kelechi Iheanacho', 'Sevilla'], ['Samuel Chukwueze', 'AC Milan'], ['Terem Moffi', 'Nice'], ['Sadiq Umar', 'Valencia'], ['Moses Simon', 'FC Nantes']]
    ),
  },
  {
    code: 'MLI',
    name: 'Mali',
    flag: '🇲🇱',
    colors: ['#14B53A', '#FDEF42', '#CE1126'],
    players: squad(
      [['Djigui Diarra', 'FC Lorient'], ['Ibrahim Mounkoro', 'Aris Thessaloniki*']],
      [['Hamari Traoré', 'Rennes'], ['Moussa Sissako', 'Amiens'], ['Falaye Sacko', 'Vitoria Guimaraes'], ['Massadio Haïdara', 'Newcastle'], ['Ousmane Coulibaly', 'Pau FC*'], ['Boubacar Kouyaté', 'Toulouse*']],
      [['Moussa Doumbia', 'Reims*'], ['Amadou Haidara', 'Leipzig'], ['Cheick Doucouré', 'Crystal Palace'], ['Adama Traoré', 'Wolves'], ['Yves Bissouma', 'Tottenham'], ['Lassana Coulibaly', 'Salernitana']],
      [['El Bilal Touré', 'Atalanta'], ['Ibrahima Koné', 'Lorient'], ['Moussa Maréga', 'Al-Hilal'], ['Aliou Dieng', 'Wolverhampton*'], ['Saidou Sissoko', 'Cercle Brugge*'], ['Kamory Doumbia', 'Reims']]
    ),
  },
  {
    code: 'CIV',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    colors: ['#F77F00', '#FFFFFF', '#009A44'],
    players: squad(
      [['Yahia Fofana', 'Monaco'], ['Badra Ali Sangaré', 'Dif FC*']],
      [['Serge Aurier', 'Nottm Forest'], ['Wilfried Kanon', 'Al-Taawoun'], ['Simon Deli', 'Club Brugge'], ['Ghislain Konan', 'Reims'], ['Odilon Kossounou', 'Bayer Leverkusen'], ['Eric Bailly', 'Besiktas']],
      [['Jean-Michaël Seri', 'Galatasaray'], ['Franck Kessié', 'Barcelona'], ['Ibrahim Sangare', 'Nottm Forest'], ['Seko Fofana', 'Al-Qadsiah'], ['Max-Alain Gradel', 'Toulouse'], ['Tino Kadewere', 'Lyon']],
      [['Wilfried Zaha', 'Galatasaray'], ['Sébastien Haller', 'Dortmund'], ['Nicolas Pépé', 'OGC Nice'], ['Dider Drogba II', 'Unattached*'], ['Armand Lauriente', 'Sassuolo'], ['Simon Adingra', 'Brighton']]
    ),
  },
  {
    code: 'RSA',
    name: 'Afrique du Sud',
    flag: '🇿🇦',
    colors: ['#007A4D', '#FFB81C', '#001489'],
    players: squad(
      [['Ronwen Williams', 'Sundowns'], ['Bruce Bvuma', 'Chiefs']],
      [['Sifiso Hlanti', 'Chiefs'], ['Rushine De Reuck', 'Mamelodi'], ['Mothobi Mvala', 'Sundowns'], ['Thamsanqa Mkhize', 'Mamelodi'], ['Reeve Frosler', 'Chiefs'], ['Teboho Mokoena', 'Sundowns']],
      [['Bongani Zungu', 'Amiens'], ['Ethan Nkosi', 'Kaizer Chiefs*'], ['Thabang Moremi', 'Chiefs*'], ['Goodman Mosele', 'Sundowns*'], ['Sipho Mbule', 'SuperSport*'], ['Yusuf Maart', 'Chiefs']],
      [['Percy Tau', 'Al-Ahly'], ['Lyle Foster', 'Burnley'], ['Lebogang Phiri', 'Gent'], ['Dolly Dlamini', 'Sundowns*'], ['Victor Letsoalo', 'Sundowns*'], ['Bradley Grobler', 'SuperSport*']]
    ),
  },
  // ── AFC ───────────────────────────────────────────────────────────────────
  {
    code: 'JPN',
    name: 'Japon',
    flag: '🇯🇵',
    colors: ['#BC002D', '#FFFFFF', '#BC002D'],
    players: squad(
      [['Shuichi Gonda', 'Shimizu S-Pulse'], ['Daniel Schmidt', 'Sint-Truiden']],
      [['Hiroki Sakai', 'Urawa Reds'], ['Maya Yoshida', 'Schalke 04'], ['Takehiro Tomiyasu', 'Arsenal'], ['Ko Itakura', 'Gladbach'], ['Yuto Nagatomo', 'FC Tokyo'], ['Miki Yamane', 'Kawasaki']],
      [['Gaku Shibasaki', 'UD Logroñes'], ['Wataru Endo', 'Liverpool'], ['Hidemasa Morita', 'Sporting CP'], ['Junya Ito', 'Stade Reims'], ['Ritsu Doan', 'SC Freiburg'], ['Takumi Minamino', 'Monaco']],
      [['Kaoru Mitoma', 'Brighton'], ['Daichi Kamada', 'Crystal Palace'], ['Ayase Ueda', 'Feyenoord'], ['Reo Hatate', 'Celtic'], ['Shogo Taniguchi', 'Kawasaki*'], ['Takefusa Kubo', 'Real Sociedad']]
    ),
  },
  {
    code: 'KOR',
    name: 'Corée du Sud',
    flag: '🇰🇷',
    colors: ['#CD2E3A', '#FFFFFF', '#003478'],
    players: squad(
      [['Kim Seung-gyu', 'Al-Shabab'], ['Jo Hyeon-woo', 'Ulsan']],
      [['Kim Moon-hwan', 'Jeonbuk'], ['Kim Minjae', 'Bayern Munich'], ['Kim Young-gwon', 'Ulsan'], ['Jung Seung-hyun', 'Villarreal'], ['Lee Yong', 'Jeonbuk'], ['Hong Chul', 'Jeonbuk']],
      [['Jung Woo-young', 'Al-Qadsiah'], ['Son Jun-ho', 'Wuhan Three Towns'], ['Lee Jae-sung', 'Mainz'], ['Hwang In-beom', 'Feyenoord'], ['Lee Kang-in', 'PSG'], ['Cho Gue-sung', 'Jeonbuk']],
      [['Son Heung-min', 'Tottenham'], ['Hwang Hee-chan', 'Wolves'], ['Hwang Ui-jo', 'Nottm Forest'], ['Oh Hyeon-gyu', 'Celtic'], ['Bae Jun-ho', 'Stoke City'], ['Jeong Sang-bin', 'Freiburg']]
    ),
  },
  {
    code: 'AUS',
    name: 'Australie',
    flag: '🇦🇺',
    colors: ['#00843D', '#FFD700', '#00843D'],
    players: squad(
      [['Mat Ryan', 'Real Sociedad'], ['Andrew Redmayne', 'Sydney FC']],
      [['Miloš Degenek', 'Columbus Crew'], ['Harry Souttar', 'Leicester'], ['Kye Rowles', 'Hearts'], ['Aziz Behich', 'Dundee United'], ['Bailey Wright', 'Sunderland'], ['Joel King', 'Odense']],
      [['Aaron Mooy', 'Celtic'], ['Jackson Irvine', 'St Pauli'], ['Riley McGree', 'Middlesbrough'], ['Ajdin Hrustic', 'Verona'], ['Cameron Devlin', 'Hearts'], ['Connor Metcalfe', 'St Pauli']],
      [['Mathew Leckie', 'Melbourne City'], ['Mitchell Duke', 'Fagiano Okayama'], ['Martin Boyle', 'Hibernian'], ['Garang Kuol', 'Newcastle'], ['Awer Mabil', 'Cadiz'], ['Jason Cummings', 'Sporting KC']]
    ),
  },
  {
    code: 'IRN',
    name: 'Iran',
    flag: '🇮🇷',
    colors: ['#239F40', '#FFFFFF', '#DA0000'],
    players: squad(
      [['Alireza Beiranvand', 'Persepolis'], ['Hossein Hosseini', 'Persepolis']],
      [['Sadegh Moharrami', 'Dinamo Zagreb'], ['Majid Hosseini', 'Kayserispor'], ['Milad Mohammadi', 'AEK Athens'], ['Ramin Rezaeian', 'Lokomotiv Moscow'], ['Shoja Khalilzadeh', 'Al-Qadsiah'], ['Morteza Pouraliganji', 'Al-Sadd']],
      [['Saeid Ezatolahi', 'Vejle'], ['Ahmad Noorollahi', 'Al-Wakra'], ['Ali Karimi', 'Heerenveen'], ['Alireza Jahanbakhsh', 'Feyenoord'], ['Vahid Amiri', 'Persepolis'], ['Saman Ghoddos', 'Brentford']],
      [['Mehdi Taremi', 'Inter Milan'], ['Karim Ansarifard', 'Nottm Forest'], ['Sardar Azmoun', 'Roma'], ['Allahyar Sayyadmanesh', 'Fenerbahçe'], ['Reza Ghoochannejhad', 'Retired*'], ['Ali Gholizadeh', 'Charleroi']]
    ),
  },
  {
    code: 'KSA',
    name: 'Arabie Saoudite',
    flag: '🇸🇦',
    colors: ['#006C35', '#FFFFFF', '#006C35'],
    players: squad(
      [['Mohammed Al-Owais', 'Al-Hilal'], ['Mohammed Al-Rubaie', 'Al-Shabab']],
      [['Saud Abdulhamid', 'AS Roma'], ['Ali Al-Bulaihi', 'Al-Hilal'], ['Abdulelah Al-Amri', 'Al-Hilal'], ['Hassan Al-Tambakti', 'Al-Hilal'], ['Yasser Al-Shahrani', 'Al-Hilal'], ['Mohammed Al-Burayk', 'Al-Hilal']],
      [['Salman Al-Faraj', 'Al-Hilal'], ['Ali Al-Hassan', 'Al-Hilal'], ['Sami Al-Najei', 'Al-Qadsiah'], ['Riyadh Sharahili', 'Al-Hilal'], ['Mohamed Kanoo', 'Al-Ittifaq*'], ['Abdullah Otayf', 'Al-Hilal']],
      [['Saleh Al-Shehri', 'Al-Hilal'], ['Firas Al-Buraikan', 'Al-Fateh'], ['Mohammed Al-Dawsari', 'Al-Hilal'], ['Abdullah Al-Hamdan', 'Al-Shabab'], ['Hattan Bahebri', 'Al-Shabab'], ['Mukhtar Ali', 'Al-Batin*']]
    ),
  },
  {
    code: 'IRQ',
    name: 'Irak',
    flag: '🇮🇶',
    colors: ['#CE1126', '#FFFFFF', '#007A3D'],
    players: squad(
      [['Jalal Hassan', 'Al-Shorta'], ['Fahad Talib', 'Al-Quwa Al-Jawiya']],
      [['Ali Adnan', 'Unattached'], ['Saad Natiq', 'Al-Quwa Al-Jawiya'], ['Rebin Sulaka', 'Duhok*'], ['Hussein Ali', 'Al-Naft*'], ['Hamza Younes', 'Al-Diwaniya*'], ['Bassam Yousif', 'Zakho*']],
      [['Amjed Attwan', 'Al-Zawraa*'], ['Alaa Abbas', 'Al-Shorta*'], ['Ibrahim Bayesh', 'Al-Zawraa*'], ['Mohanad Ali', 'Al-Naft*'], ['Karrar Mohammed', 'ASKF*'], ['Ahmed Yasin', 'Al-Quwa Al-Jawiya*']],
      [['Aymen Hussein', 'Al-Shorta*'], ['Ahmed Majid', 'Al-Zawraa*'], ['Mahdi Kamil', 'Al-Talaba*'], ['Mohammed Qassim', 'Al-Diwaniya*'], ['Omar Haider', 'Al-Mina\'a*'], ['Humam Tariq', 'Al-Naft*']]
    ),
  },
  {
    code: 'JOR',
    name: 'Jordanie',
    flag: '🇯🇴',
    colors: ['#007A3D', '#FFFFFF', '#CE1126'],
    players: squad(
      [['Yazeed Abulaila', 'Al-Faisaly'], ['Kobra Habashna', 'Al-Wahdat*']],
      [['Badr Hamdan', 'Aris Thessaloniki'], ['Abdallah Nasib', 'Esteghlal'], ['Ahmad Saleh', 'Al-Jazeera*'], ['Anas Bani-Yaseen', 'Al-Faisaly*'], ['Shadi Safei', 'Al-Faisaly*'], ['Mohammed Al-Rashdan', 'ASEMA*']],
      [['Musa Al-Tamaari', 'Nottm Forest'], ['Ahmad Haroun', 'Al-Qadisiyah*'], ['Yazan Al-Naimat', 'Al-Wahdat*'], ['Monther Abu Amara', 'Al-Ramtha*'], ['Mahmoud Al-Mardi', 'Al-Wahdat*'], ['Ibrahim Jabr', 'Malkiya*']],
      [['Yousef Al-Naber', 'Angers'], ['Ali Olwan', 'Al-Faisaly*'], ['Hamza Al-Dardour', 'Al-Faisaly*'], ['Ahmad Al-Sarour', 'Al-Wahdat*'], ['Ameen Al-Rawahi', 'Al-Arabi*'], ['Qusai Moamar', 'Al-Jazira*']]
    ),
  },
  {
    code: 'UZB',
    name: 'Ouzbékistan',
    flag: '🇺🇿',
    colors: ['#1EB53A', '#FFFFFF', '#CE1126'],
    players: squad(
      [['Utkir Yusupov', 'FC Pakhtakor*'], ['Oybek Eshmurodov', 'FC Navbahor*']],
      [['Sherzod Qodirov', 'FC Pakhtakor*'], ['Jaloliddin Masharipov', 'Bunyodkor*'], ['Abdumajid Botirboev', 'Bunyodkor*'], ['Elmurod Toshev', 'Pakhtakor*'], ['Farruh Toshmatov', 'Pakhtakor*'], ['Azizbek Turgunboev', 'Pakhtakor*']],
      [['Jaloliddin Masharipov', 'Jiangsu*'], ['Otabek Shukurov', 'Al-Qadsiah'], ['Sanjar Tursunov', 'Pakhtakor*'], ['Khurshid Tursunov', 'Pakhtakor*'], ['Mansur Jalolov', 'Bunyodkor*'], ['Bobur Abdixoliqov', 'Pakhtakor*']],
      [['Eldor Shomurodov', 'AS Roma'], ['Dostonbek Khamdamov', 'Pachuca'], ['Sardor Rashidov', 'Bunyodkor*'], ['Shamsiddin Latipov', 'Pakhtakor*'], ['Ilkhom Jalolov', 'Pakhtakor*'], ['Behruz Shodimonov', 'Pakhtakor*']]
    ),
  },
  // ── CONCACAF (non-hosts) ──────────────────────────────────────────────────
  {
    code: 'PAN',
    name: 'Panama',
    flag: '🇵🇦',
    colors: ['#FFFFFF', '#DB1116', '#002F6C'],
    players: squad(
      [['Luis Mejía', 'Atalanta'], ['Orlando Mosquera', 'Club Atlético Independiente*']],
      [['Fidel Escobar', 'Santos Laguna'], ['Andrés Andrade', 'Aris SC'], ['César Yanis', 'Independiente'], ['Adolfo Machado', 'Houston Dynamo'], ['Éric Davis', 'Columbus Crew'], ['Édgar Yoel Bárcenas', 'Club Guadalajara']],
      [['Adalberto Carrasquilla', 'San Jose Earthquakes'], ['Alberto Quintero', 'Universitario'], ['Gabriel Torres', 'CD Olimpia'], ['Freddy Góndola', 'Pumas*'], ['Aníbal Godoy', 'Nashville'], ['Abdiel Ayarza', 'Nantes']],
      [['Rolando Blackburn', 'Nashville'], ['Ismael Díaz', 'Lausanne'], ['José Fajardo', 'Nantes'], ['Cecilio Waterman', 'Dep. Toluca*'], ['Jovani Welch', 'Club Atlético Huila*'], ['Alfredo Stephens', 'Real España*']]
    ),
  },
  {
    code: 'HON',
    name: 'Honduras',
    flag: '🇭🇳',
    colors: ['#003399', '#FFFFFF', '#003399'],
    players: squad(
      [['Harold Fonseca', 'Olimpia*'], ['Edrick Menjívar', 'Motagua*']],
      [['Marcelo Santos', 'Real España*'], ['Ever Alvarado', 'Motagua*'], ['Maynor Figueroa', 'FC Juárez'], ['Jonathan Paz', 'Marathón*'], ['Devron Garcia', 'Olimpia*'], ['Carlos Meléndez', 'Real España*']],
      [['Alexander López', 'LAFC'], ['Jorge Álvarez', 'Olimpia*'], ['Andy Najar', 'Anderlecht'], ['Romell Quioto', 'CF Montreal'], ['Edwin Rodríguez', 'Motagua*'], ['Kervin Arriaga', 'FC Dallas']],
      [['Alberth Elis', 'Montpellier'], ['Rigoberto Rivas', 'Nottm Forest'], ['Antony Lozano', 'Cádiz'], ['Luis Palma', 'Celtic'], ['Jorge Benguche', 'Columbus*'], ['Bryan Acosta', 'FC Dallas']]
    ),
  },
  {
    code: 'CRC',
    name: 'Costa Rica',
    flag: '🇨🇷',
    colors: ['#002B7F', '#CF142B', '#FFFFFF'],
    players: squad(
      [['Keylor Navas', 'Nottm Forest'], ['Esteban Alvarado', 'Santos de Guápiles*']],
      [['Serge Djemba*', 'Saprissa*'], ['Keysher Fuller', 'Herediano'], ['Bryan Oviedo', 'Real Salt Lake'], ['Oscar Duarte', 'Betis'], ['Francisco Calvo', 'Orlando City'], ['Kendall Waston', 'Saprissa']],
      [['Yeltsin Tejeda', 'Saprissa'], ['Celso Borges', 'AIK'], ['Bryan Ruiz', 'Saprissa'], ['Ariel Lassiter', 'Colorado Rapids'], ['Bernald Alfaro', 'Saprissa*'], ['Manfred Ugalde', 'Spartak Moscow']],
      [['Joel Campbell', 'León'], ['Rándall Leal', 'Nashville'], ['Marvin Angulo', 'Club Santos*'], ['Alonso Martínez', 'Club de Foot Montréal*'], ['Anthony Contreras', 'FC Juárez'], ['Johan Venegas', 'Herediano']]
    ),
  },
  // ── OFC ───────────────────────────────────────────────────────────────────
  {
    code: 'NZL',
    name: 'Nouvelle-Zélande',
    flag: '🇳🇿',
    colors: ['#000000', '#FFFFFF', '#CC0000'],
    players: squad(
      [['Oliver Sail', 'FC Copenhagen'], ['Stefan Marinovic', 'FC Astana']],
      [['Liberato Cacace', 'Empoli'], ['Winston Reid', 'Sønderjyskeon*'], ['Michael Boxall', 'Minnesota United'], ['Nando Pijnaker', 'Portland Timbers'], ['Alex Greive', 'St Mirren'], ['Myer Bevan', 'Unattached*']],
      [['Clayton Lewis', 'Unattached*'], ['Elijah Just', 'Molde'], ['Marko Stamenic', 'FC Copenhagen'], ['Tim Payne', 'Unattached*'], ['Phoenix Farrell', 'Unattached*'], ['Louis Fenton', 'Wellington']],
      [['Dane Ingham', 'Unattached*'], ['Chris Wood', 'Nottm Forest'], ['Sarpreet Singh', 'TSV 1860 Munich'], ['Matthew Garbett', 'Ferencváros'], ['Zac McGraw', 'Unattached*'], ['Ben Waine', 'Vitesse*']]
    ),
  },
  // ── PLAY-OFF SPOTS (2) ───────────────────────────────────────────────────
  {
    code: 'IDN',
    name: 'Indonésie',
    flag: '🇮🇩',
    colors: ['#CE1126', '#FFFFFF', '#CE1126'],
    players: squad(
      [['Ernando Ari', 'Persebaya'], ['Maarten Paes', 'FC Dallas']],
      [['Jay Idzes', 'Venezia'], ['Pratama Arhan', 'Tokyo Verdy'], ['Rizky Ridho', 'Persija'], ['Elkan Baggott', 'Ipswich'], ['Jordi Amat', 'Johor DT'], ['Sandy Walsh', 'Club Brugge']],
      [['Marselino Ferdinan', 'Oxford United'], ['Ivar Jenner', 'Utrecht'], ['Thom Haye', 'Almere City'], ['Ragnar Oratmangoen', 'Flut Eindhoven*'], ['Nathan Tjoe-A-On', 'Swansea'], ['Shayne Pattynama', 'Jong AZ*']],
      [['Egy Maulana Vikri', 'Lechia Gdańsk'], ['Rafael Struick', 'Brisbane Roar*'], ['Hokky Caraka', 'PSIS*'], ['Dony Tri Pamungkas', 'Persija*'], ['Muhammad Ferarri', 'Persija*'], ['Ramadhan Sananta', 'Al-Qadsiah']]
    ),
  },
  {
    code: 'KAZ',
    name: 'Kazakhstan',
    flag: '🇰🇿',
    colors: ['#00AFCA', '#FFE200', '#00AFCA'],
    players: squad(
      [['Dmytro Nepogodov', 'FK Astana*'], ['Igor Shatskiy', 'FC Kairat*']],
      [['Yuri Logvinenko', 'Kairat'], ['Nuraly Alip', 'Kairat'], ['Gafurzhan Suyumbayev', 'Kairat*'], ['Baktiyar Zaynutdinov', 'CSKA Moscow'], ['Isael', 'Kairat*'], ['Aleksey Shchetkin', 'Astana*']],
      [['Yan Vorogovskiy', 'Kairat*'], ['Eldos Akhmetov', 'Kairat*'], ['Azat Nurgaliyev', 'Kairat*'], ['Askhat Tagybergen', 'Astana*'], ['Dauren Tursynbekov', 'Kairat*'], ['Abat Aimbetov', 'Kairat*']],
      [['Baktiyor Zaynutdinov', 'CSKA*'], ['Marat Bystrov', 'Astana*'], ['Mansur Suyunbekov', 'Kairat*'], ['Yerlan Baitana', 'Kairat*'], ['Adil Dzhaksybekov', 'Atyrau*'], ['Temirlan Erlanov', 'Kairat*']]
    ),
  },
];

export const TOTAL_STICKERS = ALL_TEAMS.reduce((sum, t) => sum + t.players.length, 0);
