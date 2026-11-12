import { ManagerProfile, Achievement } from '../types/career';

const PROFILE_KEY = 'cric_auction_manager_profile';
const ACHIEVEMENTS_KEY = 'cric_auction_achievements';
const SETTINGS_KEY = 'cric_auction_settings';
const CAREER_KEY = 'cric_auction_career_data';

export interface GameSettings {
  timerSpeed: 'slow' | 'standard' | 'fast';
  soundEnabled: boolean;
  aiAggression: 'balanced' | 'ruthless' | 'chill';
  startingPurse: number;
  theme: 'day' | 'night';
  dataset: 'real' | 'fictional';
}

export const DEFAULT_SETTINGS: GameSettings = {
  timerSpeed: 'standard',
  soundEnabled: true,
  aiAggression: 'balanced',
  startingPurse: 120.0,
  theme: 'day',
  dataset: 'real',
};

export const DEFAULT_PROFILE: ManagerProfile = {
  name: 'Vikram Sengupta',
  avatar: 'manager-1',
  reputation: 85,
  totalSeasons: 1,
  trophies: 0,
  matchesPlayed: 0,
  matchesWon: 0,
  auctionWins: 0,
  totalSpent: 0,
  winRate: 0,
  scoutTokens: 6,
};

export class StorageService {
  static loadProfile(): ManagerProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to load profile from localStorage', e);
    }
    return DEFAULT_PROFILE;
  }

  static saveProfile(profile: ManagerProfile) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  }

  static loadAchievements(initialAchievements: Achievement[]): Achievement[] {
    try {
      const data = localStorage.getItem(ACHIEVEMENTS_KEY);
      if (data) {
        const stored: Achievement[] = JSON.parse(data);
        // Merge with initial definitions
        return initialAchievements.map(init => {
          const found = stored.find(s => s.id === init.id);
          return found ? { ...init, unlocked: found.unlocked, unlockedAt: found.unlockedAt } : init;
        });
      }
    } catch (e) {
      console.warn('Failed to load achievements', e);
    }
    return initialAchievements;
  }

  static saveAchievements(achievements: Achievement[]) {
    try {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    } catch (e) {
      console.warn('Failed to save achievements', e);
    }
  }

  static loadSettings(): GameSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      console.warn('Failed to load settings', e);
    }
    return DEFAULT_SETTINGS;
  }

  static saveSettings(settings: GameSettings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }

  static clearAllData() {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(ACHIEVEMENTS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(CAREER_KEY);
  }
}
