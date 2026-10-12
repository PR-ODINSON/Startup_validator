export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type IdeaProgressCompletedItem = {
  name: string;
  output: Json;
};

export type IdeaProgress = {
  completed: IdeaProgressCompletedItem[];
  current: string | null;
};

export interface Database {
  public: {
    Tables: {
      ideas: {
        Row: {
          id: string;
          user_id: string | null;
          title: string;
          description: string | null;
          file_url: string | null;
          notion_link: string | null;
          status: string;
          submitted_at: string;
          metadata: Json;
          progress: IdeaProgress;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          title: string;
          description?: string | null;
          file_url?: string | null;
          notion_link?: string | null;
          status?: string;
          submitted_at?: string;
          metadata?: Json;
          progress?: IdeaProgress;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          title?: string;
          description?: string | null;
          file_url?: string | null;
          notion_link?: string | null;
          status?: string;
          submitted_at?: string;
          metadata?: Json;
          progress?: IdeaProgress;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          idea_id: string;
          tam: number | null;
          sam: number | null;
          som: number | null;
          scorecard: Json;
          roadmap: string | null;
          gtm_strategy: string | null;
          pitch_deck_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          idea_id: string;
          tam?: number | null;
          sam?: number | null;
          som?: number | null;
          scorecard: Json;
          roadmap?: string | null;
          gtm_strategy?: string | null;
          pitch_deck_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          idea_id?: string;
          tam?: number | null;
          sam?: number | null;
          som?: number | null;
          scorecard?: Json;
          roadmap?: string | null;
          gtm_strategy?: string | null;
          pitch_deck_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type ScoredDimension = {
  score: number;
  justification: string;
};

export type FounderVerdict = {
  stance: 'go' | 'pivot' | 'kill';
  paragraph: string;
  biggestRisk: string;
};

export type ValidationScorecard = {
  marketViability: ScoredDimension;
  competitionAnalysis: ScoredDimension;
  businessModel: ScoredDimension;
  pitchDeck: ScoredDimension;
  overall: {
    score: number;
    summary: string;
  };
  verdict?: FounderVerdict;
  recommendations: string[];
};

export type StoredScorecard = ValidationScorecard & {
  agents?: Record<string, unknown>;
};
