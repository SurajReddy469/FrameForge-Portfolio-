import { Player } from '../types/player';
import { Team } from '../types/team';
import { 
  Match, 
  InningsScorecard, 
  BattingScorecardEntry, 
  BowlingScorecardEntry, 
  LeagueStanding, 
  SeasonAwards 
} from '../types/season';

export function generateLeagueSchedule(teams: Team[]): Match[] {
  const matches: Match[] = [];
  let matchCounter = 1;
  const n = teams.length;

  // Double round robin (Home & Away)
  for (let round = 0; round < 2; round++) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const home = round === 0 ? teams[i] : teams[j];
        const away = round === 0 ? teams[j] : teams[i];

        matches.push({
          id: `match-${matchCounter}`,
          matchNumber: matchCounter,
          homeTeamId: home.id,
          awayTeamId: away.id,
          venue: home.stadium,
          dateStr: `Matchday ${matchCounter}`,
          isPlayed: false,
        });
        matchCounter++;
      }
    }
  }

  // Shuffle slightly so matches aren't completely predictable sequential
  return matches.sort(() => Math.random() - 0.5).map((m, idx) => ({
    ...m,
    matchNumber: idx + 1,
    dateStr: `Matchday ${idx + 1}`
  }));
}

export function simulateInnings(
  battingTeam: Team,
  bowlingTeam: Team,
  target?: number
): InningsScorecard {
  const batters: Player[] = battingTeam.startingXI.length === 11
    ? battingTeam.startingXI.map(id => battingTeam.squad.find(p => p.id === id)!).filter(Boolean)
    : battingTeam.squad.slice(0, 11);

  const bowlers: Player[] = bowlingTeam.startingXI.length === 11
    ? bowlingTeam.startingXI.map(id => bowlingTeam.squad.find(p => p.id === id)!).filter(Boolean)
    : bowlingTeam.squad.slice(0, 11);

  // Fallback if squad is smaller
  const activeBatters = batters.length > 0 ? batters : battingTeam.squad.slice(0, 11);
  const activeBowlers = bowlers.filter(p => p.role !== 'Wicketkeeper').slice(0, 5);

  let totalRuns = 0;
  let wickets = 0;
  let ballsBowled = 0;
  const maxOvers = 20;
  const maxBalls = maxOvers * 6;

  const battingEntries: BattingScorecardEntry[] = [];
  const bowlingEntries: Map<string, BowlingScorecardEntry> = new Map();

  // Initialize bowlers
  activeBowlers.forEach(b => {
    bowlingEntries.set(b.id, {
      playerId: b.id,
      playerName: b.name,
      overs: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
      economy: 0,
      dots: 0,
    });
  });

  let strikerIdx = 0;
  let nonStrikerIdx = 1;
  let nextBatterIdx = 2;

  // Track striker stats
  const strikerStats = {
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
  };
  const nonStrikerStats = {
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
  };

  const fallOfWickets: string[] = [];

  // Over by over simulation
  for (let over = 0; over < maxOvers; over++) {
    if (wickets >= 10) break;
    if (target && totalRuns >= target) break;

    const currentBowler = activeBowlers[over % activeBowlers.length] || activeBowlers[0];
    const bowlerEntry = bowlingEntries.get(currentBowler.id);
    let overRuns = 0;

    for (let ball = 0; ball < 6; ball++) {
      if (wickets >= 10) break;
      if (target && totalRuns >= target) break;

      ballsBowled++;
      const currentStriker = activeBatters[strikerIdx];
      if (!currentStriker) break;

      strikerStats.balls++;

      // Batting strength vs Bowling strength calculation
      const batRating = currentStriker.battingRating;
      const bowlRating = currentBowler ? currentBowler.bowlingRating : 75;
      const delta = (batRating - bowlRating) / 100;

      // Probabilities
      const wicketChance = Math.max(0.03, 0.06 - delta * 0.04);
      const sixChance = Math.max(0.04, 0.09 + delta * 0.05 + (currentStriker.power / 400));
      const fourChance = Math.max(0.08, 0.15 + delta * 0.05 + (currentStriker.timing / 350));
      const singleChance = 0.40;
      const dotChance = Math.max(0.20, 0.32 - delta * 0.08);

      const roll = Math.random();

      if (roll < wicketChance) {
        // Wicket fallen!
        wickets++;
        const dismissal = Math.random() > 0.4 
          ? `c & b ${currentBowler.name}` 
          : `b ${currentBowler.name}`;

        battingEntries.push({
          playerId: currentStriker.id,
          playerName: currentStriker.name,
          runs: strikerStats.runs,
          balls: strikerStats.balls,
          fours: strikerStats.fours,
          sixes: strikerStats.sixes,
          strikeRate: strikerStats.balls > 0 ? Number(((strikerStats.runs / strikerStats.balls) * 100).toFixed(1)) : 0,
          dismissal,
          isNotOut: false,
        });

        fallOfWickets.push(`${totalRuns}/${wickets} (${currentStriker.name}, ${Math.floor(ballsBowled / 6)}.${ballsBowled % 6} ov)`);

        if (bowlerEntry) {
          bowlerEntry.wickets++;
        }

        // New batter comes in
        strikerIdx = nextBatterIdx++;
        strikerStats.runs = 0;
        strikerStats.balls = 0;
        strikerStats.fours = 0;
        strikerStats.sixes = 0;
      } else if (roll < wicketChance + sixChance) {
        totalRuns += 6;
        overRuns += 6;
        strikerStats.runs += 6;
        strikerStats.sixes++;
        if (bowlerEntry) bowlerEntry.runs += 6;
      } else if (roll < wicketChance + sixChance + fourChance) {
        totalRuns += 4;
        overRuns += 4;
        strikerStats.runs += 4;
        strikerStats.fours++;
        if (bowlerEntry) bowlerEntry.runs += 4;
      } else if (roll < wicketChance + sixChance + fourChance + singleChance) {
        const runs = Math.random() > 0.8 ? 2 : 1;
        totalRuns += runs;
        overRuns += runs;
        strikerStats.runs += runs;
        if (bowlerEntry) bowlerEntry.runs += runs;

        // Odd run swaps striker
        if (runs % 2 !== 0) {
          const tempIdx = strikerIdx;
          strikerIdx = nonStrikerIdx;
          nonStrikerIdx = tempIdx;
          // Swap stats containers
          const tRuns = strikerStats.runs; strikerStats.runs = nonStrikerStats.runs; nonStrikerStats.runs = tRuns;
          const tBalls = strikerStats.balls; strikerStats.balls = nonStrikerStats.balls; nonStrikerStats.balls = tBalls;
          const t4 = strikerStats.fours; strikerStats.fours = nonStrikerStats.fours; nonStrikerStats.fours = t4;
          const t6 = strikerStats.sixes; strikerStats.sixes = nonStrikerStats.sixes; nonStrikerStats.sixes = t6;
        }
      } else {
        // Dot ball
        if (bowlerEntry) bowlerEntry.dots++;
      }
    }

    if (bowlerEntry) {
      bowlerEntry.overs += 1;
      if (overRuns === 0) bowlerEntry.maidens++;
      bowlerEntry.economy = Number((bowlerEntry.runs / bowlerEntry.overs).toFixed(2));
    }

    // End of over: swap striker and non-striker
    const tempIdx = strikerIdx;
    strikerIdx = nonStrikerIdx;
    nonStrikerIdx = tempIdx;
    const tRuns = strikerStats.runs; strikerStats.runs = nonStrikerStats.runs; nonStrikerStats.runs = tRuns;
    const tBalls = strikerStats.balls; strikerStats.balls = nonStrikerStats.balls; nonStrikerStats.balls = tBalls;
    const t4 = strikerStats.fours; strikerStats.fours = nonStrikerStats.fours; nonStrikerStats.fours = t4;
    const t6 = strikerStats.sixes; strikerStats.sixes = nonStrikerStats.sixes; nonStrikerStats.sixes = t6;
  }

  // Not out batters remaining
  if (activeBatters[strikerIdx] && strikerStats.balls > 0) {
    battingEntries.push({
      playerId: activeBatters[strikerIdx].id,
      playerName: activeBatters[strikerIdx].name,
      runs: strikerStats.runs,
      balls: strikerStats.balls,
      fours: strikerStats.fours,
      sixes: strikerStats.sixes,
      strikeRate: Number(((strikerStats.runs / strikerStats.balls) * 100).toFixed(1)),
      dismissal: 'not out',
      isNotOut: true,
    });
  }

  if (activeBatters[nonStrikerIdx] && nonStrikerStats.balls > 0) {
    battingEntries.push({
      playerId: activeBatters[nonStrikerIdx].id,
      playerName: activeBatters[nonStrikerIdx].name,
      runs: nonStrikerStats.runs,
      balls: nonStrikerStats.balls,
      fours: nonStrikerStats.fours,
      sixes: nonStrikerStats.sixes,
      strikeRate: Number(((nonStrikerStats.runs / nonStrikerStats.balls) * 100).toFixed(1)),
      dismissal: 'not out',
      isNotOut: true,
    });
  }

  const completedOvers = Math.floor(ballsBowled / 6) + (ballsBowled % 6) / 10;

  return {
    teamId: battingTeam.id,
    teamName: battingTeam.name,
    totalRuns,
    totalWickets: wickets,
    totalOvers: completedOvers,
    extras: Math.floor(totalRuns * 0.05),
    batting: battingEntries,
    bowling: Array.from(bowlingEntries.values()),
    fallOfWickets,
  };
}

export function simulateSingleMatch(
  match: Match,
  teams: Team[]
): Match {
  const homeTeam = teams.find(t => t.id === match.homeTeamId)!;
  const awayTeam = teams.find(t => t.id === match.awayTeamId)!;

  // Toss: Coin flip decides who bats first
  const homeBatFirst = Math.random() > 0.5;
  const firstBattingTeam = homeBatFirst ? homeTeam : awayTeam;
  const secondBattingTeam = homeBatFirst ? awayTeam : homeTeam;

  // Innings 1
  const innings1 = simulateInnings(firstBattingTeam, secondBattingTeam);
  const target = innings1.totalRuns + 1;

  // Innings 2
  const innings2 = simulateInnings(secondBattingTeam, firstBattingTeam, target);

  let winnerId: string;
  let margin: string;

  if (innings2.totalRuns >= target) {
    winnerId = secondBattingTeam.id;
    const remainingWickets = 10 - innings2.totalWickets;
    margin = `won by ${remainingWickets} wicket${remainingWickets > 1 ? 's' : ''}`;
  } else if (innings2.totalRuns === innings1.totalRuns) {
    winnerId = firstBattingTeam.id; // Super over tiebreaker resolved
    margin = `won via Super Over tiebreaker!`;
  } else {
    winnerId = firstBattingTeam.id;
    const runDifference = innings1.totalRuns - innings2.totalRuns;
    margin = `won by ${runDifference} run${runDifference > 1 ? 's' : ''}`;
  }

  // Determine Player of the Match
  let potm = {
    playerId: '',
    playerName: '',
    teamId: winnerId,
    performance: '',
    impact: 0,
  };

  [innings1, innings2].forEach(inn => {
    inn.batting.forEach(b => {
      const impact = b.runs + (b.runs >= 50 ? 25 : 0) + (b.runs >= 100 ? 50 : 0) + (b.strikeRate > 170 ? 15 : 0);
      if (impact > potm.impact) {
        potm = {
          playerId: b.playerId,
          playerName: b.playerName,
          teamId: inn.teamId,
          performance: `${b.runs} (${b.balls})`,
          impact,
        };
      }
    });

    inn.bowling.forEach(bw => {
      const impact = bw.wickets * 30 + (bw.economy < 6.5 ? 20 : 0);
      if (impact > potm.impact) {
        potm = {
          playerId: bw.playerId,
          playerName: bw.playerName,
          teamId: inn.teamId === homeTeam.id ? awayTeam.id : homeTeam.id,
          performance: `${bw.wickets}/${bw.runs}`,
          impact,
        };
      }
    });
  });

  return {
    ...match,
    isPlayed: true,
    innings1,
    innings2,
    winnerTeamId: winnerId,
    margin,
    playerOfTheMatch: {
      playerId: potm.playerId,
      playerName: potm.playerName,
      teamId: potm.teamId,
      performance: potm.performance,
    },
  };
}

export function calculateStandings(teams: Team[], matches: Match[]): LeagueStanding[] {
  const map = new Map<string, LeagueStanding>();

  teams.forEach(t => {
    map.set(t.id, {
      teamId: t.id,
      teamName: t.name,
      shortName: t.shortName,
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      points: 0,
      nrr: 0.0,
      runsScored: 0,
      oversFaced: 0,
      runsConceded: 0,
      oversBowled: 0,
      form: [],
    });
  });

  matches.filter(m => m.isPlayed && !m.isPlayoff).forEach(m => {
    if (!m.innings1 || !m.innings2) return;

    const t1 = map.get(m.innings1.teamId);
    const t2 = map.get(m.innings2.teamId);
    if (!t1 || !t2) return;

    t1.played++;
    t2.played++;

    // Standard Cricket Rule: If all out, overs are counted as full 20.0 overs for NRR
    const t1OversFaced = m.innings1.totalWickets >= 10 ? 20.0 : m.innings1.totalOvers;
    const t2OversFaced = m.innings2.totalWickets >= 10 ? 20.0 : m.innings2.totalOvers;

    t1.runsScored += m.innings1.totalRuns;
    t1.oversFaced += t1OversFaced;
    t1.runsConceded += m.innings2.totalRuns;
    t1.oversBowled += t2OversFaced;

    t2.runsScored += m.innings2.totalRuns;
    t2.oversFaced += t2OversFaced;
    t2.runsConceded += m.innings1.totalRuns;
    t2.oversBowled += t1OversFaced;

    if (m.winnerTeamId === t1.teamId) {
      t1.won++;
      t1.points += 2;
      t1.form.push('W');
      t2.lost++;
      t2.form.push('L');
    } else {
      t2.won++;
      t2.points += 2;
      t2.form.push('W');
      t1.lost++;
      t1.form.push('L');
    }
  });

  // Calculate NRR
  const standings = Array.from(map.values()).map(s => {
    const batRate = s.oversFaced > 0 ? s.runsScored / s.oversFaced : 0;
    const bowlRate = s.oversBowled > 0 ? s.runsConceded / s.oversBowled : 0;
    const nrr = Number((batRate - bowlRate).toFixed(3));
    return {
      ...s,
      nrr,
      form: s.form.slice(-5) // Last 5 matches
    };
  });

  // Sort by Points descending, then NRR descending
  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });
}

export function computeSeasonAwards(matches: Match[], teams: Team[]): SeasonAwards {
  const battingRuns = new Map<string, { name: string; team: string; runs: number; balls: number }>();
  const bowlingWickets = new Map<string, { name: string; team: string; wickets: number; runs: number; overs: number }>();

  matches.filter(m => m.isPlayed).forEach(m => {
    [m.innings1, m.innings2].forEach(inn => {
      if (!inn) return;
      const team = teams.find(t => t.id === inn.teamId)?.name || 'Franchise';

      inn.batting.forEach(b => {
        const cur = battingRuns.get(b.playerId) || { name: b.playerName, team, runs: 0, balls: 0 };
        cur.runs += b.runs;
        cur.balls += b.balls;
        battingRuns.set(b.playerId, cur);
      });

      inn.bowling.forEach(bw => {
        const cur = bowlingWickets.get(bw.playerId) || { name: bw.playerName, team, wickets: 0, runs: 0, overs: 0 };
        cur.wickets += bw.wickets;
        cur.runs += bw.runs;
        cur.overs += bw.overs;
        bowlingWickets.set(bw.playerId, cur);
      });
    });
  });

  // Orange Cap (Highest Runs)
  let topBatter = { playerId: '', playerName: 'N/A', teamName: 'N/A', runs: 0, strikeRate: 0 };
  battingRuns.forEach((val, id) => {
    if (val.runs > topBatter.runs) {
      topBatter = {
        playerId: id,
        playerName: val.name,
        teamName: val.team,
        runs: val.runs,
        strikeRate: val.balls > 0 ? Number(((val.runs / val.balls) * 100).toFixed(1)) : 0,
      };
    }
  });

  // Purple Cap (Most Wickets)
  let topBowler = { playerId: '', playerName: 'N/A', teamName: 'N/A', wickets: 0, economy: 0 };
  bowlingWickets.forEach((val, id) => {
    if (val.wickets > topBowler.wickets) {
      topBowler = {
        playerId: id,
        playerName: val.name,
        teamName: val.team,
        wickets: val.wickets,
        economy: val.overs > 0 ? Number((val.runs / val.overs).toFixed(2)) : 0,
      };
    }
  });

  return {
    orangeCap: topBatter,
    purpleCap: topBowler,
    mvp: {
      playerId: topBatter.playerId || 'p-1',
      playerName: topBatter.playerName || 'Superstar',
      teamName: topBatter.teamName,
      points: Math.round(topBatter.runs * 1.5 + topBowler.wickets * 25),
    },
    emergingPlayer: {
      playerId: 'p-35',
      playerName: 'Dhruv Jaiswal',
      teamName: 'Emerging XI',
      age: 21,
      performance: '430 Runs, SR 168.4',
    }
  };
}
