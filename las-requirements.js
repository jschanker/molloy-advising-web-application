"use strict";

(function(namespace)
{
	// formerly getLASCodes function

	var LASString = "Liberal Arts & Science Courses as of 3.7.14"+ 
	"Course,Title,Degree Audit Code"+ 
	"\nARA  101,Beginning Arabic I,ARA101"+
	"\nARA  102,Beginning Arabic II,ARA102"+
	"\nARA  201,Beginning Arabic III,ARA201"+
	"\nARA  390,Topics in Arabic,ARA390"+
	"\nART  129,History of Art,ART129"+
	"\nART  135,HistoryWestArt I:Prehis-Renaissance,ART135"+
	"\nART  136,HistoryWestArtII:Renaissance-Modern,ART136"+
	"\nART  220,Ancient and Classical Art,ART220"+
	"\nART  221H,(H)Art and Ideas Through History,ART221H"+
	"\nART  223,Medieval Art,ART223"+
	"\nART  224,Renaissance Art,ART224"+
	"\nART  225,Baroque and Rococo Art,ART225"+
	"\nART  228,Modern Art,ART228"+
	"\nART  229,Asian Art,ART229"+
	"\nART  230,American Art,ART230"+
	"\nART  232,Women and Art,ART232"+
	"\nART  233,Contemporary Art,ART233"+
	"\nART  236,History of Photography,ART236"+
	"\nART  237,Classical Roman Art & Architecture,ART237"+
	"\nART  238,Arts - Northern Italian Renaissance,ART238"+
	"\nART  239,Arts of Thailand,ART239"+
	"\nART  240,Art Historical Themes in Cinema,ART240"+
	"\nART  241,Art History of Non-EuropeanCultures,ART241"+
	"\nART  248,History of Art and Healing,ART248"+
	"\nART  270,Field Study in Art: New York,ART270"+
	"\nART  275,Field Study in Art: Europe,ART275"+
	"\nART  296,Flemish Art & Architecture,ART296"+
	"\nART  302,Photo Journalism,*ART302"+
	"\nART  321H,(H)Ancient&Medieval Worlds,ART321H"+
	"\nART  323H,(H)Art in Modern World,ART323H"+
	"\nART  324H,(H)Art and Ideas Through History,ART221H"+
	"\nART  397,Topics in Art History,ART397"+
	"\nART  471,Independent Study: Art History,ART471"+
	"\nART  GNED,Art History - General Education,ARTGNED"+
	"\nBIO  110,Basic Human Biology,BIO110"+
	"\nBIO  111,Laboratory in Human Biology,BIO111"+
	"\nBIO  112,Integrated Biological Sciences,BIO112"+
	"\nBIO  114,Environment & Human Physiology,BIO114"+
	"\nBIO  120,Anatomy and Physiology I,BIO120"+
	"\nBIO  121,Anatomy and Physiology II,BIO121"+
	"\nBIO  126,General Biology I,BIO126"+
	"\nBIO  127,General Biology II,BIO127"+
	"\nBIO  127L,General Biology II Lab,BIO127L"+
	"\nBIO  150,Ecology,BIO150"+
	"\nBIO  151,Marine Biology,BIO151"+
	"\nBIO  207,Outdoor Education,BIO207"+
	"\nBIO  210,History of Biology,BIO210"+
	"\nBIO  212,Biology of Aging,*BIO312"+
	"\nBIO  220,Laboratory Techniques,BIO220"+
	"\nBIO  222,Intermediate Physiology,BIO222"+
	"\nBIO  242,Genetics,BIO242"+
	"\nBIO  245,Microbiology,BIO245"+
	"\nBIO  247,Nutrition for Health,BIO247"+
	"\nBIO  252,Human Origins,*SOC354"+
	"\nBIO  257,Scientific Research Techniques,BIO257"+
	"\nBIO  280H,(H)Scientific Discovery,BIO280H"+
	"\nBIO  302,Botany,BIO302"+
	"\nBIO  312,Biology of Aging,*BIO312"+
	"\nBIO  330,Histology and Micro Techniques,BIO330"+
	"\nBIO  340,Comparative Anatomy,BIO340"+
	"\nBIO  341,Embryology,BIO341"+
	"\nBIO  342,Applications in Bioinformatics,BIO342"+
	"\nBIO  343,Cell Biology,BIO343"+
	"\nBIO  350,Advanced Microbiology,BIO350"+
	"\nBIO  350L,Advanced Microbiology Lab,BIO350L"+
	"\nBIO  352,Evolution,BIO352"+
	"\nBIO  354,Human Origins,*SOC354"+
	"\nBIO  356,Hematology and Immunology,BIO356"+
	"\nBIO  358,Endocrinology,BIO358"+
	"\nBIO  362,Forensic Analysis of DNA,BIO362"+
	"\nBIO  380H,(H)Scientific Discovery,BIO280H"+
	"\nBIO  390,Topics in Biology,BIO390"+
	"\nBIO  471,Independent Study,BIO471"+
	"\nBIO  472,Independent Study,BIO472"+
	"\nBIO  480,Research in Biology,BIO480"+
	"\nBIO  481,Research in Biology,BIO481"+
	"\nBIO  493,Senior Thesis,BIO493"+
	"\nBIO  494,Research Thesis,BIO494"+
	"\nBIO  496,Biology Seminar,BIO496"+
	"\nBIO  497,Biology Seminar,BIO497"+
	"\nBIO  ELEC,Biology Elective,BIOELEC"+
	"\nBIO  GEDL,Biology (w/Lab) General Education,BIOGEDL"+
	"\nBIO  GNED,Biology (NO LAB) General Ed,BIOGNED"+
	"\nBIO  MAJR,Biology Major,BIOMAJR"+
	"\nBUS  360,Computer Info Systems in Business,*CIS360"+
	"\nCHE  103,Chemistry in Today's World,CHE103"+
	"\nCHE  108,Fundamentals - Chemistry Laboratory,CHE108"+
	"\nCHE  109,Fundamentals of Chemistry,CHE109"+
	"\nCHE  110,College Chemistry I,CHE110"+
	"\nCHE  111,College Chemistry II,CHE111"+
	"\nCHE  112,Organic and Biological Chemistry,CHE112"+
	"\nCHE  113,Organic Biological Chem Allied Hlth,CHE113"+
	"\nCHE  132,Inorganic Chemistry I,CHE132"+
	"\nCHE  133,Inorganic Chemistry II,CHE133"+
	"\nCHE  200,Organic Chemistry I,CHE200"+
	"\nCHE  201,Organic Chemistry II,CHE201"+
	"\nCHE  320,Biochemistry,CHE320"+
	"\nCHE  350,Analytical Chemistry,CHE350"+
	"\nCHE  390,Topics in Chemistry,CHE390"+
	"\nCHE  470,Independent Study,CHE470"+
	"\nCHE  ELEC,Chemistry Elective,CHEELEC"+
	"\nCHE  GEDL,Chemistry (w/Lab) General Education,CHEGEDL"+
	"\nCHE  GNED,Chemistry (NO LAB) General Ed,CHEGNED"+
	"\nCHI  101,Beginning Mandarin Chinese I,CHI101"+
	"\nCHI  102,Beginning Mandarin Chinese II,CHI102"+
	"\nCHI  201,Beginning Mandarin Chinese III,CHI201"+
	"\nCHI  390,Topics in Mandarin Chinese,CHI390"+
	"\nCIS  100,Computer Systems Introduction,*CSC100"+
	"\nCIS  103,Visual Basic - OOPI,*CSC103"+
	"\nCIS  104,Math Analysis Using MS Excel,*CIS104"+
	"\nCIS  224,Intro to Database Management,CIS224"+
	"\nCIS  235,Java-Object Oriented Prog,*CIS235"+
	"\nCIS  250,Computer Info Systems in Business,*CIS360"+
	"\nCIS  255,Computer Ethics and Security,CIS255"+
	"\nCIS  318,Analysis & Logical Design,CIS318"+
	"\nCIS  333,COBOL I,CIS333"+
	"\nCIS  334,COBOL II,CIS334"+
	"\nCIS  360,Computer Info Systems in Business,*CIS360"+
	"\nCOM  110,Experiences in Communication,COM110"+
	"\nCOM  114,Group Discussion,COM114"+
	"\nCOM  120,Oral Interpretation-Children's Lit,COM120"+
	"\nCOM  122,Creative Drama,COM122"+
	"\nCOM  124,Voice and Diction,COM124"+
	"\nCOM  125,Voice and Diction for Acting,COM125"+
	"\nCOM  131,Understanding Social Media,COM131"+
	"\nCOM  210,Public Speaking,COM210"+
	"\nCOM  211,Gender and Communication,COM211"+
	"\nCOM  213,Intercultural Communication,COM213"+
	"\nCOM  214,Health Communication,COM214"+
	"\nCOM  220,Oral Interpretation,COM220"+
	"\nCOM  222,\"Media, Culture, and Society\",*SOC222"+
	"\nCOM  225,Family Communication,COM225"+
	"\nCOM  229,ExperienceInCorporateCommunications,COM229"+
	"\nCOM  230,Scriptwriting for Media,*COM230"+
	"\nCOM  233,Intro to News Writing,*ENG233"+
	"\nCOM  235,Film and Drama Criticism,*ENG235"+
	"\nCOM  237,Rhetoric:The Art of Persuasion,*PHI237"+
	"\nCOM  239,Public Speaking for Business,COM239"+
	"\nCOM  243,Introduction to New Media,*COM243"+
	"\nCOM  246,Civic Engagement with New Media,COM246"+
	"\nCOM  247,Sports Communication,COM247"+
	"\nCOM  248,Online Journalism,*COM248"+
	"\nCOM  254,Public Relations,COM254"+
	"\nCOM  255,Public Relations Writing,*COM255"+
	"\nCOM  258,Communication Ethics,*ETH258"+
	"\nCOM  301,Feature Writing,*ENG301"+
	"\nCOM  302,Photo Journalism,*ART302"+
	"\nCOM  309,History of Digital Media,COM309"+
	"\nCOM  310,Video Storytelling for the Web,COM310"+
	"\nCOM  311,Shakespeare,*ENG311"+
	"\nCOM  312,Perspectives in Communication,COM312"+
	"\nCOM  313,Interpersonal Communication,COM313"+
	"\nCOM  314,Intercultural Communication,COM213"+
	"\nCOM  315,Organizational Communications,COM315"+
	"\nCOM  323H,(H)Mass Communication&Social Change,COM323H"+
	"\nCOM  330,Adv Scriptwritng for Media,*COM330"+
	"\nCOM  335,Playwriting & Dramatic Structure,COM335"+
	"\nCOM  341,History of the Theatre,*ENG341"+
	"\nCOM  342,Directing,COM342"+
	"\nCOM  345,Broadway and Beyond,*ENG345"+
	"\nCOM  349,English Theatre & Literature Tour,*ENG349"+
	"\nCOM  354,Foundations-Media Theory,COM354"+
	"\nCOM  355,History of Media,COM355"+
	"\nCOM  356,Film Art,*COM356"+
	"\nCOM  358,Advanced Online Journalism,COM358"+
	"\nCOM  360,Understanding Television,COM360"+
	"\nCOM  364,Foundations of CommunicationsTheory,COM364"+
	"\nCOM  365,Methods of Media Criticism,COM365"+
	"\nCOM  366,Broadcast Journalism,COM366"+
	"\nCOM  453,Advanced Broadcast Journalism Prod,COM358"+
	"\nCOM  470,Independent Study,COM470"+
	"\nCOM  471,Independent Study,COM470"+
	"\nCOM  472,Independent Study,COM470"+
	"\nCOM  473,Independent Study,COM470"+
	"\nCOM  488,Research in Communication,COM488"+
	"\nCOM  490,Communications Seminar,COM490"+
	"\nCOM  ELEC,Com Arts Elective (Liberal Arts),COMELEC"+
	"\nCOM  GNED,Communication Arts General Ed,COMGNED"+
	"\nCOR  321,Harmony of Music & Philosophy,COR321"+
	"\nCOR  322,Religion & Communication,COR322"+
	"\nCOR  324,Transcendent Self,COR324"+
	"\nCOR  325,Literature & Philosphy of Life,COR325"+
	"\nCOR  326,Quest for Fulfillment,COR326"+
	"\nCOR  332,Women in Religion & History,COR332"+
	"\nCOR  333,\"Faces of God, Faces of Satan\",COR333"+
	"\nCOR  335,Citizenship & Social Responsibility,COR335"+
	"\nCOR  336,Spiritual Autobiography,COR336"+
	"\nCOR  337,Social Justice: Global Perspectives,COR337"+
	"\nCOR  338,Spiritual &Sci Perspectives/Environ,COR338"+
	"\nCOR  341,The American Quest,COR341"+
	"\nCOR  342,Beyond9/11:Westn Wrld&Islamic Wrld,COR342"+
	"\nCOR  343,Rhetoric in Social Communication,COR343"+
	"\nCOR  344,Myth & Ritual: Religious or Socio?,COR344"+
	"\nCOR  345,Self-Realization and Happiness,COR345"+
	"\nCOR  346,Spirituality and Social Justice,COR346"+
	"\nCOR  347,\"Existentialism:Cinematic,Lit,Philos\",COR347"+
	"\nCOR  348,Preaching for Non-Preachers,COR348"+
	"\nCOR  349,The Zen Experience,COR349"+
	"\nCOR  352,American Dream,COR352"+
	"\nCOR  354,Disorders of Communication,COR354"+
	"\nCOR  355,Dictatorship & Democracy: A Study,COR355"+
	"\nCOR  358,\"Life Transitions: Body,Mind,&Spirit\",COR358"+
	"\nCOR  361,American Question:Pre-Industrl Amer,COR361"+
	"\nCOR  362,America in the Twentieth Century,COR362"+
	"\nCOR  363,Challenge of Leadership,COR363"+
	"\nCOR  365,\"LongIsland:SocRealities,CivicIdeals\",COR365"+
	"\nCOR  366,Vulnerable Populations,COR366"+
	"\nCOR  371,Medieval World,COR371"+
	"\nCOR  380H,(H) Quest forTruth inContemp Life,COR380H"+
	"\nCOR  390,Topics in Core,COR390"+
	"\nCRJ  101,Foundations of Justice,CRJ101"+
	"\nCRJ  203,Theories of Crime,CRJ203"+
	"\nCRJ  213,Criminalistics:Theory/Practice,CRJ213"+
	"\nCRJ  221,Victimology,CRJ221"+
	"\nCRJ  223,Domestic Violence,CRJ223"+
	"\nCRJ  227,Violence and Aggression,CRJ227"+
	"\nCRJ  230,Juvenile Justice,CRJ230"+
	"\nCRJ  237,Deviant Behavior/Social Control,*CRJ237"+
	"\nCRJ  240,The Police,CRJ240"+
	"\nCRJ  241,Police and Community Relations,CRJ241"+
	"\nCRJ  245,Probation and Parole,CRJ245"+
	"\nCRJ  250,Substance Abuse and Crime,CRJ250"+
	"\nCRJ  255,Leadership in Criminal Justice,CRJ255"+
	"\nCRJ  256,Criminal Jutice and the Media,CRJ256"+
	"\nCRJ  260,Organized Crime,CRJ260"+
	"\nCRJ  263,\"Corrections:Phil,Methods&Programs\",CRJ263"+
	"\nCRJ  280,Criminal Law,CRJ280"+
	"\nCRJ  281,Criminal Procedure,CRJ281"+
	"\nCRJ  283,Law and Society,*CRJ283"+
	"\nCRJ  337,Psychology of Criminal Profiling,*PSY337"+
	"\nCRJ  339,Forensic Psychology,*PSY339"+
	"\nCRJ  340,Women and Crime,CRJ340"+
	"\nCRJ  345,Gangs,CRJ345"+
	"\nCRJ  350,Critical Issues/Crim. Justice,CRJ350"+
	"\nCRJ  358,Homeless&Crim Justice System,CRJ358"+
	"\nCRJ  361,Cross-Cultural Perspectives,CRJ361"+
	"\nCRJ  390,Topics in Criminal Justice,CRJ390"+
	"\nCRJ  470,Independent Study,CRJ470"+
	"\nCRJ  480,Survey of Criminal Justice,CRJ480"+
	"\nCRJ  490,Senior Seminar/Criminal Just.,CRJ490"+
	"\nCRJ  501,Modern American Justice,CRJ501"+
	"\nCRJ  502,Constitutional Law and Legal Issues,CRJ502"+
	"\nCRJ  ELEC,Criminal Justice Elective,CRJELEC"+
	"\nCRJ  MAJR,Criminal Justice Major,CRJMAJR"+
	"\nCSC  100,Computer Systems Introduction,*CSC100"+
	"\nCSC  103,Visual Basic-OOP I,*CSC103"+
	"\nCSC  104,Math Analysis Using MS Excel,*CIS104"+
	"\nCSC  120,Programming I,CSC120"+
	"\nCSC  121,Programming II,CSC121"+
	"\nCSC  229,Discrete Math Structures,*MAT229"+
	"\nCSC  235,Java-Object Oriented Programming,*CIS235"+
	"\nCSC  244,Data Structures,CSC244"+
	"\nCSC  323,Assembly Language & Systems Program,CSC323"+
	"\nCSC  333,COBOL I,CIS333"+
	"\nCSC  334,COBOL II,CIS334"+
	"\nCSC  335,Programming Languages,CSC335"+
	"\nCSC  369,IntroductionArtificial Intelligence,CSC369"+
	"\nCSC  390,Topics in Computer Science,CSC390"+
	"\nCSC  ELEC,Computer Science Elective,CSCELEC"+
	"\nCSC  MAJR,Computer Science Major,CSCMAJR"+
	"\nCSP  395,Intro to Computing with SPSS,*SOC395"+
	"\nECO  200,Introductory Economics,ECO200"+
	"\nECO  251,Macroeconomics,ECO251"+
	"\nECO  251H,(HONORS) Macroeconomics,ECO251"+
	"\nECO  252,Microeconomics,ECO252"+
	"\nECO  252H,(H) Microeconomics,ECO252"+
	"\nECO  315,\"Money, Banking & Financial Markets\",ECO315"+
	"\nECO  315H,\"(H) Money, Banking & Fin Markets\",ECO315"+
	"\nECO  320,International Economics,ECO320"+
	"\nECO  321,International Finance,ECO321"+
	"\nECO  331,Labor Economics,ECO331"+
	"\nECO  351,Intermediate Macroeconomics,ECO351"+
	"\nECO  352,Intermediate Microeconomics,ECO352"+
	"\nECO  390,Topics in Economics,ECO390"+
	"\nECO  470,Independent Study,ECO470"+
	"\nECO  ELEC,Economics Elective,ECOELEC"+
	"\nECO  MAJR,Economics for Bus/Acct Major,ECOMAJR"+
	"\nEFL  125,Intermediate Listening/Speaking,ESL125"+
	"\nEFL  135,Intermediate Reading/Writing,ESL135"+
	"\nEFL  145,Advanced Listening/Speaking,ESL145"+
	"\nEFL  155,Advanced Reading/Writing,ESL155"+
	"\nEFL  ELEC,EFL Elective,ESLELEC"+
	"\nEFL  GNED,EFL General Ed,ESLGNED"+
	"\nELE  LASG,Elective Liberal Arts-General BA-BS,ELELASG"+
	"\nENG  100,Introduction to College Composition,ENG100"+
	"\nENG  101,Critical Reading,ENG101"+
	"\nENG  102,Critical Approaches to Reading,ENG102"+
	"\nENG  103,Professional Reading for Nurses,ENG103"+
	"\nENG  110,College Composition,ENG110"+
	"\nENG  161,Introduction to Poetry and Drama,ENG161"+
	"\nENG  162,Short Story,ENG162"+
	"\nENG  200,Writing in the Digital Age:An Intro,ENG200"+
	"\nENG  222,Introduction to Linguistics,ENG222"+
	"\nENG  226,Introduction to New Media,*COM243"+
	"\nENG  230,Scriptwriting for Media,*COM230"+
	"\nENG  231,Advanced Composition,ENG231"+
	"\nENG  232,Creative Writing,ENG232"+
	"\nENG  233,Introduction to Newswriting,*ENG233"+
	"\nENG  235,Film and Drama Criticism,*ENG235"+
	"\nENG  236,Effective Business Writing,ENG236"+
	"\nENG  237,Public Relations Writing,*COM255"+
	"\nENG  238,Techniques of Business Writing,ENG238"+
	"\nENG  241,Great Writers of English Lit I,ENG241"+
	"\nENG  242,Great Writers - English Lit II,ENG242"+
	"\nENG  243,Major American Writers I,ENG243"+
	"\nENG  244,Major American Writers II,ENG244"+
	"\nENG  251,Continental Literature I,ENG251"+
	"\nENG  252,Continental Literature II,ENG252"+
	"\nENG  253,Continental Literature III,ENG253"+
	"\nENG  254,Continental Literature IV,ENG254"+
	"\nENG  255,Literature in the Digital Age,ENG255"+
	"\nENG  258,Online Journalism,*COM248"+
	"\nENG  261,Literature of Classical Rome,ENG261"+
	"\nENG  262,Children's Literature,ENG262"+
	"\nENG  263,Mythology and Legend,ENG263"+
	"\nENG  281H,(H)ModMinds-ReflectOnChangingWorld,ENG281H"+
	"\nENG  282,Literary Criticism,ENG282"+
	"\nENG  296,Topics in Literature,ENG296"+
	"\nENG  301,Feature Writing,*ENG301"+
	"\nENG  302,Photo Journalism,*ART302"+
	"\nENG  310,Chaucer,ENG310"+
	"\nENG  311,Shakespeare,*ENG311"+
	"\nENG  312,Readings in Joyce,ENG312"+
	"\nENG  313,Milton,ENG313"+
	"\nENG  314,Dante,ENG314"+
	"\nENG  315,William Faulkner,ENG315"+
	"\nENG  321,Readings in Medieval English Lit,ENG321"+
	"\nENG  322,17th Century English Poetry,ENG322"+
	"\nENG  323,Restoration & 18th Century,ENG323"+
	"\nENG  324,Prose & Poetry/Romantic Period,ENG324"+
	"\nENG  325,Victorian Poetry,ENG325"+
	"\nENG  330,Adv Scriptwritng for Media,*COM330"+
	"\nENG  332,19th Century English Novel,ENG332"+
	"\nENG  333,20th Century English Novel,ENG333"+
	"\nENG  334,19th Century American Novel,ENG334"+
	"\nENG  335,20th Century American Novel,ENG335"+
	"\nENG  336,Poetry Since WW II,ENG336"+
	"\nENG  337,Fiction Since WW II,ENG337"+
	"\nENG  338,Irish Literature,ENG338"+
	"\nENG  341,History of the Theatre,*ENG341"+
	"\nENG  343,Renaissance Drama,ENG343"+
	"\nENG  344,Modern & Contemporary Drama,ENG344"+
	"\nENG  345,Broadway and Beyond,*ENG345"+
	"\nENG  349,English Theatre & Literature Tour,*ENG349"+
	"\nENG  350,History of the English Language,ENG350"+
	"\nENG  351,The Literature of the Bible,ENG351"+
	"\nENG  352,The Bible in Literature,ENG352"+
	"\nENG  356,Film Art,*COM356"+
	"\nENG  361,Literature of Peace and Justice,ENG361"+
	"\nENG  362,Children's Literature,ENG262"+
	"\nENG  363,African-American Lit 18C-1940,ENG363"+
	"\nENG  364,African-American Lit 1940-Present,ENG364"+
	"\nENG  365,Literature&Culture of Life,ENG365"+
	"\nENG  366,Literature for Adolescents,ENG366"+
	"\nENG  381H,(H)ModMinds-ReflectOnChangingWorld,ENG281H"+
	"\nENG  382,Literary Criticism,ENG282"+
	"\nENG  390,Topics in English,ENG390"+
	"\nENG  394,Topics in English,ENG394"+
	"\nENG  396,Topics in English,ENG396"+
	"\nENG  470,Independent Study,ENG470"+
	"\nENG  491,English Seminar,ENG491"+
	"\nENG  492,Writing Seminar,ENG492"+
	"\nENG  ELEC,English Elective,ENGELEC"+
	"\nENG  GNED,English Literature,ENGGNED"+
	"\nENG  MAJ1,Author Req,ENGMAJ1"+
	"\nENG  MAJ2,Genre Req,ENGMAJ2"+
	"\nENG  MAJ3,Literary Period Req,ENGMAJ3"+
	"\nENG  MAJ4,Advanced Writing Req,ENGMAJ4"+
	"\nENG  MAJR,English Electives for Major,ENGMAJR"+
	"\nENV  101,Introduction - Environmental Issues,ENV101"+
	"\nENV  189,Environmental Regulations&Planning,ENV189"+
	"\nENV  390,Topics-Environmental Studies,ENV390"+
	"\nENV  470,Independent Study,ENV470"+
	"\nENV  490,Journalism Internship,*ESC490"+
	"\nENV  496,Environmental Seminar,*ESC496"+
	"\nENV  497,Environmental Seminar,*ESC497"+
	"\nENV  ELEC,Environmental Science Elective,ENVELEC"+
	"\nENV  GEDL,Environmental Sci Gen Ed (w/Lab),ENVGEDL"+
	"\nENV  GNED,Environmental Sci(No Lab)General Ed,ENVGNED"+
	"\nESC  115,Astronomy,ESC115"+
	"\nESC  125,Planet Earth,ESC125"+
	"\nESC  127,Rocks and Minerals,ESC127"+
	"\nESC  130,The Earth's History,ESC130"+
	"\nESC  231,Shaping the Earth,ESC231"+
	"\nESC  233,The Water Planet,ESC233"+
	"\nESC  235,The Geology of New York,ESC235"+
	"\nESC  239,The Earth's Atmosphere,ESC239"+
	"\nESC  375,GIS/GPS and the Earth,ESC375"+
	"\nESC  390,Topics in Earth Science,ESC390"+
	"\nESC  470,Independent Study,ESC470"+
	"\nESC  490,Field Research-Earth Science,*ESC490"+
	"\nESC  496,Earth Science Seminar,*ESC496"+
	"\nESC  497,Earth Science Seminar,*ESC497"+
	"\nESC  ELEC,Earth Science Elective,ESCELEC"+
	"\nESC  GEDL,Earth Sciences Gen Ed (w/Lab),ESCGEDL"+
	"\nESC  GNED,Earth Science (no Lab) General Ed,ESCGNED"+
	"\nESL  125,Intermediate Listening/Speaking,ESL125"+
	"\nESL  135,Intermediate Reading/Writing I,ESL135"+
	"\nESL  136,Intermediate Reading/Writing II,ESL136"+
	"\nESL  140,American English Pronunciation,ESL140"+
	"\nESL  145,Advanced Listening/Speaking,ESL145"+
	"\nESL  155,Advanced Reading/Writing,ESL155"+
	"\nESL  390,Topics in ESL,ESL390"+
	"\nESL  ELEC,English As a Second Lang-Elective,ESLELEC"+
	"\nESL  GNED,English As a Second Lang-General Ed,ESLGNED"+
	"\nETH  250,Ethics: Theory and Practice,ETH250"+
	"\nETH  252,Sexual Ethics,ETH252"+
	"\nETH  254,Justice and Society,ETH254"+
	"\nETH  255,Environmental Ethics,ETH255"+
	"\nETH  257,Business Ethics,ETH257"+
	"\nETH  258,Communication Ethics,*ETH258"+
	"\nETH  279,Religion and Global Moral Issues,*ETH279"+
	"\nETH  280H,(H) Ethics and Contemporary Life,ETH280H"+
	"\nETH  288,Ethics and Health Care,ETH288"+
	"\nETH  290,Topics in Ethics and/or Morality,ETH290"+
	"\nETH  318H,(H)Bioethics in Contemporary World,ETH318H"+
	"\nETH  390,Advanced Topics: Ethics,ETH390"+
	"\nETH  470,Independent Study,ETH470"+
	"\nETH  505,Advanced Medical Ethics,*ETH505"+
	"\nETH  ELEC,Ethics Elective,ETHELEC"+
	"\nETH  GNED,Ethics - General Education,ETHGNED"+
	"\nFRE  101,Beginning French I,FRE101"+
	"\nFRE  102,Beginning French II,FRE102"+
	"\nFRE  115,Basic French Conversation,FRE101"+
	"\nFRE  125,French for Everyday,FRE102"+
	"\nFRE  135,Intermediate French for Everyday,FRE201"+
	"\nFRE  201,Beginning French III,FRE201"+
	"\nFRE  215,Francophone Cultures,FRE215"+
	"\nFRE  390,Topics in French,FRE390"+
	"\nFRE  ELEC,French Elective,FREELEC"+
	"\nFRE  GNED,French General Ed,FREGNED"+
	"\nFST  101,The College Experience,FST101"+
	"\nGEO  200,Intro to Geography,GEO200"+
	"\nGEO  390,Topics in Geography,GEO390"+
	"\nGEO  ELEC,Geography Elective,GEOELEC"+
	"\nGEO  GNED,Geography General Ed,GEOGNED"+
	"\nGRN  101,Introduction to Gerontology,GRN201"+
	"\nGRN  102,Aging and Nutrition,GRN202"+
	"\nGRN  134,Film Festival on Aging,GRN234"+
	"\nGRN  141,Substance Abuse&Elderly,GRN241"+
	"\nGRN  142,Network of Care,GRN242"+
	"\nGRN  143,Elder Abuse,GRN243"+
	"\nGRN  201,Introduction to Gerontology,GRN201"+
	"\nGRN  202,Aging and Nutrition,GRN202"+
	"\nGRN  212,Biology of Aging,*BIO312"+
	"\nGRN  222,Encountering - Mortality,GRN222"+
	"\nGRN  228,Aging and Mental Health,GRN228"+
	"\nGRN  234,Perspectives on Aging in Film,GRN234"+
	"\nGRN  237,Psychology of Aging,*PSY237"+
	"\nGRN  241,Substance Abuse&Elderly,GRN241"+
	"\nGRN  242,Network of Care,GRN242"+
	"\nGRN  243,Elder Abuse,GRN243"+
	"\nGRN  253,Aging in Society,*SOC253"+
	"\nGRN  262,Sociology of Death and Dying,*SOC262"+
	"\nGRN  312,Biology of Aging,*BIO312"+
	"\nGRN  390,Topics in Gerontology,GRN390"+
	"\nGRN  470,Independent Study,GRN470"+
	"\nGRN  ELEC,Gerontology Elective,GRNELEC"+
	"\nHIS  101,Western Civilization I,HIS101"+
	"\nHIS  102,Western Civilization II,HIS102"+
	"\nHIS  111,American Civilization I,HIS111"+
	"\nHIS  112,American Civilization II,HIS112"+
	"\nHIS  114,The Classical Age,HIS114"+
	"\nHIS  213,Current World Issues,*POL213"+
	"\nHIS  216,History of US Foreign Policy,HIS216"+
	"\nHIS  221,The US Since World War II,HIS221"+
	"\nHIS  223,History of Latin America,HIS223"+
	"\nHIS  224,The History of the Caribbean,HIS224"+
	"\nHIS  225H,(H)The Modern World,HIS225H"+
	"\nHIS  230,The Study of Africa,HIS230"+
	"\nHIS  232,Modern China,HIS232"+
	"\nHIS  233,History of Japan,HIS233"+
	"\nHIS  234,Regionalism in Europe and Asia,*HIS234"+
	"\nHIS  235,History & Politics of South Asia,*HIS235"+
	"\nHIS  236,History & Politics - Southeast Asia,*HIS236"+
	"\nHIS  240,Sustaining Societies: Hist Perpectv,*HIS240"+
	"\nHIS  245,American History Through Film,HIS245"+
	"\nHIS  249,History of Modern Russia,HIS249"+
	"\nHIS  250,Irish History,HIS250"+
	"\nHIS  253,History of New York State,HIS253"+
	"\nHIS  254,Ancient Worlds,*SOC254"+
	"\nHIS  260,\"Low Countries,Crossroads,Euoropean\",HIS260"+
	"\nHIS  263,Renaissance in Northern Italy,HIS263"+
	"\nHIS  267,Classical Roman History,HIS267"+
	"\nHIS  310,Women in American History,HIS310"+
	"\nHIS  314,Twentieth Century Europe,HIS314"+
	"\nHIS  315,History of Medieval Europe,HIS315"+
	"\nHIS  316,Emergence of Modern Europe,HIS316"+
	"\nHIS  317,History of 19th Century Europe,HIS317"+
	"\nHIS  319,ResearchMethHistorians&PolScientist,*HIS319"+
	"\nHIS  320,History-RaceNationalityAmericanLife,HIS320"+
	"\nHIS  325H,(H)Bridge-Modern World,HIS225H"+
	"\nHIS  335,History of the Near East,HIS335"+
	"\nHIS  336,History - Mod Germany 1789- Present,HIS336"+
	"\nHIS  340,History & Politics of  Middle East,*HIS340"+
	"\nHIS  344,Vietnam War,HIS344"+
	"\nHIS  361,Philosophy of History,HIS361"+
	"\nHIS  390,Topics in History,HIS390"+
	"\nHIS  470,Independent Study,HIS470"+
	"\nHIS  490,History Seminar,HIS490"+
	"\nHIS  ELEC,History Elective,HISELEC"+
	"\nHIS  GNED,History General Ed,HISGNED"+
	"\nHIS  MAJR,History Major Req,HISMAJR"+
	"\nHON  300H,(HONORS) Capstone Experience,HON300H"+
	"\nIPJ  279,Religion & Global Moral Issues,*ETH279"+
	"\nIPJ  470,Independent Study,IPJ470"+
	"\nIPJ  490,Integrative Sem.-Peace Studies,IPJ490"+
	"\nIPJ  499,Research Seminar,IPJ499"+
	"\nITA  101,Beginning Italian I,ITA101"+
	"\nITA  102,Beginning Italian II,ITA102"+
	"\nITA  113,Intensive Basic Italian I (ITALY),ITA113"+
	"\nITA  114,Intensive Basic Italian II (ITALY),ITA114"+
	"\nITA  115,Basic Italian Conversation,ITA101"+
	"\nITA  125,Italian for Everyday,ITA102"+
	"\nITA  135,Intermediate Italian for Everyday,ITA201"+
	"\nITA  201,Beginning Italian III,ITA201"+
	"\nITA  203,Intensive Intermed Italian I(ITALY),ITA203"+
	"\nITA  204,Intensive Intermed ItalianII(ITALY),ITA204"+
	"\nITA  215,Intermediate Italian Conversation,ITA215"+
	"\nITA  305,Reading and Writing Italian,ITA305"+
	"\nITA  310,Intensive Advanced Italian I(ITALY),ITA310"+
	"\nITA  311,IntensiveAdvanced Italian II(ITALY),ITA311"+
	"\nITA  312,Italian Culture,ITA312"+
	"\nITA  325,Contemporary Italy,ITA325"+
	"\nITA  330,Study Abroad: Italian Grammar &Comp,ITA330"+
	"\nITA  331,Study Abroad: Italian Convers&Cultr,ITA331"+
	"\nITA  390,Topics in Italian,ITA390"+
	"\nITA  410,Contemporary Italian Literature,ITA410"+
	"\nITA  420,Italian Film,ITA420"+
	"\nITA  ELEC,Italian Elective,ITAELEC"+
	"\nITA  GNED,Italian General Ed,ITAGNED"+
	"\nLNG  390,Topics: Languages,LNG390"+
	"\nLNG  ELEC,Foreign Language Elective,LNGELEC"+
	"\nLNG  GNED,Language General Ed,LNGGNED"+
	"\nMAT  110,Basic College Mathematics,MAT110"+
	"\nMAT  114,Elem Statistics -Behavioral/Soc Sci,*MATSTAT"+
	"\nMAT  115,Elementary Statistics,*MATSTAT"+
	"\nMAT  116,College Algebra & Trigonometry,MAT116"+
	"\nMAT  118,Pre-Calculus,MAT118"+
	"\nMAT  129,Elementary Statistics for Business,*MATSTAT"+
	"\nMAT  136,Business Mathematics,MAT136"+
	"\nMAT  209,Math: ElemTeachers-NumberSenseOprtn,MAT209"+
	"\nMAT  210,Math: ElemTeachers-Algebra&Geomtry,MAT210"+
	"\nMAT  220,Calculus for Science & Business,MAT220"+
	"\nMAT  221,Calculus I,MAT221"+
	"\nMAT  221W,Foundations for Calculus Workshop,MAT221W"+
	"\nMAT  222,Calculus II,MAT222"+
	"\nMAT  223,Calculus III,MAT223"+
	"\nMAT  225,Statistics-Natural Sciences,*MATSTAT"+
	"\nMAT  228,Topics:Discrete Math forComputerSci,MAT228"+
	"\nMAT  229,Discrete Math Structures,*MAT229"+
	"\nMAT  230,Modern Algebra,MAT330"+
	"\nMAT  232,Introduction to Linear Algebra,MAT232"+
	"\nMAT  233,Creative Problem Solving,MAT233"+
	"\nMAT  234,Mathematics: A Cultural Approach,MAT234"+
	"\nMAT  235,Mathematical Modeling,MAT235"+
	"\nMAT  251,Modern Geometry,MAT251"+
	"\nMAT  320,Math for Secondary Teachers,MAT320"+
	"\nMAT  322,Symbolic Logic,*MAT322"+
	"\nMAT  324,History & Philosophy of Math,*MAT324"+
	"\nMAT  330,Modern Algebra - Ring Theory,MAT330"+
	"\nMAT  331,Theory of Numbers,MAT331"+
	"\nMAT  335,Modern Algebra - Group Theory,MAT335"+
	"\nMAT  336,Introduction to Operations Research,MAT336"+
	"\nMAT  342,Differential Equations,MAT342"+
	"\nMAT  345,Introduction to Real Analysis,MAT345"+
	"\nMAT  347,Complex Variables,MAT347"+
	"\nMAT  351,Modern Geometry,MAT251"+
	"\nMAT  356,General Topology,MAT356"+
	"\nMAT  361,Probability&Math Statistics I,MAT361"+
	"\nMAT  390,Topics in Mathematics,MAT390"+
	"\nMAT  470,Independent Study,MAT470"+
	"\nMAT  491,Mathematics Senior Seminar,MAT491"+
	"\nMAT  ELEC,Mathematics Electives,MATELEC"+
	"\nMAT  GNED,Mathematics General Ed,MATGNED"+
	"\nMAT  MAJR,Mathematics Major,MATMAJR"+
	"\nMUS  105,Achieving a Musical Insight,MUS105"+
	"\nMUS  107,History of Music & Healing,MUS107"+
	"\nMUS  108,Standard Repertoire,MUS108"+
	"\nMUS  109,Introduction to World Music,MUS109"+
	"\nMUS  164,History of Guitar,MUS164"+
	"\nMUS  197,Early Music History,MUS197"+
	"\nMUS  199,History of Music I,MUS199"+
	"\nMUS  200,History of Music II,MUS200"+
	"\nMUS  201,Early Music,MUS201"+
	"\nMUS  202,Music - Baroque & Classical,MUS202"+
	"\nMUS  203,Music in the Twentieth Century,MUS203"+
	"\nMUS  205,American Music,MUS205"+
	"\nMUS  208,Impressionism in Music & Arts,MUS208"+
	"\nMUS  209,History of Jazz,MUS209"+
	"\nMUS  224H,(H)Music & Society Through History,MUS224H"+
	"\nMUS  231,Experiential History of Orff,MUS231"+
	"\nMUS  232,Experiential History -Vocal Harmony,MUS232"+
	"\nMUS  233,Experiential History of Kodaly,MUS233"+
	"\nMUS  322H,(H)Music:Renaissance-Class,MUS322H"+
	"\nMUS  323H,(H)Music:Romantic to Present,MUS323H"+
	"\nMUS  324H,(H)Music & Society Through History,MUS224H"+
	"\nMUS  390,Special Topics in Music History,MUS390"+
	"\nMUS  471,Independent Study: Music History,MUS471"+
	"\nMUS  GNED,Music History - General Education,MUSGNED"+
	"\nPCS  253,Ethics and Civic Life,*PHI253"+
	"\nPCS  400,Philosophy of Leadership,*PHI400"+
	"\nPCS  499,Research Seminar,PCS499"+
	"\nPHI  100,Philosophy: The Pursuit of Wisdom,PHI100"+
	"\nPHI  102,Critical Thinking,PHI102"+
	"\nPHI  105,Concept of Self in Yogic Tradition,PHI105"+
	"\nPHI  110,Philosophy of Religion,PHI268"+
	"\nPHI  150,The Philosophy of Love,PHI150"+
	"\nPHI  160,Philosophy of Education,PHI260"+
	"\nPHI  201,Philosophical Persuasion,PHI201"+
	"\nPHI  203,The Philosophy of Education,PHI260"+
	"\nPHI  213,Ancient Greek Philosophy,PHI313"+
	"\nPHI  225H,(H) Civilized Ideas,PHI225H"+
	"\nPHI  231,Existentialism,PHI231"+
	"\nPHI  237,Rhetoric,*PHI237"+
	"\nPHI  241,Philosophy of Law,PHI241"+
	"\nPHI  250,Ethics: Theories and Principles,ETH250"+
	"\nPHI  251,Virtue Ethics,PHI251"+
	"\nPHI  252,Sexual Ethics,ETH252"+
	"\nPHI  253,Ethics and Civic Life,*PHI253"+
	"\nPHI  254,Topics in Social Ethics,ETH254"+
	"\nPHI  255,Environmental Ethics,ETH255"+
	"\nPHI  256,Medical Ethics,PHI256"+
	"\nPHI  257,Business Ethics,ETH257"+
	"\nPHI  258,Communication Ethics,*ETH258"+
	"\nPHI  260,Philosophy of Education,PHI260"+
	"\nPHI  268,Philosophy of Religion,PHI268"+
	"\nPHI  270,Buddhist Thought & Spirituality,*PHI270"+
	"\nPHI  275,Philosophy & the CreativeExperience,PHI275"+
	"\nPHI  280,Women and Philosophy,PHI280"+
	"\nPHI  281,Asian Philosophy,PHI281"+
	"\nPHI  290,Topics in Philosophy,PHI290"+
	"\nPHI  300,Zen and Now,PHI300"+
	"\nPHI  301,Philosophical Persuasion,PHI201"+
	"\nPHI  302,God and Philosophy,PHI268"+
	"\nPHI  305,Philosophy of Being,PHI305"+
	"\nPHI  307,Classical Political Theory,*POL307"+
	"\nPHI  308,Modern Political Theory,*POL308"+
	"\nPHI  310,Political Philosophy,*PHI310"+
	"\nPHI  313,Ancient Philosophy,PHI313"+
	"\nPHI  315,Medieval Philosophy,PHI315"+
	"\nPHI  316,\"Enlightenment Phil-17th,18th\",PHI316"+
	"\nPHI  317,Philosophy in 19th Century,PHI317"+
	"\nPHI  318,American Philosophy,PHI318"+
	"\nPHI  319,Contemporary Philosophy,PHI319"+
	"\nPHI  320,Asian Philosophy,PHI281"+
	"\nPHI  321,Existentialism,PHI231"+
	"\nPHI  322,Symbolic Logic,*MAT322"+
	"\nPHI  324,History & Philosophy of Math,*MAT324"+
	"\nPHI  325H,(H)FrenchThought&Civ: Anc-Early Mod,PHI225H"+
	"\nPHI  330,Philosophy of Science,PHI330"+
	"\nPHI  338,Process Philosophy,PHI338"+
	"\nPHI  340,Philosophy of Law,PHI241"+
	"\nPHI  342,Rhetoric: Art of Persuasion,*PHI237"+
	"\nPHI  344,Problems of Knowledge,PHI344"+
	"\nPHI  346,Existentialism and the Cinema,PHI346"+
	"\nPHI  352,Renaissance Philosophy,PHI352"+
	"\nPHI  355,Modern Philosophy:Descartes to Kant,PHI355"+
	"\nPHI  356,Freedom & Revolution:Philos -19th C,PHI356"+
	"\nPHI  357,Contemporary Philosophy,PHI357"+
	"\nPHI  380H,(H) Ethics: Theories & Applications,ETH280H"+
	"\nPHI  390,Advanced Topics in Philosophy,PHI390"+
	"\nPHI  400,Philosophy of Leadership,*PHI400"+
	"\nPHI  470,Independent Study,PHI470"+
	"\nPHI  490,Philosophy Symposium,PHI490"+
	"\nPHI  499,Research Seminar,PHI499"+
	"\nPHI  505,Advanced Medical Ethics,*ETH505"+
	"\nPHI  591,Independent Study,PHI591"+
	"\nPHI  ELEC,Philosophy Elective,PHIELEC"+
	"\nPHI  ETHC,Philosophy/Ethics General Education,PHIETHC"+
	"\nPHI  GNED,Philosophy General Ed,PHIGNED"+
	"\nPHI  MAJR,Philosophy Major,PHIMAJR"+
	"\nPHY  160,Physics for the Health Sciences,PHY160"+
	"\nPHY  188,College Physics I,PHY188"+
	"\nPHY  189,College Physics II,PHY189"+
	"\nPHY  270,General Physics I,PHY270"+
	"\nPHY  270L,General Physics I Lab,PHY270L"+
	"\nPHY  271,General Physics II,PHY271"+
	"\nPHY  280,Environmental Science Physics,PHY280"+
	"\nPHY  390,Topics in Physics,PHY390"+
	"\nPHY  ELEC,Physics Elective,PHYELEC"+
	"\nPHY  GEDL,Physics General Ed w/Lab,PHYGEDL"+
	"\nPHY  GNED,Physics General Ed (no Lab),PHYGNED"+
	"\nPOL  100,Fundamentals of Government,POL100"+
	"\nPOL  101,American National Government,POL101"+
	"\nPOL  103,American State/Local Government,POL103"+
	"\nPOL  106,Comparative Government & Politics I,POL106"+
	"\nPOL  107,ComparativeGovernment & Politics II,POL107"+
	"\nPOL  115,Introduction to Sustainability,POL115"+
	"\nPOL  200,Public Administration & Mod Society,*POL200"+
	"\nPOL  201,The Presidency and Congress,POL201"+
	"\nPOL  206,Politics of Developing Nations,POL206"+
	"\nPOL  209,Women in Politics,POL209"+
	"\nPOL  210,American Party Politics,POL210"+
	"\nPOL  213,Current World Issues,*POL213"+
	"\nPOL  225H,(HONORS) The Contemporary World,POL225H"+
	"\nPOL  234,History & Politics -European Integr,*HIS234"+
	"\nPOL  235,History & Politics of South Asia,*HIS235"+
	"\nPOL  236,History & Politics - Southeast Asia,*HIS236"+
	"\nPOL  290,\"Social Issues,PolicyContempThailand\",*SWK290"+
	"\nPOL  302,American Constitutional Law,POL302"+
	"\nPOL  303,International Relations,POL303"+
	"\nPOL  307,Classical Political Theory,*POL307"+
	"\nPOL  308,Modern Political Theory,*POL308"+
	"\nPOL  310,Political Philosophy,*PHI310"+
	"\nPOL  311,International Political Economy,POL311"+
	"\nPOL  319,ResearchMethHistorians&PolScientist,*HIS319"+
	"\nPOL  321,Terrorism,POL321"+
	"\nPOL  325,IntegrativeSem:SustainablePolicies,POL325"+
	"\nPOL  340,History & Politics of Middle East,*HIS340"+
	"\nPOL  390,Topics in Political Science,POL390"+
	"\nPOL  470,Independent Study,POL470"+
	"\nPOL  490,Political Science Seminar,POL490"+
	"\nPOL  ELEC,Pol Science Elective,POLELEC"+
	"\nPOL  GNED,Pol Science General Ed,POLGNED"+
	"\nPOL  MAJR,Pol Science Major,POLMAJR"+
	"\nPSY  111,General Psychology,PSY111"+
	"\nPSY  153,Psychology of Learning,PSY253"+
	"\nPSY  156,Personal Adjustment,PSY156"+
	"\nPSY  202,Introduction/Behavior Modification,PSY302"+
	"\nPSY  204,Developmental Psychology,PSY204"+
	"\nPSY  205,Child Psychology,PSY205"+
	"\nPSY  206,Adolescent Psychology,PSY206"+
	"\nPSY  209,Behavioral Analysis/Assessment,PSY309"+
	"\nPSY  213,Statistics for Behavioral Sciences,PSY213"+
	"\nPSY  228,Creativity,PSY228"+
	"\nPSY  236,Human Sexuality,PSY336"+
	"\nPSY  237,Psychology of Aging,*PSY237"+
	"\nPSY  245,Psychological Assessment,PSY245"+
	"\nPSY  251,Dynamics of Behavior,PSY351"+
	"\nPSY  253,Psychology of Learning,PSY253"+
	"\nPSY  256,Sensation and Perception,PSY356"+
	"\nPSY  260,Introduction:Comparative Psychology,PSY260"+
	"\nPSY  280,Survey of Mental Retardation,PSY280"+
	"\nPSY  301,Bio-psychology,PSY301"+
	"\nPSY  302,Introduction/Behavior Modification,PSY302"+
	"\nPSY  309,Behavioral Analysis Assessment,PSY309"+
	"\nPSY  310,Introduction to Experimental Design,PSY310"+
	"\nPSY  311,Experimental Psychology,PSY311"+
	"\nPSY  312,Advanced Experimental Psychology,PSY312"+
	"\nPSY  314,Cross-Cultural Psychology,PSY314"+
	"\nPSY  324,Social Psychology Seminar,PSY324"+
	"\nPSY  325,History/Systems of Psychology,PSY325"+
	"\nPSY  326,Abnormal Psychology,PSY326"+
	"\nPSY  329,Learning Disabilities,PSY329"+
	"\nPSY  332,Attention Deficit Disorders,PSY332"+
	"\nPSY  334,Psychology/Exceptional Child,PSY334"+
	"\nPSY  335,Exceptionality: Ident & Mgmt in Ed,PSY335"+
	"\nPSY  336,Human Sexuality,PSY336"+
	"\nPSY  337,Psychology of Criminal Profiling,*PSY337"+
	"\nPSY  338,Police Psychology,PSY338"+
	"\nPSY  339,Forensic Psychology,*PSY339"+
	"\nPSY  351,Group Dynamics,PSY351"+
	"\nPSY  352,Psychology of Women,PSY352"+
	"\nPSY  353,Personality Theories,PSY353"+
	"\nPSY  354,Psychosomatics,PSY354"+
	"\nPSY  355,Death and Dying,PSY355"+
	"\nPSY  356,Sensation and Perception,PSY356"+
	"\nPSY  358,Dreaming and Sleeping,PSY358"+
	"\nPSY  361,Consumer Psychology,PSY361"+
	"\nPSY  362,Organizational Psychology,PSY362"+
	"\nPSY  365,Cognitive Psychology,PSY365"+
	"\nPSY  367,Social Cognition,PSY367"+
	"\nPSY  368,Psychopharmacology,PSY368"+
	"\nPSY  372,Human Factors Psychology,PSY372"+
	"\nPSY  390,Topics in Psychology,PSY390"+
	"\nPSY  400,Colloquium,PSY400"+
	"\nPSY  470,Individual Research/Psychology,PSY470"+
	"\nPSY  472,Independent Study,PSY472"+
	"\nPSY  492,Senior Seminar,PSY492"+
	"\nPSY  ELEC,Psychology Elective,PSYELEC"+
	"\nPSY  GNED,Psychology General Ed,PSYGNED"+
	"\nPSY  MAJR,Psychology Major,PSYMAJR"+
	"\nSOC  101,Introductory Sociology,SOC101"+
	"\nSOC  152,Sociology of the Family,SOC152"+
	"\nSOC  161,Intro to Cultural Anthropology,SOC161"+
	"\nSOC  166,Social Psychology,SOC166"+
	"\nSOC  200,Public Admin & Modern Society,*POL200"+
	"\nSOC  203,\"People, Places, Things\",SOC203"+
	"\nSOC  211,Social Problems,SOC211"+
	"\nSOC  222,\"Media, Culture & Society\",*SOC222"+
	"\nSOC  225H,(H)Sociological Imagination,SOC225H"+
	"\nSOC  232,Sociology of Inequality,SOC232"+
	"\nSOC  235,Juvenile Delinquency,SOC235"+
	"\nSOC  236,Social Change,SOC236"+
	"\nSOC  237,Deviant Behavior/Soc. Control,*CRJ237"+
	"\nSOC  238,Criminology,SOC238"+
	"\nSOC  240,Sustaining Societies: Hist Perpectv,*HIS240"+
	"\nSOC  241,\"Business, Labor & Society\",SOC241"+
	"\nSOC  245,Cities and Suburbs,SOC245"+
	"\nSOC  251,The Global Community,SOC251"+
	"\nSOC  252,Human Origins,*SOC354"+
	"\nSOC  253,Aging in Society,*SOC253"+
	"\nSOC  254,Ancient Worlds,*SOC254"+
	"\nSOC  256,Introduction to Archeology,SOC256"+
	"\nSOC  257,Human Origins,*SOC354"+
	"\nSOC  258,The Native Americans,SOC258"+
	"\nSOC  262,Sociology of Death & Dying,*SOC262"+
	"\nSOC  266,\"Birth of the Gods:Ideas,Images,Icon\",SOC266"+
	"\nSOC  268,Sociology of Disabilities,SOC268"+
	"\nSOC  271,Sociology of Healthcare,SOC271"+
	"\nSOC  272,Sociology of Education,SOC272"+
	"\nSOC  283,Law and Society,*CRJ283"+
	"\nSOC  290,\"Social Issues,PolicyContempThailand\",*SWK290"+
	"\nSOC  300,Basics-Social & Behavioral Research,SOC300"+
	"\nSOC  301,Social Theory I - Foundations,SOC301"+
	"\nSOC  302,Social Theory II Contemporary,SOC302"+
	"\nSOC  311,Methods of Social Research,SOC311"+
	"\nSOC  322,Applied Sociological ResearchMethod,SOC422"+
	"\nSOC  325H,(H)Sociological Imagination,SOC225H"+
	"\nSOC  331,Race & Ethnic Relations,SOC331"+
	"\nSOC  333,Alcoholism and Drug Abuse,SOC333"+
	"\nSOC  350,Social Roles-Women&Men,SOC350"+
	"\nSOC  354,Human Origins,*SOC354"+
	"\nSOC  360,Sustainable Communities,SOC360"+
	"\nSOC  370,\"African, Asian & Latino Experience\",SOC370"+
	"\nSOC  390,Topics/Sociology/Anthropology,SOC390"+
	"\nSOC  395,Intro to Computing With SPSS,*SOC395"+
	"\nSOC  397,Adv Computer Stat Analysis & Report,SOC497"+
	"\nSOC  400,Advanced Research Methods-Sociology,SOC400"+
	"\nSOC  422,Applied Sociological ResearchMethod,SOC422"+
	"\nSOC  470,Independent Study,SOC470"+
	"\nSOC  471,Readings/Sociology/Anthropology,SOC471"+
	"\nSOC  472,Readings/Sociology/Anthropology,SOC472"+
	"\nSOC  473,Readings/Sociology/Anthropology,SOC473"+
	"\nSOC  490,Sociology Seminar,SOC490"+
	"\nSOC  497,Adv Computer Stat Analysis & Report,SOC497"+
	"\nSOC  ELEC,Sociology Elective,SOCELEC"+
	"\nSOC  GNED,Sociology General Ed,SOCGNED"+
	"\nSOC  MAJR,Sociology Major,SOCMAJR"+
	"\nSPA  101,Beginning Spanish I,SPA101"+
	"\nSPA  102,Beginning Spanish II,SPA102"+
	"\nSPA  103,Begin Spanish-Health Care Prof I,SPA103"+
	"\nSPA  104,Begin Spanish-Health Care Prof II,SPA104"+
	"\nSPA  105,Spanish-Social Service Prof I,SPA105"+
	"\nSPA  106,Spanish-Social Service Prof II,SPA106"+
	"\nSPA  107,Spanish for Business I,SPA107"+
	"\nSPA  108,Spanish for Business II,SPA108"+
	"\nSPA  109,Beginning Spanish forTeachers I,SPA109"+
	"\nSPA  110,Beginning Spanish for Teachers II,SPA110"+
	"\nSPA  111,Spanish for Law Enforcement I,SPA111"+
	"\nSPA  112,Spanish for Law Enforcement II,SPA112"+
	"\nSPA  113,Intensive Elem Spanish I-(SPAIN),SPA113"+
	"\nSPA  114,Intensive Elem Spanish II (SPAIN),SPA114"+
	"\nSPA  201,Beginning Spanish III,SPA201"+
	"\nSPA  203,Intensive Intermed Spanish I(SPAIN),SPA203"+
	"\nSPA  204,Intensive Intermed SpanishII(SPAIN),SPA204"+
	"\nSPA  215,Intermediate Spanish Conversation I,SPA215"+
	"\nSPA  216,Spanish Conversation II,SPA216"+
	"\nSPA  220,Intermediate Spanish,SPA220"+
	"\nSPA  235,Spanish Experience Abroad,SPA235"+
	"\nSPA  250,Latino Culture in the United States,SPA250"+
	"\nSPA  305,Grammar for Communication,SPA305"+
	"\nSPA  306,Writing in Spanish,SPA306"+
	"\nSPA  307,Reading in Spanish,SPA307"+
	"\nSPA  309,Spanish for Heritage Students,SPA309"+
	"\nSPA  310,Conversation Skills,SPA310"+
	"\nSPA  311,Writing Skills,SPA311"+
	"\nSPA  312,\"Hispanic World-Lit, Art &PopCulture\",SPA312"+
	"\nSPA  313,Cultures of Spain,SPA313"+
	"\nSPA  314,Cultures of  Latin America,SPA314"+
	"\nSPA  320,\"Hispanic World- Lit,Art,&PopCulture\",SPA320"+
	"\nSPA  321,Masterpieces of Spanish Literature,SPA417"+
	"\nSPA  322,Masterpieces Latin Amer Literature,SPA418"+
	"\nSPA  330,Study Abroad: Spanish Grammar&Comp,SPA330"+
	"\nSPA  331,Study Abroad: Spanish Convers&Cultr,SPA331"+
	"\nSPA  333,Intensive AdvancedSpanish I (SPAIN),SPA333"+
	"\nSPA  334,Intensive AdvancedSpanish II(SPAIN),SPA334"+
	"\nSPA  341,Advanced Spanish Grammar & Comp,SPA341"+
	"\nSPA  351,Hispanic Lit:MiddleAges-ContermpLit,SPA351"+
	"\nSPA  352,LatinAmerLit:Pre-Columbian-21stCent,SPA352"+
	"\nSPA  353,Latin American Short Story,SPA353"+
	"\nSPA  370,Latin Amer &Spanish Lit in Translat,SPA370"+
	"\nSPA  381,Spanish Linguistics,SPA381"+
	"\nSPA  390,Topics in Spanish,SPA390"+
	"\nSPA  405,Adv Spanish Grammar & Composition,SPA341"+
	"\nSPA  406,Advanced Spanish Conversation,SPA406"+
	"\nSPA  407,Intensive AdvancedSpanish I (SPAIN),SPA333"+
	"\nSPA  408,Intensive AdvancedSpanish II(SPAIN),SPA334"+
	"\nSPA  409,Translation,SPA409"+
	"\nSPA  411,Contemporary Spanish Literature,SPA411"+
	"\nSPA  412,Contemporary Latin Amer Literature,SPA412"+
	"\nSPA  417,Masterpieces of Spanish Literature,SPA417"+
	"\nSPA  418,Masterpieces -Latin Amer Literature,SPA418"+
	"\nSPA  421,Spanish Theatre,SPA421"+
	"\nSPA  425,Hispanic Women Writers,SPA425"+
	"\nSPA  427,Hispanic World Through Film,SPA427"+
	"\nSPA  429,Post Franco Spain,SPA429"+
	"\nSPA  470,Independent Study,SPA470"+
	"\nSPA  490,Research-HispanicLang & Cult-Sem I,SPA490"+
	"\nSPA  491,Hispanic Lang & Cultures - Sem II,SPA491"+
	"\nSPA  ELEC,Spanish Elective,SPAELEC"+
	"\nSPA  GNED,Spanish General Ed,SPAGNED"+
	"\nSPA  MAJR,Spanish Major,SPAMAJR"+
	"\nSWK  241,Social Welfare Policy I,SWK241"+
	"\nSWK  242,Social Welfare Policy II,SWK342"+
	"\nSWK  243,Human Behavior in the Soc Environmt,SWK343"+
	"\nSWK  290,\"Social Issues,PolicyContempThailand\",*SWK290"+
	"\nSWK  342,Social Welfare Policy II,SWK342"+
	"\nSWK  343,Human Behavior/Social Environment I,SWK343"+
	"\nSWK  344,Human Behavior/SocialEnvironment II,SWK344"+
	"\nSWK  345,Contemporary Issues/Social Work,SWK345"+
	"\nSWK  347,Spirituality&Social Work,SWK347"+
	"\nSWK  352,HIV and AIDS,SWK352"+
	"\nSWK  353,Substance Abuse,SWK353"+
	"\nSWK  354,ResilientPractitioner:Coping-Stress,SWK354"+
	"\nSWK  390,Topics in Social Work,SWK390"+
	"\nSWK  454,Proposal Writing for Human Services,SWK454"+
	"\nSWK  455,Technology & Social Work,SWK455"+
	"\nSWK  456,Evidence Based Practice,SWK456"+
	"\nSWK  470,Independent Study,SWK470"+
	"\nSWK  ELEC,Social Work Elective,SWKELEC"+
	"\nSWK  MAJR,Social Work Major Requirement,SWKMAJR"+
	"\nTHE  100,The Bible,THE100"+
	"\nTHE  101,Major Religious Voices,THE101"+
	"\nTHE  104,What Is Religion?,THE104"+
	"\nTHE  220H,\"(H)Saints, Sinners and God\",THE220H"+
	"\nTHE  221,The New Testament,THE221"+
	"\nTHE  225,Topics: Theology & Religion,THE225"+
	"\nTHE  227,The God Question,THE227"+
	"\nTHE  230,Meaning of Jesus,THE230"+
	"\nTHE  241,Religion & American Tradition,THE241"+
	"\nTHE  242,Women and Christianity,THE242"+
	"\nTHE  251,Religious Thought in  Low Countries,THE251"+
	"\nTHE  252,Contemporary Catholicism,THE252"+
	"\nTHE  254,Protestantism,THE254"+
	"\nTHE  257,Black American Religious Experience,THE257"+
	"\nTHE  260,Religions of the West,THE260"+
	"\nTHE  262,Call to Holiness: Catholic Church,THE262"+
	"\nTHE  263,Judaism,THE263"+
	"\nTHE  265,Islam,THE265"+
	"\nTHE  270,Buddhist Thought & Spirituality,*PHI270"+
	"\nTHE  273,Church in History & Culture,THE273"+
	"\nTHE  278,Ethics: Method and Issues,THE278"+
	"\nTHE  279,Religion & Global Moral Issues,*ETH279"+
	"\nTHE  281,Religions of the East,THE281"+
	"\nTHE  282,Ethics and Criminal Justice,THE282"+
	"\nTHE  285,Religious Themes in the Cinema,THE285"+
	"\nTHE  288,Ethics and Health Care,ETH288"+
	"\nTHE  300,Scriptural Issues,THE300"+
	"\nTHE  320H,(H)Saints & Sinners:Relig/Spiritual,THE220H"+
	"\nTHE  325,The God Question,THE227"+
	"\nTHE  330,Meaning of Jesus,THE230"+
	"\nTHE  340,Symbol and Celebration,THE340"+
	"\nTHE  345,Love & Sexuality in Marriage,THE345"+
	"\nTHE  350,\"God, Satan, and Fiction\",THE350"+
	"\nTHE  355,Mysticism,THE355"+
	"\nTHE  370,Theological Issues,THE370"+
	"\nTHE  390,Topics in Theology,THE390"+
	"\nTHE  470,Independent Study,THE470"+
	"\nTHE  491,Seminar,THE491"+
	"\nTHE  505,Advanced Medical Ethics,*ETH505"+
	"\nTHE  ELEC,Theology Elective,THEELEC"+
	"\nTHE  ETHC,Theology/Ethics General Ed,THEETHC"+
	"\nTHE  GNED,Theology General Ed,THEGNED"+
	"\nTHE  MAJR,Theology Major,THEMAJR";

	var LASCourses = LASString.split("\n");
	var LASCodes = [];

	for(var i = 0; i < LASCourses.length; i++)
	{
		LASCodes.push(LASCourses[i].substring(0,LASCourses[i].indexOf(",")));
	}

	namespace.exports = LASCodes;

})(provide("las"));

//alert(LASString.substring(0,1000) + "\n" + codes[948]);
