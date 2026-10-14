// [kratki opis za karticu, duži opis za katalog]. Sastavljeno iz javno dostupnih podataka o proizvođačima
// (službene stranice i poslovni registri). Brendovi bez unosa prikazuju zamjenski tekst dok ne stignu podaci.
export const brandTexts: Record<string, [string, string]> = {
  MIPA: [
    'Njemački porodični proizvođač boja i premaza iz Essenbacha, osnovan 1948. Poznat po sistemima za autoreparaturu, ali i industrijskim i drvnim premazima.',
    'Mipa SE je porodična kompanija iz Essenbacha u Donjoj Bavarskoj, osnovana 1948. godine pod imenom Paul Mittermayer GmbH, a današnji naziv nosi od 2001. Razvija i proizvodi boje i lakove za autoreparaturu, industrijske i drvne premaze, aerosole i dekorativne boje, a kupci su joj uglavnom profesionalni lakirači. Proizvodi se na više evropskih lokacija i prodaje u više od 100 zemalja. Mega-Em je distributer Mipe za Bosnu i Hercegovinu od 2011. godine.',
  ],
  PPG: [
    'Globalni proizvođač premaza; PPG Refinish je njegov program za autoreparaturu i komercijalna vozila. Poznate linije su ENVIROBASE High Performance i Deltron.',
    'PPG Refinish je dio kompanije PPG Industries i opslužuje autolakirnice, flote komercijalnih vozila i laku industriju širom svijeta. Vodeće linije su vodorazrjedivi ENVIROBASE High Performance i solventni Deltron, uz bogat izbor toner i efekt boja. Uz boje nudi bazu formula nijansi, spektrofotometre i obuke za lakirere. Mega-Em je od 2025. godine zastupnik PPG-a za Bosnu i Hercegovinu.',
  ],
  'Nexa Autocolor': [
    'PPG-ov brend za autoreparaturu namijenjen prije svega autolakirnicama. Poznat po vodorazrjedivom sistemu Aquabase i 2K linijama.',
    'Nexa Autocolor je brend za autoreparaturu u vlasništvu PPG Industries, čija historija seže do kompanije ICI. Među prvima je uveo niskoemisione vodorazrjedive sisteme kroz liniju Aquabase. Danas obuhvata vodorazrjedivi Aquabase Plus i solventnu 2K liniju, uz podloge, lakove i pomoćne proizvode. Namijenjen je profesionalnim lakirnicama koje traže pouzdano poklapanje nijansi.',
  ],
  Duxone: [
    'Axaltin brend za autoreparaturu, prisutan od 1997. godine. Namijenjen lakirnicama koje traže pouzdan sistem uz dobar odnos cijene i kvalitete.',
    'Duxone je dio Axaltinog portfolija za autoreparaturu, uz brendove poput Cromax, Standox i Spies Hecker. Axalta ga predstavlja kao svestran i konkurentan sistem za sve, od lokalnih popravki do kompletnog lakiranja vozila. Bazne boje su pogodne za automobile, kamione i autobuse. Proizvodi se u zapadnoj Evropi.',
  ],
  Cromax: [
    'Axaltin brend za autoreparaturu, nasljednik DuPont Refinish linije. U ponudi su vodorazrjedivi i solventni sistemi.',
    'Cromax je Axaltin brend za autoreparaturu, nastao iz nekadašnjeg DuPont Refinish brenda. Obuhvata vodorazrjedive sisteme, kao što su Cromax EZ i Cromax Pro, te solventnu liniju Cromax XP, uz podloge i lakove koji se mogu kombinovati. Cilj mu je jednostavna primjena i tačno poklapanje nijansi uz pomoć karte boja i spektrofotometra. Korijeni Axalte sežu do 1866. godine.',
  ],
  '3M': [
    'Svjetski poznat proizvođač abraziva, traka i materijala za autolakirnice. Linije Cubitron, Trizact i Scotch-Brite standard su u struci.',
    '3M u segmentu autoreparature nudi cjelovit asortiman, od abraziva i materijala za pripremu površine do sistema za poliranje. Poznate linije su Cubitron II, Trizact, Scotch-Brite i Finesse-it. Proizvodi su namijenjeni radionicama za popravku karoserija, ali i automobilskoj industriji. Brend je prepoznat po konzistentnom rezultatu rada.',
  ],
  Catalfer: [
    'Italijanski proizvođač hemije i abraziva za autoreparaturu, osnovan 1957. Distribuira se u više od 50 zemalja.',
    'Catalfer je italijanska kompanija koja od 1957. godine nudi proizvode koje karoserijske i lakirerske radionice koriste svakodnevno. U ponudi su hemija za autoreparaturu, poput odmašćivača, lakova i sprej fillera, abrazivi i pneumatske brusilice bez prašine, kao što je MAXIMA-CNC2. Od 2024. ima i liniju za spot repair i detailing. Catalfer je ujedno 3M Master Distributer za automobilske proizvode.',
  ],
  Meguiars: [
    'Američki brend njege vozila s tradicijom od 1901. godine. Poznat po polirnim pastama, voskovima i profesionalnim sistemima za detailing.',
    "Meguiar's je nastao 1901. godine, kada je Frank Meguiar Jr. počeo praviti polir za namještaj, a kasnije se okrenuo njezi automobila. Pedesetih godina razvijen je profesionalni Mirror Glaze za proizvođače, dilere i autolakirnice, a 1973. stiže linija proizvoda i za ljubitelje automobila. Brend se kroz generacije porodice Meguiar razvio u jednog od vodećih proizvođača sredstava za njegu površina. Za profesionalce nudi polirne paste, voskove i sredstva za završnu obradu laka.",
  ],
  'Liquid Elements': [
    'Njemački brend za detailing i poliranje vozila. Poznat po polirnim pastama i orbitalnim polirkama.',
    'Liquid Elements je njemački brend za poliranje, pranje i njegu automobila, prisutan od 2003. godine. Prema navodima prodavača, hemiju, podloške i polirke proizvodi u vlastitoj režiji. Najpoznatiji je po orbitalnim (dual-action) polirkama i polirnim pastama sa abrazivnim zrncima koja se tokom rada razgrađuju. Paste su pogodne i za rotacione i za orbitalne mašine.',
  ],
  Walcom: [
    'Italijanski brend pištolja za farbanje namijenjen profesionalnim lakirerima. Dio je porodične kompanije Walmec S.p.A.',
    'Walcom proizvodi pištolje za nanošenje boja i lakova u okviru porodične kompanije Walmec S.p.A. iz Italije. U asortimanu su linije Genesi Carbonio, Slim Kombat i EGO te automatski MATIK pištolji. Poznati su po HALO tehnologiji (visoka atomizacija, nizak overspray). Koriste ih autolakireri, ali i proizvođači namještaja i jahti.',
  ],
  SATA: [
    'Njemački porodični proizvođač profesionalnih pištolja za farbanje iz Kornwestheima. Nudi i opremu za zaštitu disanja i filtraciju zraka.',
    'SATA je njemački proizvođač profesionalnih pištolja za farbanje sa sjedištem u Kornwestheimu kod Stuttgarta. Prvi pištolj proizveden je 1925. godine, a 2025. firma je obilježila stotinu godina proizvodnje. Pored pištolja nudi opremu za mokro lakiranje, sisteme za zaštitu disanja i jedinice za filtraciju zraka. Jedini proizvodni pogon je u Kornwestheimu, odakle se snabdijeva više od 100 zemalja.',
  ],
  Auarita: [
    'Proizvođač pištolja za farbanje i pneumatskog alata iz Kine. Nudi HVLP i LVMP pištolje za lakiranje.',
    'Auarita je brend kompanije Zhejiang Auarita Pneumatic Tools, proizvođača pištolja za farbanje. U ponudi su HVLP i LVMP pištolji za nanošenje boja i lakova te pripadajuća oprema, poput manometara. Kompanija navodi značajan udio na domaćem tržištu. Namijenjeni su radionicama koje traže pristupačnu opremu za lakiranje.',
  ],
  Shinemate: [
    'Brend alata i potrošnog materijala za poliranje i detailing vozila. Prema prodavačima, prisutan u više od 80 zemalja.',
    'Shinemate nudi električne polirke, pribor za brušenje i poliranje, polirne paste i hemiju za detailing. Brend je prisutan u više od 80 zemalja, a poznat je po pristupačnim mašinama za poliranje. Koristi se u profesionalnim i hobi radionicama.',
  ],
  Kraus: [
    'Njemački brend opreme za radionice za karoseriju i lakiranje. U ponudi su polirke, infracrvene sušare i radni stalci.',
    'Krauss Tools je njemačka kompanija iz Winsena koja nudi opremu za karoserijske i lakirerske radionice. U asortimanu su mašine za poliranje, infracrvene sušare za boju, stalci za lakiranje i radna kolica. Namijenjena je profesionalnim radionicama koje traže praktičnu opremu.',
  ],
  Mirka: [
    'Finski proizvođač abraziva i sistema za brušenje, osnovan 1943. Poznat po bezprašnom brušenju Abranet.',
    'Mirka potiče iz Helsinkija iz 1943. godine, a danas joj je sjedište u Jeppou u Finskoj. Bezprašno brušenje mrežastim abrazivom Abranet predstavila je 2001. godine. Pored abraziva proizvodi kompletne sisteme brušenja te mašine za brušenje i poliranje. Sve se proizvodi u Finskoj, a većina ide u izvoz u više od 80 zemalja.',
  ],
  Feral: [
    'Brend grčke kompanije AUTO GS iz Soluna, poznat po osvježivačima zraka i proizvodima za njegu automobila.',
    'Feral je brend grčke kompanije AUTO GS, osnovane 1978. u Solunu, koja proizvodi osvježivače zraka, proizvode za njegu i hemiju za automobile. Brend Feral pokrenut je 2005. godine. Najpoznatiji je po kolekciji osvježivača zraka s imenima životinja.',
  ],
  Akfix: [
    'Potrošački brend kompanije Akkim iz Istanbula, proizvođača silikona, PU pjena i ljepila.',
    'Akfix je brend kompanije Akkim sa sjedištem u Istanbulu, koja od 2001. proizvodi hemiju za građevinarstvo. Asortiman obuhvata ljepila, zaptivače i silikone, PU pjene, tehničke aerosole i hidroizolaciju. Akkim izvozi u veliki broj zemalja i nudi proizvodnju pod privatnim brendom. Poznati su PU pjene za pištolj i univerzalni hibridni zaptivač.',
  ],
  Cartotecnica: [
    'Italijanski proizvođač materijala za maskiranje iz San Bonifacia kod Verone, aktivan od 1985. godine.',
    'Cartotecnica Basic nudi maskirne materijale za autoindustriju, građevinarstvo i industriju. U ponudi su elektrostatički maskirni film, maskirni papir te papirne i druge trake (obostrane, platnene, ojačane). Imaju i QPS gradirane plastične čaše za miješanje s adapterima za pištolje. Proizvodi se mogu štampati s logotipom kupca.',
  ],
  Henelit: [
    'Austrijski proizvođač boja i lakova iz Villacha, osnovan 1947. i član Mipa grupe od 2008. godine.',
    'Henelit Lackfabrik GmbH je srednja austrijska kompanija iz Koruške, osnovana 1947. godine, a proizvodnja i razvoj nalaze se u Villachu. Od 2008. dio je Mipa grupe. Nudi cjelovita rješenja za zanatstvo i industrijske sektore.',
  ],
  VMD: [
    'Italijanski proizvođač aerosola i otapala iz Ripalta Cremasca kod Milana, osnovan 1994. godine.',
    'VMD Italia proizvodi hemijske proizvode, tehničke sprejeve i boje, a počeo je s aerosolima za automobilski sektor. Asortiman uključuje auto njegu, boje i markere, cink, inox i zaštitne proizvode te razrjeđivače i maziva. Prodaje pod vlastitim brendom ili privatnom markom i izvozi u više od 60 zemalja. Od 2020. radi u novom pogonu površine 38.000 m².',
  ],
  Alberding: [
    'Njemački proizvođač vodenih polimernih disperzija iz Krefelda, s korijenima iz 1772. godine (Alberdingk Boley).',
    'Alberdingk Boley je međunarodni proizvođač vodenih veziva: akrilnih, poliuretanskih i vinil-acetatnih disperzija te hibrida, uz derivate lanenog i ricinusovog ulja. Sjedište je u Krefeldu, a proizvodnja i razvoj su u Njemačkoj, SAD i Kini. Proizvodi se koriste u bojama, premazima, ljepilima i grafičkoj industriji. Riječ je o privatnoj kompaniji sa više od 500 uposlenih.',
  ],
  Cimsa: [
    'Turski proizvođač cementa, poznat po bijelom cementu i kalcij-aluminatnim cementima.',
    'Çimsa je turska cementna kompanija. Njen Super White cement (CEM I 52.5R) iz Mersina koristi se u više od 70 zemalja, a namijenjen je građevinskoj hemiji i arhitektonskim primjenama, poput dekorativnog betona, ljepila za pločice i fuga. Proizvodi i kalcij-aluminatne cemente za građevinsku hemiju i suhe mješavine. Primjenjuju se u betonu, reparaturnim malterima, hidroizolaciji i ljepilima.',
  ],
  Danucem: [
    'Slovački proizvođač bijelog cementa iz Rohožníka, kompanija CRH. Cement odlikuje vrlo visoka bjelina.',
    'Danucem Slovensko upravlja cementarom u Rohožníku u Slovačkoj, gdje se proizvodi bijeli cement pod nazivom Rohožník White. Do 2021. kompanija je poslovala kao CRH (Slovensko) i dio je grupe CRH. U Evropi postoji samo nekoliko proizvođača bijelog cementa, a Rohožník isporučuje u desetak zemalja, uključujući Bosnu i Hercegovinu. Cement ima vrlo visoku bjelinu i dobro prihvata pigmente, pa je pogodan za obojeni beton.',
  ],
  Calucem: [
    'Proizvođač kalcij-aluminatnih cemenata sa sjedištem u Mannheimu, od 2021. u grupi Cementos Molins.',
    'Calucem je proizvođač kalcij-aluminatnih cemenata sa sjedištem u Mannheimu u Njemačkoj. Od 2021. u vlasništvu je španske kompanije Cementos Molins. Pogon za mljevenje nalazi se u Puli u Hrvatskoj, a izvozi se u više od 60 zemalja. Ovi cementi se najviše koriste u podnim proizvodima, ljepilima za pločice, fugama, vatrostalnim materijalima i posebnim žbukama.',
  ],
  Ashland: [
    'Američki proizvođač specijalnih aditiva; za građevinarstvo nudi celulozne etre Culminal i Natrosol.',
    'Ashland nudi aditive za cementne i gipsane proizvode. Metilceluloza Culminal koristi se u cementnim ljepilima, gipsanim žbukama i masama za gletovanje, malterima, samonivelirajućim podlogama i estrisima, a linije UP, Plus i C/M odgovaraju različitim potrebama. Natrosol (hidroksietilceluloza) djeluje kao zgušnjivač i sredstvo za zadržavanje vode. Aditivi se biraju prema vrsti proizvoda i zahtjevima primjene.',
  ],
  Berolan: [
    'Austrijski porodični proizvođač aditiva za suhe maltere iz Arbinga.',
    'Berolan je porodična austrijska kompanija iz Arbinga specijalizirana za aditive za suhe mješavine. U ponudi su aeranti, zgušnjivači, reološki aditivi, plastifikatori, retarderi i odpjenjivači za maltere, žbuke, gletove i ljepila za pločice. Poznati su Berolan LP-W2 i LP 70, aeranti koji poboljšavaju obradivost i prinos žbuke. Kupcima pomaže i pri izradi prilagođenih receptura.',
  ],
  Imifabi: [
    'Italijanski proizvođač talka, osnovan pedesetih godina 20. stoljeća u Valmalencu.',
    'IMI Fabi je globalni proizvođač talka koji je osnovan pedesetih godina u Valmalencu u Italiji, a sjedište mu je u Milanu. Talk i drugi minerali koriste se u plastici, papiru, bojama i punilima, keramici, farmaciji i građevinskim premazima. Zaštićeni nazivi proizvoda uključuju NATBRIGHT i NATFEEL.',
  ],
  'Jelu Werk': [
    'Njemački proizvođač celuloznih punila i kompozita drvo-plastika, osnovan 1908. godine.',
    'Jelu-Werk iz Rosenberga u Njemačkoj osnovan je 1908. godine i fokusiran je na prirodna vlakna i biokompozite. Poznat je po Jelucel celuloznim prahovima i vlaknima koja se koriste kao funkcionalna punila visoke čistoće, kao i po Jeluxyl prahovima od mekog drveta. Linija Jeluplast obuhvata kompozite drvo-plastika za injekcijsko brizganje i ekstruziju.',
  ],
  Lanxess: [
    'Njemačka kompanija specijalne hemije; za boje i beton nudi pigmente Bayferrox i Colortherm.',
    'LANXESS proizvodi sintetske željezooksidne pigmente pod markama Bayferrox i Colortherm, uz hromoksid zelene. Pokrivaju žute, crvene, crne i smeđe tonove, a koriste se za bojenje građevinskih materijala, boja i premaza te plastike. Proizvode se u Evropi, Kini i Americi. Prema kompaniji, sintetski oksidi imaju veću čistoću i ujednačeniju kvalitetu od prirodnih okera.',
  ],
  'Organik Kimya': [
    'Turski proizvođač polimernih emulzija i redisperzibilnih praškova, s tradicijom od 1924. godine.',
    'Organik Kimya je turska kompanija specijalne hemije koja je 1924. započela kao trgovac hemikalijama, a proizvodnju polimernih emulzija pokrenula je 1965. Proizvodi vodene akrilne emulzije (Orgal), redisperzibilne polimerne praškove (ORP) i topljena ljepila. Glavni pogon je u Istanbulu, a drugi u Roterdamu. Opslužuje više od 2.000 kupaca u preko 80 zemalja.',
  ],
  Troy: [
    'Proizvođač konzervansa i biocida za boje i premaze (Troy Corporation).',
    'Troy Corporation je specijalizirana hemijska kompanija poznata po biocidima i konzervansima za boje i premaze. Linija Mergal služi kao konzervans u limenci, a Troysan kao fungicid za suhi film vanjskih premaza. Nudi i aditive poput Troythix Anti-Sag4 za kontrolu reologije. Od 2015. preuzela je i industrijske biocide kompanije Ashland.',
  ],
  Loufakis: [
    'Grčka kompanija za hemikalije iz okoline Soluna, osnovana 1987. godine.',
    'Loufakis Chemicals SA osnovana je 1987. godine i snabdijeva industriju hemijskim proizvodima uz razvojni tim. Pogon i skladište sa pristupom željeznici nalaze se u industrijskoj zoni Sindos kod Soluna. Pružaju i logističke usluge skladištenja hemikalija za treća lica.',
  ],
  '4CR': [
    'Brend za autoreparaturu prepoznatljiv po narandžasto-crnoj ambalaži, osnovan 2004. godine.',
    '4CR je brend za autoreparaturu osnovan 2004. godine, poznat po narandžasto-crnoj ambalaži. Prema kompaniji, spada među vodeće dobavljače sistema za lakiranje vozila. Asortiman broji više od 1.500 artikala: podloge, lakove, učvršćivače, razrjeđivače, kitove, abrazive i polirne proizvode.',
  ],
  Axalta: [
    'Globalni proizvođač premaza čiji korijeni sežu do njemačke firme Herberts iz 1866. Brendovi uključuju Cromax, Standox i Spies Hecker.',
    'Axalta vuče porijeklo od njemačke firme Herberts, koja je 1866. počela s lakiranjem kočija. Samostalnom kompanijom postala je 2013. izdvajanjem iz DuPont Performance Coatings, a 2014. izašla je na njujoršku berzu. U autoreparaturi nudi brendove Cromax, Standox, Spies Hecker i Duxone. U portfoliju ima i Imron te U-POL, preuzet 2021.',
  ],
  DuPont: [
    'Nekadašnji DuPont Refinish brend za autoreparaturu, danas poznat kao Cromax u okviru Axalte.',
    'DuPont je 1999. godine preuzeo Herberts i formirao DuPont Performance Coatings, a za autoreparaturu je stvoren brend DuPont Refinish. Taj brend je danas poznat kao Cromax. Od 2013. posluje u okviru kompanije Axalta Coating Systems.',
  ],
  EGA: [
    'Španski proizvođač premium industrijskih alata iz Vitoria-Gasteiza, osnovan 1990. godine.',
    'EGA Master je kompanija iz Vitoria-Gasteiza u Baskiji koju je 1990. osnovao Iñaki Garmendia Ajuria, a počeci su joj u alatima za cijevi. Asortiman uključuje ručni, izolirani, ESD i ATEX alat koji ne varniči. Namijenjen je industriji nafte i plina, rudarstvu, auto-industriji i građevinarstvu. Prema kompaniji, dostupna je u više od 150 zemalja i ima preko 200 patenata.',
  ],
  Indasa: [
    'Portugalski proizvođač premium abraziva iz Aveira, osnovan 1979. godine.',
    'INDASA (Indústria de Abrasivos) osnovana je 1979. godine u Aveiru u Portugalu i specijalizirana je za brusne materijale i sisteme za industriju i servise. Najpoznatiji brend su joj Rhyno abrazivi, a veliku pažnju posvećuje autoreparaturnom segmentu. Grupa ima osam podružnica, a izvozi u više od 100 zemalja.',
  ],
  Rupes: [
    'Italijanski porodični proizvođač profesionalnih polirki i brusilica iz Milana, osnovan 1947. godine.',
    'RUPES S.p.A. je porodična kompanija osnovana u Milanu 1947. godine, a sjedište joj je u Vermezzu. Proizvodi profesionalne električne i pneumatske alate za auto-industriju, obradu drveta i nautiku. Godine 1968. predstavila je prvu električnu ekscentričnu brusilicu. Poznata je kao proizvođač polirki za detailing i autolakirnice.',
  ],
  SAGOLA: [
    'Španski proizvođač pištolja za farbanje s tradicijom od 1955. godine, od 2020. u grupi Elcometer.',
    'Sagola je osnovana 1955. godine, kada je Alejandro Sánchez Larrauri pokrenuo malu radionicu za industriju, a ime joj je donio pištolj ALM 401. Kasnije su dodani drugi pištolji i oprema, poput filtera zraka i posuda pod pritiskom. Najprije se afirmirala u Latinskoj Americi, a danas prodaje u više od 80 zemalja. Od 2020. dio je grupe Elcometer.',
  ],
  Smirdex: [
    'Grčki porodični proizvođač abraziva, osnovan 1981. godine.',
    'Smirdex je grčka porodična kompanija osnovana 1981. godine koja proizvodi abrazive za različite namjene. Proizvodni pogoni, skladišta i sjedište zauzimaju više od 17.000 m² u sjevernoj Grčkoj. Oko 85% prodaje ide u izvoz u više od 84 zemlje. Asortiman uključuje brusne listove, vodootporne papire, brusne spužve i polirne proizvode.',
  ],
  SIA: [
    'Švicarski proizvođač abraziva iz Frauenfelda s tradicijom dužom od 150 godina, dio Bosch grupe.',
    'sia Abrasives potiče iz male hemijske tvornice u Frauenfeldu u Švicarskoj, a mehanička proizvodnja fleksibilnih abraziva na današnjoj lokaciji počela je 1875. Od 2008. dio je Robert Bosch GmbH, kao centar izvrsnosti za brušenje. Zapošljava oko 1.000 ljudi širom svijeta, a 2025. obilježila je 150 godina. Pored klasičnih abraziva nudi netkane i spužvaste abrazivne proizvode.',
  ],
}
