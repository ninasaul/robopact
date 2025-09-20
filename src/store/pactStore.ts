import { create } from 'zustand';

export interface Pact {
  id: string;
  creator: string;
  opponent: string;
  description: string;
  stake: string; // ETH amount as string
  deadline: number; // timestamp
  creatorFinished: boolean;
  opponentFinished: boolean;
  resolved: boolean;
  winner?: string; // address of winner, or null if both failed
}

interface PactStore {
  pacts: Pact[];
  addPact: (pact: Pact) => void;
  updatePact: (id: string, updates: Partial<Pact>) => void;
  getPact: (id: string) => Pact | undefined;
  getUserPacts: (address: string) => Pact[];
}

export const usePactStore = create<PactStore>((set, get) => ({
  pacts: [],
  addPact: (pact) => set((state) => ({ pacts: [...state.pacts, pact] })),
  updatePact: (id, updates) =>
    set((state) => ({
      pacts: state.pacts.map((pact) =>
        pact.id === id ? { ...pact, ...updates } : pact
      ),
    })),
  getPact: (id) => get().pacts.find((pact) => pact.id === id),
  getUserPacts: (address) =>
    get().pacts.filter(
      (pact) => pact.creator.toLowerCase() === address.toLowerCase() || 
               pact.opponent.toLowerCase() === address.toLowerCase()
    ),
}));
