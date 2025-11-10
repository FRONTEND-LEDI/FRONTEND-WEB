
import { createContext, useState, type ReactNode } from "react";

export interface GameContextType {
  selectedGame: string | null;
  setSelectedGame: (game: string) => void;
}

export const GameContext = createContext<GameContextType>({
  selectedGame: null,
  setSelectedGame: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  );
}

