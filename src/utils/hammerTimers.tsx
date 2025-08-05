const STORAGE_KEY = "crackingEggs";

type EggData = {
  timestamp: number;
  points: number;
};

type CrackingEggs = {
  [eggId: string]: EggData;
};

export const setEggHammeringTime = (eggId: string, points: number) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const crackingEggs: CrackingEggs = stored ? JSON.parse(stored) : {};

  crackingEggs[eggId] = {
    timestamp: Date.now(),
    points,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(crackingEggs));
};

export const getEggHammeringTime = (eggId: string): EggData | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const crackingEggs: CrackingEggs = JSON.parse(stored);
  return crackingEggs[eggId] || null;
};

export const deleteEggHammeringTime = (eggId: string): void => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  const crackingEggs: CrackingEggs = JSON.parse(stored);

  if (crackingEggs[eggId]) {
    delete crackingEggs[eggId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(crackingEggs));
  }
};
