import { create } from 'zustand';
import { Player } from '../types/player';
import { Team } from '../types/team';
import { AuctionState, BidRecord, AuctionFeedMessage } from '../types/auction';
import { Match, LeagueStanding, SeasonAwards } from '../types/season';
import { ManagerProfile, Achievement } from '../types/career';
import { REAL_IPL_TEAMS, FICTIONAL_TEAMS, INITIAL_TEAMS } from '../data/teams';
import { REAL_IPL_PLAYERS, FICTIONAL_PLAYERS, INITIAL_PLAYERS } from '../data/players';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { soundService } from '../services/soundService';
import { getNextBidAmount, getAIDecision } from '../services/aiBiddingEngine';
import { 
  generateLeagueSchedule, 
  simulateSingleMatch, 
  calculateStandings, 
  computeSeasonAwards 
} from '../services/seasonSimulator';
import { StorageService, GameSettings } from '../services/storageService';
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
  selectTeamAndResetCampaign: (teamId: string) => void;
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
  setDataset: (dataset: 'real' | 'fictional') => void;
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

// Check saved active campaign (Fixes Issue 11)
const savedCampaign = StorageService.loadCampaign();
const initialDatasetMode = initialSettings.dataset || 'real';
const fallbackTeams = initialDatasetMode === 'fictional' ? FICTIONAL_TEAMS : INITIAL_TEAMS;
const fallbackPlayers = initialDatasetMode === 'fictional' ? FICTIONAL_PLAYERS : INITIAL_PLAYERS;

const initialTeamsSource = savedCampaign?.teams || fallbackTeams;
const initialPlayersSource = savedCampaign?.players || fallbackPlayers;
const initialUserTeamId = savedCampaign?.userTeamId || initialTeamsSource[0]?.id || 'chennai-super-kings';

const initialAuctionState: AuctionState = savedCampaign?.auction || {
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
};

export const useGameStore = create<GameStoreState>((set, get) => {
  // Helper to persist campaign state to localStorage (Fixes Issue 11)
  const saveCampaignState = (override: Partial<GameStoreState> = {}) => {
    const s = { ...get(), ...override };
    StorageService.saveCampaign({
      userTeamId: s.userTeamId,
      teams: s.teams,
      players: s.players,
      auction: s.auction,
      leagueMatches: s.leagueMatches,
      currentMatchIndex: s.currentMatchIndex,
      standings: s.standings,
      playoffMatches: s.playoffMatches,
      playoffStage: s.playoffStage,
      currentScreen: s.currentScreen,
      timestamp: Date.now(),
    });
  };

  return {
    currentScreen: (savedCampaign?.currentScreen as GameScreen) || 'menu',
    setScreen: (screen) => {
      set({ currentScreen: screen });
      saveCampaignState({ currentScreen: screen });
    },

    userTeamId: initialUserTeamId,
    teams: JSON.parse(JSON.stringify(initialTeamsSource)),
    players: JSON.parse(JSON.stringify(initialPlayersSource)),
    userTeam: () => get().teams.find(t => t.id === get().userTeamId),

    auction: initialAuctionState,
    selectedScoutPlayer: null,

    leagueMatches: savedCampaign?.leagueMatches || [],
    currentMatchIndex: savedCampaign?.currentMatchIndex || 0,
    standings: savedCampaign?.standings || [],
    playoffMatches: savedCampaign?.playoffMatches || [],
    playoffStage: savedCampaign?.playoffStage || 'not_started',
    championTeam: null,
    seasonAwards: null,
    activeScorecardMatch: null,

    profile: StorageService.loadProfile(),
    achievements: StorageService.loadAchievements(INITIAL_ACHIEVEMENTS),
    settings: initialSettings,

    isSettingsOpen: false,
    isScoutModalOpen: false,
    isAuctionSummaryOpen: false,
    isMatchModalOpen: false,
    isTrophyModalOpen: false,

    selectTeam: (teamId: string) => {
      set({ userTeamId: teamId });
      saveCampaignState({ userTeamId: teamId });
    },

    selectTeamAndResetCampaign: (teamId: string) => {
      const { settings } = get();
      const datasetTeams = settings.dataset === 'fictional' ? FICTIONAL_TEAMS : REAL_IPL_TEAMS;
      const datasetPlayers = settings.dataset === 'fictional' ? FICTIONAL_PLAYERS : REAL_IPL_PLAYERS;
      const freshTeams = JSON.parse(JSON.stringify(datasetTeams));
      const freshPlayers = JSON.parse(JSON.stringify(datasetPlayers));

      const freshAuction: AuctionState = {
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
      };

      set({
        userTeamId: teamId,
        teams: freshTeams,
        players: freshPlayers,
        auction: freshAuction,
        leagueMatches: [],
        currentMatchIndex: 0,
        standings: [],
        playoffMatches: [],
        playoffStage: 'not_started',
        championTeam: null,
        seasonAwards: null,
        activeScorecardMatch: null,
      });

      saveCampaignState({
        userTeamId: teamId,
        teams: freshTeams,
        players: freshPlayers,
        auction: freshAuction,
        leagueMatches: [],
        currentMatchIndex: 0,
        standings: [],
        playoffMatches: [],
        playoffStage: 'not_started',
        championTeam: null,
        seasonAwards: null,
      });
    },

    startAuction: () => {
      const { players } = get();
      const firstPlayer = players[0];

      const welcomeFeed: AuctionFeedMessage = {
        id: `msg-${Date.now()}`,
        text: `Welcome to the IPL Mega Auction! Lot #1 is ${firstPlayer.name} (${firstPlayer.role}).`,
        type: 'system',
        timestamp: Date.now(),
      };

      const newAuction: AuctionState = {
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
        feedMessages: [welcomeFeed],
        auctionHistory: [],
      };

      set({
        auction: newAuction,
        currentScreen: 'auction',
      });

      saveCampaignState({
        auction: newAuction,
        currentScreen: 'auction',
      });

      soundService.playGavel();

      setTimeout(() => {
        get().triggerAIBidDecision();
      }, 1500);
    },

    placeHumanBid: (customAmount?: number) => {
      const { auction, userTeamId, teams, unlockAchievement } = get();
      if (auction.phase !== 'bidding' && auction.phase !== 'going_once' && auction.phase !== 'going_twice') return;
      if (!auction.currentPlayer) return;

      const humanTeam = teams.find(t => t.id === userTeamId);
      if (!humanTeam) return;

      const nextAmount = customAmount !== undefined 
        ? customAmount 
        : getNextBidAmount(auction.currentBid, auction.currentPlayer.basePrice);

      if (nextAmount > humanTeam.currentPurse) {
        alert('Insufficient purse to place this bid!');
        return;
      }

      if (auction.highestBidderId === humanTeam.id) {
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

      const updatedAuction: AuctionState = {
        ...auction,
        currentBid: nextAmount,
        highestBidderId: humanTeam.id,
        highestBidderName: humanTeam.name,
        bidHistory: [bidRecord, ...auction.bidHistory],
        timerSeconds: 10,
        phase: 'bidding',
        feedMessages: [feedMsg, ...auction.feedMessages.slice(0, 40)],
      };

      set({ auction: updatedAuction });
      saveCampaignState({ auction: updatedAuction });

      if (nextAmount >= 18.0) {
        unlockAchievement('ach-record-bid');
      }

      setTimeout(() => {
        get().triggerAIBidDecision();
      }, 1300);
    },

    // AI Bidding with fresh state checks (Fixes Issue 1 & Issue 2)
    triggerAIBidDecision: () => {
      const { auction, teams, players, userTeamId, settings } = get();
      if (auction.phase !== 'bidding' && auction.phase !== 'going_once' && auction.phase !== 'going_twice') return;
      if (!auction.currentPlayer) return;

      const currentPlayerId = auction.currentPlayer.id;
      const remainingInPool = players.slice(auction.currentPlayerIndex + 1);

      const candidates: { team: Team; nextBidAmount: number; delayMs: number; reason: string }[] = [];

      teams.forEach(team => {
        if (team.id === userTeamId) return;
        if (team.id === auction.highestBidderId) return;

        const decision = getAIDecision(
          team,
          auction.currentPlayer!,
          auction.currentBid,
          auction.highestBidderId,
          remainingInPool,
          settings.aiAggression
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

      if (candidates.length === 0) return;

      candidates.sort((a, b) => a.delayMs - b.delayMs);
      const chosen = candidates[0];
      const chosenTeamId = chosen.team.id;

      setTimeout(() => {
        const fresh = get();
        const currentAuction = fresh.auction;
        if (currentAuction.phase !== 'bidding' && currentAuction.phase !== 'going_once' && currentAuction.phase !== 'going_twice') return;
        if (!currentAuction.currentPlayer || currentAuction.currentPlayer.id !== currentPlayerId) return;
        if (currentAuction.highestBidderId === chosenTeamId) return;

        const freshTeam = fresh.teams.find(t => t.id === chosenTeamId);
        if (!freshTeam) return;

        const freshRemaining = fresh.players.slice(currentAuction.currentPlayerIndex + 1);
        
        // Re-verify AI decision against freshest price and team state (Fixes Issue 1)
        const freshDecision = getAIDecision(
          freshTeam,
          currentAuction.currentPlayer,
          currentAuction.currentBid,
          currentAuction.highestBidderId,
          freshRemaining,
          fresh.settings.aiAggression
        );

        if (!freshDecision.shouldBid) return;
        const updatedNextAmount = freshDecision.nextBidAmount;
        if (updatedNextAmount > freshTeam.currentPurse) return;

        soundService.playBidSound(false);

        const bidRecord: BidRecord = {
          teamId: freshTeam.id,
          teamName: freshTeam.name,
          amount: updatedNextAmount,
          timestamp: Date.now(),
          isHuman: false,
        };

        const feedMsg: AuctionFeedMessage = {
          id: `msg-${Date.now()}`,
          text: `${freshTeam.name} bids ₹${updatedNextAmount.toFixed(2)} Cr!`,
          type: 'bid',
          teamId: freshTeam.id,
          timestamp: Date.now(),
        };

        const newAuctionState: AuctionState = {
          ...currentAuction,
          currentBid: updatedNextAmount,
          highestBidderId: freshTeam.id,
          highestBidderName: freshTeam.name,
          bidHistory: [bidRecord, ...currentAuction.bidHistory],
          timerSeconds: 10,
          phase: 'bidding',
          feedMessages: [feedMsg, ...currentAuction.feedMessages.slice(0, 40)],
        };

        set({ auction: newAuctionState });
        saveCampaignState({ auction: newAuctionState });

        setTimeout(() => {
          get().triggerAIBidDecision();
        }, 1200);
      }, chosen.delayMs);
    },

    passCurrentPlayer: () => {
      const { auction } = get();
      if (!auction.currentPlayer) return;

      const passMsg: AuctionFeedMessage = {
        id: `msg-${Date.now()}`,
        text: `Manager passes on ${auction.currentPlayer.name}. Waiting for hammer...`,
        type: 'system',
        timestamp: Date.now(),
      };

      set({
        auction: {
          ...auction,
          timerSeconds: Math.min(auction.timerSeconds, 3),
          feedMessages: [passMsg, ...auction.feedMessages.slice(0, 40)],
        }
      });
    },

    tickAuctionTimer: () => {
      const { auction } = get();
      if (auction.phase !== 'bidding' && auction.phase !== 'going_once' && auction.phase !== 'going_twice') return;

      if (auction.timerSeconds > 1) {
        const nextSec = auction.timerSeconds - 1;
        let nextPhase = auction.phase;

        if (nextSec === 5 && auction.currentBid > 0 && auction.phase === 'bidding') {
          nextPhase = 'going_once';
          soundService.playWarningGong();
        } else if (nextSec === 2 && auction.currentBid > 0 && (auction.phase === 'bidding' || auction.phase === 'going_once')) {
          nextPhase = 'going_twice';
          soundService.playWarningGong();
        }

        soundService.playTimerTick();

        set({
          auction: {
            ...auction,
            timerSeconds: nextSec,
            phase: nextPhase,
          }
        });
      } else {
        // Hammer strikes 0 - Sold or Unsold
        if (auction.currentBid > 0 && auction.highestBidderId) {
          // SOLD
          const winningTeamId = auction.highestBidderId;
          const winningPrice = auction.currentBid;
          const soldPlayer = {
            ...auction.currentPlayer!,
            isSold: true,
            soldPrice: winningPrice,
            soldToTeamId: winningTeamId,
          };

          const updatedTeams = get().teams.map(t => {
            if (t.id === winningTeamId) {
              const updatedPurse = Number((t.currentPurse - winningPrice).toFixed(2));
              const updatedSpent = Number((t.spentPurse + winningPrice).toFixed(2));
              const updatedSquad = [...t.squad, soldPlayer];
              const updatedXI = updatedSquad.length <= 11 ? [...t.startingXI, soldPlayer.id] : t.startingXI;

              return {
                ...t,
                currentPurse: updatedPurse,
                spentPurse: updatedSpent,
                squad: updatedSquad,
                startingXI: updatedXI,
              };
            }
            return t;
          });

          const updatedPlayers = get().players.map(p => p.id === soldPlayer.id ? soldPlayer : p);

          const soldMsg: AuctionFeedMessage = {
            id: `msg-${Date.now()}`,
            text: `🔨 SOLD! ${soldPlayer.name} goes to ${auction.highestBidderName} for ₹${winningPrice.toFixed(2)} Cr!`,
            type: 'sold',
            teamId: winningTeamId,
            timestamp: Date.now(),
          };

          soundService.playSoldFanfare();

          const isHumanWinner = winningTeamId === get().userTeamId;
          if (isHumanWinner) {
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
            get().unlockAchievement('ach-first-signing');
            if (soldPlayer.basePrice <= 0.5 && winningPrice <= 1.5) {
              get().unlockAchievement('ach-bargain-hunter');
            }
          }

          const newAuctionState: AuctionState = {
            ...auction,
            phase: 'sold',
            timerSeconds: 0,
            feedMessages: [soldMsg, ...auction.feedMessages.slice(0, 40)],
            auctionHistory: [
              {
                playerId: soldPlayer.id,
                soldToTeamId: winningTeamId,
                finalPrice: winningPrice,
                status: 'sold',
              },
              ...auction.auctionHistory,
            ],
          };

          set({
            teams: updatedTeams,
            players: updatedPlayers,
            auction: newAuctionState,
          });

          saveCampaignState({
            teams: updatedTeams,
            players: updatedPlayers,
            auction: newAuctionState,
          });

          setTimeout(() => {
            get().nextAuctionPlayer();
          }, 2400);

        } else {
          // UNSOLD
          const unsoldPlayer = {
            ...auction.currentPlayer!,
            isUnsold: true,
          };

          const updatedPlayers = get().players.map(p => p.id === unsoldPlayer.id ? unsoldPlayer : p);

          const unsoldMsg: AuctionFeedMessage = {
            id: `msg-${Date.now()}`,
            text: `❌ UNSOLD! No bids placed for ${unsoldPlayer.name}.`,
            type: 'unsold',
            timestamp: Date.now(),
          };

          soundService.playUnsoldBuzzer();

          const newAuctionState: AuctionState = {
            ...auction,
            phase: 'unsold',
            timerSeconds: 0,
            feedMessages: [unsoldMsg, ...auction.feedMessages.slice(0, 40)],
          };

          set({
            players: updatedPlayers,
            auction: newAuctionState,
          });

          saveCampaignState({
            players: updatedPlayers,
            auction: newAuctionState,
          });

          setTimeout(() => {
            get().nextAuctionPlayer();
          }, 2000);
        }
      }
    },

    nextAuctionPlayer: () => {
      const { auction, players } = get();
      const nextIdx = auction.currentPlayerIndex + 1;

      if (nextIdx >= players.length) {
        // Auction completed
        const completedAuction: AuctionState = {
          ...auction,
          phase: 'completed',
          currentPlayer: null,
          timerSeconds: 0,
        };

        set({
          auction: completedAuction,
          isAuctionSummaryOpen: true,
        });

        saveCampaignState({ auction: completedAuction });
        soundService.playTrophyFanfare();
        return;
      }

      const nextPlayer = players[nextIdx];

      const newMsg: AuctionFeedMessage = {
        id: `msg-${Date.now()}`,
        text: `Now entering the hammer: Lot #${nextIdx + 1} • ${nextPlayer.name} (${nextPlayer.role}, Base ₹${nextPlayer.basePrice} Cr)`,
        type: 'system',
        timestamp: Date.now(),
      };

      const newAuctionState: AuctionState = {
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
      };

      set({ auction: newAuctionState });
      saveCampaignState({ auction: newAuctionState });

      soundService.playGavel();

      setTimeout(() => {
        get().triggerAIBidDecision();
      }, 1200);
    },

    // Auto-complete auction handling current lot first (Fixes Issue 4)
    autoCompleteAuction: () => {
      const { players, teams, auction, userTeamId, settings } = get();
      const updatedTeams = JSON.parse(JSON.stringify(teams)) as Team[];
      const updatedPlayers = [...players];

      // 1. Resolve current lot if active
      if (auction.currentPlayer) {
        const currentLot = auction.currentPlayer;
        const winningTeamId = auction.highestBidderId;
        const currentPrice = auction.currentBid;

        if (winningTeamId && currentPrice > 0) {
          const teamRef = updatedTeams.find(t => t.id === winningTeamId);
          if (teamRef && teamRef.currentPurse >= currentPrice) {
            teamRef.currentPurse = Number((teamRef.currentPurse - currentPrice).toFixed(2));
            teamRef.spentPurse = Number((teamRef.spentPurse + currentPrice).toFixed(2));
            const bought = { ...currentLot, isSold: true, soldPrice: currentPrice, soldToTeamId: teamRef.id };
            teamRef.squad.push(bought);
            if (teamRef.startingXI.length < 11) teamRef.startingXI.push(bought.id);

            const pIdx = updatedPlayers.findIndex(p => p.id === currentLot.id);
            if (pIdx !== -1) updatedPlayers[pIdx] = bought;
          }
        } else {
          // No current bid; find AI buyer
          let bestTeam: Team | null = null;
          let bestPrice = 0;
          updatedTeams.forEach(t => {
            if (t.id === userTeamId) return;
            const dec = getAIDecision(t, currentLot, 0, null, [], settings.aiAggression);
            if (dec.shouldBid && dec.nextBidAmount > bestPrice && dec.nextBidAmount <= t.currentPurse) {
              bestTeam = t;
              bestPrice = dec.nextBidAmount;
            }
          });

          if (bestTeam && bestPrice > 0) {
            const teamRef = updatedTeams.find(t => t.id === (bestTeam as any).id)!;
            const bought = { ...currentLot, isSold: true, soldPrice: bestPrice, soldToTeamId: teamRef.id };
            teamRef.currentPurse = Number((teamRef.currentPurse - bestPrice).toFixed(2));
            teamRef.spentPurse = Number((teamRef.spentPurse + bestPrice).toFixed(2));
            teamRef.squad.push(bought);
            if (teamRef.startingXI.length < 11) teamRef.startingXI.push(bought.id);

            const pIdx = updatedPlayers.findIndex(p => p.id === currentLot.id);
            if (pIdx !== -1) updatedPlayers[pIdx] = bought;
          }
        }
      }

      // 2. Simulate all remaining un-auctioned players
      const nextStartIdx = auction.currentPlayer ? auction.currentPlayerIndex + 1 : 0;
      const remainingPlayers = updatedPlayers.slice(nextStartIdx);

      remainingPlayers.forEach(p => {
        let winningTeam: Team | null = null;
        let winningPrice = 0;

        updatedTeams.forEach(t => {
          if (t.id === userTeamId) return;
          const evalRes = getAIDecision(t, p, 0, null, [], settings.aiAggression);
          if (evalRes.shouldBid && evalRes.nextBidAmount > winningPrice && evalRes.nextBidAmount <= t.currentPurse) {
            winningTeam = t;
            winningPrice = evalRes.nextBidAmount;
          }
        });

        if (winningTeam && winningPrice > 0) {
          const teamRef = updatedTeams.find(t => t.id === (winningTeam as any).id)!;
          const finalPrice = Math.min(teamRef.currentPurse, Math.max(p.basePrice, Number((winningPrice * (0.85 + Math.random() * 0.3)).toFixed(2))));
          teamRef.currentPurse = Number((teamRef.currentPurse - finalPrice).toFixed(2));
          teamRef.spentPurse = Number((teamRef.spentPurse + finalPrice).toFixed(2));
          const bought = { ...p, isSold: true, soldPrice: finalPrice, soldToTeamId: teamRef.id };
          teamRef.squad.push(bought);
          if (teamRef.startingXI.length < 11) teamRef.startingXI.push(bought.id);

          const pIdx = updatedPlayers.findIndex(x => x.id === p.id);
          if (pIdx !== -1) updatedPlayers[pIdx] = bought;
        }
      });

      const completedAuction: AuctionState = {
        ...auction,
        phase: 'completed',
        currentPlayerIndex: players.length - 1,
        currentPlayer: null,
        timerSeconds: 0,
      };

      set({
        teams: updatedTeams,
        players: updatedPlayers,
        auction: completedAuction,
        isAuctionSummaryOpen: true,
      });

      saveCampaignState({
        teams: updatedTeams,
        players: updatedPlayers,
        auction: completedAuction,
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

      const newProfile: ManagerProfile = {
        ...profile,
        scoutTokens: profile.scoutTokens - 1,
      };

      StorageService.saveProfile(newProfile);

      set({
        players: updatedPlayers,
        profile: newProfile,
      });

      saveCampaignState({ players: updatedPlayers });

      unlockAchievement('ach-master-strategist');
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
      saveCampaignState({ teams: updatedTeams });
    },

    setCaptain: (playerId: string) => {
      const { teams, userTeamId } = get();
      const updatedTeams = teams.map(t => {
        if (t.id === userTeamId) {
          return { ...t, captainPlayerId: playerId };
        }
        return t;
      });
      set({ teams: updatedTeams });
      saveCampaignState({ teams: updatedTeams });
    },

    setWicketkeeper: (playerId: string) => {
      const { teams, userTeamId } = get();
      const updatedTeams = teams.map(t => {
        if (t.id === userTeamId) {
          return { ...t, keeperPlayerId: playerId };
        }
        return t;
      });
      set({ teams: updatedTeams });
      saveCampaignState({ teams: updatedTeams });
    },

    startSeason: () => {
      const { teams } = get();
      const schedule = generateLeagueSchedule(teams);
      const initialStandings = calculateStandings(teams, []);

      set({
        leagueMatches: schedule,
        currentMatchIndex: 0,
        standings: initialStandings,
        playoffStage: 'not_started',
        playoffMatches: [],
        currentScreen: 'season',
      });

      saveCampaignState({
        leagueMatches: schedule,
        currentMatchIndex: 0,
        standings: initialStandings,
        playoffStage: 'not_started',
        playoffMatches: [],
        currentScreen: 'season',
      });

      soundService.playGavel();
    },

    simulateNextMatch: () => {
      const { leagueMatches, currentMatchIndex, teams, unlockAchievement } = get();
      if (currentMatchIndex >= leagueMatches.length) return null;

      const matchToSim = leagueMatches[currentMatchIndex];
      const simulated = simulateSingleMatch(matchToSim, teams);

      const updatedMatches = [...leagueMatches];
      updatedMatches[currentMatchIndex] = simulated;

      const newStandings = calculateStandings(teams, updatedMatches);

      if (simulated.innings1?.batting.some(b => b.runs >= 100) || simulated.innings2?.batting.some(b => b.runs >= 100)) {
        unlockAchievement('ach-century-maker');
      }

      set({
        leagueMatches: updatedMatches,
        currentMatchIndex: currentMatchIndex + 1,
        standings: newStandings,
      });

      saveCampaignState({
        leagueMatches: updatedMatches,
        currentMatchIndex: currentMatchIndex + 1,
        standings: newStandings,
      });

      if (currentMatchIndex + 1 >= leagueMatches.length) {
        get().progressPlayoffs();
      }

      return simulated;
    },

    simulateAllLeagueMatches: () => {
      const { leagueMatches, currentMatchIndex, teams } = get();
      const updated = [...leagueMatches];

      for (let i = currentMatchIndex; i < updated.length; i++) {
        updated[i] = simulateSingleMatch(updated[i], teams);
      }

      const newStandings = calculateStandings(teams, updated);

      set({
        leagueMatches: updated,
        currentMatchIndex: updated.length,
        standings: newStandings,
      });

      saveCampaignState({
        leagueMatches: updated,
        currentMatchIndex: updated.length,
        standings: newStandings,
      });

      get().progressPlayoffs();
    },

    progressPlayoffs: () => {
      const { standings, teams, playoffStage } = get();
      if (standings.length < 4) return;

      const team1 = teams.find(t => t.id === standings[0].teamId)!;
      const team2 = teams.find(t => t.id === standings[1].teamId)!;
      const team3 = teams.find(t => t.id === standings[2].teamId)!;
      const team4 = teams.find(t => t.id === standings[3].teamId)!;

      if (playoffStage === 'not_started') {
        const q1: Match = {
          id: 'playoff-q1',
          matchNumber: 57,
          homeTeamId: team1.id,
          awayTeamId: team2.id,
          venue: team1.stadium,
          dateStr: 'Qualifier 1',
          isPlayed: false,
          isPlayoff: true,
        };
        const elim: Match = {
          id: 'playoff-elim',
          matchNumber: 58,
          homeTeamId: team3.id,
          awayTeamId: team4.id,
          venue: team3.stadium,
          dateStr: 'Eliminator',
          isPlayed: false,
          isPlayoff: true,
        };

        const updatedQ1 = simulateSingleMatch(q1, teams);
        const updatedElim = simulateSingleMatch(elim, teams);

        const q2HomeId = updatedQ1.winnerTeamId === team1.id ? team2.id : team1.id;
        const q2AwayId = updatedElim.winnerTeamId!;
        const q2Home = teams.find(t => t.id === q2HomeId)!;

        const q2: Match = {
          id: 'playoff-q2',
          matchNumber: 59,
          homeTeamId: q2Home.id,
          awayTeamId: q2AwayId,
          venue: q2Home.stadium,
          dateStr: 'Qualifier 2',
          isPlayed: false,
          isPlayoff: true,
        };
        const updatedQ2 = simulateSingleMatch(q2, teams);

        const finalist1Id = updatedQ1.winnerTeamId!;
        const finalist2Id = updatedQ2.winnerTeamId!;
        const finalHome = teams.find(t => t.id === finalist1Id)!;

        const finalMatch: Match = {
          id: 'playoff-final',
          matchNumber: 60,
          homeTeamId: finalHome.id,
          awayTeamId: finalist2Id,
          venue: finalHome.stadium,
          dateStr: 'Grand Championship Final',
          isPlayed: false,
          isPlayoff: true,
        };
        const updatedFinal = simulateSingleMatch(finalMatch, teams);

        const champ = teams.find(t => t.id === updatedFinal.winnerTeamId)!;
        const allPlayoff = [updatedQ1, updatedElim, updatedQ2, updatedFinal];
        const allSeasonMatches = [...get().leagueMatches, ...allPlayoff];
        const awards = computeSeasonAwards(allSeasonMatches, teams);

        set({
          playoffMatches: allPlayoff,
          playoffStage: 'completed',
          championTeam: champ,
          seasonAwards: awards,
          isTrophyModalOpen: true,
        });

        saveCampaignState({
          playoffMatches: allPlayoff,
          playoffStage: 'completed',
        });

        soundService.playTrophyFanfare();

        if (champ.id === get().userTeamId) {
          get().unlockAchievement('ach-first-trophy');
          get().unlockAchievement('ach-dynasty');
        }
      }
    },

    viewMatchScorecard: (match: Match) => {
      set({
        activeScorecardMatch: match,
        isMatchModalOpen: true,
      });
    },

    // Advances career stats and restores team personalities (Fixes Issue 10 & 15)
    startNextSeason: () => {
      const { profile, teams, players, leagueMatches, playoffMatches, userTeamId, championTeam, settings } = get();

      // 1. Advance career statistics
      const userMatches = [...leagueMatches, ...playoffMatches].filter(
        m => m.isPlayed && (m.homeTeamId === userTeamId || m.awayTeamId === userTeamId)
      );
      const userSeasonMatches = userMatches.length;
      const userSeasonWins = userMatches.filter(m => m.winnerTeamId === userTeamId).length;
      const userTeam = teams.find(t => t.id === userTeamId);
      const seasonSpent = userTeam ? userTeam.spentPurse : 0;
      const seasonAuctionWins = userTeam ? userTeam.squad.length : 0;
      const wonTrophy = championTeam?.id === userTeamId;

      const totalMatchesPlayed = profile.matchesPlayed + userSeasonMatches;
      const totalMatchesWon = profile.matchesWon + userSeasonWins;
      const totalSpent = Number((profile.totalSpent + seasonSpent).toFixed(2));
      const totalAuctionWins = profile.auctionWins + seasonAuctionWins;
      const totalTrophies = profile.trophies + (wonTrophy ? 1 : 0);
      const winRate = totalMatchesPlayed > 0 ? Number(((totalMatchesWon / totalMatchesPlayed) * 100).toFixed(1)) : 0;

      const newProfile: ManagerProfile = {
        ...profile,
        totalSeasons: profile.totalSeasons + 1,
        scoutTokens: profile.scoutTokens + 5,
        reputation: Math.min(100, profile.reputation + (wonTrophy ? 8 : 4)),
        matchesPlayed: totalMatchesPlayed,
        matchesWon: totalMatchesWon,
        auctionWins: totalAuctionWins,
        totalSpent,
        winRate,
        trophies: totalTrophies,
      };
      StorageService.saveProfile(newProfile);

      // 2. Young players develop towards potential
      const updatedPlayers = players.map(p => {
        let growth = 0;
        if (p.age <= 24 && p.overallRating < p.potential) {
          growth = Math.floor(Math.random() * 3) + 2;
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

      // 3. Reset teams and restore original AI personalities (Fixes Issue 10)
      const datasetTeams = settings.dataset === 'fictional' ? FICTIONAL_TEAMS : REAL_IPL_TEAMS;
      const resetTeams = teams.map(t => {
        const orig = datasetTeams.find(dt => dt.id === t.id);
        return {
          ...t,
          personality: orig ? orig.personality : t.personality,
          squad: [],
          startingXI: [],
          currentPurse: t.startingPurse,
          spentPurse: 0,
        };
      });

      const resetAuction: AuctionState = {
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
      };

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
        auction: resetAuction,
      });

      saveCampaignState({
        teams: resetTeams,
        players: updatedPlayers,
        leagueMatches: [],
        standings: [],
        playoffMatches: [],
        playoffStage: 'not_started',
        currentMatchIndex: 0,
        auction: resetAuction,
        currentScreen: 'teams',
      });
    },

    unlockAchievement: (achievementId: string) => {
      const { achievements } = get();
      const updated = achievements.map(a => {
        if (a.id === achievementId && !a.unlocked) {
          soundService.playTrophyFanfare();
          return {
            ...a,
            unlocked: true,
            unlockedAt: new Date().toLocaleDateString(),
          };
        }
        return a;
      });

      StorageService.saveAchievements(updated);
      set({ achievements: updated });
    },

    updateSettings: (newSettings: Partial<GameSettings>) => {
      const current = get().settings;
      const merged: GameSettings = { ...current, ...newSettings };
      StorageService.saveSettings(merged);
      soundService.enabled = merged.soundEnabled;

      if (typeof document !== 'undefined') {
        if (merged.theme === 'night') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('day');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('day');
        }
      }
      set({ settings: merged });
    },

    // Effective dataset switcher (Fixes Issue 14)
    setDataset: (datasetMode: 'real' | 'fictional') => {
      const teamsList = datasetMode === 'real' ? REAL_IPL_TEAMS : FICTIONAL_TEAMS;
      const playersList = datasetMode === 'real' ? REAL_IPL_PLAYERS : FICTIONAL_PLAYERS;
      const mergedSettings = { ...get().settings, dataset: datasetMode };
      StorageService.saveSettings(mergedSettings);

      const freshTeams = JSON.parse(JSON.stringify(teamsList));
      const freshPlayers = JSON.parse(JSON.stringify(playersList));
      const freshUserTeamId = freshTeams[0].id;

      const resetAuction: AuctionState = {
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
      };

      set({
        settings: mergedSettings,
        teams: freshTeams,
        players: freshPlayers,
        userTeamId: freshUserTeamId,
        currentScreen: 'menu',
        auction: resetAuction,
        leagueMatches: [],
        standings: [],
        playoffMatches: [],
        playoffStage: 'not_started',
        currentMatchIndex: 0,
        championTeam: null,
        seasonAwards: null,
      });

      saveCampaignState({
        userTeamId: freshUserTeamId,
        teams: freshTeams,
        players: freshPlayers,
        auction: resetAuction,
        leagueMatches: [],
        standings: [],
        playoffMatches: [],
        playoffStage: 'not_started',
        currentMatchIndex: 0,
        currentScreen: 'menu',
      });
    },

    toggleSound: () => {
      const current = get().settings;
      const updated = !current.soundEnabled;
      get().updateSettings({ soundEnabled: updated });
    },

    toggleTheme: () => {
      const current = get().settings;
      const nextTheme = current.theme === 'day' ? 'night' : 'day';
      get().updateSettings({ theme: nextTheme });
    },

    resetAllGameData: () => {
      StorageService.clearAllData();
      const freshTeams = JSON.parse(JSON.stringify(INITIAL_TEAMS));
      const freshPlayers = JSON.parse(JSON.stringify(INITIAL_PLAYERS));
      const defaultProf = StorageService.loadProfile();

      const freshAuction: AuctionState = {
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
      };

      set({
        userTeamId: freshTeams[0].id,
        teams: freshTeams,
        players: freshPlayers,
        currentScreen: 'menu',
        auction: freshAuction,
        leagueMatches: [],
        currentMatchIndex: 0,
        standings: [],
        playoffMatches: [],
        playoffStage: 'not_started',
        championTeam: null,
        seasonAwards: null,
        activeScorecardMatch: null,
        profile: defaultProf,
        achievements: INITIAL_ACHIEVEMENTS,
      });
    },

    setSettingsOpen: (open: boolean) => set({ isSettingsOpen: open }),
    setScoutModalOpen: (open: boolean, player?: Player) => set({ isScoutModalOpen: open, selectedScoutPlayer: player || null }),
    setAuctionSummaryOpen: (open: boolean) => set({ isAuctionSummaryOpen: open }),
    setMatchModalOpen: (open: boolean) => set({ isMatchModalOpen: open }),
    setTrophyModalOpen: (open: boolean) => set({ isTrophyModalOpen: open }),
  };
});
