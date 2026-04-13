import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Liveticker from './components/Liveticker';
import PageLoader from './components/PageLoader';

// Lazy-loaded routes — triggers loading indicator if chunk takes >instant (AC #7)
const MatchSchedule = lazy(() => import('./components/Matchschedule'));
const MatchDetail   = lazy(() => import('./components/MatchDetail'));
const Squad         = lazy(() => import('./components/Squad'));
const Stats         = lazy(() => import('./components/Stats'));
const News          = lazy(() => import('./components/News'));
const NewsDetail    = lazy(() => import('./components/NewsDetail'));
const Polls         = lazy(() => import('./components/Polls'));
const Forum         = lazy(() => import('./components/Forum'));
const Social        = lazy(() => import('./components/Social'));
const Login         = lazy(() => import('./components/Login'));
const LiveMatchCard = lazy(() => import('./components/LiveMatchCard'));

const players = [
  { id: 1,  name: "Virat Kohli",         role: "Top Order Batter",    jerseyNumber: "18", image: "https://pngfre.com/wp-content/uploads/virat-kohli-53-1639x2048.png" },
  { id: 2,  name: "Glenn Maxwell",        role: "All-Rounder",         jerseyNumber: "32", image: "https://documents.iplt20.com/ipl/IPLHeadshot2025/28.png" },
  { id: 3,  name: "Mohammed Siraj",       role: "Bowler",              jerseyNumber: "73", image: "https://p.imgci.com/db/PICTURES/CMS/316600/316613.png" },
  { id: 4,  name: "Faf du Plessis",       role: "Top Order Batter",    jerseyNumber: "25", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316586.png" },
  { id: 5,  name: "Harshal Patel",        role: "Bowler",              jerseyNumber: "9",  image: "https://p.imgci.com/db/PICTURES/CMS/316500/316587.png" },
  { id: 6,  name: "Shivam Dube",          role: "All-Rounder",         jerseyNumber: "44", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316589.png" },
  { id: 7,  name: "Anuj Rawat",           role: "Wicketkeeper Batter", jerseyNumber: "16", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316590.png" },
  { id: 8,  name: "Dinesh Karthik",       role: "Wicketkeeper Batter", jerseyNumber: "21", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316591.png" },
  { id: 9,  name: "Shahbaz Ahmed",        role: "All-Rounder",         jerseyNumber: "28", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316593.png" },
  { id: 11, name: "Yuzvendra Chahal",     role: "Bowler",              jerseyNumber: "3",  image: "https://p.imgci.com/db/PICTURES/CMS/316500/316595.png" },
  { id: 12, name: "Dushmanta Chameera",   role: "Bowler",              jerseyNumber: "99", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316596.png" },
  { id: 13, name: "Suyash Prabhudessai",  role: "Batter",              jerseyNumber: "12", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316597.png" },
  { id: 14, name: "Rishabh Pant",         role: "Wicketkeeper Batter", jerseyNumber: "35", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316598.png" },
  { id: 15, name: "David Willey",         role: "All-Rounder",         jerseyNumber: "26", image: "https://p.imgci.com/db/PICTURES/CMS/316500/316599.png" },
  { id: 16, name: "Josh Hazlewood",       role: "Bowler",              jerseyNumber: "38", image: "https://documents.iplt20.com/ipl/IPLHeadshot2026/36.png" },
  { id: 17, name: "Siddarth Kaul",        role: "Bowler",              jerseyNumber: "24", image: "https://documents.iplt20.com/ipl/IPLHeadshot2023/64.png" },
  { id: 18, name: "Rajat Patidar",        role: "Batter",              jerseyNumber: "45", image: "https://documents.iplt20.com/ipl/IPLHeadshot2026/597.png" },
];

const matches = [
  { id: 1, opponent: "CSK", date: "April 05", venue: "M. A. Chidambaram", status: "COMPLETED", result: "RCB won by 27 runs", score: "RCB 218/5 | CSK 191/7" },
  { id: 2, opponent: "MI",  date: "April 11", time: "19:30", venue: "Wankhede Stadium", status: "LIVE", score: "RCB 142/3 (15.2 ov)" },
  { id: 3, opponent: "KKR", date: "April 14", time: "20:00", venue: "M. Chinnaswamy",   status: "UPCOMING", type: "HOME" },
];

const teamStats = {
  currentSeason: { played: 10, wins: 6, losses: 4, nrr: "+0.454", points: 12, position: 3 },
  allTimeRecords: [
    { label: "Highest Team Score", value: "263/5", vs: "Pune Warriors" },
    { label: "Most Runs",          value: "7,263", player: "Virat Kohli" },
    { label: "Most Wickets",       value: "139",   player: "Yuzvendra Chahal" },
  ],
  headToHead: [
    { opponent: "MI",  wins: 14, losses: 19 },
    { opponent: "CSK", wins: 10, losses: 21 },
    { opponent: "KKR", wins: 14, losses: 18 },
  ],
};

const newsArticles = [
  {
    id: 1, title: "King Kohli Reigns Supreme at Chinnaswamy", author: "RCB Media Cell",
    date: "2026-04-10", category: "Match Reports",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZ2CvNbMaZ-TRfLggZCKR5bZmt0qc5XoDwg&s",
    summary: "Virat Kohli's masterclass leads RCB to a comfortable win...",
    content: "In a spectacular display of batting prowess, Virat Kohli notched up his 8th IPL century. The atmosphere at the Chinnaswamy was electric as the home team dominated from the first ball...",
  },
  {
    id: 2, title: "Squad Update: New International Signing", author: "Team Admin",
    date: "2026-04-08", category: "Team Announcements",
    image: "https://static.vecteezy.com/system/resources/previews/075/244/946/non_2x/royal-challengers-bengaluru-logo-rcb-logo-icon-on-transparent-background-free-png.png",
    summary: "RCB announces the arrival of a new pace sensation...",
    content: "The RCB management has officially confirmed the signing of a young pace bowler to bolster the death bowling attack for the remainder of the season.",
  },
  {
    id: 3, title: "Code of Conduct Breach: Player Fined", author: "Team Admin",
    date: "2026-04-09", category: "Team Announcements",
    image: "https://documents.iplt20.com/bcci/articles/1748028405_Website_Thumbnails.png",
    summary: "A player has been fined for violating the code of conduct...",
    content: "The RCB management has announced that a player will be fined for their actions during the recent match.",
  },
];

const initialPolls = [
  {
    id: 1, question: "Who should be RCB's MVP for this season?", status: "ACTIVE", totalVotes: 3420,
    options: [
      { id: 'a', text: "Virat Kohli",      votes: 1240 },
      { id: 'b', text: "Faf du Plessis",   votes: 850  },
      { id: 'c', text: "Glenn Maxwell",    votes: 920  },
      { id: 'd', text: "Mohammed Siraj",   votes: 410  },
    ],
  },
  {
    id: 2, question: "Will RCB make it to the Playoffs this year?", status: "CLOSED", totalVotes: 2550,
    options: [
      { id: 'y', text: "Yes, definitely!",        votes: 2100 },
      { id: 'n', text: "It's going to be tough",  votes: 450  },
    ],
  },
];

const initialThreads = [
  {
    id: 1, title: "Thoughts on the playing XI for tomorrow?", author: "ViratFan_18",
    category: "Match Discussion", timestamp: "2026-04-11 14:30",
    content: "I think we need to bring in an extra spinner given the pitch conditions.",
    replies: [{ id: 101, author: "Rahul_RCB", text: "Totally agree, the pitch looks dry.", timestamp: "2026-04-11 15:00" }],
  },
  {
    id: 2, title: "Who is your favorite RCB legend?", author: "AbD_Forever",
    category: "General RCB Chat", timestamp: "2026-04-10 10:00",
    content: "For me, it will always be AB de Villiers. The 360-degree shots were insane!",
    replies: [],
  },
];

const socialPosts = [
  {
    id: 1, platform: "X", handle: "@RCBTweets", timestamp: "2h ago", likes: "12.4K", retweets: "2.1K",
    content: "The roar is back! 🦁 Prep for tonight's clash at the Chinnaswamy is in full swing. #PlayBold #IPL2026",
  },
  {
    id: 2, platform: "Instagram", handle: "@royalchallengersbengaluru", timestamp: "5h ago", likes: "450K", comments: "3.2K",
    content: "Golden hour at the fortress. 🏟️✨ Ready for a night of high-octane cricket!",
  },
];

function App() {
  const [user, setUser] = useState(null);
  const [liveMatch, setLiveMatch] = useState({
    id: 2, opponent: "MI", status: "LIVE",
    runs: 142, wickets: 3, overs: 15.2,
    batter: "Virat Kohli", batterRuns: 64,
    bowler: "Jasprit Bumrah", nrr: "9.26",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatch(prev => ({
        ...prev,
        runs: prev.runs + Math.floor(Math.random() * 4),
        overs: parseFloat((prev.overs + 0.1).toFixed(1)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <div className="min-h-screen bg-[#0b0b0b] text-white">
        <Liveticker />
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          {/* HOME */}
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}>
            <main className="pt-28 pb-16 max-w-7xl mx-auto px-4">
              <h1 className="text-5xl sm:text-6xl font-black italic uppercase leading-none mb-10">
                The Pursuit of <span className="text-red-600">Greatness.</span>
              </h1>
              <LiveMatchCard match={liveMatch} />
              <div className="mt-12">
                <MatchSchedule matches={matches} />
              </div>
            </main>
            </Suspense>
          } />

          <Route path="/schedule"  element={<Suspense fallback={<PageLoader />}><div className="pt-28 max-w-7xl mx-auto px-4"><MatchSchedule matches={matches} /></div></Suspense>} />
          <Route path="/match/:id" element={<Suspense fallback={<PageLoader />}><MatchDetail matches={matches} /></Suspense>} />
          <Route path="/squad"     element={<Suspense fallback={<PageLoader />}><Squad players={players} /></Suspense>} />
          <Route path="/stats"     element={<Suspense fallback={<PageLoader />}><Stats stats={teamStats} /></Suspense>} />
          <Route path="/news"      element={<Suspense fallback={<PageLoader />}><News articles={newsArticles} /></Suspense>} />
          <Route path="/news/:id"  element={<Suspense fallback={<PageLoader />}><NewsDetail articles={newsArticles} /></Suspense>} />
          <Route path="/polls"     element={<Suspense fallback={<PageLoader />}><Polls pollsData={initialPolls} isLoggedIn={!!user} /></Suspense>} />
          <Route path="/forum"     element={<Suspense fallback={<PageLoader />}><Forum initialThreads={initialThreads} isLoggedIn={!!user} /></Suspense>} />
          <Route path="/social"    element={<Suspense fallback={<PageLoader />}><Social posts={socialPosts} /></Suspense>} />
          <Route path="/login"     element={<Suspense fallback={<PageLoader />}><Login onLogin={handleLogin} /></Suspense>} />
          <Route path="/admin"     element={<div className="pt-40 px-10 text-4xl font-bold text-red-600 text-center">Admin Dashboard</div>} />
          <Route path="*"          element={<div className="pt-40 px-10 text-2xl text-center">Coming Soon!</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
