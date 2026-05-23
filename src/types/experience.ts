export type Experience = {
  id: number;
  company: string;
  position: string;
  duration: {
    start: Date;
    end: Date | null;
  };
  description: string;
  highlights: string[];
};
