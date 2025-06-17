export interface Thread {
  id: number;
  title: string;
  content: string;
  authorInfo: {
    postedAt: string;
    device: string;
    ip: string;
  };
  replies: any[];
}
