import { create } from 'zustand';
import { Player } from '../types/player';
import { Team } from '../types/team';
import { AuctionState, AuctionPhase, BidRecord, AuctionFeedMessage } from '../types/auction';
import { Match, LeagueStanding, SeasonAwards } from '../types/season';
import { ManagerProfile, Achievement } from '../types/career';
import { INITIAL_TEAMS } from '../data/teams';
import { INITIAL_PLAYERS } from '../data/players';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { soundService } from '../services/soundService';
import { getNextBidAmount, getAIDecision } from '../services/aiBiddingEngine';
import { 
  generateLeagueSchedule, 
  simulateSingleMatch, 
  calculateStandings, 
  computeSeasonAwards 
} from '../services/seasonSimulator';
import { StorageService, GameSettings, DEFAULT_SETTINGS } from '../services/storageService';
import confetti from 'canvas-confetti';

export type GameScreen = 
  | 'menu' 
  | 'teams' 
  | 'auction' 
  | 'squad' 
  | 'season';

export interface GameStoreState {
  // Navigation
  currentScreen: GameScreen;
  setScreen: (screen: GameScreen) => void;

  // Franchises & Players
  userTeamId: string;
  teams: Team[];
  players: Player[];
  userTeam: () => Team | undefined;

  // Auction State
  auction: AuctionState;
  selectedScoutPlayer: Player | null;

  // Season State
  leagueMatches: Match[];
  currentMatchIndex: number;
  standings: LeagueStanding[];
  playoffMatches: Match[];
  playoffStage: 'not_started' | 'qualifier_1' | 'eliminator' | 'qualifier_2' | 'final' | 'completed';
  championTeam: Team | null;
  seasonAwards: SeasonAwards | null;
  activeScorecardMatch: Match | null;

  // Career & Profile
  profile: ManagerProfile;
  achievements: Achievement[];
  settings: GameSettings;

  // Modals
  isSettingsOpen: boolean;
  isScoutModalOpen: boolean;
  isAuctionSummaryOpen: boolean;
  isMatchModalOpen: boolean;
  isTrophyModalOpen: boolean;

  // Actions
  selectTeam: (teamId: string) => void;
  startAuction: () => void;
  placeHumanBid: (amount?: number) => void;
  passCurrentPlayer: () => void;
  nextAuctionPlayer: () => void;
  autoCompleteAuction: () => void;
  scoutPlayer: (player: Player) => boolean;
  tickAuctionTimer: () => void;
  triggerAIBidDecision: () => void;

  // Squad Management
  updateStartingXI: (newXI: string[]) => void;
  setCaptain: (playerId: string) => void;
  setWicketkeeper: (playerId: string) => void;

  // Season Actions
  startSeason: () => void;
  simulateNextMatch: () => Match | null;
  simulateAllLeagueMatches: () => void;
  progressPlayoffs: () => void;
  viewMatchScorecard: (match: Match) => void;
  startNextSeason: () => void;

  // Achievement check
  unlockAchievement: (achievementId: string) => void;

  // Settings & Sound
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  toggleSound: () => void;
  toggleTheme: () => void;
  resetAllGameData: () => void;

  // Modal setters
  setSettingsOpen: (open: boolean) => void;
  setScoutModalOpen: (open: boolean, player?: Player) => void;
  setAuctionSummaryOpen: (open: boolean) => void;
  setMatchModalOpen: (open: boolean) => void;
  setTrophyModalOpen: (open: boolean) => void;
}

const initialSettings = StorageService.loadSettings();
if (typeof document !== 'undefined') {
  if (initialSettings.theme === 'night') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('day');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('day');
  }
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  currentScreen: 'menu',
  setScreen: (screen) => set({ currentScreen: screen }),

  userTeamId: 'mumbai-meteors',
  teams: JSON.parse(JSON.stringify(INITIAL_TEAMS)),
  players: JSON.parse(JSON.stringify(INITIAL_PLAYERS)),
  userTeam: () => get().teams.find(t => t.id === get().userTeamId),

  auction: {
    currentSetIndex: 0,
    currentPlayerIndex: 0,
    currentPlayer: null,
    currentBid: 0,
    highestBidderId: null,
    highestBidderName: null,
    bidHistory: [],
    phase: 'idle',
    timerSeconds: 10,
    isPaused: false,
    totalPlayersAuctioned: 0,
    feedMessages: [],
    auctionHistory: [],
  },
  selectedScoutPlayer: null,

  leagueMatches: [],
  currentMatchIndex: 0,
  standings: [],
  playoffMatches: [],
  playoffStage: 'not_started',
  championTeam: null,
  seasonAwards: null,
  activeScorecardMatch: null,

  profile: StorageService.loadProfile(),
  achievements: StorageService.loadAchievements(INITIAL_ACHIEVEMENTS),
  settings: StorageService.loadSettings(),

  isSettingsOpen: false,
  isScoutModalOpen: false,
  isAuctionSummaryOpen: false,
  isMatchModalOpen: false,
  isTrophyModalOpen: false,

  selectTeam: (teamId: string) => {
    const teams = get().teams.map(t => ({
      ...t,
      personality: t.id === teamId ? 'Human' as const : t.personality
    }));
    set({ userTeamId: teamId, teams });
  },

  startAuction: () => {
    const players = get().players;
    if (players.length === 0) return;

    const firstPlayer = players[0];
    const initialMessage: AuctionFeedMessage = {
      id: 'msg-start',
      text: `Auctioneer: "Ladies and gentlemen, welcome to the Premier League Mega Auction! First up: ${firstPlayer.name} (${firstPlayer.role}, Base: ₹${firstPlayer.basePrice} Cr)."`,
      type: 'system',
      timestamp: Date.now(),
    };

    set({
      currentScreen: 'auction',
      auction: {
        currentSetIndex: 0,
        currentPlayerIndex: 0,
        currentPlayer: firstPlayer,
        currentBid: 0,
        highestBidderId: null,
        highestBidderName: null,
        bidHistory: [],
        phase: 'bidding',
        timerSeconds: 10,
        isPaused: false,
        totalPlayersAuctioned: 0,
        feedMessages: [initialMessage],
        auctionHistory: [],
      }
    });

    soundService.playGavel();

    // Trigger initial AI check
    setTimeout(() => {
      get().triggerAIBidDecision();
    }, 1200);
  },

  placeHumanBid: (customAmount?: number) => {
    const { auction, userTeamId, teams, unlockAchievement } = get();
    if (auction.phase !== 'bidding' && auction.phase !== 'going_once' && auction.phase !== 'going_twice') return;
    if (!auction.currentPlayer) return;

    const humanTeam = teams.find(t => t.id === userTeamId);
    if (!humanTeam) return;

    const nextAmount = customAmount || getNextBidAmount(auction.currentBid, auction.currentPlayer.basePrice);

    // Purse check
    if (nextAmount > humanTeam.currentPurse) {
      alert(`Insufficient purse! Your remaining purse is ₹${humanTeam.currentPurse.toFixed(2)} Cr.`);
      return;
    }

    soundService.playBidSound(true);

    const bidRecord: BidRecord = {
      teamId: humanTeam.id,
      teamName: humanTeam.name,
      amount: nextAmount,
      timestamp: Date.now(),
      isHuman: true,
    };

    const feedMsg: AuctionFeedMessage = {
      id: `msg-${Date.now()}`,
      text: `${humanTeam.name} bids ₹${nextAmount.toFixed(2)} Cr for ${auction.currentPlayer.name}!`,
      type: 'bid',
      teamId: humanTeam.id,
      timestamp: Date.now(),
    };

    set({
      auction: {
        ...auction,
        currentBid: nextAmount,
        highestBidderId: humanTeam.id,
        highestBidderName: humanTeam.name,
        bidHistory: [bidRecord, ...auction.bidHistory],
        timerSeconds: 10,
        phase: 'bidding',
        feedMessages: [feedMsg, ...auction.feedMessages.slice(0, 40)],
      }
    });

    // Achievement check: Record Bid > 18 Cr
    if (nextAmount >= 18.0) {
      unlockAchievement('ach-record-bid');
    }

    // Schedule AI counter-bid check
    setTimeout(() => {
      get().triggerAIBidDecision();
    }, 1400);
  },

  triggerAIBidDecision: () => {
    const { auction, teams, players, userTeamId } = get();
    if (auction.phase !== 'bidding' && auction.phase !== 'going_once' && auction.phase !== 'going_twice') return;
    if (!auction.currentPlayer) return;

    // Remaining pool for scarcity check
    const remainingInPool = players.slice(auction.currentPlayerIndex + 1);

    // Find AI teams that want to bid
    const candidates: { team: Team; nextBidAmount: number; delayMs: number; reason: string }[] = [];

    teams.forEach(team => {
      if (team.id === userTeamId) return; // Skip human team
      if (team.id === auction.highestBidderId) return; // Skip current leader

      const decision = getAIDecision(
        team,
        auction.currentPlayer!,
        auction.currentBid,
        auction.highestBidderId,
        remainingInPool
      );

      if (decision.shouldBid) {
        candidates.push({
          team,
          nextBidAmount: decision.nextBidAmount,
          delayMs: decision.delayMs,
          reason: decision.reason
        });
      }
    });

    if (candidates.length === 0) {
      // No AI wants to outbid
      return;
    }

    // Pick candidate with fastest decision / highest enthusiasm
    candidates.sort((a, b) => a.delayMs - b.delayMs);
    const chosen = candidates[0];

    setTimeout(() => {
      const currentAuction = get().auction;
      // Re-verify phase hasn't changed
      if (currentAuction.phase !== 'bidding' && currentAuction.phase !== 'going_once' && currentAuction.phase !== 'going_twice') return;
      if (currentAuction.highestBidderId === chosen.team.id) return;

      const updatedNextAmount = getNextBidAmount(currentAuction.currentBid, currentAuction.currentPlayer!.basePrice);
      if (updatedNextAmount > chosen.team.currentPurse) return;

      soundService.playBidSound(false);

      const bidRecord: BidRecord = {
        teamId: chosen.team.id,
        teamName: chosen.team.name,
        amount: updatedNextAmount,
        timestamp: Date.now(),
        isHuman: false,
      };

      const feedMsg: AuctionFeedMessage = {
        id: `msg-${Date.now()}`,
        text: `${chosen.team.name} raises the bid to ₹${updatedNextAmount.toFixed(2)} Cr!`,
        type: 'bid',
        teamId: chosen.team.id,
        timestamp: Date.now(),
      };

      set({
        auction: {
          ...currentAuction,
          currentBid: updatedNextAmount,
          highestBidderId: chosen.team.id,
          highestBidderName: chosen.team.name,
          bidHistory: [bidRecord, ...currentAuction.bidHistory],
          timerSeconds: 10,
          phase: 'bidding',
          feedMessages: [feedMsg, ...currentAuction.feedMessages.slice(0, 40)],
        }
      });

      // Recurse to see if another AI or human will respond
      setTimeout(() => {
        get().triggerAIBidDecision();
      }, 1500);

    }, Math.min(chosen.delayMs, 2400));
  },

  tickAuctionTimer: () => {
    const { auction, nextAuctionPlayer } = get();
    if (auction.phase !== 'bidding' && auction.phase !== 'going_once' && auction.phase !== 'going_twice') return;
    if (auction.isPaused) return;

    soundService.playTimerTick();

    const newTime = auction.timerSeconds - 1;

    if (newTime > 3) {
      set({ auction: { ...auction, timerSeconds: newTime } });
    } else if (newTime === 3) {
      soundService.playWarningGong();
      const text = auction.highestBidderName 
        ? `Going ONCE to ${auction.highestBidderName} at ₹${auction.currentBid.toFixed(2)} Cr...`
        : `Any bids for ${auction.currentPlayer?.name} at Base Price ₹${auction.currentPlayer?.basePrice} Cr?`;

      set({
        auction: {
          ...auction,
          timerSeconds: newTime,
          phase: 'going_once',
          feedMessages: [{ id: `warn-${Date.now()}`, text, type: 'warning', timestamp: Date.now() }, ...auction.feedMessages]
        }
      });
    } else if (newTime === 1) {
      soundService.playWarningGong();
      const text = auction.highestBidderName 
        ? `Going TWICE... Final call at ₹${auction.currentBid.toFixed(2)} Cr!`
        : `Going twice... Last chance to open the bidding!`;

      set({
        auction: {
          ...auction,
          timerSeconds: newTime,
          phase: 'going_twice',
          feedMessages: [{ id: `warn-${Date.now()}`, text, type: 'warning', timestamp: Date.now() }, ...auction.feedMessages]
        }
      });
    } else if (newTime <= 0) {
      // Countdown finished: SOLD or UNSOLD
      if (auction.highestBidderId && auction.currentBid > 0) {
        // SOLD!
        soundService.playSoldFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        const buyerTeam = get().teams.find(t => t.id === auction.highestBidderId)!;
        const boughtPlayer: Player = {
          ...auction.currentPlayer!,
          isSold: true,
          soldPrice: auction.currentBid,
          soldToTeamId: buyerTeam.id,
        };

        const updatedTeams = get().teams.map(t => {
          if (t.id === buyerTeam.id) {
            return {
              ...t,
              currentPurse: Number((t.currentPurse - auction.currentBid).toFixed(2)),
              spentPurse: Number((t.spentPurse + auction.currentBid).toFixed(2)),
              squad: [...t.squad, boughtPlayer],
              startingXI: t.startingXI.length < 11 ? [...t.startingXI, boughtPlayer.id] : t.startingXI,
            };
          }
          return t;
        });

        // Check Bargain Hunter achievement
        if (buyerTeam.id === get().userTeamId && boughtPlayer.potential >= 90 && boughtPlayer.soldPrice! <= 1.0) {
          get().unlockAchievement('ach-bargain-hunter');
        }

        const soldMsg: AuctionFeedMessage = {
          id: `sold-${Date.now()}`,
          text: `🔨 SOLD! ${boughtPlayer.name} is acquired by ${buyerTeam.name} for ₹${auction.currentBid.toFixed(2)} Cr!`,
          type: 'sold',
          teamId: buyerTeam.id,
          timestamp: Date.now(),
        };

        set({
          teams: updatedTeams,
          auction: {
            ...auction,
            phase: 'sold',
            timerSeconds: 0,
            feedMessages: [soldMsg, ...auction.feedMessages],
            auctionHistory: [
              { playerId: boughtPlayer.id, soldToTeamId: buyerTeam.id, finalPrice: auction.currentBid, status: 'sold' },
              ...auction.auctionHistory
            ]
          }
        });

        // Automatically advance to next player after 3.2s
        setTimeout(() => {
          get().nextAuctionPlayer();
        }, 3200);

      } else {
        // UNSOLD!
        soundService.playUnsoldBuzzer();
        const unsoldPlayer = { ...auction.currentPlayer!, isUnsold: true };

        const unsoldMsg: AuctionFeedMessage = {
          id: `unsold-${Date.now()}`,
          text: `UNSOLD! ${unsoldPlayer.name} remains unsold in this round.`,
          type: 'unsold',
          timestamp: Date.now(),
        };

        set({
          auction: {
            ...auction,
            phase: 'unsold',
            timerSeconds: 0,
            feedMessages: [unsoldMsg, ...auction.feedMessages],
            auctionHistory: [
              { playerId: unsoldPlayer.id, finalPrice: 0, status: 'unsold' },
              ...auction.auctionHistory
            ]
          }
        });

        setTimeout(() => {
          get().nextAuctionPlayer();
        }, 2500);
      }
    }
  },

  passCurrentPlayer: () => {
    const { auction } = get();
    if (auction.phase !== 'bidding' && auction.phase !== 'going_once' && auction.phase !== 'going_twice') return;

    // Fast-forward timer to 2 seconds to trigger final call
    set({
      auction: {
        ...auction,
        timerSeconds: 2,
        phase: 'going_twice'
      }
    });
  },

  nextAuctionPlayer: () => {
    const { auction, players, teams, userTeamId, unlockAchievement } = get();
    const nextIdx = auction.currentPlayerIndex + 1;

    // Check if user has budget master achievement
    const user = teams.find(t => t.id === userTeamId);
    if (user && user.currentPurse >= 20.0 && user.squad.length >= 18) {
      unlockAchievement('ach-budget-master');
    }

    if (nextIdx >= players.length) {
      // Auction completed!
      set({
        auction: {
          ...auction,
          phase: 'completed',
          currentPlayer: null,
          timerSeconds: 0,
        },
        isAuctionSummaryOpen: true,
      });
      return;
    }

    const nextPlayer = players[nextIdx];
    const newMsg: AuctionFeedMessage = {
      id: `msg-${Date.now()}`,
      text: `Auctioneer: "Player #${nextIdx + 1}: ${nextPlayer.name} (${nextPlayer.role}, Base: ₹${nextPlayer.basePrice} Cr)."`,
      type: 'system',
      timestamp: Date.now(),
    };

    set({
      auction: {
        ...auction,
        currentPlayerIndex: nextIdx,
        currentPlayer: nextPlayer,
        currentBid: 0,
        highestBidderId: null,
        highestBidderName: null,
        bidHistory: [],
        phase: 'bidding',
        timerSeconds: 10,
        feedMessages: [newMsg, ...auction.feedMessages.slice(0, 40)],
        totalPlayersAuctioned: auction.totalPlayersAuctioned + 1,
      }
    });

    soundService.playGavel();

    setTimeout(() => {
      get().triggerAIBidDecision();
    }, 1200);
  },

  autoCompleteAuction: () => {
    // Instantly simulate remaining players in auction according to AI algorithms
    const { players, teams, auction, userTeamId } = get();
    let currentIdx = auction.currentPlayerIndex;
    const remainingPlayers = players.slice(currentIdx);
    const updatedTeams = JSON.parse(JSON.stringify(teams)) as Team[];

    remainingPlayers.forEach(p => {
      // Find highest AI valuation
      let winningTeam: Team | null = null;
      let winningPrice = 0;

      updatedTeams.forEach(t => {
        if (t.id === userTeamId) return; // Don't auto-force onto user team
        const evalRes = getAIDecision(t, p, 0, null, []);
        if (evalRes.shouldBid && evalRes.nextBidAmount > winningPrice && evalRes.nextBidAmount <= t.currentPurse) {
          winningTeam = t;
          winningPrice = evalRes.nextBidAmount;
        }
      });

      if (winningTeam && winningPrice > 0) {
        const teamRef = updatedTeams.find(t => t.id === (winningTeam as any).id)!;
        const finalPrice = Math.min(teamRef.currentPurse, Math.max(p.basePrice, Number((winningPrice * (0.8 + Math.random() * 0.4)).toFixed(2))));
        teamRef.currentPurse = Number((teamRef.currentPurse - finalPrice).toFixed(2));
        teamRef.spentPurse = Number((teamRef.spentPurse + finalPrice).toFixed(2));
        const bought = { ...p, isSold: true, soldPrice: finalPrice, soldToTeamId: teamRef.id };
        teamRef.squad.push(bought);
        if (teamRef.startingXI.length < 11) teamRef.startingXI.push(bought.id);
      }
    });

    set({
      teams: updatedTeams,
      auction: {
        ...auction,
        phase: 'completed',
        currentPlayerIndex: players.length - 1,
        currentPlayer: null,
        timerSeconds: 0,
      },
      isAuctionSummaryOpen: true,
    });
  },

  scoutPlayer: (player: Player) => {
    const { profile, players, unlockAchievement } = get();
    if (profile.scoutTokens <= 0) {
      alert('You have no scout tokens remaining! You can earn more in Career Mode.');
      return false;
    }

    const updatedPlayers = players.map(p => {
      if (p.id === player.id) {
        return { ...p, isScouted: true };
      }
      return p;
    });

    const updatedProfile = {
      ...profile,
      scoutTokens: profile.scoutTokens - 1,
    };
    StorageService.saveProfile(updatedProfile);

    set({
      players: updatedPlayers,
      profile: updatedProfile,
      selectedScoutPlayer: { ...player, isScouted: true },
      isScoutModalOpen: true,
    });

    const scoutedCount = updatedPlayers.filter(p => p.isScouted).length;
    if (scoutedCount >= 10) {
      unlockAchievement('ach-scout-guru');
    }

    return true;
  },

  updateStartingXI: (newXI: string[]) => {
    const { teams, userTeamId } = get();
    const updatedTeams = teams.map(t => {
      if (t.id === userTeamId) {
        return { ...t, startingXI: newXI };
      }
      return t;
    });
    set({ teams: updatedTeams });
  },

  setCaptain: (playerId: string) => {
    const { teams, userTeamId } = get();
    const updated = teams.map(t => t.id === userTeamId ? { ...t, captainId: playerId } : t);
    set({ teams: updated });
  },

  setWicketkeeper: (playerId: string) => {
    const { teams, userTeamId } = get();
    const updated = teams.map(t => t.id === userTeamId ? { ...t, wicketkeeperId: playerId } : t);
    set({ teams: updated });
  },

  startSeason: () => {
    const { teams } = get();
    // Auto fill starting XIs for any AI teams that don't have 11 selected
    const fixedTeams = teams.map(t => {
      if (t.startingXI.length < 11 && t.squad.length >= 11) {
        return { ...t, startingXI: t.squad.slice(0, 11).map(p => p.id) };
      }
      return t;
    });

    const schedule = generateLeagueSchedule(fixedTeams);
    const standings = calculateStandings(fixedTeams, []);

    set({
      teams: fixedTeams,
      leagueMatches: schedule,
      currentMatchIndex: 0,
      standings,
      playoffMatches: [],
      playoffStage: 'not_started',
      championTeam: null,
      seasonAwards: null,
      currentScreen: 'season',
    });
  },

  simulateNextMatch: () => {
    const { leagueMatches, currentMatchIndex, teams, standings, unlockAchievement, userTeamId } = get();
    if (currentMatchIndex >= leagueMatches.length) return null;

    const matchToSim = leagueMatches[currentMatchIndex];
    const simulated = simulateSingleMatch(matchToSim, teams);

    const updatedMatches = [...leagueMatches];
    updatedMatches[currentMatchIndex] = simulated;

    const newStandings = calculateStandings(teams, updatedMatches);

    // Check achievement: Century maker
    if (simulated.innings1?.batting.some(b => b.runs >= 100) || simulated.innings2?.batting.some(b => b.runs >= 100)) {
      unlockAchievement('ach-century-maker');
    }

    set({
      leagueMatches: updatedMatches,
      currentMatchIndex: currentMatchIndex + 1,
      standings: newStandings,
      activeScorecardMatch: simulated,
      isMatchModalOpen: true,
    });

    return simulated;
  },

  simulateAllLeagueMatches: () => {
    const { leagueMatches, currentMatchIndex, teams, unlockAchievement, userTeamId } = get();
    const updatedMatches = [...leagueMatches];

    for (let i = currentMatchIndex; i < updatedMatches.length; i++) {
      updatedMatches[i] = simulateSingleMatch(updatedMatches[i], teams);
    }

    const newStandings = calculateStandings(teams, updatedMatches);

    // Check if user finished 1st in standings
    if (newStandings[0]?.teamId === userTeamId) {
      unlockAchievement('ach-master-strategist');
    }

    set({
      leagueMatches: updatedMatches,
      currentMatchIndex: updatedMatches.length,
      standings: newStandings,
    });

    // Check awards
    const awards = computeSeasonAwards(updatedMatches, teams);
    set({ seasonAwards: awards });

    if (awards.orangeCap.teamName.includes(teams.find(t => t.id === userTeamId)?.name || '')) {
      unlockAchievement('ach-orange-cap');
    }
  },

  progressPlayoffs: () => {
    const { standings, teams, playoffMatches, playoffStage, unlockAchievement, userTeamId } = get();
    const top4 = standings.slice(0, 4);

    if (top4.length < 4) {
      alert('Need top 4 teams to initialize playoffs!');
      return;
    }

    const t1 = teams.find(t => t.id === top4[0].teamId)!;
    const t2 = teams.find(t => t.id === top4[1].teamId)!;
    const t3 = teams.find(t => t.id === top4[2].teamId)!;
    const t4 = teams.find(t => t.id === top4[3].teamId)!;

    if (playoffStage === 'not_started') {
      // Qualifier 1 (1 vs 2) & Eliminator (3 vs 4)
      const q1: Match = {
        id: 'playoff-q1',
        matchNumber: 57,
        homeTeamId: t1.id,
        awayTeamId: t2.id,
        venue: t1.stadium,
        dateStr: 'Qualifier 1',
        isPlayed: false,
        isPlayoff: true,
        playoffStage: 'Qualifier 1',
      };

      const elim: Match = {
        id: 'playoff-elim',
        matchNumber: 58,
        homeTeamId: t3.id,
        awayTeamId: t4.id,
        venue: t3.stadium,
        dateStr: 'Eliminator',
        isPlayed: false,
        isPlayoff: true,
        playoffStage: 'Eliminator',
      };

      const simQ1 = simulateSingleMatch(q1, teams);
      const simElim = simulateSingleMatch(elim, teams);

      set({
        playoffMatches: [simQ1, simElim],
        playoffStage: 'qualifier_1',
      });
      return;
    }

    if (playoffStage === 'qualifier_1') {
      // Qualifier 2: Loser Q1 vs Winner Eliminator
      const q1 = playoffMatches[0];
      const elim = playoffMatches[1];

      const loserQ1Id = q1.winnerTeamId === q1.homeTeamId ? q1.awayTeamId : q1.homeTeamId;
      const winnerElimId = elim.winnerTeamId!;

      const q2TeamA = teams.find(t => t.id === loserQ1Id)!;
      const q2TeamB = teams.find(t => t.id === winnerElimId)!;

      const q2: Match = {
        id: 'playoff-q2',
        matchNumber: 59,
        homeTeamId: q2TeamA.id,
        awayTeamId: q2TeamB.id,
        venue: q2TeamA.stadium,
        dateStr: 'Qualifier 2',
        isPlayed: false,
        isPlayoff: true,
        playoffStage: 'Qualifier 2',
      };

      const simQ2 = simulateSingleMatch(q2, teams);
      set({
        playoffMatches: [...playoffMatches, simQ2],
        playoffStage: 'qualifier_2',
      });
      return;
    }

    if (playoffStage === 'qualifier_2') {
      // Grand Final: Winner Q1 vs Winner Q2
      const q1 = playoffMatches[0];
      const q2 = playoffMatches[2];

      const finalistA = teams.find(t => t.id === q1.winnerTeamId)!;
      const finalistB = teams.find(t => t.id === q2.winnerTeamId)!;

      const finalMatch: Match = {
        id: 'playoff-final',
        matchNumber: 60,
        homeTeamId: finalistA.id,
        awayTeamId: finalistB.id,
        venue: 'Grand Colosseum, Ahmedabad',
        dateStr: 'GRAND FINAL',
        isPlayed: false,
        isPlayoff: true,
        playoffStage: 'Final',
      };

      const simFinal = simulateSingleMatch(finalMatch, teams);
      const champ = teams.find(t => t.id === simFinal.winnerTeamId)!;

      soundService.playTrophyFanfare();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });

      if (champ.id === userTeamId) {
        unlockAchievement('ach-first-trophy');
      }

      set({
        playoffMatches: [...playoffMatches, simFinal],
        playoffStage: 'completed',
        championTeam: champ,
        isTrophyModalOpen: true,
      });
    }
  },

  viewMatchScorecard: (match: Match) => {
    set({
      activeScorecardMatch: match,
      isMatchModalOpen: true,
    });
  },

  startNextSeason: () => {
    const { profile, teams, players } = get();

    // Young players grow in rating towards their potential!
    const updatedPlayers = players.map(p => {
      let growth = 0;
      if (p.age <= 24 && p.overallRating < p.potential) {
        growth = Math.floor(Math.random() * 3) + 2; // +2 to +4 growth!
      }
      return {
        ...p,
        age: p.age + 1,
        overallRating: Math.min(99, p.overallRating + growth),
        isSold: false,
        isUnsold: false,
        soldPrice: undefined,
        soldToTeamId: undefined,
      };
    });

    const resetTeams = teams.map(t => ({
      ...t,
      squad: [],
      startingXI: [],
      currentPurse: t.startingPurse,
      spentPurse: 0,
    }));

    const newProfile: ManagerProfile = {
      ...profile,
      totalSeasons: profile.totalSeasons + 1,
      scoutTokens: profile.scoutTokens + 5,
      reputation: Math.min(100, profile.reputation + 5),
    };
    StorageService.saveProfile(newProfile);

    set({
      teams: resetTeams,
      players: updatedPlayers,
      profile: newProfile,
      currentScreen: 'teams',
      isTrophyModalOpen: false,
      championTeam: null,
      seasonAwards: null,
      leagueMatches: [],
      standings: [],
      playoffMatches: [],
      playoffStage: 'not_started',
      currentMatchIndex: 0,
      auction: {
        currentSetIndex: 0,
        currentPlayerIndex: 0,
        currentPlayer: null,
        currentBid: 0,
        highestBidderId: null,
        highestBidderName: null,
        bidHistory: [],
        phase: 'idle',
        timerSeconds: 10,
        isPaused: false,
        totalPlayersAuctioned: 0,
        feedMessages: [],
        auctionHistory: [],
      },
    });
  },

  unlockAchievement: (achievementId: string) => {
    const { achievements } = get();
    const updated = achievements.map(a => {
      if (a.id === achievementId && !a.unlocked) {
        return { ...a, unlocked: true, unlockedAt: new Date().toLocaleDateString() };
      }
      return a;
    });
    StorageService.saveAchievements(updated);
    set({ achievements: updated });
  },

  updateSettings: (newSettings) => {
    const merged = { ...get().settings, ...newSettings };
    StorageService.saveSettings(merged);
    soundService.enabled = merged.soundEnabled;
    if (typeof document !== 'undefined') {
      if (merged.theme === 'day') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('day');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('day');
      }
    }
    set({ settings: merged });
  },

  toggleSound: () => {
    const cur = get().settings.soundEnabled;
    get().updateSettings({ soundEnabled: !cur });
  },

  toggleTheme: () => {
    const cur = get().settings.theme || 'day';
    get().updateSettings({ theme: cur === 'day' ? 'night' : 'day' });
  },

  resetAllGameData: () => {
    StorageService.clearAllData();
    window.location.reload();
  },

  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setScoutModalOpen: (open, player) => set({ isScoutModalOpen: open, selectedScoutPlayer: player || null }),
  setAuctionSummaryOpen: (open) => set({ isAuctionSummaryOpen: open }),
  setMatchModalOpen: (open) => set({ isMatchModalOpen: open }),
  setTrophyModalOpen: (open) => set({ isTrophyModalOpen: open }),
}));
